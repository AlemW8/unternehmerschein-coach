const fs = require('fs');
const path = require('path');

const categories = [
  { folder: 'pbefg', title: 'PBefG', color: 'blue', category: 'pbefg' },
  { folder: 'bokraft', title: 'BOKraft', color: 'green', category: 'bokraft' },
  { folder: 'strassenverkehrsrecht', title: 'Straßenverkehrsrecht', color: 'red', category: 'strassenverkehrsrecht' },
  { folder: 'umweltschutz', title: 'Umweltschutz', color: 'emerald', category: 'umweltschutz' },
  { folder: 'versicherungen', title: 'Versicherungen', color: 'purple', category: 'versicherungen' },
  { folder: 'grenzverkehr', title: 'Grenzverkehr', color: 'indigo', category: 'grenzverkehr' },
  { folder: 'kalkulation', title: 'Kalkulation', color: 'yellow', category: 'kalkulation' },
  { folder: 'kaufmaennische-verwaltung', title: 'Kaufmännische Verwaltung', color: 'cyan', category: 'kaufmaennische_verwaltung' },
  { folder: 'verbaende-zentralen', title: 'Verbände & Zentralen', color: 'pink', category: 'verbaende_und_zentralen' }
];

categories.forEach(cat => {
  const multipleChoicePath = path.join(__dirname, 'src', 'app', 'learn', cat.folder, 'multiple-choice', 'page.tsx');
  
  const content = `import UniversalMultipleChoice from '@/components/universal-multiple-choice'

export default function ${cat.title.replace(/[^a-zA-Z]/g, '')}MultipleChoice() {
  return (
    <UniversalMultipleChoice 
      category="${cat.category}"
      title="${cat.title}"
      colorScheme="${cat.color}"
    />
  )
}`;

  try {
    // Erstelle Ordner falls nicht vorhanden
    const dir = path.dirname(multipleChoicePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(multipleChoicePath, content);
    console.log(`✅ ${cat.folder}/multiple-choice/page.tsx erstellt`);
  } catch (error) {
    console.error(`❌ Fehler bei ${cat.folder}:`, error.message);
  }
});

console.log('\n🎉 Alle Multiple-Choice-Seiten aktualisiert!');
