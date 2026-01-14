'use client'

import { useState } from 'react'
import { useProfile } from '@/contexts/ProfileContext'
import { FaSave, FaTimes, FaUser, FaEnvelope, FaBook, FaGlobe, FaTwitter } from 'react-icons/fa'
import { SiGoodreads } from 'react-icons/si'

const availableGenres = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance', 'Science Fiction',
  'Fantasy', 'Horror', 'Biography', 'History', 'Self-Help', 'Business',
  'Poetry', 'Young Adult', 'Children', 'Literary Fiction', 'Historical Fiction'
]

export default function EditProfile() {
  const { profile, updateProfile, setIsEditing } = useProfile()
  const [formData, setFormData] = useState(profile)
  const [imagePreview, setImagePreview] = useState(profile.avatar)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setImagePreview(profile.avatar)
    setIsEditing(false)
  }

  const handleGenreToggle = (genre: string) => {
    const newGenres = formData.favoriteGenres.includes(genre)
      ? formData.favoriteGenres.filter(g => g !== genre)
      : [...formData.favoriteGenres, genre]
    setFormData({ ...formData, favoriteGenres: newGenres })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, avatar: value })
    setImagePreview(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-6">
                <img
                  src={imagePreview || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'
                  }}
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={handleImageChange}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">Enter a URL to an image (e.g., from Unsplash or Imgur)</p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us about yourself and your reading interests..."
              />
            </div>

            {/* Reading Goal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaBook className="inline mr-2" />
                Annual Reading Goal
              </label>
              <input
                type="number"
                value={formData.readingGoal}
                onChange={(e) => setFormData({ ...formData, readingGoal: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">How many books do you want to read this year?</p>
            </div>

            {/* Favorite Genres */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Favorite Genres
              </label>
              <div className="flex flex-wrap gap-2">
                {availableGenres.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.favoriteGenres.includes(genre)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Social Links (Optional)</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaGlobe className="inline mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <SiGoodreads className="inline mr-2" />
                  Goodreads Profile
                </label>
                <input
                  type="url"
                  value={formData.goodreadsUrl || ''}
                  onChange={(e) => setFormData({ ...formData, goodreadsUrl: e.target.value })}
                  placeholder="https://goodreads.com/user/show/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaTwitter className="inline mr-2" />
                  Twitter/X Profile
                </label>
                <input
                  type="url"
                  value={formData.twitterUrl || ''}
                  onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                  placeholder="https://twitter.com/username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaSave />
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
