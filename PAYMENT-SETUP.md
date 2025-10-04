# 💳 PAYMENT SYSTEM SETUP

## ⚠️ WAS ICH VON DIR BRAUCHE:

### 1. STRIPE ACCOUNT (Wichtig!)
**Erstelle einen Stripe Account:**
- Gehe zu: https://dashboard.stripe.com/register
- Registriere dich mit deiner Business Email
- Verifiziere deine Identität
- Aktiviere "Subscriptions" (Abos)

**Dann hole diese Keys:**
```
Dashboard → Entwickler → API-Schlüssel
```

Ich brauche:
- ✅ **STRIPE_PUBLISHABLE_KEY** (pk_live_...)
- ✅ **STRIPE_SECRET_KEY** (sk_live_...)
- ✅ **STRIPE_WEBHOOK_SECRET** (whsec_...)

---

### 2. EMAIL SERVICE (SendGrid)
**Erstelle einen SendGrid Account:**
- Gehe zu: https://signup.sendgrid.com/
- Registriere dich (KOSTENLOS bis 100 Emails/Tag)
- Erstelle einen API Key

Ich brauche:
- ✅ **SENDGRID_API_KEY** (SG.xxxxx)
- ✅ **SENDGRID_FROM_EMAIL** (deine@email.de)

---

### 3. DATENBANK (Supabase)
**Erstelle eine Supabase Datenbank:**
- Gehe zu: https://supabase.com/dashboard
- Erstelle neues Projekt (KOSTENLOS)
- Warte 2 Minuten bis DB ready

Ich brauche:
- ✅ **DATABASE_URL** (postgresql://...)
- ✅ **SUPABASE_ANON_KEY** (eyJhbGc...)

---

## 🎯 PREIS STRUKTUR:

### Premium Plan:
```
Preis: 19,99€ / Monat
- Erste 2 Monate PFLICHT (39,98€)
- Danach monatlich kündbar
- Zugriff auf alle 255 Fragen
- Prüfungsmodus
- Fortschritt-Tracking
- Achievements
```

### Free Plan:
```
Preis: 0€
- Nur PBEFG Kategorie (70 Fragen)
- Keine Prüfung
- Eingeschränkter Zugriff
```

---

## 📧 EMAIL FLOW:

### Nach Kauf:
```
Betreff: Willkommen bei FahrGewerbe! 🚀

Hallo [Name],

Vielen Dank für dein Vertrauen in FahrGewerbe!

Deine Login-Daten:
━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: [email]
🔐 Passwort: [generiertes_passwort]
━━━━━━━━━━━━━━━━━━━━━━━━

Login hier: https://FahrGewerbe.de/auth/signin

Dein Premium Abo:
- Start: [Datum]
- Nächste Zahlung: [Datum + 1 Monat]
- Preis: 19,99€/Monat

WICHTIG: Die ersten 2 Monate sind Mindestlaufzeit.
Danach kannst du monatlich kündigen.

Viel Erfolg bei der Prüfung!
Dein FahrGewerbe Team
```

### Vor Ablauf (3 Tage vorher):
```
Betreff: Dein Abo läuft bald ab

Hallo [Name],

Dein Premium Abo läuft am [Datum] ab.
Nächste Zahlung: 19,99€

Kündigung: https://FahrGewerbe.de/profile/subscription

Bei Nicht-Zahlung wird dein Zugang automatisch
auf den kostenlosen Plan umgestellt.
```

### Nach Kündigung:
```
Betreff: Schade, dass du gehst 😢

Hallo [Name],

Dein Premium Abo wurde gekündigt.
Du hast noch Zugriff bis: [Datum]

Danach hast du:
- Zugriff auf PBEFG Kategorie
- Keine Prüfungen mehr
- Fortschritt bleibt gespeichert

Jederzeit wieder aktivieren:
https://FahrGewerbe.de/pricing
```

---

## 🔧 WAS ICH JETZT BAUE:

### 1. Stripe Integration
```typescript
// Subscription erstellen
// Webhooks für Payment Events
// Automatic Billing
// Subscription Management
```

### 2. Email Service
```typescript
// Welcome Email mit Login
// Payment Confirmation
// Subscription Reminders
// Cancellation Emails
```

### 3. User Management
```typescript
// Automatische User Erstellung nach Zahlung
// Passwort Generierung
// Email Versand
// Status Tracking
```

### 4. Subscription Logic
```typescript
// 2 Monate Mindestlaufzeit
// Monatliche Billing
// Automatische Kündigung bei Nicht-Zahlung
// Downgrade zu Free Plan
```

---

## 📱 ADMIN PANEL:

Dashboard für dich:
- Alle Kunden sehen
- Subscription Status
- Zahlungen tracken
- Manuelle Kündigung
- Email erneut senden

---

## 🚀 NÄCHSTE SCHRITTE:

1. **DU:** Gib mir die API Keys (Stripe, SendGrid, Supabase)
2. **ICH:** Baue komplettes Payment System (2-3 Stunden)
3. **DU:** Teste Payment Flow
4. **ICH:** Deploy auf Production
5. **DU:** Verdiene Geld! 💰

---

## 💡 KOSTEN ÜBERSICHT:

### Stripe:
- 1,5% + 0,25€ pro Transaktion
- Bei 19,99€: Du bekommst ~19,44€
- Keine Fixkosten

### SendGrid:
- KOSTENLOS bis 100 Emails/Tag
- Danach: 15$/Monat für 40.000 Emails

### Supabase:
- KOSTENLOS bis 500MB Datenbank
- Danach: 25$/Monat für mehr

### Vercel:
- KOSTENLOS für Production
- Unlimited Bandwidth

**TOTAL: ~0,55€ pro Kunde/Monat**

---

## ✅ CHECKLIST:

Gib mir diese Infos:

- [ ] Stripe Publishable Key
- [ ] Stripe Secret Key  
- [ ] Stripe Webhook Secret
- [ ] SendGrid API Key
- [ ] SendGrid From Email
- [ ] Supabase Database URL
- [ ] Supabase Anon Key
- [ ] Business Name (für Emails)
- [ ] Support Email
- [ ] Preis OK? (19,99€/Monat)

**Sobald du mir die Keys gibst, baue ich ALLES! 🚀**
