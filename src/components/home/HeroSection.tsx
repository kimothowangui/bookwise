import Link from 'next/link'
import { FaSearch, FaComments } from 'react-icons/fa'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline - SEO Optimized */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
            Discover Your Next Favorite Book — 
            <span className="text-primary-700"> Reviewed by Real Readers</span>
          </h1>
          
          {/* Subheadline - Trust & Discovery Focused */}
          <p className="text-xl md:text-2xl text-primary-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join thousands of passionate readers discovering honest reviews, engaging in thoughtful discussions, 
            and finding books that truly resonate.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-primary-600">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">50K+</div>
              <div className="text-sm">Book Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">10K+</div>
              <div className="text-sm">Active Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">500+</div>
              <div className="text-sm">Daily Discussions</div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/discover" 
              className="btn-primary flex items-center gap-2 w-full sm:w-auto text-lg"
            >
              <FaSearch />
              Discover Books
            </Link>
            <Link 
              href="/discussions" 
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto text-lg"
            >
              <FaComments />
              Join Discussions
            </Link>
          </div>

          {/* Secondary Message */}
          <p className="mt-8 text-primary-600 text-sm">
            No account needed to browse • Free to join • Trusted by readers worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
