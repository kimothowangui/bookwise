'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserProfile } from '@/types'

interface ProfileContextType {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
}

const defaultProfile: UserProfile = {
  name: 'Book Lover',
  username: 'booklover123',
  email: 'reader@example.com',
  bio: 'Passionate reader and book reviewer. Always looking for the next great read!',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
  favoriteGenres: ['Fiction', 'Mystery', 'Self-Help'],
  readingGoal: 24,
  website: '',
  goodreadsUrl: '',
  twitterUrl: '',
  booksRead: 47,
  reviewsWritten: 23,
  discussionsStarted: 8,
  joinedDate: 'January 2026'
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isEditing, setIsEditing] = useState(false)

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('bookwise_profile')
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile))
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }
  }, [])

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookwise_profile', JSON.stringify(profile))
  }, [profile])

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isEditing, setIsEditing }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
