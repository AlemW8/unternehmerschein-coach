// Shared user storage for the application
// This avoids circular imports between auth.ts and register route

import bcrypt from 'bcryptjs'

// In-Memory User Storage (temporär - später Prisma/Supabase)
export const users = new Map<string, any>()

// Admin Account initialisieren
async function initializeAdminAccount() {
  if (!users.has('aleemwaqar@outlook.com')) {
    const hashedPassword = await bcrypt.hash('mera4711', 10)
    users.set('aleemwaqar@outlook.com', {
      id: 'admin-1',
      email: 'aleemwaqar@outlook.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      isActive: true,
      isPremium: true,
      subscriptionStatus: 'active',
      createdAt: new Date().toISOString(),
    })
    console.log('✅ Admin account initialized')
  }
}

// Admin Account beim Import automatisch initialisieren
initializeAdminAccount()

export { initializeAdminAccount }
