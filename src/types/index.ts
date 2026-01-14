// Core data types for the BookWise application

export interface Book {
  id: string
  title: string
  author: string
  coverImage: string
  rating: number
  reviewCount: number
  genres: string[]
  publishedYear: number
  description: string
  isbn?: string
  pageCount?: number
  mood?: string[]
}

export interface Review {
  id: string
  bookId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  helpfulCount: number
  createdAt: string
  pros?: string[]
  cons?: string[]
}

export interface Discussion {
  id: string
  bookId?: string
  title: string
  category: 'general' | 'book-club' | 'genre' | 'recommendation'
  author: string
  authorAvatar?: string
  content: string
  replies: number
  likes: number
  createdAt: string
  lastActivity: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  favoriteGenres: string[]
  booksRead: number
  reviewsWritten: number
  joinedDate: string
}

export interface UserProfile {
  name: string
  username: string
  email: string
  bio: string
  avatar: string
  favoriteGenres: string[]
  readingGoal: number
  website?: string
  goodreadsUrl?: string
  twitterUrl?: string
  booksRead: number
  reviewsWritten: number
  discussionsStarted: number
  joinedDate: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverImage: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
}
