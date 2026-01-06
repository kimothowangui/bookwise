import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Book } from '@/types'

interface BookHeaderProps {
  book: Book
}

export default function BookHeader({ book }: BookHeaderProps) {
  // Render star rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warm-500" />)
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warm-500" />)
    }
    
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-warm-500" />)
    }
    
    return stars
  }

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="card overflow-hidden">
              <img 
                src={book.coverImage} 
                alt={`${book.title} book cover`}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {book.genres.map((genre) => (
                <span 
                  key={genre}
                  className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Title - SEO Optimized H1 */}
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-3">
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-2xl text-primary-600 mb-4">
              by <span className="font-semibold">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-2xl font-bold text-primary-900">
                {book.rating}
              </span>
              <span className="text-primary-600">
                ({book.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Mood Tags */}
            {book.mood && book.mood.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-primary-600 mb-2">This book is:</p>
                <div className="flex flex-wrap gap-2">
                  {book.mood.map((mood) => (
                    <span 
                      key={mood}
                      className="text-sm bg-accent-100 text-accent-700 px-3 py-1 rounded-full"
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Emotional Hook Summary */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-lg mb-6">
              <p className="text-lg text-primary-800 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 gap-4 text-sm text-primary-600 mb-6">
              <div>
                <span className="font-semibold">Published:</span> {book.publishedYear}
              </div>
              {book.pageCount && (
                <div>
                  <span className="font-semibold">Pages:</span> {book.pageCount}
                </div>
              )}
              {book.isbn && (
                <div className="col-span-2">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </div>
              )}
            </div>

            {/* CTA Button - Affiliate Ready */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#buy"
                className="btn-accent text-center text-lg"
              >
                Buy This Book
              </a>
              <button className="btn-secondary text-lg">
                Add to Reading List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
