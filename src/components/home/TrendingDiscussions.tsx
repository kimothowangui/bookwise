import Link from 'next/link'
import { FaComments, FaHeart, FaClock } from 'react-icons/fa'
import { Discussion } from '@/types'

interface TrendingDiscussionsProps {
  discussions: Discussion[]
}

export default function TrendingDiscussions({ discussions }: TrendingDiscussionsProps) {
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
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Trending Discussions
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Join the conversation — thoughtful debates, book recommendations, and passionate readers sharing their love of literature.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {discussions.map((discussion) => (
            <Link
              href={`/discussion/${discussion.id}`}
              key={discussion.id}
              className="card p-6 block hover:shadow-2xl transition-shadow"
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

        <div className="text-center mt-12">
          <Link 
            href="/discussions" 
            className="btn-primary"
          >
            View All Discussions
          </Link>
        </div>
      </div>
    </section>
  )
}
