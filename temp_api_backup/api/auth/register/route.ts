/**
 * API Route: /api/auth/register
 * Registrierung für neue Benutzer (VOR Zahlung)
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendWelcomeEmail } from '@/lib/email'

// Import shared user storage
import { users } from '@/lib/user-storage'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, isPremium, sessionId } = body

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

    // Passwort Stärke prüfen (weniger streng für Post-Payment-Registrierung)
    const minPasswordLength = isPremium ? 6 : 8
    if (password.length < minPasswordLength) {
      return NextResponse.json(
        { error: `Passwort muss mindestens ${minPasswordLength} Zeichen lang sein` },
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
      subscriptionStatus: isPremium ? 'active' : 'pending', // Premium-Nutzer sofort aktiv
      subscriptionEndDate: isPremium ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null, // 1 Jahr Premium
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripeSessionId: sessionId || null, // Stripe Session ID für Referenz
      isPremium: isPremium || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // User speichern
    users.set(email.toLowerCase(), newUser)

    // Welcome E-Mail senden (nur für Premium-User)
    if (isPremium) {
      try {
        const loginUrl = `${process.env.NEXTAUTH_URL || 'https://unternehmerschein-coach-gpla.vercel.app'}/auth/signin`
        await sendWelcomeEmail(email, name, loginUrl)
        console.log('✅ Welcome email sent to:', email)
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError)
        // Don't fail registration if email fails
      }
    }

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

    const successMessage = isPremium 
      ? 'Premium-Registrierung erfolgreich! Sie werden automatisch angemeldet.'
      : 'Registrierung erfolgreich! Du kannst dich jetzt einloggen.'

    console.log(`✅ ${isPremium ? 'Premium-' : ''}User registriert:`, email)

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
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
