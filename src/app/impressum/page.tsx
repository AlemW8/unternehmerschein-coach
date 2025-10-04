'use client'

import { motion } from 'framer-motion'

export default function ImpressumPage() {
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
            Impressum
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Angaben gemäß § 5 TMG</h2>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                ⚠️ <strong>Wichtiger Hinweis:</strong> Diese Daten müssen durch Ihre echten Unternehmensdaten ersetzt werden!
              </p>
            </div>

            <p>
              <strong>[IHR FIRMENNAME]</strong><br />
              [Rechtsform - z.B. GmbH, UG, Einzelunternehmen]<br />
              [Straße und Hausnummer]<br />
              [PLZ] [Ort]<br />
              Deutschland
            </p>

            <h3>Vertreten durch:</h3>
            <p>[Geschäftsführer/Inhaber Name]</p>

            <h3>Kontakt:</h3>
            <p>
              Telefon: [Ihre Telefonnummer]<br />
              E-Mail: [Ihre E-Mail-Adresse]
            </p>

            <h3>Registereintrag:</h3>
            <p>
              Eintragung im Handelsregister<br />
              Registergericht: [Amtsgericht]<br />
              Registernummer: [HRB-Nummer]
            </p>

            <h3>Umsatzsteuer-ID:</h3>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [Ihre USt-IdNr.]
            </p>

            <h3>Wirtschafts-ID:</h3>
            <p>
              [Ihre Wirtschafts-Identifikationsnummer]
            </p>

            <h3>Aufsichtsbehörde:</h3>
            <p>
              [Falls zutreffend - z.B. bei reglementierten Berufen]
            </p>

            <h3>Berufsbezeichnung und berufsrechtliche Regelungen:</h3>
            <p>
              [Falls zutreffend]
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der 
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <h2>Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

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
