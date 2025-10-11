import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail, sendPaymentFailedEmail } from '@/lib/sendgrid'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Temporary user storage (later: Prisma/Supabase)
const users = new Map()

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session)
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      await handlePaymentSucceeded(invoice)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await handlePaymentFailed(invoice)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await handleSubscriptionCanceled(subscription)
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      await handleSubscriptionUpdated(subscription)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// ============================================
// CHECKOUT COMPLETED - Create User & Send Email
// ============================================
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const email = session.customer_email!
    const name = session.metadata?.customerName || email.split('@')[0]

    // Generiere sicheres Passwort
    const password = generatePassword()
    const hashedPassword = await bcrypt.hash(password, 10)

    // Erstelle User Account
    const userId = `user_${Date.now()}`
    const user = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      role: 'USER',
      plan: 'premium',
      isActive: true,
      subscriptionId: null,
      subscriptionEndDate: null,
      stripeCustomerId: session.customer as string,
      createdAt: new Date().toISOString(),
    }

    users.set(email, user)

    // Erstelle Subscription für monatliche Zahlungen (ab Monat 3)
    const subscription = await stripe.subscriptions.create({
      customer: session.customer as string,
      items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID!, // Monthly Price ID
        },
      ],
      trial_end: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60, // 60 Tage Trial (2 Monate)
      metadata: {
        userId,
        minimumTerm: new Date(Date.now() + 60 * 60 * 24 * 60 * 1000).toISOString(), // 2 Monate Mindestlaufzeit
      },
    })

    // Update user with subscription info
    user.subscriptionId = subscription.id
    user.subscriptionEndDate = new Date(subscription.current_period_end * 1000).toISOString()
    users.set(email, user)

    // Sende Welcome Email mit Login-Daten via SendGrid
    await sendWelcomeEmail(
      email,
      name,
      password,
      'Premium Starter (2 Monate)',
      '€49.99'
    )

    console.log(`✅ User created: ${email}`)
  } catch (error) {
    console.error('Error handling checkout completion:', error)
  }
}

// ============================================
// PAYMENT SUCCEEDED - Update Subscription
// ============================================
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = invoice.subscription as string
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    // Find user by stripe customer ID
    const user = Array.from(users.values()).find(
      (u) => u.stripeCustomerId === invoice.customer
    )

    if (user) {
      user.subscriptionEndDate = new Date(subscription.current_period_end * 1000).toISOString()
      user.isActive = true
      users.set(user.email, user)
      console.log(`✅ Payment succeeded for: ${user.email}`)
    }
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

// ============================================
// PAYMENT FAILED - Send Reminder
// ============================================
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const user = Array.from(users.values()).find(
      (u) => u.stripeCustomerId === invoice.customer
    )

    if (user) {
      // Sende Zahlungserinnerung via SendGrid
      await sendPaymentFailedEmail(
        user.email,
        user.name,
        1, // Erster Versuch
        7, // 7 Tage bis Sperrung
        `${process.env.NEXT_PUBLIC_APP_URL}/profile/billing`
      )

      console.log(`⚠️ Payment failed reminder sent to: ${user.email}`)
    }
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

// ============================================
// SUBSCRIPTION CANCELED
// ============================================
async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  try {
    const user = Array.from(users.values()).find(
      (u) => u.subscriptionId === subscription.id
    )

    if (user) {
      user.isActive = false
      user.subscriptionId = null
      users.set(user.email, user)
      console.log(`❌ Subscription canceled for: ${user.email}`)
    }
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

// ============================================
// SUBSCRIPTION UPDATED
// ============================================
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const user = Array.from(users.values()).find(
      (u) => u.subscriptionId === subscription.id
    )

    if (user) {
      user.subscriptionEndDate = new Date(subscription.current_period_end * 1000).toISOString()
      user.isActive = subscription.status === 'active'
      users.set(user.email, user)
      console.log(`🔄 Subscription updated for: ${user.email}`)
    }
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

// ============================================
// HELPER: Generate Password
// ============================================
function generatePassword(length = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}
