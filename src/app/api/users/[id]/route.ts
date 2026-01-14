import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateProfileSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkReadOnlyMode } from '@/lib/read-only'

// GET /api/users/[id] - Get user profile
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        website: true,
        goodreadsUrl: true,
        twitterUrl: true,
        favoriteGenres: true,
        readingGoal: true,
        booksRead: true,
        reviewsWritten: true,
        discussionsStarted: true,
        joinedDate: true,
        reviews: {
          include: {
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
          take: 10,
        },
        discussions: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
              },
            },
            _count: {
              select: { comments: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        readingList: {
          include: {
            book: true,
          },
          orderBy: { updatedAt: 'desc' },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PATCH /api/users/[id] - Update user profile
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

    if (session.user.id !== params.id) {
      return NextResponse.json(
        { error: 'You can only update your own profile' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = updateProfileSchema.parse(body)

    // Check if username is already taken
    if (data.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: data.username },
      })

      if (existingUser && existingUser.id !== params.id) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 400 }
        )
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        website: true,
        goodreadsUrl: true,
        twitterUrl: true,
        favoriteGenres: true,
        readingGoal: true,
        booksRead: true,
        reviewsWritten: true,
        discussionsStarted: true,
        joinedDate: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Update user error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
