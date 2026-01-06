import { Metadata } from 'next'
import Link from 'next/link'
import { FaBook, FaStar, FaComments, FaEdit, FaHeart, FaClock } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'My Profile - BookWise',
  description: 'Manage your reading list, reviews, and discussions on BookWise.',
}

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    bio: 'Passionate reader with a love for psychological thrillers and literary fiction. Always looking for my next great read!',
    favoriteGenres: ['Mystery', 'Thriller', 'Literary Fiction', 'Memoir'],
    booksRead: 127,
    reviewsWritten: 34,
    joinedDate: 'January 2023',
    stats: {
      averageRating: 4.2,
      discussionReplies: 156,
      helpfulVotes: 342
    }
  }

  const readingList = [
    { id: '1', title: 'The Midnight Library', author: 'Matt Haig', status: 'reading', progress: 65 },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', status: 'want-to-read' },
    { id: '3', title: 'The Silent Patient', author: 'Alex Michaelides', status: 'completed', rating: 5 },
  ]

  const recentReviews = [
    { 
      id: 'r1', 
      bookTitle: 'The Midnight Library', 
      rating: 5, 
      excerpt: 'A beautiful meditation on life and choices...',
      date: '2 days ago',
      helpful: 23
    },
    { 
      id: 'r2', 
      bookTitle: 'Educated', 
      rating: 5, 
      excerpt: 'An incredibly powerful and inspiring memoir...',
      date: '1 week ago',
      helpful: 45
    },
  ]

  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-primary-100 mb-4">{user.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {user.favoriteGenres.map((genre) => (
                  <span key={genre} className="bg-primary-800 text-white px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <button className="btn-secondary bg-white hover:bg-primary-50 flex items-center gap-2">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-primary-800 bg-opacity-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{user.booksRead}</div>
              <div className="text-sm text-primary-200">Books Read</div>
            </div>
            <div className="bg-primary-800 bg-opacity-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{user.reviewsWritten}</div>
              <div className="text-sm text-primary-200">Reviews Written</div>
            </div>
            <div className="bg-primary-800 bg-opacity-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{user.stats.discussionReplies}</div>
              <div className="text-sm text-primary-200">Discussion Replies</div>
            </div>
            <div className="bg-primary-800 bg-opacity-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{user.stats.helpfulVotes}</div>
              <div className="text-sm text-primary-200">Helpful Votes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reading List */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary-900 flex items-center gap-2">
                  <FaBook />
                  My Reading List
                </h2>
                <Link href="/profile/reading-list" className="text-accent-600 hover:text-accent-700 font-medium">
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {readingList.map((book) => (
                  <div key={book.id} className="flex items-center gap-4 pb-4 border-b border-primary-200 last:border-0">
                    <div className="w-16 h-24 bg-primary-200 rounded flex-shrink-0"></div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-primary-900 mb-1">{book.title}</h3>
                      <p className="text-sm text-primary-600 mb-2">by {book.author}</p>
                      
                      {book.status === 'reading' && book.progress && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-primary-600 mb-1">
                            <span>Progress</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="w-full bg-primary-200 rounded-full h-2">
                            <div 
                              className="bg-accent-600 h-2 rounded-full" 
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          book.status === 'reading' ? 'bg-blue-100 text-blue-700' :
                          book.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {book.status === 'reading' ? 'Currently Reading' :
                           book.status === 'completed' ? 'Completed' :
                           'Want to Read'}
                        </span>
                        {book.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <FaStar className="text-warm-500" />
                            <span className="font-bold">{book.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Reviews */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary-900 flex items-center gap-2">
                  <FaStar />
                  My Recent Reviews
                </h2>
                <Link href="/profile/reviews" className="text-accent-600 hover:text-accent-700 font-medium">
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-primary-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-primary-900">{review.bookTitle}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <FaStar key={i} className="text-warm-500 text-sm" />
                        ))}
                      </div>
                    </div>
                    <p className="text-primary-700 mb-3">{review.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-primary-600">
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {review.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart />
                        {review.helpful} found helpful
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="font-bold text-primary-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary text-sm">
                  Write a Review
                </button>
                <button className="w-full btn-secondary text-sm">
                  Start Discussion
                </button>
                <button className="w-full btn-secondary text-sm">
                  Find Books
                </button>
              </div>
            </div>

            {/* Reading Goal */}
            <div className="card p-6">
              <h3 className="font-bold text-primary-900 mb-4">2024 Reading Goal</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-primary-900 mb-1">127 / 150</div>
                <div className="text-sm text-primary-600">books read</div>
              </div>
              <div className="w-full bg-primary-200 rounded-full h-3 mb-2">
                <div className="bg-accent-600 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm text-primary-600 text-center">
                You're 85% of the way there! 🎉
              </p>
            </div>

            {/* Recent Activity */}
            <div className="card p-6">
              <h3 className="font-bold text-primary-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <FaComments className="text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-primary-700">Replied to discussion</p>
                    <p className="text-xs text-primary-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-warm-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-primary-700">Reviewed a book</p>
                    <p className="text-xs text-primary-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaHeart className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-primary-700">Added to reading list</p>
                    <p className="text-xs text-primary-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
