// SEO Schema Markup for Individual Reviews

interface ReviewSchemaProps {
  review: {
    title: string
    content: string
    rating: number
    userName: string
    createdAt: string
  }
  bookTitle: string
}

export default function ReviewSchema({ review, bookTitle }: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Book",
      "name": bookTitle
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "name": review.title,
    "author": {
      "@type": "Person",
      "name": review.userName
    },
    "datePublished": review.createdAt,
    "reviewBody": review.content
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
