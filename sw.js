/**
 * SERVICE WORKER - Matthias Silberhain PWA
 * Korrigierte Pfade für GitHub Pages
 */

const CACHE_NAME = 'matthias-silberhain-v1.2';
const OFFLINE_URL = '/m.s.app/index.html';

// WICHTIG: Pfade müssen relativ zum Repository sein
const PRECACHE_ASSETS = [
  '/m.s.app/',
  '/m.s.app/index.html',
  '/m.s.app/assets/css/style.css',
  '/m.s.app/assets/js/preloader.js',
  '/m.s.app/assets/js/menu.js',
  '/m.s.app/assets/js/darkmode.js',
  '/m.s.app/assets/js/pwa.js',
  '/m.s.app/assets/images/logo.png',
  '/m.s.app/manifest.json'
];

// Install Event
self.addEventListener('install', event => {
  console.log('⚙️ Service Worker: Installiere');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching Assets für:', self.location.origin);
        // Versuche Assets zu cachen, ignoriere Fehler
        return Promise.all(
          PRECACHE_ASSETS.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`⚠️ Konnte nicht cachen: ${url}`, error);
            });
          })
        );
      })
      .then(() => {
        console.log('✅ Installation abgeschlossen');
        return self.skipWaiting();
      })
  );
});

// Activate Event - VEREINFACHT
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Aktiviere');
  
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Lösche alten Cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Fetch Event - NETWORK FIRST für Preloader-Dateien
// In deiner sw.js, in der fetch-Funktion:
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // CSS-Dateien IMMER frisch laden, nie aus Cache
  if (url.pathname.includes('.css')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // ... Rest deines fetch-Handlers
});
  
  // WICHTIG: Preloader-Dateien IMMER frisch laden
  if (url.pathname.includes('preloader') || 
      url.pathname.includes('type-text') ||
      url.search.includes('nocache')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Für alle anderen: Cache First mit Network Fallback
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('📦 Aus Cache:', url.pathname);
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then(networkResponse => {
            // Nur erfolgreiche Antworten cachen (keine Preloader-Dateien!)
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
          .catch(() => {
            // Offline Fallback
            if (event.request.headers.get('Accept').includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }
            return null;
          });
      })
  );
});
