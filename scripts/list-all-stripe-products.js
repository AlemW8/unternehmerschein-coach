/**
 * Liste ALLE Stripe Produkte und Prices auf
 */

require('dotenv').config({ path: '.env.local' })

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function listAllProducts() {
  try {
    console.log('🔍 Suche ALLE Produkte in deinem Stripe Account...\n')

    // Hole alle Produkte
    const products = await stripe.products.list({
      limit: 100,
      active: true,
    })

    console.log(`📦 Gefundene Produkte: ${products.data.length}\n`)

    if (products.data.length === 0) {
      console.log('❌ KEINE PRODUKTE GEFUNDEN!')
      console.log('Erstelle Produkte in: https://dashboard.stripe.com/test/products\n')
      return
    }

    // Für jedes Produkt: hole die Prices
    for (const product of products.data) {
      console.log('─────────────────────────────────────────')
      console.log(`📦 PRODUKT: ${product.name}`)
      console.log(`   ID: ${product.id}`)
      console.log(`   Beschreibung: ${product.description || 'Keine'}`)
      console.log(`   Aktiv: ${product.active ? '✅' : '❌'}`)

      // Hole Prices für dieses Produkt
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 10,
      })

      if (prices.data.length === 0) {
        console.log(`   💰 PRICES: ❌ Keine gefunden!`)
        console.log(`      → Erstelle Price für ${product.id}`)
      } else {
        console.log(`   💰 PRICES: ${prices.data.length} gefunden`)
        prices.data.forEach((price, i) => {
          console.log(`      ${i + 1}. Price ID: ${price.id}`)
          console.log(`         Betrag: €${(price.unit_amount / 100).toFixed(2)}`)
          console.log(`         Typ: ${price.type}`)
          if (price.recurring) {
            console.log(`         Intervall: ${price.recurring.interval}`)
          }
        })
      }
      console.log('')
    }

    console.log('─────────────────────────────────────────')
    console.log('\n✅ DEINE PRODUKT IDs IN .env.local:')
    console.log(`STARTER: ${process.env.NEXT_PUBLIC_STRIPE_STARTER_PRODUCT_ID}`)
    console.log(`MONTHLY: ${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRODUCT_ID}`)
    console.log(`YEARLY: ${process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRODUCT_ID}`)
    console.log('\n📝 Passen die IDs mit den Produkten oben überein?')
    console.log('Falls NEIN: Aktualisiere die IDs in .env.local\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

listAllProducts()
