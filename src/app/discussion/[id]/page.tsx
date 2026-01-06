import { Metadata } from 'next'
import Link from 'next/link'
import { FaHeart, FaReply, FaClock, FaArrowLeft } from 'react-icons/fa'
import { sampleDiscussions } from '@/data/sampleDiscussions'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const discussion = sampleDiscussions.find(d => d.id === params.id)
  
  if (!discussion) {
    return {
      title: 'Discussion Not Found - BookWise'
    }
  }

  return {
    title: `${discussion.title} - BookWise Discussions`,
    description: discussion.content.substring(0, 160),
  }
}

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const discussion = sampleDiscussions.find(d => d.id === params.id)

  if (!discussion) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">Discussion Not Found</h1>
        <Link href="/discussions" className="btn-primary">
          Back to Discussions
        </Link>
      </div>
    )
  }

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

  // Mock replies for demonstration
  const mockReplies = [
    {
      id: '1',
      author: 'Sarah Johnson',
      content: 'Great question! For me, it was "Educated" by Tara Westover. Her journey from a survivalist family to PhD student at Cambridge made me reconsider everything I thought I knew about the power of education and self-determination.',
      likes: 23,
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      author: 'Tom Martinez',
      content: 'I have to agree with the original post about "Man\'s Search for Meaning". Frankl\'s insights about finding meaning in suffering have stayed with me for years. It completely changed how I approach difficult situations in my own life.',
      likes: 18,
      createdAt: '1 hour ago'
    },
    {
      id: '3',
      author: 'Emily Chen',
      content: '"The Midnight Library" by Matt Haig shifted my perspective on regret and the choices we make. It helped me realize that every path has its own challenges and beauty. We often idealize the roads not taken without considering their own difficulties.',
      likes: 31,
      createdAt: '45 minutes ago'
    }
  ]

  return (
    <div className="bg-primary-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/discussions" 
          className="flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Discussions</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Original Post */}
          <div className="card p-8 mb-8">
            {/* Category & Time */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(discussion.category)}`}>
                {getCategoryLabel(discussion.category)}
              </span>
              <span className="text-sm text-primary-600 flex items-center gap-1">
                <FaClock className="text-xs" />
                Posted {discussion.lastActivity}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {discussion.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-primary-200">
              <div className="w-12 h-12 rounded-full bg-primary-300 flex items-center justify-center text-white font-bold text-lg">
                {discussion.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-primary-900">{discussion.author}</p>
                <p className="text-sm text-primary-600">Community Member</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-primary-700 leading-relaxed">
                {discussion.content}
              </p>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 pt-6 border-t border-primary-200">
              <button className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium transition-colors">
                <FaHeart />
                <span>{discussion.likes} Likes</span>
              </button>
              <div className="flex items-center gap-2 text-primary-600">
                <FaReply />
                <span>{discussion.replies} Replies</span>
              </div>
            </div>
          </div>

          {/* Reply Form */}
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Add Your Thoughts</h2>
            <textarea
              className="w-full border-2 border-primary-300 rounded-lg p-4 focus:border-primary-600 focus:outline-none mb-4"
              rows={5}
              placeholder="Share your perspective..."
            ></textarea>
            <button className="btn-primary">
              Post Reply
            </button>
          </div>

          {/* Replies */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-900">
              {mockReplies.length} Replies
            </h2>

            {mockReplies.map((reply) => (
              <div key={reply.id} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {reply.author.charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-primary-900">{reply.author}</p>
                      <span className="text-sm text-primary-600">{reply.createdAt}</span>
                    </div>
                    <p className="text-primary-700 leading-relaxed mb-4">
                      {reply.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-primary-600 hover:text-accent-600 transition-colors">
                        <FaHeart />
                        <span>{reply.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 transition-colors">
                        <FaReply />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
