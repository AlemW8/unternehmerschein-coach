'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function EmailTestPage() {
  const [email, setEmail] = useState('test@example.com')
  const [name, setName] = useState('Test User')
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmail = async () => {
    setTesting(true)
    setResult(null)

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Netzwerk-Fehler',
        details: error.message
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📧 E-Mail System Test
            </h1>
            <p className="text-gray-600">
              Teste ob die E-Mail-Konfiguration funktioniert
            </p>
          </div>

          {/* Test Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test E-Mail-Adresse
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="test@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Test User"
              />
            </div>

            <button
              onClick={testEmail}
              disabled={testing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {testing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Test-E-Mail wird versendet...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Test-E-Mail senden
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg border-2 ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.success ? '✅ E-Mail erfolgreich versendet!' : '❌ E-Mail-Versand fehlgeschlagen'}
                  </p>
                  {result.message && (
                    <p className={`text-sm mt-1 ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.message}
                    </p>
                  )}
                  {result.error && (
                    <p className="text-red-700 text-sm mt-1">
                      <strong>Fehler:</strong> {result.error}
                    </p>
                  )}
                  {result.details && (
                    <details className="mt-2">
                      <summary className="text-sm cursor-pointer text-gray-600">
                        Details anzeigen
                      </summary>
                      <pre className="text-xs mt-2 p-2 bg-gray-100 rounded overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Configuration Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📋 E-Mail Konfiguration:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>SMTP Host:</strong> {process.env.SMTP_HOST || 'smtp.gmail.com'}</p>
              <p><strong>SMTP Port:</strong> {process.env.SMTP_PORT || '587'}</p>
              <p><strong>SMTP User:</strong> {process.env.SMTP_USER ? '✅ Konfiguriert' : '❌ Nicht konfiguriert'}</p>
              <p><strong>SMTP Password:</strong> {process.env.SMTP_PASS ? '✅ Konfiguriert' : '❌ Nicht konfiguriert'}</p>
              <p><strong>From Email:</strong> {process.env.SMTP_FROM || 'noreply@fahrgewerbe.de'}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔧 Setup-Anleitung:</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>1. Erstelle eine .env.local Datei im Projekt-Root</p>
              <p>2. Füge deine SMTP-Konfiguration hinzu:</p>
              <div className="bg-blue-100 p-2 rounded mt-2 font-mono text-xs">
                SMTP_HOST=smtp.gmail.com<br/>
                SMTP_PORT=587<br/>
                SMTP_USER=your-email@gmail.com<br/>
                SMTP_PASS=your-app-password<br/>
                SMTP_FROM=noreply@fahrgewerbe.de
              </div>
              <p>3. Für Gmail: App-Passwort erstellen (nicht normales Passwort)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
