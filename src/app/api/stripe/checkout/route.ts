import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { priceId, email, name } = await request.json()

    // Validierung
    if (!priceId || !email) {
      return NextResponse.json(
        { error: 'Price ID und Email sind erforderlich' },
        { status: 400 }
      )
    }

    // Hole Price Info um mode zu bestimmen
    const price = await stripe.prices.retrieve(priceId)
    const isRecurring = price.type === 'recurring'
    
    // Erstelle Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? 'subscription' : 'payment', // Dynamisch: subscription oder payment
      payment_method_types: ['card', 'paypal', 'sepa_debit'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        customerName: name || '',
        plan: isRecurring ? 'premium_subscription' : 'premium_one_time',
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/complete-registration?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      allow_promotion_codes: true, // Rabatt-Codes erlauben
      billing_address_collection: 'required',
      tax_id_collection: {
        enabled: true, // USt-ID für Firmenkunden
      },
      automatic_tax: {
        enabled: true, // Automatische Steuerberechnung
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Fehler beim Erstellen der Checkout-Session' },
      { status: 500 }
    )
  }
}
