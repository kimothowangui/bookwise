/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'm.media-amazon.com'],
  },
  // Enable static export for better performance
  output: 'standalone',
}

module.exports = nextConfig
