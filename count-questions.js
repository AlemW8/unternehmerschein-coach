const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./data/questions.json', 'utf8'));
  
  console.log('=== FRAGENZÄHLUNG ===');
  let total = 0;
  
  Object.keys(data).forEach(category => {
    const count = data[category].length;
    total += count;
    console.log(`${category}: ${count} Fragen`);
  });
  
  console.log(`\nGESAMT: ${total} Fragen`);
  
  // Prüfe auch die Struktur der ersten Frage jeder Kategorie
  console.log('\n=== STRUKTURPRÜFUNG ===');
  Object.keys(data).forEach(category => {
    if (data[category].length > 0) {
      const firstQuestion = data[category][0];
      const hasRequired = firstQuestion.id && firstQuestion.question && firstQuestion.answer;
      const hasOptions = firstQuestion.options && Array.isArray(firstQuestion.options);
      const hasCorrect = typeof firstQuestion.correct === 'number';
      
      console.log(`${category}: Struktur ${hasRequired && hasOptions && hasCorrect ? 'OK' : 'FEHLER'}`);
      
      if (!hasRequired || !hasOptions || !hasCorrect) {
        console.log(`  - Fehlende Felder:`, {
          id: !!firstQuestion.id,
          question: !!firstQuestion.question,
          answer: !!firstQuestion.answer,
          options: hasOptions,
          correct: hasCorrect
        });
      }
    }
  });
  
} catch (error) {
  console.error('Fehler beim Lesen der Datei:', error);
}
