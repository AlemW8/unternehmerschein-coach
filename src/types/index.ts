// Core Types für Unternehmerschein Coach
export interface Question {
  id: number
  kapitel: string
  frage: string
  antwort: string
  tags: string[]
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
  subscription?: Subscription
}

export interface Subscription {
  id: string
  userId: string
  plan: 'FREE' | 'PRO' | 'TEAM'
  status: 'ACTIVE' | 'INACTIVE' | 'PAST_DUE' | 'CANCELED'
  currentPeriodEnd?: Date
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

export interface Progress {
  id: string
  userId: string
  questionId: number
  ease: number
  interval: number
  repetitions: number
  lastReviewedAt?: Date
  nextReviewAt?: Date
  correct: number
  wrong: number
}

export interface ExamSession {
  id: string
  userId: string
  startedAt: Date
  finishedAt?: Date
  score?: number
  items: ExamItem[]
  kapitel?: string
}

export interface ExamItem {
  questionId: number
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  timeSpent: number // in Millisekunden
}

// Learning Modes
export type LearningMode = 'flashcards' | 'cram' | 'multiple-choice' | 'adaptive'

export interface FlashcardState {
  currentIndex: number
  showAnswer: boolean
  questions: Question[]
  answeredCorrect: Set<number>
  answeredWrong: Set<number>
}

export interface MultipleChoiceState {
  currentIndex: number
  questions: Question[]
  selectedAnswer?: string
  showResult: boolean
  score: number
  answers: Record<number, boolean>
}

export interface AdaptiveState {
  dueQuestions: Question[]
  currentQuestion?: Question
  progress: Record<number, Progress>
  sessionStats: {
    reviewed: number
    correct: number
    wrong: number
  }
}

// UI States
export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
}

// API Types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Stripe Types
export interface StripePrice {
  id: string
  nickname: string
  currency: string
  unit_amount: number
  recurring?: {
    interval: 'month' | 'year'
    interval_count: number
  }
}

export interface StripePlan {
  id: string
  name: string
  description: string
  price: StripePrice
  features: string[]
  popular?: boolean
}

// Form Types
export interface LoginFormData {
  email: string
}

export interface QuestionFormData {
  kapitel: string
  frage: string
  antwort: string
  tags: string[]
}

export interface ExamConfig {
  kapitel?: string
  questionCount: number
  timeLimit?: number // in Minuten
  randomOrder: boolean
}

// Statistics
export interface LearningStats {
  totalQuestions: number
  studiedQuestions: number
  correctAnswers: number
  wrongAnswers: number
  averageScore: number
  studyStreak: number
  totalStudyTime: number // in Minuten
  lastStudied?: Date
  chapterProgress: Record<string, {
    total: number
    studied: number
    mastered: number
    accuracy: number
  }>
}

export interface ExamStats {
  totalExams: number
  averageScore: number
  bestScore: number
  recentScores: number[]
  weakestChapters: string[]
  strongestChapters: string[]
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Error Types
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class AuthError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'AUTH_ERROR')
    this.name = 'AuthError'
  }
}

export class SubscriptionError extends AppError {
  constructor(message: string = 'Subscription required') {
    super(message, 402, 'SUBSCRIPTION_ERROR')
    this.name = 'SubscriptionError'
  }
}

// Constants
export const KAPITEL = [
  'PBefG',
  'BOKraft', 
  'Straßenverkehrsrecht',
  'Umweltschutz',
  'Versicherungen',
  'Kaufmännische Verwaltung',
  'Grenzverkehr',
  'Kalkulation'
] as const

export type KapitelType = typeof KAPITEL[number]

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    description: 'Grundfunktionen zum Kennenlernen',
    maxChapters: 1,
    features: ['1 Kapitel', 'Flashcards', 'Grundlegende Statistiken']
  },
  PRO: {
    name: 'Pro',
    description: 'Vollzugriff auf alle Lernfeatures',
    maxChapters: -1, // unlimited
    features: [
      'Alle Kapitel',
      'Prüfungsmodus', 
      'Adaptive Wiederholung',
      'Detaillierte Analysen',
      'Offline-Modus'
    ]
  },
  TEAM: {
    name: 'Team',
    description: 'Für Fahrschulen und Unternehmen',
    maxChapters: -1,
    features: [
      'Alle Pro-Features',
      'Mehrere Benutzer',
      'Fortschritts-Dashboard',
      'Benutzerverwaltung',
      'API-Zugang'
    ]
  }
} as const
