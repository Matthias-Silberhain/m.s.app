// Service Worker für Matthias Silberhain Portfolio
const CACHE_NAME = 'ms-portfolio-v1.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './assets/css/style.css',
  './assets/js/main.js',
  './pwa.js',
  
  // Icons
  './assets/icons/favicon.ico',
  './assets/icons/favicon.svg',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-96x96.png',
  './assets/icons/web-app-manifest-192x192.png',
  './assets/icons/web-app-manifest-512x512.png',
  
  // Bilder
  // Füge hier wichtige Bilder hinzu, z.B.:
  // './assets/images/logo.png',
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Alten Cache löschen:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            // Optional: Fallback-Seite für Offline
            // return caches.match('./offline.html');
          });
      })
  );
});
