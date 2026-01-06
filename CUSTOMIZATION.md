# Customization Guide for BookWise

## 🎨 Branding & Colors

### Changing Color Palette

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors here
        50: '#your-color',
        100: '#your-color',
        // ... etc
      }
    }
  }
}
```

### Logo & Branding

1. Replace the book icon in `src/components/layout/Header.tsx`
2. Add your logo image to `/public/logo.png`
3. Update the logo in `src/components/SEO/OrganizationSchema.tsx`

```tsx
// Replace this in Header.tsx
<div className="bg-primary-600 p-2 rounded-lg">
  <FaBook className="text-white text-2xl" />
</div>

// With this
<img src="/logo.png" alt="Your Brand" className="h-10" />
```

## 📚 Content Management

### Adding Books

Edit `src/data/sampleBooks.ts`:

```typescript
{
  id: 'unique-slug',
  title: 'Book Title',
  author: 'Author Name',
  coverImage: 'https://image-url.com/cover.jpg',
  rating: 4.5,
  reviewCount: 150,
  genres: ['Fiction', 'Mystery'],
  publishedYear: 2024,
  description: 'Compelling book description...',
  pageCount: 350,
  mood: ['Suspenseful', 'Dark'],
  isbn: '9781234567890'
}
```

### Writing Custom Reviews

Edit `src/components/book/BookReviewSection.tsx` to add your custom review content for each book.

### Adding Discussions

Edit `src/data/sampleDiscussions.ts`:

```typescript
{
  id: 'discussion-slug',
  title: 'Discussion Title',
  category: 'general',
  author: 'Your Name',
  content: 'Discussion content...',
  replies: 0,
  likes: 0,
  createdAt: '2024-01-15',
  lastActivity: '1 hour ago'
}
```

## 🔗 Affiliate Links

### Amazon Affiliate Integration

In `src/components/book/BookHeader.tsx` and `BookReviewSection.tsx`, update the buy buttons:

```tsx
<a 
  href={`https://www.amazon.com/dp/${book.isbn}?tag=YOUR-AFFILIATE-TAG`}
  target="_blank"
  rel="noopener noreferrer nofollow sponsored"
  className="btn-accent"
>
  Buy This Book
</a>
```

### BookShop.org Integration

```tsx
<a 
  href={`https://bookshop.org/a/YOUR-AFFILIATE-ID/9780735211292`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-accent"
>
  Buy from Bookshop.org
</a>
```

## 🎯 SEO Customization

### Update Site Information

1. **Domain URLs**: Update in these files:
   - `src/app/sitemap.ts`
   - `src/components/SEO/SEOHead.tsx`
   - `src/components/SEO/BreadcrumbSchema.tsx`
   - `src/components/SEO/OrganizationSchema.tsx`

2. **Site Name**: Search for "BookWise" and replace with your brand name

3. **Social Media Links**: Update in `src/components/layout/Footer.tsx` and `OrganizationSchema.tsx`

### Meta Descriptions

Each page has metadata. Example from `src/app/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Site - Your Tagline',
  description: 'Your custom description...',
  keywords: 'your, custom, keywords',
}
```

## 🖼️ Images & Assets

### Book Covers

Replace placeholder images in `sampleBooks.ts` with:
- Direct URLs to book covers
- Your own hosted images in `/public/books/`
- API-fetched covers (Google Books API, Open Library)

### Hero Images

Update hero section backgrounds in page components:

```tsx
<section className="bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50">
  // Or use a background image
  <div 
    className="bg-cover bg-center" 
    style={{ backgroundImage: "url('/hero-bg.jpg')" }}
  >
```

## 📱 Layout Customization

### Header Navigation

Edit `src/components/layout/Header.tsx` to add/remove navigation items:

```tsx
<Link href="/your-page" className="text-primary-700 hover:text-primary-900">
  Your Link
</Link>
```

### Footer Links

Update `src/components/layout/Footer.tsx` with your links, social media, and legal pages.

### Homepage Sections

Reorder or remove sections in `src/app/page.tsx`:

```tsx
<HeroSection />
<FeaturedBooks books={sampleBooks} />
<TrendingDiscussions discussions={sampleDiscussions} />
// Add your custom sections here
```

## 🗄️ Adding Database Integration

### 1. Choose a Database
- PostgreSQL (recommended)
- MongoDB
- MySQL
- Supabase
- PlanetScale

### 2. Install ORM
```bash
npm install prisma @prisma/client
# or
npm install mongoose
```

### 3. Create Data Models

Example Prisma schema:
```prisma
model Book {
  id          String   @id @default(cuid())
  title       String
  author      String
  description String
  rating      Float
  reviews     Review[]
}

model Review {
  id      String @id @default(cuid())
  bookId  String
  book    Book   @relation(fields: [bookId], references: [id])
  rating  Int
  content String
}
```

### 4. Update Pages to Fetch Data

```typescript
// app/book/[id]/page.tsx
export async function generateStaticParams() {
  const books = await prisma.book.findMany()
  return books.map((book) => ({ id: book.id }))
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: { reviews: true }
  })
  
  return <BookHeader book={book} />
}
```

## 🔐 Authentication

### NextAuth.js Integration

```bash
npm install next-auth
```

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

Update profile page to use real authentication.

## 📊 Analytics Integration

### Google Analytics

```bash
npm install @next/third-parties
```

Add to `src/app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Plausible Analytics (Privacy-friendly)

Add to `src/app/layout.tsx`:

```tsx
<Script 
  defer 
  data-domain="yourdomain.com" 
  src="https://plausible.io/js/script.js"
/>
```

## 🎨 Advanced Styling

### Custom Fonts

Add to `src/app/layout.tsx`:

```tsx
import { Inter, Lora } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${lora.variable}`}>
```

Update `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['var(--font-inter)'],
  serif: ['var(--font-lora)'],
}
```

### Dark Mode

Add to `tailwind.config.js`:

```javascript
darkMode: 'class',
```

Create a theme toggle component and add dark mode variants to your styles.

## 🔌 API Integrations

### Google Books API

```typescript
export async function searchBooks(query: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  )
  return response.json()
}
```

### OpenAI for AI-Generated Reviews

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateReview(bookTitle: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `Write a review for ${bookTitle}` }],
    model: "gpt-4",
  })
  return completion.choices[0].message.content
}
```

## 🚀 Performance Optimization

### Enable Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'yourdomain.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### Implement ISR

```typescript
export const revalidate = 3600 // Revalidate every hour

export default async function BookPage() {
  // Your code
}
```

---

Need more help? Check the individual component files - they're heavily commented!
