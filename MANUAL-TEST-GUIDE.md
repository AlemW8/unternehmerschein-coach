# 🧪 MANUELLER TEST-GUIDE

## ✅ ALLE TESTS DURCHFÜHREN

Server läuft auf: **http://localhost:3000**

---

## 1. HOMEPAGE TEST 🏠

### Schritte:
1. Öffne: http://localhost:3000
2. Prüfe folgendes:

✅ **VISUAL CHECKS:**
- [ ] Hero-Bereich mit Titel sichtbar
- [ ] 3D-Animationen laufen
- [ ] "Jetzt starten" Button vorhanden
- [ ] Features-Bereich sichtbar
- [ ] Statistiken angezeigt (255 Fragen, etc.)
- [ ] Preise sichtbar
- [ ] Footer vorhanden

✅ **INTERACTIVE CHECKS:**
- [ ] "Jetzt starten" Button klickbar
- [ ] Navigation funktioniert
- [ ] Responsive auf Mobile
- [ ] Scroll-Animationen smooth

**STATUS:** ⏳ Noch nicht getestet

---

## 2. LERN-BEREICH OHNE LOGIN 📚

### Schritte:
1. Öffne: http://localhost:3000/learn
2. Prüfe folgendes:

✅ **SICHTBAR:**
- [ ] 8 Kapitel werden angezeigt:
  - PBefG (70 Fragen)
  - BOKraft (20 Fragen)  
  - Straßenverkehrsrecht (30 Fragen)
  - Umweltschutz (25 Fragen)
  - Versicherungen (25 Fragen)
  - Kaufmännische Verwaltung (25 Fragen)
  - Grenzverkehr (20 Fragen)
  - Kalkulation (40 Fragen)

✅ **INTERAKTION:**
- [ ] Kapitel sind ANKLICKBAR
- [ ] Multiple Choice Link vorhanden
- [ ] Flashcards Link vorhanden

### Schritte (Kapitel öffnen):
3. Klicke auf "PBefG" → "Multiple Choice"
4. Prüfe:

✅ **OHNE LOGIN:**
- [ ] Fragen SICHTBAR ✅
- [ ] Antworten NICHT anklickbar ❌
- [ ] Hinweis: "Bitte einloggen" ✅
- [ ] Link zu Login vorhanden ✅
- [ ] Fortschritt wird NICHT gespeichert ❌

**ERWARTUNG:** User kann Fragen SEHEN aber NICHT beantworten

**STATUS:** ⏳ Noch nicht getestet

---

## 3. REGISTRIERUNG & ZAHLUNG 💳

### Schritte:
1. Öffne: http://localhost:3000/pricing-new
2. Wähle einen Plan (z.B. Starter €49.99)
3. Fülle aus:
   - Name: Test User
   - Email: test@example.com
4. Klicke "Jetzt kaufen"

✅ **STRIPE CHECKOUT:**
- [ ] Weiterleitung zu Stripe
- [ ] Formular lädt korrekt
- [ ] Testdaten eingeben:
  ```
  Karte: 4242 4242 4242 4242
  MM/YY: 12/34
  CVC: 123
  PLZ: 12345
  ```
5. Bezahlen klicken

✅ **NACH ZAHLUNG:**
- [ ] Weiterleitung zu /payment/complete-registration ✅
- [ ] "Zahlung erfolgreich" Nachricht ✅
- [ ] Bestellübersicht sichtbar (Plan + Betrag) ✅
- [ ] Registrierungsformular geladen ✅

### Registrierung ausfüllen:
6. Fülle Formular aus:
   - Name: (vorausgefüllt) ✅
   - Email: (readonly) ✅
   - Telefon: +49 123 456789 (optional)
   - Firma: Test GmbH (optional)
   - Passwort: TestPass123!
   - Bestätigen: TestPass123!

✅ **PASSWORT-VALIDIERUNG:**
- [ ] Min. 8 Zeichen Check ✅
- [ ] Großbuchstaben Check ✅
- [ ] Kleinbuchstaben Check ✅
- [ ] Zahlen Check ✅
- [ ] Grüne Häkchen bei erfüllt ✅

7. Klicke "Konto erstellen"

✅ **ERWARTUNG:**
- [ ] Loading Spinner ✅
- [ ] Weiterleitung zu /auth/signin?registered=true ✅
- [ ] Email-Bestätigung gesendet ✅

**STATUS:** ⏳ Noch nicht getestet

---

## 4. LOGIN 🔐

### Schritte:
1. Auf http://localhost:3000/auth/signin
2. Login mit:
   - Email: test@example.com
   - Passwort: TestPass123!

✅ **ERWARTUNG:**
- [ ] Login erfolgreich
- [ ] JWT Token gespeichert
- [ ] Weiterleitung zu /learn

**STATUS:** ⏳ Noch nicht getestet

---

## 5. LERN-BEREICH MIT LOGIN 📚✨

### Schritte:
1. Nach Login auf: http://localhost:3000/learn
2. Wähle Kapitel (z.B. PBefG)
3. Klicke "Multiple Choice"

✅ **MIT LOGIN:**
- [ ] Fragen SICHTBAR ✅
- [ ] Antworten ANKLICKBAR ✅ ← WICHTIG!
- [ ] Feedback bei Antwort ✅
- [ ] Richtig/Falsch Anzeige ✅
- [ ] Fortschritt wird GESPEICHERT ✅
- [ ] Nächste Frage Button ✅
- [ ] Progress Bar ✅

### Features prüfen:
4. Beantworte 5-10 Fragen
5. Prüfe:

✅ **FORTSCHRITT:**
- [ ] Fortschrittsbalken steigt
- [ ] Statistik wird aktualisiert
- [ ] Richtig/Falsch Counter

✅ **FLASHCARDS:**
6. Gehe zu Flashcards
- [ ] Karten sichtbar
- [ ] Umdrehen funktioniert
- [ ] Weiter/Zurück Navigation

**STATUS:** ⏳ Noch nicht getestet

---

## 6. PRÜFUNGS-MODUS 📝

### Schritte:
1. Navigiere zu: http://localhost:3000/exam
2. Prüfe Zugriff:

✅ **OHNE LOGIN:**
- [ ] Redirect zu /auth/signin ✅

✅ **MIT LOGIN:**
- [ ] Prüfung startet ✅
- [ ] 40 zufällige Fragen ✅
- [ ] Timer läuft ✅
- [ ] Alle Fragen beantwortbar ✅

3. Beantworte alle Fragen
4. Klicke "Prüfung beenden"

✅ **AUSWERTUNG:**
- [ ] Ergebnis angezeigt (z.B. 35/40)
- [ ] Prozent berechnet (87.5%)
- [ ] Bestanden/Durchgefallen
- [ ] Detailansicht der Fehler

**STATUS:** ⏳ Noch nicht getestet

---

## 7. PROFIL & FORTSCHRITT 👤

### Schritte:
1. Navigiere zu: http://localhost:3000/profile

✅ **SICHTBAR:**
- [ ] Benutzername
- [ ] Email
- [ ] Registrierungsdatum
- [ ] Abo-Status

✅ **STATISTIKEN:**
- [ ] Gesamt beantwortete Fragen
- [ ] Richtige Antworten
- [ ] Erfolgsquote
- [ ] Lernzeit
- [ ] Level/XP System

✅ **ACHIEVEMENTS:**
- [ ] Unlocked Badges
- [ ] Fortschritt zu nächstem Badge
- [ ] Meilensteine

✅ **FUNKTIONEN:**
- [ ] Passwort ändern
- [ ] Daten bearbeiten
- [ ] Logout

**STATUS:** ⏳ Noch nicht getestet

---

## 8. ADMIN-BEREICH 👨‍💼

### Schritte:
1. Logout
2. Login als Admin:
   - Email: aleemwaqar@outlook.com
   - Passwort: mera4711

✅ **ZUGRIFF:**
- [ ] /admin erreichbar
- [ ] Dashboard sichtbar

✅ **FEATURES:**
- [ ] User-Liste
- [ ] Statistiken
- [ ] User erstellen/löschen

**STATUS:** ⏳ Noch nicht getestet

---

## 9. RESPONSIVE & MOBILE 📱

### Schritte:
1. Öffne Chrome DevTools (F12)
2. Wechsle zu Mobile View
3. Teste:

✅ **LAYOUTS:**
- [ ] Homepage responsive
- [ ] Navigation Mobile-Menu
- [ ] Learn-Bereich mobile
- [ ] Fragen lesbar
- [ ] Buttons klickbar
- [ ] Keine Overlays

**STATUS:** ⏳ Noch nicht getestet

---

## 10. ERROR HANDLING 🚨

### Schritte:
1. Teste falsche Eingaben:

✅ **FALSCHES LOGIN:**
- [ ] Email: wrong@test.com
- [ ] Passwort: wrong
- [ ] Error Message: "Falsche Anmeldedaten"

✅ **SCHWACHES PASSWORT:**
- Bei Registrierung: "test"
- [ ] Error: "Passwort zu schwach"

✅ **EMAIL BEREITS REGISTRIERT:**
- Bei Registrierung mit bestehender Email
- [ ] Error: "Email bereits vergeben"

**STATUS:** ⏳ Noch nicht getestet

---

## 📊 TEST-ZUSAMMENFASSUNG

| Test | Status | Notizen |
|------|--------|---------|
| Homepage | ⏳ | - |
| Learn ohne Login | ⏳ | - |
| Zahlung & Registrierung | ⏳ | - |
| Login | ⏳ | - |
| Learn mit Login | ⏳ | - |
| Prüfung | ⏳ | - |
| Profil | ⏳ | - |
| Admin | ⏳ | - |
| Mobile | ⏳ | - |
| Errors | ⏳ | - |

**Legende:**
- ✅ = Erfolgreich
- ❌ = Fehlgeschlagen
- ⏳ = Noch nicht getestet
- ⚠️ = Teilweise erfolgreich

---

## 🔥 KRITISCHE FUNKTIONEN (MUSS FUNKTIONIEREN!)

1. ✅ Zahlung → Registrierung Flow
2. ✅ Login/Logout
3. ✅ Lernen MIT Login (Fragen beantwortbar)
4. ✅ Fortschritt-Speicherung
5. ✅ Prüfungs-Modus

---

## 📝 NOTIZEN

### Gefundene Probleme:
- 

### Zu fixen:
- 

### Verbesserungen:
- 

---

**Getestet von:** _____________
**Datum:** _____________
**Status:** ⏳ IN ARBEIT
