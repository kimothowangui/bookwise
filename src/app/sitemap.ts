// Dynamic sitemap generation for SEO
import { MetadataRoute } from 'next'
import { sampleBooks } from '@/data/sampleBooks'
import { sampleDiscussions } from '@/data/sampleDiscussions'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bookwise-wine.vercel.app'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/discussions`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Book pages
  const bookPages = sampleBooks.map((book) => ({
    url: `${baseUrl}/book/${book.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Discussion pages
  const discussionPages = sampleDiscussions.map((discussion) => ({
    url: `${baseUrl}/discussion/${discussion.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...bookPages, ...discussionPages]
}
