import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateBookSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { requireAdmin } from '@/lib/admin'

// GET /api/books/[id] - Get a single book with reviews
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            _count: {
              select: { likes: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { reviews: true },
        },
      },
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    if (book.reviews.length > 0) {
      const avgRating = book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
      book.rating = Math.round(avgRating * 10) / 10
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error('Get book error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    )
  }
}

// PATCH /api/books/[id] - Update a book (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    await requireAdmin();

    const body = await request.json()
    const data = updateBookSchema.parse(body)

    const book = await prisma.book.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(book)
  } catch (error: any) {
    console.error('Update book error:', error)
    
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

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    )
  }
}

// DELETE /api/books/[id] - Delete a book (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    await requireAdmin();

    await prisma.book.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error: any) {
    console.error('Delete book error:', error)
    
    if (error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    )
  }
}
