#!/usr/bin/env node

// Schneller API Test Runner
const testAPIs = async () => {
  console.log('🧪 Starte API Tests...\n')

  const baseUrl = 'http://localhost:3000/api'
  const tests = []

  // Test 1: Questions API
  try {
    console.log('1️⃣  Teste /api/questions...')
    const res = await fetch(`${baseUrl}/questions/`)
    const data = await res.json()
    if (data.success && data.totalQuestions === 255) {
      console.log('   ✅ PASS: 255 Fragen gefunden')
      tests.push({ name: 'Questions API', passed: true })
    } else {
      console.log('   ❌ FAIL: Falsche Anzahl Fragen')
      tests.push({ name: 'Questions API', passed: false })
    }
  } catch (e) {
    console.log('   ❌ FAIL: Server nicht erreichbar')
    tests.push({ name: 'Questions API', passed: false })
  }

  // Test 2: PBefG Kategorie
  try {
    console.log('\n2️⃣  Teste PBefG Kategorie...')
    const res = await fetch(`${baseUrl}/questions/?category=pbefg`)
    const data = await res.json()
    if (data.success && data.count === 70) {
      console.log('   ✅ PASS: 70 PBefG Fragen gefunden')
      tests.push({ name: 'PBefG Category', passed: true })
    } else {
      console.log(`   ❌ FAIL: ${data.count} statt 70 Fragen`)
      tests.push({ name: 'PBefG Category', passed: false })
    }
  } catch (e) {
    console.log('   ❌ FAIL: Fehler beim Laden')
    tests.push({ name: 'PBefG Category', passed: false })
  }

  // Test 3: Progress API
  try {
    console.log('\n3️⃣  Teste Progress API...')
    const res = await fetch(`${baseUrl}/progress/`)
    const data = await res.json()
    if (data.success) {
      console.log('   ✅ PASS: Progress API funktioniert')
      tests.push({ name: 'Progress API', passed: true })
    } else {
      console.log('   ❌ FAIL: Unerwartete Response')
      tests.push({ name: 'Progress API', passed: false })
    }
  } catch (e) {
    console.log('   ❌ FAIL: Fehler beim Abrufen')
    tests.push({ name: 'Progress API', passed: false })
  }

  // Test 4: Achievements API
  try {
    console.log('\n4️⃣  Teste Achievements API...')
    const res = await fetch(`${baseUrl}/achievements/`)
    const data = await res.json()
    if (data.success) {
      console.log('   ✅ PASS: Achievements API funktioniert')
      tests.push({ name: 'Achievements API', passed: true })
    } else {
      console.log('   ❌ FAIL: Unerwartete Response')
      tests.push({ name: 'Achievements API', passed: false })
    }
  } catch (e) {
    console.log('   ❌ FAIL: Fehler beim Abrufen')
    tests.push({ name: 'Achievements API', passed: false })
  }

  // Test 5: Exams API
  try {
    console.log('\n5️⃣  Teste Exams API...')
    const res = await fetch(`${baseUrl}/exams/`)
    const data = await res.json()
    if (data.success) {
      console.log('   ✅ PASS: Exams API funktioniert')
      tests.push({ name: 'Exams API', passed: true })
    } else {
      console.log('   ❌ FAIL: Unerwartete Response')
      tests.push({ name: 'Exams API', passed: false })
    }
  } catch (e) {
    console.log('   ❌ FAIL: Fehler beim Abrufen')
    tests.push({ name: 'Exams API', passed: false })
  }

  // Test 6: Alle Kategorien
  const categories = [
    { id: 'pbefg', count: 70 },
    { id: 'bokraft', count: 20 },
    { id: 'strassenverkehrsrecht', count: 30 },
    { id: 'umweltschutz', count: 25 },
    { id: 'versicherungen', count: 25 },
    { id: 'grenzverkehr', count: 20 },
    { id: 'kalkulation', count: 25 },
    { id: 'kaufmaennische-verwaltung', count: 25 },
    { id: 'verbaende-zentralen', count: 15 }
  ]

  console.log('\n6️⃣  Teste alle 9 Kategorien...')
  let allCategoriesPass = true
  for (const cat of categories) {
    try {
      const res = await fetch(`${baseUrl}/questions/?category=${cat.id}`)
      const data = await res.json()
      if (data.success && data.count === cat.count) {
        console.log(`   ✅ ${cat.id}: ${cat.count} Fragen`)
      } else {
        console.log(`   ❌ ${cat.id}: ${data.count}/${cat.count} Fragen`)
        allCategoriesPass = false
      }
    } catch (e) {
      console.log(`   ❌ ${cat.id}: Fehler`)
      allCategoriesPass = false
    }
  }
  tests.push({ name: 'All Categories', passed: allCategoriesPass })

  // Zusammenfassung
  console.log('\n' + '='.repeat(50))
  console.log('📊 TEST ZUSAMMENFASSUNG')
  console.log('='.repeat(50))
  
  const passed = tests.filter(t => t.passed).length
  const total = tests.length
  const percentage = Math.round((passed / total) * 100)

  tests.forEach(test => {
    const icon = test.passed ? '✅' : '❌'
    console.log(`${icon} ${test.name}`)
  })

  console.log('\n' + '='.repeat(50))
  console.log(`Bestanden: ${passed}/${total} (${percentage}%)`)
  console.log('='.repeat(50))

  if (percentage === 100) {
    console.log('\n🎉 ALLE TESTS BESTANDEN! 🎉')
    console.log('✅ Backend ist vollständig funktionsfähig')
    console.log('✅ Bereit für Deployment und Mobile App')
  } else if (percentage >= 80) {
    console.log('\n⚠️  MEISTE TESTS BESTANDEN')
    console.log('Prüfe fehlgeschlagene Tests und behebe sie')
  } else {
    console.log('\n❌ VIELE TESTS FEHLGESCHLAGEN')
    console.log('Prüfe Server und Konfiguration')
  }

  console.log('\nDetails: siehe TEST-ANLEITUNG.md\n')
}

// Run tests
testAPIs().catch(console.error)
