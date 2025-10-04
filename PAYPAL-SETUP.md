# PayPal Setup für Unternehmerschein Coach

## 1. PayPal Developer Account Setup

1. Gehe zu: https://developer.paypal.com/
2. Melde dich mit deinem PayPal-Konto an
3. Klicke auf "Create App"
4. App Name: "Unternehmerschein Coach"
5. Merchant: Wähle dein PayPal-Konto
6. Features: Aktiviere "Accept payments"

## 2. PayPal App-Konfiguration

### Sandbox (Testen):
- Client ID kopieren aus dem Dashboard
- In `.env.local` eintragen: `NEXT_PUBLIC_PAYPAL_CLIENT_ID=deine_sandbox_client_id`

### Live (Produktion):
- Auf "Live" umschalten im PayPal Dashboard
- Live Client ID kopieren
- In Produktion `.env.local` ersetzen

## 3. Environment Variables

Erstelle `.env.local` mit folgenden Werten:

```bash
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=deine_paypal_client_id_hier
NEXT_PUBLIC_PAYPAL_ENVIRONMENT=sandbox # oder "live" für Produktion

# Payment Plans (in Cent!)
NEXT_PUBLIC_PAYMENT_BASIC_PRICE=1997
NEXT_PUBLIC_PAYMENT_PREMIUM_PRICE=3997
NEXT_PUBLIC_PAYMENT_PRO_PRICE=7997

# Features
NEXT_PUBLIC_SKIP_PAYMENT_ENABLED=true # zum Testen auf true lassen
```

## 4. Preise & Pläne

### Basic Plan (19,97€):
- Zugang zu allen Grundfragen
- 90 Tage Zugang
- E-Mail Support

### Premium Plan (39,97€):
- Alle Basic Features
- Erweiterte Fragen
- 180 Tage Zugang
- Priority Support
- Übungsmodus

### Pro Plan (79,97€):
- Alle Premium Features
- Unbegrenzter Zugang
- 1-zu-1 Coaching Session
- Prüfungssimulation
- Zertifikat

## 5. Testing

1. Verwende Sandbox-Modus
2. PayPal stellt Test-Accounts bereit
3. "Payment überspringen" Button für Tests aktiviert
4. Alle Funktionen ohne echte Zahlung testbar

## 6. Deployment

1. Build erstellt mit: `npm run build`
2. Dateien in `dist/` Ordner
3. Upload zu All-inkl via FTP
4. Domain: waqaraleem.com

## 7. Go Live Checklist

- [ ] PayPal App auf "Live" umgestellt
- [ ] Live Client ID eingegeben
- [ ] `NEXT_PUBLIC_PAYPAL_ENVIRONMENT=live` gesetzt
- [ ] `NEXT_PUBLIC_SKIP_PAYMENT_ENABLED=false` für Produktion
- [ ] Alle Features getestet
- [ ] SSL-Zertifikat aktiv

## 8. Support & Features

### Authentifizierung:
- Funktioniert ohne Server
- 24h Sessions
- Sichere localStorage-Verwaltung

### Mehrsprachigkeit:
- Deutsch, Englisch, Türkisch, Arabisch, Französisch, Spanisch, **Urdu**
- Automatische Browser-Sprach-Erkennung
- Manuelle Sprachwahl möglich

### Zahlungssystem:
- Vollständige PayPal-Integration
- 3 verschiedene Pläne
- Skip-Option für Tests
- Automatische Freischaltung nach Zahlung

## 9. Wichtige URLs

- Hauptseite: https://waqaraleem.com
- Anmeldung: https://waqaraleem.com/auth/signin
- Registrierung: https://waqaraleem.com/auth/signup  
- Preise: https://waqaraleem.com/pricing
- Lernbereich: https://waqaraleem.com/learn

Alles ist perfekt eingerichtet und bereit für den Einsatz! 🚀
