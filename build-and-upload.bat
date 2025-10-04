@echo off
echo 🚀 Unternehmerschein-Coach - All-Inkl Upload
echo ================================================

echo.
echo 📦 Schritt 1: Dependencies installieren...
call npm install

echo.
echo 🔨 Schritt 2: Production Build erstellen...
call npm run build

echo.
echo ✅ Build erfolgreich! 
echo 📁 Statische Dateien sind in: out/
echo.
echo 📤 Nächste Schritte für All-Inkl:
echo ================================================
echo 1. Öffnen Sie FileZilla oder Ihren FTP-Client
echo 2. Verbinden Sie sich mit Ihren All-Inkl FTP-Daten:
echo    - Host: ftp.ihre-domain.de (oder All-Inkl FTP-Server)
echo    - Benutzername: Ihr All-Inkl Benutzername
echo    - Passwort: Ihr All-Inkl Passwort
echo.
echo 3. Navigieren Sie zum Webverzeichnis (meist: /html/ oder /public_html/)
echo.
echo 4. Laden Sie ALLE Dateien aus dem 'out/' Ordner hoch:
echo    - Markieren Sie alle Dateien im 'out/' Ordner
echo    - Ziehen Sie sie in Ihr Webverzeichnis
echo.
echo 5. Testen Sie Ihre Website unter: https://ihre-domain.de
echo.
echo 🔐 WICHTIG: Stellen Sie sicher, dass:
echo - SSL-Zertifikat aktiviert ist
echo - Domain korrekt verlinkt ist
echo - .htaccess Datei (falls vorhanden) hochgeladen wurde
echo.
pause
