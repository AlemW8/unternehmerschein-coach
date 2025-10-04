'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield, Settings } from 'lucide-react'

interface CookieConsentProps {
  onAccept?: () => void
  onDecline?: () => void
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Prüfe ob Cookie-Consent bereits erteilt wurde
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Zeige Banner nach kurzer Verzögerung
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-analytics', 'true')
    localStorage.setItem('cookie-marketing', 'true')
    setIsVisible(false)
    onAccept?.()
  }

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential-only')
    localStorage.setItem('cookie-analytics', 'false')
    localStorage.setItem('cookie-marketing', 'false')
    setIsVisible(false)
    onDecline?.()
  }

  const handleCustomSettings = (analytics: boolean, marketing: boolean) => {
    localStorage.setItem('cookie-consent', 'custom')
    localStorage.setItem('cookie-analytics', analytics.toString())
    localStorage.setItem('cookie-marketing', marketing.toString())
    setIsVisible(false)
    if (analytics || marketing) {
      onAccept?.()
    } else {
      onDecline?.()
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {!showDetails ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    🍪 Wir respektieren Ihre Privatsphäre
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Wir verwenden Cookies, um Ihnen die beste Lernerfahrung zu bieten. 
                    Technisch notwendige Cookies sind für die Funktionalität erforderlich.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Einstellungen
                </button>
                <button
                  onClick={handleAcceptEssential}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Nur Notwendige
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          ) : (
            <CookieSettings 
              onSave={handleCustomSettings}
              onBack={() => setShowDetails(false)}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

interface CookieSettingsProps {
  onSave: (analytics: boolean, marketing: boolean) => void
  onBack: () => void
}

function CookieSettings({ onSave, onBack }: CookieSettingsProps) {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const handleSave = () => {
    onSave(analytics, marketing)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Cookie-Einstellungen
        </h3>
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Notwendige Cookies */}
        <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-gray-900 dark:text-white">
                Notwendige Cookies
              </h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Erforderlich für Login, Lernfortschritt und grundlegende Funktionen.
            </p>
          </div>
          <div className="flex items-center ml-4">
            <span className="text-sm text-green-600 font-medium">Immer aktiv</span>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Analyse-Cookies
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Helfen uns zu verstehen, wie Sie unsere App nutzen, um sie zu verbessern.
            </p>
          </div>
          <div className="flex items-center ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Marketing Cookies */}
        <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Marketing-Cookies
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ermöglichen personalisierte Werbung und Inhalte basierend auf Ihren Interessen.
            </p>
          </div>
          <div className="flex items-center ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <button
          onClick={() => onSave(false, false)}
          className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Nur Notwendige
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Auswahl speichern
        </button>
        <button
          onClick={() => onSave(true, true)}
          className="flex-1 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Alle akzeptieren
        </button>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
        Weitere Informationen in unserer{' '}
        <a href="/datenschutz" className="text-blue-600 hover:text-blue-800 underline">
          Datenschutzerklärung
        </a>
      </div>
    </div>
  )
}
