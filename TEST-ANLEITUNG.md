# 🧪 KOMPLETTE TEST-ANLEITUNG

## 📋 SCHRITT 1: BACKEND TESTEN (5 Minuten)

### Server läuft bereits auf: http://localhost:3000

### A) Im Browser testen:

#### 1. **Startseite öffnen:**
```
http://localhost:3000
```
✅ Sollte: Homepage mit Hero-Section zeigen

#### 2. **Lern-Übersicht öffnen:**
```
http://localhost:3000/learn
```
✅ Sollte: Alle 9 Kategorien zeigen mit Progress-Balken

#### 3. **PBefG Flashcards testen:**
```
http://localhost:3000/learn/pbefg/flashcards
```
✅ Sollte: 70 Flashcards zeigen mit Flip-Animation

#### 4. **PBefG Multiple-Choice testen:**
```
http://localhost:3000/learn/pbefg/multiple-choice
```
✅ Sollte: Quiz mit 70 Fragen zeigen

#### 5. **Prüfungs-Seite testen:**
```
http://localhost:3000/exam
```
✅ Sollte: Prüfungstypen zeigen (Vollprüfung, Schnelltest, etc.)

---

### B) API Endpoints testen:

#### PowerShell Befehle zum Testen:

```powershell
# 1. Alle Fragen abrufen
Invoke-RestMethod -Uri "http://localhost:3000/api/questions/" -Method Get

# 2. PBefG Fragen abrufen (70 Fragen)
Invoke-RestMethod -Uri "http://localhost:3000/api/questions/?category=pbefg" -Method Get

# 3. BOKraft Fragen abrufen (20 Fragen)
Invoke-RestMethod -Uri "http://localhost:3000/api/questions/?category=bokraft" -Method Get

# 4. User registrieren
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register/" -Method Post -Body $body -ContentType "application/json"

# 5. Progress abrufen
Invoke-RestMethod -Uri "http://localhost:3000/api/progress/" -Method Get

# 6. Achievements abrufen
Invoke-RestMethod -Uri "http://localhost:3000/api/achievements/" -Method Get

# 7. Exam Stats abrufen
Invoke-RestMethod -Uri "http://localhost:3000/api/exams/" -Method Get
```

---

## 📋 SCHRITT 2: ALLE KATEGORIEN TESTEN (10 Minuten)

### Öffne nacheinander alle Kategorien:

1. **PBefG** (70 Fragen)
   - Flashcards: http://localhost:3000/learn/pbefg/flashcards
   - Quiz: http://localhost:3000/learn/pbefg/multiple-choice
   ✅ Teste: Karte umdrehen, Frage beantworten

2. **BOKraft** (20 Fragen)
   - Flashcards: http://localhost:3000/learn/bokraft/flashcards
   - Quiz: http://localhost:3000/learn/bokraft/multiple-choice

3. **Straßenverkehrsrecht** (30 Fragen)
   - Flashcards: http://localhost:3000/learn/strassenverkehrsrecht/flashcards
   - Quiz: http://localhost:3000/learn/strassenverkehrsrecht/multiple-choice

4. **Umweltschutz** (25 Fragen)
   - Flashcards: http://localhost:3000/learn/umweltschutz/flashcards
   - Quiz: http://localhost:3000/learn/umweltschutz/multiple-choice

5. **Versicherungen** (25 Fragen)
   - Flashcards: http://localhost:3000/learn/versicherungen/flashcards
   - Quiz: http://localhost:3000/learn/versicherungen/multiple-choice

6. **Grenzverkehr** (20 Fragen)
   - Flashcards: http://localhost:3000/learn/grenzverkehr/flashcards
   - Quiz: http://localhost:3000/learn/grenzverkehr/multiple-choice

7. **Kalkulation** (25 Fragen)
   - Flashcards: http://localhost:3000/learn/kalkulation/flashcards
   - Quiz: http://localhost:3000/learn/kalkulation/multiple-choice

8. **Kaufmännische Verwaltung** (25 Fragen)
   - Flashcards: http://localhost:3000/learn/kaufmaennische-verwaltung/flashcards
   - Quiz: http://localhost:3000/learn/kaufmaennische-verwaltung/multiple-choice

9. **Verbände & Zentralen** (15 Fragen)
   - Flashcards: http://localhost:3000/learn/verbaende-zentralen/flashcards
   - Quiz: http://localhost:3000/learn/verbaende-zentralen/multiple-choice

### Was testen:
- ✅ Zeigt richtige Anzahl Fragen?
- ✅ Flashcards drehen sich?
- ✅ Quiz funktioniert?
- ✅ Feedback bei richtiger/falscher Antwort?
- ✅ Nächste Frage Button funktioniert?

---

## 📋 SCHRITT 3: FEATURES TESTEN (10 Minuten)

### A) Progress Tracking testen:
1. Öffne http://localhost:3000/learn/pbefg/multiple-choice
2. Beantworte 5 Fragen
3. Gehe zurück zu http://localhost:3000/learn
4. ✅ Prüfe: Zeigt der Progress-Balken Fortschritt?

### B) Authentication testen:
1. Öffne http://localhost:3000/auth/signin
2. ✅ Prüfe: Login-Formular sichtbar?
3. Öffne http://localhost:3000/auth/signup
4. ✅ Prüfe: Registrierungs-Formular sichtbar?

### C) Responsive Design testen:
1. Öffne Browser DevTools (F12)
2. Klicke auf Mobile-Ansicht (Handy-Icon)
3. Teste verschiedene Bildschirmgrößen:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
4. ✅ Prüfe: Sieht alles gut aus auf allen Größen?

---

## 📋 SCHRITT 4: API MIT POSTMAN TESTEN (Optional, 15 Minuten)

### Postman installieren (falls nicht vorhanden):
```powershell
# Mit Chocolatey
choco install postman

# Oder manuell downloaden:
https://www.postman.com/downloads/
```

### API Collection in Postman:

**1. Neue Collection erstellen: "Unternehmerschein API"**

**2. Requests hinzufügen:**

```
GET  http://localhost:3000/api/questions/
GET  http://localhost:3000/api/questions/?category=pbefg
POST http://localhost:3000/api/auth/register/
     Body: { "name": "Test", "email": "test@test.de", "password": "test123" }
GET  http://localhost:3000/api/progress/
POST http://localhost:3000/api/progress/
     Body: { "category": "pbefg", "questionId": 1, "isCorrect": true, "timeSpent": 30000 }
GET  http://localhost:3000/api/achievements/
GET  http://localhost:3000/api/exams/
```

---

## 📋 SCHRITT 5: PERFORMANCE TESTEN (5 Minuten)

### Lighthouse Score:
1. Öffne http://localhost:3000
2. Drücke F12 (DevTools)
3. Gehe zu "Lighthouse" Tab
4. Klicke "Generate Report"
5. ✅ Ziel: 
   - Performance: >80
   - Accessibility: >90
   - Best Practices: >90
   - SEO: >90

---

## 📋 SCHRITT 6: CONSOLE ERRORS PRÜFEN (2 Minuten)

1. Öffne http://localhost:3000
2. Drücke F12 (DevTools)
3. Gehe zu "Console" Tab
4. ✅ Prüfe: Keine roten Fehler?
5. Navigiere durch verschiedene Seiten
6. ✅ Prüfe: Immer noch keine Fehler?

---

## ✅ CHECKLISTE - WAS FUNKTIONIEREN MUSS:

### Backend:
- [ ] Server läuft auf Port 3000
- [ ] API /questions liefert 255 Fragen
- [ ] API /progress funktioniert
- [ ] API /achievements funktioniert
- [ ] API /exams funktioniert
- [ ] API /auth/register funktioniert

### Frontend:
- [ ] Homepage lädt
- [ ] /learn zeigt alle 9 Kategorien
- [ ] Flashcards funktionieren (alle 9)
- [ ] Multiple-Choice funktioniert (alle 9)
- [ ] Progress-Balken zeigen an
- [ ] Responsive auf Mobile
- [ ] Keine Console Errors

### Features:
- [ ] 255 Fragen vorhanden
- [ ] Alle Kategorien freigeschaltet
- [ ] Animations funktionieren
- [ ] Dark Mode funktioniert
- [ ] Navigation funktioniert

---

## 🐛 FEHLER BEHEBEN:

### Wenn Server nicht startet:
```powershell
# Port 3000 freigeben
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Server neu starten
npm run dev
```

### Wenn API 404 Error:
```powershell
# Prüfe trailing slash
http://localhost:3000/api/questions/  ← MIT Slash!
```

### Wenn Fragen nicht laden:
```powershell
# Prüfe ob questions.json existiert
Test-Path "public/data/questions.json"
```

---

## 📝 TEST-PROTOKOLL

Fülle aus während du testest:

```
DATUM: ______________

✅ Backend Tests:
   - Server startet: JA / NEIN
   - API Questions: JA / NEIN  (__ / 255 Fragen)
   - API Progress: JA / NEIN
   - API Achievements: JA / NEIN

✅ Frontend Tests:
   - Homepage: JA / NEIN
   - Learn Page: JA / NEIN
   - Flashcards: JA / NEIN
   - Quiz: JA / NEIN
   - Responsive: JA / NEIN

✅ Features Tests:
   - Progress Tracking: JA / NEIN
   - Alle 255 Fragen: JA / NEIN
   - 9 Kategorien: JA / NEIN
   - Animations: JA / NEIN

NOTIZEN:
_________________________________
_________________________________
_________________________________

GEFUNDENE FEHLER:
_________________________________
_________________________________
_________________________________
```

---

## 🎯 NÄCHSTER SCHRITT NACH TESTS:

Wenn alles funktioniert:
1. ✅ Melde dich mit Testergebnissen
2. Dann: Deployment vorbereiten
3. Dann: Mobile App Setup
4. Dann: iOS/Android Entwicklung

**Viel Erfolg beim Testen! 🚀**

Melde dich wenn:
- ❌ Etwas nicht funktioniert
- ✅ Alles funktioniert
- ❓ Fragen auftauchen
