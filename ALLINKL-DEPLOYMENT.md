# 🚀 ALL-INKL DEPLOYMENT GUIDE

## 📋 SCHRITT 1: Next.js für Production builden

```bash
# 1. Production Build erstellen
npm run build

# 2. Static Export für All-Inkl
npm run export
```

## 📂 SCHRITT 2: All-Inkl Upload vorbereiten

### Dateien die hochgeladen werden:
- `out/` Ordner → kompletter Inhalt nach `/` auf All-Inkl
- `.env.local` → Umgebungsvariablen anpassen

## ⚙️ SCHRITT 3: Umgebungsvariablen für All-Inkl

Erstelle eine neue `.env.production`:

```env
# Deine All-Inkl Domain
NEXT_PUBLIC_APP_URL=https://deine-domain.de

# Stripe Keys (Live Modus für Production!)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Database (SQLite für All-Inkl oder externe DB)
DATABASE_URL="file:./production.db"

# Auth Secret (neuen generieren!)
NEXTAUTH_SECRET="production-geheimer-schlüssel-min-32-zeichen"
NEXTAUTH_URL=https://deine-domain.de
```

## 📁 SCHRITT 4: All-Inkl Upload

### Via FTP/SFTP:
```
Deine All-Inkl Zugangsdaten:
- Server: deine-domain.de
- Port: 22 (SFTP) oder 21 (FTP)
- Username: [dein-username]
- Password: [dein-passwort]

Upload-Ziel: /htdocs/ oder /public_html/
```

### Upload-Struktur:
```
/htdocs/
├── _next/           (Next.js Assets)
├── images/          (Bilder)
├── api/             (API Routes)
├── index.html       (Hauptseite)
├── pricing.html     (Preise)
├── impressum.html   (Impressum)
├── datenschutz.html (Datenschutz)
├── agb.html         (AGB)
└── widerrufsrecht.html
```

## 🔧 SCHRITT 5: All-Inkl Konfiguration

### Node.js Version:
- All-Inkl: Node.js 18+ aktivieren
- PHP deaktivieren (falls nicht benötigt)

### SSL-Zertifikat:
- Let's Encrypt aktivieren
- HTTPS-Weiterleitung einrichten

## ✅ SCHRITT 6: Live-Test

Nach Upload testen:
1. https://deine-domain.de/pricing
2. Stripe-Integration (mit Live-Keys)
3. Rechtliche Seiten
4. Cookie-Banner
5. Responsive Design

## 🐛 TROUBLESHOOTING

### Häufige Probleme:
1. **404 Fehler**: .htaccess für Routing erstellen
2. **API nicht erreichbar**: Node.js Version prüfen
3. **Stripe-Fehler**: Live-Keys korrekt?
4. **DB-Fehler**: SQLite-Pfad anpassen

### .htaccess für All-Inkl:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

## 📱 SCHRITT 7: Android App vorbereiten

Nach erfolgreichem Web-Upload:
1. Capacitor konfigurieren
2. Android Studio Setup
3. APK erstellen
4. Play Store Upload

---

**READY TO DEPLOY? 🚀**
