'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Brain } from 'lucide-react'

const WIRTSCHAFT_QUESTIONS = [
  {
    id: 1,
    question: "Welche Kostenarten gibt es in einem Taxiunternehmen?",
    answer: "Fixkosten (Fahrzeugabschreibung, Versicherung, Konzessionsgebühren) und variable Kosten (Kraftstoff, Wartung, Reifen).",
    category: "Kostenrechnung"
  },
  {
    id: 2,
    question: "Wie berechnet man den Kilometerpreis für ein Taxi?",
    answer: "Gesamtkosten pro Jahr ÷ geplante Jahreskilometer = Mindest-Kilometerpreis (ohne Gewinn).",
    category: "Kalkulation"
  },
  {
    id: 3,
    question: "Was ist der Unterschied zwischen Umsatz und Gewinn?",
    answer: "Umsatz = alle Einnahmen, Gewinn = Umsatz minus alle Kosten (Betriebskosten + Steuern).",
    category: "Betriebswirtschaft"
  },
  {
    id: 4,
    question: "Welche Steuern muss ein Taxiunternehmer zahlen?",
    answer: "Umsatzsteuer (19%), Einkommensteuer, ggf. Gewerbesteuer (abhängig von Rechtsform und Gewinn).",
    category: "Steuern"
  }
]

export default function WirtschaftFlashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % WIRTSCHAFT_QUESTIONS.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + WIRTSCHAFT_QUESTIONS.length) % WIRTSCHAFT_QUESTIONS.length)
    setShowAnswer(false)
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
            <p className="text-gray-600">Flashcards - {WIRTSCHAFT_QUESTIONS.length} Fragen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              {currentCard + 1} von {WIRTSCHAFT_QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-500">
              Kategorie: {WIRTSCHAFT_QUESTIONS[currentCard].category}
            </span>
          </div>

          <motion.div
            key={currentCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              {WIRTSCHAFT_QUESTIONS[currentCard].question}
            </h2>

            {showAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-yellow-50 p-6 rounded-xl border border-yellow-200"
              >
                <p className="text-gray-800">{WIRTSCHAFT_QUESTIONS[currentCard].answer}</p>
              </motion.div>
            )}

            <div className="flex gap-4 justify-center mt-8">
              <button onClick={prevCard} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                Zurück
              </button>
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                {showAnswer ? 'Verstecken' : 'Antwort zeigen'}
              </button>
              <button onClick={nextCard} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                Weiter
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/learn/wirtschaft/multiple-choice" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Brain className="w-8 h-8 text-yellow-600 mb-2" />
            <h3 className="font-semibold">Multiple Choice</h3>
            <p className="text-sm text-gray-600">Teste dein Wissen</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
