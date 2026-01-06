import Link from 'next/link'
import { FaStar, FaComments } from 'react-icons/fa'
import { Book } from '@/types'

interface FeaturedBooksProps {
  books: Book[]
}

export default function FeaturedBooks({ books }: FeaturedBooksProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Featured Books This Week
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Hand-picked by our community — books that are moving, inspiring, and highly recommended by real readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.slice(0, 6).map((book) => (
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
                    Read Reviews →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/reviews" 
            className="btn-secondary inline-block"
          >
            Browse All Reviews
          </Link>
        </div>
      </div>
    </section>
  )
}
