'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Database, Zap } from 'lucide-react'
import AuthService from '@/lib/auth-service'

export default function PaymentSuccessPageNew() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: 'test@example.com',
    password: 'test123',
    confirmPassword: 'test123'
  })

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await AuthService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isPremium: true,
        sessionId: sessionId || undefined
      })
      
      if (result.success) {
        alert('🎉 SIMPLEDB ERFOLGREICH! Account erstellt!')
        router.push('/learn?welcome=true&new=true&simpledb=true')
      }
    } catch (error) {
      alert('Fehler: ' + error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 py-20 px-4 animate-pulse">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center border-8 border-yellow-400 animate-bounce"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-spin"
          >
            <CheckCircle className="w-20 h-20 text-purple-800" />
          </motion.div>

          {/* Success Message */}
          <h1 className="text-6xl font-black text-white mb-4 animate-pulse">
            🌈 RAINBOW UPDATE LIVE! 🌈
          </h1>
          <p className="text-3xl text-yellow-200 mb-8 font-black animate-bounce">
            🎨 SIMPLEDB IST AKTIV! 🎨
          </p>

          {/* Registration Button */}
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 border-8 border-white rounded-3xl p-8 mb-8 animate-bounce">
            <p className="text-white font-black mb-4 text-4xl animate-pulse">
              🌈 JETZT TESTEN! 🌈
            </p>
            <button
              onClick={() => {
                const name = prompt('Ihr Name:') || 'Test User'
                setFormData(prev => ({ ...prev, name }))
                handleRegistration({ preventDefault: () => {} } as React.FormEvent)
              }}
              className="bg-yellow-400 text-purple-800 font-black py-8 px-16 rounded-3xl hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center gap-4 mx-auto text-2xl shadow-2xl transform hover:scale-110 animate-pulse"
            >
              🌈 SIMPLEDB JETZT TESTEN! 🌈
              <ArrowRight className="w-8 h-8 animate-bounce" />
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 p-8 bg-gradient-to-r from-orange-400 to-pink-500 border-8 border-white rounded-3xl animate-pulse">
            <p className="text-2xl text-white font-black text-center flex items-center justify-center gap-4">
              <Database className="w-8 h-8 animate-spin" />
              🌈 <strong>RAINBOW-UPDATE ERFOLGREICH!</strong> 🌈<br/>
              SimpleDB läuft perfekt - KOMPLETT NEUE FARBEN!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
