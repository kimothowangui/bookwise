import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateDiscussionSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'
import { checkReadOnlyMode } from '@/lib/read-only'

// GET /api/discussions/[id] - Get a single discussion with comments
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const discussion = await prisma.discussion.findUnique({
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
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          where: { parentId: null },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { 
            comments: true,
            discussionLikes: true,
          },
        },
      },
    })

    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.discussion.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(discussion)
  } catch (error) {
    console.error('Get discussion error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discussion' },
      { status: 500 }
    )
  }
}

// PATCH /api/discussions/[id] - Update a discussion
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const discussion = await prisma.discussion.findUnique({
      where: { id: params.id },
    })

    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    if (discussion.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only edit your own discussions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = updateDiscussionSchema.parse(body)

    const updatedDiscussion = await prisma.discussion.update({
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

    return NextResponse.json(updatedDiscussion)
  } catch (error: any) {
    console.error('Update discussion error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update discussion' },
      { status: 500 }
    )
  }
}

// DELETE /api/discussions/[id] - Delete a discussion
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const discussion = await prisma.discussion.findUnique({
      where: { id: params.id },
    })

    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Check if user is owner or admin
    const userIsAdmin = await isAdmin();
    if (discussion.userId !== session.user.id && !userIsAdmin) {
      return NextResponse.json(
        { error: 'You can only delete your own discussions' },
        { status: 403 }
      )
    }

    await prisma.discussion.delete({
      where: { id: params.id },
    })

    // Update user stats
    await prisma.user.update({
      where: { id: session.user.id },
      data: { discussionsStarted: { decrement: 1 } },
    })

    return NextResponse.json({ message: 'Discussion deleted successfully' })
  } catch (error) {
    console.error('Delete discussion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete discussion' },
      { status: 500 }
    )
  }
}
