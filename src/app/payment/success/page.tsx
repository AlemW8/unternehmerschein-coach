'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Simulate checking payment status
    setTimeout(() => {
      setLoading(false)
      // In production: fetch session details from Stripe
    }, 2000)
  }, [sessionId])

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

          {/* Email Notification */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-2">
              Wir haben dir eine Email gesendet!
            </p>
            <p className="text-gray-600 text-sm">
              Du findest deine Login-Daten in deinem Posteingang. Prüfe auch deinen 
              Spam-Ordner, falls die Email nicht ankommt.
            </p>
          </div>

          {/* What's Next */}
          <div className="text-left bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-center">Was passiert jetzt?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <p className="text-gray-700">
                  <strong>Email prüfen:</strong> Du erhältst deine Login-Daten per Email
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <p className="text-gray-700">
                  <strong>Einloggen:</strong> Melde dich mit deinen Daten an
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <p className="text-gray-700">
                  <strong>Loslegen:</strong> Starte mit dem Lernen - alle Inhalte sind freigeschaltet!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/signin"
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Zum Login
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
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
