'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

const STRASSENVERKEHR_MC_QUESTIONS = [
  {
    id: 1,
    question: "Welche Geschwindigkeit gilt innerorts für Taxen?",
    options: [
      "30 km/h",
      "40 km/h", 
      "50 km/h",
      "60 km/h"
    ],
    correctAnswer: 2,
    explanation: "Innerorts gilt für Taxen die allgemeine Geschwindigkeitsbegrenzung von 50 km/h wie für alle anderen Pkw auch."
  },
  {
    id: 2,
    question: "Wann dürfen Taxen in der zweiten Reihe halten?",
    options: [
      "Niemals",
      "Nur zum Ein- und Aussteigen von Fahrgästen",
      "Immer wenn der Fahrer im Fahrzeug bleibt",
      "Nur nachts"
    ],
    correctAnswer: 1,
    explanation: "Taxen dürfen in der zweiten Reihe halten, wenn es zum Ein- und Aussteigen von Fahrgästen notwendig ist und der Verkehr nicht behindert wird."
  },
  {
    id: 3,
    question: "Was ist bei einem Verkehrsunfall als Taxifahrer besonders zu beachten?",
    options: [
      "Nur die Polizei informieren",
      "Fahrgäste sofort aus dem Fahrzeug bringen",
      "Unfallstelle absichern, Verletzte versorgen, Polizei rufen",
      "Erstmal weiterfahren wenn möglich"
    ],
    correctAnswer: 2,
    explanation: "Bei einem Unfall muss die Unfallstelle abgesichert, Verletzte versorgt und die Polizei informiert werden - besonders wichtig bei gewerblicher Personenbeförderung."
  },
  {
    id: 4,
    question: "Welche Strafe droht bei 21 km/h zu schnell innerorts?",
    options: [
      "Nur Verwarnung",
      "80 Euro Bußgeld, 1 Punkt",
      "120 Euro Bußgeld, 1 Punkt", 
      "200 Euro Bußgeld, 2 Punkte"
    ],
    correctAnswer: 1,
    explanation: "Bei 21 km/h zu schnell innerorts fallen 80 Euro Bußgeld und 1 Punkt in Flensburg an."
  }
]

export default function StrassenverkehrMultipleChoice() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === STRASSENVERKEHR_MC_QUESTIONS[currentQuestion].correctAnswer
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < STRASSENVERKEHR_MC_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/learn" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Straßenverkehrsrecht</h1>
            <p className="text-gray-600">Multiple Choice - {STRASSENVERKEHR_MC_QUESTIONS.length} Fragen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              Frage {currentQuestion + 1} von {STRASSENVERKEHR_MC_QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-500">
              Score: {score.correct}/{score.total}
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            {STRASSENVERKEHR_MC_QUESTIONS[currentQuestion].question}
          </h2>

          <div className="space-y-4 mb-6">
            {STRASSENVERKEHR_MC_QUESTIONS[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === STRASSENVERKEHR_MC_QUESTIONS[currentQuestion].correctAnswer
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
                    isSelected ? 'border-red-500 bg-red-50' :
                    'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6"
            >
              <h3 className="font-semibold text-blue-900 mb-2">Erklärung:</h3>
              <p className="text-blue-800">{STRASSENVERKEHR_MC_QUESTIONS[currentQuestion].explanation}</p>
            </motion.div>
          )}

          {showResult && currentQuestion < STRASSENVERKEHR_MC_QUESTIONS.length - 1 && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Nächste Frage
            </button>
          )}

          {showResult && currentQuestion === STRASSENVERKEHR_MC_QUESTIONS.length - 1 && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz beendet!</h3>
              <p className="text-lg text-gray-600 mb-4">
                Dein Ergebnis: {score.correct} von {score.total} Fragen richtig
              </p>
              <Link
                href="/learn"
                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Zurück zur Übersicht
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
