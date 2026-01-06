// Organization structured data for the website

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BookWise",
    "description": "A community of passionate readers discovering, reviewing, and discussing books.",
    "url": "https://bookwise-wine.vercel.app",
    "logo": "https://bookwise-wine.vercel.app/logo.png",
    "sameAs": [
      "https://twitter.com/bookwise",
      "https://facebook.com/bookwise",
      "https://instagram.com/bookwise"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@bookwise.com"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
