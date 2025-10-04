const fs = require('fs');

// Teste, ob die questions.json korrekt als JSON served wird
console.log('=== JSON STRUKTUR TEST ===');

try {
  const data = JSON.parse(fs.readFileSync('./data/questions.json', 'utf8'));
  
  // Prüfe jede Kategorie einzeln
  const categories = ['pbefg', 'bokraft', 'strassenverkehrsrecht', 'umweltschutz', 'versicherungen', 'grenzverkehr', 'kalkulation', 'kaufmaennische_verwaltung', 'verbaende_und_zentralen'];
  
  categories.forEach(category => {
    console.log(`\n${category.toUpperCase()}:`);
    
    if (!data[category]) {
      console.log(`  ❌ Kategorie nicht gefunden!`);
      return;
    }
    
    const questions = data[category];
    console.log(`  ✅ ${questions.length} Fragen gefunden`);
    
    // Prüfe erste und letzte Frage
    if (questions.length > 0) {
      const first = questions[0];
      const last = questions[questions.length - 1];
      
      console.log(`  📝 Erste Frage ID: ${first.id}`);
      console.log(`  📝 Letzte Frage ID: ${last.id}`);
      
      // Prüfe ob alle required Felder vorhanden sind
      const requiredFields = ['id', 'question', 'answer', 'options', 'correct'];
      const firstValid = requiredFields.every(field => first[field] !== undefined);
      const lastValid = requiredFields.every(field => last[field] !== undefined);
      
      console.log(`  🔍 Erste Frage valide: ${firstValid}`);
      console.log(`  🔍 Letzte Frage valide: ${lastValid}`);
    }
  });
  
  // Teste auch die JSON Serialization
  console.log('\n=== JSON SERIALIZATION TEST ===');
  const jsonString = JSON.stringify(data);
  const parsed = JSON.parse(jsonString);
  
  console.log('JSON Serialization erfolgreich');
  console.log(`Original Kategorien: ${Object.keys(data).length}`);
  console.log(`Geparste Kategorien: ${Object.keys(parsed).length}`);
  
} catch (error) {
  console.error('❌ FEHLER:', error);
}
