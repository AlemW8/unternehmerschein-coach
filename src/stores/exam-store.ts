import { create } from 'zustand'
import type { Question, ExamSession, ExamItem, ExamConfig } from '@/types'

interface ExamState {
  // Current exam session
  currentSession: ExamSession | null
  config: ExamConfig | null
  
  // Current exam state
  questions: Question[]
  currentIndex: number
  answers: Record<number, string>
  markedQuestions: Set<number>
  timeRemaining: number // in seconds
  isActive: boolean
  
  // Results
  results: {
    score: number
    correctAnswers: number
    totalQuestions: number
    timeSpent: number
    weakestChapters: string[]
    items: ExamItem[]
  } | null

  // Actions
  startExam: (questions: Question[], config: ExamConfig) => void
  submitAnswer: (questionIndex: number, answer: string) => void
  markQuestion: (questionIndex: number) => void
  unmarkQuestion: (questionIndex: number) => void
  goToQuestion: (index: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  finishExam: () => Promise<ExamSession>
  setTimeRemaining: (seconds: number) => void
  pauseExam: () => void
  resumeExam: () => void
  resetExam: () => void
  
  // Getters
  getCurrentQuestion: () => Question | null
  getQuestionStatus: (index: number) => 'answered' | 'marked' | 'unanswered'
  getProgress: () => { answered: number; total: number; percentage: number }
  getMarkedQuestions: () => number[]
  getUnansweredQuestions: () => number[]
}

export const useExamStore = create<ExamState>((set, get) => ({
  currentSession: null,
  config: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  markedQuestions: new Set(),
  timeRemaining: 0,
  isActive: false,
  results: null,

  startExam: (questions: Question[], config: ExamConfig) => {
    const examQuestions = config.randomOrder 
      ? shuffleArray([...questions]).slice(0, config.questionCount)
      : questions.slice(0, config.questionCount)

    const session: ExamSession = {
      id: generateId(),
      userId: 'current-user', // This would come from auth
      startedAt: new Date(),
      items: [],
      kapitel: config.kapitel
    }

    set({
      currentSession: session,
      config,
      questions: examQuestions,
      currentIndex: 0,
      answers: {},
      markedQuestions: new Set(),
      timeRemaining: (config.timeLimit || 60) * 60, // Convert to seconds
      isActive: true,
      results: null
    })
  },

  submitAnswer: (questionIndex: number, answer: string) => {
    set(state => ({
      answers: {
        ...state.answers,
        [questionIndex]: answer
      }
    }))
  },

  markQuestion: (questionIndex: number) => {
    set(state => ({
      markedQuestions: new Set([...state.markedQuestions, questionIndex])
    }))
  },

  unmarkQuestion: (questionIndex: number) => {
    set(state => {
      const newMarked = new Set(state.markedQuestions)
      newMarked.delete(questionIndex)
      return { markedQuestions: newMarked }
    })
  },

  goToQuestion: (index: number) => {
    const { questions } = get()
    if (index >= 0 && index < questions.length) {
      set({ currentIndex: index })
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get()
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 })
    }
  },

  previousQuestion: () => {
    const { currentIndex } = get()
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 })
    }
  },

  finishExam: async (): Promise<ExamSession> => {
    const state = get()
    const { currentSession, questions, answers, config } = state
    
    if (!currentSession) {
      throw new Error('No active exam session')
    }

    const finishedAt = new Date()
    const timeSpent = finishedAt.getTime() - currentSession.startedAt.getTime()

    // Calculate results
    const items: ExamItem[] = questions.map((question, index) => {
      const selectedAnswer = answers[index] || ''
      const isCorrect = selectedAnswer.trim().toLowerCase() === question.antwort.trim().toLowerCase()
      
      return {
        questionId: question.id,
        selectedAnswer,
        correctAnswer: question.antwort,
        isCorrect,
        timeSpent: timeSpent / questions.length // Average time per question
      }
    })

    const correctAnswers = items.filter(item => item.isCorrect).length
    const score = (correctAnswers / questions.length) * 100

    // Analyze weak chapters
    const chapterStats = items.reduce((acc, item, index) => {
      const kapitel = questions[index].kapitel
      if (!acc[kapitel]) {
        acc[kapitel] = { correct: 0, total: 0 }
      }
      acc[kapitel].total++
      if (item.isCorrect) {
        acc[kapitel].correct++
      }
      return acc
    }, {} as Record<string, { correct: number; total: number }>)

    const weakestChapters = Object.entries(chapterStats)
      .map(([kapitel, stats]) => ({
        kapitel,
        accuracy: stats.correct / stats.total
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3)
      .map(item => item.kapitel)

    const completedSession: ExamSession = {
      ...currentSession,
      finishedAt,
      score,
      items
    }

    const results = {
      score,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent: timeSpent / 1000, // Convert to seconds
      weakestChapters,
      items
    }

    set({
      currentSession: completedSession,
      isActive: false,
      results
    })

    // TODO: Save to backend
    await saveExamSession(completedSession)

    return completedSession
  },

  setTimeRemaining: (seconds: number) => {
    set({ timeRemaining: Math.max(0, seconds) })
    
    // Auto-finish exam when time runs out
    if (seconds <= 0) {
      const { isActive } = get()
      if (isActive) {
        get().finishExam()
      }
    }
  },

  pauseExam: () => {
    set({ isActive: false })
  },

  resumeExam: () => {
    set({ isActive: true })
  },

  resetExam: () => {
    set({
      currentSession: null,
      config: null,
      questions: [],
      currentIndex: 0,
      answers: {},
      markedQuestions: new Set(),
      timeRemaining: 0,
      isActive: false,
      results: null
    })
  },

  getCurrentQuestion: () => {
    const { questions, currentIndex } = get()
    return questions[currentIndex] || null
  },

  getQuestionStatus: (index: number) => {
    const { answers, markedQuestions } = get()
    
    if (answers[index] !== undefined) {
      return 'answered'
    }
    if (markedQuestions.has(index)) {
      return 'marked'
    }
    return 'unanswered'
  },

  getProgress: () => {
    const { questions, answers } = get()
    const answered = Object.keys(answers).length
    const total = questions.length
    const percentage = total > 0 ? (answered / total) * 100 : 0
    
    return { answered, total, percentage }
  },

  getMarkedQuestions: () => {
    return Array.from(get().markedQuestions).sort((a, b) => a - b)
  },

  getUnansweredQuestions: () => {
    const { questions, answers } = get()
    const unanswered: number[] = []
    
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === undefined) {
        unanswered.push(i)
      }
    }
    
    return unanswered
  }
}))

// Utility functions
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

async function saveExamSession(session: ExamSession): Promise<void> {
  try {
    const response = await fetch('/api/exam/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
    })

    if (!response.ok) {
      console.error('Failed to save exam session')
    }
  } catch (error) {
    console.error('Error saving exam session:', error)
  }
}

// Exam timer hook
import { useEffect } from 'react'

export function useExamTimer() {
  const { timeRemaining, isActive, setTimeRemaining } = useExamStore()

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining, isActive, setTimeRemaining])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isActive
  }
}
