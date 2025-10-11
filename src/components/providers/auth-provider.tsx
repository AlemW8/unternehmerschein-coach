'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  plan: string
  isActive: boolean
  role?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (user: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user mit allen möglichen Speicher-Keys
    const storedUser = localStorage.getItem('user') || localStorage.getItem('auth_user')
    const isAuth = localStorage.getItem('isAuthenticated') === 'true'
    
    if (storedUser && isAuth) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        console.log('✅ User loaded from localStorage:', userData)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('auth_user')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
      }
    }
    
    // Listen for direct login events from registration
    const handleUserLogin = (event: any) => {
      const { user: loginUser } = event.detail
      console.log('✅ Direct login event received:', loginUser)
      setUser(loginUser)
      localStorage.setItem('user', JSON.stringify(loginUser))
      localStorage.setItem('isAuthenticated', 'true')
    }
    
    window.addEventListener('userLogin', handleUserLogin)
    setIsLoading(false)
    
    return () => {
      window.removeEventListener('userLogin', handleUserLogin)
    }
  }, [])

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
