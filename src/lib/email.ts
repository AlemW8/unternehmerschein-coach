import nodemailer from 'nodemailer'

// E-Mail Configuration with enhanced error checking
function createTransporter() {
  // Check if all required environment variables are set
  const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing SMTP environment variables: ${missingVars.join(', ')}`)
    console.warn('📧 E-Mail functionality will not work until these are configured')
  }

  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Add timeout and connection options
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
  })
}

const transporter = createTransporter()

export async function sendWelcomeEmail(email: string, name: string, loginUrl: string) {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ SMTP not configured, skipping email send')
      return { success: false, error: 'SMTP not configured' }
    }

    console.log('📧 Preparing welcome email for:', email)

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@fahrgewerbe.de',
      to: email,
      subject: '🎉 Willkommen bei FahrGewerbe Premium!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Willkommen bei FahrGewerbe Premium!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Hallo ${name}!</h2>
            
            <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
              Herzlichen Glückwunsch! Ihre Zahlung war erfolgreich und Ihr Premium-Zugang wurde aktiviert.
            </p>
            
            <div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0ea5e9; margin-top: 0;">✅ Was Sie jetzt haben:</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">
                <li>Zugang zu allen 255 Prüfungsfragen</li>
                <li>9 vollständige Themenbereiche</li>
                <li>Interaktive Flashcards</li>
                <li>Multiple-Choice Quizzes</li>
                <li>Prüfungssimulator</li>
                <li>Fortschrittstracking</li>
                <li>Mobile Optimierung</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${loginUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                🚀 Jetzt loslegen
              </a>
            </div>
            
            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-weight: bold;">
                📧 Ihre Login-Daten:
              </p>
              <p style="color: #92400e; margin: 5px 0 0 0;">
                E-Mail: ${email}<br>
                Passwort: Das Passwort, das Sie bei der Registrierung gewählt haben
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Bei Fragen oder Problemen erreichen Sie uns unter:
              <a href="mailto:support@fahrgewerbe.de" style="color: #667eea;">support@fahrgewerbe.de</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            © 2024 FahrGewerbe. Alle Rechte vorbehalten.
          </div>
        </div>
      `
    }

    console.log('📧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Welcome email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    })
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email sending failed:', {
      error: error.message,
      code: error.code,
      command: error.command
    })
    return { success: false, error: error.message }
  }
}
