// SEO Schema Markup Component for Book Reviews
// Implements structured data for better search engine visibility

interface BookSchemaProps {
  book: {
    title: string
    author: string
    isbn?: string
    rating: number
    reviewCount: number
    description: string
    coverImage: string
    publishedYear: number
    genres: string[]
  }
}

export default function BookSchema({ book }: BookSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "author": {
      "@type": "Person",
      "name": book.author
    },
    "isbn": book.isbn,
    "datePublished": book.publishedYear.toString(),
    "description": book.description,
    "image": book.coverImage,
    "genre": book.genres,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": book.rating,
      "reviewCount": book.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
