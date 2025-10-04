/**
 * API Route: /api/auth/complete-registration
 * Schließt Registrierung nach Zahlung ab
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendOrderConfirmationEmail } from '@/lib/sendgrid'
import { userDB } from '@/lib/user-db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, phone, company, sessionId, stripeCustomerId } = body

    // Validierung
    if (!email || !password || !name || !sessionId) {
      return NextResponse.json(
        { error: 'Name, Email, Passwort und Session ID sind erforderlich' },
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
    const existingUser = await userDB.findByEmail(email.toLowerCase())
    if (existingUser) {
      return NextResponse.json(
        { error: 'Diese Email-Adresse ist bereits registriert' },
        { status: 409 }
      )
    }

    // Neuen User erstellen
    const newUser = await userDB.create({
      email: email.toLowerCase(),
      password,
      name,
      role: 'USER',
      plan: 'PRO', // Nach Zahlung ist es Premium!
      stripeCustomerId
    })

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

    // Sende Bestellbestätigung per Email (KEINE Login-Daten!)
    await sendOrderConfirmationEmail(
      email,
      name,
      'Premium Starter',
      '€49.99'
    )

    // Passwort aus Response entfernen
    const { password: _, ...userWithoutPassword } = newUser

    console.log('✅ Registrierung abgeschlossen für:', email)

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
    console.error('❌ Complete Registration Error:', error)
    return NextResponse.json(
      { error: 'Registrierung fehlgeschlagen. Bitte versuche es später erneut.' },
      { status: 500 }
    )
  }
}

// Erstelle Admin-User beim Server-Start (falls nicht vorhanden)
async function ensureAdminUser() {
  try {
    const adminEmail = 'aleemwaqar@outlook.com'
    const existingAdmin = await userDB.findByEmail(adminEmail)
    
    if (!existingAdmin) {
      await userDB.create({
        email: adminEmail,
        password: 'mera4711',
        name: 'Admin',
        role: 'ADMIN',
        plan: 'TEAM'
      })
      console.log('✅ Admin user created')
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  }
}

// Führe Admin-Setup aus
ensureAdminUser()
