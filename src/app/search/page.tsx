'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaStar, FaBook, FaComments, FaUser } from 'react-icons/fa'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('all')
  const [results, setResults] = useState<any>({ books: [], discussions: [], users: [] })
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query
    if (!q.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}&type=${searchType}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickSearch = (tag: string) => {
    setQuery(tag)
    handleSearch(tag)
  }

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
              Search by title, author, genre, or topic
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-6 py-4 pr-14 rounded-lg text-primary-900 text-lg focus:outline-none focus:ring-4 focus:ring-primary-300"
              />
              <button 
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-600 hover:bg-accent-700 text-white p-3 rounded-lg transition-colors"
              >
                <FaSearch className="text-xl" />
              </button>
            </div>

            {/* Search Type Tabs */}
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              {[
                { value: 'all', label: 'All' },
                { value: 'books', label: 'Books' },
                { value: 'discussions', label: 'Discussions' },
                { value: 'users', label: 'Users' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSearchType(type.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === type.value
                      ? 'bg-white text-primary-700 font-semibold'
                      : 'bg-primary-700 hover:bg-primary-800 text-white'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Quick Search Tags */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <span className="text-sm text-primary-200">Popular searches:</span>
              {['Mystery', 'Self-Help', 'Romance', 'Fantasy', 'Atomic', 'Habits'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickSearch(tag)}
                  className="text-sm bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-primary-600 mt-4">Searching...</p>
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="text-center py-12">
              <FaSearch className="text-6xl text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Start Your Search</h3>
              <p className="text-primary-600">Enter a book title, author, or keyword to begin</p>
            </div>
          )}

          {!loading && hasSearched && (
            <>
              {/* Books Results */}
              {(searchType === 'all' || searchType === 'books') && results.books && results.books.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                    <FaBook className="text-primary-600" />
                    Books <span className="text-primary-500">({results.books.length})</span>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.books.map((book: any) => (
                      <Link
                        key={book.id}
                        href={`/book/${book.id}`}
                        className="card hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-64 object-cover rounded-t-xl"
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-primary-900 mb-1 line-clamp-1">{book.title}</h3>
                          <p className="text-sm text-primary-600 mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < Math.floor(book.rating) ? 'text-warm-500' : 'text-primary-200'}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-primary-600">{book.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {book.genres.slice(0, 2).map((genre: string) => (
                              <span key={genre} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussions Results */}
              {(searchType === 'all' || searchType === 'discussions') && results.discussions && results.discussions.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                    <FaComments className="text-primary-600" />
                    Discussions <span className="text-primary-500">({results.discussions.length})</span>
                  </h2>
                  <div className="space-y-4">
                    {results.discussions.map((discussion: any) => (
                      <Link
                        key={discussion.id}
                        href={`/discussion/${discussion.id}`}
                        className="card p-4 hover:shadow-lg transition-shadow block"
                      >
                        <h3 className="font-semibold text-primary-900 mb-2">{discussion.title}</h3>
                        <p className="text-sm text-primary-600 line-clamp-2 mb-2">{discussion.content}</p>
                        <div className="flex items-center gap-4 text-xs text-primary-500">
                          <span>{discussion.user.name}</span>
                          <span>•</span>
                          <span>{discussion._count.comments} comments</span>
                          <span>•</span>
                          <span>{discussion.views} views</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Results */}
              {(searchType === 'all' || searchType === 'users') && results.users && results.users.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                    <FaUser className="text-primary-600" />
                    Users <span className="text-primary-500">({results.users.length})</span>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.users.map((user: any) => (
                      <div
                        key={user.id}
                        className="card p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                            <FaUser className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary-900">{user.name}</h3>
                            <p className="text-sm text-primary-600">{user.booksRead} books read</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {hasSearched && 
               (!results.books || results.books.length === 0) && 
               (!results.discussions || results.discussions.length === 0) && 
               (!results.users || results.users.length === 0) && (
                <div className="text-center py-12">
                  <FaSearch className="text-6xl text-primary-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">No Results Found</h3>
                  <p className="text-primary-600">Try different keywords or browse our catalog</p>
                  <Link href="/discover" className="btn-primary mt-4 inline-block">
                    Browse All Books
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
