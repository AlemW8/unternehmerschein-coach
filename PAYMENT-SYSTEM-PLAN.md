# 💳 PAYMENT SYSTEM - PRODUCTION READY

## 🎯 REQUIREMENTS:

### 1. PAYMENT FLOW:
```
Kunde besucht /pricing
  ↓
Wählt Plan (2 Monate Mindestlaufzeit)
  ↓
Stripe Checkout (€49.99 für 2 Monate)
  ↓
Nach erfolgreicher Zahlung:
  - Account wird erstellt
  - Email mit Login-Daten wird versendet
  - Zugang zu allen Inhalten
  ↓
Nach 2 Monaten:
  - Automatische monatliche Abbuchung (€24.99/Monat)
  - Kunde kann jetzt kündigen
  ↓
Bei Zahlungsausfall:
  - 1. Mahnung nach 3 Tagen
  - 2. Mahnung nach 7 Tagen
  - Account-Sperre nach 14 Tagen
```

### 2. TECHNOLOGIE STACK:

**Payment:**
- ✅ Stripe (Standard in Deutschland)
- ✅ Stripe Subscriptions (automatische Abrechnung)
- ✅ Stripe Webhooks (Payment-Events)

**Email:**
- ✅ Resend (5,000 Emails/Monat kostenlos)
- ✅ React Email (schöne Email-Templates)

**Database:**
- ✅ Prisma + PostgreSQL (Supabase)
- ✅ User Management
- ✅ Subscription Tracking
- ✅ Payment History

**Auth:**
- ✅ NextAuth.js
- ✅ Credentials Provider
- ✅ Email/Password Login

---

## 📊 PREISMODELL:

### Option 1: Premium Plan
```
Erste 2 Monate:  €49.99 (Pflicht, nicht kündbar)
Ab 3. Monat:     €24.99/Monat (monatlich kündbar)
Gesamt Jahr 1:   €49.99 + (10 × €24.99) = €299.89
```

### Option 2: Jahres-Plan (Empfohlen!)
```
Jährlich:        €199.99 (einmalig)
Pro Monat:       €16.67
Ersparnis:       €99.90 vs. Monats-Plan
```

---

## 🔧 TECHNISCHE IMPLEMENTATION:

### 1. Dependencies installieren:
```bash
npm install stripe @stripe/stripe-js
npm install resend react-email
npm install @prisma/client prisma
npm install @next-auth/prisma-adapter
npm install bcryptjs
```

### 2. Umgebungsvariablen (.env.local):
```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Email
RESEND_API_KEY=re_...

# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://FahrGewerbe.de

# App Config
NEXT_PUBLIC_APP_URL=https://FahrGewerbe.de
```

### 3. Prisma Schema:
```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  password        String
  role            Role      @default(USER)
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  subscription    Subscription?
  payments        Payment[]
  reminders       Reminder[]
}

model Subscription {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id])
  
  stripeCustomerId      String    @unique
  stripeSubscriptionId  String    @unique
  stripePriceId         String
  
  status            SubscriptionStatus  @default(ACTIVE)
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean   @default(false)
  minimumTerm        DateTime  // Datum wenn Mindestlaufzeit endet
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

model Payment {
  id                String    @id @default(cuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  
  stripePaymentId   String    @unique
  amount            Float
  currency          String    @default("eur")
  status            PaymentStatus
  
  createdAt         DateTime  @default(now())
}

model Reminder {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  
  type      ReminderType
  sentAt    DateTime  @default(now())
  email     String
  message   String
}

enum Role {
  USER
  ADMIN
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  SUSPENDED
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}

enum ReminderType {
  PAYMENT_REMINDER
  PAYMENT_WARNING
  ACCOUNT_SUSPENDED
}
```

---

## 📧 EMAIL TEMPLATES:

### 1. Willkommens-Email mit Login-Daten:
```
Betreff: Willkommen bei FahrGewerbe! 🎉

Hallo [Name],

vielen Dank für deine Anmeldung bei FahrGewerbe!

Deine Login-Daten:
Email: [email]
Passwort: [generiertes Passwort]

Link: https://FahrGewerbe.de/auth/signin

Dein Premium-Zugang:
✅ Alle 255 Fragen
✅ 9 Kategorien
✅ Flashcards & Quizze
✅ Prüfungssimulator
✅ Fortschrittstracking

Erste 2 Monate: €49.99
Ab 3. Monat: €24.99/Monat (monatlich kündbar)

Viel Erfolg!
Dein FahrGewerbe Team
```

### 2. Zahlungs-Erinnerung:
```
Betreff: Zahlungserinnerung - FahrGewerbe

Hallo [Name],

deine Zahlung für FahrGewerbe konnte nicht durchgeführt werden.

Betrag: €24.99
Fällig: [Datum]

Bitte aktualisiere deine Zahlungsmethode:
https://FahrGewerbe.de/profile/billing

Bei Fragen: support@FahrGewerbe.de

Dein FahrGewerbe Team
```

### 3. Letzte Mahnung:
```
Betreff: Letzte Mahnung - Zugang wird gesperrt

Hallo [Name],

trotz mehrfacher Erinnerung konnte deine Zahlung nicht durchgeführt werden.

Offener Betrag: €24.99
Account-Sperre in: 3 Tagen

Bitte handle jetzt:
https://FahrGewerbe.de/profile/billing

Dein FahrGewerbe Team
```

---

## 🚀 API ENDPOINTS:

### 1. Stripe Checkout:
```typescript
POST /api/stripe/checkout
Body: { priceId: 'price_...' }
Response: { sessionUrl: 'https://checkout.stripe.com/...' }
```

### 2. Stripe Webhook:
```typescript
POST /api/stripe/webhook
Headers: { stripe-signature: '...' }
Events:
  - checkout.session.completed → Create User + Send Email
  - invoice.payment_succeeded → Update Subscription
  - invoice.payment_failed → Send Reminder
  - customer.subscription.deleted → Cancel Subscription
```

### 3. User Management:
```typescript
POST /api/auth/register (wird automatisch von Stripe Webhook aufgerufen)
POST /api/auth/signin
GET  /api/user/subscription
POST /api/user/cancel-subscription
```

---

## 🔄 CRON JOBS (für Mahnungen):

### Vercel Cron:
```typescript
// vercel.json
{
  "crons": [{
    "path": "/api/cron/check-payments",
    "schedule": "0 9 * * *"  // Täglich um 9 Uhr
  }]
}

// /api/cron/check-payments
- Prüfe alle überfälligen Zahlungen
- Sende Erinnerungen (nach 3, 7, 14 Tagen)
- Sperre Accounts (nach 14 Tagen)
```

---

## 💰 STRIPE PRODUCTS ERSTELLEN:

### 1. Im Stripe Dashboard:
```
Product 1: FahrGewerbe Premium (2 Monate Mindestlaufzeit)
  - Price: €49.99
  - Billing: One-time payment
  - Metadata: { min_term: '2' }

Product 2: FahrGewerbe Monthly
  - Price: €24.99
  - Billing: Recurring (monthly)
  - Trial: None
  - Cancellation: Allowed after 2 months
```

### 2. Subscription Logic:
```typescript
// Nach erstem Payment (€49.99):
1. Erstelle User Account
2. Sende Welcome Email
3. Erstelle Stripe Subscription für monatliche Zahlungen
4. Setze minimumTerm = now + 2 Monate
5. Setze cancelAtPeriodEnd = false (erst nach 2 Monaten erlaubt)

// Bei Cancel-Request:
if (subscription.minimumTerm > now) {
  return error("Mindestlaufzeit noch nicht erreicht")
} else {
  subscription.cancelAtPeriodEnd = true
  return success("Kündigung zum nächsten Abrechnungszeitpunkt")
}
```

---

## ✅ CHECKLISTE:

### Phase 1: Setup (30 Min)
- [ ] Stripe Account erstellen
- [ ] Resend Account erstellen
- [ ] Supabase Database erstellen
- [ ] Environment Variables setzen

### Phase 2: Backend (2 Std)
- [ ] Prisma Schema erstellen
- [ ] Stripe Checkout API
- [ ] Stripe Webhook Handler
- [ ] Email Service (Resend)
- [ ] User Registration API
- [ ] Subscription Management API

### Phase 3: Frontend (1 Std)
- [ ] Pricing Page anpassen
- [ ] Checkout Flow
- [ ] Profile/Billing Page
- [ ] Subscription Management UI

### Phase 4: Testing (1 Std)
- [ ] Stripe Test Mode
- [ ] Test Payment Flow
- [ ] Test Email Delivery
- [ ] Test Subscription Cancellation
- [ ] Test Payment Failure Flow

### Phase 5: Production (30 Min)
- [ ] Stripe Live Mode aktivieren
- [ ] Deploy auf Vercel
- [ ] SSL Certificate
- [ ] Domain verbinden
- [ ] Webhook URL registrieren

---

## 🎯 NÄCHSTE SCHRITTE:

### SOFORT:
1. Stripe Account erstellen: https://dashboard.stripe.com/register
2. Resend Account: https://resend.com/signup
3. Supabase Database: https://supabase.com/dashboard

### DANN:
Sag mir Bescheid wenn du Accounts hast, dann:
1. Installiere Dependencies
2. Erstelle Prisma Schema
3. Baue Stripe Integration
4. Baue Email System
5. TESTE alles
6. GO LIVE! 🚀

---

**ALLES BEREIT FÜR PRODUCTION! 💪**
