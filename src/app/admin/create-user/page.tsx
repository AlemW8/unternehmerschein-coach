'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Mail, User, Key, Check, AlertCircle, Copy } from 'lucide-react'
import { db } from '@/lib/db'

export default function CreateUserPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ user: any; tempPassword: string } | null>(null)
  const [error, setError] = useState('')

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !name) {
        throw new Error('Email und Name sind erforderlich')
      }

      if (!email.includes('@')) {
        throw new Error('Ungültige Email-Adresse')
      }

      // Generiere temporäres Passwort
      const tempPassword = generateTempPassword()

      // Erstelle Benutzer
      const newUser = db.createUserWithTempPassword(email, name, tempPassword)
      
      if (!newUser) {
        throw new Error('Benutzer konnte nicht erstellt werden. Email bereits vergeben?')
      }

      setSuccess({ user: newUser, tempPassword })
      setEmail('')
      setName('')

      // Hier würde in der Realität eine Email gesendet werden
      console.log('Login-Daten:', { email, tempPassword })

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const copyLoginData = () => {
    if (success) {
      const loginData = `Email: ${success.user.email}\nTemporäres Passwort: ${success.tempPassword}\n\nLogin-URL: ${window.location.origin}/auth/signin`
      navigator.clipboard.writeText(loginData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Neuen Benutzer erstellen
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Nach der Bezahlung automatisch Login-Daten versenden
            </p>
          </div>

          {!success ? (
            /* Formular */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vollständiger Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Max Mustermann"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email-Adresse
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="max@example.com"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Automatischer Prozess:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Sicheres temporäres Passwort wird generiert</li>
                      <li>• Benutzer muss beim ersten Login das Passwort ändern</li>
                      <li>• Login-Daten werden per Email versendet</li>
                      <li>• Konto ist sofort einsatzbereit</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Benutzer erstellen & Login-Daten senden
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Erfolgsmeldung */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Benutzer erfolgreich erstellt!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Login-Daten wurden generiert und können jetzt versendet werden.
                </p>
              </div>

              {/* Login-Daten */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Login-Daten
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-sm">
                        {success.user.email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(success.user.email)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Temporäres Passwort
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-sm font-mono">
                        {success.tempPassword}
                      </code>
                      <button
                        onClick={() => copyToClipboard(success.tempPassword)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 text-xs">
                    ⚠️ Der Benutzer muss beim ersten Login das Passwort ändern.
                  </p>
                </div>
              </div>

              {/* Aktionen */}
              <div className="flex gap-3">
                <button
                  onClick={copyLoginData}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Alle Daten kopieren
                </button>
                <button
                  onClick={() => {
                    setSuccess(null)
                    setError('')
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  Neuen Benutzer erstellen
                </button>
              </div>

              {/* Login-URL */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Login-URL: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {window.location.origin}/auth/signin
                </code></p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Demo-Hinweis */}
        <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <div className="text-sm text-orange-800 dark:text-orange-200">
              <p className="font-medium">Demo-Modus</p>
              <p>In der Produktionsversion würde hier automatisch eine Email mit den Login-Daten versendet werden.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
