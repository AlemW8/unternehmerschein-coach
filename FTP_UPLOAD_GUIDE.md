# FTP Upload Guide für All-Inkl

## Problem mit Next.js API Routes
Next.js API Routes funktionieren nicht auf traditionellen PHP-Servern wie All-Inkl.

## Lösungsoptionen:

### Option 1: Statische Version (nur Frontend)
- Alle Daten in localStorage
- Keine echte Authentifizierung
- Keine echten Zahlungen
- Nur für Demo-Zwecke

### Option 2: Hybrid-Lösung (empfohlen)
- Frontend auf All-Inkl
- Backend auf Vercel/Netlify/Supabase
- API Calls an externe Services

### Option 3: PHP-Backend schreiben
- Komplette Neuentwicklung des Backends in PHP
- Viel Aufwand

## Empfehlung für produktive Nutzung:

**Verwende einen Next.js-kompatiblen Host:**
- Vercel (kostenlos für private Projekte)
- Netlify (kostenlos für kleine Projekte)  
- Railway (günstig für kommerzielle Projekte)
- AWS/Google Cloud (für große Projekte)

**Für All-Inkl wäre eine separate App nötig:**
1. **Frontend:** React/Vue/Vanilla JS
2. **Backend:** PHP mit MySQL/PostgreSQL
3. **Payment:** Stripe über Webhooks
4. **Auth:** JWT mit PHP Sessions

**Soll ich dir zeigen, wie du:**
A) Eine statische Demo-Version für All-Inkl erstellst (ohne echte Auth/Payment)?
B) Das Projekt so umstrukturierst, dass Frontend auf All-Inkl und Backend extern läuft?
C) Bei Vercel/Netlify bleibst (einfachste Lösung)?

Was bevorzugst du?
