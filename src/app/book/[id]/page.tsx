import { Metadata } from 'next'
import BookHeader from '@/components/book/BookHeader'
import BookReviewSection from '@/components/book/BookReviewSection'
import UserReviews from '@/components/book/UserReviews'
import BookSchema from '@/components/book/BookSchema'
import { sampleBooks, sampleReviews } from '@/data/sampleBooks'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const book = sampleBooks.find(b => b.id === params.id)
  
  if (!book) {
    return {
      title: 'Book Not Found - BookWise'
    }
  }

  return {
    title: `${book.title} by ${book.author} - Review & Discussion | BookWise`,
    description: `Read our in-depth review of ${book.title} by ${book.author}. Discover why readers love this ${book.genres.join(', ')} book. ${book.rating}/5 stars from ${book.reviewCount} reviews.`,
    keywords: `${book.title}, ${book.author}, book review, ${book.genres.join(', ')}, should I read ${book.title}, ${book.title} discussion`,
    openGraph: {
      title: `${book.title} by ${book.author}`,
      description: book.description,
      images: [book.coverImage],
      type: 'book',
    },
  }
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = sampleBooks.find(b => b.id === params.id)
  const bookReviews = sampleReviews.filter(r => r.bookId === params.id)

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">Book Not Found</h1>
        <p className="text-primary-600 mb-8">Sorry, we couldn't find the book you're looking for.</p>
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    )
  }

  return (
    <>
      {/* SEO Schema Markup */}
      <BookSchema book={book} />
      
      {/* Book Header with Cover and Basic Info */}
      <BookHeader book={book} />
      
      {/* Detailed Review Section */}
      <BookReviewSection book={book} />
      
      {/* User Reviews */}
      <UserReviews reviews={bookReviews} />
    </>
  )
}
