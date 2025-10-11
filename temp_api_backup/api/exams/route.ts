import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// In-Memory Storage für Exams
const examStore = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email || 'anonymous'

    const userExams = examStore.get(userId) || {
      userId,
      exams: [],
      stats: {
        totalExams: 0,
        averageScore: 0,
        bestScore: 0,
        passRate: 0
      }
    }

    return NextResponse.json({
      success: true,
      exams: userExams
    })

  } catch (error) {
    console.error('Exams GET error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Prüfungen' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email || 'anonymous'

    const body = await request.json()
    const { type, questions, answers, timeSpent } = body

    // Calculate score
    let correctAnswers = 0
    questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / questions.length) * 100)
    const passed = score >= 60

    // Create exam result
    const examResult = {
      id: `exam_${Date.now()}`,
      userId,
      type,
      questions: questions.length,
      correctAnswers,
      score,
      passed,
      timeSpent,
      date: new Date().toISOString()
    }

    // Get user exams
    let userExams = examStore.get(userId) || {
      userId,
      exams: [],
      stats: {
        totalExams: 0,
        averageScore: 0,
        bestScore: 0,
        passRate: 0
      }
    }

    // Add new exam
    userExams.exams.push(examResult)

    // Update stats
    userExams.stats.totalExams = userExams.exams.length
    userExams.stats.bestScore = Math.max(userExams.stats.bestScore, score)
    userExams.stats.averageScore = Math.round(
      userExams.exams.reduce((sum: number, e: any) => sum + e.score, 0) / userExams.exams.length
    )
    userExams.stats.passRate = Math.round(
      (userExams.exams.filter((e: any) => e.passed).length / userExams.exams.length) * 100
    )

    examStore.set(userId, userExams)

    return NextResponse.json({
      success: true,
      message: passed ? 'Prüfung bestanden!' : 'Nicht bestanden',
      result: examResult,
      stats: userExams.stats
    })

  } catch (error) {
    console.error('Exams POST error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Prüfung' },
      { status: 500 }
    )
  }
}
