import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkReadOnlyMode } from '@/lib/read-only'

// POST /api/likes - Toggle like on review or discussion
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
    const { reviewId, discussionId } = body

    if (!reviewId && !discussionId) {
      return NextResponse.json(
        { error: 'Either reviewId or discussionId is required' },
        { status: 400 }
      )
    }

    if (reviewId && discussionId) {
      return NextResponse.json(
        { error: 'Cannot like both review and discussion at once' },
        { status: 400 }
      )
    }

    // Check if already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        ...(reviewId ? { reviewId } : { discussionId }),
      },
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      })

      // Update helpful count for review
      if (reviewId) {
        await prisma.review.update({
          where: { id: reviewId },
          data: { helpfulCount: { decrement: 1 } },
        })
      }

      // Update likes count for discussion
      if (discussionId) {
        await prisma.discussion.update({
          where: { id: discussionId },
          data: { likes: { decrement: 1 } },
        })
      }

      return NextResponse.json({ liked: false, message: 'Unliked successfully' })
    } else {
      // Like
      const like = await prisma.like.create({
        data: {
          userId: session.user.id,
          ...(reviewId ? { reviewId } : { discussionId }),
        },
      })

      // Update helpful count for review
      if (reviewId) {
        await prisma.review.update({
          where: { id: reviewId },
          data: { helpfulCount: { increment: 1 } },
        })
      }

      // Update likes count for discussion
      if (discussionId) {
        await prisma.discussion.update({
          where: { id: discussionId },
          data: { likes: { increment: 1 } },
        })
      }

      return NextResponse.json({ liked: true, message: 'Liked successfully' })
    }
  } catch (error) {
    console.error('Like/unlike error:', error)
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    )
  }
}
