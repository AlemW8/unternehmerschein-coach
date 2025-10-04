'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  LogOut, 
  Settings, 
  Crown, 
  Menu, 
  X,
  BookOpen,
  Trophy,
  BarChart3,
  Globe
} from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'

export function Navbar() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleSignOut = () => {
    signOut()
    setShowUserMenu(false)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Modern FahrGewerbe Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Custom FahrGewerbe Logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute top-1 left-1 w-3 h-3 bg-white/20 rounded-full blur-sm"></div>
                
                {/* FP Text with 3D effect */}
                <motion.span 
                  className="relative text-white font-black text-lg tracking-tighter z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(145deg, #ffffff, #e2e8f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  FP
                </motion.span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                FahrGewerbe
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 -mt-1 group-hover:text-blue-500 transition-colors">
                3D Driving School
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/learn" 
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                  >
                    <BookOpen className="w-4 h-4" />
                    Lernen
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/exam" 
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200"
                  >
                    <Trophy className="w-4 h-4" />
                    Prüfung
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Profil
                  </Link>
                </motion.div>
              </>
            ) : (
              <div className="flex items-center space-x-1">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/learn" 
                    className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
                  >
                    Lernen
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/pricing" 
                    className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
                  >
                    Preise
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/auth/signin" 
                    className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
                  >
                    Anmelden
                  </Link>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95 }}
                  className="ml-4"
                >
                  <Link 
                    href="/pricing" 
                    className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                    
                    {/* Content */}
                    <span className="relative z-10">Jetzt starten</span>
                    <motion.div
                      className="relative z-10"
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* User Menu & Mobile Button */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {isLoading ? (
              <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {user.name || 'Benutzer'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-yellow-500" />
                      {user.plan} {!user.isActive && user.plan !== 'free' && '(Inaktiv)'}
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Crown className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            {user.plan} Plan {!user.isActive && user.plan !== 'free' && '(Inaktiv)'}
                          </span>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Abmelden
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:block">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pricing"
                    className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                    
                    <span className="relative z-10">Jetzt starten</span>
                    <motion.div
                      className="relative z-10"
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <motion.div
                animate={{ rotate: showMobileMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 py-4 space-y-2 relative z-50"
            >
              {isAuthenticated ? (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/learn"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="font-medium">Lernen</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/exam"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Trophy className="w-5 h-5" />
                      <span className="font-medium">Prüfung</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span className="font-medium">Profil</span>
                    </Link>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowMobileMenu(false)
                      handleSignOut()
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Abmelden</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/learn"
                      className="block px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Lernen
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/pricing"
                      className="block px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Preise
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Anmelden
                    </Link>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="px-2 pt-2"
                  >
                    <Link
                      href="/pricing"
                      className="relative block w-full text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg overflow-hidden group"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                      
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Jetzt starten ⚡
                      </span>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
