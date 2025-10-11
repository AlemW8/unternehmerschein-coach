'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Database, Activity, Trash2, Eye, Settings } from 'lucide-react'
import AuthService from '@/lib/auth-service'
import { db } from '@/lib/simple-db'

export default function AdminDatabasePage() {
  const [users, setUsers] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  useEffect(() => {
    loadData()
    
    // Auto-refresh alle 30 Sekunden
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Benutzer laden
      const allUsers = AuthService.getAllUsers()
      setUsers(allUsers)
      
      // Statistiken laden
      const statistics = AuthService.getStats()
      setStats(statistics)
      
      console.log('📊 Admin data loaded:', { users: allUsers.length, stats: statistics })
      
    } catch (error) {
      console.error('❌ Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearDatabase = () => {
    if (confirm('⚠️ WARNUNG: Alle Daten werden gelöscht!\n\nSind Sie sicher? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      db.clearAllData()
      setUsers([])
      setStats({ totalUsers: 0, activeSessions: 0, premiumUsers: 0 })
      alert('🗑️ Datenbank wurde geleert')
    }
  }

  const handleCreateTestUser = async () => {
    try {
      const result = await AuthService.register({
        name: `Test User ${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'test123',
        isPremium: Math.random() > 0.5
      })
      
      if (result.success) {
        alert('✅ Test-User erstellt')
        loadData()
      } else {
        alert('❌ Fehler: ' + result.error)
      }
    } catch (error) {
      alert('❌ Unerwarteter Fehler')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Lade Admin-Daten...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            Datenbank Administration
          </h1>
          <p className="text-gray-600">
            Verwalte Benutzer und Datenbankeinstellungen
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Gesamt Benutzer</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Aktive Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSessions || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Premium Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.premiumUsers || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Activity className="w-5 h-5" />
            Daten aktualisieren
          </button>
          
          <button
            onClick={handleCreateTestUser}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Test-User erstellen
          </button>
          
          <button
            onClick={handleClearDatabase}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Datenbank leeren
          </button>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Benutzer ({users.length})
            </h2>
          </div>
          
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p>Keine Benutzer in der Datenbank</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-Mail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Erstellt</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                        {user.id.substring(0, 12)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isPremium 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isPremium ? '🌟 Premium' : '📚 Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? '✅ Aktiv' : '❌ Inaktiv'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('de-DE') : 'Unbekannt'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Benutzer Details</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                      {selectedUser.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.isPremium ? '🌟 Premium' : '📚 Free'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.isActive ? '✅ Aktiv' : '❌ Inaktiv'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rolle</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.role || 'USER'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Erstellt</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString('de-DE') : 'Unbekannt'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Letzter Login</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString('de-DE') : 'Nie'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Raw Data (JSON)</label>
                  <pre className="text-xs text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                    {JSON.stringify(selectedUser, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Letzte Aktualisierung: {stats.timestamp ? new Date(stats.timestamp).toLocaleString('de-DE') : 'Unbekannt'}</p>
          <p className="mt-1">SimpleDB - LocalStorage basierte Datenbank</p>
        </div>
      </div>
    </div>
  )
}
