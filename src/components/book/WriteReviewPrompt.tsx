'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaStar, FaPenFancy } from 'react-icons/fa'

interface WriteReviewPromptProps {
  bookTitle: string
  bookId: string
}

export default function WriteReviewPrompt({ bookTitle, bookId }: WriteReviewPromptProps) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  if (isAuthenticated) {
    // Show write review form (you can expand this later)
    return (
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FaPenFancy className="text-2xl text-primary-600" />
          <h3 className="text-2xl font-bold text-primary-900">Write Your Review</h3>
        </div>
        <p className="text-primary-700 mb-6">
          Share your thoughts about <span className="font-semibold">{bookTitle}</span> with the BookWise community.
        </p>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
          <FaStar className="text-yellow-300" />
          Start Writing Review
        </button>
      </div>
    )
  }

  // Show sign-in prompt for non-authenticated users
  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-300 rounded-xl p-8 mb-8 text-center">
      <div className="max-w-2xl mx-auto">
        <FaPenFancy className="text-5xl text-primary-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary-900 mb-3">
          Want to Write a Review?
        </h3>
        <p className="text-primary-700 mb-6 text-lg">
          Join BookWise to share your thoughts on <span className="font-semibold">{bookTitle}</span> and connect with fellow readers!
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-primary-600">
            <FaStar className="text-yellow-500" />
            <span className="text-sm">Rate books</span>
          </div>
          <div className="flex items-center gap-2 text-primary-600">
            <FaPenFancy className="text-primary-500" />
            <span className="text-sm">Write reviews</span>
          </div>
          <div className="flex items-center gap-2 text-primary-600">
            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <span className="text-sm">Join discussions</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href={`/auth/signup?callbackUrl=/book/${bookId}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            Sign Up Free
          </Link>
          <Link
            href={`/auth/signin?callbackUrl=/book/${bookId}`}
            className="bg-white hover:bg-primary-50 text-primary-700 border-2 border-primary-300 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>

        <p className="text-sm text-primary-500 mt-4">
          Already have an account? Sign in to start reviewing!
        </p>
      </div>
    </div>
  )
}
