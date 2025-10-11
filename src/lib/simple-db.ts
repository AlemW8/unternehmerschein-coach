// Einfache In-Memory Datenbank mit Persistence
interface User {
  id: string
  email: string
  name: string
  password: string // gehashed
  isPremium: boolean
  plan: 'free' | 'premium'
  role: string
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

interface UserSession {
  userId: string
  token: string
  expiresAt: string
}

class SimpleDatabase {
  private users: Map<string, User> = new Map()
  private sessions: Map<string, UserSession> = new Map()
  private storageKey = 'simple_db_users'
  private sessionsKey = 'simple_db_sessions'

  constructor() {
    this.loadFromStorage()
    
    // Auto-save every 30 seconds
    setInterval(() => {
      this.saveToStorage()
    }, 30000)
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined') {
        const usersData = localStorage.getItem(this.storageKey)
        const sessionsData = localStorage.getItem(this.sessionsKey)
        
        if (usersData) {
          const users = JSON.parse(usersData)
          this.users = new Map(Object.entries(users))
          console.log('✅ Loaded users from storage:', this.users.size)
        }
        
        if (sessionsData) {
          const sessions = JSON.parse(sessionsData)
          this.sessions = new Map(Object.entries(sessions))
          console.log('✅ Loaded sessions from storage:', this.sessions.size)
        }
      }
    } catch (error) {
      console.error('❌ Error loading from storage:', error)
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined') {
        const usersObject = Object.fromEntries(this.users)
        const sessionsObject = Object.fromEntries(this.sessions)
        
        localStorage.setItem(this.storageKey, JSON.stringify(usersObject))
        localStorage.setItem(this.sessionsKey, JSON.stringify(sessionsObject))
        
        console.log('💾 Saved to storage - Users:', this.users.size, 'Sessions:', this.sessions.size)
      }
    } catch (error) {
      console.error('❌ Error saving to storage:', error)
    }
  }

  // User operations
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'role'>): Promise<User> {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    if (this.users.has(userData.email)) {
      throw new Error('E-Mail bereits registriert')
    }

    const user: User = {
      id,
      ...userData,
      role: 'USER',
      createdAt: new Date().toISOString(),
      isActive: true
    }

    this.users.set(userData.email, user)
    this.saveToStorage()
    
    console.log('✅ User created:', user.email)
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.get(email) || null
  }

  async getUserById(id: string): Promise<User | null> {
    const users = Array.from(this.users.values())
    for (const user of users) {
      if (user.id === id) {
        return user
      }
    }
    return null
  }

  async updateUser(email: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(email)
    if (!user) return null

    const updatedUser = { ...user, ...updates }
    this.users.set(email, updatedUser)
    this.saveToStorage()
    
    return updatedUser
  }

  // Session operations
  async createSession(userId: string): Promise<string> {
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days

    const session: UserSession = {
      userId,
      token,
      expiresAt
    }

    this.sessions.set(token, session)
    this.saveToStorage()
    
    console.log('✅ Session created for user:', userId)
    return token
  }

  async getSession(token: string): Promise<UserSession | null> {
    const session = this.sessions.get(token)
    if (!session) return null

    // Check if expired
    if (new Date(session.expiresAt) < new Date()) {
      this.sessions.delete(token)
      this.saveToStorage()
      return null
    }

    return session
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token)
    this.saveToStorage()
  }

  // Stats
  getUserCount(): number {
    return this.users.size
  }

  getActiveSessionCount(): number {
    const now = new Date()
    let activeCount = 0
    
    const sessions = Array.from(this.sessions.values())
    for (const session of sessions) {
      if (new Date(session.expiresAt) > now) {
        activeCount++
      }
    }
    
    return activeCount
  }

  // Admin functions
  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }

  clearAllData(): void {
    this.users.clear()
    this.sessions.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey)
      localStorage.removeItem(this.sessionsKey)
    }
    console.log('🗑️ All data cleared')
  }
}

// Global instance
export const db = new SimpleDatabase()

// Helper functions
export async function hashPassword(password: string): Promise<string> {
  // Simple hash (in production use bcrypt)
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'salt_premium_2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}

export { type User, type UserSession }
