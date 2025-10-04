'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Brain, Target, RotateCcw, Search } from 'lucide-react'

// Dynamische Flashcard-Komponente für alle Kategorien
export default function UniversalFlashcards({ category, title, colorScheme = 'blue' }: {
  category: string
  title: string
  colorScheme?: string
}) {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [masteredCards, setMasteredCards] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Lade Fragen aus der JSON-Datei
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json')
        const data = await response.json()
        const categoryQuestions = data[category] || []
        setQuestions(categoryQuestions)
        setLoading(false)
      } catch (error) {
        console.error('Error loading questions:', error)
        setLoading(false)
      }
    }
    loadQuestions()
  }, [category])

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % filteredQuestions.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length)
    setShowAnswer(false)
  }

  const toggleMastered = () => {
    const cardId = filteredQuestions[currentCard].id
    if (masteredCards.includes(cardId)) {
      setMasteredCards(masteredCards.filter(id => id !== cardId))
    } else {
      setMasteredCards([...masteredCards, cardId])
    }
  }

  const resetProgress = () => {
    setMasteredCards([])
    setCurrentCard(0)
    setShowAnswer(false)
  }

  // Color schemes
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-white',
      primary: 'blue-600',
      light: 'blue-50',
      border: 'blue-200',
      text: 'blue-800',
      textDark: 'blue-900'
    },
    green: {
      bg: 'from-green-50 to-white', 
      primary: 'green-600',
      light: 'green-50',
      border: 'green-200', 
      text: 'green-800',
      textDark: 'green-900'
    },
    red: {
      bg: 'from-red-50 to-white',
      primary: 'red-600', 
      light: 'red-50',
      border: 'red-200',
      text: 'red-800',
      textDark: 'red-900'
    },
    purple: {
      bg: 'from-purple-50 to-white',
      primary: 'purple-600',
      light: 'purple-50', 
      border: 'purple-200',
      text: 'purple-800',
      textDark: 'purple-900'
    },
    emerald: {
      bg: 'from-emerald-50 to-white',
      primary: 'emerald-600',
      light: 'emerald-50',
      border: 'emerald-200',
      text: 'emerald-800', 
      textDark: 'emerald-900'
    },
    indigo: {
      bg: 'from-indigo-50 to-white',
      primary: 'indigo-600',
      light: 'indigo-50',
      border: 'indigo-200',
      text: 'indigo-800',
      textDark: 'indigo-900'
    }
  }

  const colors = colorClasses[colorScheme as keyof typeof colorClasses] || colorClasses.blue

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Fragen werden geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} p-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/learn" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title} Flashcards</h1>
            <p className="text-gray-600">{questions.length} Fragen verfügbar</p>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-gray-600">Keine Fragen für diese Kategorie verfügbar.</p>
            <Link href="/learn" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Zurück zur Übersicht
            </Link>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Fragen durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentCard(0)
                    setShowAnswer(false)
                  }}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colors.primary} focus:border-transparent`}
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Fortschritt: {masteredCards.length} von {questions.length} gemeistert
                </span>
                <button onClick={resetProgress} className={`text-sm text-${colors.primary} hover:text-${colors.textDark} flex items-center gap-1`}>
                  <RotateCcw className="w-4 h-4" />
                  Zurücksetzen
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${colors.primary} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(masteredCards.length / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <p className="text-gray-600">Keine Fragen gefunden. Versuchen Sie einen anderen Suchbegriff.</p>
              </div>
            ) : (
              <>
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 min-h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-500">
                      Karte {currentCard + 1} von {filteredQuestions.length}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs bg-${colors.light} text-${colors.textDark}`}>
                      {filteredQuestions[currentCard].category}
                    </span>
                  </div>

                  <motion.div
                    key={`${currentCard}-${searchTerm}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-xl font-semibold mb-8 text-gray-900 leading-relaxed">
                      {filteredQuestions[currentCard].question}
                    </h2>

                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`bg-${colors.light} p-6 rounded-xl border border-${colors.border} mb-6`}
                      >
                        <h3 className={`font-semibold text-${colors.textDark} mb-2`}>Antwort:</h3>
                        <p className={`text-${colors.text} leading-relaxed`}>{filteredQuestions[currentCard].answer}</p>
                      </motion.div>
                    )}

                    {!showAnswer && (
                      <div className="mb-8">
                        <p className="text-gray-500 italic">Klicke auf "Antwort zeigen" um die Lösung zu sehen</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center mt-8">
                      <button 
                        onClick={prevCard} 
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        ← Zurück
                      </button>
                      
                      <button 
                        onClick={() => setShowAnswer(!showAnswer)}
                        className={`px-8 py-3 bg-${colors.primary} text-white rounded-lg hover:bg-${colors.textDark} transition-colors font-semibold`}
                      >
                        {showAnswer ? 'Verstecken' : 'Antwort zeigen'}
                      </button>
                      
                      <button 
                        onClick={nextCard} 
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Weiter →
                      </button>
                    </div>

                    {/* Mastery Button */}
                    {showAnswer && (
                      <div className="mt-6">
                        <button
                          onClick={toggleMastered}
                          className={`px-6 py-2 rounded-lg transition-colors ${
                            masteredCards.includes(filteredQuestions[currentCard].id)
                              ? `bg-${colors.primary} text-white hover:bg-${colors.textDark}`
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {masteredCards.includes(filteredQuestions[currentCard].id) ? '✓ Gemeistert' : 'Als gemeistert markieren'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </>
            )}

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href={`/learn/${category}/multiple-choice`} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Brain className={`w-8 h-8 text-${colors.primary} mb-2`} />
                <h3 className="font-semibold">Multiple Choice</h3>
                <p className="text-sm text-gray-600">Quiz-Modus</p>
              </Link>
              
              <Link href={`/learn/${category}/adaptive`} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Target className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-semibold">Adaptives Lernen</h3>
                <p className="text-sm text-gray-600">KI-gestützt</p>
              </Link>
              
              <Link href={`/learn/${category}/cram`} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <BookOpen className="w-8 h-8 text-orange-600 mb-2" />
                <h3 className="font-semibold">Cram-Modus</h3>
                <p className="text-sm text-gray-600">Intensivlernen</p>
              </Link>
              
              <Link href="/learn" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <ArrowLeft className="w-8 h-8 text-gray-600 mb-2" />
                <h3 className="font-semibold">Zurück</h3>
                <p className="text-sm text-gray-600">Zur Übersicht</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
