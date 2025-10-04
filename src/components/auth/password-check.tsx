'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { db } from '@/lib/db'

export function PasswordCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Prüfe nur wenn nicht bereits auf der Passwort-Ändern-Seite
    if (pathname === '/auth/change-password') return

    // Prüfe ob Benutzer angemeldet ist
    const currentUser = db.getCurrentUser()
    if (!currentUser) return

    // Prüfe ob Passwort geändert werden muss
    if (currentUser.mustChangePassword) {
      router.push('/auth/change-password?forced=true')
    }
  }, [router, pathname])

  return <>{children}</>
}
