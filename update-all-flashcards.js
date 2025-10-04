const fs = require('fs');
const path = require('path');

const categories = [
  { folder: 'pbefg', title: 'PBefG', color: 'blue' },
  { folder: 'bokraft', title: 'BOKraft', color: 'green' },
  { folder: 'strassenverkehrsrecht', title: 'Straßenverkehrsrecht', color: 'red' },
  { folder: 'umweltschutz', title: 'Umweltschutz', color: 'emerald' },
  { folder: 'versicherungen', title: 'Versicherungen', color: 'purple' },
  { folder: 'grenzverkehr', title: 'Grenzverkehr', color: 'indigo' },
  { folder: 'kalkulation', title: 'Kalkulation', color: 'yellow' },
  { folder: 'kaufmaennische-verwaltung', title: 'Kaufmännische Verwaltung', color: 'cyan' },
  { folder: 'verbaende-zentralen', title: 'Verbände & Zentralen', color: 'pink' }
];

categories.forEach(cat => {
  const flashcardsPath = path.join(__dirname, 'src', 'app', 'learn', cat.folder, 'flashcards', 'page.tsx');
  
  const content = `import UniversalFlashcards from '@/components/universal-flashcards'

export default function ${cat.title.replace(/[^a-zA-Z]/g, '')}Flashcards() {
  return (
    <UniversalFlashcards 
      category="${cat.folder.replace(/-/g, '_')}"
      title="${cat.title}"
      colorScheme="${cat.color}"
    />
  )
}`;

  try {
    // Erstelle Ordner falls nicht vorhanden
    const dir = path.dirname(flashcardsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(flashcardsPath, content);
    console.log(`✅ ${cat.folder}/flashcards/page.tsx erstellt`);
  } catch (error) {
    console.error(`❌ Fehler bei ${cat.folder}:`, error.message);
  }
});

console.log('\n🎉 Alle Flashcard-Seiten aktualisiert!');
