# PowerShell SSH Deployment Script für All-Inkl
Write-Host "Unternehmerschein-Coach - SSH Deployment" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# SSH-Verbindungsparameter für waqaraleem.com
$SSH_HOST = "w01fe45e.kasserver.com"
$SSH_USER = "ssh-w01fe45e"
$SSH_PORT = "22"
$REMOTE_PATH = "/html/"

Write-Host "Schritt 1: Lokalen Build erstellen..." -ForegroundColor Yellow
npm run build

Write-Host "Schritt 2: Dateien via SCP hochladen..." -ForegroundColor Yellow
# Prüfen ob out/ Ordner existiert
if (Test-Path "out") {
    # Alle Dateien aus out/ auf Server hochladen
    scp -r -P $SSH_PORT out/* "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"
} else {
    Write-Host "FEHLER: out/ Ordner nicht gefunden! Build war nicht erfolgreich." -ForegroundColor Red
    exit 1
}

Write-Host "Schritt 3: .htaccess hochladen..." -ForegroundColor Yellow
scp -P $SSH_PORT .htaccess "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"

Write-Host "Schritt 4: Server-Konfiguration..." -ForegroundColor Yellow
ssh -p $SSH_PORT "${SSH_USER}@${SSH_HOST}" @"
cd /html/
chmod 644 *.html *.css *.js
chmod 644 .htaccess
chmod -R 755 _next/
find . -name '*.cache' -delete
echo 'Server-Konfiguration abgeschlossen!'
"@

Write-Host ""
Write-Host "Deployment erfolgreich!" -ForegroundColor Green
Write-Host "Ihre Website ist jetzt live unter: https://waqaraleem.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Naechste Schritte:" -ForegroundColor Yellow
Write-Host "1. SSL-Zertifikat im All-Inkl Control Panel aktivieren"
Write-Host "2. Domain testen"
Write-Host "3. Performance pruefen"
