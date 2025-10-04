// Einfache lokale Datenbank-Simulation
interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: string
  mustChangePassword?: boolean
  lastPasswordChange?: string
  stats: {
    totalQuestions: number
    correctAnswers: number
    wrongAnswers: number
    completedExams: number
    totalLearningTime: number // in Minuten
    currentStreak: number
    longestStreak: number
    totalPoints: number
    level: number
    xp: number
    xpToNextLevel: number
  }
  chapterProgress: Array<{
    name: string
    progress: number
    total: number
    completed: number
  }>
  achievements: Array<{
    id: string
    unlockedAt?: string
  }>
  recentActivity: Array<{
    date: string
    minutes: number
    questions: number
  }>
}

// Lokale "Datenbank" im Browser localStorage
class LocalDB {
  private USERS_KEY = 'unternehmerschein_users'
  private CURRENT_USER_KEY = 'unternehmerschein_current_user'

  // Hole alle Benutzer
  getUsers(): User[] {
    if (typeof window === 'undefined') return []
    const users = localStorage.getItem(this.USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  // Speichere alle Benutzer
  saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
  }

  // Registriere neuen Benutzer
  registerUser(email: string, password: string, name: string): User | null {
    const users = this.getUsers()
    
    // Prüfe ob E-Mail bereits existiert
    if (users.find(u => u.email === email)) {
      return null // E-Mail bereits verwendet
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password, // In echter App würde man das hashen
      name,
      createdAt: new Date().toISOString(),
      stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        completedExams: 0,
        totalLearningTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0,
        level: 1,
        xp: 0,
        xpToNextLevel: 100
      },
      chapterProgress: [
        { name: 'PBefG', progress: 0, total: 46, completed: 0 },
        { name: 'BOKraft', progress: 0, total: 29, completed: 0 },
        { name: 'Straßenverkehrsrecht', progress: 0, total: 31, completed: 0 },
        { name: 'Umweltschutz', progress: 0, total: 12, completed: 0 },
        { name: 'Versicherungen', progress: 0, total: 13, completed: 0 },
        { name: 'Kaufmännische Verwaltung', progress: 0, total: 117, completed: 0 },
        { name: 'Grenzverkehr', progress: 0, total: 4, completed: 0 },
        { name: 'Kalkulation', progress: 0, total: 2, completed: 0 },
        { name: 'Verbände', progress: 0, total: 1, completed: 0 }
      ],
      achievements: [],
      recentActivity: Array(7).fill(null).map((_, index) => ({
        date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        minutes: 0,
        questions: 0
      }))
    }

    users.push(newUser)
    this.saveUsers(users)
    return newUser
  }

  // Login-Versuch
  loginUser(email: string, password: string): User | null {
    const users = this.getUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      this.setCurrentUser(user)
      return user
    }
    return null
  }

  // Aktueller Benutzer setzen
  setCurrentUser(user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user))
  }

  // Aktueller Benutzer abrufen
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem(this.CURRENT_USER_KEY)
    return user ? JSON.parse(user) : null
  }

  // Benutzer aktualisieren
  updateUser(updatedUser: User): void {
    const users = this.getUsers()
    const index = users.findIndex(u => u.id === updatedUser.id)
    if (index !== -1) {
      users[index] = updatedUser
      this.saveUsers(users)
      this.setCurrentUser(updatedUser)
    }
  }

  // Ausloggen
  logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.CURRENT_USER_KEY)
  }

  // Benutzer-Statistiken aktualisieren
  updateStats(userId: string, updates: Partial<User['stats']>): void {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex !== -1) {
      users[userIndex].stats = { ...users[userIndex].stats, ...updates }
      this.saveUsers(users)
      this.setCurrentUser(users[userIndex])
    }
  }

  // Kapitel-Fortschritt aktualisieren
  updateChapterProgress(userId: string, chapterName: string, progress: number, completed: number): void {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex !== -1) {
      const chapterIndex = users[userIndex].chapterProgress.findIndex(c => c.name === chapterName)
      if (chapterIndex !== -1) {
        users[userIndex].chapterProgress[chapterIndex].progress = progress
        users[userIndex].chapterProgress[chapterIndex].completed = completed
        this.saveUsers(users)
        this.setCurrentUser(users[userIndex])
      }
    }
  }

  // Achievement freischalten
  unlockAchievement(userId: string, achievementId: string): void {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex !== -1) {
      const hasAchievement = users[userIndex].achievements.find(a => a.id === achievementId)
      if (!hasAchievement) {
        users[userIndex].achievements.push({
          id: achievementId,
          unlockedAt: new Date().toISOString()
        })
        this.saveUsers(users)
        this.setCurrentUser(users[userIndex])
      }
    }
  }

  // Passwort ändern
  changePassword(currentPassword: string, newPassword: string): boolean {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return false

    // Prüfe aktuelles Passwort
    if (currentUser.password !== currentPassword) {
      return false
    }

    // Ändere Passwort
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    
    if (userIndex !== -1) {
      users[userIndex].password = newPassword
      users[userIndex].lastPasswordChange = new Date().toISOString()
      users[userIndex].mustChangePassword = false
      
      this.saveUsers(users)
      this.setCurrentUser(users[userIndex])
      return true
    }
    
    return false
  }

  // Erstelle Benutzer mit temporärem Passwort
  createUserWithTempPassword(email: string, name: string, tempPassword: string): User | null {
    const users = this.getUsers()
    
    // Prüfe ob Email bereits existiert
    if (users.find(u => u.email === email)) {
      return null
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password: tempPassword,
      name,
      createdAt: new Date().toISOString(),
      mustChangePassword: true, // Zwinge Passwort-Änderung
      stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        completedExams: 0,
        totalLearningTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0,
        level: 1,
        xp: 0,
        xpToNextLevel: 100
      },
      chapterProgress: [
        { name: 'PBefG', progress: 0, total: 46, completed: 0 },
        { name: 'BOKraft', progress: 0, total: 29, completed: 0 },
        { name: 'Straßenverkehrsrecht', progress: 0, total: 31, completed: 0 },
        { name: 'Umweltschutz', progress: 0, total: 12, completed: 0 },
        { name: 'Versicherungen', progress: 0, total: 13, completed: 0 },
        { name: 'Kaufmännische Verwaltung', progress: 0, total: 117, completed: 0 },
        { name: 'Grenzverkehr', progress: 0, total: 4, completed: 0 },
        { name: 'Kalkulation', progress: 0, total: 2, completed: 0 },
        { name: 'Verbände', progress: 0, total: 1, completed: 0 }
      ],
      achievements: [],
      recentActivity: []
    }

    users.push(newUser)
    this.saveUsers(users)
    return newUser
  }
}

export const db = new LocalDB()
export type { User }
