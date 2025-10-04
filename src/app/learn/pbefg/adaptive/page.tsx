'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Brain, Target, TrendingUp } from 'lucide-react'

const ADAPTIVE_QUESTIONS = [
  {
    id: 1,
    question: "Was regelt das PBefG?",
    options: ["Nur Taxi-Verkehr", "Entgeltliche Personenbeförderung", "Nur Busverkehr", "Nur Mietwagenverkehr"],
    correct: 1,
    difficulty: 1,
    explanation: "Das PBefG regelt die entgeltliche oder geschäftsmäßige Beförderung von Personen mit Kraftfahrzeugen."
  },
  {
    id: 2,
    question: "Welche Genehmigung braucht ein Taxiunternehmer?",
    options: ["Führerschein", "Konzession nach § 13", "TÜV-Bescheinigung", "Gewerbeschein"],
    correct: 1,
    difficulty: 2,
    explanation: "Taxiunternehmer benötigen eine Konzession nach § 13 PBefG für den Gelegenheitsverkehr."
  },
  {
    id: 3,
    question: "Was bedeutet Beförderungspflicht?",
    options: ["Nur VIPs befördern", "Alle Fahrgäste befördern", "Nur kurze Strecken", "Nur bei gutem Wetter"],
    correct: 1,
    difficulty: 2,
    explanation: "Taxen müssen grundsätzlich jeden Fahrgast befördern, wenn die Fahrt im Pflichtfahrgebiet liegt."
  }
]

export default function PbefgAdaptivePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === ADAPTIVE_QUESTIONS[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < ADAPTIVE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/learn" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PBefG Adaptives Lernen</h1>
            <p className="text-gray-600">KI-gestützte Schwierigkeitsanpassung</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-lg text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{score}/{currentQuestion + (showResult ? 1 : 0)}</div>
            <div className="text-sm text-gray-600">Richtig</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{ADAPTIVE_QUESTIONS[currentQuestion]?.difficulty || 1}</div>
            <div className="text-sm text-gray-600">Schwierigkeit</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg text-center">
            <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{Math.round((score / (currentQuestion + (showResult ? 1 : 0))) * 100) || 0}%</div>
            <div className="text-sm text-gray-600">Erfolgsrate</div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              Frage {currentQuestion + 1} von {ADAPTIVE_QUESTIONS.length}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs ${
              ADAPTIVE_QUESTIONS[currentQuestion].difficulty === 1 ? 'bg-green-100 text-green-700' :
              ADAPTIVE_QUESTIONS[currentQuestion].difficulty === 2 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              Schwierigkeit: {ADAPTIVE_QUESTIONS[currentQuestion].difficulty}
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            {ADAPTIVE_QUESTIONS[currentQuestion].question}
          </h2>

          <div className="space-y-4 mb-6">
            {ADAPTIVE_QUESTIONS[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === ADAPTIVE_QUESTIONS[currentQuestion].correct
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showCorrect ? 'border-green-500 bg-green-50' :
                    showWrong ? 'border-red-500 bg-red-50' :
                    isSelected ? 'border-purple-500 bg-purple-50' :
                    'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Erklärung:</h3>
              <p className="text-blue-800">{ADAPTIVE_QUESTIONS[currentQuestion].explanation}</p>
            </div>
          )}

          {showResult && currentQuestion < ADAPTIVE_QUESTIONS.length - 1 && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Nächste Frage
            </button>
          )}

          {showResult && currentQuestion === ADAPTIVE_QUESTIONS.length - 1 && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Session beendet!</h3>
              <p className="text-lg text-gray-600 mb-4">
                Erfolgsrate: {Math.round((score / ADAPTIVE_QUESTIONS.length) * 100)}%
              </p>
              <Link
                href="/learn"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Zurück zur Übersicht
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <Link href="/learn/pbefg/flashcards" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Target className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold">Flashcards</h3>
            <p className="text-sm text-gray-600">Klassisches Lernen</p>
          </Link>
          
          <Link href="/learn/pbefg/multiple-choice" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Brain className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold">Multiple Choice</h3>
            <p className="text-sm text-gray-600">Quiz-Modus</p>
          </Link>
          
          <Link href="/learn" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <ArrowLeft className="w-8 h-8 text-gray-600 mb-2" />
            <h3 className="font-semibold">Zurück</h3>
            <p className="text-sm text-gray-600">Zur Übersicht</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
