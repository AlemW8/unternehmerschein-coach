import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

interface QuestionData {
  id: number
  kapitel: string
  frage: string
  antwort: string
  tags: string[]
}

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Read questions from JSON file
    const questionsPath = path.join(process.cwd(), 'data', 'questions.json')
    const questionsData = fs.readFileSync(questionsPath, 'utf-8')
    const questions: QuestionData[] = JSON.parse(questionsData)

    console.log(`📚 Found ${questions.length} questions to seed`)

    // Clear existing questions
    console.log('🗑️  Clearing existing questions...')
    await prisma.question.deleteMany()

    // Seed questions
    console.log('📝 Seeding questions...')
    const createdQuestions = await prisma.question.createMany({
      data: questions.map(q => ({
        id: q.id,
        kapitel: q.kapitel,
        frage: q.frage,
        antwort: q.antwort,
        tags: q.tags
      }))
    })

    console.log(`✅ Created ${createdQuestions.count} questions`)

    // Create admin user if not exists
    console.log('👤 Checking for admin user...')
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@unternehmerschein-coach.de' },
      update: {},
      create: {
        email: 'admin@unternehmerschein-coach.de',
        name: 'Admin User',
        role: 'ADMIN'
      }
    })

    console.log(`👤 Admin user: ${adminUser.email}`)

    // Create super admin user (aleemwaqar@outlook.com)
    console.log('🔑 Creating super admin user...')
    const superAdminUser = await prisma.user.upsert({
      where: { email: 'aleemwaqar@outlook.com' },
      update: {
        role: 'ADMIN',
        name: 'Super Admin'
      },
      create: {
        email: 'aleemwaqar@outlook.com',
        name: 'Super Admin',
        role: 'ADMIN'
      }
    })

    console.log(`🔑 Super Admin user: ${superAdminUser.email}`)

    // Create test user if not exists
    console.log('🧪 Creating test user...')
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER'
      }
    })

    // Create test subscription
    await prisma.subscription.upsert({
      where: { userId: testUser.id },
      update: {},
      create: {
        userId: testUser.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    })

    console.log(`🧪 Test user: ${testUser.email}`)

    // Create some sample progress for test user
    console.log('📊 Creating sample progress...')
    const sampleQuestions = questions.slice(0, 10) // First 10 questions
    
    await prisma.progress.createMany({
      data: sampleQuestions.map((q, index) => ({
        userId: testUser.id,
        questionId: q.id,
        ease: 2.5 + (Math.random() - 0.5), // Random ease around 2.5
        interval: Math.floor(Math.random() * 10) + 1, // Random interval 1-10
        repetitions: Math.floor(Math.random() * 5), // Random repetitions 0-4
        correct: Math.floor(Math.random() * 5),
        wrong: Math.floor(Math.random() * 3),
        lastReviewedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last week
        nextReviewAt: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in next week
      })),
      skipDuplicates: true
    })

    // Create sample exam session
    console.log('🎯 Creating sample exam session...')
    await prisma.examSession.create({
      data: {
        userId: testUser.id,
        startedAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        finishedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        score: 85.5,
        kapitel: 'PBefG',
        items: sampleQuestions.slice(0, 5).map(q => ({
          questionId: q.id,
          selectedAnswer: q.antwort,
          correctAnswer: q.antwort,
          isCorrect: Math.random() > 0.2, // 80% correct rate
          timeSpent: Math.random() * 120000 // Random time up to 2 minutes
        }))
      }
    })

    console.log('✨ Database seeding completed successfully!')

    // Print summary
    const totalQuestions = await prisma.question.count()
    const totalUsers = await prisma.user.count()
    const totalProgress = await prisma.progress.count()
    const totalSessions = await prisma.examSession.count()

    console.log('\n📈 Database Summary:')
    console.log(`Questions: ${totalQuestions}`)
    console.log(`Users: ${totalUsers}`)
    console.log(`Progress entries: ${totalProgress}`)
    console.log(`Exam sessions: ${totalSessions}`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
