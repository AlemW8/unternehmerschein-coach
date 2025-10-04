'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Trophy, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle,
  Play,
  Settings,
  BarChart3,
  Calendar,
  Users,
  BookOpen,
  Zap,
  TrendingUp
} from 'lucide-react'

// Mock data für Prüfungsstatistiken - Alles auf 0 für den Start
const EXAM_STATS = {
  totalExams: 0,
  averageScore: 0,
  bestScore: 0,
  lastScore: 0,
  passRate: 0,
  totalQuestions: 0,
  averageTime: 0, // Minuten
  strongestChapter: 'Noch keine Daten',
  weakestChapter: 'Noch keine Daten'
}

const RECENT_EXAMS: Array<{ id: number, date: string, score: number, questions: number, time: number, passed: boolean }> = [
  // Noch keine Prüfungen absolviert
]

const EXAM_TYPES = [
  {
    id: 'full',
    name: 'Vollprüfung',
    description: 'Komplette Prüfung mit allen Kapiteln',
    duration: 90,
    questions: 60,
    difficulty: 'Schwer',
    icon: Trophy,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600'
  },
  {
    id: 'quick',
    name: 'Schnelltest',
    description: '20 Fragen aus allen Bereichen',
    duration: 20,
    questions: 20,
    difficulty: 'Mittel',
    icon: Zap,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600'
  },
  {
    id: 'chapter',
    name: 'Kapitel-Test',
    description: 'Fokus auf ein bestimmtes Kapitel',
    duration: 30,
    questions: 25,
    difficulty: 'Mittel',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600'
  },
  {
    id: 'weak',
    name: 'Schwächen-Training',
    description: 'Fokus auf schwierige Fragen',
    duration: 45,
    questions: 30,
    difficulty: 'Schwer',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600'
  }
]

export default function ExamPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-slate-900 dark:to-red-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Prüfungsmodus
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Testen Sie Ihr Wissen unter realistischen Prüfungsbedingungen. 
            Wählen Sie den passenden Prüfungstyp und zeigen Sie, was Sie gelernt haben.
          </p>
        </motion.div>

        {/* Statistiken */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                +5.2%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {EXAM_STATS.averageScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Durchschnittsscore</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Rekord</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {EXAM_STATS.bestScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Bester Score</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">{EXAM_STATS.totalExams}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {EXAM_STATS.passRate}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Erfolgsquote</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Ø</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {EXAM_STATS.averageTime}m
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Durchschnittszeit</div>
          </div>
        </motion.div>

        {/* Prüfungstypen */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Prüfungstyp wählen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXAM_TYPES.map((type, index) => (
              <motion.div
                key={type.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  selectedType === type.id ? 'ring-2 ring-blue-500' : ''
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.color}`} />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${type.bgColor}`}>
                      <type.icon className={`w-6 h-6 ${type.textColor}`} />
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      type.difficulty === 'Schwer' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                      type.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {type.difficulty}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {type.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Fragen:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{type.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Zeit:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{type.duration} Min</span>
                    </div>
                  </div>

                  {selectedType === type.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={`/exam/${type.id}`}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-colors bg-gradient-to-r ${type.color} text-white hover:opacity-90`}
                      >
                        <Play className="w-4 h-4" />
                        Prüfung starten
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Letzte Prüfungen & Analyse */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Letzte Prüfungen */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Letzte Prüfungen
              </h2>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-4">
              {RECENT_EXAMS.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${exam.passed ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {exam.score}% ({exam.questions} Fragen)
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(exam.date)} • {exam.time} Min
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    exam.score >= 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    exam.score >= 80 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    exam.score >= 70 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {exam.score >= 90 ? 'Sehr gut' :
                     exam.score >= 80 ? 'Gut' :
                     exam.score >= 70 ? 'Befriedigend' :
                     'Verbesserungsbedarf'}
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/exam/history"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Alle Ergebnisse anzeigen
            </Link>
          </motion.div>

          {/* Stärken & Schwächen Analyse */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Leistungsanalyse
              </h2>
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Stärkster Bereich</span>
                </div>
                <div className="ml-7">
                  <div className="font-medium text-green-600 dark:text-green-400">
                    {EXAM_STATS.strongestChapter}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Durchschnitt: 94% richtig
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Verbesserungsbedarf</span>
                </div>
                <div className="ml-7">
                  <div className="font-medium text-orange-600 dark:text-orange-400">
                    {EXAM_STATS.weakestChapter}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Durchschnitt: 73% richtig
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{EXAM_STATS.totalQuestions}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Bearbeitete Fragen</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{EXAM_STATS.passRate}%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Erfolgsquote</div>
                  </div>
                </div>
              </div>

              <Link
                href="/learn/kaufmaennisch"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-xl hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Schwaches Kapitel üben
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
