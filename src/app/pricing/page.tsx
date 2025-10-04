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
    id: 'monthly',
    name: 'Monatlich',
    price: '29.99',
    period: '/ Monat',
    description: 'Flexibel monatlich kündbar',
    stripePrice: 'price_1SDjLt6zHGhSUEk1en6wrm1q',
    popular: false,
    badge: null,
    features: [
      'Vollzugang zu allen Lerninhalten',
      'Unbegrenzte Prüfungssimulationen',
      'Detaillierte Lernfortschrittsverfolgung',
      'Mobile App für iOS und Android',
      'Jederzeit monatlich kündbar'
    ],
    icon: Zap,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'yearly',
    name: 'Jahres-Plan',
    price: '199.99',
    period: '/ Jahr einmalig',
    description: 'Beste Ersparnis für ernsthafte Lernende',
    stripePrice: 'price_1SDjMn6zHGhSUEk1C2Bt8pWx',
    popular: true,
    badge: '44% sparen',
    features: [
      'Vollzugang zu allen Lerninhalten',
      'Unbegrenzte Prüfungssimulationen',
      'Detaillierte Lernfortschrittsverfolgung',
      'Mobile App für iOS und Android',
      'Prioritäts-Support',
      'Exklusive Lernmaterialien',
      'Zertifikat nach Abschluss'
    ],
    icon: Crown,
    color: 'from-purple-500 to-pink-500'
  }
]

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Unternehmerin",
    content: "Dank dieser App habe ich meinen Unternehmerschein beim ersten Versuch bestanden!",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    name: "Michael K.",
    role: "Gastronom",
    content: "Die Lernmethode ist brilliant - ich konnte neben der Arbeit lernen.",
    rating: 5,
    avatar: "👨‍🍳"
  },
  {
    name: "Lisa T.",
    role: "Einzelhändlerin",
    content: "Sehr strukturiert und verständlich erklärt. Absolut empfehlenswert!",
    rating: 5,
    avatar: "👩‍💻"
  }
]

const FAQ_ITEMS = [
  {
    question: "Wie funktioniert die Geld-zurück-Garantie?",
    answer: "Wenn Sie nicht zufrieden sind, erhalten Sie innerhalb von 30 Tagen Ihr Geld zurück - ohne Wenn und Aber."
  },
  {
    question: "Kann ich zwischen den Plänen wechseln?",
    answer: "Ja, Sie können jederzeit zwischen den verfügbaren Plänen wechseln. Die Preisdifferenz wird anteilig berechnet."
  },
  {
    question: "Sind die Inhalte immer aktuell?",
    answer: "Absolut! Unser Team aktualisiert die Lerninhalte regelmäßig entsprechend den neuesten Prüfungsrichtlinien."
  },
  {
    question: "Gibt es eine App für das Smartphone?",
    answer: "Ja, unsere App ist sowohl für iOS als auch Android verfügbar und synchronisiert sich automatisch mit Ihrem Web-Account."
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
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Fehler beim Erstellen der Checkout-Session')
      }
    } catch (error) {
      console.error('Stripe checkout error:', error)
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Der schnellste Weg zu Ihrem{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Unternehmerschein
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Über 10.000 erfolgreiche Unternehmer haben bereits mit unserer App ihren Unternehmerschein erhalten. 
            Werden Sie der Nächste!
          </motion.p>

          {/* Trust Indicators */}
          <motion.div 
            className="flex justify-center items-center gap-8 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="font-medium">SSL-verschlüsselt</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">4.9/5 Bewertung</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-medium">10.000+ Nutzer</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {PLANS.map((plan, index) => {
            const IconComponent = plan.icon
            const isLoading = loading === plan.id
            
            return (
              <motion.div
                key={plan.id}
                className={`relative rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.6, type: "spring" }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 Beliebteste Wahl
                    </div>
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div 
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${plan.color} mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* Plan Name */}
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {plan.name}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {plan.description}
                </motion.p>

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
                      transition={{ delay: index * 0.1 + 0.6, type: "spring" }}
                    >
                      {plan.badge}
                    </motion.div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 + featureIndex * 0.05 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleStripeCheckout(plan)}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verarbeitung...
                    </>
                  ) : (
                    <>
                      Mit Stripe bezahlen
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Security Note */}
                <motion.p 
                  className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.9 }}
                >
                  🔒 Sichere Zahlung über Stripe<br />
                  Mit der Buchung stimmen Sie unseren{' '}
                  <a href="/agb" className="text-blue-600 hover:text-blue-800 underline">AGB</a>
                  {' '}und{' '}
                  <a href="/datenschutz" className="text-blue-600 hover:text-blue-800 underline">Datenschutzbestimmungen</a>
                  {' '}zu.
                </motion.p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Was unsere Kunden sagen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Häufig gestellte Fragen
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                )}
              </motion.div>
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
