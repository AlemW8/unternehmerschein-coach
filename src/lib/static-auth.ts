// Statische Benutzerdaten für FTP-Version (ohne Server)
// In einer echten FTP-Version würdest du eine externe API wie Firebase/Supabase verwenden

export interface User {
  id: string
  email: string
  name: string
  password: string
  isPremium: boolean
  role: string
  createdAt: string
}

// Demo-User für statische Version
export const DEMO_USERS: User[] = [
  {
    id: 'admin-1',
    email: 'aleemwaqar@outlook.com',
    name: 'Admin',
    password: btoa('mera4711'), // Base64 encoded für mera4711
    isPremium: true,
    role: 'ADMIN',
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo-1',
    email: 'demo@demo.de',
    name: 'Demo User',
    password: btoa('demo123'), // Base64 encoded für demo123
    isPremium: true,
    role: 'USER',
    createdAt: new Date().toISOString()
  }
]

// localStorage basierte Benutzerverwaltung
export class StaticUserManager {
  private static STORAGE_KEY = 'fahrgewerbe_users'

  static getUsers(): User[] {
    if (typeof window === 'undefined') return DEMO_USERS
    
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return DEMO_USERS
      }
    }
    
    // Initialisiere mit Demo-Usern
    this.saveUsers(DEMO_USERS)
    return DEMO_USERS
  }

  static saveUsers(users: User[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users))
  }

  static addUser(user: User) {
    const users = this.getUsers()
    users.push(user)
    this.saveUsers(users)
  }

  static findUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
  }

  static async register(userData: {
    name: string
    email: string
    password: string
    isPremium?: boolean
  }) {
    // Simuliere einfaches Hashing (in Produktion würdest du bcrypt im Backend verwenden)
    const hashedPassword = btoa(userData.password) // Base64 encoding als Demo

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email.toLowerCase(),
      name: userData.name,
      password: hashedPassword,
      isPremium: userData.isPremium || false,
      role: 'USER',
      createdAt: new Date().toISOString()
    }

    // Prüfe ob User existiert
    if (this.findUserByEmail(userData.email)) {
      throw new Error('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits')
    }

    this.addUser(newUser)
    return newUser
  }

  static async login(email: string, password: string) {
    const user = this.findUserByEmail(email)
    if (!user) {
      throw new Error('Benutzer nicht gefunden')
    }

    // Einfache Passwort-Prüfung (in Produktion würdest du bcrypt verwenden)
    const hashedInput = btoa(password)
    if (user.password !== hashedInput) {
      throw new Error('Falsches Passwort')
    }

    return user
  }
}

// Für statische Export-Version - simuliert API Calls
export const staticAPI = {
  async register(data: any) {
    try {
      const user = await StaticUserManager.register(data)
      const { password, ...userWithoutPassword } = user
      
      return {
        success: true,
        user: userWithoutPassword,
        token: btoa(JSON.stringify({ userId: user.id, email: user.email }))
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async login(email: string, password: string) {
    try {
      const user = await StaticUserManager.login(email, password)
      const { password: _, ...userWithoutPassword } = user
      
      return {
        success: true,
        user: userWithoutPassword,
        token: btoa(JSON.stringify({ userId: user.id, email: user.email }))
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
