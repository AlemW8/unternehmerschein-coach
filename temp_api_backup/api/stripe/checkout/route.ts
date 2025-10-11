import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    // Validierung
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID ist erforderlich' },
        { status: 400 }
      )
    }

    // Hole Price Info um mode zu bestimmen
    const price = await stripe.prices.retrieve(priceId)
    const isRecurring = price.type === 'recurring'
    
    // Erstelle Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? 'subscription' : 'payment', // Dynamisch: subscription oder payment
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        plan: isRecurring ? 'premium_subscription' : 'premium_one_time',
      },
      success_url: `https://unternehmerschein-coach-gpla.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://unternehmerschein-coach-gpla.vercel.app/pricing?canceled=true`,
      allow_promotion_codes: true, // Rabatt-Codes erlauben
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
