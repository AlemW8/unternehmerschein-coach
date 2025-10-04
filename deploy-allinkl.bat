@echo off
echo ================================
echo    ALL-INKL DEPLOYMENT SCRIPT
echo ================================

echo.
echo 1. Building Next.js for production...
call npm run build

echo.
echo 2. Checking if build was successful...
if not exist ".next" (
    echo ERROR: Build failed! .next folder not found.
    pause
    exit /b 1
)

echo.
echo 3. Build successful! 
echo.
echo NEXT STEPS:
echo ============
echo.
echo 1. Upload .next folder contents to All-Inkl
echo 2. Upload public folder contents to All-Inkl  
echo 3. Set environment variables on All-Inkl
echo 4. Test your live website
echo.
echo Your files are ready in:
echo - .next/ folder
echo - public/ folder
echo.
echo Upload these to your All-Inkl hosting via FTP/SFTP
echo.

pause
