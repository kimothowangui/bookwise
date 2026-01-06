import { Metadata } from 'next'
import Link from 'next/link'
import { FaSearch, FaStar, FaFilter } from 'react-icons/fa'
import { sampleBooks } from '@/data/sampleBooks'

export const metadata: Metadata = {
  title: 'Search Books - Find Your Next Read | BookWise',
  description: 'Search thousands of book reviews by title, author, genre, or mood. Find exactly what you want to read next with our powerful search and filtering tools.',
  keywords: 'book search, find books, search by genre, search by mood, book recommendations',
}

export default function SearchPage() {
  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Hero Search Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Find Your Perfect Book
            </h1>
            <p className="text-xl text-primary-100 mb-8 text-center">
              Search by title, author, genre, or even the mood you're looking for
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
                className="w-full px-6 py-4 pr-14 rounded-lg text-primary-900 text-lg focus:outline-none focus:ring-4 focus:ring-primary-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-600 hover:bg-accent-700 text-white p-3 rounded-lg transition-colors">
                <FaSearch className="text-xl" />
              </button>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <span className="text-sm text-primary-200">Popular searches:</span>
              {['Mystery', 'Self-Help', 'Romance', 'Fantasy', 'Inspiring', 'Dark'].map((tag) => (
                <button
                  key={tag}
                  className="text-sm bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                <FaFilter />
                Filters
              </h2>

              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-primary-800 mb-3">Genre</h3>
                <div className="space-y-2">
                  {['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Fantasy', 'Self-Help', 'Biography', 'Historical'].map((genre) => (
                    <label key={genre} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-primary-300" />
                      <span className="text-primary-700">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-primary-800 mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rating" className="border-primary-300" />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <FaStar key={i} className="text-warm-500 text-sm" />
                        ))}
                        <span className="text-primary-700 ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mood Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-primary-800 mb-3">Mood</h3>
                <div className="flex flex-wrap gap-2">
                  {['Inspiring', 'Dark', 'Romantic', 'Suspenseful', 'Hopeful', 'Emotional', 'Light'].map((mood) => (
                    <button
                      key={mood}
                      className="text-sm bg-primary-100 hover:bg-primary-200 text-primary-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Publication Year */}
              <div className="mb-6">
                <h3 className="font-bold text-primary-800 mb-3">Published</h3>
                <select className="w-full border-2 border-primary-300 rounded-lg p-2 text-primary-700">
                  <option>Any time</option>
                  <option>Last year</option>
                  <option>Last 5 years</option>
                  <option>Last 10 years</option>
                  <option>Classics (pre-2000)</option>
                </select>
              </div>

              <button className="w-full btn-secondary text-sm">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary-900">
                Showing {sampleBooks.length} results
              </h2>
              <select className="border-2 border-primary-300 rounded-lg px-4 py-2 text-primary-700">
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Most Reviewed</option>
                <option>Recently Published</option>
              </select>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleBooks.map((book) => (
                <Link
                  href={`/book/${book.id}`}
                  key={book.id}
                  className="card overflow-hidden group flex flex-col sm:flex-row"
                >
                  <div className="sm:w-32 h-48 sm:h-auto bg-primary-200 overflow-hidden flex-shrink-0">
                    <img
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {book.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-primary-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-primary-600 mb-2">by {book.author}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-warm-500 text-sm" />
                        <span className="font-bold text-primary-900">{book.rating}</span>
                      </div>
                      <span className="text-xs text-primary-600">
                        ({book.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-primary-700 line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
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
          </main>
        </div>
      </div>
    </div>
  )
}
