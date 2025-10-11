import { db, hashPassword, verifyPassword, type User } from '@/lib/simple-db'

export interface RegisterData {
  name: string
  email: string
  password: string
  isPremium?: boolean
  sessionId?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResult {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export class AuthService {
  
  // Registrierung
  static async register(data: RegisterData): Promise<AuthResult> {
    try {
      console.log('🚀 Starting registration for:', data.email)
      
      // Validierung
      if (!data.name?.trim()) {
        return { success: false, error: 'Name ist erforderlich' }
      }
      
      if (!data.email?.trim()) {
        return { success: false, error: 'E-Mail ist erforderlich' }
      }
      
      if (!data.password || data.password.length < 6) {
        return { success: false, error: 'Passwort muss mindestens 6 Zeichen haben' }
      }
      
      // E-Mail Format prüfen
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        return { success: false, error: 'Ungültige E-Mail-Adresse' }
      }
      
      // Prüfen ob User bereits existiert
      const existingUser = await db.getUserByEmail(data.email.toLowerCase())
      if (existingUser) {
        return { success: false, error: 'E-Mail bereits registriert' }
      }
      
      // Passwort hashen
      const hashedPassword = await hashPassword(data.password)
      
      // User erstellen
      const user = await db.createUser({
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: hashedPassword,
        isPremium: data.isPremium || false,
        plan: data.isPremium ? 'premium' : 'free',
        isActive: true
      })
      
      // Session erstellen
      const token = await db.createSession(user.id)
      
      console.log('✅ Registration successful for:', user.email)
      
      return {
        success: true,
        user: {
          ...user,
          password: '' // Password nicht zurückgeben
        },
        token
      }
      
    } catch (error) {
      console.error('❌ Registration error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unbekannter Fehler'
      }
    }
  }
  
  // Login
  static async login(data: LoginData): Promise<AuthResult> {
    try {
      console.log('🔑 Starting login for:', data.email)
      
      if (!data.email || !data.password) {
        return { success: false, error: 'E-Mail und Passwort sind erforderlich' }
      }
      
      // User finden
      const user = await db.getUserByEmail(data.email.toLowerCase())
      if (!user) {
        return { success: false, error: 'E-Mail oder Passwort falsch' }
      }
      
      // Passwort prüfen
      const isPasswordValid = await verifyPassword(data.password, user.password)
      if (!isPasswordValid) {
        return { success: false, error: 'E-Mail oder Passwort falsch' }
      }
      
      // Prüfen ob Account aktiv
      if (!user.isActive) {
        return { success: false, error: 'Account ist deaktiviert' }
      }
      
      // Last login aktualisieren
      await db.updateUser(user.email, {
        lastLogin: new Date().toISOString()
      })
      
      // Session erstellen
      const token = await db.createSession(user.id)
      
      console.log('✅ Login successful for:', user.email)
      
      return {
        success: true,
        user: {
          ...user,
          password: '' // Password nicht zurückgeben
        },
        token
      }
      
    } catch (error) {
      console.error('❌ Login error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unbekannter Fehler'
      }
    }
  }
  
  // Token validieren
  static async validateToken(token: string): Promise<AuthResult> {
    try {
      if (!token) {
        return { success: false, error: 'Kein Token provided' }
      }
      
      // Session finden
      const session = await db.getSession(token)
      if (!session) {
        return { success: false, error: 'Ungültiger oder abgelaufener Token' }
      }
      
      // User finden
      const user = await db.getUserById(session.userId)
      if (!user) {
        return { success: false, error: 'User nicht gefunden' }
      }
      
      if (!user.isActive) {
        return { success: false, error: 'Account ist deaktiviert' }
      }
      
      return {
        success: true,
        user: {
          ...user,
          password: '' // Password nicht zurückgeben
        },
        token
      }
      
    } catch (error) {
      console.error('❌ Token validation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Token-Validierung fehlgeschlagen'
      }
    }
  }
  
  // Logout
  static async logout(token: string): Promise<boolean> {
    try {
      if (token) {
        await db.deleteSession(token)
      }
      return true
    } catch (error) {
      console.error('❌ Logout error:', error)
      return false
    }
  }
  
  // Password ändern
  static async changePassword(token: string, oldPassword: string, newPassword: string): Promise<AuthResult> {
    try {
      // Token validieren
      const validation = await this.validateToken(token)
      if (!validation.success || !validation.user) {
        return validation
      }
      
      const user = await db.getUserByEmail(validation.user.email)
      if (!user) {
        return { success: false, error: 'User nicht gefunden' }
      }
      
      // Altes Passwort prüfen
      const isOldPasswordValid = await verifyPassword(oldPassword, user.password)
      if (!isOldPasswordValid) {
        return { success: false, error: 'Aktuelles Passwort ist falsch' }
      }
      
      // Neues Passwort validieren
      if (newPassword.length < 6) {
        return { success: false, error: 'Neues Passwort muss mindestens 6 Zeichen haben' }
      }
      
      // Neues Passwort hashen und speichern
      const hashedNewPassword = await hashPassword(newPassword)
      await db.updateUser(user.email, {
        password: hashedNewPassword
      })
      
      console.log('✅ Password changed for:', user.email)
      
      return {
        success: true,
        user: {
          ...user,
          password: '' // Password nicht zurückgeben
        },
        token
      }
      
    } catch (error) {
      console.error('❌ Change password error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Passwort-Änderung fehlgeschlagen'
      }
    }
  }
  
  // User-Profil aktualisieren
  static async updateProfile(token: string, updates: { name?: string; email?: string }): Promise<AuthResult> {
    try {
      // Token validieren
      const validation = await this.validateToken(token)
      if (!validation.success || !validation.user) {
        return validation
      }
      
      const user = await db.getUserByEmail(validation.user.email)
      if (!user) {
        return { success: false, error: 'User nicht gefunden' }
      }
      
      // Updates anwenden
      const updateData: Partial<User> = {}
      
      if (updates.name !== undefined) {
        if (!updates.name.trim()) {
          return { success: false, error: 'Name darf nicht leer sein' }
        }
        updateData.name = updates.name.trim()
      }
      
      if (updates.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(updates.email)) {
          return { success: false, error: 'Ungültige E-Mail-Adresse' }
        }
        
        // Prüfen ob neue E-Mail bereits existiert
        if (updates.email.toLowerCase() !== user.email) {
          const existingUser = await db.getUserByEmail(updates.email.toLowerCase())
          if (existingUser) {
            return { success: false, error: 'E-Mail bereits vergeben' }
          }
        }
        
        updateData.email = updates.email.toLowerCase().trim()
      }
      
      // User aktualisieren
      const updatedUser = await db.updateUser(user.email, updateData)
      if (!updatedUser) {
        return { success: false, error: 'Update fehlgeschlagen' }
      }
      
      console.log('✅ Profile updated for:', updatedUser.email)
      
      return {
        success: true,
        user: {
          ...updatedUser,
          password: '' // Password nicht zurückgeben
        },
        token
      }
      
    } catch (error) {
      console.error('❌ Update profile error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Profil-Update fehlgeschlagen'
      }
    }
  }
  
  // Admin: Alle User abrufen (für Testing)
  static getAllUsers(): User[] {
    const users = db.getAllUsers()
    return users.map(user => ({
      ...user,
      password: '***' // Password verstecken
    }))
  }
  
  // Admin: Statistiken
  static getStats() {
    return {
      totalUsers: db.getUserCount(),
      activeSessions: db.getActiveSessionCount(),
      premiumUsers: db.getAllUsers().filter(u => u.isPremium).length,
      timestamp: new Date().toISOString()
    }
  }
}

export default AuthService
