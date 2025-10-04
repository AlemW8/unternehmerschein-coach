# 🚕 Unternehmerschein Coach

Die ultimative Lern-WebApp für den Unternehmerschein im Taxi- und Mietwagengewerbe. Moderne Lernmethoden, 3D-Animationen und KI-gestützte adaptive Wiederholung für maximalen Lernerfolg.

## ✨ Features

### 🎯 Lernmodi
- **Flashcards (3D-Flip)**: Interaktive Lernkarten mit 3D-Animationen
- **Multiple Choice**: Intelligente Distraktor-Generierung
- **Cram-Modus**: Schnelles Durcharbeiten aller Fragen
- **Adaptive Wiederholung**: SM-2 Algorithmus für optimales Timing

### 📚 Inhalte
- **PBefG**: Personenbeförderungsgesetz
- **BOKraft**: Berufskraftfahrer-Qualifikation
- **Straßenverkehrsrecht**: StVO, Lenk- und Ruhezeiten
- **Umweltschutz**: Umweltzonen, Kraftstoffeinsparung
- **Versicherungen**: Pflicht- und Zusatzversicherungen
- **Kaufmännische Verwaltung**: Buchführung, Steuern, Kalkulation
- **Grenzverkehr**: Internationale Fahrten, Cabotage
- **Kalkulation**: Kostenrechnung, Preisbildung

### 🎮 Gamification
- Punkte und Streaks
- Leistungsabzeichen (Badges)
- Fortschritts-Tracking
- Detaillierte Statistiken

### 💼 Prüfungsmodus
- Realistische Prüfungssimulation
- Timer mit Countdown
- Fragen markieren und überspringen
- Detaillierte Auswertung mit Schwächen-Analyse

### 🌐 Modern & Responsiv
- **Desktop-optimiert**: 4K/Ultrawide-Support
- **Mobile-first**: Perfekt auf allen Geräten
- **PWA**: Installierbar und offline nutzbar
- **Dark/Light Mode**: Automatische Theme-Erkennung

### 💳 Abo-Modell
- **Free**: 1 Kapitel kostenlos testen
- **Pro**: Vollzugriff auf alle Features
- **Team**: Für Fahrschulen und Unternehmen

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** + **shadcn/ui**
- **Framer Motion** (Animationen)
- **react-three-fiber** + **drei** (3D)
- **Zustand** (State Management)
- **React Query** (Server State)

### Backend
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth** (Authentifizierung)
- **Stripe** (Zahlungen)
- **Upstash Redis** (Cache/Rate Limiting)

### Qualität & Testing
- **Vitest** (Unit Tests)
- **Playwright** (E2E Tests)
- **ESLint** + **Prettier**
- **TypeScript** (Type Safety)

## 🚀 Installation

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn
- PostgreSQL Datenbank
- Stripe Account (für Zahlungen)

### 1. Repository klonen
```bash
git clone https://github.com/your-username/unternehmerschein-coach.git
cd unternehmerschein-coach
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Environment Variables einrichten
Kopiere die Beispiel-Datei und fülle die Werte aus:
```bash
cp env.example .env.local
```

Erforderliche Environment Variables:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/unternehmerschein"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Redis
REDIS_URL="redis://localhost:6379"
REDIS_TOKEN="your-redis-token"
```

### 4. Datenbank einrichten
```bash
# Prisma Client generieren
npx prisma generate

# Datenbank migrieren
npm run db:migrate

# Fragen-Datenbank füllen
npm run db:seed
```

### 5. Development Server starten
```bash
npm run dev
```

Die App ist jetzt unter `http://localhost:3000` erreichbar.

## 📁 Projektstruktur

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth-Routen
│   ├── admin/          # Admin-Panel
│   ├── api/            # API Routes
│   ├── exam/           # Prüfungsmodus
│   ├── learn/          # Lern-Modi
│   └── layout.tsx      # Root Layout
├── components/         # React Komponenten
│   ├── 3d/            # 3D-Komponenten
│   ├── layout/        # Layout-Komponenten
│   ├── learning/      # Lern-Komponenten
│   ├── providers/     # Context Provider
│   └── ui/            # UI-Komponenten
├── lib/               # Utilities
│   ├── mcg.ts         # Multiple Choice Generator
│   ├── spaced-repetition.ts # SM-2 Algorithmus
│   └── utils.ts       # Helper Functions
├── stores/            # Zustand Stores
├── types/             # TypeScript Types
└── styles/            # Globale Styles

data/
└── questions.json     # Fragen-Datenbank

prisma/
├── schema.prisma      # Database Schema
└── seed.ts           # Database Seeding
```

## 🔧 Scripts

```bash
# Development
npm run dev              # Dev Server starten
npm run build           # Production Build
npm run start           # Production Server

# Database
npm run db:push         # Schema zur DB pushen
npm run db:migrate      # Migration erstellen/ausführen
npm run db:seed         # Datenbank mit Beispieldaten füllen
npm run db:studio       # Prisma Studio öffnen

# Testing
npm run test            # Unit Tests
npm run test:e2e        # E2E Tests
npm run lint            # Code Linting
npm run type-check      # TypeScript prüfen

# Stripe
npm run stripe:listen   # Stripe Webhooks lokal testen
```

## 🎨 Design System

### Farben
- **Primary**: `#3b82f6` (Blau)
- **Secondary**: `#10b981` (Grün) 
- **Accent**: `#f59e0b` (Orange)
- **Destructive**: `#ef4444` (Rot)

### Themes
- **Light**: `#f9fafb` Hintergrund
- **Dark**: `#0f172a` Hintergrund
- **System**: Automatische Erkennung

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Ultrawide**: > 1440px

## 🧪 Testing

### Unit Tests
```bash
npm run test
```
Tests für:
- Spaced Repetition Algorithmus
- Multiple Choice Generator
- Utils Functions
- Store Logic

### E2E Tests
```bash
npm run test:e2e
```
Test-Szenarien:
- Benutzer-Onboarding
- Lernmodus-Navigation  
- Prüfungsablauf
- Abo-Abschluss

## 📱 PWA Features

- **Offline-Modus**: Fragen lokal verfügbar
- **Install-Prompt**: Native App-Erlebnis
- **Background-Sync**: Fortschritt synchronisieren
- **Push-Notifications**: Lernreminder (optional)

## 🔒 Sicherheit

- **CSRF-Schutz**: NextAuth Token
- **Rate Limiting**: Redis-basiert
- **Input Validation**: Zod Schemas
- **Sichere Headers**: Security Middleware
- **SQL Injection Schutz**: Prisma ORM

## 🚀 Deployment

### Vercel (empfohlen)
1. Repository mit Vercel verbinden
2. Environment Variables setzen
3. Datenbank bereitstellen (Neon/PlanetScale)
4. Stripe Webhooks konfigurieren

### Docker
```bash
# Image bauen
docker build -t unternehmerschein-coach .

# Container starten
docker run -p 3000:3000 unternehmerschein-coach
```

## 📈 Performance

### Core Web Vitals Ziele
- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1

### Optimierungen
- Code-Splitting per Route
- Image Optimization (Next.js)
- 3D-Performance monitoring
- Lazy Loading Components
- Service Worker Caching

## 🎯 Browser Support

- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile**: iOS 14+, Android 10+

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📜 Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert - siehe [LICENSE](LICENSE) für Details.

## 🙏 Acknowledgments

- **shadcn/ui** für die UI-Komponenten
- **Framer Motion** für die Animationen
- **react-three-fiber** für die 3D-Engine
- **Stripe** für die Zahlungsabwicklung
- Alle Contributors und Beta-Tester

## 📞 Support

- **Email**: support@unternehmerschein-coach.de
- **Documentation**: [docs.unternehmerschein-coach.de](https://docs.unternehmerschein-coach.de)
- **Issues**: [GitHub Issues](https://github.com/your-username/unternehmerschein-coach/issues)

---

Entwickelt mit ❤️ für angehende Taxi- und Mietwagen-Unternehmer
