/**
 * API Route: /api/auth/signin
 * User Login mit Email/Passwort
 */

import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { userDB } from '@/lib/user-db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Validierung
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email und Passwort sind erforderlich' },
        { status: 400 }
      )
    }

    // User finden und Passwort prüfen
    const user = await userDB.verifyPassword(email.toLowerCase(), password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Ungültige Email oder Passwort' },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account ist deaktiviert' },
        { status: 403 }
      )
    }

    // JWT Token erstellen
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        plan: user.plan
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    // Response ohne Passwort
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      plan: user.plan,
      isActive: user.isActive
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      token,
      message: 'Login erfolgreich'
    })

  } catch (error) {
    console.error('❌ SignIn Error:', error)
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    )
  }
}
