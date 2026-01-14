'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FaBook, FaSearch, FaUser, FaBars, FaTimes, FaComments, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <FaBook className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-800">BookWise</h1>
              <p className="text-xs text-primary-600 hidden sm:block">Your Literary Community</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/reviews" className="text-primary-700 hover:text-primary-900 font-medium transition-colors">
              Browse Reviews
            </Link>
            <Link href="/discussions" className="text-primary-700 hover:text-primary-900 font-medium transition-colors flex items-center gap-2">
              <FaComments /> Discussions
            </Link>
            <Link href="/discover" className="text-primary-700 hover:text-primary-900 font-medium transition-colors">
              Discover
            </Link>
            <Link href="/blog" className="text-primary-700 hover:text-primary-900 font-medium transition-colors">
              Blog
            </Link>
          </div>

          {/* Search & User Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/search" 
              className="hidden md:flex items-center gap-2 bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg transition-colors"
            >
              <FaSearch />
              <span className="hidden xl:inline">Search Books</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile" 
                  className="hidden md:flex items-center gap-2 text-primary-700 hover:text-primary-900 transition-colors"
                >
                  <FaUser className="text-xl" />
                  <span className="hidden xl:inline">{session.user?.name || 'My Profile'}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors"
                  aria-label="Sign out"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span className="hidden xl:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="hidden md:flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="hidden md:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-primary-700 text-2xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-primary-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/search" 
                className="flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSearch /> Search Books
              </Link>
              <Link 
                href="/reviews" 
                className="text-primary-700 hover:text-primary-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Reviews
              </Link>
              <Link 
                href="/discussions" 
                className="flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaComments /> Discussions
              </Link>
              <Link 
                href="/discover" 
                className="text-primary-700 hover:text-primary-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Discover
              </Link>
              <Link 
                href="/blog" 
                className="text-primary-700 hover:text-primary-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              {/* Mobile Auth Buttons */}
              <div className="border-t border-primary-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium mb-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUser /> {session.user?.name || 'My Profile'}
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium w-full"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/signin" 
                      className="block text-center bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg font-medium mb-2 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      className="block text-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
