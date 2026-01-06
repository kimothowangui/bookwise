# 🚀 Manual Setup Instructions

Since the automatic installation is taking time, here's how to run BookWise manually:

## Option 1: Use the Batch Script (Easiest)

1. **Double-click** `start-bookwise.bat` in your file explorer
2. Wait 2-3 minutes for installation to complete
3. The browser will show the URL: http://localhost:3000
4. Open your browser and visit that URL

## Option 2: Command Line

### Step 1: Open PowerShell or Command Prompt
- Press `Windows + R`
- Type `cmd` or `powershell`
- Press Enter

### Step 2: Navigate to the Project
```bash
cd C:\Users\q\Desktop\books
```

### Step 3: Install Dependencies (2-3 minutes)
```bash
npm install
```

You'll see output like:
```
npm WARN deprecated ...
added 350 packages in 2m
```

### Step 4: Start Development Server
```bash
npm run dev
```

You'll see:
```
> bookwise-community@1.0.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info Loaded env from ...
```

### Step 5: Open Browser
Visit: **http://localhost:3000**

---

## Troubleshooting

### "npm is not recognized"
Install Node.js from: https://nodejs.org/

### Port 3000 already in use
```bash
npx kill-port 3000
npm run dev
```

### Installation errors
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

---

## 🎉 What You'll See

When you visit http://localhost:3000:

1. **Home Page**: Hero section with "Discover Your Next Favorite Book"
2. **Featured Books**: 6 books with covers, ratings, and reviews
3. **Trending Discussions**: Active community conversations

### Pages to Explore:
- **Book Reviews**: http://localhost:3000/book/1
- **Discussions**: http://localhost:3000/discussions
- **Search**: http://localhost:3000/search
- **Discover**: http://localhost:3000/discover
- **Profile**: http://localhost:3000/profile
- **Blog**: http://localhost:3000/blog

---

## 📱 Testing on Mobile

1. Find your computer's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address"

2. On your phone (same WiFi network):
   Visit: `http://YOUR_IP:3000`

---

## ⏹️ Stopping the Server

Press `Ctrl + C` in the terminal window

---

## 🆘 Need Help?

Check the other documentation files:
- `README.md` - Full documentation
- `QUICK_START.md` - Quick setup guide
- `DEPLOYMENT.md` - Deploy to production
- `CUSTOMIZATION.md` - Customize the site

---

**The installation is worth the wait - you're getting a complete, professional book review website!** 🚀📚
