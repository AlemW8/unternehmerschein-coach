import { NextRequest, NextResponse } from 'next/server'

// Questions endpoint für Mobile Apps
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Load questions from JSON file
    const fs = require('fs')
    const path = require('path')
    const questionsPath = path.join(process.cwd(), 'public', 'data', 'questions.json')
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'))

    if (category) {
      // Return specific category
      const categoryQuestions = questionsData[category] || []
      return NextResponse.json({
        success: true,
        category,
        questions: categoryQuestions,
        count: categoryQuestions.length
      })
    }

    // Return all questions
    const allCategories = Object.keys(questionsData)
    const totalQuestions = Object.values(questionsData).flat().length

    return NextResponse.json({
      success: true,
      categories: allCategories,
      totalQuestions,
      data: questionsData
    })

  } catch (error) {
    console.error('Questions API error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Fragen' },
      { status: 500 }
    )
  }
}

// POST - für spezifische Fragen-Anfragen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { categories, limit, random } = body

    const fs = require('fs')
    const path = require('path')
    const questionsPath = path.join(process.cwd(), 'public', 'data', 'questions.json')
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'))

    let questions: any[] = []

    if (categories && Array.isArray(categories)) {
      // Get questions from specific categories
      categories.forEach((cat: string) => {
        if (questionsData[cat]) {
          questions = [...questions, ...questionsData[cat]]
        }
      })
    } else {
      // Get all questions
      questions = Object.values(questionsData).flat()
    }

    // Random shuffle if requested
    if (random) {
      questions = questions.sort(() => Math.random() - 0.5)
    }

    // Limit if requested
    if (limit && limit > 0) {
      questions = questions.slice(0, limit)
    }

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length
    })

  } catch (error) {
    console.error('Questions POST error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Fragen' },
      { status: 500 }
    )
  }
}
