# All-Inkl FTP Upload Anleitung

## Übersicht
Diese Anleitung hilft dir dabei, deine statische Unternehmerschein-Coach App auf All-Inkl zu deployen.

## 1. Statische Version erstellen

```bash
npm run build:static
```

✅ **Status**: Erfolgreich erstellt in `/out` Ordner

## 2. Was ist enthalten?

Die statische Version enthält:
- ✅ Alle Lernmodule und Flashcards
- ✅ Offline-fähige Progressive Web App (PWA)
- ✅ Responsives Design für alle Geräte
- ✅ Lokale Benutzeranmeldung (localStorage)
- ✅ Komplettes Fragensystem
- ✅ Prüfungssimulation

### Wichtige Änderungen für All-Inkl:
- **Authentifizierung**: Läuft über Browser-localStorage (kein Server nötig)
- **Datenbank**: Lokale JSON-basierte Datenspeicherung
- **E-Mail**: Deaktiviert (nur lokale Demo-Benutzer)

## 3. FTP Upload Schritte

### Schritt 1: All-Inkl FTP Zugangsdaten
Benötigt:
- FTP Server: `dein-domain.de` (oder von All-Inkl bereitgestellt)
- Benutzername: Dein All-Inkl Username
- Passwort: Dein All-Inkl Passwort
- Port: 21 (Standard FTP)

### Schritt 2: FTP Client verwenden
Empfohlene Tools:
- **FileZilla** (kostenlos): https://filezilla-project.org/
- **WinSCP** (Windows): https://winscp.net/

### Schritt 3: Upload durchführen

1. **Verbindung aufbauen**:
   - Host: `ftp.dein-domain.de`
   - Benutzername: Dein All-Inkl FTP User
   - Passwort: Dein All-Inkl FTP Passwort

2. **Verzeichnis wechseln**:
   - Gehe zu `/` oder `/html` oder `/public_html` (je nach All-Inkl Setup)

3. **Dateien hochladen**:
   ```
   Lokal: /out/*  →  Server: /
   ```
   - Alle Dateien aus dem `/out` Ordner hochladen
   - **Wichtig**: Auch versteckte Dateien (.well-known, etc.)

### Schritt 4: Domain konfigurieren
- Stelle sicher, dass deine Domain auf den richtigen Ordner zeigt
- Standard ist meist `/` oder `/html`

## 4. Testen der Website

Nach dem Upload:
1. Öffne `https://deine-domain.de`
2. Teste die Anmeldung mit Demo-Benutzer:
   - E-Mail: `demo@demo.de`
   - Passwort: `demo123`
3. Prüfe alle Lernmodule
4. Teste die PWA-Installation (Browser-Popup)

## 5. Troubleshooting

### Problem: 404 Fehler
**Lösung**: 
- Stelle sicher, dass `index.html` im Root-Verzeichnis ist
- Prüfe All-Inkl Domain-Einstellungen

### Problem: CSS/JS lädt nicht
**Lösung**:
- Alle Unterordner (`_next/`, `images/`, etc.) müssen mit hochgeladen werden
- Prüfe Dateiberechtigungen (meist 644 für Dateien, 755 für Ordner)

### Problem: PWA funktioniert nicht
**Lösung**:
- `manifest.json` und `sw.js` müssen im Root sein
- HTTPS muss aktiviert sein (All-Inkl bietet kostenloses SSL)

## 6. Updates durchführen

Für Updates:
1. Lokale Änderungen machen
2. `npm run build:static` ausführen  
3. Neue `/out` Dateien via FTP hochladen
4. Browser-Cache leeren zum Testen

## 7. Backup der API-Routes

Die originalen API-Routes sind gesichert in:
```
/temp_api_backup/api/
```

Um zur Vercel-Version zurückzukehren:
```bash
mv temp_api_backup/api src/app/
```

## 8. Performance & SEO

✅ **Optimiert für**:
- Schnelle Ladezeiten (statische Dateien)
- Mobile Geräte (responsive)
- Offline-Nutzung (PWA)
- Suchmaschinen (statische HTML)

---

## Schnellstart Zusammenfassung:

1. `npm run build:static` ✅ Erledigt
2. FTP Client installieren (FileZilla)
3. All-Inkl FTP-Daten eingeben
4. `/out/*` → All-Inkl Root hochladen
5. `https://deine-domain.de` testen

**Viel Erfolg mit deiner All-Inkl Installation! 🚀**
