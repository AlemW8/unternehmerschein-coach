// Service Worker für Unternehmerschein Coach PWA
const CACHE_NAME = 'unternehmerschein-coach-v1.0.0'
const STATIC_CACHE_NAME = 'static-v1.0.0'
const DATA_CACHE_NAME = 'data-v1.0.0'

// Assets to cache for offline usage
const STATIC_FILES = [
  '/',
  '/learn',
  '/exam',
  '/profile',
  '/pricing',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/questions',
  '/api/user/progress'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static files')
        return cache.addAll(STATIC_FILES)
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DATA_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      
      // Claim all clients
      self.clients.claim()
    ])
  )
})

// Fetch event - network first for API, cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      networkFirstWithCache(request, DATA_CACHE_NAME)
    )
    return
  }

  // Handle app shell with cache-first strategy
  if (STATIC_FILES.includes(url.pathname) || url.pathname.startsWith('/_next/')) {
    event.respondWith(
      cacheFirstWithNetwork(request, STATIC_CACHE_NAME)
    )
    return
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirstWithFallback(request)
    )
    return
  }

  // Default: network first for everything else
  event.respondWith(
    networkFirstWithCache(request, CACHE_NAME)
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress())
  }
})

// Push notifications (optional)
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event.data?.text())
  
  if (event.data) {
    const data = event.data.json()
    
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: data.tag || 'default',
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || []
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.notification.tag)
  
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus()
        }
      }
      
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Strategy: Network first with cache fallback
async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request)
    
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url)
    
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html')
    }
    
    throw error
  }
}

// Strategy: Cache first with network fallback
async function cacheFirstWithNetwork(request, cacheName) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const response = await fetch(request)
    
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    console.log('[SW] Both cache and network failed:', request.url)
    throw error
  }
}

// Strategy: Network first with offline fallback page
async function networkFirstWithFallback(request) {
  try {
    return await fetch(request)
  } catch (error) {
    console.log('[SW] Navigation failed, showing offline page')
    return caches.match('/offline.html')
  }
}

// Sync progress data when back online
async function syncProgress() {
  try {
    console.log('[SW] Syncing progress data...')
    
    // Get cached progress data
    const cache = await caches.open(DATA_CACHE_NAME)
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/progress')) {
        try {
          // Try to sync with server
          await fetch(request.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sync: true })
          })
          
          console.log('[SW] Progress synced:', request.url)
        } catch (error) {
          console.log('[SW] Sync failed for:', request.url)
        }
      }
    }
  } catch (error) {
    console.log('[SW] Progress sync failed:', error)
  }
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data)
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME })
      break
      
    case 'CLEAN_CACHE':
      cleanOldCaches()
      break
      
    default:
      console.log('[SW] Unknown message type:', event.data.type)
  }
})

// Clean old caches manually
async function cleanOldCaches() {
  const cacheNames = await caches.keys()
  const oldCaches = cacheNames.filter(name => 
    !name.includes(STATIC_CACHE_NAME) && 
    !name.includes(DATA_CACHE_NAME) && 
    !name.includes(CACHE_NAME)
  )
  
  await Promise.all(
    oldCaches.map(cacheName => caches.delete(cacheName))
  )
  
  console.log('[SW] Cleaned old caches:', oldCaches)
}
