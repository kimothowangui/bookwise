@echo off
echo ========================================
echo   BookWise - Starting Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo This will take 2-3 minutes...
    echo.
    npm install
    echo.
    echo Installation complete!
    echo.
)

echo Starting development server...
echo.
echo Once started, open your browser and visit:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server when you're done.
echo.

npm run dev

pause
