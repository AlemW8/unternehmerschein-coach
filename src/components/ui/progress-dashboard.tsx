'use client'

import { motion } from 'framer-motion'
import { useProgressStore } from '@/stores/progress-store'
import { useAuth } from '@/components/providers/auth-provider'
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Clock, 
  Brain, 
  Zap,
  Calendar,
  BarChart3,
  CheckCircle,
  Flame
} from 'lucide-react'

interface ProgressDashboardProps {
  className?: string
}

export function ProgressDashboard({ className = "" }: ProgressDashboardProps) {
  const { stats, sessionStats } = useProgressStore()
  const { user } = useAuth()

  // Calculate session percentage
  const sessionPercentage = sessionStats.questionsReviewed > 0 
    ? Math.round((sessionStats.correctAnswers / sessionStats.questionsReviewed) * 100)
    : 0

  // Calculate overall percentage
  const overallPercentage = stats.studiedQuestions > 0
    ? Math.round((stats.correctAnswers / stats.studiedQuestions) * 100)
    : 0

  // Calculate streak (mock data for now)
  const streak = 5

  const statCards = [
    {
      title: "Session Score",
      value: `${sessionPercentage}%`,
      subtitle: `${sessionStats.correctAnswers}/${sessionStats.questionsReviewed} richtig`,
      icon: Target,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Gesamt Score",
      value: `${overallPercentage}%`,
      subtitle: `${stats.correctAnswers}/${stats.studiedQuestions} Fragen`,
      icon: Trophy,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Lernstreak",
      value: `${streak} Tage`,
      subtitle: "Weiter so! 🔥",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Session Zeit",
      value: formatSessionTime(),
      subtitle: "Heute gelernt",
      icon: Clock,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  function formatSessionTime() {
    const now = new Date()
    const start = sessionStats.startTime
    const diffMs = now.getTime() - start.getTime()
    const minutes = Math.floor(diffMs / 60000)
    
    if (minutes < 1) return "< 1 min"
    if (minutes < 60) return `${minutes} min`
    
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Willkommen zurück, {user?.name || 'Lernender'}! 👋
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Bereit für deine nächste Lernsession? Dein Fortschritt ist beeindruckend!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="text-right"
              >
                <div className="text-2xl font-black text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </motion.div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {stat.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.subtitle}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Lernfortschritt im Detail
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            Letzte 7 Tage
          </div>
        </div>

        {/* Mock Progress Bars */}
        <div className="space-y-4">
          {[
            { day: "Heute", progress: sessionPercentage },
            { day: "Gestern", progress: 85 },
            { day: "Vorgestern", progress: 78 },
            { day: "Mo", progress: 92 },
            { day: "So", progress: 88 },
            { day: "Sa", progress: 91 },
            { day: "Fr", progress: 76 }
          ].map((day, index) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-400">
                {day.day}
              </div>
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${day.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                  className={`h-full rounded-full ${
                    day.progress >= 90 
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : day.progress >= 75
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600'
                  }`}
                />
              </div>
              <div className="w-12 text-sm font-bold text-gray-900 dark:text-white text-right">
                {day.progress}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Empfohlene Aktionen
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
          >
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                Schwächen üben
              </div>
              <div className="text-xs text-gray-500">
                3 Themen identifiziert
              </div>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
          >
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                Wiederholung
              </div>
              <div className="text-xs text-gray-500">
                15 Fragen fällig
              </div>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
          >
            <Trophy className="w-5 h-5 text-yellow-600" />
            <div className="text-left">
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                Prüfungssim.
              </div>
              <div className="text-xs text-gray-500">
                Volltest starten
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
