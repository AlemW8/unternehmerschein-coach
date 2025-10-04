import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  email: string
  password: string
  loginUrl: string
}

export function WelcomeEmail({
  name,
  email,
  password,
  loginUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Willkommen bei FahrGewerbe - Deine Login-Daten</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎉 Willkommen bei FahrGewerbe!</Heading>
          
          <Text style={text}>
            Hallo {name},
          </Text>

          <Text style={text}>
            vielen Dank für deine Anmeldung bei FahrGewerbe! Wir freuen uns, dich bei deiner 
            Vorbereitung auf den Unternehmerschein zu unterstützen.
          </Text>

          <Section style={codeBox}>
            <Text style={confirmationCodeText}>
              <strong>Deine Login-Daten:</strong>
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={text}>
              <strong>Passwort:</strong> {password}
            </Text>
          </Section>

          <Text style={text}>
            <strong>⚠️ Wichtig:</strong> Ändere dein Passwort nach dem ersten Login unter 
            "Profil → Einstellungen".
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Jetzt anmelden
            </Button>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>Dein Premium-Zugang umfasst:</Heading>

          <Text style={text}>
            ✅ Alle 255 Prüfungsfragen<br />
            ✅ 9 Themenbereiche<br />
            ✅ Flashcards & Multiple-Choice Quiz<br />
            ✅ Prüfungssimulator mit Zeitlimit<br />
            ✅ Fortschrittstracking & Statistiken<br />
            ✅ Mobile App (iOS & Android)
          </Text>

          <Hr style={hr} />

          <Heading style={h2}>Dein Abo im Überblick:</Heading>

          <Text style={text}>
            <strong>Erste 2 Monate:</strong> €49.99 (bereits bezahlt)<br />
            <strong>Ab 3. Monat:</strong> €24.99/Monat (automatische Abbuchung)<br />
            <strong>Kündigung:</strong> Jederzeit nach den ersten 2 Monaten möglich
          </Text>

          <Text style={text}>
            Deine Abrechnung und Kündigungsmöglichkeit findest du unter:<br />
            <Link href={`${loginUrl}/../profile/billing`} style={link}>
              Profil → Abrechnung
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Bei Fragen oder Problemen erreichst du uns unter:<br />
            <Link href="mailto:support@FahrGewerbe.de" style={link}>
              support@FahrGewerbe.de
            </Link>
          </Text>

          <Text style={footer}>
            Viel Erfolg bei deiner Prüfungsvorbereitung!<br />
            Dein FahrGewerbe Team 🚀
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#1d4ed8',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#1d4ed8',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  marginBottom: '16px',
}

const codeBox = {
  background: '#f8fafc',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #e2e8f0',
}

const confirmationCodeText = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#1d4ed8',
  textAlign: 'center' as const,
  marginBottom: '16px',
}

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#1d4ed8',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 28px',
}

const link = {
  color: '#1d4ed8',
  textDecoration: 'underline',
}

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginTop: '32px',
}
