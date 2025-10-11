import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

// Import shared user storage
import { users } from '@/lib/user-storage'

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production-to-random-secret'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validierung
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email und Passwort erforderlich' },
        { status: 400 }
      )
    }

    // User suchen (in-memory oder später DB)
    const user = users.get(email.toLowerCase())

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Benutzer nicht gefunden. Bitte registriere dich zuerst unter /pricing' 
        },
        { status: 404 }
      )
    }

    // Passwort prüfen (bcrypt compare)
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Falsches Passwort' },
        { status: 401 }
      )
    }

    // Account aktiv? (Check ob Subscription noch läuft)
    if (!user.isActive) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Account ist gesperrt. Bitte zahle offene Rechnungen unter /profile/billing' 
        },
        { status: 403 }
      )
    }

    // Check Subscription End Date (only for non-premium users)
    if (user.subscriptionEndDate && !user.isPremium && new Date(user.subscriptionEndDate) < new Date()) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dein Premium-Zugang ist abgelaufen. Verlängere jetzt unter /pricing' 
        },
        { status: 403 }
      )
    }

    // JWT Token erstellen (30 Tage gültig)
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // User-Daten zurückgeben (OHNE Passwort!)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      plan: user.isPremium ? 'premium' : 'free',
      isActive: user.isActive,
      isPremium: user.isPremium,
      subscriptionEndDate: user.subscriptionEndDate
    }

    return NextResponse.json({
      success: true,
      message: 'Login erfolgreich',
      token,
      user: userData
    })

    return NextResponse.json(
      { error: 'Ungültige Anmeldedaten' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
