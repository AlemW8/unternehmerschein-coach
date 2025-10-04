'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Target, Lock } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { useProgressStore } from '@/stores/progress-store'

// Dynamische Multiple-Choice-Komponente für alle Kategorien
export default function UniversalMultipleChoice({ 
  category, 
  title, 
  colorScheme = 'blue' 
}: {
  category: string
  title: string
  colorScheme?: string
}) {
  const { user, isAuthenticated } = useAuth()
  const { updateProgress, getQuestionProgress, sessionStats } = useProgressStore()
  
  // DEBUG: Log authentication status
  useEffect(() => {
    console.log('🔐 AUTH STATUS:', { isAuthenticated, user })
  }, [isAuthenticated, user])
  
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)

  // Lade Fragen aus der JSON-Datei
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json')
        const data = await response.json()
        
        // Versuche zuerst mit Underscore, dann mit Hyphen
        const categoryWithUnderscore = category.replace(/-/g, '_')
        let categoryQuestions = data[categoryWithUnderscore] || data[category] || []
        
        // Filtere nur Multiple-Choice Fragen
        categoryQuestions = categoryQuestions.filter((q: any) => 
          q.type === 'multiple-choice' && 
          q.options && 
          Array.isArray(q.options) && 
          q.options.length >= 2
        )
        
        // Shuffle questions
        categoryQuestions = categoryQuestions.sort(() => Math.random() - 0.5)
        
        setQuestions(categoryQuestions)
        setLoading(false)
      } catch (error) {
        console.error('Error loading questions:', error)
        setLoading(false)
      }
    }
    loadQuestions()
  }, [category])

  const handleAnswer = (answerIndex: number) => {
    // WICHTIG: Nur mit Login beantwortbar!
    if (!isAuthenticated) {
      return
    }
    
    if (showFeedback) return
    
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const question = questions[currentQuestion]
    const isCorrect = answerIndex === question.correct
    const startTime = Date.now()

    if (isCorrect) {
      setScore(score + 1)
    }
    
    // Enhanced progress tracking with question ID
    const questionId = parseInt(question.id) || currentQuestion
    updateProgress(questionId, isCorrect, Date.now() - startTime)
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion])
    
    // Auto-advance after 2.5 seconds for smoother experience
    setTimeout(() => {
      nextQuestion()
    }, 2500)
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setShowResults(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setAnsweredQuestions([])
    setShowResults(false)
    // Shuffle questions again
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  // Color schemes
  const colorClasses = {
    blue: {
      gradient: 'from-blue-50 to-white',
      primary: 'blue-600',
      light: 'blue-50',
      border: 'blue-200',
      text: 'blue-800'
    },
    green: {
      gradient: 'from-green-50 to-white',
      primary: 'green-600',
      light: 'green-50',
      border: 'green-200',
      text: 'green-800'
    },
    red: {
      gradient: 'from-red-50 to-white',
      primary: 'red-600',
      light: 'red-50',
      border: 'red-200',
      text: 'red-800'
    },
    purple: {
      gradient: 'from-purple-50 to-white',
      primary: 'purple-600',
      light: 'purple-50',
      border: 'purple-200',
      text: 'purple-800'
    },
    emerald: {
      gradient: 'from-emerald-50 to-white',
      primary: 'emerald-600',
      light: 'emerald-50',
      border: 'emerald-200',
      text: 'emerald-800'
    },
    orange: {
      gradient: 'from-orange-50 to-white',
      primary: 'orange-600',
      light: 'orange-50',
      border: 'orange-200',
      text: 'orange-800'
    },
    indigo: {
      gradient: 'from-indigo-50 to-white',
      primary: 'indigo-600',
      light: 'indigo-50',
      border: 'indigo-200',
      text: 'indigo-800'
    },
    teal: {
      gradient: 'from-teal-50 to-white',
      primary: 'teal-600',
      light: 'teal-50',
      border: 'teal-200',
      text: 'teal-800'
    },
    pink: {
      gradient: 'from-pink-50 to-white',
      primary: 'pink-600',
      light: 'pink-50',
      border: 'pink-200',
      text: 'pink-800'
    }
  }

  const colors = colorClasses[colorScheme as keyof typeof colorClasses] || colorClasses.blue

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Fragen werden geladen...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Target className={`w-16 h-16 text-${colors.primary} mx-auto mb-4`} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Keine Fragen verfügbar</h2>
          <p className="text-gray-600 mb-6">
            Für diese Kategorie sind momentan keine Multiple-Choice Fragen vorhanden.
          </p>
          <Link
            href="/learn"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Lernbereich
          </Link>
        </div>
      </div>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} py-12 px-4`}>
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            {passed ? (
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            ) : (
              <Target className={`w-20 h-20 text-${colors.primary} mx-auto mb-4`} />
            )}
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Bestanden!' : 'Ergebnis'}
            </h1>
            
            <p className="text-gray-600 mb-8">
              {passed 
                ? 'Glückwunsch! Du hast das Quiz erfolgreich bestanden.'
                : 'Weiter üben, du schaffst das!'
              }
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className={`bg-${colors.light} rounded-xl p-4`}>
                <div className={`text-3xl font-bold text-${colors.primary}`}>{score}</div>
                <div className="text-sm text-gray-600">Richtig</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-600">{questions.length - score}</div>
                <div className="text-sm text-gray-600">Falsch</div>
              </div>
              <div className={`bg-${colors.light} rounded-xl p-4`}>
                <div className={`text-3xl font-bold text-${colors.primary}`}>{percentage}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full bg-gradient-to-r from-${colors.primary} to-${colors.primary} rounded-full`}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className={`inline-flex items-center gap-2 px-6 py-3 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
              >
                <RotateCcw className="w-4 h-4" />
                Nochmal
              </button>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} py-12 px-4`}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/learn"
            className={`inline-flex items-center gap-2 text-${colors.primary} hover:underline mb-4`}
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Lernbereich
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">
            Frage {currentQuestion + 1} von {questions.length}
          </p>
          
          {/* LOGIN WARNUNG */}
          {!isAuthenticated && (
            <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">
                  🔒 Nur Vorschau-Modus
                </h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Du kannst die Fragen ansehen, aber nicht beantworten. Melde dich an, um alle Funktionen zu nutzen!
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                  >
                    Jetzt anmelden
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-yellow-900 border border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors text-sm font-medium"
                  >
                    Premium holen
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Fortschritt</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r from-${colors.primary} to-${colors.primary}/80 rounded-full relative`}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{ x: [-20, 100] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Frage {currentQuestion + 1}</span>
              <span>{questions.length} Fragen</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correct
                const showCorrect = showFeedback && isCorrect
                const showWrong = showFeedback && isSelected && !isCorrect

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback || !isAuthenticated}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: showCorrect ? 1.02 : showWrong ? 0.98 : 1
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      scale: { type: "spring", stiffness: 300 }
                    }}
                    whileHover={!showFeedback && isAuthenticated ? { 
                      scale: 1.02, 
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)" 
                    } : {}}
                    whileTap={!showFeedback && isAuthenticated ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      !isAuthenticated
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        : showCorrect
                        ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
                        : showWrong
                        ? 'border-red-500 bg-red-50 shadow-lg shadow-red-100'
                        : isSelected
                        ? `border-${colors.primary} bg-${colors.light} shadow-md`
                        : `border-${colors.border} hover:border-${colors.primary} hover:bg-${colors.light} hover:shadow-md`
                    } ${showFeedback || !isAuthenticated ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${!isAuthenticated ? "text-gray-500" : showCorrect ? "text-green-800" : showWrong ? "text-red-800" : "text-gray-900"}`}>
                        {option}
                      </span>
                      {!isAuthenticated && <Lock className="w-5 h-5 text-gray-400" />}
                      {showCorrect && isAuthenticated && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </motion.div>
                      )}
                      {showWrong && isAuthenticated && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <XCircle className="w-6 h-6 text-red-600" />
                        </motion.div>
                      )}
                      {showWrong && isAuthenticated && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl ${
                  selectedAnswer === question.correct
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}
              >
                <p className={`font-semibold ${
                  selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedAnswer === question.correct ? '✅ Richtig!' : '❌ Falsch'}
                </p>
                {question.explanation && (
                  <p className="text-gray-700 mt-2">
                    {question.explanation}
                  </p>
                )}
              </motion.div>
            )}

            {/* Auto-advance Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  selectedAnswer === question.correct 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedAnswer === question.correct ? '✨ Richtig!' : '💪 Weiter so!'}
                  <span className="text-xs opacity-75">
                    {currentQuestion + 1 < questions.length ? 'Nächste Frage in 2s...' : 'Zeige Ergebnis...'}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Modern Score Display */}
        {answeredQuestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Aktueller Score</p>
                <motion.p 
                  key={score}
                  initial={{ scale: 1.2, color: "#10b981" }}
                  animate={{ scale: 1, color: "#1f2937" }}
                  className="text-2xl font-bold mt-1"
                >
                  {score} / {answeredQuestions.length}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Prozent</p>
                <motion.div 
                  key={answeredQuestions.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={`text-4xl font-black bg-gradient-to-r from-${colors.primary} to-${colors.primary}/70 bg-clip-text text-transparent`}
                >
                  {answeredQuestions.length > 0 
                    ? Math.round((score / answeredQuestions.length) * 100)
                    : 0}%
                </motion.div>
              </div>
            </div>
            
            {/* Mini Progress Bar */}
            <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: answeredQuestions.length > 0 
                    ? `${(score / answeredQuestions.length) * 100}%` 
                    : '0%' 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r from-${colors.primary} to-${colors.primary}/80 rounded-full`}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
