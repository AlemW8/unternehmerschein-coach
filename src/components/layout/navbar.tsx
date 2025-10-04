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
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* FahrGewerbe Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">FG</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              FahrGewerbe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/learn" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lernen</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/exam" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Prüfung</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profil</span>
                </Link>
              </>
            ) : (
              <Link 
                href="/pricing" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <Crown className="w-4 h-4" />
                <span>Premium</span>
              </Link>
            )}
          </div>

          {/* Right Side - Language & CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || 'Benutzer'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      {user.plan}
                    </div>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  Anmelden
                </Link>
                <Link
                  href="/pricing"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Jetzt starten
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div 
              className="md:hidden border-t border-gray-200 py-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/learn"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <BookOpen className="w-4 h-4" />
                Lernen
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    href="/exam"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Trophy className="w-4 h-4" />
                    Prüfung
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Profil
                  </Link>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false)
                      handleSignOut()
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Crown className="w-4 h-4" />
                    Premium
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="block mx-4 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Anmelden
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
