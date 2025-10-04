'use client'

import { motion } from 'framer-motion'

export default function WiderrufsrechtPage() {
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
            Widerrufsrecht & Widerrufsbelehrung
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                ⚖️ Gesetzliche Widerrufsbelehrung für Verbraucher gemäß § 312g BGB
              </p>
            </div>

            <h2>Widerrufsrecht</h2>
            <p>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            </p>

            <h3>Widerrufsfrist</h3>
            <p>
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
            </p>

            <h3>Ausübung des Widerrufsrechts</h3>
            <p>
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>[IHR FIRMENNAME]</strong><br />
                [Straße und Hausnummer]<br />
                [PLZ] [Ort]<br />
                E-Mail: widerruf@ihre-domain.de<br />
                Telefon: [Ihre Telefonnummer]
              </p>
            </div>

            <p>
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren 
              Entschluss, diesen Vertrag zu widerrufen, informieren.
            </p>

            <h3>Muster-Widerrufsformular</h3>
            <p>
              Sie können das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist:
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 my-6 rounded-lg">
              <h4 className="font-bold mb-4">Muster-Widerrufsformular</h4>
              <p className="mb-4">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
              </p>
              
              <div className="space-y-2 text-sm font-mono">
                <p>An: [IHR FIRMENNAME]</p>
                <p>[Straße und Hausnummer]</p>
                <p>[PLZ] [Ort]</p>
                <p>E-Mail: widerruf@ihre-domain.de</p>
                <br />
                <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*):</p>
                <br />
                <p>_________________________________________________</p>
                <br />
                <p>Bestellt am (*)/erhalten am (*):</p>
                <p>_________________________________________________</p>
                <br />
                <p>Name des/der Verbraucher(s):</p>
                <p>_________________________________________________</p>
                <br />
                <p>Anschrift des/der Verbraucher(s):</p>
                <p>_________________________________________________</p>
                <br />
                <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
                <p>_________________________________________________</p>
                <br />
                <p>Datum:</p>
                <p>_________________________________________________</p>
                <br />
                <p className="text-xs">(*) Unzutreffendes streichen.</p>
              </div>
            </div>

            <h3>Widerrufsfrist</h3>
            <p>
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des 
              Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
            </p>

            <h2>Folgen des Widerrufs</h2>
            <p>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, 
              einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass 
              Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), 
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über 
              Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
            </p>

            <h3>Rückzahlungsmodalitäten</h3>
            <p>
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion 
              eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall 
              werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
            </p>

            <h2>Besonderheiten bei digitalen Inhalten</h2>
            
            <h3>Vorzeitiger Verlust des Widerrufsrechts</h3>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
              <p className="text-red-800 dark:text-red-200 font-medium">
                <strong>Wichtiger Hinweis:</strong> Ihr Widerrufsrecht erlischt vorzeitig, wenn:
              </p>
              <ul className="mt-2 text-red-800 dark:text-red-200">
                <li>Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung der Dienstleistung vor Ende der Widerrufsfrist beginnen</li>
                <li>Sie zur Kenntnis genommen haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung der Dienstleistung Ihr Widerrufsrecht verlieren</li>
              </ul>
            </div>

            <h3>Ausnahmen vom Widerrufsrecht</h3>
            <p>
              Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von digitalen Inhalten, die nicht auf einem 
              körperlichen Datenträger geliefert werden, wenn wir mit der Ausführung des Vertrags begonnen haben, 
              nachdem Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung des Vertrags vor Ablauf der 
              Widerrufsfrist beginnen, und Sie zur Kenntnis genommen haben, dass Sie durch Ihre Zustimmung mit Beginn 
              der Ausführung des Vertrags Ihr Widerrufsrecht verlieren.
            </p>

            <h2>Praktische Hinweise</h2>
            
            <h3>Sofortiger Zugang zu den Lerninhalten</h3>
            <p>
              Wenn Sie sofortigen Zugang zu unseren digitalen Lerninhalten wünschen, können Sie beim Kaufprozess 
              ausdrücklich zustimmen, dass wir vor Ablauf der 14-tägigen Widerrufsfrist mit der Bereitstellung beginnen. 
              In diesem Fall verlieren Sie Ihr Widerrufsrecht.
            </p>

            <h3>Teilweise Nutzung</h3>
            <p>
              Bei teilweiser Nutzung der Lerninhalte während der Widerrufsfrist haben Sie Wertersatz für die bereits 
              erbrachten Dienstleistungen zu leisten. Dieser berechnet sich anteilig für den Zeitraum, in dem Sie 
              Zugang zu den Inhalten hatten.
            </p>

            <h2>Kontakt für Widerruf</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p>
                <strong>Für Widerrufe kontaktieren Sie uns:</strong><br />
                E-Mail: widerruf@ihre-domain.de<br />
                Telefon: [Ihre Telefonnummer]<br />
                Post: [Ihre Adresse]
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Diese Widerrufsbelehrung entspricht den gesetzlichen Anforderungen nach § 312g BGB.<br />
                Stand: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
