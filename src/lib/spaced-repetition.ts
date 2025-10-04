// SM-2 Light Algorithm für Spaced Repetition
export interface SM2Data {
  ease: number
  interval: number
  repetitions: number
  nextReviewAt: Date
}

export enum AnswerQuality {
  AGAIN = 0,      // Falsch, nochmal
  HARD = 1,       // Schwer, kürzer
  GOOD = 2,       // Gut, normal
  EASY = 3        // Einfach, länger
}

export function calculateNextReview(
  currentData: SM2Data,
  quality: AnswerQuality,
  reviewedAt: Date = new Date()
): SM2Data {
  let { ease, interval, repetitions } = currentData

  // Bei falscher Antwort zurücksetzen
  if (quality < 2) {
    return {
      ease: Math.max(1.3, ease - 0.2),
      interval: 1,
      repetitions: 0,
      nextReviewAt: new Date(reviewedAt.getTime() + 1 * 24 * 60 * 60 * 1000) // 1 Tag
    }
  }

  // Wiederholungen erhöhen
  repetitions += 1

  // Ease-Faktor anpassen
  if (quality === AnswerQuality.EASY) {
    ease = Math.min(2.5, ease + 0.15)
  } else if (quality === AnswerQuality.HARD) {
    ease = Math.max(1.3, ease - 0.15)
  }
  // GOOD ändert ease nicht

  // Neues Intervall berechnen
  if (repetitions === 1) {
    interval = 1
  } else if (repetitions === 2) {
    interval = 6
  } else {
    interval = Math.round(interval * ease)
  }

  // Quality-Modifier
  if (quality === AnswerQuality.HARD) {
    interval = Math.max(1, Math.round(interval * 0.6))
  } else if (quality === AnswerQuality.EASY) {
    interval = Math.round(interval * 1.3)
  }

  // Maximum: 365 Tage
  interval = Math.min(365, interval)

  return {
    ease,
    interval,
    repetitions,
    nextReviewAt: new Date(reviewedAt.getTime() + interval * 24 * 60 * 60 * 1000)
  }
}

export function getInitialSM2Data(): SM2Data {
  return {
    ease: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 Tag
  }
}

export function getDueQuestions(questions: any[], progressData: Record<number, SM2Data>): any[] {
  const now = new Date()
  
  return questions.filter(question => {
    const progress = progressData[question.id]
    if (!progress) return true // Neue Fragen sind fällig
    
    return progress.nextReviewAt <= now
  })
}

export function getStudyStats(progressData: Record<number, SM2Data>) {
  const now = new Date()
  let due = 0
  let learning = 0
  let mature = 0

  Object.values(progressData).forEach(progress => {
    if (progress.nextReviewAt <= now) {
      due++
    }
    
    if (progress.interval < 21) {
      learning++
    } else {
      mature++
    }
  })

  return { due, learning, mature }
}
