'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, 
  Trophy, 
  Calendar, 
  Clock,
  TrendingUp,
  Flame,
  Target,
  BookOpen,
  CheckCircle,
  Star,
  Award,
  BarChart3,
  Activity,
  Zap,
  Brain,
  LogOut
} from 'lucide-react'
import { db, type User as UserType } from '@/lib/db'

const ACHIEVEMENTS = [
  { id: 'first_steps', name: 'Erste Schritte', description: '10 Fragen beantwortet', icon: '🎯', requiredQuestions: 10 },
  { id: 'streak_7', name: 'Fleißbienchen', description: '7 Tage Lernstreak', icon: '🔥', requiredStreak: 7 },
  { id: 'pbefg_master', name: 'PBefG Meister', description: 'PBefG Kapitel abgeschlossen', icon: '📋', requiredChapter: 'PBefG' },
  { id: 'speed_demon', name: 'Schnelldenker', description: 'Prüfung in unter 30 Min', icon: '⚡', requiredTime: 30 },
  { id: 'perfectionist', name: 'Perfektionist', description: '100% in einer Prüfung', icon: '✨', requiredScore: 100 },
  { id: 'marathon', name: 'Marathon-Läufer', description: '30 Tage Lernstreak', icon: '🏃‍♂️', requiredStreak: 30 },
  { id: 'all_knowing', name: 'Allwissend', description: 'Alle Kapitel abgeschlossen', icon: '🧠', requiredAllChapters: true },
  { id: 'exam_pro', name: 'Prüfungsprofi', description: '10 Prüfungen bestanden', icon: '🏆', requiredExams: 10 }
]

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats'>('overview')
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  useEffect(() => {
    const user = db.getCurrentUser()
    if (!user) {
      router.push('/')
    } else {
      setCurrentUser(user)
    }
  }, [router])

  const handleLogout = () => {
    db.logout()
    router.push('/')
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Lade Profil...</p>
        </div>
      </div>
    )
  }

  const completedChapters = currentUser.chapterProgress.filter(ch => ch.progress === 100).length
  const totalChapters = currentUser.chapterProgress.length
  const totalWeeklyMinutes = currentUser.recentActivity.reduce((sum, day) => sum + day.minutes, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto shadow-lg">
              {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {currentUser.stats.level}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentUser.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{currentUser.email}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            Mitglied seit {formatDate(currentUser.createdAt)}
          </div>
          
          {/* Logout Button */}
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </button>
          </div>
        </motion.div>

        {/* XP Progress */}
        <motion.div 
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Level {currentUser.stats.level}</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{currentUser.stats.xp} XP</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${currentUser.stats.xp > 0 ? (currentUser.stats.xp / (currentUser.stats.xp + currentUser.stats.xpToNextLevel)) * 100 : 0}%` }}
              />
            </div>
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              {currentUser.stats.xpToNextLevel} XP bis Level {currentUser.stats.level + 1}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.currentStreak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Tage Streak</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(currentUser.stats.totalLearningTime)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Gelernt</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentUser.stats.totalQuestions > 0 ? Math.round((currentUser.stats.correctAnswers / currentUser.stats.totalQuestions) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Genauigkeit</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedChapters}/{totalChapters}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Kapitel</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg">
            {(['overview', 'achievements', 'stats'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab === 'overview' && 'Übersicht'}
                {tab === 'achievements' && 'Erfolge'}
                {tab === 'stats' && 'Statistiken'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Kapitel Fortschritt */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Kapitel-Fortschritt
                </h2>
                <div className="space-y-4">
                  {currentUser.chapterProgress.map((chapter, index) => (
                    <div key={chapter.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{chapter.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {chapter.completed}/{chapter.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            chapter.progress === 100 ? 'bg-green-500' :
                            chapter.progress >= 75 ? 'bg-blue-500' :
                            chapter.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${chapter.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wöchentliche Aktivität */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Diese Woche
                </h2>
                <div className="space-y-4">
                  {currentUser.recentActivity.map((day, index) => {
                    const dayName = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][new Date(day.date).getDay()]
                    return (
                      <div key={day.date} className="flex items-center gap-4">
                        <div className="w-8 text-center font-medium text-gray-600 dark:text-gray-300">
                          {dayName}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-300">{formatTime(day.minutes)}</span>
                            <span className="text-gray-500 dark:text-gray-400">{day.questions} Fragen</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${day.minutes > 0 ? Math.min((day.minutes / 60) * 100, 100) : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatTime(totalWeeklyMinutes)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Gesamte Lernzeit</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ACHIEVEMENTS.map((achievement) => {
                  const isUnlocked = currentUser.achievements.some(a => a.id === achievement.id)
                  return (
                    <div
                      key={achievement.id}
                      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transition-all duration-300 ${
                        isUnlocked 
                          ? 'hover:scale-105' 
                          : 'opacity-60 grayscale'
                      }`}
                    >
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h3 className={`font-bold text-lg mb-2 ${
                        isUnlocked 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {achievement.description}
                      </p>
                      {isUnlocked && (
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Erreicht!
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Detaillierte Statistiken */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Lernstatistiken
                  </h2>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Fragen beantwortet</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Insgesamt</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{currentUser.stats.totalQuestions}</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Richtige Antworten</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Von allen Versuchen</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{currentUser.stats.correctAnswers}</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Falsche Antworten</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Zum Lernen</div>
                      </div>
                      <div className="text-2xl font-bold text-red-600">{currentUser.stats.wrongAnswers}</div>
                    </div>
                  </div>
                </div>

                {/* Beste Leistungen */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Ihre Erfolge
                  </h2>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Längster Streak</div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">Tage in Folge</div>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">{currentUser.stats.longestStreak}</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Abgeschlossene Prüfungen</div>
                        <div className="text-sm text-green-600 dark:text-green-400">Erfolgreich bestanden</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{currentUser.stats.completedExams}</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Gesammelte Punkte</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">XP insgesamt</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{currentUser.stats.totalPoints}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}