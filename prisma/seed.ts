import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@bookwise.com' },
    update: {},
    create: {
      email: 'demo@bookwise.com',
      name: 'Demo User',
      username: 'demouser',
      password: hashedPassword,
      bio: 'Book lover and avid reader. Always looking for my next great read!',
      favoriteGenres: ['Fiction', 'Mystery', 'Self-Help'],
      readingGoal: 50,
      booksRead: 12,
      reviewsWritten: 0,
      discussionsStarted: 0,
    },
  })

  console.log('Created demo user:', user.email)

  // Create sample books
  const books = [
    {
      title: 'Outwitting the Devil: The Secret to Freedom and Success',
      author: 'Napoleon Hill',
      coverImage: '/outwitting-the-devil.jpg',
      rating: 4.6,
      reviewCount: 0,
      genres: ['Self-Help', 'Personal Development', 'Philosophy', 'Psychology'],
      publishedYear: 2011,
      description: 'Written as a provocative dialogue between the author and the Devil, this book explores how fear, doubt, and social conditioning prevent people from achieving freedom and success.',
      pageCount: 256,
      mood: ['Challenging', 'Inspiring', 'Provocative'],
      isbn: '9781454900679',
    },
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      rating: 4.5,
      reviewCount: 0,
      genres: ['Fiction', 'Fantasy', 'Contemporary'],
      publishedYear: 2020,
      description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
      pageCount: 304,
      mood: ['Inspiring', 'Thought-provoking', 'Hopeful'],
      isbn: '9780525559474',
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
      rating: 4.8,
      reviewCount: 0,
      genres: ['Self-Help', 'Personal Development', 'Psychology'],
      publishedYear: 2018,
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear reveals practical strategies for forming good habits and breaking bad ones.',
      pageCount: 320,
      mood: ['Motivational', 'Practical', 'Life-changing'],
      isbn: '9780735211292',
    },
    {
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
      rating: 4.3,
      reviewCount: 0,
      genres: ['Mystery', 'Thriller', 'Psychological Fiction'],
      publishedYear: 2019,
      description: 'Alicia Berenson\'s life is seemingly perfect until one evening when she shoots her husband five times in the face, and then never speaks another word.',
      pageCount: 336,
      mood: ['Dark', 'Suspenseful', 'Gripping'],
      isbn: '9781250301697',
    },
    {
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      rating: 4.6,
      reviewCount: 0,
      genres: ['Fiction', 'Mystery', 'Historical Fiction'],
      publishedYear: 2018,
      description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast.',
      pageCount: 384,
      mood: ['Atmospheric', 'Moving', 'Beautiful'],
      isbn: '9780735219090',
    },
  ]

  for (const bookData of books) {
    const book = await prisma.book.upsert({
      where: { isbn: bookData.isbn },
      update: {},
      create: bookData,
    })
    console.log('Created book:', book.title)
  }

  console.log('Database seed completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
