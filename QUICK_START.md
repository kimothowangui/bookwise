# 🚀 Quick Start Guide - Get Running in 5 Minutes

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

**What this does:** Installs Next.js, React, Tailwind CSS, TypeScript, and React Icons.

## Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

**What this does:** Starts the development server at http://localhost:3000

## Step 3: Explore the Site (3 minutes)

Open your browser and visit:

### 🏠 Main Pages
- **Home**: http://localhost:3000
- **Book Review**: http://localhost:3000/book/1
- **Discussions**: http://localhost:3000/discussions
- **Search**: http://localhost:3000/search
- **Discover**: http://localhost:3000/discover
- **Profile**: http://localhost:3000/profile
- **Blog**: http://localhost:3000/blog

### 📚 Sample Books
- The Midnight Library: http://localhost:3000/book/1
- Atomic Habits: http://localhost:3000/book/2
- The Silent Patient: http://localhost:3000/book/3
- Where the Crawdads Sing: http://localhost:3000/book/4
- Educated: http://localhost:3000/book/5
- The Seven Husbands: http://localhost:3000/book/6

### 💬 Sample Discussions
- Discussion 1: http://localhost:3000/discussion/d1
- Discussion 2: http://localhost:3000/discussion/d2

## Step 4: Customize (30 seconds)

### Change Site Name
Edit `src/app/layout.tsx`:
```typescript
title: 'Your Site Name - Your Tagline'
```

### Change Colors
Edit `tailwind.config.js` - update the `primary` color values.

### Add Your First Book
Edit `src/data/sampleBooks.ts` - copy an existing book object and modify it.

## Step 5: Build for Production (1 minute)

```bash
npm run build
npm start
```

Visit http://localhost:3000 to see the production build.

---

## 🎯 Common First Tasks

### Add Your Logo
1. Place logo in `/public/logo.png`
2. Edit `src/components/layout/Header.tsx`
3. Replace the `<FaBook>` icon with `<img src="/logo.png" />`

### Add Affiliate Links
1. Open `src/components/book/BookHeader.tsx`
2. Find the "Buy This Book" button
3. Update href: `https://www.amazon.com/dp/BOOK_ISBN?tag=YOUR_TAG`

### Add Real Books
1. Edit `src/data/sampleBooks.ts`
2. Add your book objects (copy the format)
3. Update book cover images
4. Create custom review content in `src/components/book/BookReviewSection.tsx`

### Change Domain/URLs for SEO
Replace `https://bookwise.com` with your domain in:
- `src/app/sitemap.ts`
- `src/components/SEO/SEOHead.tsx`
- `src/components/SEO/BreadcrumbSchema.tsx`
- `src/components/SEO/OrganizationSchema.tsx`

---

## 📱 Test on Mobile

The site is mobile-first, but always test:

```bash
# Get your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Visit from phone on same network
http://YOUR_IP:3000
```

---

## 🚀 Deploy to Vercel (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, then visit your live URL!
```

---

## ⚡ Pro Tips

1. **Hot Reload**: Changes automatically refresh the browser
2. **TypeScript Errors**: Check your terminal for type errors
3. **Styling**: Use Tailwind classes directly in components
4. **Icons**: Browse available icons at https://react-icons.github.io/react-icons/
5. **Sample Data**: Start by modifying existing examples

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Check for errors
npm run lint
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Missing Dependencies
```bash
# Reinstall everything
rm -rf node_modules
npm install
```

---

## 📚 Next Steps

After exploring:
1. Read `README.md` for full documentation
2. Check `CUSTOMIZATION.md` for detailed customization
3. Review `DEPLOYMENT.md` for hosting options
4. Explore `PROJECT_OVERVIEW.md` for complete feature list

---

## 🎉 You're All Set!

The site is now running with:
- ✅ 6 sample books with reviews
- ✅ 10 discussion threads
- ✅ 6 blog posts
- ✅ Full SEO optimization
- ✅ Mobile-responsive design
- ✅ Beautiful UI

**Time to make it yours!** 🚀
