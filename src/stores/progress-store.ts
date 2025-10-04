import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Question, Progress, LearningStats } from '@/types'
import { calculateNextReview, getInitialSM2Data, AnswerQuality, type SM2Data } from '@/lib/spaced-repetition'

interface ProgressState {
  // Progress data (synced with backend)
  progress: Record<number, Progress>
  
  // Local session data
  sessionStats: {
    questionsReviewed: number
    correctAnswers: number
    wrongAnswers: number
    startTime: Date
  }
  
  // Learning stats
  stats: LearningStats
  
  // Actions
  updateProgress: (questionId: number, isCorrect: boolean, timeSpent?: number) => void
  getQuestionProgress: (questionId: number) => Progress | null
  getDueQuestions: (questions: Question[]) => Question[]
  resetSession: () => void
  calculateStats: (questions: Question[]) => LearningStats
  
  // SM-2 Algorithm actions
  reviewQuestion: (questionId: number, quality: AnswerQuality) => void
  getNextReviewDate: (questionId: number) => Date | null
  
  // Sync actions
  syncWithServer: (serverProgress: Progress[]) => void
  getPendingSync: () => Progress[]
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      sessionStats: {
        questionsReviewed: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        startTime: new Date()
      },
      stats: {
        totalQuestions: 0,
        studiedQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        averageScore: 0,
        studyStreak: 0,
        totalStudyTime: 0,
        chapterProgress: {}
      },

      updateProgress: (questionId: number, isCorrect: boolean, timeSpent = 0) => {
        const currentProgress = get().progress[questionId] || {
          id: '',
          userId: '',
          questionId,
          ease: 2.5,
          interval: 1,
          repetitions: 0,
          correct: 0,
          wrong: 0,
          lastReviewedAt: new Date(),
          nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }

        const updatedProgress = {
          ...currentProgress,
          correct: isCorrect ? currentProgress.correct + 1 : currentProgress.correct,
          wrong: !isCorrect ? currentProgress.wrong + 1 : currentProgress.wrong,
          lastReviewedAt: new Date()
        }

        set(state => ({
          progress: {
            ...state.progress,
            [questionId]: updatedProgress
          },
          sessionStats: {
            ...state.sessionStats,
            questionsReviewed: state.sessionStats.questionsReviewed + 1,
            correctAnswers: isCorrect ? state.sessionStats.correctAnswers + 1 : state.sessionStats.correctAnswers,
            wrongAnswers: !isCorrect ? state.sessionStats.wrongAnswers + 1 : state.sessionStats.wrongAnswers
          }
        }))
      },

      reviewQuestion: (questionId: number, quality: AnswerQuality) => {
        const currentProgress = get().progress[questionId]
        const sm2Data: SM2Data = currentProgress ? {
          ease: currentProgress.ease,
          interval: currentProgress.interval,
          repetitions: currentProgress.repetitions,
          nextReviewAt: currentProgress.nextReviewAt || new Date()
        } : getInitialSM2Data()

        const newSM2Data = calculateNextReview(sm2Data, quality)

        const updatedProgress: Progress = {
          id: currentProgress?.id || '',
          userId: currentProgress?.userId || '',
          questionId,
          ease: newSM2Data.ease,
          interval: newSM2Data.interval,
          repetitions: newSM2Data.repetitions,
          correct: currentProgress?.correct || 0,
          wrong: currentProgress?.wrong || 0,
          lastReviewedAt: new Date(),
          nextReviewAt: newSM2Data.nextReviewAt
        }

        // Update correct/wrong counts
        if (quality >= AnswerQuality.GOOD) {
          updatedProgress.correct++
        } else {
          updatedProgress.wrong++
        }

        set(state => ({
          progress: {
            ...state.progress,
            [questionId]: updatedProgress
          },
          sessionStats: {
            ...state.sessionStats,
            questionsReviewed: state.sessionStats.questionsReviewed + 1,
            correctAnswers: quality >= AnswerQuality.GOOD ? state.sessionStats.correctAnswers + 1 : state.sessionStats.correctAnswers,
            wrongAnswers: quality < AnswerQuality.GOOD ? state.sessionStats.wrongAnswers + 1 : state.sessionStats.wrongAnswers
          }
        }))
      },

      getQuestionProgress: (questionId: number) => {
        return get().progress[questionId] || null
      },

      getDueQuestions: (questions: Question[]) => {
        const progress = get().progress
        const now = new Date()
        
        return questions.filter(question => {
          const questionProgress = progress[question.id]
          if (!questionProgress) return true // New questions are due
          
          return !questionProgress.nextReviewAt || questionProgress.nextReviewAt <= now
        })
      },

      getNextReviewDate: (questionId: number) => {
        const progress = get().progress[questionId]
        return progress?.nextReviewAt || null
      },

      resetSession: () => {
        set(state => ({
          sessionStats: {
            questionsReviewed: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            startTime: new Date()
          }
        }))
      },

      calculateStats: (questions: Question[]) => {
        const progress = get().progress
        const chapterProgress: Record<string, any> = {}

        // Group questions by chapter
        const questionsByChapter = questions.reduce((acc, question) => {
          if (!acc[question.kapitel]) {
            acc[question.kapitel] = []
          }
          acc[question.kapitel].push(question)
          return acc
        }, {} as Record<string, Question[]>)

        // Calculate chapter progress
        Object.entries(questionsByChapter).forEach(([kapitel, chapterQuestions]) => {
          const studiedQuestions = chapterQuestions.filter(q => progress[q.id])
          const masteredQuestions = studiedQuestions.filter(q => {
            const p = progress[q.id]
            return p && p.repetitions >= 2 && p.interval >= 21
          })
          
          const totalCorrect = studiedQuestions.reduce((sum, q) => sum + (progress[q.id]?.correct || 0), 0)
          const totalWrong = studiedQuestions.reduce((sum, q) => sum + (progress[q.id]?.wrong || 0), 0)
          const totalAttempts = totalCorrect + totalWrong
          
          chapterProgress[kapitel] = {
            total: chapterQuestions.length,
            studied: studiedQuestions.length,
            mastered: masteredQuestions.length,
            accuracy: totalAttempts > 0 ? totalCorrect / totalAttempts : 0
          }
        })

        const totalQuestions = questions.length
        const studiedQuestions = Object.keys(progress).length
        const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0)
        const totalWrong = Object.values(progress).reduce((sum, p) => sum + p.wrong, 0)
        const totalAttempts = totalCorrect + totalWrong

        const stats: LearningStats = {
          totalQuestions,
          studiedQuestions,
          correctAnswers: totalCorrect,
          wrongAnswers: totalWrong,
          averageScore: totalAttempts > 0 ? totalCorrect / totalAttempts : 0,
          studyStreak: calculateStudyStreak(progress),
          totalStudyTime: 0, // TODO: Implement time tracking
          chapterProgress,
          lastStudied: getLastStudiedDate(progress)
        }

        set({ stats })
        return stats
      },

      syncWithServer: (serverProgress: Progress[]) => {
        const progressMap = serverProgress.reduce((acc, p) => {
          acc[p.questionId] = p
          return acc
        }, {} as Record<number, Progress>)

        set({ progress: progressMap })
      },

      getPendingSync: () => {
        // Return progress items that need to be synced to server
        // This could be based on a 'dirty' flag or timestamp comparison
        return Object.values(get().progress)
      }
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        progress: state.progress,
        stats: state.stats
      })
    }
  )
)

function calculateStudyStreak(progress: Record<number, Progress>): number {
  const studyDates = Object.values(progress)
    .filter(p => p.lastReviewedAt)
    .map(p => p.lastReviewedAt!)
    .sort((a, b) => b.getTime() - a.getTime())

  if (studyDates.length === 0) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  let currentDate = new Date(today)

  for (const studyDate of studyDates) {
    const studyDay = new Date(studyDate)
    studyDay.setHours(0, 0, 0, 0)

    if (studyDay.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (studyDay.getTime() < currentDate.getTime()) {
      break
    }
  }

  return streak
}

function getLastStudiedDate(progress: Record<number, Progress>): Date | undefined {
  const dates = Object.values(progress)
    .map(p => p.lastReviewedAt)
    .filter(date => date)
    .sort((a, b) => b!.getTime() - a!.getTime())

  return dates[0]
}
