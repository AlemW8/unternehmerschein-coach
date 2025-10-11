'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogIn, Eye, EyeOff, Loader2, ArrowRight, Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'

export default function SignInPage() {
  const router = useRouter()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔑 Attempting login...')
      
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        console.log('✅ Login successful')
        alert('✅ Login erfolgreich! Sie werden weitergeleitet...')
        router.push('/learn')
      } else {
        console.log('❌ Login failed:', result.error)
        setError(result.error || 'Login fehlgeschlagen')
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      setError('Unerwarteter Fehler beim Login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <LogIn className="w-10 h-10 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Anmelden
            </h1>
            <p className="text-gray-600">
              Melden Sie sich in Ihrem FahrGewerbe Account an
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="max@beispiel.de"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ihr Passwort"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Anmelden...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Anmelden
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Noch kein Account? Jetzt registrieren
            </Link>
            
            <div className="text-sm text-gray-500">
              <Link
                href="/auth/change-password"
                className="text-blue-600 hover:text-blue-700"
              >
                Passwort vergessen?
              </Link>
            </div>
          </div>

          {/* Test Data */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium mb-2">
              🧪 Test-Daten (für Entwicklung):
            </p>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>
                <span className="font-mono">test@example.com</span> / <span className="font-mono">test123</span>
              </p>
              <p className="text-xs">
                (Falls noch kein Account vorhanden, wird automatisch erstellt)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="font-bold text-center mb-4">Nach dem Login erwarten Sie:</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              '✅ 255 Prüfungsfragen',
              '✅ 9 Themenbereiche',
              '✅ Flashcards',
              '✅ Multiple-Choice Quiz',
              '✅ Prüfungssimulator',
              '✅ Fortschrittstracking',
              '✅ Mobile optimiert',
              '✅ Offline verfügbar',
            ].map((feature, i) => (
              <div key={i} className="text-gray-700 text-sm">
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
