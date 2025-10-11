import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('🔥 GET /api/stripe/verify-session called')
  
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')
    
    console.log('📋 Session ID:', sessionId)

    if (!sessionId) {
      console.log('❌ No session ID provided')
      return NextResponse.json(
        { 
          success: false,
          error: 'Session ID ist erforderlich' 
        },
        { status: 400 }
      )
    }

    // For testing purposes, return mock data for test session
    if (sessionId === 'test123') {
      console.log('✅ Returning mock data for test session')
      return NextResponse.json({
        success: true,
        id: sessionId,
        customer_email: 'test@example.com',
        amount_total: 2999,
        currency: 'eur',
        payment_status: 'paid',
        metadata: {
          plan: 'premium'
        }
      })
    }

    // In production, verify with Stripe API
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const session = await stripe.checkout.sessions.retrieve(sessionId)
    // return NextResponse.json(session)

    console.log('❌ Session not found')
    return NextResponse.json(
      { 
        success: false,
        error: 'Session nicht gefunden' 
      },
      { status: 404 }
    )
  } catch (error) {
    console.error('❌ Stripe verify session error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Fehler beim Verifizieren der Session' 
      },
      { status: 500 }
    )
  }
}