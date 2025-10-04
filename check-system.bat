@echo off
cd /d "%~dp0"
echo.
echo 🔍 System-Prüfung für Unternehmerschein Coach
echo ============================================
echo.

echo Prüfe Node.js Installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js ist nicht installiert!
    echo.
    echo Bitte installiere Node.js von: https://nodejs.org
    echo Empfohlene Version: 18 oder höher
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js gefunden:
    node --version
)

echo.
echo Prüfe npm Installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm ist nicht installiert!
    pause
    exit /b 1
) else (
    echo ✅ npm gefunden:
    npm --version
)

echo.
echo Prüfe Projektdateien...
if not exist "package.json" (
    echo ❌ package.json nicht gefunden!
    echo Aktuelles Verzeichnis: %CD%
    echo.
    echo Stelle sicher, dass du im Projektordner bist:
    echo C:\Users\Leuze\Documents\unternehmerscheinnnn\unternehmerschein-coach
    echo.
    pause
    exit /b 1
) else (
    echo ✅ package.json gefunden
)

if not exist "src" (
    echo ❌ src Ordner nicht gefunden!
    pause
    exit /b 1
) else (
    echo ✅ src Ordner gefunden
)

if not exist "prisma\schema.prisma" (
    echo ❌ Prisma Schema nicht gefunden!
    pause
    exit /b 1
) else (
    echo ✅ Prisma Schema gefunden
)

echo.
echo 🎉 Alle Systemprüfungen erfolgreich!
echo Du kannst jetzt start.bat ausführen.
echo.
pause
