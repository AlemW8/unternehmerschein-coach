'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { userService, User } from '@/lib/user-service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string; needsPasswordReset?: boolean }>
  signOut: () => void
  signUp: (email: string, name: string) => Promise<{ success: boolean; message: string; tempPassword?: string }>
  resetPassword: (newPassword: string) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Client-side only
    if (typeof window === 'undefined') return
    
    // Beim App-Start prüfen ob User eingeloggt ist
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        // Prüfe ob Session noch gültig ist (24h)
        const loginTime = new Date(userData.loginTime)
        const now = new Date()
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
        
        if (hoursDiff < 24) {
          setUser(userData.user)
        } else {
          localStorage.removeItem('auth_user')
        }
      } catch (error) {
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Client-side only
    if (typeof window === 'undefined') return false
    
    setIsLoading(true)
    try {
      // Simuliere Login - da keine DB, prüfen wir gegen localStorage
      const users = JSON.parse(localStorage.getItem('app_users') || '[]')
      const existingUser = users.find((u: any) => u.email === email)
      
      if (!existingUser) {
        alert('Benutzer nicht gefunden. Bitte registrieren Sie sich zuerst.')
        setIsLoading(false)
        return false
      }

      // Einfacher Password-Check (in echt würde man hash prüfen)
      if (existingUser.password !== password) {
        alert('Falsches Passwort')
        setIsLoading(false)
        return false
      }

      // Prüfe ob Plan bezahlt wurde
      if (existingUser.plan !== 'FREE' && !existingUser.isActive) {
        alert('Ihr Account ist nicht aktiv. Bitte bezahlen Sie Ihren Plan.')
        setIsLoading(false)
        return false
      }

      const userData = {
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          plan: existingUser.plan,
          createdAt: existingUser.createdAt,
          isActive: existingUser.isActive
        },
        loginTime: new Date().toISOString()
      }

      localStorage.setItem('auth_user', JSON.stringify(userData))
      setUser(userData.user)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const signUp = async (email: string, password: string, name: string, planType: string): Promise<boolean> => {
    // Client-side only
    if (typeof window === 'undefined') return false
    
    setIsLoading(true)
    try {
      const users = JSON.parse(localStorage.getItem('app_users') || '[]')
      
      // Prüfe ob User bereits existiert
      const existingUser = users.find((u: any) => u.email === email)
      if (existingUser) {
        alert('Benutzer mit dieser E-Mail existiert bereits')
        setIsLoading(false)
        return false
      }

      // Neue Benutzer-ID generieren
      const newUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

      const newUser = {
        id: newUserId,
        email,
        password, // In echt würde man das hashen
        name,
        role: 'USER' as const,
        plan: planType as 'FREE' | 'PREMIUM' | 'PRO',
        createdAt: new Date().toISOString(),
        isActive: planType === 'FREE' // Nur FREE ist sofort aktiv
      }

      users.push(newUser)
      localStorage.setItem('app_users', JSON.stringify(users))

      // Bei kostenpflichtigen Plänen: Redirect zu Payment
      if (planType !== 'FREE') {
        alert(`Registrierung erfolgreich! Sie müssen jetzt ${planType === 'PREMIUM' ? '€19.99' : '€39.99'} bezahlen, um Ihren Account zu aktivieren. Sie erhalten dann automatisch Ihre Zugangsdaten per E-Mail.`)
        setIsLoading(false)
        // Hier würde normalerweise Redirect zu Stripe/PayPal passieren
        return true
      }

      // Für FREE Plan: Direkt einloggen
      const userData = {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          plan: newUser.plan,
          createdAt: newUser.createdAt,
          isActive: newUser.isActive
        },
        loginTime: new Date().toISOString()
      }

      localStorage.setItem('auth_user', JSON.stringify(userData))
      setUser(userData.user)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
      return false
    }
  }

  const signOut = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}