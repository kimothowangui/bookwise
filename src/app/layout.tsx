import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = {
  title: 'BookWise - Discover Your Next Favorite Book',
  description: 'Join thousands of readers discovering, reviewing, and discussing books. Find honest reviews, engage in thoughtful conversations, and discover your next great read.',
  keywords: 'book reviews, book recommendations, book discussion, reading community, book club, best books',
  authors: [{ name: 'BookWise Community' }],
  openGraph: {
    title: 'BookWise - Discover Your Next Favorite Book',
    description: 'Join thousands of readers discovering, reviewing, and discussing books.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookWise - Discover Your Next Favorite Book',
    description: 'Join thousands of readers discovering, reviewing, and discussing books.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Google Analytics (optional, set NEXT_PUBLIC_GA_ID to enable) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
