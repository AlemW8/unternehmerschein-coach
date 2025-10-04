'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Shield, Clock } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  price: string
  period: string
}

export function PaymentModal({ isOpen, onClose, planName, price, period }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    
    // Simuliere Payment-Verarbeitung
    setTimeout(() => {
      setIsProcessing(false)
      alert(`✅ Zahlung erfolgreich!\n\nPlan: ${planName}\nBetrag: €${price}${period}\n\nIhr Account wurde aktiviert. Das echte Payment-System wird bald implementiert.`)
      onClose()
      // Hier würde normalerweise der User-Status aktualisiert
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Plan aktivieren
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plan Details */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {planName} Plan
                </h3>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  €{price}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    {period}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Demo Info */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    Demo-Modus
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Dies ist eine Demonstration. Das echte Payment-System wird bald implementiert. 
                    Verwenden Sie für jetzt den Admin-Login.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>SSL verschlüsselt</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span>Sichere Zahlung</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Sofort aktiv</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verarbeitung...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Jetzt bezahlen
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Mit dem Klick auf "Jetzt bezahlen" akzeptieren Sie unsere AGB und Datenschutzerklärung.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
