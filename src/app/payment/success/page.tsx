'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, Loader2, ArrowRight, Eye, EyeOff, User } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

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
      // In production, verify with Stripe API
      const response = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setSessionData(data)
        if (data.customer_email) {
          setFormData(prev => ({ ...prev, email: data.customer_email }))
        }
      }
    } catch (error) {
      console.error('Error verifying session:', error)
    } finally {
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
      // Register user with premium status
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isPremium: true,
          sessionId
        })
      })

      const result = await response.json()

      if (result.success) {
        // Auto-login after registration
        const loginResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (loginResult?.ok) {
          router.push('/learn?welcome=true')
        } else {
          router.push('/auth/signin?message=registration-complete')
        }
      } else {
        setErrors({ general: result.error || 'Ein Fehler ist aufgetreten' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Ein Fehler ist aufgetreten' })
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
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Zahlung erfolgreich! 🎉
              </h1>
              <p className="text-gray-600">
                Vervollständigen Sie jetzt Ihre Registrierung
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {registering ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registrierung wird abgeschlossen...
                  </>
                ) : (
                  <>
                    Registrierung abschließen
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>✅ Premium-Zugang aktiviert!</strong><br />
                Nach der Registrierung haben Sie sofort Zugriff auf alle Premium-Inhalte.
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

          {/* Registration Call to Action */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <User className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-4">
              Vervollständigen Sie jetzt Ihre Registrierung
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Erstellen Sie Ihr Konto, um sofort mit dem Lernen zu beginnen. 
              Sie erhalten automatisch Premium-Zugang zu allen Inhalten.
            </p>
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              Jetzt registrieren
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* What's Next */}
          <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-center">Was passiert jetzt?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <p className="text-gray-700">
                  <strong>Registrierung:</strong> Vervollständigen Sie Ihre Anmeldung mit Namen und Passwort
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <p className="text-gray-700">
                  <strong>Automatischer Login:</strong> Sie werden automatisch angemeldet
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <p className="text-gray-700">
                  <strong>Loslegen:</strong> Starten Sie sofort mit dem Premium-Lerncontent!
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
              Ich habe bereits ein Konto
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Zur Startseite
            </Link>
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
