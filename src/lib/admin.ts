import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './prisma';

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true }
    });

    return user?.isAdmin || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Require admin authentication - throws error if not admin
 */
export async function requireAdmin(): Promise<void> {
  const adminStatus = await isAdmin();
  
  if (!adminStatus) {
    throw new Error('Unauthorized: Admin access required');
  }
}

/**
 * Get current user with admin status
 */
export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        isAdmin: true,
        bio: true,
        favoriteGenres: true,
        booksRead: true,
        reviewsWritten: true,
        discussionsStarted: true,
      }
    });

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
