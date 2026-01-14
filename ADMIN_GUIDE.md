# 🔐 BookWise Admin Guide

## Your Admin Account

**Congratulations!** You now have full admin access to your BookWise platform.

### Your Admin Credentials
- **Email**: `kimothowangui6@gmail.com`
- **Name**: Kimotho
- **Role**: Super Admin (isAdmin = true)

---

## 🎯 What You Can Do as Admin

### **Full Control Over Books**
✅ **Create Books** - Add new books to the catalog
✅ **Edit Books** - Update book details, covers, descriptions
✅ **Delete Books** - Remove books from the platform

### **Moderation Powers**
✅ **Delete Any Discussion** - Remove inappropriate or spam discussions
✅ **Delete Any Comment** - Moderate comments across the platform
✅ **View All User Activity** - Monitor user engagement

### **Content Management**
✅ **Manage Reviews** - While users write reviews, you have oversight
✅ **Pin Discussions** - Highlight important discussions
✅ **Manage Reading Lists** - Full access to user reading lists

---

## 🚀 How to Use Your Admin Powers

### **1. Login to Your Account**

**Via API** (for testing):
```bash
POST /api/auth/signin
{
  "email": "kimothowangui6@gmail.com",
  "password": "wankim#123"
}
```

**Via NextAuth.js** (in your app):
- Use the built-in NextAuth sign-in page
- Or implement a custom login form that calls NextAuth

### **2. Check Your Admin Status**

```bash
GET /api/auth/me
```

**Response when logged in as admin:**
```json
{
  "user": {
    "id": "...",
    "email": "kimothowangui6@gmail.com",
    "name": "Kimotho",
    "isAdmin": true,
    "booksRead": 0,
    "reviewsWritten": 0,
    "discussionsStarted": 0
  }
}
```

### **3. Create a New Book** (Admin Only)

```bash
POST /api/books
Authorization: Bearer <your-session-token>

{
  "title": "The 48 Laws of Power",
  "author": "Robert Greene",
  "description": "An insightful guide to understanding power dynamics...",
  "coverImage": "https://example.com/cover.jpg",
  "genres": ["Self-Help", "Psychology", "Business"],
  "mood": "Thought-provoking",
  "publishedYear": 1998,
  "pageCount": 452,
  "isbn": "978-0140280197"
}
```

### **4. Update a Book** (Admin Only)

```bash
PATCH /api/books/[bookId]
Authorization: Bearer <your-session-token>

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### **5. Delete a Book** (Admin Only)

```bash
DELETE /api/books/[bookId]
Authorization: Bearer <your-session-token>
```

### **6. Delete Any Discussion** (Admin or Owner)

```bash
DELETE /api/discussions/[discussionId]
Authorization: Bearer <your-session-token>
```

As admin, you can delete **any discussion**, not just your own.

---

## 🔒 Security Features

### **Protected Routes**
The following API endpoints **require admin authentication**:

#### **Books API** (Full Control)
- ❌ `POST /api/books` - Create book
- ❌ `PATCH /api/books/[id]` - Update book  
- ❌ `DELETE /api/books/[id]` - Delete book

#### **Moderation** (Owner or Admin)
- ⚠️ `DELETE /api/discussions/[id]` - Delete discussion (owner or admin)
- ⚠️ `DELETE /api/comments/[id]` - Delete comment (owner or admin)

**Legend:**
- ❌ Admin only
- ⚠️ Owner or admin

### **Error Responses**

**Not Logged In:**
```json
{
  "error": "Unauthorized"
}
// Status: 401
```

**Logged In But Not Admin:**
```json
{
  "error": "Admin access required"
}
// Status: 403
```

---

## 👥 Adding More Admins

If you want to make another user an admin:

### **Method 1: Using the Script**
```bash
npx tsx scripts/create-admin.ts user@email.com theirpassword "Their Name"
```

### **Method 2: Using Prisma Studio** (Easiest)
```bash
npm run db:studio
```

1. Opens Prisma Studio in your browser
2. Go to the **User** table
3. Find the user you want to make admin
4. Set `isAdmin` to `true`
5. Click **Save**

### **Method 3: Direct Database Query**
```sql
UPDATE "User" 
SET "isAdmin" = true 
WHERE email = 'user@email.com';
```

---

## 🛡️ Best Practices

### **Security**
1. ✅ **Never share your admin credentials**
2. ✅ **Use strong passwords** (yours is already good: `wankim#123`)
3. ✅ **Change password regularly** (update in database)
4. ✅ **Limit admin accounts** (only trusted team members)
5. ✅ **Monitor admin actions** (check logs regularly)

### **Content Management**
1. ✅ **Verify book information** before adding
2. ✅ **Use high-quality cover images**
3. ✅ **Keep descriptions professional**
4. ✅ **Review flagged content** before deleting
5. ✅ **Communicate with users** before moderation actions

---

## 📊 Admin Dashboard (Coming Soon)

**Features to Build:**
- [ ] Admin dashboard UI
- [ ] User management interface
- [ ] Content moderation queue
- [ ] Analytics and statistics
- [ ] Bulk operations
- [ ] Activity logs

You can build these features using the existing API endpoints!

---

## 🔧 Technical Implementation

### **Database Schema**
```prisma
model User {
  id                  String   @id @default(cuid())
  email               String   @unique
  password            String?
  name                String?
  isAdmin             Boolean  @default(false)  // ← Admin flag
  // ... other fields
}
```

### **Admin Middleware** (`src/lib/admin.ts`)
```typescript
// Check if current user is admin
await isAdmin()  // Returns boolean

// Require admin (throws error if not admin)
await requireAdmin()  // Throws if not admin

// Get current user with admin status
await getCurrentUser()  // Returns user object with isAdmin
```

### **Usage in API Routes**
```typescript
import { requireAdmin } from '@/lib/admin';

export async function POST(request: Request) {
  try {
    // Require admin authentication
    await requireAdmin();
    
    // Your protected logic here
  } catch (error) {
    if (error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
  }
}
```

---

## 🎓 Quick Command Reference

```bash
# Create admin account
npx tsx scripts/create-admin.ts <email> <password> <name>

# Start development server
npm run dev

# Open database GUI
npm run db:studio

# View database
npm run db:studio

# Reset database (careful!)
npx prisma db push --force-reset
```

---

## 🆘 Troubleshooting

### **"Admin access required" error**
- Make sure you're logged in
- Check that `isAdmin` is `true` in your user record
- Verify your session is valid

### **Can't login**
- Verify your credentials are correct
- Check that NextAuth is configured properly
- Make sure your user exists in the database

### **Session not working**
- Check `NEXTAUTH_SECRET` in `.env.local`
- Verify `NEXTAUTH_URL` is set correctly
- Clear browser cookies and try again

---

## 📞 Support

Your backend is fully configured with admin capabilities. You can now:
1. ✅ Login with your admin account
2. ✅ Add/edit/delete books
3. ✅ Moderate discussions and comments
4. ✅ Manage all content

**Need help?** Check the API routes in `src/app/api/` for implementation details.

---

**🎉 Congratulations! You're now the Super Admin of BookWise!**
