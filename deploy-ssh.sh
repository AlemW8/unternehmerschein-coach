#!/bin/bash
# SSH Deployment Script für All-Inkl
echo "🚀 Unternehmerschein-Coach - SSH Deployment"
echo "================================================"

# SSH-Verbindungsparameter (ersetzen Sie diese!)
SSH_HOST="ssh.ihre-domain.de"
SSH_USER="ihr-benutzername"
SSH_PORT="22"
REMOTE_PATH="/html/"

echo "📦 Schritt 1: Lokalen Build erstellen..."
npm run build

echo "📤 Schritt 2: Dateien via SCP hochladen..."
# Alle Dateien aus out/ auf Server hochladen
scp -r -P $SSH_PORT out/* $SSH_USER@$SSH_HOST:$REMOTE_PATH

echo "🔧 Schritt 3: .htaccess hochladen..."
scp -P $SSH_PORT .htaccess $SSH_USER@$SSH_HOST:$REMOTE_PATH

echo "🌐 Schritt 4: Server-Konfiguration..."
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'EOF'
# Auf dem Server ausführen:
cd /html/

# Berechtigungen setzen
chmod 644 *.html *.css *.js
chmod 644 .htaccess
chmod -R 755 _next/

# Cache leeren (falls vorhanden)
find . -name "*.cache" -delete

echo "✅ Server-Konfiguration abgeschlossen!"
EOF

echo ""
echo "🎉 Deployment erfolgreich!"
echo "🌐 Ihre Website ist jetzt live unter: https://ihre-domain.de"
echo ""
echo "📋 Nächste Schritte:"
echo "1. SSL-Zertifikat im All-Inkl Control Panel aktivieren"
echo "2. Domain testen"
echo "3. Performance prüfen"
