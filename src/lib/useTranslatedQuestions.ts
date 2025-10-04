'use client'

import { questionsData, Question } from '@/data/questions'

export function useTranslatedQuestions() {
  const language = typeof window !== 'undefined' ? (localStorage.getItem('language') || 'de') : 'de'

  const getTranslatedQuestion = (question: Question): Question => {
    if (language === 'de' || !question.translations?.[language]) {
      return question
    }

    const translation = question.translations[language]
    return {
      ...question,
      frage: translation.frage,
      antwort: translation.antwort
    }
  }

  const translatedQuestions = questionsData.map(getTranslatedQuestion)

  return {
    questions: translatedQuestions,
    getTranslatedQuestion
  }
}
