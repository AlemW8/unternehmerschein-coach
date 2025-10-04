'use client'

import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { motion } from 'framer-motion'
import { CreditCard, X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: 'PREMIUM' | 'PRO'
  userEmail: string
  userName: string
  onPaymentSuccess: (paymentDetails: any) => void
  onPaymentError: (error: any) => void
}

const planPrices = {
  PREMIUM: 19.99,
  PRO: 39.99
}

const planFeatures = {
  PREMIUM: [
    '✅ Alle 255+ Prüfungsfragen',
    '✅ 3D-Animationen',
    '✅ Prüfungssimulation',
    '✅ 7 Sprachen verfügbar',
    '✅ Unbegrenzte Wiederholung',
    '✅ Fortschritt-Tracking'
  ],
  PRO: [
    '✅ Alles von PREMIUM',
    '✅ 1:1 Video-Support',
    '✅ Individuelle Lernpläne',
    '✅ Priority Support',
    '✅ Persönlicher Coach',
    '✅ Garantierte Erfolg oder Geld zurück'
  ]
}

export default function PaymentModal({
  isOpen,
  onClose,
  plan,
  userEmail,
  userName,
  onPaymentSuccess,
  onPaymentError
}: PaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [showSkipOption, setShowSkipOption] = useState(process.env.NEXT_PUBLIC_ENABLE_PAYMENT_SKIP === 'true')

  const price = planPrices[plan]
  const features = planFeatures[plan]

  // PayPal Payment Handler
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price.toString(),
            currency_code: 'EUR'
          },
          description: `${plan} Plan - Unternehmerschein Coach`,
          custom_id: `user_${userEmail}_${Date.now()}`
        }
      ],
      application_context: {
        brand_name: 'Cab&Car - Unternehmerschein Coach',
        locale: 'de-DE',
        user_action: 'PAY_NOW'
      }
    })
  }

  const onApprove = async (data: any, actions: any) => {
    try {
      setPaymentStatus('processing')
      const details = await actions.order.capture()
      
      // Payment erfolgreich
      setPaymentStatus('success')
      onPaymentSuccess({
        orderId: details.id,
        paymentId: details.purchase_units[0].payments.captures[0].id,
        amount: price,
        currency: 'EUR',
        plan,
        userEmail,
        userName,
        timestamp: new Date().toISOString()
      })
      
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setPaymentStatus('error')
      onPaymentError(error)
    }
  }

  const onError = (err: any) => {
    setPaymentStatus('error')
    onPaymentError(err)
  }

  // Skip Payment Handler (nur für Testing)
  const handleSkipPayment = () => {
    if (showSkipOption) {
      setPaymentStatus('processing')
      setTimeout(() => {
        setPaymentStatus('success')
        onPaymentSuccess({
          orderId: 'SKIP_' + Date.now(),
          paymentId: 'SKIPPED_PAYMENT',
          amount: price,
          currency: 'EUR',
          plan,
          userEmail,
          userName,
          timestamp: new Date().toISOString(),
          isSkipped: true
        })
        setTimeout(() => {
          onClose()
        }, 2000)
      }, 1000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {plan} Plan
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                €{price} einmalig
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStatus === 'idle' && (
            <>
              {/* Features List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Was Sie bekommen:
                </h3>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PayPal Buttons */}
              <PayPalScriptProvider 
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "demo_client_id",
                  currency: "EUR",
                  locale: "de_DE"
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "pay"
                  }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              </PayPalScriptProvider>

              {/* Skip Payment Option (nur für Development) */}
              {showSkipOption && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400 mb-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Development Mode</span>
                  </div>
                  <button
                    onClick={handleSkipPayment}
                    className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                  >
                    Payment überspringen (Test)
                  </button>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                🔒 Sichere Zahlung über PayPal<br/>
                30 Tage Geld-zurück-Garantie
              </div>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Zahlung wird verarbeitet...
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bitte warten Sie einen Moment
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-600">
                Zahlung erfolgreich!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Ihr {plan} Account wird jetzt aktiviert...
              </p>
              <div className="text-xs text-gray-400">
                Weiterleitung in 2 Sekunden...
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-600">
                Zahlung fehlgeschlagen
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Bitte versuchen Sie es erneut oder kontaktieren Sie uns
              </p>
              <button
                onClick={() => setPaymentStatus('idle')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Erneut versuchen
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
