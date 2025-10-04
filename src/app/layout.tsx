import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Navbar } from '@/components/layout/navbar'
import { CookieConsent } from '@/components/ui/cookie-consent'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FahrGewerbe - Dein Weg zur Fahrerlizenz',
  description: 'Die ultimative 3D-Lern-App für Taxi, Uber & Mietwagen. Moderne Lernmethoden, 3D-Animationen und adaptive Wiederholung für optimalen Lernerfolg.',
  keywords: ['Fahrerlizenz', 'Taxi', 'Uber', 'Mietwagen', 'PBefG', 'BOKraft', 'Lern-App', 'FahrGewerbe'],
  authors: [{ name: 'FahrGewerbe Team' }],
  creator: 'FahrGewerbe',
  publisher: 'FahrGewerbe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://unternehmerschein-coach.de'),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/de',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://FahrGewerbe.de',
    title: 'FahrGewerbe - Erfolgreich zur Fahrerlizenz',
    description: 'Die ultimative 3D-Lern-App für Taxi, Uber & Mietwagen. Moderne Lernmethoden, 3D-Animationen und adaptive Wiederholung für optimalen Lernerfolg.',
    siteName: 'FahrGewerbe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FahrGewerbe - 3D Lern-App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FahrGewerbe - Erfolgreich zur Fahrerlizenz',
    description: 'Die ultimative 3D-Lern-App für Taxi, Uber & Mietwagen. Moderne Lernmethoden, 3D-Animationen und adaptive Wiederholung für optimalen Lernerfolg.',
    images: ['/og-image.jpg'],
    creator: '@FahrGewerbe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9fafb" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
                
                <main className="flex-1 relative" role="main">
                  {children}
                </main>
                
                {/* Simple Footer */}
                <footer className="bg-gray-50 dark:bg-gray-900 border-t">
                  <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                      <p className="mb-4">&copy; 2024 Cab&Car. Made with ❤️ für Fahrer.</p>
                      
                      {/* Legal Links */}
                      <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/impressum" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          Impressum
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <Link href="/datenschutz" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          Datenschutz
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <Link href="/agb" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          AGB
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <Link href="/widerrufsrecht" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          Widerrufsrecht
                        </Link>
                      </div>
                    </div>
                  </div>
                </footer>
                
                {/* Cookie Consent Banner */}
                <CookieConsent />
              </div>
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
