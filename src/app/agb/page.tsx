'use client'

import { motion } from 'framer-motion'

export default function AGBPage() {
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
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
              <p className="text-green-800 dark:text-green-200 font-medium">
                📜 Diese AGB sind speziell für E-Learning-Plattformen mit Abo-Modellen erstellt.
              </p>
            </div>

            <h2>§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für alle Verträge über die Nutzung 
              der E-Learning-Plattform für den Unternehmerschein zwischen [IHR FIRMENNAME] (nachfolgend „Anbieter") 
              und dem Nutzer (nachfolgend „Kunde").
            </p>

            <h2>§ 2 Vertragspartner</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Anbieter:</strong><br />
                [IHR FIRMENNAME]<br />
                [Straße und Hausnummer]<br />
                [PLZ] [Ort]<br />
                E-Mail: [kontakt@ihre-domain.de]<br />
                Handelsregister: [HRB-Nummer]
              </p>
            </div>

            <h2>§ 3 Leistungsumfang</h2>
            <h3>3.1 Grundleistungen</h3>
            <p>Der Anbieter stellt folgende Leistungen zur Verfügung:</p>
            <ul>
              <li>Zugang zu digitalen Lernmaterialien für den Unternehmerschein</li>
              <li>Interaktive Prüfungssimulationen</li>
              <li>Lernfortschrittsverfolgung</li>
              <li>Mobile App für iOS und Android</li>
              <li>Online-Support</li>
            </ul>

            <h3>3.2 Verfügbarkeit</h3>
            <p>
              Der Anbieter bemüht sich um eine Verfügbarkeit der Plattform von 99%. Wartungsarbeiten können zu 
              temporären Einschränkungen führen und werden rechtzeitig angekündigt.
            </p>

            <h2>§ 4 Vertragsschluss und Registrierung</h2>
            <h3>4.1 Registrierung</h3>
            <p>
              Zur Nutzung der Plattform ist eine Registrierung erforderlich. Der Kunde muss vollständige und 
              wahrheitsgemäße Angaben machen.
            </p>

            <h3>4.2 Vertragsschluss</h3>
            <p>
              Der Vertrag kommt durch die Buchung eines Abonnements und die Bestätigung durch den Anbieter zustande. 
              Eine Buchungsbestätigung wird per E-Mail versendet.
            </p>

            <h2>§ 5 Preise und Zahlungsbedingungen</h2>
            <h3>5.1 Preise</h3>
            <p>Es gelten die zum Zeitpunkt der Buchung angegebenen Preise:</p>
            <ul>
              <li><strong>Monatliches Abonnement:</strong> €29.99 pro Monat</li>
              <li><strong>Jahresabonnement:</strong> €199.99 einmalig für 12 Monate</li>
            </ul>
            <p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.</p>

            <h3>5.2 Zahlung</h3>
            <p>
              Die Zahlung erfolgt über den Zahlungsdienstleister Stripe. Akzeptierte Zahlungsmethoden:
              Kreditkarte, PayPal, SEPA-Lastschrift.
            </p>

            <h3>5.3 Fälligkeit</h3>
            <ul>
              <li><strong>Monatlich:</strong> Zahlung im Voraus, automatische Verlängerung</li>
              <li><strong>Jährlich:</strong> Einmalige Zahlung für 12 Monate</li>
            </ul>

            <h2>§ 6 Vertragslaufzeit und Kündigung</h2>
            <h3>6.1 Laufzeit</h3>
            <ul>
              <li><strong>Monatlich:</strong> 1 Monat, verlängert sich automatisch um jeweils 1 Monat</li>
              <li><strong>Jährlich:</strong> 12 Monate, einmalige Zahlung</li>
            </ul>

            <h3>6.2 Kündigung</h3>
            <ul>
              <li><strong>Monatlich:</strong> Kündigung jederzeit zum Monatsende mit einer Frist von 7 Tagen</li>
              <li><strong>Jährlich:</strong> Kündigung zum Ende der Laufzeit mit einer Frist von 30 Tagen</li>
            </ul>

            <h3>6.3 Außerordentliche Kündigung</h3>
            <p>
              Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
            </p>

            <h2>§ 7 Widerrufsrecht für Verbraucher</h2>
            <h3>7.1 Widerrufsbelehrung</h3>
            <p>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
            </p>

            <h3>7.2 Widerrufsfolgen</h3>
            <p>
              Im Falle eines wirksamen Widerrufs werden bereits erbrachte Leistungen anteilig vergütet und 
              erhaltene Zahlungen zurückerstattet.
            </p>

            <h3>7.3 Vorzeitiger Verlust des Widerrufsrechts</h3>
            <p>
              Das Widerrufsrecht erlischt vorzeitig, wenn der Kunde ausdrücklich zugestimmt hat, dass mit der 
              Ausführung der Dienstleistung vor Ende der Widerrufsfrist begonnen wird.
            </p>

            <h2>§ 8 Nutzungsrechte und Pflichten</h2>
            <h3>8.1 Nutzungsrechte</h3>
            <p>
              Der Kunde erhält ein nicht-exklusives, zeitlich begrenztes Recht zur Nutzung der Lernmaterialien 
              für private, nicht-kommerzielle Zwecke.
            </p>

            <h3>8.2 Verbotene Nutzung</h3>
            <p>Untersagt ist insbesondere:</p>
            <ul>
              <li>Weitergabe der Zugangsdaten an Dritte</li>
              <li>Vervielfältigung oder Verbreitung der Lerninhalte</li>
              <li>Reverse Engineering oder Dekompilierung</li>
              <li>Nutzung für kommerzielle Zwecke ohne Zustimmung</li>
            </ul>

            <h2>§ 9 Datenschutz</h2>
            <p>
              Der Anbieter verpflichtet sich, alle personenbezogenen Daten entsprechend der Datenschutz-Grundverordnung 
              (DSGVO) zu behandeln. Details regelt die separate Datenschutzerklärung.
            </p>

            <h2>§ 10 Haftung</h2>
            <h3>10.1 Haftungsbeschränkung</h3>
            <p>
              Der Anbieter haftet nur für Schäden, die auf einer vorsätzlichen oder grob fahrlässigen 
              Pflichtverletzung beruhen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen.
            </p>

            <h3>10.2 Gewährleistung</h3>
            <p>
              Der Anbieter gewährleistet nicht, dass die Nutzung der Plattform zum Bestehen der Prüfung führt. 
              Die Lerninhalte dienen als Unterstützung bei der Prüfungsvorbereitung.
            </p>

            <h2>§ 11 Änderungen der AGB</h2>
            <p>
              Der Anbieter behält sich vor, diese AGB zu ändern. Änderungen werden den Kunden per E-Mail mitgeteilt 
              und gelten als genehmigt, wenn nicht binnen 30 Tagen widersprochen wird.
            </p>

            <h2>§ 12 Schlussbestimmungen</h2>
            <h3>12.1 Anwendbares Recht</h3>
            <p>
              Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
            </p>

            <h3>12.2 Gerichtsstand</h3>
            <p>
              Gerichtsstand für alle Streitigkeiten ist [Ihr Geschäftssitz], sofern der Kunde Kaufmann ist.
            </p>

            <h3>12.3 Salvatorische Klausel</h3>
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen 
              Bestimmungen unberührt.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Stand: {new Date().toLocaleDateString('de-DE')}<br />
                Version: 1.0
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
