/**
 * Test Script: Hole Stripe Price IDs von Produkten
 */

require('dotenv').config({ path: '.env.local' })

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function getPriceIds() {
  try {
    console.log('🔍 Suche nach Price IDs...\n')

    // Hole alle Prices
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
      expand: ['data.product'],
    })

    const starterProductId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRODUCT_ID
    const monthlyProductId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRODUCT_ID
    const yearlyProductId = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRODUCT_ID

    console.log('📦 Produkt IDs aus .env.local:')
    console.log('Starter:', starterProductId)
    console.log('Monthly:', monthlyProductId)
    console.log('Yearly:', yearlyProductId)
    console.log('\n📋 Gefundene Prices:\n')

    const starterPrices = prices.data.filter(p => p.product === starterProductId)
    const monthlyPrices = prices.data.filter(p => p.product === monthlyProductId)
    const yearlyPrices = prices.data.filter(p => p.product === yearlyProductId)

    if (starterPrices.length > 0) {
      console.log('✅ STARTER:')
      starterPrices.forEach(p => {
        console.log(`   Price ID: ${p.id}`)
        console.log(`   Amount: €${(p.unit_amount / 100).toFixed(2)}`)
        console.log(`   Type: ${p.type}`)
        console.log('')
      })
    } else {
      console.log('❌ STARTER: Keine Prices gefunden!')
      console.log('   Erstelle Price in Stripe Dashboard für:', starterProductId)
      console.log('')
    }

    if (monthlyPrices.length > 0) {
      console.log('✅ MONTHLY:')
      monthlyPrices.forEach(p => {
        console.log(`   Price ID: ${p.id}`)
        console.log(`   Amount: €${(p.unit_amount / 100).toFixed(2)}`)
        console.log(`   Type: ${p.type}`)
        console.log(`   Recurring: ${p.recurring?.interval}`)
        console.log('')
      })
    } else {
      console.log('❌ MONTHLY: Keine Prices gefunden!')
      console.log('   Erstelle Price in Stripe Dashboard für:', monthlyProductId)
      console.log('')
    }

    if (yearlyPrices.length > 0) {
      console.log('✅ YEARLY:')
      yearlyPrices.forEach(p => {
        console.log(`   Price ID: ${p.id}`)
        console.log(`   Amount: €${(p.unit_amount / 100).toFixed(2)}`)
        console.log(`   Type: ${p.type}`)
        console.log(`   Recurring: ${p.recurring?.interval}`)
        console.log('')
      })
    } else {
      console.log('❌ YEARLY: Keine Prices gefunden!')
      console.log('   Erstelle Price in Stripe Dashboard für:', yearlyProductId)
      console.log('')
    }

    console.log('\n📝 NÄCHSTE SCHRITTE:')
    console.log('1. Gehe zu: https://dashboard.stripe.com/test/products')
    console.log('2. Für JEDES Produkt:')
    console.log('   - Öffne Produkt')
    console.log('   - Klicke "+ Add pricing"')
    console.log('   - Trage Preis ein')
    console.log('   - Klicke "Save"')
    console.log('3. Führe dieses Script erneut aus\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

getPriceIds()
