// Multiple Choice Generator - Distraktor-Algorithmus
import type { Question } from '@/types'

export interface MCQuestion {
  question: Question
  options: string[]
  correctIndex: number
}

export function generateMultipleChoice(
  targetQuestion: Question,
  allQuestions: Question[],
  numOptions: number = 4
): MCQuestion {
  const correctAnswer = targetQuestion.antwort
  const distractors: string[] = []

  // Sammle potentielle Distraktoren aus dem gleichen Kapitel
  const sameChapterQuestions = allQuestions.filter(
    q => q.kapitel === targetQuestion.kapitel && q.id !== targetQuestion.id
  )

  // Sammle aus anderen Kapiteln
  const otherQuestions = allQuestions.filter(
    q => q.kapitel !== targetQuestion.kapitel
  )

  // Strategie 1: Ähnliche Schlüsselwörter
  const keywordsFromAnswer = extractKeywords(correctAnswer)
  const keywordDistractors = findSimilarAnswers(sameChapterQuestions, keywordsFromAnswer)

  // Strategie 2: Semantisch ähnliche Antworten
  const semanticDistractors = findSemanticSimilar(sameChapterQuestions, correctAnswer)

  // Strategie 3: Plausible aber falsche Antworten
  const plausibleDistractors = generatePlausibleDistractors(targetQuestion, sameChapterQuestions)

  // Strategie 4: Aus anderen Kapiteln (weniger wahrscheinlich)
  const otherChapterDistractors = otherQuestions.slice(0, 5).map(q => q.antwort)

  // Sammle alle Distraktoren
  const allDistractors = [
    ...keywordDistractors,
    ...semanticDistractors, 
    ...plausibleDistractors,
    ...otherChapterDistractors
  ].filter(d => d !== correctAnswer && d.length > 10) // Mindestlänge

  // Entferne Duplikate und wähle beste aus
  const uniqueDistractors = Array.from(new Set(allDistractors))
  const selectedDistractors = selectBestDistractors(
    uniqueDistractors,
    correctAnswer,
    numOptions - 1
  )

  // Erstelle Optionen-Array
  const options: string[] = [correctAnswer, ...selectedDistractors]
  
  // Mische die Optionen
  const shuffledOptions = shuffleArray([...options])
  const correctIndex = shuffledOptions.indexOf(correctAnswer)

  return {
    question: targetQuestion,
    options: shuffledOptions,
    correctIndex
  }
}

function extractKeywords(text: string): string[] {
  // Entferne Stopwörter und extrahiere wichtige Begriffe
  const stopWords = ['und', 'oder', 'das', 'der', 'die', 'ist', 'sind', 'wird', 'werden', 'bei', 'mit', 'von', 'zu', 'in', 'auf', 'für', 'als', 'nach']
  
  return text
    .toLowerCase()
    .replace(/[.,!?;:]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 5) // Top 5 Keywords
}

function findSimilarAnswers(questions: Question[], keywords: string[]): string[] {
  return questions
    .filter(q => {
      const answerLower = q.antwort.toLowerCase()
      return keywords.some(keyword => answerLower.includes(keyword))
    })
    .map(q => q.antwort)
    .slice(0, 3)
}

function findSemanticSimilar(questions: Question[], correctAnswer: string): string[] {
  // Vereinfachte semantische Ähnlichkeit basierend auf Länge und Struktur
  const correctLength = correctAnswer.length
  const correctWords = correctAnswer.split(' ').length

  return questions
    .filter(q => {
      const answerLength = q.antwort.length
      const answerWords = q.antwort.split(' ').length
      
      // Ähnliche Länge und Wortanzahl
      return Math.abs(answerLength - correctLength) < correctLength * 0.3 &&
             Math.abs(answerWords - correctWords) <= 2
    })
    .map(q => q.antwort)
    .slice(0, 2)
}

function generatePlausibleDistractors(question: Question, sameChapterQuestions: Question[]): string[] {
  const distractors: string[] = []

  // Kapitel-spezifische Muster
  switch (question.kapitel) {
    case 'PBefG':
      distractors.push(
        'Das regelt die Straßenverkehrsordnung (StVO).',
        'Dafür ist das Kraftfahrt-Bundesamt zuständig.',
        'Das wird durch die Gewerbeordnung geregelt.'
      )
      break
    case 'BOKraft':
      distractors.push(
        'Die Weiterbildung muss alle 3 Jahre absolviert werden.',
        'Die Grundqualifikation kann ab 21 Jahren erworben werden.',
        'Eine Weiterbildung von 20 Stunden ist ausreichend.'
      )
      break
    case 'Straßenverkehrsrecht':
      distractors.push(
        'Innerorts gilt eine Höchstgeschwindigkeit von 60 km/h.',
        'Die tägliche Lenkzeit beträgt maximal 12 Stunden.',
        'Eine Pause von 30 Minuten ist ausreichend.'
      )
      break
    case 'Versicherungen':
      distractors.push(
        'Eine Kaskoversicherung ist gesetzlich vorgeschrieben.',
        'Die Versicherung deckt nur Sachschäden ab.',
        'Betriebshaftpflicht ist nicht notwendig.'
      )
      break
  }

  return distractors.slice(0, 2)
}

function selectBestDistractors(
  distractors: string[],
  correctAnswer: string,
  count: number
): string[] {
  // Bewerte Distraktoren nach Qualität
  const scored = distractors.map(d => ({
    text: d,
    score: calculateDistractorQuality(d, correctAnswer)
  }))

  // Sortiere nach Score und nimm die besten
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(d => d.text)
}

function calculateDistractorQuality(distractorᅟ: string, correctAnswer: string): number {
  let score = 0

  // Ähnliche Länge ist gut
  const lengthSimilarity = 1 - Math.abs(distractorᅟ.length - correctAnswer.length) / Math.max(distractorᅟ.length, correctAnswer.length)
  score += lengthSimilarity * 0.3

  // Ähnliche Wortanzahl
  const distractorWords = distractorᅟ.split(' ').length
  const correctWords = correctAnswer.split(' ').length
  const wordSimilarity = 1 - Math.abs(distractorWords - correctWords) / Math.max(distractorWords, correctWords)
  score += wordSimilarity * 0.2

  // Nicht zu ähnlich (Hamming-Distanz)
  const similarity = calculateTextSimilarity(distractorᅟ, correctAnswer)
  score += (1 - similarity) * 0.3 // Weniger ähnlich ist besser für Distraktoren

  // Plausibilität (enthält Fachbegriffe)
  if (containsTechnicalTerms(distractorᅟ)) {
    score += 0.2
  }

  return score
}

function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))
  const intersection = new Set([...words1].filter(x => words2.has(x)))
  const union = new Set([...words1, ...words2])
  
  return intersection.size / union.size
}

function containsTechnicalTerms(text: string): boolean {
  const technicalTerms = [
    'genehmigung', 'verordnung', 'gesetz', 'vorschrift', 'pflicht',
    'versicherung', 'haftung', 'steuer', 'kosten', 'umsatz',
    'lenkzeit', 'ruhezeit', 'tachograph', 'fahrzeug', 'unternehmer'
  ]
  
  const textLower = text.toLowerCase()
  return technicalTerms.some(term => textLower.includes(term))
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
