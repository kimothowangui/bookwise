import { Metadata } from 'next'
import Link from 'next/link'
import { FaClock, FaUser } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Book Blog - Reading Lists, Recommendations & More | BookWise',
  description: 'Explore curated reading lists, book recommendations, and literary insights from the BookWise community.',
  keywords: 'book blog, reading lists, book recommendations, best books, literary articles',
}

const blogPosts = [
  {
    id: '1',
    title: 'Best Books to Read If You Loved "The Midnight Library"',
    slug: 'best-books-if-you-loved-midnight-library',
    excerpt: 'If you were moved by Matt Haig\'s exploration of parallel lives and second chances, these books will speak to your soul...',
    author: 'Emily Chen',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    category: 'Recommendations',
    publishedAt: '2024-01-15',
    readTime: 8
  },
  {
    id: '2',
    title: 'Top 15 Self-Help Books That Actually Work',
    slug: 'top-self-help-books-that-work',
    excerpt: 'Not all self-help books deliver on their promises. Here are the ones that genuinely made a difference in readers\' lives...',
    author: 'Marcus Thompson',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
    category: 'Recommendations',
    publishedAt: '2024-01-14',
    readTime: 12
  },
  {
    id: '3',
    title: 'Books That Will Change Your Perspective on Life',
    slug: 'books-that-change-your-perspective',
    excerpt: 'Sometimes a book comes along that fundamentally shifts how we see the world. These are the most transformative reads...',
    author: 'Sarah Mitchell',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
    category: 'Lists',
    publishedAt: '2024-01-12',
    readTime: 10
  },
  {
    id: '4',
    title: 'The Psychology Behind Why We Love Thrillers',
    slug: 'psychology-why-we-love-thrillers',
    excerpt: 'What makes a good thriller so addictive? We dive into the neuroscience and psychology behind our love for suspenseful stories...',
    author: 'Dr. Rachel Kim',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800',
    category: 'Insights',
    publishedAt: '2024-01-10',
    readTime: 15
  },
  {
    id: '5',
    title: 'Building Better Reading Habits: A Practical Guide',
    slug: 'building-better-reading-habits',
    excerpt: 'Want to read more but struggling to find the time? Here are proven strategies to make reading a sustainable daily habit...',
    author: 'James Wilson',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    category: 'Tips',
    publishedAt: '2024-01-08',
    readTime: 7
  },
  {
    id: '6',
    title: 'Hidden Gems: Underrated Books You Need to Read',
    slug: 'hidden-gems-underrated-books',
    excerpt: 'Move over bestsellers! These lesser-known books deserve a spot on your reading list...',
    author: 'Emma Rodriguez',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    category: 'Recommendations',
    publishedAt: '2024-01-06',
    readTime: 9
  }
]

export default function BlogPage() {
  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The BookWise Blog
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Curated reading lists, recommendations, and insights from passionate readers
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${blogPosts[0].slug}`} className="card overflow-hidden group grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto bg-primary-200 overflow-hidden">
              <img
                src={blogPosts[0].coverImage}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-sm bg-accent-100 text-accent-700 px-3 py-1 rounded-full w-fit mb-4">
                Featured
              </span>
              <h2 className="text-3xl font-bold text-primary-900 mb-4 group-hover:text-primary-700 transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-primary-700 mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-primary-600">
                <span className="flex items-center gap-2">
                  <FaUser />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock />
                  {blogPosts[0].readTime} min read
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium">
            All Posts
          </button>
          {['Recommendations', 'Lists', 'Insights', 'Tips'].map((category) => (
            <button
              key={category}
              className="bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="card overflow-hidden group"
            >
              <div className="h-48 bg-primary-200 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-primary-900 mt-3 mb-3 group-hover:text-primary-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-primary-700 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-primary-600 pt-4 border-t border-primary-200">
                  <span className="flex items-center gap-1">
                    <FaUser />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock />
                    {post.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
