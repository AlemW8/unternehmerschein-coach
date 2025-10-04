// Simple JSON Database für User
// Das ist eine temporäre Lösung bis Prisma läuft

import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const DB_PATH = path.join(process.cwd(), 'data', 'users.json')

// Stelle sicher dass der data-Ordner existiert
const ensureDataDir = () => {
  const dataDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// User Interface
interface User {
  id: string
  email: string
  name?: string
  password: string // bcrypt hash
  role: 'USER' | 'ADMIN'
  plan: 'FREE' | 'PRO' | 'TEAM'
  stripeCustomerId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Lade alle User
const loadUsers = (): User[] => {
  ensureDataDir()
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error loading users:', error)
    return []
  }
}

// Speichere alle User
const saveUsers = (users: User[]) => {
  ensureDataDir()
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving users:', error)
    throw new Error('Failed to save users')
  }
}

// Generiere eine einfache ID
const generateId = () => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// User DB Functions
export const userDB = {
  // Erstelle neuen User
  async create(data: {
    email: string
    name?: string
    password: string
    role?: 'USER' | 'ADMIN'
    plan?: 'FREE' | 'PRO' | 'TEAM'
    stripeCustomerId?: string
  }): Promise<User> {
    const users = loadUsers()
    
    // Prüfe ob Email bereits existiert
    const existingUser = users.find(u => u.email === data.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)
    
    const newUser: User = {
      id: generateId(),
      email: data.email,
      name: data.name || '',
      password: hashedPassword,
      role: data.role || 'USER',
      plan: data.plan || 'FREE',
      stripeCustomerId: data.stripeCustomerId,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    users.push(newUser)
    saveUsers(users)
    
    return newUser
  },

  // Finde User by Email
  async findByEmail(email: string): Promise<User | null> {
    const users = loadUsers()
    return users.find(u => u.email === email) || null
  },

  // Finde User by ID
  async findById(id: string): Promise<User | null> {
    const users = loadUsers()
    return users.find(u => u.id === id) || null
  },

  // Verifiziere Passwort
  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email)
    if (!user) return null
    
    const isValid = await bcrypt.compare(password, user.password)
    return isValid ? user : null
  },

  // Update User
  async update(id: string, data: Partial<User>): Promise<User | null> {
    const users = loadUsers()
    const userIndex = users.findIndex(u => u.id === id)
    
    if (userIndex === -1) return null
    
    const updatedUser = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    users[userIndex] = updatedUser
    saveUsers(users)
    
    return updatedUser
  },

  // Alle User (nur für Admin)
  async findAll(): Promise<User[]> {
    return loadUsers()
  }
}

// Export für backward compatibility
export default userDB
