# BookWise API Testing Guide

Quick guide to test your backend API endpoints after setup.

## 🚀 Before Testing

1. Make sure you've completed the setup in `BACKEND_SETUP.md`
2. Run `npm run dev` to start the development server
3. Ensure your `.env.local` file has all required variables

## 🧪 Testing Methods

### Option 1: Using Browser DevTools (Easiest)

Open your browser console and use the Fetch API:

```javascript
// Test signup
fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  })
}).then(r => r.json()).then(console.log)

// Test getting books
fetch('http://localhost:3000/api/books')
  .then(r => r.json())
  .then(console.log)

// Test search
fetch('http://localhost:3000/api/search?q=atomic&type=books')
  .then(r => r.json())
  .then(console.log)
```

### Option 2: Using cURL (Command Line)

```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test getting books
curl http://localhost:3000/api/books

# Test search
curl "http://localhost:3000/api/search?q=atomic&type=books"

# Test getting a specific book (replace {id} with actual book ID)
curl http://localhost:3000/api/books/{id}
```

### Option 3: Using VS Code REST Client Extension

Install "REST Client" extension, then create a file `test.http`:

```http
### Signup
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

### Get All Books
GET http://localhost:3000/api/books

### Search Books
GET http://localhost:3000/api/search?q=atomic&type=books

### Get Books with Genre Filter
GET http://localhost:3000/api/books?genre=Fiction&limit=5
```

## 📝 Step-by-Step Testing Flow

### 1. Test User Registration

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

Expected Response (201):
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "..."
  },
  "message": "User created successfully"
}
```

### 2. Test Getting Books

```bash
curl http://localhost:3000/api/books
```

Expected Response (200):
```json
{
  "books": [...],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

### 3. Test Search

```bash
curl "http://localhost:3000/api/search?q=atomic&type=all"
```

Expected Response (200):
```json
{
  "books": [...],
  "discussions": [...],
  "users": [...]
}
```

### 4. Test Authentication Required Endpoint

First, sign in through the browser:
1. Go to `http://localhost:3000/api/auth/signin`
2. Sign in with your credentials
3. Then test protected routes

Or use NextAuth.js session in your frontend.

## 🔍 Common API Endpoints to Test

### Public Endpoints (No Auth Required)
- ✅ `GET /api/books` - List all books
- ✅ `GET /api/books/[id]` - Get single book
- ✅ `GET /api/reviews` - List reviews
- ✅ `GET /api/discussions` - List discussions
- ✅ `GET /api/users/[id]` - Get user profile
- ✅ `GET /api/search` - Search
- ✅ `POST /api/auth/signup` - Register

### Protected Endpoints (Auth Required)
- 🔒 `POST /api/books` - Create book
- 🔒 `POST /api/reviews` - Create review
- 🔒 `POST /api/discussions` - Create discussion
- 🔒 `POST /api/comments` - Add comment
- 🔒 `POST /api/likes` - Like content
- 🔒 `GET /api/reading-list` - Get reading list
- 🔒 `POST /api/reading-list` - Add to reading list
- 🔒 `PATCH /api/users/[id]` - Update profile
- 🔒 `POST /api/upload` - Upload image

## 🎯 Testing Checklist

### Authentication
- [ ] User can register with email/password
- [ ] User can sign in with credentials
- [ ] User can sign out
- [ ] Protected routes reject unauthenticated requests
- [ ] OAuth providers work (if configured)

### Books
- [ ] Can fetch all books
- [ ] Can fetch single book with reviews
- [ ] Can filter books by genre
- [ ] Can search books by title/author
- [ ] Can create book (when authenticated)
- [ ] Can update book (when authenticated)

### Reviews
- [ ] Can fetch all reviews
- [ ] Can create review (when authenticated)
- [ ] Cannot create duplicate review for same book
- [ ] Can update own review
- [ ] Cannot update other user's review
- [ ] Can delete own review

### Discussions
- [ ] Can fetch all discussions
- [ ] Can filter by category
- [ ] Can create discussion (when authenticated)
- [ ] Can add comments to discussion
- [ ] Can update own discussion/comment
- [ ] View count increments on each view

### User Profile
- [ ] Can view user profile
- [ ] Can update own profile
- [ ] Cannot update other user's profile
- [ ] Stats update correctly (reviews, discussions, books read)

### Reading List
- [ ] Can add book to reading list
- [ ] Can update reading status
- [ ] Can remove from reading list
- [ ] Cannot add duplicate books
- [ ] Books read counter updates

### Likes
- [ ] Can like review
- [ ] Can unlike review
- [ ] Can like discussion
- [ ] Like counts update correctly

### Search
- [ ] Can search books
- [ ] Can search discussions
- [ ] Can search users
- [ ] Can search all (combined results)

### Upload
- [ ] Can upload images
- [ ] Validates file type (images only)
- [ ] Validates file size (max 5MB)
- [ ] Returns Cloudinary URL

## 🐛 Troubleshooting

### "Unauthorized" Error
- Make sure you're signed in
- Check that session cookie is being sent
- Verify NEXTAUTH_SECRET is set

### "Prisma Client not initialized"
- Run `npm run db:generate`
- Restart dev server

### "Database connection failed"
- Check DATABASE_URL in .env.local
- Verify Supabase project is running
- Test connection with `npx prisma db push`

### "Cannot find module '@prisma/client'"
- Run `npm install`
- Run `npm run db:generate`

## 📊 Using Prisma Studio

Best way to inspect and edit database data:

```bash
npm run db:studio
```

Opens at `http://localhost:5555`

## 🎉 Success Indicators

Your backend is working correctly if:
- ✅ You can register and sign in
- ✅ You can fetch books and reviews
- ✅ Search returns results
- ✅ You can create reviews when authenticated
- ✅ Protected routes reject unauthenticated requests
- ✅ You can see data in Prisma Studio

## 📚 Next Steps

After testing the API:
1. Connect frontend components to API
2. Add loading states and error handling
3. Implement optimistic updates
4. Add pagination UI
5. Create admin dashboard
6. Deploy to production

Happy testing! 🚀
