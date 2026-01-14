import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createReviewSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkReadOnlyMode } from '@/lib/read-only'

// GET /api/reviews - Get all reviews with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get('bookId')
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const where: any = {}

    if (bookId) where.bookId = bookId
    if (userId) where.userId = userId

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              coverImage: true,
            },
          },
          _count: {
            select: { likes: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.review.count({ where }),
    ])

    return NextResponse.json({
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: Request) {
  try {
    // Check read-only mode first
    checkReadOnlyMode();
    
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = createReviewSchema.parse(body)

    // Check if user already reviewed this book
    const existingReview = await prisma.review.findFirst({
      where: {
        bookId: data.bookId,
        userId: session.user.id,
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this book' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        ...data,
        userId: session.user.id,
        pros: data.pros || [],
        cons: data.cons || [],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        book: true,
      },
    })

    // Update book rating and user stats
    await Promise.all([
      prisma.book.update({
        where: { id: data.bookId },
        data: { reviewCount: { increment: 1 } },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { reviewsWritten: { increment: 1 } },
      }),
    ])

    return NextResponse.json(review, { status: 201 })
  } catch (error: any) {
    console.error('Create review error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
