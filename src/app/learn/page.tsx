'use client'

import { useState, useEffect, Suspense } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpen, 
  Brain, 
  Target, 
  Zap, 
  Clock, 
  Trophy,
  Search,
  Filter,
  RotateCcw,
  Play,
  CheckCircle,
  Circle,
  TrendingUp,
  Crown,
  Lock,
  PartyPopper
} from 'lucide-react'
import { db } from '@/lib/db'
import { ProgressDashboard } from '@/components/ui/progress-dashboard'

// Mock data basierend auf Ihren Kapiteln - ALLE FRAGEN FREIGESCHALTET!
const KAPITEL = [
  {
    id: 'pbefg',
    name: 'PBefG',
    title: 'Personenbeförderungsgesetz',
    description: 'Grundlagen des Personenbeförderungsgesetzes, Genehmigungen, Taxi- und Mietwagenverkehr',
    questionCount: 70,
    color: 'from-blue-500 to-blue-600',
    icon: '📋',
    progress: 0
  },
  {
    id: 'bokraft',
    name: 'BOKraft',
    title: 'Berufskraftfahrer-Qualifikation',
    description: 'Verordnung über den Betrieb von Kraftfahrunternehmen, Fahrzeugvorschriften, Unternehmerpflichten',
    questionCount: 20,
    color: 'from-green-500 to-green-600',
    icon: '🚛',
    progress: 0
  },
  {
    id: 'strassenverkehrsrecht',
    name: 'Straßenverkehrsrecht',
    title: 'Straßenverkehrsrecht',
    description: 'StVO, StVG, Lenk- und Ruhezeiten, Verkehrssicherheit, Fahrzeugzulassung',
    questionCount: 30,
    color: 'from-red-500 to-red-600',
    icon: '🚦',
    progress: 0
  },
  {
    id: 'umweltschutz',
    name: 'Umweltschutz',
    title: 'Umweltschutz',
    description: 'Umweltzonen, Abgasnormen, umweltfreundliche Fahrweise, Entsorgung',
    questionCount: 25,
    color: 'from-emerald-500 to-emerald-600',
    icon: '🌱',
    progress: 0
  },
  {
    id: 'versicherungen',
    name: 'Versicherungen',
    title: 'Versicherungsrecht',
    description: 'Kfz-Haftpflicht, Kasko, Betriebshaftpflicht, Rechtsschutz',
    questionCount: 25,
    color: 'from-purple-500 to-purple-600',
    icon: '🛡️',
    progress: 0
  },
  {
    id: 'kaufmaennische-verwaltung',
    name: 'Kaufmännische Verwaltung',
    title: 'Kaufmännische Verwaltung',
    description: 'Buchhaltung, Steuern, Arbeitsrecht, Kostenrechnung, Kalkulation',
    questionCount: 25,
    color: 'from-orange-500 to-orange-600',
    icon: '💼',
    progress: 0
  },
  {
    id: 'grenzverkehr',
    name: 'Grenzverkehr',
    title: 'Grenzüberschreitender Verkehr',
    description: 'Internationale Fahrten, Genehmigungen, Cabotage, Versicherungsschutz',
    questionCount: 20,
    color: 'from-indigo-500 to-indigo-600',
    icon: '🌍',
    progress: 0
  },
  {
    id: 'kalkulation',
    name: 'Kalkulation',
    title: 'Kalkulationsbeispiele',
    description: 'Kostenberechnung, Preiskalkulation, Fahrtkosten, Personalkosten',
    questionCount: 25,
    color: 'from-teal-500 to-teal-600',
    icon: '📊',
    progress: 0
  },
  {
    id: 'verbaende-zentralen',
    name: 'Verbände & Zentralen',
    title: 'Verbände & Zentralen',
    description: 'Taxiverbände, Funkzentralen, Organisation des Taxigewerbes',
    questionCount: 15,
    color: 'from-pink-500 to-pink-600',
    icon: '🏢',
    progress: 0
  }
]

const LERNMODI = [
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: '3D-Karten mit Frage und Antwort',
    icon: RotateCcw,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 'multiple-choice',
    name: 'Multiple Choice',
    description: 'Auswahl aus 4 Antworten',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 'adaptive',
    name: 'Adaptiv',
    description: 'KI-gestützte Wiederholung',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    id: 'cram',
    name: 'Cram-Modus',
    description: 'Schnelles Durchgehen',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
  }
]

// Wrapper component for search params
function LearnPageContent() {
  const { user, isAuthenticated } = useAuth()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'started' | 'completed'>('all')
  const [selectedKapitel, setSelectedKapitel] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [chaptersWithProgress, setChaptersWithProgress] = useState(KAPITEL)
  const [showWelcome, setShowWelcome] = useState(false)

  // Check for welcome parameter
  const isWelcome = searchParams?.get('welcome') === 'true'

  // Prüfe ob User eingeloggt ist
  const currentLoggedUser = user
  const userPlan = currentLoggedUser?.plan || 'free'
  const isAdmin = currentLoggedUser?.role === 'ADMIN'
  const isPremium = ['premium', 'pro', 'admin'].includes(userPlan.toLowerCase())
  const hasAccess = isPremium || isAdmin  // NUR PREMIUM, NICHT alle eingeloggten User!

  useEffect(() => {
    if (isWelcome && isPremium) {
      setShowWelcome(true)
      // Auto-hide welcome message after 10 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isWelcome, isPremium])

  useEffect(() => {
    setCurrentUser(currentLoggedUser)
    
    // Lade Progress aus localStorage
    const savedProgress = localStorage.getItem('learning_progress')
    let progressData: Record<string, number> = {}
    
    if (savedProgress) {
      try {
        progressData = JSON.parse(savedProgress)
      } catch (e) {
        console.error('Error parsing progress:', e)
      }
    }
    
    // Kapitel mit Progress - ALLE FREIGESCHALTET!
    const updatedChapters = KAPITEL.map((kapitel, index) => {
      const progress = progressData[kapitel.id] || 0
      
      return {
        ...kapitel,
        progress,
        isLocked: false  // ALLE KAPITEL IMMER FREIGESCHALTET!
      }
    })
    
    setChaptersWithProgress(updatedChapters)
  }, [currentLoggedUser, isPremium])

  const filteredKapitel = chaptersWithProgress.filter(kapitel => {
    const matchesSearch = kapitel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kapitel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kapitel.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'started' && kapitel.progress > 0 && kapitel.progress < 100) ||
                         (selectedFilter === 'completed' && kapitel.progress === 100)
    
    return matchesSearch && matchesFilter
  })

  const totalProgress = Math.round(chaptersWithProgress.reduce((sum, k) => sum + k.progress, 0) / chaptersWithProgress.length)
  const completedChapters = chaptersWithProgress.filter(k => k.progress === 100).length
  const totalQuestions = chaptersWithProgress.reduce((sum, k) => sum + k.questionCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message for New Premium Users */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mb-8 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <PartyPopper className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Willkommen bei Premium! 🎉
                  </h3>
                  <p className="text-green-100">
                    Ihre Zahlung war erfolgreich - alle Inhalte sind jetzt freigeschaltet!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-white/80 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Lernbereich
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Wählen Sie ein Kapitel und einen Lernmodus aus. Mit verschiedenen Methoden 
            meistern Sie alle Inhalte des Unternehmerscheins.
          </p>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalProgress}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Gesamtfortschritt</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{completedChapters}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Abgeschlossene Kapitel</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalQuestions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Verfügbare Fragen</div>
            </div>
          </div>
        </motion.div>

        {/* Progress Dashboard */}
        {isAuthenticated && (
          <ProgressDashboard className="mb-12" />
        )}

        {/* Search and Filter */}
        <motion.div 
          className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Kapitel suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'started', 'completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {filter === 'all' && 'Alle'}
                {filter === 'started' && 'Begonnen'}
                {filter === 'completed' && 'Abgeschlossen'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Kapitel Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredKapitel.map((kapitel, index) => (
            <motion.div
              key={kapitel.id}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                selectedKapitel === kapitel.id ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-blue-300 hover:shadow-2xl'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.2 }
              }}
              onClick={() => setSelectedKapitel(selectedKapitel === kapitel.id ? null : kapitel.id)}
            >
              {/* ALLE KAPITEL FREIGESCHALTET - KEIN LOCK! */}
              {/* Enhanced Progress Bar */}
              <div className="absolute top-0 left-0 h-2 bg-gray-100 dark:bg-gray-700 w-full rounded-t-3xl overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${kapitel.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${kapitel.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>

              <div className="p-6 pt-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="text-4xl p-3 rounded-2xl bg-gray-50 dark:bg-gray-700"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {kapitel.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                        {kapitel.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {kapitel.questionCount} Fragen
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div 
                      className="text-2xl font-black text-gray-900 dark:text-white"
                      key={kapitel.progress}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {kapitel.progress}%
                    </motion.div>
                    <div className="w-6 h-6 mt-1">
                      {kapitel.progress === 100 ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : kapitel.progress > 0 ? (
                        <Circle className="w-6 h-6 text-blue-500 fill-current opacity-20" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {kapitel.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {kapitel.description}
                </p>

                {/* Enhanced Lernmodi für ausgewähltes Kapitel */}
                {selectedKapitel === kapitel.id && (
                  <motion.div
                    className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Lernmodi wählen:
                    </h5>
                    <div className="space-y-3">
                      {LERNMODI.map((modus, modusIndex) => {
                        // NUR PREMIUM USERS HABEN ZUGANG!
                        const hasModusAccess = hasAccess || isAdmin
                        const href = hasModusAccess ? `/learn/${kapitel.id}/${modus.id}` : '/pricing'

                        return (
                          <motion.div
                            key={modus.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: modusIndex * 0.1 }}
                          >
                            <Link
                              href={href}
                              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group border-2 ${
                                hasModusAccess 
                                  ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:shadow-md' 
                                  : 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <motion.div 
                                className={`p-3 rounded-xl ${modus.bgColor}`}
                                whileHover={hasModusAccess ? { scale: 1.1 } : {}}
                                transition={{ duration: 0.2 }}
                              >
                                <modus.icon className={`w-5 h-5 ${modus.color}`} />
                              </motion.div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                                  {modus.name} 
                                  {hasModusAccess ? (
                                    <span className="text-green-500 text-xs">✅</span>
                                  ) : (
                                    <span className="text-orange-500 text-xs">🔒</span>
                                  )}
                                </div>
                                <div className={`text-xs mt-1 ${
                                  hasModusAccess 
                                    ? 'text-green-600 dark:text-green-400' 
                                    : 'text-orange-500 dark:text-orange-400'
                                }`}>
                                  {hasModusAccess ? 'Verfügbar - Sofort loslegen!' : '🔒 Premium benötigt'}
                                </div>
                              </div>
                              {hasModusAccess ? (
                                <motion.div
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                </motion.div>
                              ) : (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Schnellzugriff
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href={hasAccess || isAdmin ? "/learn/pbefg/flashcards" : "/pricing"} 
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              <RotateCcw className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  Alle Flashcards {!hasAccess && !isAdmin && '🔒'}{isAdmin && ' 👑'}
                </div>
                <div className={`text-sm ${
                  hasAccess || isAdmin 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-orange-500 dark:text-orange-400'
                }`}>
                  {isAdmin 
                    ? 'Admin-Zugang' 
                    : hasAccess 
                      ? 'Verfügbar' 
                      : 'Premium Feature'
                  }
                </div>
              </div>
            </Link>
            <Link 
              href={hasAccess || isAdmin ? "/exam" : "/pricing"} 
              className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
            >
              <Trophy className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-medium text-green-900 dark:text-green-100">
                  Prüfung {!hasAccess && !isAdmin && '🔒'}{isAdmin && ' 👑'}
                </div>
                <div className={`text-sm ${
                  hasAccess || isAdmin 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-orange-500 dark:text-orange-400'
                }`}>
                  {isAdmin 
                    ? 'Admin-Zugang' 
                    : hasAccess 
                      ? 'Verfügbar' 
                      : 'Premium Feature'
                  }
                </div>
              </div>
            </Link>
            <Link 
              href={hasAccess || isAdmin ? "/learn/pbefg/adaptive" : "/pricing"} 
              className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
            >
              <Clock className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-medium text-purple-900 dark:text-purple-100">
                  Wiederholung {!hasAccess && !isAdmin && '🔒'}{isAdmin && ' 👑'}
                </div>
                <div className={`text-sm ${
                  hasAccess || isAdmin 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-orange-500 dark:text-orange-400'
                }`}>
                  {isAdmin 
                    ? 'Admin-Zugang' 
                    : hasAccess 
                      ? 'Verfügbar' 
                      : 'Premium Feature'
                  }
                </div>
              </div>
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
            >
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <div>
                <div className="font-medium text-orange-900 dark:text-orange-100">Statistiken</div>
                <div className="text-sm text-orange-600 dark:text-orange-300">Fortschritt ansehen</div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Main component with Suspense
export default function LearnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Lernbereich wird geladen...</p>
        </div>
      </div>
    }>
      <LearnPageContent />
    </Suspense>
  )
}
