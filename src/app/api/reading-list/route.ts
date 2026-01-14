import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addToReadingListSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkReadOnlyMode } from '@/lib/read-only'

// GET /api/reading-list - Get user's reading list
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: any = {
      userId: session.user.id,
    }

    if (status) {
      where.status = status
    }

    const readingList = await prisma.readingListItem.findMany({
      where,
      include: {
        book: true,
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(readingList)
  } catch (error) {
    console.error('Get reading list error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reading list' },
      { status: 500 }
    )
  }
}

// POST /api/reading-list - Add book to reading list
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
    const data = addToReadingListSchema.parse(body)

    // Check if book is already in reading list
    const existing = await prisma.readingListItem.findUnique({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId: data.bookId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Book is already in your reading list' },
        { status: 400 }
      )
    }

    const readingListItem = await prisma.readingListItem.create({
      data: {
        userId: session.user.id,
        bookId: data.bookId,
        status: data.status,
      },
      include: {
        book: true,
      },
    })

    return NextResponse.json(readingListItem, { status: 201 })
  } catch (error: any) {
    console.error('Add to reading list error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to add book to reading list' },
      { status: 500 }
    )
  }
}
