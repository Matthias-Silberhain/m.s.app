/**
 * SERVICE WORKER - Vereinfachte Version für zuverlässigen Betrieb
 */

const CACHE_NAME = 'matthias-silberhain-v1.1';
const OFFLINE_URL = '/m.s.app/index.html';

// Assets die gecached werden sollen (nur kritische)
const PRECACHE_ASSETS = [
  '/m.s.app/',
  '/m.s.app/index.html',
  '/m.s.app/assets/css/style.css',
  '/m.s.app/manifest.webmanifest'
];

// Install Event
self.addEventListener('install', event => {
  console.log('⚙️ Service Worker: Installiere');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching kritische Assets');
        // Nur die allerwichtigsten Dateien cachen
        return cache.addAll(PRECACHE_ASSETS).catch(err => {
          console.warn('Einige Assets konnten nicht gecached werden:', err);
        });
      })
      .then(() => {
        console.log('✅ Service Worker: Installation abgeschlossen');
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
          // Lösche alle alten Caches
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Lösche alten Cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Aktivierung abgeschlossen');
      return self.clients.claim();
    })
  );
});

// Fetch Event - Network First für bessere Aktualität
self.addEventListener('fetch', event => {
  // Nur GET-Requests behandeln
  if (event.request.method !== 'GET') return;
  
  // Für HTML-Dateien: Network First, dann Cache
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache die Antwort für zukünftige Offline-Nutzung
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Falls offline: aus Cache liefern
          return caches.match(event.request)
            .then(cachedResponse => cachedResponse || caches.match(OFFLINE_URL));
        })
    );
    return;
  }
  
  // Für CSS, JS, Bilder: Cache First, dann Network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn im Cache, zurückgeben
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Ansonsten vom Netzwerk laden
        return fetch(event.request)
          .then(response => {
            // Nur erfolgreiche Antworten cachen
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Response klonen und cachen
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.warn('Fetch fehlgeschlagen:', error);
            // Keine Fallback-Antwort für Nicht-HTML-Ressourcen
          });
      })
  );
});
