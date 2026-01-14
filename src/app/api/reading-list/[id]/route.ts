import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateReadingListSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// PATCH /api/reading-list/[id] - Update reading list item
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

    const item = await prisma.readingListItem.findUnique({
      where: { id: params.id },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Reading list item not found' },
        { status: 404 }
      )
    }

    if (item.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only update your own reading list' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = updateReadingListSchema.parse(body)

    const updatedItem = await prisma.readingListItem.update({
      where: { id: params.id },
      data,
      include: {
        book: true,
      },
    })

    // Update user's booksRead count if status changed to 'read'
    if (data.status === 'read' && item.status !== 'read') {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { booksRead: { increment: 1 } },
      })
    } else if (data.status !== 'read' && item.status === 'read') {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { booksRead: { decrement: 1 } },
      })
    }

    return NextResponse.json(updatedItem)
  } catch (error: any) {
    console.error('Update reading list error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update reading list item' },
      { status: 500 }
    )
  }
}

// DELETE /api/reading-list/[id] - Remove from reading list
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

    const item = await prisma.readingListItem.findUnique({
      where: { id: params.id },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Reading list item not found' },
        { status: 404 }
      )
    }

    if (item.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only delete from your own reading list' },
        { status: 403 }
      )
    }

    await prisma.readingListItem.delete({
      where: { id: params.id },
    })

    // Update user's booksRead count if item was marked as 'read'
    if (item.status === 'read') {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { booksRead: { decrement: 1 } },
      })
    }

    return NextResponse.json({ message: 'Removed from reading list' })
  } catch (error) {
    console.error('Delete reading list error:', error)
    return NextResponse.json(
      { error: 'Failed to remove from reading list' },
      { status: 500 }
    )
  }
}
