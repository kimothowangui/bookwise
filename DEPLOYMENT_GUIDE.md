# 🚀 BookWise Deployment Guide

## Environment Variables for Vercel

You'll need to add these environment variables in Vercel dashboard:

### Required Variables:

```bash
DATABASE_URL=postgresql://postgres.rzjkhnlxljksffnjudqi:Tc_-s5SVA.PbE7M@aws-1-eu-central-2.pooler.supabase.com:5432/postgres

NEXTAUTH_URL=https://bookwise-kimotho.vercel.app

NEXTAUTH_SECRET=uSh6TcAHRZxecAs6TDhq8ilN9GI0xWGGmAwKAMnlILA=
```

### Optional Variables (for later):

```bash
# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Deployment Steps:

1. Run: `vercel login` (login with GitHub, Google, or Email)
2. Run: `vercel --prod`
3. Follow the prompts:
   - Project name: `bookwise-kimotho`
   - Link to existing project: No (first time)
4. After deployment, go to Vercel dashboard to add environment variables
5. Redeploy: `vercel --prod`

## Your URLs:

- **Production**: https://bookwise-kimotho.vercel.app
- **Admin**: kimothowangui6@gmail.com / wankim#123

## Notes:

- First deployment might take 2-3 minutes
- Environment variables must be set in Vercel dashboard
- Database is already live (Supabase)
- Admin account is already created
