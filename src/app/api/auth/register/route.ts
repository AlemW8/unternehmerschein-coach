/**
 * API Route: /api/auth/register
 * Registrierung für neue Benutzer (VOR Zahlung)
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// In-Memory Storage (temporär - später Prisma/Supabase)
const users = new Map<string, any>()

// Admin Account (bereits vorhanden)
const adminEmail = 'aleemwaqar@outlook.com'
const adminPasswordHash = bcrypt.hashSync('mera4711', 10)
users.set(adminEmail, {
  id: 'admin-1',
  email: adminEmail,
  password: adminPasswordHash,
  name: 'Admin',
  role: 'ADMIN',
  isActive: true,
  createdAt: new Date().toISOString(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    // Validierung
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, Passwort und Name sind erforderlich' },
        { status: 400 }
      )
    }

    // Email Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige Email-Adresse' },
        { status: 400 }
      )
    }

    // Passwort Stärke prüfen
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Passwort muss mindestens 8 Zeichen lang sein' },
        { status: 400 }
      )
    }

    // Prüfen ob Email bereits existiert
    const existingUser = users.get(email.toLowerCase())
    if (existingUser) {
      return NextResponse.json(
        { error: 'Diese Email-Adresse ist bereits registriert' },
        { status: 409 }
      )
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10)

    // Neuen User erstellen
    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'USER',
      isActive: true,
      subscriptionStatus: 'pending', // Wird nach Zahlung auf 'active' gesetzt
      subscriptionEndDate: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // User speichern
    users.set(email.toLowerCase(), newUser)

    // JWT Token erstellen
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || 'fallback-secret-change-in-production',
      { expiresIn: '30d' }
    )

    // Passwort aus Response entfernen
    const { password: _, ...userWithoutPassword } = newUser

    console.log('✅ Neuer User registriert:', email)

    return NextResponse.json(
      {
        success: true,
        message: 'Registrierung erfolgreich! Du kannst dich jetzt einloggen.',
        user: userWithoutPassword,
        token,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Registration Error:', error)
    return NextResponse.json(
      { error: 'Registrierung fehlgeschlagen. Bitte versuche es später erneut.' },
      { status: 500 }
    )
  }
}

// Export users Map für andere Module (Webhook, Login)
export { users }
