'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'

export default function DebugPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [storageData, setStorageData] = useState<any>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStorageData({
        user: localStorage.getItem('user'),
        authToken: localStorage.getItem('authToken'),
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        auth_user: localStorage.getItem('auth_user')
      })
    }
  }, [])

  const clearStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const testLogin = () => {
    const testUser = {
      id: 'test-123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      plan: 'premium',
      isPremium: true,
      isActive: true
    }
    
    localStorage.setItem('user', JSON.stringify(testUser))
    localStorage.setItem('isAuthenticated', 'true')
    
    window.dispatchEvent(new CustomEvent('userLogin', { 
      detail: { user: testUser, token: 'test-token' } 
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Debug Page</h1>
        
        {/* Auth Provider Status */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Auth Provider Status</h2>
          <div className="space-y-2">
            <p><strong>isLoading:</strong> {isLoading.toString()}</p>
            <p><strong>isAuthenticated:</strong> {isAuthenticated.toString()}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}</p>
          </div>
        </div>

        {/* localStorage Data */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">localStorage Data</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(storageData, null, 2)}
          </pre>
        </div>

        {/* Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-x-4">
            <button 
              onClick={clearStorage}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear All Storage
            </button>
            <button 
              onClick={testLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Login
            </button>
            <button 
              onClick={() => window.location.href = '/learn'}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go to Learn Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
