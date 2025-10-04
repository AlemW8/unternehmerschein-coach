@echo off
cd /d "%~dp0"
echo.
echo 🚕 Unternehmerschein Coach - Starter
echo ===================================
echo.
echo Aktuelles Verzeichnis: %CD%
echo.

echo 📦 Installiere Dependencies...
call npm install

echo.
echo 🔧 Generiere Prisma Client...
call npx prisma generate

echo.
echo 🚀 Starte Development Server...
echo.
echo Die App wird unter http://localhost:3000 verfügbar sein
echo Drücke Ctrl+C um zu beenden
echo.

call npm run dev

pause
