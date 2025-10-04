/**
 * SendGrid Email Service
 * Sendet Emails via SendGrid API
 */

import sgMail from '@sendgrid/mail'

// SendGrid API Key setzen
const apiKey = process.env.SENDGRID_API_KEY
if (!apiKey) {
  console.warn('⚠️ SENDGRID_API_KEY fehlt in .env.local')
} else {
  sgMail.setApiKey(apiKey)
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'aleemwaqar@outlook.com'
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'FahrGewerbe Team'

/**
 * Sende Welcome Email mit Login-Daten
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  password: string,
  plan: string,
  price: string
) {
  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: '🎉 Willkommen bei FahrGewerbe!',
      html: generateWelcomeEmailHTML(name, to, password, plan, price),
      text: generateWelcomeEmailText(name, to, password, plan, price),
    }

    await sgMail.send(msg)
    console.log(`✅ Welcome Email gesendet an: ${to}`)
    return { success: true }
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error)
    return { success: false, error }
  }
}

/**
 * Sende Payment Failed Email (Mahnung)
 */
export async function sendPaymentFailedEmail(
  to: string,
  name: string,
  attemptNumber: number,
  daysUntilSuspension: number,
  updatePaymentUrl: string
) {
  try {
    const subject =
      attemptNumber === 1
        ? '⚠️ Zahlung fehlgeschlagen - Bitte Zahlungsmethode aktualisieren'
        : attemptNumber === 2
        ? '🚨 2. Mahnung - Zahlung fehlgeschlagen'
        : '🔴 Letzte Mahnung - Account wird gesperrt'

    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject,
      html: generatePaymentFailedHTML(name, attemptNumber, daysUntilSuspension, updatePaymentUrl),
      text: generatePaymentFailedText(name, attemptNumber, daysUntilSuspension, updatePaymentUrl),
    }

    await sgMail.send(msg)
    console.log(`✅ Payment Failed Email gesendet an: ${to}`)
    return { success: true }
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error)
    return { success: false, error }
  }
}

/**
 * Sende Account Suspended Email
 */
export async function sendAccountSuspendedEmail(to: string, name: string) {
  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: '🔒 Dein FahrGewerbe Account wurde gesperrt',
      html: generateAccountSuspendedHTML(name),
      text: generateAccountSuspendedText(name),
    }

    await sgMail.send(msg)
    console.log(`✅ Account Suspended Email gesendet an: ${to}`)
    return { success: true }
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error)
    return { success: false, error }
  }
}

/**
 * Sende Subscription Cancelled Email
 */
export async function sendSubscriptionCancelledEmail(to: string, name: string, endDate: string) {
  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: '✓ Dein Abo wurde gekündigt',
      html: generateSubscriptionCancelledHTML(name, endDate),
      text: generateSubscriptionCancelledText(name, endDate),
    }

    await sgMail.send(msg)
    console.log(`✅ Subscription Cancelled Email gesendet an: ${to}`)
    return { success: true }
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error)
    return { success: false, error }
  }
}

/**
 * Sende Bestellbestätigung Email (OHNE Login-Daten)
 */
export async function sendOrderConfirmationEmail(
  to: string,
  name: string,
  plan: string,
  price: string
) {
  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: '✅ Bestellbestätigung - FahrGewerbe Premium',
      html: generateOrderConfirmationHTML(name, plan, price),
      text: generateOrderConfirmationText(name, plan, price),
    }

    await sgMail.send(msg)
    console.log(`✅ Bestellbestätigung gesendet an: ${to}`)
    return { success: true }
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error)
    return { success: false, error }
  }
}

// ============================================
// HTML EMAIL TEMPLATES
// ============================================

function generateWelcomeEmailHTML(
  name: string,
  email: string,
  password: string,
  plan: string,
  price: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Willkommen bei FahrGewerbe</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">🎉 Willkommen!</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 18px;">Dein FahrGewerbe Account ist bereit</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                Hallo <strong>${name}</strong>,
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                vielen Dank für deine Zahlung! Dein Account wurde erfolgreich erstellt. 
                Hier sind deine Login-Daten:
              </p>

              <!-- Login Box -->
              <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: bold; text-transform: uppercase;">
                  Deine Login-Daten:
                </p>
                <p style="margin: 0 0 8px 0; color: #111827; font-size: 16px;">
                  <strong>Email:</strong> ${email}
                </p>
                <p style="margin: 0; color: #111827; font-size: 16px;">
                  <strong>Passwort:</strong> <code style="background-color: #e5e7eb; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${password}</code>
                </p>
              </div>

              <!-- Plan Info -->
              <div style="background-color: #ecfdf5; border: 1px solid #10b981; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #065f46; font-size: 14px; font-weight: bold;">
                  📦 Dein Plan:
                </p>
                <p style="margin: 0; color: #047857; font-size: 16px;">
                  <strong>${plan}</strong> - ${price}
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/signin" 
                   style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Jetzt einloggen →
                </a>
              </div>

              <!-- Features -->
              <div style="margin: 30px 0;">
                <p style="color: #374151; font-size: 16px; font-weight: bold; margin: 0 0 15px 0;">
                  Was dich erwartet:
                </p>
                <ul style="color: #6b7280; font-size: 15px; line-height: 24px; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">✅ Alle 255 Prüfungsfragen</li>
                  <li style="margin-bottom: 8px;">✅ Flashcards & Multiple-Choice</li>
                  <li style="margin-bottom: 8px;">✅ Fortschritt-Tracking</li>
                  <li style="margin-bottom: 8px;">✅ Prüfungssimulation</li>
                  <li>✅ Offline-Zugriff (PWA)</li>
                </ul>
              </div>

              <!-- Support -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0 0 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>💡 Tipp:</strong> Ändere dein Passwort nach dem ersten Login in deinem Profil.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Fragen? Kontaktiere uns: <a href="mailto:${FROM_EMAIL}" style="color: #2563eb; text-decoration: none;">${FROM_EMAIL}</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} FahrGewerbe. Alle Rechte vorbehalten.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateWelcomeEmailText(
  name: string,
  email: string,
  password: string,
  plan: string,
  price: string
): string {
  return `
Willkommen bei FahrGewerbe!

Hallo ${name},

vielen Dank für deine Zahlung! Dein Account wurde erfolgreich erstellt.

DEINE LOGIN-DATEN:
Email: ${email}
Passwort: ${password}

DEIN PLAN:
${plan} - ${price}

Jetzt einloggen: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/signin

Was dich erwartet:
✅ Alle 255 Prüfungsfragen
✅ Flashcards & Multiple-Choice
✅ Fortschritt-Tracking
✅ Prüfungssimulation
✅ Offline-Zugriff (PWA)

Tipp: Ändere dein Passwort nach dem ersten Login in deinem Profil.

Fragen? Kontaktiere uns: ${FROM_EMAIL}

© ${new Date().getFullYear()} FahrGewerbe. Alle Rechte vorbehalten.
  `
}

function generatePaymentFailedHTML(
  name: string,
  attemptNumber: number,
  daysUntilSuspension: number,
  updatePaymentUrl: string
): string {
  const urgencyColor = attemptNumber === 1 ? '#f59e0b' : attemptNumber === 2 ? '#ef4444' : '#dc2626'
  const urgencyText =
    attemptNumber === 1
      ? 'Deine letzte Zahlung ist fehlgeschlagen.'
      : attemptNumber === 2
      ? 'Dies ist die 2. Mahnung. Bitte handle jetzt!'
      : 'LETZTE MAHNUNG! Dein Account wird in Kürze gesperrt.'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Zahlung fehlgeschlagen</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="background-color: ${urgencyColor}; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">⚠️ Zahlung fehlgeschlagen</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                Hallo <strong>${name}</strong>,
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                ${urgencyText}
              </p>

              <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #991b1b; font-size: 16px; font-weight: bold;">
                  Account-Status:
                </p>
                <p style="margin: 0; color: #dc2626; font-size: 16px;">
                  Dein Account wird in <strong>${daysUntilSuspension} Tagen</strong> gesperrt, wenn die Zahlung nicht erfolgt.
                </p>
              </div>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${updatePaymentUrl}" 
                   style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Zahlungsmethode aktualisieren →
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 20px; margin: 30px 0 0 0;">
                Wenn du bereits gezahlt hast, kannst du diese Email ignorieren.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Support: <a href="mailto:${FROM_EMAIL}" style="color: #2563eb;">${FROM_EMAIL}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generatePaymentFailedText(
  name: string,
  attemptNumber: number,
  daysUntilSuspension: number,
  updatePaymentUrl: string
): string {
  return `
Zahlung fehlgeschlagen - Mahnung ${attemptNumber}

Hallo ${name},

deine letzte Zahlung ist fehlgeschlagen.

Account-Status: Wird in ${daysUntilSuspension} Tagen gesperrt, wenn die Zahlung nicht erfolgt.

Zahlungsmethode aktualisieren:
${updatePaymentUrl}

Support: ${FROM_EMAIL}
  `
}

function generateAccountSuspendedHTML(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Account gesperrt</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td style="background-color: #dc2626; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔒 Account gesperrt</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px;">
                Hallo <strong>${name}</strong>,
              </p>
              <p style="color: #374151; font-size: 16px;">
                dein Account wurde aufgrund ausstehender Zahlungen gesperrt.
              </p>
              <p style="color: #6b7280; font-size: 14px;">
                Kontaktiere uns für weitere Informationen: <a href="mailto:${FROM_EMAIL}">${FROM_EMAIL}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateAccountSuspendedText(name: string): string {
  return `
Account gesperrt

Hallo ${name},

dein Account wurde aufgrund ausstehender Zahlungen gesperrt.

Kontaktiere uns: ${FROM_EMAIL}
  `
}

function generateSubscriptionCancelledHTML(name: string, endDate: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Abo gekündigt</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td style="padding: 40px; text-align: center;">
              <h1 style="color: #374151; margin: 0 0 20px 0; font-size: 28px;">Abo gekündigt</h1>
              <p style="color: #6b7280; font-size: 16px;">
                Hallo <strong>${name}</strong>,
              </p>
              <p style="color: #6b7280; font-size: 16px;">
                dein Abo wurde gekündigt. Du hast noch Zugriff bis: <strong>${endDate}</strong>
              </p>
              <p style="color: #9ca3af; font-size: 14px; margin-top: 30px;">
                Wir hoffen, dich bald wiederzusehen! 👋
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateSubscriptionCancelledText(name: string, endDate: string): string {
  return `
Abo gekündigt

Hallo ${name},

dein Abo wurde gekündigt. Du hast noch Zugriff bis: ${endDate}

Wir hoffen, dich bald wiederzusehen!
  `
}

function generateOrderConfirmationHTML(name: string, plan: string, price: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestellbestätigung</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">✅ Bestellung bestätigt!</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 18px;">Vielen Dank für deinen Kauf</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                Hallo <strong>${name}</strong>,
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                deine Zahlung wurde erfolgreich verarbeitet! 🎉
              </p>

              <!-- Order Details -->
              <div style="background-color: #f0fdf4; border: 2px solid #10b981; padding: 20px; margin: 0 0 30px 0; border-radius: 8px;">
                <h3 style="margin: 0 0 15px 0; color: #065f46; font-size: 18px; font-weight: bold;">
                  📦 Bestelldetails
                </h3>
                <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                  <tr>
                    <td style="color: #047857; font-size: 15px; border-bottom: 1px solid #86efac; padding: 8px 0;">
                      Produkt:
                    </td>
                    <td style="color: #065f46; font-size: 15px; font-weight: bold; border-bottom: 1px solid #86efac; padding: 8px 0; text-align: right;">
                      ${plan}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #047857; font-size: 15px; padding: 8px 0;">
                      Betrag:
                    </td>
                    <td style="color: #065f46; font-size: 15px; font-weight: bold; padding: 8px 0; text-align: right;">
                      ${price}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #047857; font-size: 15px; padding: 8px 0;">
                      Datum:
                    </td>
                    <td style="color: #065f46; font-size: 15px; font-weight: bold; padding: 8px 0; text-align: right;">
                      ${new Date().toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px; font-weight: bold;">
                  📝 Nächste Schritte:
                </h3>
                <ol style="color: #1e3a8a; font-size: 15px; line-height: 24px; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">
                    <strong>Account erstellen:</strong> Lege deine Login-Daten fest (Email wurde bereits geöffnet)
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>Anmelden:</strong> Nutze deine Email und dein gewähltes Passwort
                  </li>
                  <li>
                    <strong>Loslegen:</strong> Starte mit allen 255 Prüfungsfragen!
                  </li>
                </ol>
              </div>

              <!-- Features -->
              <div style="margin: 30px 0;">
                <h3 style="color: #374151; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">
                  Was dich erwartet:
                </h3>
                <ul style="color: #6b7280; font-size: 15px; line-height: 24px; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">✅ Alle 255 Prüfungsfragen</li>
                  <li style="margin-bottom: 8px;">✅ Flashcards & Multiple-Choice</li>
                  <li style="margin-bottom: 8px;">✅ Prüfungssimulator</li>
                  <li style="margin-bottom: 8px;">✅ Fortschrittstracking</li>
                  <li style="margin-bottom: 8px;">✅ Mobile App (iOS & Android)</li>
                  <li>✅ Offline-Zugriff (PWA)</li>
                </ul>
              </div>

              <!-- Support -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0 0 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>💡 Fragen?</strong> Unser Support-Team hilft dir gerne weiter!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Support: <a href="mailto:${FROM_EMAIL}" style="color: #2563eb; text-decoration: none;">${FROM_EMAIL}</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} FahrGewerbe. Alle Rechte vorbehalten.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateOrderConfirmationText(name: string, plan: string, price: string): string {
  return `
Bestellbestätigung - FahrGewerbe

Hallo ${name},

deine Zahlung wurde erfolgreich verarbeitet! 🎉

BESTELLDETAILS:
Produkt: ${plan}
Betrag: ${price}
Datum: ${new Date().toLocaleDateString('de-DE')}

NÄCHSTE SCHRITTE:
1. Account erstellen: Lege deine Login-Daten fest
2. Anmelden: Nutze deine Email und dein Passwort
3. Loslegen: Starte mit allen 255 Prüfungsfragen!

Was dich erwartet:
✅ Alle 255 Prüfungsfragen
✅ Flashcards & Multiple-Choice
✅ Prüfungssimulator
✅ Fortschrittstracking
✅ Mobile App (iOS & Android)
✅ Offline-Zugriff (PWA)

Fragen? Kontaktiere uns: ${FROM_EMAIL}

© ${new Date().getFullYear()} FahrGewerbe. Alle Rechte vorbehalten.
  `
}
