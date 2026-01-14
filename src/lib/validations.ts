import { z } from 'zod'

// User validation schemas
export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  goodreadsUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitterUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  favoriteGenres: z.array(z.string()).optional(),
  readingGoal: z.number().min(1).max(1000).optional(),
})

// Book validation schemas
export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  coverImage: z.string().url('Invalid image URL'),
  genres: z.array(z.string()).min(1, 'At least one genre is required'),
  publishedYear: z.number().min(1000).max(new Date().getFullYear() + 1),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  isbn: z.string().optional(),
  pageCount: z.number().min(1).optional(),
  mood: z.array(z.string()).optional(),
})

export const updateBookSchema = createBookSchema.partial()

// Review validation schemas
export const createReviewSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  rating: z.number().min(1).max(5),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Review must be at least 50 characters'),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
})

export const updateReviewSchema = createReviewSchema.partial().extend({
  bookId: z.string().optional(),
})

// Discussion validation schemas
export const createDiscussionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  category: z.enum(['general', 'book-club', 'genre', 'recommendation']),
  bookId: z.string().optional(),
})

export const updateDiscussionSchema = createDiscussionSchema.partial()

// Comment validation schemas
export const createCommentSchema = z.object({
  discussionId: z.string().min(1, 'Discussion ID is required'),
  content: z.string().min(1, 'Comment cannot be empty'),
  parentId: z.string().optional(),
})

// Reading list validation schemas
export const addToReadingListSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  status: z.enum(['want-to-read', 'currently-reading', 'read']),
})

export const updateReadingListSchema = z.object({
  status: z.enum(['want-to-read', 'currently-reading', 'read']).optional(),
  progress: z.number().min(0).max(100).optional(),
  startedAt: z.string().datetime().optional(),
  finishedAt: z.string().datetime().optional(),
})
