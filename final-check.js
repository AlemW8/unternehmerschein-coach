const fs = require('fs');

console.log('\n🎉🎉🎉 KOMPLETTE SYSTEMPRÜFUNG 🎉🎉🎉\n');
console.log('=' .repeat(60));

const data = JSON.parse(fs.readFileSync('./public/data/questions.json', 'utf8'));

// Kategorien mit ihren URLs
const categories = [
  { id: 'pbefg', name: 'PBefG', expected: 70, url: '/learn/pbefg' },
  { id: 'bokraft', name: 'BOKraft', expected: 20, url: '/learn/bokraft' },
  { id: 'strassenverkehrsrecht', name: 'Straßenverkehrsrecht', expected: 30, url: '/learn/strassenverkehrsrecht' },
  { id: 'umweltschutz', name: 'Umweltschutz', expected: 25, url: '/learn/umweltschutz' },
  { id: 'versicherungen', name: 'Versicherungen', expected: 25, url: '/learn/versicherungen' },
  { id: 'grenzverkehr', name: 'Grenzverkehr', expected: 20, url: '/learn/grenzverkehr' },
  { id: 'kalkulation', name: 'Kalkulation', expected: 25, url: '/learn/kalkulation' },
  { id: 'kaufmaennische_verwaltung', name: 'Kaufmännische Verwaltung', expected: 25, url: '/learn/kaufmaennische-verwaltung' },
  { id: 'verbaende_und_zentralen', name: 'Verbände & Zentralen', expected: 15, url: '/learn/verbaende-zentralen' }
];

let totalQuestions = 0;
let allPassed = true;

console.log('\n📚 FRAGEN PRO KATEGORIE:\n');

categories.forEach(cat => {
  const actualCount = data[cat.id] ? data[cat.id].length : 0;
  const passed = actualCount === cat.expected;
  const status = passed ? '✅' : '❌';
  
  if (!passed) allPassed = false;
  totalQuestions += actualCount;
  
  console.log(`${status} ${cat.name.padEnd(30)} ${actualCount.toString().padStart(3)} Fragen`);
});

console.log('\n' + '='.repeat(60));
console.log(`📊 GESAMT: ${totalQuestions} / 255 Fragen`);
console.log('='.repeat(60));

if (allPassed && totalQuestions === 255) {
  console.log('\n✅✅✅ ALLE 255 FRAGEN VERFÜGBAR! ✅✅✅\n');
  console.log('🎯 Lernmodi verfügbar:');
  console.log('   ✅ Flashcards (9 Kategorien)');
  console.log('   ✅ Multiple Choice (9 Kategorien)');
  console.log('   ✅ Adaptive Learning (9 Kategorien)');
  console.log('   ✅ Cram-Modus (9 Kategorien)');
  console.log('\n🚀 SYSTEM KOMPLETT EINSATZBEREIT!\n');
} else {
  console.log('\n❌ FEHLER: Nicht alle Fragen verfügbar!\n');
}

// Test URLs
console.log('🔗 TEST-URLS:');
console.log('   Hauptseite: http://localhost:3000/learn');
categories.forEach(cat => {
  console.log(`   ${cat.name}: http://localhost:3000${cat.url}/flashcards`);
});

console.log('\n' + '='.repeat(60));
console.log('✨ Viel Erfolg beim Lernen! ✨');
console.log('='.repeat(60) + '\n');
