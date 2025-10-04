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
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }
    
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
          // Session abgelaufen
          localStorage.removeItem('auth_user')
        }
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('auth_user')
      }
    }
    
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<{ success: boolean; message: string; needsPasswordReset?: boolean }> => {
    setIsLoading(true)
    try {
      const user = await userService.login(email, password)
      
      if (user) {
        setUser(user)
        // Session im localStorage speichern
        const sessionData = {
          user: user,
          loginTime: new Date().toISOString()
        }
        localStorage.setItem('auth_user', JSON.stringify(sessionData))
        
        return { 
          success: true, 
          message: 'Erfolgreich angemeldet',
          needsPasswordReset: user.needsPasswordReset
        }
      } else {
        return { success: false, message: 'E-Mail oder Passwort falsch' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Fehler beim Anmelden' }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, name: string): Promise<{ success: boolean; message: string; tempPassword?: string }> => {
    setIsLoading(true)
    try {
      // Prüfen ob E-Mail bereits existiert
      const existingUsers = userService.getAllUsers()
      if (existingUsers.some(u => u.email === email)) {
        return { success: false, message: 'E-Mail bereits registriert' }
      }

      const { user, tempPassword } = await userService.registerUser(email, name)
      
      return { 
        success: true, 
        message: `Registrierung erfolgreich! Temporäres Passwort wurde an ${email} gesendet.`,
        tempPassword
      }
    } catch (error) {
      console.error('SignUp error:', error)
      return { success: false, message: 'Fehler bei der Registrierung' }
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'Nicht angemeldet' }
    }

    try {
      const success = await userService.resetPassword(user.id, newPassword)
      
      if (success) {
        // User-Daten aktualisieren
        const updatedUser = userService.getUser(user.id)
        if (updatedUser) {
          setUser(updatedUser)
          // Session aktualisieren
          const sessionData = {
            user: updatedUser,
            loginTime: new Date().toISOString()
          }
          localStorage.setItem('auth_user', JSON.stringify(sessionData))
        }
        
        return { success: true, message: 'Passwort erfolgreich geändert' }
      } else {
        return { success: false, message: 'Fehler beim Passwort ändern' }
      }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, message: 'Fehler beim Passwort ändern' }
    }
  }

  const signOut = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
    }
  }

  const isAuthenticated = !!user

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    signUp,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
