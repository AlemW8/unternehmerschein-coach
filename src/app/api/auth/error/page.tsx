'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user is actually logged in via localStorage
    const isAuth = localStorage.getItem('isAuthenticated') === 'true'
    const user = localStorage.getItem('user')

    if (isAuth && user) {
      // User is actually authenticated, redirect to learn page
      router.push('/learn?from_auth_error=true')
    } else {
      // Redirect to login
      router.push('/auth/signin?error=authentication_failed')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Weiterleitung...</p>
      </div>
    </div>
  )
}
