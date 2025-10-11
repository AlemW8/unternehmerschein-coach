import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// In-Memory Storage für Demo (später Prisma DB)
const progressStore = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    // Get session (optional for now, später required)
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'anonymous'

    // Get user progress
    const userProgress = progressStore.get(userId) || {
      userId,
      categories: {},
      totalQuestions: 0,
      correctAnswers: 0,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      progress: userProgress
    })

  } catch (error) {
    console.error('Progress GET error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen des Fortschritts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'anonymous'

    const body = await request.json()
    const { category, questionId, isCorrect, timeSpent } = body

    // Get or create user progress
    let userProgress = progressStore.get(userId) || {
      userId,
      categories: {},
      totalQuestions: 0,
      correctAnswers: 0,
      lastUpdated: new Date().toISOString()
    }

    // Initialize category if not exists
    if (!userProgress.categories[category]) {
      userProgress.categories[category] = {
        completed: [],
        correct: 0,
        wrong: 0,
        totalTime: 0
      }
    }

    // Update category progress
    const categoryProgress = userProgress.categories[category]
    
    if (!categoryProgress.completed.includes(questionId)) {
      categoryProgress.completed.push(questionId)
      userProgress.totalQuestions++
    }

    if (isCorrect) {
      categoryProgress.correct++
      userProgress.correctAnswers++
    } else {
      categoryProgress.wrong++
    }

    if (timeSpent) {
      categoryProgress.totalTime += timeSpent
    }

    userProgress.lastUpdated = new Date().toISOString()

    // Save progress
    progressStore.set(userId, userProgress)

    return NextResponse.json({
      success: true,
      message: 'Fortschritt gespeichert',
      progress: userProgress
    })

  } catch (error) {
    console.error('Progress POST error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Speichern des Fortschritts' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'anonymous'

    const body = await request.json()
    const { progress } = body

    // Update complete progress
    progressStore.set(userId, {
      ...progress,
      userId,
      lastUpdated: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Fortschritt aktualisiert'
    })

  } catch (error) {
    console.error('Progress PUT error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Fortschritts' },
      { status: 500 }
    )
  }
}
