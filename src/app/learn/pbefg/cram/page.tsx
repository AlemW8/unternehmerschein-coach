'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Zap, Clock, Target } from 'lucide-react'

const CRAM_QUESTIONS = [
  {
    id: 1,
    question: "PBefG Grundlagen",
    answer: "Das Personenbeförderungsgesetz regelt die entgeltliche Beförderung von Personen mit Kraftfahrzeugen."
  },
  {
    id: 2,
    question: "Taxikonzession",
    answer: "Konzession nach § 13 PBefG erforderlich für Gelegenheitsverkehr mit Taxen."
  },
  {
    id: 3,
    question: "Beförderungspflicht",
    answer: "Taxen müssen grundsätzlich jeden Fahrgast befördern (im Pflichtfahrgebiet)."
  }
]

export default function PbefgCramPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 Minuten
  const [isActive, setIsActive] = useState(false)

  const startCram = () => {
    setIsActive(true)
    setCurrentIndex(0)
  }

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % CRAM_QUESTIONS.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/learn" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PBefG Cram-Modus</h1>
            <p className="text-gray-600">Intensives Schnelllernen - {CRAM_QUESTIONS.length} Kern-Fakten</p>
          </div>
        </div>

        {!isActive ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Zap className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Cram-Session starten</h2>
            <p className="text-gray-600 mb-8">
              Lerne die wichtigsten PBefG-Fakten in nur 5 Minuten!
            </p>
            <button
              onClick={startCram}
              className="bg-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Jetzt starten
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Timer */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">
                Fakt {currentIndex + 1} von {CRAM_QUESTIONS.length}
              </span>
              <div className="flex items-center gap-2 text-yellow-600">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-yellow-700">
                {CRAM_QUESTIONS[currentIndex].question}
              </h3>
              <p className="text-gray-800 text-lg leading-relaxed mb-8">
                {CRAM_QUESTIONS[currentIndex].answer}
              </p>
              
              <button
                onClick={nextQuestion}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Nächster Fakt →
              </button>
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <Link href="/learn/pbefg/flashcards" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Target className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold">Flashcards</h3>
            <p className="text-sm text-gray-600">Detailliertes Lernen</p>
          </Link>
          
          <Link href="/learn/pbefg/multiple-choice" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Target className="w-8 h-8 text-green-600 mb-2" />
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
