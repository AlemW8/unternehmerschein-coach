'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  BookOpen,
  Trophy,
  BarChart3,
  User,
  LogOut,
  Settings
} from 'lucide-react'
import { db, type User as UserType } from '@/lib/db'
import { LanguageSwitcher } from '@/components/language-switcher'

export function SimpleNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  useEffect(() => {
    const user = db.getCurrentUser()
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    db.logout()
    setCurrentUser(null)
    setShowUserMenu(false)
    window.location.href = '/'
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile-optimiertes modernes Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <motion.div 
              className="relative w-8 h-8 sm:w-10 sm:h-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <motion.span 
                  className="text-white font-black text-xs sm:text-sm tracking-wider"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 8px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  UC
                </motion.span>
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col hidden xs:flex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm sm:text-lg font-black bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 leading-tight">
                Unternehmerschein
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 -mt-0.5">
                Coach
              </span>
            </motion.div>
            {/* Mobile: Kurzer Name */}
            <span className="text-sm font-black bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent xs:hidden">
              UC
            </span>
          </Link>

          {/* Mobile-optimierte Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/learn" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Lernen
            </Link>
            <Link 
              href="/exam" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              Prüfung
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Profil
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Preise
            </Link>
          </div>

          {/* Mobile-optimierte Action Area */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Language Switcher - kompakter */}
            <div className="hidden xs:block">
              <LanguageSwitcher />
            </div>
            
            {currentUser ? (
              /* Mobile-optimierter User Button */
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                    {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-20">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Level {currentUser.stats.level}
                    </div>
                  </div>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Profil
                      </Link>
                      <Link
                        href="/learn"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookOpen className="w-4 h-4" />
                        Weiter lernen
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Abmelden
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Nicht angemeldet */
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Anmelden
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Registrieren
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-2"
            >
              <Link
                href="/learn"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <BookOpen className="w-4 h-4" />
                Lernen
              </Link>
              <Link
                href="/exam"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <Trophy className="w-4 h-4" />
                Prüfung
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <BarChart3 className="w-4 h-4" />
                Profil
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Preise
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser.name}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setShowMobileMenu(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-2"
                    >
                      Abmelden
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Anmelden
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium mt-2"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Registrieren
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close menus */}
      {(showMobileMenu || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowMobileMenu(false)
            setShowUserMenu(false)
          }}
        />
      )}
    </nav>
  )
}
