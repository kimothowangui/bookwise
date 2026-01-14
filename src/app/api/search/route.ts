import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/search - Global search across books, discussions, and users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') // 'books', 'discussions', 'users', or 'all'
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const searchQuery = query.trim()
    const results: any = {}

    // Search books
    if (!type || type === 'all' || type === 'books') {
      results.books = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { author: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
        take: limit,
        orderBy: { rating: 'desc' },
      })
    }

    // Search discussions
    if (!type || type === 'all' || type === 'discussions') {
      results.discussions = await prisma.discussion.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { content: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
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
            },
          },
          _count: {
            select: { comments: true },
          },
        },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      })
    }

    // Search users
    if (!type || type === 'all' || type === 'users') {
      results.users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { username: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
          booksRead: true,
          reviewsWritten: true,
        },
        take: limit,
      })
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
