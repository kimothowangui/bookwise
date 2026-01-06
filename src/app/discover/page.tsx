import { Metadata } from 'next'
import Link from 'next/link'
import { FaStar, FaFire, FaHeart, FaCrown, FaBookOpen } from 'react-icons/fa'
import { sampleBooks } from '@/data/sampleBooks'

export const metadata: Metadata = {
  title: 'Discover Books - Curated Recommendations | BookWise',
  description: 'Discover your next favorite book with our curated collections, trending picks, and personalized recommendations from passionate readers.',
  keywords: 'discover books, book recommendations, trending books, best books, curated reading lists',
}

export default function DiscoverPage() {
  const moodCategories = [
    { name: 'Inspiring & Uplifting', emoji: '🌟', color: 'from-yellow-400 to-orange-500' },
    { name: 'Dark & Mysterious', emoji: '🌙', color: 'from-purple-600 to-indigo-700' },
    { name: 'Romantic & Emotional', emoji: '💕', color: 'from-pink-500 to-red-500' },
    { name: 'Adventurous & Epic', emoji: '⚔️', color: 'from-blue-500 to-cyan-600' },
    { name: 'Thought-Provoking', emoji: '🧠', color: 'from-green-500 to-teal-600' },
    { name: 'Cozy & Comforting', emoji: '☕', color: 'from-amber-600 to-orange-700' },
  ]

  return (
    <div className="bg-primary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-100 via-accent-50 to-primary-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-primary-700 max-w-2xl mx-auto">
            Explore curated collections, trending picks, and find books that match your mood
          </p>
        </div>
      </section>

      {/* Mood-Based Discovery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
            What Are You in the Mood For?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodCategories.map((mood) => (
              <Link
                key={mood.name}
                href={`/mood/${mood.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`card overflow-hidden group relative h-40 flex items-center justify-center bg-gradient-to-br ${mood.color}`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="text-center z-10">
                  <div className="text-5xl mb-3">{mood.emoji}</div>
                  <h3 className="text-xl font-bold text-white">{mood.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending This Week */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary-900 flex items-center gap-3">
              <FaFire className="text-orange-500" />
              Trending This Week
            </h2>
            <Link href="/trending" className="text-accent-600 hover:text-accent-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleBooks.slice(0, 4).map((book, index) => (
              <Link
                href={`/book/${book.id}`}
                key={book.id}
                className="card overflow-hidden group relative"
              >
                <div className="absolute top-4 left-4 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg">
                  #{index + 1}
                </div>
                <div className="h-64 bg-primary-200 overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-primary-600 mb-2">by {book.author}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-warm-500" />
                    <span className="font-bold text-primary-900">{book.rating}</span>
                    <span className="text-xs text-primary-600 ml-1">
                      ({book.reviewCount})
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary-900 flex items-center gap-3">
              <FaCrown className="text-warm-500" />
              Editor's Picks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleBooks.slice(0, 3).map((book) => (
              <Link
                href={`/book/${book.id}`}
                key={book.id}
                className="card overflow-hidden group"
              >
                <div className="h-72 bg-primary-200 overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <p className="text-primary-600 mb-3">by {book.author}</p>
                  <p className="text-sm text-primary-700 line-clamp-3 mb-4">
                    {book.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-warm-500" />
                    <span className="font-bold text-primary-900">{book.rating}</span>
                    <span className="text-sm text-primary-600">
                      ({book.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Most Loved by Community */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary-900 flex items-center gap-3">
              <FaHeart className="text-red-500" />
              Most Loved by Our Community
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sampleBooks.map((book) => (
              <Link
                href={`/book/${book.id}`}
                key={book.id}
                className="group"
              >
                <div className="card overflow-hidden">
                  <div className="aspect-[2/3] bg-primary-200 overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-bold text-primary-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-warm-500 text-xs" />
                    <span className="text-sm font-bold text-primary-900">{book.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Fiction', 'Non-Fiction', 'Mystery & Thriller', 'Romance', 'Fantasy & Sci-Fi', 
              'Self-Help', 'Biography & Memoir', 'Historical Fiction', 'Young Adult', 'Classics'].map((genre) => (
              <Link
                key={genre}
                href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                className="card p-6 text-center hover:shadow-xl transition-shadow group"
              >
                <FaBookOpen className="text-3xl text-primary-600 mx-auto mb-3 group-hover:text-accent-600 transition-colors" />
                <h3 className="font-bold text-primary-900 group-hover:text-primary-700 transition-colors">
                  {genre}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
