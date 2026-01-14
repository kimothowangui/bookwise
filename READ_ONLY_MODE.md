# Read-Only Mode Protection

## Overview

Your BookWise website now has comprehensive read-only mode protection to prevent any editing when deployed online. This ensures your live site cannot be modified by anyone - not even admins!

## How It Works

### 🔒 Protection Layers

1. **Environment Variable Control**: Set `ENABLE_READ_ONLY_MODE=true` to activate
2. **API-Level Protection**: All editing endpoints are protected
3. **Admin Override**: Even admins cannot edit when read-only mode is active

### 🛡️ Protected Operations

When read-only mode is enabled, the following operations are **completely blocked**:

- ❌ Creating/editing/deleting **books**
- ❌ Creating/editing/deleting **reviews**
- ❌ Creating/editing/deleting **discussions**
- ❌ Creating/editing/deleting **comments**
- ❌ Adding/removing items from **reading lists**
- ❌ Liking/unliking reviews or discussions
- ❌ Updating user **profiles**

### ✅ Allowed Operations

Users can still:

- ✅ Browse all books, reviews, and discussions
- ✅ Search for content
- ✅ View profiles
- ✅ Sign in/sign up (authentication)

## Configuration

### For Production (Live Site)

**File: `.env.production`**
```bash
ENABLE_READ_ONLY_MODE=true
```

This is **already configured** in your production environment!

### For Local Development

**File: `.env.local`**
```bash
ENABLE_READ_ONLY_MODE=false
```

Keep it `false` during development so you can test editing features.

## Deployment to Vercel

The read-only mode environment variable needs to be set in Vercel:

1. Go to: https://vercel.com/kimothowanguis-projects/bookwise-kimotho/settings/environment-variables
2. Add variable:
   - **Key**: `ENABLE_READ_ONLY_MODE`
   - **Value**: `true`
   - **Environment**: Production
3. Click "Save"
4. Redeploy your site

## Error Messages

When users try to edit in read-only mode, they'll see:

```json
{
  "error": "This site is in read-only mode. Editing is disabled."
}
```

## Testing Read-Only Mode

### Local Testing

1. Set `ENABLE_READ_ONLY_MODE=true` in your `.env.local`
2. Restart your dev server: `npm run dev`
3. Try to create/edit any content
4. You should receive the read-only error

### Production Testing

Once deployed with `ENABLE_READ_ONLY_MODE=true`:

1. Visit: https://bookwise-kimotho.vercel.app
2. Try to:
   - Add a review
   - Create a discussion
   - Edit your profile
3. All editing operations should be blocked

## Disabling Read-Only Mode

If you want to allow editing again:

1. Go to Vercel environment variables
2. Change `ENABLE_READ_ONLY_MODE` to `false` (or delete the variable)
3. Redeploy your site

## Architecture

### Implementation Files

- **`src/lib/read-only.ts`**: Core read-only mode logic
- **Protected API Routes**:
  - `src/app/api/books/[id]/route.ts`
  - `src/app/api/reviews/[id]/route.ts`
  - `src/app/api/discussions/[id]/route.ts`
  - `src/app/api/comments/[id]/route.ts`
  - `src/app/api/reading-list/[id]/route.ts`
  - `src/app/api/likes/route.ts`
  - `src/app/api/users/[id]/route.ts`
  - And all POST endpoints

### Code Example

```typescript
import { checkReadOnlyMode } from '@/lib/read-only'

export async function POST(request: Request) {
  try {
    // Check read-only mode first
    checkReadOnlyMode();
    
    // Rest of the endpoint logic...
  } catch (error) {
    // Handle errors
  }
}
```

## Security Benefits

✅ **Complete Protection**: No one can edit your live site
✅ **Simple Control**: One environment variable controls everything
✅ **Fail-Safe**: Checks happen at the API level, can't be bypassed from frontend
✅ **Admin-Proof**: Even admin users are blocked when enabled
✅ **Reversible**: Can be toggled on/off without code changes

## Use Cases

### When to Enable Read-Only Mode

- 📚 **Portfolio/Demo Site**: Show your work without allowing edits
- 🎓 **Educational Content**: Share resources without user modifications
- 🔒 **Maintenance Mode**: Prevent edits during database maintenance
- 📊 **Archive Site**: Preserve historical content as-is
- 🚀 **Public Launch**: Allow browsing before enabling full features

### When to Disable Read-Only Mode

- 👥 **Community Site**: Enable user contributions
- 📝 **Active Development**: Testing new features
- 🎉 **Official Launch**: Open to public contributions

## Summary

Your BookWise site is now fully protected! With `ENABLE_READ_ONLY_MODE=true` in production:

- ✅ Users can browse and explore all content
- ✅ Users can sign up and log in
- ❌ No one can create, edit, or delete anything
- ❌ Even admins cannot modify content
- 🔐 Your live site is completely protected from unwanted edits

---

**Next Step**: Add the `ENABLE_READ_ONLY_MODE=true` environment variable to Vercel and redeploy!
