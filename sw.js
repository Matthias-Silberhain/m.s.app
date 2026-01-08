/**
 * SERVICE WORKER - Matthias Silberhain PWA
 * Caching Strategie: Cache First, dann Network
 */

const CACHE_NAME = 'matthias-silberhain-v1.0';
const OFFLINE_URL = 'index.html';

// Assets die gecached werden sollen
const PRECACHE_ASSETS = [
  '/m.s.app/',
  '/m.s.app/index.html',
  '/m.s.app/assets/css/style.css',
  '/m.s.app/assets/js/preloader.js',
  '/m.s.app/assets/js/menu.js',
  '/m.s.app/assets/js/darkmode.js',
  '/m.s.app/assets/js/pwa.js',
  '/m.s.app/assets/images/logo.png',
  '/m.s.app/manifest.webmanifest'
];

// Install Event
self.addEventListener('install', event => {
  console.log('⚙️ Service Worker: Installiere');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching Assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation abgeschlossen');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Installation fehlgeschlagen', error);
      })
  );
});

// Activate Event
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Aktiviere');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️  Service Worker: Lösche alten Cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('✅ Service Worker: Aktivierung abgeschlossen');
      return self.clients.claim();
    })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  // Handle API requests differently
  if (event.request.url.includes('/api/')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // For all other requests: Cache First
  event.respondWith(cacheFirstStrategy(event.request));
});

/**
 * Cache First Strategy
 */
function cacheFirstStrategy(request) {
  return caches.match(request)
    .then(cachedResponse => {
      // Wenn im Cache, gib zurück
      if (cachedResponse) {
        console.log('📦 Aus Cache:', request.url);
        return cachedResponse;
      }
      
      // Sonst lade vom Netzwerk
      return fetch(request)
        .then(networkResponse => {
          // Nur erfolgreiche Antworten cachen
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          // Response klonen und cachen
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(request, responseToCache);
              console.log('💾 Neu geladen und gecached:', request.url);
            });
          
          return networkResponse;
        })
        .catch(error => {
          console.warn('⚠️ Fetch fehlgeschlagen:', error);
          
          // Offline Fallback für HTML
          if (request.headers.get('Accept').includes('text/html')) {
            return caches.match(OFFLINE_URL);
          }
          
          // Offline Fallback für andere Assets
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
    });
}

/**
 * Network First Strategy (für API Calls)
 */
function networkFirstStrategy(request) {
  return fetch(request)
    .then(networkResponse => {
      // Cache nur erfolgreiche Responses
      if (networkResponse.ok) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(request, responseToCache);
          });
      }
      return networkResponse;
    })
    .catch(error => {
      // Fallback auf Cache
      return caches.match(request)
        .then(cachedResponse => {
          return cachedResponse || 
            new Response(JSON.stringify({ error: 'Network error' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
        });
    });
}

// Background Sync (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('🔄 Background Sync gestartet');
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Hier könnten Daten synchronisiert werden
  return Promise.resolve();
}
