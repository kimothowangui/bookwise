# Deployment Guide for BookWise

## Quick Deploy Options

### 1. Vercel (Recommended)

Vercel is the creators of Next.js and offers the best deployment experience.

#### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Manual Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Configuration:**
- Framework Preset: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Environment Variables: Add from `.env.example`

### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 3. Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t bookwise .
docker run -p 3000:3000 bookwise
```

### 4. Traditional Server (Node.js)

```bash
# Build the project
npm run build

# Start the server
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start npm --name "bookwise" -- start
```

## Environment Variables

Before deploying, set up environment variables in your hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=BookWise
```

## Post-Deployment Checklist

- [ ] Configure custom domain
- [ ] Set up SSL certificate (usually automatic)
- [ ] Update `NEXT_PUBLIC_SITE_URL` in environment variables
- [ ] Update URLs in sitemap.ts
- [ ] Update URLs in schema files
- [ ] Test all pages and functionality
- [ ] Verify SEO meta tags (use tools like Screaming Frog)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Configure CDN for images (if needed)
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Set up monitoring and error tracking

## Performance Optimization

### Image Optimization
- Use Next.js Image component for automatic optimization
- Consider using a CDN for book cover images
- Set up proper caching headers

### Caching
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### Database Integration (Future)
When you add a database:
- Use connection pooling
- Implement caching (Redis)
- Use ISR (Incremental Static Regeneration) for book pages

## SEO Post-Deployment

1. **Google Search Console**
   - Add and verify your site
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Schema Validation**
   - Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Validate Book and Review schemas

3. **Social Media**
   - Test Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Monitoring

Recommended tools:
- **Vercel Analytics** (built-in for Vercel deployments)
- **Google Analytics** or **Plausible** for privacy-friendly analytics
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Google PageSpeed Insights** for performance monitoring

## Scaling

As your site grows:
- Implement server-side caching
- Add a CDN for static assets
- Consider ISR for dynamic content
- Add database indexing
- Implement rate limiting
- Use serverless functions for API routes

## Security

- Enable HTTPS (SSL certificate)
- Set up security headers
- Implement CORS policies
- Add rate limiting for API routes
- Regular dependency updates
- Environment variable protection

## Backup Strategy

- Regular database backups (when implemented)
- Version control with Git
- Automated deployment pipelines
- Staging environment for testing

---

Need help? Check the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
