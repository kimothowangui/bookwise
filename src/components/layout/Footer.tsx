import Link from 'next/link'
import { FaTwitter, FaFacebook, FaInstagram, FaBook, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 text-primary-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaBook className="text-2xl text-accent-400" />
              <h3 className="text-xl font-bold text-white">BookWise</h3>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed">
              A community of passionate readers discovering, reviewing, and discussing the books that move us.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-primary-300 hover:text-accent-400 transition-colors" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-primary-300 hover:text-accent-400 transition-colors" aria-label="Facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-primary-300 hover:text-accent-400 transition-colors" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/reviews" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Browse Reviews
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Discover Books
                </Link>
              </li>
              <li>
                <Link href="/discussions" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Join Discussions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="text-white font-bold mb-4">Popular Genres</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/genre/fiction" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link href="/genre/mystery" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Mystery & Thriller
                </Link>
              </li>
              <li>
                <Link href="/genre/romance" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/genre/self-help" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Self-Help
                </Link>
              </li>
              <li>
                <Link href="/genre/fantasy" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Fantasy & Sci-Fi
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-primary-200 hover:text-accent-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-200 hover:text-accent-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-8 pt-8 text-center">
          <p className="text-primary-300 text-sm flex items-center justify-center gap-2">
            Made with <FaHeart className="text-accent-500" /> by the BookWise Community
          </p>
          <p className="text-primary-400 text-xs mt-2">
            © {currentYear} BookWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
