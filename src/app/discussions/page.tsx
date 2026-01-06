import { Metadata } from 'next'
import Link from 'next/link'
import { FaComments, FaHeart, FaClock, FaPlus, FaFire } from 'react-icons/fa'
import { sampleDiscussions } from '@/data/sampleDiscussions'

export const metadata: Metadata = {
  title: 'Book Discussions & Community Forums - BookWise',
  description: 'Join thousands of readers in thoughtful book discussions. Share your opinions, get recommendations, and connect with fellow book lovers in our active community.',
  keywords: 'book discussion, book forum, book community, book club, reading community, book recommendations',
}

export default function DiscussionsPage() {
  const categories = [
    { id: 'all', label: 'All Discussions', count: sampleDiscussions.length },
    { id: 'general', label: 'General', count: sampleDiscussions.filter(d => d.category === 'general').length },
    { id: 'book-club', label: 'Book Clubs', count: sampleDiscussions.filter(d => d.category === 'book-club').length },
    { id: 'genre', label: 'Genre Discussions', count: sampleDiscussions.filter(d => d.category === 'genre').length },
    { id: 'recommendation', label: 'Recommendations', count: sampleDiscussions.filter(d => d.category === 'recommendation').length },
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'general': 'bg-blue-100 text-blue-700',
      'book-club': 'bg-purple-100 text-purple-700',
      'genre': 'bg-green-100 text-green-700',
      'recommendation': 'bg-orange-100 text-orange-700'
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  const getCategoryLabel = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Discussions & Community
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Join passionate readers in thoughtful conversations about the books we love
            </p>
            <button className="btn-accent flex items-center gap-2 mx-auto">
              <FaPlus />
              Start a Discussion
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      category.id === 'all' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.label}</span>
                      <span className={`text-sm ${category.id === 'all' ? 'text-primary-200' : 'text-primary-600'}`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Community Guidelines */}
              <div className="mt-8 pt-8 border-t border-primary-200">
                <h3 className="font-bold text-primary-900 mb-3">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-primary-700">
                  <li>• Be respectful and kind</li>
                  <li>• No spoilers without warnings</li>
                  <li>• Stay on topic</li>
                  <li>• Respect diverse opinions</li>
                </ul>
                <Link href="/guidelines" className="text-accent-600 text-sm mt-3 inline-block hover:text-accent-700">
                  Read Full Guidelines →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Discussion List */}
          <main className="lg:col-span-3">
            {/* Trending Badge */}
            <div className="flex items-center gap-2 text-orange-600 mb-6">
              <FaFire />
              <span className="font-bold">Trending Discussions</span>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {sampleDiscussions.map((discussion) => (
                <Link
                  href={`/discussion/${discussion.id}`}
                  key={discussion.id}
                  className="card p-6 block hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Author Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary-300 flex items-center justify-center text-white font-bold text-lg">
                        {discussion.author.charAt(0)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start gap-2 mb-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(discussion.category)}`}>
                          {getCategoryLabel(discussion.category)}
                        </span>
                        <span className="text-sm text-primary-600 flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {discussion.lastActivity}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-primary-900 mb-2 hover:text-primary-700 transition-colors">
                        {discussion.title}
                      </h3>

                      <p className="text-primary-700 mb-3 line-clamp-2">
                        {discussion.content}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-primary-600">
                        <span>by {discussion.author}</span>
                        <div className="flex items-center gap-2">
                          <FaComments />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaHeart />
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="btn-secondary">
                Load More Discussions
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
