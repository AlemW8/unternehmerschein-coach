/**
 * API Route: /api/stripe/verify-session
 * Verifiziert Stripe Checkout Session nach Zahlung
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID fehlt' },
        { status: 400 }
      )
    }

    // Hole Session von Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer'],
    })

    // Prüfe ob Zahlung erfolgreich
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Zahlung noch nicht abgeschlossen' },
        { status: 400 }
      )
    }

    // Extrahiere Infos
    const customer = session.customer as Stripe.Customer | null
    const lineItems = session.line_items?.data[0]
    const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      customerId: customer?.id || 'guest',
      email: session.customer_email || customer?.email || '',
      name: session.customer_details?.name || '',
      plan: lineItems?.description || 'Premium',
      amount,
      currency: session.currency?.toUpperCase() || 'EUR',
      paymentStatus: session.payment_status,
    })
  } catch (error: any) {
    console.error('❌ Verify Session Error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verifizieren der Sitzung', message: error.message },
      { status: 500 }
    )
  }
}
