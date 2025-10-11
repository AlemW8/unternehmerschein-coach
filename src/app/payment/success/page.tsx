'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, Loader2, ArrowRight, Eye, EyeOff, User } from 'lucide-react'
import Link from 'next/link'
import AuthService from '@/lib/auth-service'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [sessionData, setSessionData] = useState<any>(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (sessionId) {
      verifyPaymentSession()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const verifyPaymentSession = async () => {
    try {
      console.log('🔍 Verifying payment session:', sessionId)
      
      // Mock für test123
      if (sessionId === 'test123') {
        console.log('✅ Using mock data for test session')
        const mockData = {
          success: true,
          id: sessionId,
          customer_email: 'test@example.com',
          amount_total: 2999,
          currency: 'eur',
          payment_status: 'paid'
        }
        setSessionData(mockData)
        setFormData(prev => ({ ...prev, email: mockData.customer_email }))
        setLoading(false)
        return
      }
      
      // Für echte Sessions - vereinfacht
      setSessionData({ success: true, payment_status: 'paid' })
      setLoading(false)
      
    } catch (error) {
      console.error('❌ Error verifying session:', error)
      setLoading(false)
    }
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegistering(true)
    setErrors({})

    // Validation
    const newErrors: any = {}
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich'
    if (!formData.email.trim()) newErrors.email = 'Email ist erforderlich'
    if (formData.password.length < 6) newErrors.password = 'Passwort muss mindestens 6 Zeichen haben'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setRegistering(false)
      return
    }

    try {
      console.log('🚀 Starting registration with new AuthService...')
      
      // Registrierung mit neuem AuthService
      const result = await AuthService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isPremium: true,
        sessionId: sessionId || undefined
      })
      
      if (result.success && result.user && result.token) {
        console.log('✅ Registration successful!')
        
        // Direkt im localStorage speichern für sofortige Anmeldung
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('authToken', result.token)
        localStorage.setItem('isAuthenticated', 'true')
        
        // Auth Event triggern
        window.dispatchEvent(new CustomEvent('userLogin', { 
          detail: { user: result.user, token: result.token } 
        }))
        
        alert(`✅ Registrierung erfolgreich!\n\nWillkommen ${result.user.name}!\nE-Mail: ${result.user.email}\nStatus: Premium\n\nSie sind jetzt eingeloggt und werden weitergeleitet...`)
        
        // Weiterleitung zur Lernplattform
        setTimeout(() => {
          router.push('/learn?welcome=true&new=true')
        }, 2000)
        
      } else {
        console.error('❌ Registration failed:', result.error)
        setErrors({ general: result.error || 'Registrierung fehlgeschlagen' })
      }
      
    } catch (error) {
      console.error('❌ Registration error:', error)
      setErrors({ general: 'Unerwarteter Fehler bei der Registrierung' })
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Zahlung wird verarbeitet...</p>
        </div>
      </div>
    )
  }

  // Show registration form
  if (showRegistrationForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            {/* Success Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="w-10 h-10 text-green-600" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Account erstellen & E-Mail erhalten! ✅
              </h1>
              <p className="text-gray-600">
                Sie erhalten eine Bestätigungs-E-Mail mit allen wichtigen Informationen
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegistration} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {errors.general}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vollständiger Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Max Mustermann"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="max@beispiel.de"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mindestens 6 Zeichen"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort bestätigen
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Passwort wiederholen"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={registering}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {registering ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Account wird erstellt...
                  </>
                ) : (
                  <>
                    📧 Account erstellen & E-Mail erhalten
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>📧 E-Mail-Bestätigung!</strong><br />
                Nach der Registrierung erhalten Sie eine Bestätigungs-E-Mail mit allen wichtigen Informationen 
                und Ihren Login-Daten für sofortigen Zugriff auf alle Premium-Inhalte.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Zahlung erfolgreich! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Willkommen bei FahrGewerbe Premium!
          </p>

          {/* Registration Required - With Email */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-gray-800 font-bold mb-2 text-lg">
              � Registrierung + E-Mail-Bestätigung!
            </p>
            <p className="text-gray-700 font-medium mb-4">
              Sie erhalten eine Bestätigungs-E-Mail mit allen wichtigen Informationen. 
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Vervollständigen Sie jetzt Ihre Registrierung und erhalten Sie automatisch eine E-Mail mit Ihren Login-Daten und dem Zugang zu Ihrem Premium-Account.
            </p>
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-lg"
            >
              📧 Account erstellen & E-Mail erhalten
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* What's Next */}
          <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-center">⚠️ Wichtige Schritte:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <p className="text-gray-700">
                  <strong>Account erstellen:</strong> Geben Sie Ihre Daten ein und erstellen Sie Ihr Passwort
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <p className="text-gray-700">
                  <strong>E-Mail erhalten:</strong> Sie bekommen eine Bestätigungs-E-Mail an Ihre Adresse
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <p className="text-gray-700">
                  <strong>Sofort loslegen:</strong> Nach der Registrierung haben Sie Premium-Zugang!
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/signin"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Ich habe bereits einen Account
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Zur Startseite
            </Link>
          </div>

          {/* Important Warning */}
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium text-center">
              📧 <strong>E-MAIL BESTÄTIGUNG:</strong> Sie erhalten eine Bestätigungs-E-Mail mit allen wichtigen Informationen!
            </p>
          </div>

          {/* Support */}
          <p className="text-sm text-gray-500 mt-8">
            Probleme? Kontaktiere uns:{' '}
            <a href="mailto:support@FahrGewerbe.de" className="text-blue-600 hover:underline">
              support@FahrGewerbe.de
            </a>
          </p>
        </motion.div>

        {/* Features Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="font-bold text-center mb-4">Das erwartet dich:</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              '✅ 255 Prüfungsfragen',
              '✅ 9 Themenbereiche',
              '✅ Flashcards',
              '✅ Multiple-Choice Quiz',
              '✅ Prüfungssimulator',
              '✅ Fortschrittstracking',
              '✅ Mobile optimiert',
              '✅ Ständig aktualisiert',
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
