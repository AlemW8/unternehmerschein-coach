/**
 * API Route: /api/stripe/get-prices
 * Holt Price IDs automatisch von Stripe Produkten
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(req: NextRequest) {
  try {
    // Produkt IDs aus .env.local
    const starterProductId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRODUCT_ID!
    const monthlyProductId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRODUCT_ID!
    const yearlyProductId = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRODUCT_ID!

    // Hole alle Prices von Stripe
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
    })

    // Finde die richtigen Price IDs für jedes Produkt
    const starterPrice = prices.data.find((p) => p.product === starterProductId)
    const monthlyPrice = prices.data.find((p) => p.product === monthlyProductId)
    const yearlyPrice = prices.data.find((p) => p.product === yearlyProductId)

    if (!starterPrice || !monthlyPrice || !yearlyPrice) {
      return NextResponse.json(
        {
          error: 'Nicht alle Price IDs gefunden. Bitte erstelle Prices in Stripe Dashboard.',
          found: {
            starter: !!starterPrice,
            monthly: !!monthlyPrice,
            yearly: !!yearlyPrice,
          },
        },
        { status: 404 }
      )
    }

    // Rückgabe mit allen Infos
    const result = {
      starter: {
        priceId: starterPrice.id,
        amount: starterPrice.unit_amount! / 100,
        currency: starterPrice.currency.toUpperCase(),
        productId: starterProductId,
      },
      monthly: {
        priceId: monthlyPrice.id,
        amount: monthlyPrice.unit_amount! / 100,
        currency: monthlyPrice.currency.toUpperCase(),
        productId: monthlyProductId,
      },
      yearly: {
        priceId: yearlyPrice.id,
        amount: yearlyPrice.unit_amount! / 100,
        currency: yearlyPrice.currency.toUpperCase(),
        productId: yearlyProductId,
      },
    }

    console.log('✅ Stripe Price IDs geholt:', result)

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error('❌ Stripe Price API Error:', error)
    return NextResponse.json(
      {
        error: 'Fehler beim Abrufen der Stripe Prices',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
