const fs = require('fs');

console.log('=== VOLLSTÄNDIGKEITSPRÜFUNG ===\n');

// Lade die JSON-Datei
const data = JSON.parse(fs.readFileSync('./public/data/questions.json', 'utf8'));

const expectedCounts = {
  'pbefg': 70,
  'bokraft': 20,
  'strassenverkehrsrecht': 30,
  'umweltschutz': 25,
  'versicherungen': 25,
  'grenzverkehr': 20,
  'kalkulation': 25,
  'kaufmaennische_verwaltung': 25,
  'verbaende_und_zentralen': 15
};

let allCorrect = true;
let totalQuestions = 0;

console.log('📊 FRAGENZÄHLUNG PRO KATEGORIE:\n');

Object.keys(expectedCounts).forEach(category => {
  const actual = data[category] ? data[category].length : 0;
  const expected = expectedCounts[category];
  const status = actual === expected ? '✅' : '❌';
  
  if (actual !== expected) {
    allCorrect = false;
  }
  
  totalQuestions += actual;
  
  console.log(`${status} ${category}: ${actual} Fragen (erwartet: ${expected})`);
});

console.log(`\n📈 GESAMT: ${totalQuestions} Fragen`);
console.log(`🎯 ZIEL: 255 Fragen`);

if (totalQuestions === 255 && allCorrect) {
  console.log('\n✅✅✅ PERFEKT! Alle 255 Fragen sind vorhanden! ✅✅✅');
} else {
  console.log(`\n⚠️ ACHTUNG: ${255 - totalQuestions} Fragen fehlen oder sind falsch verteilt!`);
}

// Prüfe auch die Ordnerstruktur
console.log('\n📁 ORDNERSTRUKTUR-PRÜFUNG:\n');

const folders = [
  'pbefg',
  'bokraft',
  'strassenverkehrsrecht',
  'umweltschutz',
  'versicherungen',
  'grenzverkehr',
  'kalkulation',
  'kaufmaennische-verwaltung',
  'verbaende-zentralen'
];

folders.forEach(folder => {
  const flashcardsPath = `./src/app/learn/${folder}/flashcards/page.tsx`;
  const multipleChoicePath = `./src/app/learn/${folder}/multiple-choice/page.tsx`;
  
  const hasFlashcards = fs.existsSync(flashcardsPath);
  const hasMultipleChoice = fs.existsSync(multipleChoicePath);
  
  console.log(`${folder}:`);
  console.log(`  Flashcards: ${hasFlashcards ? '✅' : '❌'}`);
  console.log(`  Multiple Choice: ${hasMultipleChoice ? '✅' : '❌'}`);
});
