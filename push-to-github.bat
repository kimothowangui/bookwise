@echo off
echo ========================================
echo   Push BookWise to GitHub
echo ========================================
echo.
echo This script will help you push your code to GitHub
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b
)

echo Step 1: Initializing Git repository...
git init
echo.

echo Step 2: Adding all files...
git add .
echo.

echo Step 3: Creating first commit...
git commit -m "Initial commit: BookWise - Complete book review and discussion website"
echo.

echo Step 4: Setting main branch...
git branch -M main
echo.

echo ========================================
echo   IMPORTANT - Read Carefully!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Go to GitHub: https://github.com/new
echo 2. Create a new repository named: bookwise
echo 3. Keep it PUBLIC or PRIVATE (your choice)
echo 4. DO NOT add README, .gitignore, or license
echo 5. Click "Create repository"
echo.
echo 6. Copy the URL that looks like:
echo    https://github.com/YOUR_USERNAME/bookwise.git
echo.
echo 7. Come back here and paste it when prompted
echo.
echo ========================================
echo.

set /p REPO_URL="Paste your GitHub repository URL here: "

echo.
echo Step 5: Connecting to GitHub...
git remote add origin %REPO_URL%
echo.

echo Step 6: Pushing to GitHub...
git push -u origin main
echo.

echo ========================================
echo   SUCCESS! 
echo ========================================
echo.
echo Your BookWise code is now on GitHub!
echo.
echo Next: Deploy to Vercel
echo 1. Go to: https://vercel.com/new
echo 2. Import your GitHub repository
echo 3. Click Deploy
echo.
echo Your site will be live in 2 minutes!
echo.
pause
