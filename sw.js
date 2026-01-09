/**
 * SERVICE WORKER - Matthias Silberhain PWA
 */

const CACHE_NAME = 'matthias-silberhain-pwa-v1.0';

// Assets zum Cachen
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/preloader.js',
  './assets/js/menu.js',
  './assets/js/darkmode.js',
  './assets/js/pwa.js',
  './assets/images/logo.png',
  './manifest.json'
];

// Install Event
self.addEventListener('install', event => {
  console.log('⚙️ Service Worker: Installiere');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching Assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('✅ Installation abgeschlossen');
        return self.skipWaiting();
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
            console.log('🗑️ Lösche alten Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  // Nicht-GET Requests ignorieren
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn im Cache, zurückgeben
        if (cachedResponse) {
          console.log('📦 Aus Cache:', event.request.url);
          return cachedResponse;
        }
        
        // Sonst vom Netzwerk laden
        return fetch(event.request)
          .then(networkResponse => {
            // Nur erfolgreiche Antworten cachen
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            
            // Response klonen und cachen
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch(error => {
            console.warn('⚠️ Fetch fehlgeschlagen:', error);
            return null;
          });
      })
  );
});
