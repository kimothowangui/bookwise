# 🚀 Backend Quick Start Guide

Get your BookWise backend up and running in 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ A Supabase account (free)
- ✅ A Cloudinary account (free)

## 5-Minute Setup

### Step 1: Get Supabase Database URL (2 min)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for project creation (~2 min)
3. Go to **Settings** → **Database** → **Connection string** → Copy **URI**
4. Replace `[YOUR-PASSWORD]` with your database password

### Step 2: Get Cloudinary Credentials (1 min)

1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. From Dashboard, copy:
   - Cloud Name
   - API Key  
   - API Secret

### Step 3: Configure Environment (1 min)

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   # Database
   DATABASE_URL="your-supabase-url-here"

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=any-random-string-here

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Step 4: Setup Database (1 min)

Run these commands:

```bash
# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:push

# Seed with sample data (optional)
npm run db:seed
```

### Step 5: Start Development Server

```bash
npm run dev
```

🎉 **Done!** Your backend is running at `http://localhost:3000`

## Test It Works

Open your browser console and paste:

```javascript
// Test fetching books
fetch('http://localhost:3000/api/books')
  .then(r => r.json())
  .then(console.log)

// Test search
fetch('http://localhost:3000/api/search?q=atomic&type=books')
  .then(r => r.json())
  .then(console.log)
```

## View Your Data

Open Prisma Studio to see and edit your data:

```bash
npm run db:studio
```

Opens at `http://localhost:5555`

## What's Next?

- 📖 Read [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed setup
- 🧪 Read [API_TESTING.md](./API_TESTING.md) for testing guide
- 🎨 Connect your frontend components to the API
- 🚀 Deploy to Vercel (see DEPLOYMENT.md)

## Need Help?

### Common Issues

**"Prisma Client not found"**
```bash
npm run db:generate
```

**"Can't connect to database"**
- Check your DATABASE_URL is correct
- Make sure Supabase project is active

**"NextAuth error"**
- Make sure NEXTAUTH_SECRET is set (can be any random string)

## Demo Credentials

If you ran the seed script:
- Email: `demo@bookwise.com`
- Password: `password123`

---

**Questions?** Check the [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed documentation.
