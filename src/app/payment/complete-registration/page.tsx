'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Eye, 
  EyeOff,
  Loader2,
  Shield,
  Sparkles,
  ArrowRight
} from 'lucide-react'

function RegistrationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [sessionData, setSessionData] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  })

  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  // Verify Stripe Session
  useEffect(() => {
    if (!sessionId) {
      setError('Keine gültige Session gefunden')
      setVerifying(false)
      return
    }

    fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSessionData(data)
          setFormData(prev => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
          }))
          setVerifying(false)
          setLoading(false)
        } else {
          setError(data.error || 'Zahlung konnte nicht verifiziert werden')
          setVerifying(false)
          setLoading(false)
        }
      })
      .catch(err => {
        setError('Fehler beim Verifizieren der Zahlung')
        setVerifying(false)
        setLoading(false)
      })
  }, [sessionId])

  // Password Strength Check
  useEffect(() => {
    const password = formData.password
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    })
  }, [formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwörter stimmen nicht überein')
      return
    }

    const strengthChecks = Object.values(passwordStrength)
    if (strengthChecks.filter(Boolean).length < 4) {
      setError('Passwort erfüllt nicht die Mindestanforderungen')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/auth/complete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sessionId,
          stripeCustomerId: sessionData?.customerId,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Store user data
        localStorage.setItem('auth_user', JSON.stringify(result.user))
        document.cookie = `auth_token=${result.token}; path=/; max-age=2592000`
        
        // Redirect to dashboard
        router.push('/learn?welcome=true')
      } else {
        setError(result.error || 'Registrierung fehlgeschlagen')
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten')
    } finally {
      setSubmitting(false)
    }
  }

  const isPasswordValid = Object.values(passwordStrength).filter(Boolean).length >= 4

  // Loading state
  if (loading || verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md w-full border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <Loader2 className="w-16 h-16 text-blue-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Zahlung wird verifiziert...</h2>
          <p className="text-gray-600">Einen Moment bitte</p>
        </motion.div>
      </div>
    )
  }

  // Error state
  if (error && !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-red-100"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              ❌
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fehler aufgetreten</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Zurück zur Preisübersicht
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
          >
            🎉 Zahlung erfolgreich!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-600 text-lg mb-8"
          >
            Vielen Dank für Ihren Kauf. Vervollständigen Sie jetzt Ihre Registrierung.
          </motion.p>

          {/* Order Summary */}
          {sessionData && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Ihre Bestellung</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-bold text-gray-800 capitalize">{sessionData.plan || 'Jährlich'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Betrag:</span>
                  <span className="font-bold text-green-600 text-lg">
                    {sessionData.amount ? `${(sessionData.amount / 100).toFixed(2)} EUR` : '1.99 EUR'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Registration Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Konto erstellen
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                  placeholder="Ihr vollständiger Name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                  placeholder="ihre.email@example.com"
                />
                <p className="text-xs text-gray-500">Diese E-Mail wurde bei der Zahlung verwendet</p>
              </motion.div>

              {/* Phone Field */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                  placeholder="+49 123 456789"
                />
              </motion.div>

              {/* Company Field */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Firma (optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                  placeholder="Ihr Firmenname"
                />
              </motion.div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Password Field */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Passwort *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                    placeholder="Mindestens 8 Zeichen"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Passwort bestätigen *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                    placeholder="Passwort wiederholen"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 1.8 }}
                className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
              >
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Passwort-Stärke
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'hasMinLength', label: 'Mindestens 8 Zeichen', check: passwordStrength.hasMinLength },
                    { key: 'hasUpperCase', label: 'Großbuchstabe', check: passwordStrength.hasUpperCase },
                    { key: 'hasLowerCase', label: 'Kleinbuchstabe', check: passwordStrength.hasLowerCase },
                    { key: 'hasNumber', label: 'Zahl', check: passwordStrength.hasNumber },
                    { key: 'hasSpecialChar', label: 'Sonderzeichen', check: passwordStrength.hasSpecialChar },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.9 + index * 0.1 }}
                      className={`flex items-center gap-2 ${item.check ? 'text-green-600' : 'text-gray-400'}`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.check ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {item.check ? '✓' : '○'}
                      </div>
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-4"
                >
                  <p className="text-red-700 text-sm font-medium">❌ {error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              type="submit"
              disabled={submitting || !isPasswordValid}
              className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                submitting || !isPasswordValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Konto wird erstellt...
                </>
              ) : (
                <>
                  <User className="w-6 h-6" />
                  Konto erstellen
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default function CompleteRegistration() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <RegistrationForm />
    </Suspense>
  )
}
