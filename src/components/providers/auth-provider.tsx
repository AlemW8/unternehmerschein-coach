'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AuthService from '@/lib/auth-service'

interface User {
  id: string
  email: string
  name: string
  role: string
  plan: 'free' | 'premium'
  isPremium: boolean
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initial load
  useEffect(() => {
    checkAuthStatus()
    
    // Listen for auth events
    const handleUserLogin = (event: CustomEvent) => {
      console.log('🔑 Auth event received:', event.detail)
      const { user: newUser, token: newToken } = event.detail
      setUser(newUser)
      setToken(newToken)
      setIsAuthenticated(true)
    }

    const handleUserLogout = () => {
      console.log('🚪 Logout event received')
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
    }

    window.addEventListener('userLogin', handleUserLogin as EventListener)
    window.addEventListener('userLogout', handleUserLogout as EventListener)

    return () => {
      window.removeEventListener('userLogin', handleUserLogin as EventListener)
      window.removeEventListener('userLogout', handleUserLogout as EventListener)
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking auth status...')
      
      // Check localStorage
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('authToken')
      const storedAuth = localStorage.getItem('isAuthenticated')
      
      if (storedUser && storedToken && storedAuth === 'true') {
        console.log('✅ Found stored auth data')
        
        // Validate token with new AuthService
        const validation = await AuthService.validateToken(storedToken)
        
        if (validation.success && validation.user) {
          console.log('✅ Token validation successful')
          setUser(validation.user)
          setToken(storedToken)
          setIsAuthenticated(true)
        } else {
          console.warn('⚠️ Token validation failed:', validation.error)
          // Clear invalid auth data
          localStorage.removeItem('user')
          localStorage.removeItem('authToken')
          localStorage.removeItem('isAuthenticated')
          setUser(null)
          setToken(null)
          setIsAuthenticated(false)
        }
      } else {
        console.log('ℹ️ No stored auth data found')
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('❌ Error checking auth status:', error)
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('🔑 Attempting login for:', email)
      
      const result = await AuthService.login({ email, password })
      
      if (result.success && result.user && result.token) {
        console.log('✅ Login successful')
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('authToken', result.token)
        localStorage.setItem('isAuthenticated', 'true')
        
        // Update state
        setUser(result.user)
        setToken(result.token)
        setIsAuthenticated(true)
        
        return { success: true }
      } else {
        console.log('❌ Login failed:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      return { success: false, error: 'Unerwarteter Fehler beim Login' }
    }
  }

  const logout = async () => {
    try {
      console.log('🚪 Logging out...')
      
      if (token) {
        await AuthService.logout(token)
      }
      
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
      localStorage.removeItem('isAuthenticated')
      
      // Update state
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
      
      // Trigger event
      window.dispatchEvent(new CustomEvent('userLogout'))
      
      console.log('✅ Logout successful')
    } catch (error) {
      console.error('❌ Logout error:', error)
    }
  }

  const refreshUser = async () => {
    if (token) {
      const validation = await AuthService.validateToken(token)
      if (validation.success && validation.user) {
        setUser(validation.user)
        localStorage.setItem('user', JSON.stringify(validation.user))
      }
    }
  }

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
