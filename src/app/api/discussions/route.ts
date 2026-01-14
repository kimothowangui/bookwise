import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createDiscussionSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/discussions - Get all discussions with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const bookId = searchParams.get('bookId')
    const userId = searchParams.get('userId')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const where: any = {}

    if (category) where.category = category
    if (bookId) where.bookId = bookId
    if (userId) where.userId = userId
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [discussions, total] = await Promise.all([
      prisma.discussion.findMany({
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
            },
          },
          _count: {
            select: { 
              comments: true,
              discussionLikes: true,
            },
          },
        },
        orderBy: [
          { isPinned: 'desc' },
          { updatedAt: 'desc' },
        ],
        take: limit,
        skip,
      }),
      prisma.discussion.count({ where }),
    ])

    return NextResponse.json({
      discussions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get discussions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST /api/discussions - Create a new discussion
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = createDiscussionSchema.parse(body)

    const discussion = await prisma.discussion.create({
      data: {
        ...data,
        userId: session.user.id,
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

    // Update user stats
    await prisma.user.update({
      where: { id: session.user.id },
      data: { discussionsStarted: { increment: 1 } },
    })

    return NextResponse.json(discussion, { status: 201 })
  } catch (error: any) {
    console.error('Create discussion error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    )
  }
}
