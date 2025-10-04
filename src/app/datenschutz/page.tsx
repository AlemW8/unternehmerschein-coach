'use client'

import { motion } from 'framer-motion'

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Datenschutzerklärung
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                📋 Diese Datenschutzerklärung ist DSGVO-konform und speziell für E-Learning-Apps mit Stripe-Zahlungen erstellt.
              </p>
            </div>

            <h2>1. Datenschutz auf einen Blick</h2>
            
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>

            <h4>Wie erfassen wir Ihre Daten?</h4>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um 
              Daten handeln, die Sie in ein Kontaktformular eingeben oder bei der Registrierung angeben.
            </p>

            <h2>2. Hosting</h2>
            <p>
              Diese Website wird bei Vercel gehostet. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
              Vercel erfasst in sog. Logfiles folgende Daten: IP-Adresse, Datum und Uhrzeit der Anfrage, Übertragene Datenmenge, 
              Zugriffsstatus/HTTP-Statuscode, Referrer URL, Browser, Betriebssystem und dessen Oberfläche, Sprache und Version der Browsersoftware.
            </p>

            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzbestimmungen sowie 
              dieser Datenschutzerklärung.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>[IHR FIRMENNAME]</strong><br />
                [Straße und Hausnummer]<br />
                [PLZ] [Ort]<br />
                E-Mail: [datenschutz@ihre-domain.de]<br />
                Telefon: [Ihre Telefonnummer]
              </p>
            </div>

            <h3>Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben 
              Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
            </p>

            <h2>4. Datenerfassung auf dieser Website</h2>
            
            <h3>Registrierung auf dieser Website</h3>
            <p>
              Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen zu nutzen. Die dazu eingegebenen 
              Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes. Die bei der 
              Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden.
            </p>
            <p>
              <strong>Verarbeitete Daten:</strong> E-Mail-Adresse, Name, Passwort (verschlüsselt), Lernfortschritt
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
            </p>

            <h3>Lernfortschritt und Nutzungsdaten</h3>
            <p>
              Zur Bereitstellung unserer E-Learning-Dienste speichern wir Ihren Lernfortschritt, beantwortete Fragen, 
              Testergebnisse und Nutzungsstatistiken. Diese Daten dienen der Verbesserung Ihres Lernerlebnisses.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
            </p>

            <h2>5. Zahlungsanbieter</h2>
            
            <h3>Stripe</h3>
            <p>
              Auf dieser Website bieten wir die Bezahlung via Stripe an. Anbieter dieses Zahlungsdienstes ist die 
              Stripe Inc., 510 Townsend Street, San Francisco, CA 94103, USA (nachfolgend „Stripe").
            </p>
            <p>
              Bei Zahlung via Stripe werden Ihre Zahlungsdaten (Name, Anschrift, Bank-/Kreditkartendetails, Betrag, 
              Währung und Transaktions-Nummer) an Stripe übermittelt. Die Übermittlung erfolgt auf Grundlage von 
              Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und nur insoweit, als dies für die Zahlungsabwicklung 
              erforderlich ist.
            </p>
            <p>
              Stripe ist nach dem EU-US Data Privacy Framework zertifiziert. Details finden Sie unter:
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                https://stripe.com/privacy
              </a>
            </p>

            <h2>6. Cookies und Tracking</h2>
            
            <h3>Cookies</h3>
            <p>
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät 
              speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
            <p>
              <strong>Eingesetzte Cookies:</strong>
            </p>
            <ul>
              <li><strong>Session-Cookies:</strong> Für die Anmeldung und Navigation (technisch erforderlich)</li>
              <li><strong>Authentifizierung:</strong> NextAuth.js Session-Token</li>
              <li><strong>Präferenzen:</strong> Dark/Light Mode, Spracheinstellungen</li>
            </ul>

            <h2>7. Ihre Rechte</h2>
            <p>Sie haben folgende Rechte:</p>
            <ul>
              <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
              <li><strong>Recht auf Beschwerde</strong> bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>

            <h2>8. Widerruf Ihrer Einwilligung zur Datenverarbeitung</h2>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine 
              bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten 
              Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h2>9. Datensicherheit</h2>
            <p>
              Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in 
              Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. 
              Passwörter werden mit bcrypt gehashed und sicher gespeichert.
            </p>

            <h2>10. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p>
                <strong>Datenschutzbeauftragter:</strong><br />
                [Name oder "Geschäftsführung"]<br />
                E-Mail: datenschutz@ihre-domain.de
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
