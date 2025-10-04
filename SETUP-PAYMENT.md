# 🚀 SETUP ANLEITUNG - PRODUCTION PAYMENT SYSTEM

## ⚠️ WICHTIG: Was du JETZT machen musst!

### 1️⃣ STRIPE ACCOUNT ERSTELLEN (5 Minuten)

**Gehe zu:** https://dashboard.stripe.com/register

1. Erstelle Account mit deiner Email
2. Bestätige Email
3. Fülle Firmendaten aus:
   - Firmenname: [Dein Name]
   - Land: Deutschland
   - Geschäftstyp: Einzelunternehmer / Freiberufler
   - Website: FahrGewerbe.de (oder deine Domain)

4. **Bankverbindung** hinzufügen (für Auszahlungen)
   - IBAN
   - BIC
   - Kontoinhaber

5. **API Keys** kopieren:
   ```
   Dashboard → Developers → API keys
   
   Kopiere:
   - Publishable key (pk_test_...)
   - Secret key (sk_test_...)
   ```

### 2️⃣ EMAIL SERVICE ERSTELLEN (3 Minuten)

**Option A: Resend (Empfohlen!)**
- Gehe zu: https://resend.com/signup
- Erstelle Account
- Kopiere API Key
- 3,000 Emails/Monat KOSTENLOS!

**Option B: SendGrid**
- Gehe zu: https://signup.sendgrid.com/
- Erstelle Account  
- Kopiere API Key
- 100 Emails/Tag KOSTENLOS

### 3️⃣ DATENBANK ERSTELLEN (5 Minuten)

**Supabase (PostgreSQL - Kostenlos)**
- Gehe zu: https://supabase.com/dashboard
- "New Project" klicken
- Project Name: FahrGewerbe
- Password: [sicheres Passwort]
- Region: Frankfurt (eu-central-1)

**Nach Erstellung:**
```
Settings → Database → Connection String

Kopiere: postgresql://...
```

---

## 📝 ENVIRONMENT VARIABLES

Erstelle `.env.local` im Root-Verzeichnis:

```env
# ======================================
# STRIPE
# ======================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_DEIN_KEY_HIER
STRIPE_SECRET_KEY=sk_test_DEIN_KEY_HIER
STRIPE_WEBHOOK_SECRET=whsec_WIRD_SPÄTER_ERSTELLT

# ======================================
# EMAIL (Resend)
# ======================================
RESEND_API_KEY=re_DEIN_KEY_HIER
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ======================================
# DATABASE (Supabase)
# ======================================
DATABASE_URL=postgresql://postgres:PASSWORT@db.PROJEKT.supabase.co:5432/postgres

# ======================================
# AUTH
# ======================================
JWT_SECRET=ERSTELLE_RANDOM_STRING_HIER
NEXTAUTH_SECRET=ERSTELLE_RANDOM_STRING_HIER
NEXTAUTH_URL=http://localhost:3000

# ======================================
# APP CONFIG
# ======================================
NODE_ENV=development
```

**JWT_SECRET erstellen:**
```bash
# Im Terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 💳 STRIPE PRODUKTE ERSTELLEN

### Im Stripe Dashboard:

**1. Gehe zu: Products → Add product**

**Produkt 1: Premium Starter (2 Monate)**
```
Name: FahrGewerbe Premium Starter
Description: Zugang für die ersten 2 Monate (Mindestlaufzeit)
Price: €49.99
Type: One-time payment
Metadata:
  - plan: "starter"
  - months: "2"
```

**Produkt 2: Premium Monthly**
```
Name: FahrGewerbe Premium Monatlich
Description: Monatliche Verlängerung ab dem 3. Monat
Price: €24.99
Type: Recurring
Billing period: Monthly
Trial: None
```

**WICHTIG:** Kopiere beide Price IDs!
```
price_XXXXX... (Starter)
price_YYYYY... (Monthly)
```

---

## 🎯 PREISE FESTLEGEN

### Aktuelle Empfehlung:

**Starter (erste 2 Monate):**
- €49.99 einmalig
- Nicht kündbar in ersten 2 Monaten
- Automatische Verlängerung zu Monthly

**Monthly (ab 3. Monat):**
- €24.99/Monat
- Monatlich kündbar
- Automatische Abbuchung

**Alternative: Jahres-Abo**
- €199.99 einmalig
- 12 Monate Zugang
- Spart €100 vs Monthly
- Sofort kündbar nach 1 Jahr

**Du kannst ändern auf:**
- Starter: €39.99, €59.99, €69.99
- Monthly: €19.99, €29.99, €34.99
- Jahres: €149.99, €249.99, €299.99

---

## ✅ CHECKLISTE

Hake ab was du erledigt hast:

- [ ] Stripe Account erstellt
- [ ] Stripe API Keys kopiert
- [ ] Resend Account erstellt
- [ ] Resend API Key kopiert
- [ ] Supabase Database erstellt
- [ ] Database URL kopiert
- [ ] `.env.local` Datei erstellt
- [ ] Alle Keys eingefügt
- [ ] Stripe Produkte erstellt
- [ ] Price IDs kopiert

---

## 🚀 WENN ALLES FERTIG:

Sag mir Bescheid mit:

```
✅ Stripe: Erledigt
✅ Email: Erledigt
✅ Database: Erledigt
✅ .env.local: Erledigt
✅ Produkte: Erledigt

Price IDs:
- Starter: price_XXXXX
- Monthly: price_YYYYY
```

Dann baue ich:
1. ✅ Stripe Checkout Integration
2. ✅ Stripe Webhook Handler
3. ✅ Email System (Willkommens-Email)
4. ✅ User Registration (automatisch nach Payment)
5. ✅ Subscription Management
6. ✅ Mahnungs-System
7. ✅ Profile/Billing Page

---

## 💡 TIPPS:

**Stripe Test Mode:**
- Verwende zuerst Test Keys (pk_test_, sk_test_)
- Teste mit Test-Kreditkarte: 4242 4242 4242 4242
- CVV: 123, Datum: beliebig in Zukunft

**Live Mode:**
- Schalte um auf Live Keys (pk_live_, sk_live_)
- Echte Zahlungen werden verarbeitet
- Geld kommt auf dein Bankkonto

**Steuern:**
- Stripe kann automatisch Steuern berechnen
- Aktiviere unter: Settings → Tax
- Wähle: Germany, 19% MwSt

---

**BEREIT? LOS GEHT'S! 🚀**
