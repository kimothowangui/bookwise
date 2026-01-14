import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/admin';

/**
 * GET /api/auth/me
 * Get current logged-in user information including admin status
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        isAdmin: user.isAdmin,
        bio: user.bio,
        favoriteGenres: user.favoriteGenres,
        booksRead: user.booksRead,
        reviewsWritten: user.reviewsWritten,
        discussionsStarted: user.discussionsStarted,
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user information' },
      { status: 500 }
    );
  }
}
