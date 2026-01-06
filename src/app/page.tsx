import HeroSection from '@/components/home/HeroSection'
import FeaturedBooks from '@/components/home/FeaturedBooks'
import TrendingDiscussions from '@/components/home/TrendingDiscussions'
import { sampleBooks } from '@/data/sampleBooks'
import { Discussion } from '@/types'

// Sample discussion data
const sampleDiscussions: Discussion[] = [
  {
    id: 'd1',
    title: 'What book changed your perspective on life?',
    category: 'general',
    author: 'Jennifer Adams',
    content: 'I\'m curious to hear which books genuinely changed how you think about the world. For me, it was "Man\'s Search for Meaning" by Viktor Frankl. The idea that we can find meaning even in suffering completely shifted my outlook...',
    replies: 142,
    likes: 89,
    createdAt: '2024-01-12',
    lastActivity: '2 hours ago'
  },
  {
    id: 'd2',
    title: 'Book Club Pick: "The Midnight Library" - Week 2 Discussion',
    category: 'book-club',
    author: 'David Martinez',
    bookId: '1',
    content: 'Welcome to Week 2! This week we\'re discussing chapters 10-20. I\'d love to hear your thoughts on Nora\'s journey through her different lives. Which alternate life resonated most with you? And what do you think about the library\'s rules?',
    replies: 67,
    likes: 45,
    createdAt: '2024-01-14',
    lastActivity: '30 minutes ago'
  },
  {
    id: 'd3',
    title: 'Best Mystery/Thriller Books of 2023?',
    category: 'genre',
    author: 'Rachel Kim',
    content: 'Looking for recommendations! I\'ve been on a thriller kick lately and loved "The Silent Patient" and "Verity". What were your favorite mystery/thriller reads from last year? Preferably something with a good twist!',
    replies: 98,
    likes: 62,
    createdAt: '2024-01-13',
    lastActivity: '1 hour ago'
  },
  {
    id: 'd4',
    title: 'If you loved "Atomic Habits", read these next...',
    category: 'recommendation',
    author: 'Michael Thompson',
    bookId: '2',
    content: 'Just finished "Atomic Habits" and it was life-changing! For anyone looking for similar books, I highly recommend "The Power of Habit" by Charles Duhigg and "Tiny Habits" by BJ Fogg. Both explore behavior change from different angles...',
    replies: 53,
    likes: 71,
    createdAt: '2024-01-11',
    lastActivity: '3 hours ago'
  },
  {
    id: 'd5',
    title: 'Unpopular Opinion: Overhyped books that disappointed you',
    category: 'general',
    author: 'Sophie Bennett',
    content: 'Let\'s be honest - not every bestseller lives up to the hype. What popular books left you disappointed? (Let\'s keep it respectful - this is about personal taste, not bashing books!)',
    replies: 187,
    likes: 34,
    createdAt: '2024-01-10',
    lastActivity: '45 minutes ago'
  }
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section with strong emotional headline */}
      <HeroSection />

      {/* Featured Book Reviews */}
      <FeaturedBooks books={sampleBooks} />

      {/* Trending Discussions */}
      <TrendingDiscussions discussions={sampleDiscussions} />

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Great Read?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of passionate readers. Share your thoughts, discover hidden gems, and never run out of great books to read.
          </p>
          <a 
            href="/register" 
            className="bg-white text-primary-700 hover:bg-primary-50 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl"
          >
            Join BookWise Free
          </a>
          <p className="mt-4 text-primary-200 text-sm">
            No credit card required • Takes less than 30 seconds
          </p>
        </div>
      </section>
    </>
  )
}
