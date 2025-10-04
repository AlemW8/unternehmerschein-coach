'use client'

import { useState, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LANGUAGES = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
]

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('de')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') || 'de'
    setCurrentLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode)
    localStorage.setItem('app_language', languageCode)
    setIsOpen(false)
    
    // Event für andere Komponenten dispatchen
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: languageCode } 
    }))
  }

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
          {currentLang.name}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
          >
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 mb-2">
              Sprache / Language
            </div>
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentLanguage === language.code 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1 text-sm font-medium">{language.name}</div>
                {currentLanguage === language.code && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Hook für andere Komponenten um aktuelle Sprache zu bekommen
export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState('de')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') || 'de'
    setCurrentLanguage(savedLanguage)

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language)
    }

    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener)
    }
  }, [])

  return currentLanguage
}

// Funktion um aktuelle Sprache zu bekommen (für Server-Komponenten)
export function getCurrentLanguage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('app_language') || 'de'
  }
  return 'de'
}
