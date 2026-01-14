import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCommentSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// POST /api/comments - Create a new comment
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
    const data = createCommentSchema.parse(body)

    const comment = await prisma.comment.create({
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
      },
    })

    // Update discussion's updatedAt timestamp
    await prisma.discussion.update({
      where: { id: data.discussionId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error: any) {
    console.error('Create comment error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
