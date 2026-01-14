# BookWise Backend Setup Guide

This guide will help you set up the complete backend for BookWise with database, authentication, and all API endpoints.

## 🏗️ Architecture Overview

- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Authentication**: NextAuth.js with credentials + OAuth (Google, GitHub)
- **Image Storage**: Cloudinary
- **API**: Next.js App Router API Routes

## 📋 Prerequisites

1. Node.js 18+ installed
2. A Supabase account (free tier works great)
3. A Cloudinary account (free tier included)
4. (Optional) Google and/or GitHub OAuth apps for social login

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

All dependencies are already installed:
- `@prisma/client` - Prisma ORM client
- `@auth/prisma-adapter` - NextAuth.js Prisma adapter
- `next-auth` - Authentication library
- `bcryptjs` - Password hashing
- `cloudinary` & `next-cloudinary` - Image uploads
- `zod` - Schema validation
- `prisma` - Prisma CLI (dev dependency)

### 2. Set Up Supabase Database

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose a name, database password, and region
   - Wait for the project to be created (~2 minutes)

2. **Get Your Database URL**:
   - Go to Project Settings > Database
   - Scroll to "Connection string" section
   - Copy the "URI" connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres`

3. **Create `.env.local` file**:
   ```bash
   cp .env.example .env.local
   ```

4. **Update `.env.local`** with your database URL:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
   ```

### 3. Set Up NextAuth.js

1. **Generate a secret key**:
   ```bash
   # On Windows (PowerShell)
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # On Mac/Linux
   openssl rand -base64 32
   ```

2. **Add to `.env.local`**:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret-here
   ```

### 4. Set Up Cloudinary

1. **Create a Cloudinary Account**:
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free
   - Go to Dashboard

2. **Get Your Credentials**:
   - Cloud Name
   - API Key
   - API Secret

3. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### 5. (Optional) Set Up OAuth Providers

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

#### GitHub OAuth:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Secret to `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

### 6. Initialize and Migrate Database

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Push the schema to your database**:
   ```bash
   npx prisma db push
   ```

3. **Open Prisma Studio** (optional - to view/edit data):
   ```bash
   npx prisma studio
   ```

### 7. Seed the Database (Optional)

You can migrate your existing sample data to the database. Create a seed script:

```bash
npx prisma db seed
```

Or manually add books through the API or Prisma Studio.

### 8. Start Development Server

```bash
npm run dev
```

Your backend is now running at `http://localhost:3000`!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Sign in (handled by NextAuth)
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Sign out

### Books
- `GET /api/books` - Get all books (with filters)
- `POST /api/books` - Create a book (authenticated)
- `GET /api/books/[id]` - Get single book with reviews
- `PATCH /api/books/[id]` - Update book (authenticated)
- `DELETE /api/books/[id]` - Delete book (authenticated)

### Reviews
- `GET /api/reviews` - Get all reviews (with filters)
- `POST /api/reviews` - Create a review (authenticated)
- `GET /api/reviews/[id]` - Get single review
- `PATCH /api/reviews/[id]` - Update review (own only)
- `DELETE /api/reviews/[id]` - Delete review (own only)

### Discussions
- `GET /api/discussions` - Get all discussions (with filters)
- `POST /api/discussions` - Create discussion (authenticated)
- `GET /api/discussions/[id]` - Get discussion with comments
- `PATCH /api/discussions/[id]` - Update discussion (own only)
- `DELETE /api/discussions/[id]` - Delete discussion (own only)

### Comments
- `POST /api/comments` - Create comment (authenticated)
- `PATCH /api/comments/[id]` - Update comment (own only)
- `DELETE /api/comments/[id]` - Delete comment (own only)

### Users
- `GET /api/users/[id]` - Get user profile
- `PATCH /api/users/[id]` - Update profile (own only)

### Reading List
- `GET /api/reading-list` - Get user's reading list (authenticated)
- `POST /api/reading-list` - Add book to reading list (authenticated)
- `PATCH /api/reading-list/[id]` - Update reading list item
- `DELETE /api/reading-list/[id]` - Remove from reading list

### Likes
- `POST /api/likes` - Toggle like on review or discussion (authenticated)

### Search
- `GET /api/search?q=query&type=all` - Search books, discussions, users

### Upload
- `POST /api/upload` - Upload image to Cloudinary (authenticated)

## 🧪 Testing the API

You can test the API using:

1. **Browser** (for GET requests)
2. **Postman** or **Insomnia**
3. **cURL** commands
4. **Thunder Client** (VS Code extension)

Example cURL commands:

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Get all books
curl http://localhost:3000/api/books

# Search
curl "http://localhost:3000/api/search?q=atomic&type=books"
```

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT-based session management
- Protected API routes (authentication required)
- Owner-only operations (edit/delete own content)
- Input validation with Zod
- SQL injection protection (Prisma)
- Environment variable security

## 📊 Database Schema

The schema includes:
- **Users** - User accounts and profiles
- **Books** - Book information
- **Reviews** - Book reviews
- **Discussions** - Community discussions
- **Comments** - Discussion comments (with nested replies)
- **Likes** - Likes on reviews and discussions
- **ReadingList** - User reading lists with status tracking
- **Session/Account/VerificationToken** - NextAuth.js tables

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

Make sure to update these in production:
- `NEXTAUTH_URL` → Your production domain
- `DATABASE_URL` → Use Supabase connection pooler for production
- OAuth redirect URIs → Add production URLs

## 📚 Next Steps

1. **Seed Initial Data**: Add some books to get started
2. **Update Frontend**: Connect React components to API endpoints
3. **Add Admin Panel**: Create admin routes for content management
4. **Add Email Verification**: Implement email verification flow
5. **Add Password Reset**: Implement forgot password functionality
6. **Add Rate Limiting**: Protect API from abuse
7. **Add Caching**: Implement Redis or similar for performance

## 🆘 Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Database connection failed"
- Check your DATABASE_URL in `.env.local`
- Verify Supabase project is running
- Check firewall/network settings

### "NextAuth configuration error"
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain

### "Cloudinary upload fails"
- Verify all Cloudinary credentials
- Check file size (max 5MB)
- Ensure file is an image

## 📖 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 🎉 You're All Set!

Your BookWise backend is now fully configured and ready to use!
