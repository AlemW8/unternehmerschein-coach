import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || !name) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email und Name sind erforderlich' 
        },
        { status: 400 }
      )
    }

    console.log('🧪 Testing email to:', email)

    const loginUrl = `${process.env.NEXTAUTH_URL || 'https://unternehmerschein-coach-gpla.vercel.app'}/auth/signin`
    const result = await sendWelcomeEmail(email, name, loginUrl)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test-E-Mail erfolgreich versendet!'
      })
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'E-Mail konnte nicht versendet werden',
          details: result.error
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('❌ Email test error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Fehler beim Testen der E-Mail',
        details: error.message
      },
      { status: 500 }
    )
  }
}
