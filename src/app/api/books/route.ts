import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createBookSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { requireAdmin } from '@/lib/admin'

// GET /api/books - Get all books with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const where: any = {}

    // Filter by genre
    if (genre) {
      where.genres = {
        has: genre,
      }
    }

    // Search by title or author
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy: { [sortBy]: order },
        take: limit,
        skip,
        include: {
          _count: {
            select: { reviews: true },
          },
        },
      }),
      prisma.book.count({ where }),
    ])

    return NextResponse.json({
      books,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get books error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

// POST /api/books - Create a new book (admin only)
export async function POST(request: Request) {
  try {
    // Check if user is admin
    await requireAdmin();

    const body = await request.json()
    const data = createBookSchema.parse(body)

    const book = await prisma.book.create({
      data,
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error: any) {
    console.error('Create book error:', error)
    
    if (error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}
