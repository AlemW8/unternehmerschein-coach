# PowerShell Script zum Korrigieren der Dateiberechtigungen
Write-Host "Korrigiere Dateiberechtigungen auf waqaraleem.com" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# SSH-Verbindungsparameter für waqaraleem.com
$SSH_HOST = "w01fe45e.kasserver.com"
$SSH_USER = "ssh-w01fe45e"
$SSH_PORT = "22"
$REMOTE_PATH = "/html/"

Write-Host "Verbinde mit Server und korrigiere Berechtigungen..." -ForegroundColor Yellow

ssh -p $SSH_PORT "${SSH_USER}@${SSH_HOST}" @"
cd /html/

# Setze korrekte Berechtigungen für alle Dateien
chmod 644 *.html
chmod 644 *.css
chmod 644 *.js
chmod 644 *.json
chmod 644 .htaccess
chmod 644 *.woff2
chmod 644 *.txt

# Setze Berechtigungen für Verzeichnisse
chmod 755 _next/
chmod 755 _next/static/
chmod 755 _next/static/css/
chmod 755 _next/static/js/
chmod 755 _next/static/media/
chmod 755 learn/
chmod 755 learn/pbefg/
chmod 755 learn/pbefg/flashcards/
chmod 755 learn/pbefg/multiple-choice/
chmod 755 auth/
chmod 755 admin/

# Setze Berechtigungen für alle Dateien in _next/
find _next/ -type f -exec chmod 644 {} \;
find _next/ -type d -exec chmod 755 {} \;

# Setze Berechtigungen für alle anderen Dateien
find . -name '*.html' -exec chmod 644 {} \;
find . -name '*.css' -exec chmod 644 {} \;
find . -name '*.js' -exec chmod 644 {} \;
find . -name '*.json' -exec chmod 644 {} \;
find . -name '*.woff2' -exec chmod 644 {} \;

echo 'Berechtigungen erfolgreich korrigiert!'
echo 'Website sollte jetzt erreichbar sein.'
"@

Write-Host ""
Write-Host "Berechtigungen korrigiert!" -ForegroundColor Green
Write-Host "Testen Sie jetzt: https://waqaraleem.com" -ForegroundColor Cyan
