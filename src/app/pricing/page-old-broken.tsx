'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { motion } from 'framer-motion'
import { 
  Check, 
  Zap, 
  Crown, 
  Users,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Headphones,
  Loader2
} from 'lucide-react'

const PLANS = [
  {
    id: 'starter2months',
    name: '2-Monats Start',
    description: 'Einmalig 2 Monate, dann monatlich kündbar',
    price: 5.98,
    originalPrice: 7.98,
    period: 'für 2 Monate',
    popular: true,
    icon: Zap,
    color: 'from-blue-500 to-purple-600',
    badge: '25% RABATT!',
    stripePrice: 'price_1SDjLL6zHGhSUEk1lTgm2fxm', // 2-Month price ID
    features: [
      'Alle 8 Kapitel komplett',
      '255+ Original-Prüfungsfragen',
      'Alle Lernmodi (Flashcards, MC, Adaptiv)',
      'Prüfungssimulation mit Timer',
      'Detaillierte Statistiken',
      'Spaced-Repetition Algorithmus',
      'Offline-Modus (PWA)',
      'Keine Werbung',
      'Export-Funktionen',
      'Nach 2 Monaten monatlich kündbar'
    ],
    limitations: [],
    subtitle: 'Perfekt zum Einstieg - nach 2 Monaten flexibel'
  },
  {
    id: 'yearly',
    name: 'Jahres-Plan',
    description: 'Beste Ersparnis mit Jahresabo',
    price: 19.99,
    originalPrice: 35.88,
    period: 'pro Jahr',
    popular: false,
    icon: Crown,
    color: 'from-green-500 to-teal-600',
    badge: '44% GÜNSTIGER',
    savings: 'Nur 1.67€ pro Monat',
    stripePrice: 'price_1SDjMn6zHGhSUEk1C2Bt8pWx', // Yearly price ID
    features: [
      'Alle Starter-Features',
      'Jährliche Abrechnung',
      'Maximale Ersparnis',
      'Priority Support',
      'Neue Features zuerst',
      'Backup & Cloud-Sync',
      'Erweiterte Statistiken',
      'Gruppen-Features',
      'Admin-Dashboard',
      '12 Monate Vollzugang'
    ],
    limitations: [],
    subtitle: 'Maximale Ersparnis - nur 1.67€ pro Monat'
  }
]

const FAQ_ITEMS = [
  {
    question: 'Kann ich jederzeit kündigen?',
    answer: 'Ja, Sie können Ihr Abonnement jederzeit ohne Kündigungsfrist beenden. Sie behalten Zugang bis zum Ende des bezahlten Zeitraums.'
  },
  {
    question: 'Gibt es eine Geld-zurück-Garantie?',
    answer: 'Ja, wir bieten eine 14-tägige Geld-zurück-Garantie. Wenn Sie nicht zufrieden sind, erhalten Sie Ihr Geld vollständig zurück.'
  },
  {
    question: 'Funktioniert die App auch offline?',
    answer: 'Ja, mit dem Pro-Plan haben Sie Zugang zum Offline-Modus. Sie können Fragen herunterladen und auch ohne Internet lernen.'
  },
  {
    question: 'Wie aktuell sind die Fragen?',
    answer: 'Unsere Fragen werden regelmäßig aktualisiert und entsprechen den neuesten Prüfungsstandards und Gesetzesänderungen.'
  },
  {
    question: 'Kann ich zwischen den Plänen wechseln?',
    answer: 'Ja, Sie können jederzeit upgraden oder downgraden. Änderungen werden am nächsten Abrechnungszyklus wirksam.'
  },
  {
    question: 'Gibt es Rabatte für Studenten?',
    answer: 'Ja, wir bieten 25% Rabatt für Studenten und Auszubildende. Kontaktieren Sie uns mit einem Nachweis Ihres Status.'
  }
]

export default function PricingPage() {
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleStripeCheckout = async (plan: any) => {
    if (!plan.stripePrice) {
      alert('Stripe-Konfiguration fehlt für diesen Plan')
      return
    }

    setLoading(plan.id)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.stripePrice,
          email: user?.email || '',
          name: user?.name || ''
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Checkout-Fehler')
      }
    } catch (error) {
      console.error('Checkout Error:', error)
      alert('Fehler beim Checkout. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(null)
    }
  }

  const handlePlanSelect = (planId: string) => {
    const plan = PLANS.find(p => p.id === planId)
    if (!plan) return

    // Alle Pläne sind bezahlt - direkt zu Stripe Checkout
    handleStripeCheckout(plan)
  }
  }
  
  // Entfernt da nur noch 2 feste Pläne

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Der richtige Plan für Ihren Erfolg
            </span>
          </h1>
          {/* VERSION MARKER: NEUE MODERNE SEITE V2.0 - OKTOBER 2025 */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            Wählen Sie den Plan, der zu Ihren Lernzielen passt. 
            Alle Pläne beinhalten unsere modernsten Lernmethoden und regelmäßige Updates.
          </p>

          {/* Stripe Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Sichere Zahlung mit <strong className="text-blue-600">Stripe</strong> • SSL-verschlüsselt
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards - 2 Optionen */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
                plan.popular ? 'border-blue-500 scale-105 shadow-blue-500/20' : 'border-gray-200 dark:border-gray-700'
              }`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                y: -8,
                boxShadow: plan.popular 
                  ? "0 25px 50px rgba(59, 130, 246, 0.25)" 
                  : "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.2 }
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline w-4 h-4 mr-1" />
                    Beliebtester Plan
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : 'pt-8'}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4 shadow-lg`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <plan.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {plan.description}
                  </p>

                  {/* Enhanced Price Display */}
                  <div className="mb-6">
                    <motion.div 
                      className="flex items-baseline justify-center gap-1"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        €{plan.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-lg">
                        {plan.period}
                      </span>
                    </motion.div>
                    {plan.badge && (
                      <motion.div 
                        className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      >
                        {plan.badge}
                      </motion.div>
                    )}
                    {plan.originalPrice && plan.originalPrice > plan.price && (
                      <div className="text-gray-400 text-sm line-through mt-1">
                        €{plan.originalPrice}
                      </div>
                    )}
                    {plan.price > 0 && billingPeriod === 'monthly' && (
                      <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        oder €{Math.round(plan.price * 12 * 0.8)}/Jahr (20% sparen)
                      </div>
                    )}
                  </div>

                  {/* Enhanced CTA Button with Stripe */}
                  <motion.button 
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={loading === plan.id}
                    whileHover={{ scale: loading === plan.id ? 1 : 1.02 }}
                    whileTap={{ scale: loading === plan.id ? 1 : 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${
                    plan.id === 'free'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      : `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl hover:shadow-blue-500/25`
                  }`}>
                    {loading === plan.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Weiterleitung zu Stripe...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        {plan.id === 'free' ? 'Kostenlos starten' : 'Mit Stripe bezahlen'}
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    )}
                  </motion.button>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Enthalten:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Nicht enthalten:
                      </h5>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Comparison */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Was macht uns besonders?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Zeitersparnis</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                50% weniger Lernzeit durch intelligente Algorithmen
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Garantiert aktuell</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Automatische Updates bei Gesetzesänderungen
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">KI-gestützt</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Personalisierte Lernpfade für optimalen Erfolg
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Deutscher Support von echten Experten
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Häufig gestellte Fragen
          </h2>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für den Unternehmerschein?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Schließen Sie sich über 10.000 erfolgreichen Unternehmern an, 
              die mit unserer App ihren Unternehmerschein gemeistert haben.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors">
                Jetzt starten
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-colors">
                Fragen? Kontakt aufnehmen
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
