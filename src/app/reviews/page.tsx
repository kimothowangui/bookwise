import { Metadata } from 'next'
import Link from 'next/link'
import { FaStar, FaComments } from 'react-icons/fa'
import { sampleBooks } from '@/data/sampleBooks'

export const metadata: Metadata = {
  title: 'Book Reviews - Honest Reviews from Real Readers | BookWise',
  description: 'Browse thousands of honest book reviews from passionate readers. Find detailed reviews with ratings, pros & cons, and recommendations.',
  keywords: 'book reviews, honest book reviews, reader reviews, book ratings, should I read',
}

export default function ReviewsPage() {
  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Reviews from Real Readers
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Honest, detailed reviews to help you find your next great read
          </p>
        </div>
      </section>

      {/* Reviews Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary-900">
            Latest Reviews
          </h2>
          <select className="border-2 border-primary-300 rounded-lg px-4 py-2 text-primary-700">
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Most Helpful</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBooks.map((book) => (
            <Link 
              href={`/book/${book.id}`} 
              key={book.id}
              className="card overflow-hidden group"
            >
              <div className="relative h-64 bg-primary-200 overflow-hidden">
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} book cover`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <FaStar className="text-warm-500" />
                  <span className="font-bold text-primary-900">{book.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {book.genres.slice(0, 2).map((genre) => (
                    <span 
                      key={genre}
                      className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {book.title}
                </h3>
                
                <p className="text-primary-600 mb-3">
                  by {book.author}
                </p>
                
                <p className="text-sm text-primary-700 line-clamp-3 mb-4">
                  {book.description}
                </p>

                <div className="flex items-center justify-between text-sm text-primary-600">
                  <div className="flex items-center gap-2">
                    <FaComments />
                    <span>{book.reviewCount} reviews</span>
                  </div>
                  <span className="text-accent-600 font-medium group-hover:text-accent-700">
                    Read Full Review →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
          <button className="px-4 py-2 border-2 border-primary-300 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border-2 border-primary-300 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors">
            2
          </button>
          <button className="px-4 py-2 border-2 border-primary-300 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors">
            3
          </button>
          <button className="px-4 py-2 border-2 border-primary-300 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
