#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚕 Unternehmerschein Coach - Setup Script')
console.log('==========================================\n')

const steps = [
  {
    name: 'Dependencies prüfen',
    action: checkDependencies
  },
  {
    name: 'Environment Variables einrichten',
    action: setupEnvironment
  },
  {
    name: 'Prisma Client generieren',
    action: generatePrismaClient
  },
  {
    name: 'Icons generieren (optional)',
    action: generateIcons
  }
]

async function main() {
  console.log('Starte Setup...\n')
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    console.log(`${i + 1}. ${step.name}`)
    
    try {
      await step.action()
      console.log('   ✅ Erfolgreich\n')
    } catch (error) {
      console.log(`   ❌ Fehler: ${error.message}\n`)
      
      // Continue with other steps
      if (error.critical) {
        process.exit(1)
      }
    }
  }
  
  console.log('🎉 Setup abgeschlossen!')
  console.log('\nNächste Schritte:')
  console.log('1. Datenbank-URL in .env.local eintragen')
  console.log('2. npm run db:migrate - Datenbank migrieren')
  console.log('3. npm run db:seed - Beispieldaten einfügen')
  console.log('4. npm run dev - Development-Server starten')
  console.log('\nViel Erfolg beim Entwickeln! 🚀')
}

async function checkDependencies() {
  // Check Node.js version
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
  
  if (majorVersion < 18) {
    throw new Error(`Node.js 18+ erforderlich. Aktuelle Version: ${nodeVersion}`)
  }
  
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json nicht gefunden')
  }
  
  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    console.log('   📦 Installiere Dependencies...')
    execSync('npm install', { stdio: 'inherit' })
  }
}

async function setupEnvironment() {
  const envExample = 'env.example'
  const envLocal = '.env.local'
  
  if (!fs.existsSync(envExample)) {
    throw new Error('env.example nicht gefunden')
  }
  
  if (!fs.existsSync(envLocal)) {
    console.log('   📋 Kopiere Environment-Template...')
    fs.copyFileSync(envExample, envLocal)
    
    console.log('   ⚠️  Bitte .env.local mit deinen Werten ausfüllen!')
  } else {
    console.log('   📋 .env.local bereits vorhanden')
  }
}

async function generatePrismaClient() {
  if (!fs.existsSync('prisma/schema.prisma')) {
    throw new Error('Prisma Schema nicht gefunden')
  }
  
  console.log('   🔧 Generiere Prisma Client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
}

async function generateIcons() {
  const iconsDir = 'public/icons'
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }
  
  // Create a simple SVG icon if none exists
  const iconPath = path.join(iconsDir, 'icon.svg')
  
  if (!fs.existsSync(iconPath)) {
    const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  
  <!-- Taxi body -->
  <rect x="100" y="200" width="312" height="80" rx="10" fill="#FFD700"/>
  
  <!-- Taxi roof -->
  <rect x="150" y="150" width="212" height="60" rx="8" fill="#FFD700"/>
  
  <!-- Windows -->
  <rect x="160" y="160" width="192" height="40" rx="6" fill="#87CEEB" opacity="0.8"/>
  
  <!-- Wheels -->
  <circle cx="150" cy="300" r="25" fill="#2C2C2C"/>
  <circle cx="362" cy="300" r="25" fill="#2C2C2C"/>
  
  <!-- Taxi sign -->
  <rect x="200" y="120" width="112" height="24" rx="4" fill="#FF4444"/>
  <text x="256" y="136" font-family="Arial" font-size="16" font-weight="bold" 
        text-anchor="middle" fill="white">TAXI</text>
  
  <!-- UC Text -->
  <text x="256" y="400" font-family="Arial" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="white">UC</text>
</svg>`.trim()
    
    fs.writeFileSync(iconPath, svgContent)
    console.log('   🎨 Standard-Icon erstellt')
    console.log('   💡 Tipp: Ersetze public/icons/icon.svg mit deinem eigenen Logo')
  }
}

// Run setup
main().catch((error) => {
  console.error('❌ Setup fehlgeschlagen:', error.message)
  process.exit(1)
})
