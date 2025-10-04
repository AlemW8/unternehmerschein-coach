# 🚨 WICHTIG: STRIPE PRICES FEHLEN!

## ❌ PROBLEM GEFUNDEN:

**Du hast die Produkte in Stripe erstellt, aber KEINE PRICES!**

Das ist wie ein Auto ohne Motor - sieht gut aus, fährt aber nicht! 😅

---

## ✅ LÖSUNG - STRIPE PRICES ERSTELLEN:

### SCHRITT 1: Gehe zu Stripe Dashboard
```
https://dashboard.stripe.com/test/products
```

### SCHRITT 2: Erstelle Prices für JEDES Produkt

#### 📦 PRODUKT 1: Starter (prod_TA3SydtaBEnoAK)

```
1. Klicke auf das Produkt "Starter"
2. Rechts oben: "+ Add pricing"
3. Fülle aus:
   
   Price Information:
   - Price model: Standard pricing
   - Price: 49.99
   - Currency: EUR
   
   Billing:
   - Billing period: One time
   
4. Klicke "Save pricing"
5. KOPIERE die Price ID (z.B. price_1ABC...)
```

#### 📦 PRODUKT 2: Monatlich (prod_TA3S0RYWu1yUY7)

```
1. Klicke auf das Produkt "Monatlich"
2. Rechts oben: "+ Add pricing"
3. Fülle aus:
   
   Price Information:
   - Price model: Standard pricing
   - Price: 24.99
   - Currency: EUR
   
   Billing:
   - Billing period: Recurring
   - Billing interval: Monthly
   
4. Klicke "Save pricing"
5. KOPIERE die Price ID (z.B. price_2DEF...)
```

#### 📦 PRODUKT 3: Jährlich (prod_TA3TTxRbA53bX7)

```
1. Klicke auf das Produkt "Jährlich"
2. Rechts oben: "+ Add pricing"
3. Fülle aus:
   
   Price Information:
   - Price model: Standard pricing
   - Price: 199.99
   - Currency: EUR
   
   Billing:
   - Billing period: Recurring
   - Billing interval: Yearly
   
4. Klicke "Save pricing"
5. KOPIERE die Price ID (z.B. price_3GHI...)
```

---

## 📝 SCHRITT 3: Price IDs in .env.local eintragen

Öffne `.env.local` und ersetze:

```env
# Alte Werte (FUNKTIONIEREN NICHT):
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=price_WIRD_AUTOMATISCH_GEHOLT
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_WIRD_AUTOMATISCH_GEHOLT
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_WIRD_AUTOMATISCH_GEHOLT

# Neue Werte (von Stripe Dashboard):
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=price_1ABC...  # Deine echte Price ID
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_2DEF...  # Deine echte Price ID
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_3GHI...   # Deine echte Price ID
```

---

## 🧪 SCHRITT 4: Testen

```bash
# Dev Server neu starten
npm run dev

# Script erneut ausführen
node scripts/get-stripe-prices.js

# Sollte jetzt zeigen:
✅ STARTER: price_1ABC...
✅ MONTHLY: price_2DEF...
✅ YEARLY: price_3GHI...
```

---

## 📸 SCREENSHOT-ANLEITUNG:

### Wo finde ich "+ Add pricing"?

```
1. Gehe zu: https://dashboard.stripe.com/test/products
2. Du siehst deine 3 Produkte
3. Klicke auf ein Produkt (z.B. "Starter")
4. Auf der Produkt-Seite:
   - Links: Produkt-Details
   - Rechts oben: "+ Add pricing" Button
5. Klicke darauf!
```

### Was bedeuten die Felder?

- **Price**: Der Betrag (z.B. 49.99)
- **Currency**: Währung (EUR)
- **Billing period - One time**: Einmalige Zahlung (für Starter)
- **Billing period - Recurring**: Wiederkehrend (für Monthly/Yearly)
- **Billing interval - Monthly**: Monatlich
- **Billing interval - Yearly**: Jährlich

---

## 🎯 WICHTIG:

**OHNE PRICES FUNKTIONIERT KEINE ZAHLUNG!**

Das ist der Grund warum "nichts passiert" wenn du buchen willst.

---

## ✅ NACH DEM ERSTELLEN:

```bash
# 1. Teste mit Script
node scripts/get-stripe-prices.js

# Sollte zeigen:
✅ STARTER: Price ID gefunden!
✅ MONTHLY: Price ID gefunden!
✅ YEARLY: Price ID gefunden!

# 2. Price IDs in .env.local eintragen

# 3. Dev Server neu starten
npm run dev

# 4. Teste Zahlung
http://localhost:3001/pricing-new
```

---

## 🆘 BRAUCHST DU HILFE?

Sag mir:
1. Hast du "+ Add pricing" gefunden?
2. Hast du alle 3 Prices erstellt?
3. Was sind die 3 Price IDs?

Dann trage ich sie direkt für dich ein! 🚀
