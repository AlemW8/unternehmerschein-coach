import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function createSuperAdmin() {
  console.log('🔑 Creating Super Admin Account...')

  try {
    // Hash the password
    const hashedPassword = await hash('mera4711', 12)

    // Create or update super admin user
    const superAdmin = await prisma.user.upsert({
      where: { email: 'aleemwaqar@outlook.com' },
      update: {
        role: 'ADMIN',
        name: 'Super Admin',
        password: hashedPassword
      },
      create: {
        email: 'aleemwaqar@outlook.com',
        name: 'Super Admin',
        role: 'ADMIN',
        password: hashedPassword
      }
    })

    console.log('✅ Super Admin Account Created!')
    console.log(`📧 Email: ${superAdmin.email}`)
    console.log(`🔐 Password: mera4711`)
    console.log(`👑 Role: ${superAdmin.role}`)

    // Create demo user as well
    const demoPassword = await hash('demo123', 12)
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@FahrGewerbe.de' },
      update: {
        password: demoPassword,
        name: 'Demo User'
      },
      create: {
        email: 'demo@FahrGewerbe.de',
        name: 'Demo User',
        role: 'USER',
        password: demoPassword
      }
    })

    console.log('🎭 Demo User Created!')
    console.log(`📧 Email: ${demoUser.email}`)
    console.log(`🔐 Password: demo123`)

  } catch (error) {
    console.error('❌ Error creating super admin:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

createSuperAdmin()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
