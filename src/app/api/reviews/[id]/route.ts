import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateReviewSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/reviews/[id] - Get a single review
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        book: true,
        _count: {
          select: { likes: true },
        },
      },
    })

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Get review error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}

// PATCH /api/reviews/[id] - Update a review
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const review = await prisma.review.findUnique({
      where: { id: params.id },
    })

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    if (review.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only edit your own reviews' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = updateReviewSchema.parse(body)

    const updatedReview = await prisma.review.update({
      where: { id: params.id },
      data,
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

    return NextResponse.json(updatedReview)
  } catch (error: any) {
    console.error('Update review error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE /api/reviews/[id] - Delete a review
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const review = await prisma.review.findUnique({
      where: { id: params.id },
    })

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    if (review.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own reviews' },
        { status: 403 }
      )
    }

    await prisma.review.delete({
      where: { id: params.id },
    })

    // Update book rating count and user stats
    await Promise.all([
      prisma.book.update({
        where: { id: review.bookId },
        data: { reviewCount: { decrement: 1 } },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { reviewsWritten: { decrement: 1 } },
      }),
    ])

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Delete review error:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
