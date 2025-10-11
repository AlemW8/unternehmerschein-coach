import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// In-Memory Storage für Demo
const achievementStore = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email || 'anonymous'

    const userAchievements = achievementStore.get(userId) || {
      userId,
      unlocked: [],
      progress: {},
      totalScore: 0,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      achievements: userAchievements
    })

  } catch (error) {
    console.error('Achievements GET error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Achievements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email || 'anonymous'

    const body = await request.json()
    const { achievementId, progress } = body

    let userAchievements = achievementStore.get(userId) || {
      userId,
      unlocked: [],
      progress: {},
      totalScore: 0,
      lastUpdated: new Date().toISOString()
    }

    // Update progress
    if (progress !== undefined) {
      userAchievements.progress[achievementId] = progress
    }

    // Check if achievement should be unlocked
    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId)
    if (achievement && progress >= achievement.maxProgress && !userAchievements.unlocked.includes(achievementId)) {
      userAchievements.unlocked.push(achievementId)
      userAchievements.totalScore += achievement.points
      userAchievements.lastUpdated = new Date().toISOString()
    }

    achievementStore.set(userId, userAchievements)

    return NextResponse.json({
      success: true,
      message: progress >= achievement?.maxProgress ? 'Achievement freigeschaltet!' : 'Fortschritt aktualisiert',
      achievements: userAchievements
    })

  } catch (error) {
    console.error('Achievements POST error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Speichern des Achievements' },
      { status: 500 }
    )
  }
}

// Achievement Definitions
const ACHIEVEMENTS = [
  { id: 'first_question', maxProgress: 1, points: 10 },
  { id: 'ten_questions', maxProgress: 10, points: 10 },
  { id: 'pbefg_complete', maxProgress: 70, points: 10 },
  { id: 'bokraft_complete', maxProgress: 20, points: 10 },
  { id: 'strassenverkehrsrecht_complete', maxProgress: 30, points: 10 },
  { id: 'umweltschutz_complete', maxProgress: 25, points: 10 },
  { id: 'versicherungen_complete', maxProgress: 25, points: 10 },
  { id: 'grenzverkehr_complete', maxProgress: 20, points: 10 },
  { id: 'kalkulation_complete', maxProgress: 25, points: 10 },
  { id: 'kaufmaennische_complete', maxProgress: 25, points: 10 },
  { id: 'verbaende_complete', maxProgress: 15, points: 10 },
  { id: 'fifty_questions', maxProgress: 50, points: 25 },
  { id: 'three_categories', maxProgress: 3, points: 25 },
  { id: 'five_days_streak', maxProgress: 5, points: 25 },
  { id: 'hundred_questions', maxProgress: 100, points: 50 },
  { id: 'six_categories', maxProgress: 6, points: 50 },
  { id: 'perfect_exam', maxProgress: 1, points: 50 },
  { id: 'all_categories', maxProgress: 9, points: 100 },
  { id: 'all_questions', maxProgress: 255, points: 100 },
  { id: 'exam_master', maxProgress: 10, points: 100 }
]
