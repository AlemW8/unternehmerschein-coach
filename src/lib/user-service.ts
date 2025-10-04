// User Management System mit temporären Passwörtern und E-Mail Service

export interface User {
  id: string
  email: string
  name: string
  hashedPassword?: string
  tempPassword?: string
  tempPasswordExpiry?: Date
  needsPasswordReset: boolean
  plan: 'basic' | 'premium' | 'pro' | 'free'
  createdAt: Date
  lastLogin?: Date
  isEmailVerified: boolean
  emailVerificationToken?: string
}

export class UserService {
  private users: Map<string, User> = new Map()

  // Generiere temporäres Passwort
  generateTempPassword(): string {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let password = ''
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  // Registrierung mit temporärem Passwort
  async registerUser(email: string, name: string): Promise<{ user: User; tempPassword: string }> {
    const tempPassword = this.generateTempPassword()
    const tempPasswordExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h gültig
    
    const user: User = {
      id: this.generateUserId(),
      email,
      name,
      tempPassword,
      tempPasswordExpiry,
      needsPasswordReset: true,
      plan: 'free',
      createdAt: new Date(),
      isEmailVerified: false,
      emailVerificationToken: this.generateToken()
    }

    this.users.set(user.id, user)
    
    // E-Mail senden
    await this.sendWelcomeEmail(user, tempPassword)
    
    return { user, tempPassword }
  }

  // Login mit temporärem Passwort oder echtem Passwort
  async login(email: string, password: string): Promise<User | null> {
    const user = Array.from(this.users.values()).find(u => u.email === email)
    
    if (!user) return null

    // Prüfe temporäres Passwort
    if (user.tempPassword && user.tempPasswordExpiry && user.tempPasswordExpiry > new Date()) {
      if (user.tempPassword === password) {
        user.lastLogin = new Date()
        return user
      }
    }

    // Prüfe echtes Passwort (hier würdest du normalerweise bcrypt verwenden)
    if (user.hashedPassword && this.verifyPassword(password, user.hashedPassword)) {
      user.lastLogin = new Date()
      return user
    }

    return null
  }

  // Passwort zurücksetzen (vom User nach erstem Login)
  async resetPassword(userId: string, newPassword: string): Promise<boolean> {
    const user = this.users.get(userId)
    if (!user) return false

    user.hashedPassword = this.hashPassword(newPassword)
    user.tempPassword = undefined
    user.tempPasswordExpiry = undefined
    user.needsPasswordReset = false

    await this.sendPasswordChangedEmail(user)
    return true
  }

  // E-Mail Services
  private async sendWelcomeEmail(user: User, tempPassword: string): Promise<void> {
    const emailContent = this.getWelcomeEmailTemplate(user, tempPassword)
    
    // Hier würdest du einen echten E-Mail Service verwenden (SendGrid, AWS SES, etc.)
    console.log('E-Mail gesendet an:', user.email)
    console.log('Inhalt:', emailContent)
    
    // Für Demo speichern wir die E-Mail-Daten
    if (typeof window !== 'undefined') {
      localStorage.setItem(`email_${user.id}`, JSON.stringify({
        to: user.email,
        subject: 'Willkommen bei Unternehmerschein Coach',
        content: emailContent,
        sentAt: new Date()
      }))
    }
  }

  private async sendPasswordChangedEmail(user: User): Promise<void> {
    const emailContent = `
Hallo ${user.name},

Ihr Passwort wurde erfolgreich geändert.

Falls Sie diese Änderung nicht vorgenommen haben, kontaktieren Sie uns sofort.

Mit freundlichen Grüßen
Ihr Unternehmerschein Coach Team
`
    
    console.log('Passwort geändert E-Mail gesendet an:', user.email)
  }

  private getWelcomeEmailTemplate(user: User, tempPassword: string): string {
    return `
Willkommen bei Unternehmerschein Coach!

Hallo ${user.name},

vielen Dank für Ihre Registrierung bei Unternehmerschein Coach!

Ihre Anmeldedaten:
E-Mail: ${user.email}
Temporäres Passwort: ${tempPassword}

WICHTIG: 
1. Loggen Sie sich mit diesen Daten ein: https://waqaraleem.com/auth/signin
2. Ändern Sie Ihr Passwort sofort unter "Profil" > "Passwort ändern"
3. Das temporäre Passwort ist nur 24 Stunden gültig

Nach der ersten Anmeldung können Sie:
✅ Alle Lernmodule erkunden
✅ Flashcards in 7 Sprachen nutzen
✅ Multiple Choice Tests absolvieren
✅ Ihren Lernfortschritt verfolgen

Wählen Sie einen unserer Pläne:
📚 Basic (19,97€) - 90 Tage Zugang
🚀 Premium (39,97€) - 180 Tage + Extras
💎 Pro (79,97€) - Unbegrenzter Zugang + Coaching

Brauchen Sie Hilfe? Antworten Sie einfach auf diese E-Mail.

Viel Erfolg bei Ihrer Prüfungsvorbereitung!

Ihr Unternehmerschein Coach Team
https://waqaraleem.com
`
  }

  // Hilfsfunktionen
  private generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private generateToken(): string {
    return Math.random().toString(36).substr(2, 15)
  }

  private hashPassword(password: string): string {
    // In der Praxis würdest du bcrypt verwenden
    return btoa(password + 'salt123')
  }

  private verifyPassword(password: string, hash: string): boolean {
    return btoa(password + 'salt123') === hash
  }

  // Getter für Benutzer
  getUser(id: string): User | undefined {
    return this.users.get(id)
  }

  // Alle Benutzer (nur für Admin)
  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }

  // E-Mail-Historie für User
  getUserEmails(userId: string): any[] {
    if (typeof window === 'undefined') return []
    
    const emails = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(`email_${userId}`)) {
        const email = JSON.parse(localStorage.getItem(key) || '{}')
        emails.push(email)
      }
    }
    return emails.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
  }
}

// Singleton Instance
export const userService = new UserService()
