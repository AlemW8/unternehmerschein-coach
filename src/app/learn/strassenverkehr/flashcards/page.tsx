'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Brain } from 'lucide-react'

const STRASSENVERKEHR_QUESTIONS = [
  {
    id: 1,
    question: "Was sind die drei wichtigsten Rechtsgrundlagen des deutschen Straßenverkehrsrechts?",
    answer: "1. Straßenverkehrsgesetz (StVG), 2. Straßenverkehrs-Ordnung (StVO), 3. Straßenverkehrs-Zulassungs-Ordnung (StVZO)",
    category: "Grundlagen"
  },
  {
    id: 2, 
    question: "Welche Geschwindigkeitsbegrenzungen gelten für Taxen innerorts?",
    answer: "Innerorts: 50 km/h (wie normale Pkw), keine besonderen Beschränkungen für Taxen.",
    category: "Geschwindigkeiten"
  },
  {
    id: 3,
    question: "Wann dürfen Taxen in der zweiten Reihe halten?",
    answer: "Nur zum Ein- und Aussteigen von Fahrgästen, wenn kein Parkplatz verfügbar ist und der Verkehr nicht behindert wird.",
    category: "Verkehrsregeln"
  },
  {
    id: 4,
    question: "Was gilt beim Überschreiten der zulässigen Höchstgeschwindigkeit?",
    answer: "Bußgeld, Punkte in Flensburg, bei größeren Überschreitungen Fahrverbot möglich.",
    category: "Sanktionen"
  }
]

export default function StrassenverkehrFlashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % STRASSENVERKEHR_QUESTIONS.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + STRASSENVERKEHR_QUESTIONS.length) % STRASSENVERKEHR_QUESTIONS.length)
    setShowAnswer(false)
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
            <p className="text-gray-600">Flashcards - {STRASSENVERKEHR_QUESTIONS.length} Fragen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              {currentCard + 1} von {STRASSENVERKEHR_QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-500">
              Kategorie: {STRASSENVERKEHR_QUESTIONS[currentCard].category}
            </span>
          </div>

          <motion.div
            key={currentCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              {STRASSENVERKEHR_QUESTIONS[currentCard].question}
            </h2>

            {showAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 p-6 rounded-xl border border-red-200"
              >
                <p className="text-gray-800 whitespace-pre-line">{STRASSENVERKEHR_QUESTIONS[currentCard].answer}</p>
              </motion.div>
            )}

            <div className="flex gap-4 justify-center mt-8">
              <button onClick={prevCard} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                Zurück
              </button>
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
          <Link href="/learn/strassenverkehr/multiple-choice" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Brain className="w-8 h-8 text-red-600 mb-2" />
            <h3 className="font-semibold">Multiple Choice</h3>
            <p className="text-sm text-gray-600">Teste dein Wissen</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
