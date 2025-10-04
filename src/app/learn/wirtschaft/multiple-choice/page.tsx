'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

const WIRTSCHAFT_MC_QUESTIONS = [
  {
    id: 1,
    question: "Was sind Fixkosten in einem Taxiunternehmen?",
    options: [
      "Kosten, die nur bei Fahrten anfallen",
      "Kosten, die unabhängig von der Nutzung anfallen",
      "Nur Kraftstoffkosten",
      "Nur Reparaturkosten"
    ],
    correctAnswer: 1,
    explanation: "Fixkosten fallen unabhängig von der Nutzung an, z.B. Versicherung, Abschreibung, Konzessionsgebühren."
  },
  {
    id: 2,
    question: "Wie hoch ist der Umsatzsteuersatz in Deutschland?",
    options: [
      "16%",
      "19%",
      "21%",
      "25%"
    ],
    correctAnswer: 1,
    explanation: "Der reguläre Umsatzsteuersatz in Deutschland beträgt 19% (ermäßigter Satz: 7%)."
  },
  {
    id: 3,
    question: "Was gehört zu den variablen Kosten eines Taxis?",
    options: [
      "Versicherung und Steuer",
      "Kraftstoff und Wartung",
      "Nur die Konzessionsgebühr",
      "Nur die Fahrzeugfinanzierung"
    ],
    correctAnswer: 1,
    explanation: "Variable Kosten ändern sich mit der Nutzung: Kraftstoff, Wartung, Reifen, Verschleiß."
  },
  {
    id: 4,
    question: "Was ist bei der Preiskalkulation wichtig?",
    options: [
      "Nur die Kraftstoffkosten berücksichtigen",
      "Alle Kosten + Gewinnaufschlag einkalkulieren",
      "Nur die Fixkosten berücksichtigen",
      "Sich an der Konkurrenz orientieren"
    ],
    correctAnswer: 1,
    explanation: "Eine vollständige Kalkulation muss alle Kosten (fix + variabel) plus einen angemessenen Gewinnaufschlag enthalten."
  }
]

export default function WirtschaftMultipleChoice() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === WIRTSCHAFT_MC_QUESTIONS[currentQuestion].correctAnswer
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < WIRTSCHAFT_MC_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/learn" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wirtschaft & Kalkulation</h1>
            <p className="text-gray-600">Multiple Choice - {WIRTSCHAFT_MC_QUESTIONS.length} Fragen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              Frage {currentQuestion + 1} von {WIRTSCHAFT_MC_QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-500">
              Score: {score.correct}/{score.total}
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            {WIRTSCHAFT_MC_QUESTIONS[currentQuestion].question}
          </h2>

          <div className="space-y-4 mb-6">
            {WIRTSCHAFT_MC_QUESTIONS[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === WIRTSCHAFT_MC_QUESTIONS[currentQuestion].correctAnswer
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
                    isSelected ? 'border-yellow-500 bg-yellow-50' :
                    'border-gray-200 hover:border-yellow-300'
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
              <p className="text-blue-800">{WIRTSCHAFT_MC_QUESTIONS[currentQuestion].explanation}</p>
            </motion.div>
          )}

          {showResult && currentQuestion < WIRTSCHAFT_MC_QUESTIONS.length - 1 && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Nächste Frage
            </button>
          )}

          {showResult && currentQuestion === WIRTSCHAFT_MC_QUESTIONS.length - 1 && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz beendet!</h3>
              <p className="text-lg text-gray-600 mb-4">
                Dein Ergebnis: {score.correct} von {score.total} Fragen richtig
              </p>
              <Link
                href="/learn"
                className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
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
