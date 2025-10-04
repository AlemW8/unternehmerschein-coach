# Unternehmerschein Coach - PowerShell Starter
Write-Host ""
Write-Host "🚕 Unternehmerschein Coach - Starter" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Wechsle zum Script-Verzeichnis
Set-Location $PSScriptRoot
Write-Host "Aktuelles Verzeichnis: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Prüfe ob package.json existiert
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Fehler: package.json nicht gefunden!" -ForegroundColor Red
    Write-Host "Stelle sicher, dass du im richtigen Projektverzeichnis bist." -ForegroundColor Red
    Read-Host "Drücke Enter zum Beenden"
    exit 1
}

Write-Host "📦 Installiere Dependencies..." -ForegroundColor Green
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Fehler beim Installieren der Dependencies!" -ForegroundColor Red
    Read-Host "Drücke Enter zum Beenden"
    exit 1
}

Write-Host ""
Write-Host "🔧 Generiere Prisma Client..." -ForegroundColor Green
npx prisma generate

Write-Host ""
Write-Host "🚀 Starte Development Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Die App wird unter http://localhost:3000 verfügbar sein" -ForegroundColor Cyan
Write-Host "Drücke Ctrl+C um zu beenden" -ForegroundColor Yellow
Write-Host ""

npm run dev
