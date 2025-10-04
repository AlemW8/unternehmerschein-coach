import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: 'bronze' | 'silver' | 'gold' | 'platinum'
  category?: string
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

export interface AchievementStore {
  achievements: Achievement[]
  unlockedAchievements: string[]
  
  // Actions
  unlockAchievement: (achievementId: string) => void
  updateProgress: (achievementId: string, progress: number) => void
  getUnlockedAchievements: () => Achievement[]
  getLockedAchievements: () => Achievement[]
  getTotalScore: () => number
}

// Alle verfügbaren Achievements
const ALL_ACHIEVEMENTS: Achievement[] = [
  // Bronze - Erste Schritte
  {
    id: 'first_question',
    title: 'Erste Schritte',
    description: 'Beantworte deine erste Frage',
    icon: '🎯',
    type: 'bronze',
    maxProgress: 1
  },
  {
    id: 'ten_questions',
    title: 'Auf dem Weg',
    description: 'Beantworte 10 Fragen korrekt',
    icon: '📚',
    type: 'bronze',
    maxProgress: 10
  },
  
  // Bronze - Kategorie-Abschlüsse
  {
    id: 'pbefg_complete',
    title: 'PBefG Meister',
    description: 'Schließe alle PBefG Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'pbefg',
    maxProgress: 70
  },
  {
    id: 'bokraft_complete',
    title: 'BOKraft Profi',
    description: 'Schließe alle BOKraft Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'bokraft',
    maxProgress: 20
  },
  {
    id: 'strassenverkehrsrecht_complete',
    title: 'Verkehrsrecht Experte',
    description: 'Schließe alle Straßenverkehrsrecht Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'strassenverkehrsrecht',
    maxProgress: 30
  },
  {
    id: 'umweltschutz_complete',
    title: 'Umwelt-Champion',
    description: 'Schließe alle Umweltschutz Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'umweltschutz',
    maxProgress: 25
  },
  {
    id: 'versicherungen_complete',
    title: 'Versicherungs-Kenner',
    description: 'Schließe alle Versicherungs Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'versicherungen',
    maxProgress: 25
  },
  {
    id: 'grenzverkehr_complete',
    title: 'Grenzüberschreiter',
    description: 'Schließe alle Grenzverkehr Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'grenzverkehr',
    maxProgress: 20
  },
  {
    id: 'kalkulation_complete',
    title: 'Kalkulations-Ass',
    description: 'Schließe alle Kalkulation Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'kalkulation',
    maxProgress: 25
  },
  {
    id: 'kaufmaennische_complete',
    title: 'Kaufmann',
    description: 'Schließe alle Kaufmännische Verwaltung Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'kaufmaennische-verwaltung',
    maxProgress: 25
  },
  {
    id: 'verbaende_complete',
    title: 'Verbands-Kenner',
    description: 'Schließe alle Verbände & Zentralen Fragen ab',
    icon: '🥉',
    type: 'bronze',
    category: 'verbaende-zentralen',
    maxProgress: 15
  },
  
  // Silber - Größere Meilensteine
  {
    id: 'fifty_questions',
    title: 'Fleißiger Lerner',
    description: 'Beantworte 50 Fragen korrekt',
    icon: '🥈',
    type: 'silver',
    maxProgress: 50
  },
  {
    id: 'three_categories',
    title: 'Vielseitig',
    description: 'Schließe 3 Kategorien ab',
    icon: '🥈',
    type: 'silver',
    maxProgress: 3
  },
  {
    id: 'five_days_streak',
    title: 'Konsequent',
    description: 'Lerne 5 Tage am Stück',
    icon: '🥈',
    type: 'silver',
    maxProgress: 5
  },
  
  // Gold - Große Erfolge
  {
    id: 'hundred_questions',
    title: 'Hundertschaft',
    description: 'Beantworte 100 Fragen korrekt',
    icon: '🥇',
    type: 'gold',
    maxProgress: 100
  },
  {
    id: 'six_categories',
    title: 'Fast geschafft',
    description: 'Schließe 6 Kategorien ab',
    icon: '🥇',
    type: 'gold',
    maxProgress: 6
  },
  {
    id: 'perfect_exam',
    title: 'Perfekt',
    description: 'Bestehe eine Prüfung mit 100%',
    icon: '🥇',
    type: 'gold',
    maxProgress: 1
  },
  
  // Platinum - Ultimative Erfolge
  {
    id: 'all_categories',
    title: 'Vollständigkeit',
    description: 'Schließe alle 9 Kategorien ab',
    icon: '💎',
    type: 'platinum',
    maxProgress: 9
  },
  {
    id: 'all_questions',
    title: 'Master',
    description: 'Beantworte alle 255 Fragen korrekt',
    icon: '👑',
    type: 'platinum',
    maxProgress: 255
  },
  {
    id: 'exam_master',
    title: 'Prüfungsmeister',
    description: 'Bestehe 10 Prüfungen',
    icon: '🏆',
    type: 'platinum',
    maxProgress: 10
  }
]

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: ALL_ACHIEVEMENTS,
      unlockedAchievements: [],
      
      unlockAchievement: (achievementId: string) => {
        const { unlockedAchievements, achievements } = get()
        
        if (unlockedAchievements.includes(achievementId)) {
          return // Already unlocked
        }
        
        const achievement = achievements.find(a => a.id === achievementId)
        if (!achievement) return
        
        // Update achievement with unlock date
        const updatedAchievements = achievements.map(a =>
          a.id === achievementId
            ? { ...a, unlockedAt: new Date(), progress: a.maxProgress }
            : a
        )
        
        set({
          unlockedAchievements: [...unlockedAchievements, achievementId],
          achievements: updatedAchievements
        })
        
        // Show notification (optional)
        if (typeof window !== 'undefined') {
          console.log(`🎉 Achievement unlocked: ${achievement.title}`)
        }
      },
      
      updateProgress: (achievementId: string, progress: number) => {
        const { achievements, unlockAchievement } = get()
        
        const achievement = achievements.find(a => a.id === achievementId)
        if (!achievement || !achievement.maxProgress) return
        
        const updatedAchievements = achievements.map(a =>
          a.id === achievementId
            ? { ...a, progress: Math.min(progress, a.maxProgress!) }
            : a
        )
        
        set({ achievements: updatedAchievements })
        
        // Auto-unlock wenn maxProgress erreicht
        if (progress >= achievement.maxProgress) {
          unlockAchievement(achievementId)
        }
      },
      
      getUnlockedAchievements: () => {
        const { achievements, unlockedAchievements } = get()
        return achievements.filter(a => unlockedAchievements.includes(a.id))
      },
      
      getLockedAchievements: () => {
        const { achievements, unlockedAchievements } = get()
        return achievements.filter(a => !unlockedAchievements.includes(a.id))
      },
      
      getTotalScore: () => {
        const unlocked = get().getUnlockedAchievements()
        return unlocked.reduce((score, achievement) => {
          const points = {
            bronze: 10,
            silver: 25,
            gold: 50,
            platinum: 100
          }
          return score + points[achievement.type]
        }, 0)
      }
    }),
    {
      name: 'achievement-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
