'use client'

import Link from 'next/link'
import { FaBook, FaStar, FaComments, FaEdit, FaHeart, FaClock, FaGlobe, FaTwitter } from 'react-icons/fa'
import { SiGoodreads } from 'react-icons/si'
import { useProfile } from '@/contexts/ProfileContext'
import EditProfile from '@/components/profile/EditProfile'

export default function ProfilePage() {
  const { profile, isEditing, setIsEditing } = useProfile()

  if (isEditing) {
    return <EditProfile />
  }

  // Mock activity data
  const recentActivity = [
    {
      type: 'review',
      book: 'The Midnight Library',
      action: 'wrote a review',
      time: '2 days ago',
      icon: FaStar
    },
    {
      type: 'discussion',
      topic: 'Best Books of 2024',
      action: 'started a discussion',
      time: '5 days ago',
      icon: FaComments
    },
    {
      type: 'like',
      book: 'Atomic Habits',
      action: 'liked a review',
      time: '1 week ago',
      icon: FaHeart
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'
              }}
            />
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
              <p className="text-xl opacity-90 mb-4">@{profile.username}</p>
              <p className="text-lg opacity-90 max-w-2xl">{profile.bio}</p>
              
              {/* Social Links */}
              {(profile.website || profile.goodreadsUrl || profile.twitterUrl) && (
                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <FaGlobe />
                      Website
                    </a>
                  )}
                  {profile.goodreadsUrl && (
                    <a
                      href={profile.goodreadsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <SiGoodreads />
                      Goodreads
                    </a>
                  )}
                  {profile.twitterUrl && (
                    <a
                      href={profile.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <FaTwitter />
                      Twitter
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaBook className="text-primary-600 text-3xl mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{profile.booksRead}</div>
            <div className="text-gray-600">Books Read</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaStar className="text-yellow-500 text-3xl mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{profile.reviewsWritten}</div>
            <div className="text-gray-600">Reviews Written</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaComments className="text-green-600 text-3xl mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{profile.discussionsStarted}</div>
            <div className="text-gray-600">Discussions</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaClock className="text-purple-600 text-3xl mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{profile.readingGoal}</div>
            <div className="text-gray-600">Reading Goal</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <FaClock className="text-primary-600" />
                  <span>Website created {profile.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Favorite Genres</h2>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteGenres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Reading Goal Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2024 Reading Goal</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {profile.booksRead} / {profile.readingGoal}
                </div>
                <div className="text-gray-600 mb-4">books read</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((profile.booksRead / profile.readingGoal) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {Math.round((profile.booksRead / profile.readingGoal) * 100)}% Complete
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-6">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <Icon className="text-primary-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-semibold">{profile.name}</span>
                          {' '}{activity.action}{' '}
                          {activity.book && (
                            <span className="font-semibold text-primary-600">{activity.book}</span>
                          )}
                          {activity.topic && (
                            <span className="font-semibold text-primary-600">{activity.topic}</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Empty State */}
              {recentActivity.length === 0 && (
                <div className="text-center py-12">
                  <FaBook className="text-gray-300 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No activity yet</p>
                  <p className="text-gray-400 mt-2">Start reading and reviewing books to see your activity here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
