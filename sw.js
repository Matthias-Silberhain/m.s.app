// Service Worker für Matthias Silberhain Portfolio PWA
const CACHE_NAME = 'ms-portfolio-v1';
const APP_VERSION = '1.0.0';

// Dateien, die im Cache gespeichert werden sollen
const urlsToCache = [
  // HTML
  '/m.s.app/',
  '/m.s.app/index.html',
  
  // PWA Dateien
  '/m.s.app/manifest.json',
  '/m.s.app/sw.js',
  '/m.s.app/pwa.js',
  
  // CSS
  '/m.s.app/assets/css/style.css',
  
  // Icons
  '/m.s.app/icons/icon-192x192.png',
  '/m.s.app/icons/icon-512x512.png',
  
  // Fonts
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap'
];

// ========== INSTALL ==========
self.addEventListener('install', event => {
  console.log('[Service Worker] Installiert Version', APP_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching wichtige Dateien');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// ========== ACTIVATE ==========
self.addEventListener('activate', event => {
  console.log('[Service Worker] Aktiviert');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Alten Cache löschen:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// ========== FETCH ==========
self.addEventListener('fetch', event => {
  // Nur GET Requests cachen
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn im Cache gefunden, zurückgeben
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Sonst vom Netzwerk laden
        return fetch(event.request)
          .then(response => {
            // Prüfen ob die Antwort gültig ist
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Response klonen und im Cache speichern
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Fallback für Offline: Startseite zurückgeben
            if (event.request.mode === 'navigate') {
              return caches.match('/m.s.app/index.html');
            }
            
            // Fallback für CSS
            if (event.request.destination === 'style') {
              return new Response('/* Offline Mode */', {
                headers: { 'Content-Type': 'text/css' }
              });
            }
          });
      })
  );
});

// ========== PUSH NOTIFICATIONS ==========
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/m.s.app/icons/icon-192x192.png',
    badge: '/m.s.app/icons/icon-72x72.png',
    vibrate: [100, 50, 100]
  };
  
  event.waitUntil(
    self.registration.showNotification('Matthias Silberhain', options)
  );
});
// Dateien, die im Cache gespeichert werden sollen
const urlsToCache = [
  // HTML
  '/m.s.app/',
  '/m.s.app/index.html',
  
  // PWA Dateien
  '/m.s.app/manifest.json',
  '/m.s.app/sw.js',
  '/m.s.app/pwa.js',
  
  // CSS
  '/m.s.app/assets/css/style.css',
  
  // Logo
  '/m.s.app/assets/images/logo.png',
  
  // Icons
  '/m.s.app/icons/icon-192x192.png',
  '/m.s.app/icons/icon-512x512.png',
  
  // Fonts
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap'
];
