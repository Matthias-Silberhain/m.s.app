// Service Worker für Matthias Silberhain Portfolio PWA
const CACHE_NAME = 'ms-pwa-v2.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  
  // CSS
  './assets/css/style.css',
  
  // JS
  './assets/js/dark-mode.js',
  './assets/js/global.js',
  './assets/js/menu.js',
  './assets/js/pwa.js',
  
  // Icons
  './assets/icons/favicon.ico',
  './assets/icons/favicon.svg',
  './assets/icons/apple-touch-icon.png',
  
  // Logo
  './assets/images/logo.png',
  
  // Fonts (cachen für Offline-Nutzung)
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:wght@400;500&family=Great+Vibes&family=Inter:wght@300;400;600&display=swap'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 PWA Cache geöffnet:', CACHE_NAME);
        return cache.addAll(urlsToCache.map(url => {
          return new Request(url, { 
            mode: 'no-cors',
            credentials: 'same-origin'
          });
        })).catch(error => {
          console.log('⚠️ Einige Ressourcen konnten nicht gecached werden:', error);
        });
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

// Fetch Event - Network First, dann Cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Für API oder externe Requests: Network Only
  if (event.request.url.includes('api.') || 
      event.request.url.includes('analytics')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Wenn die Antwort gut ist, cache sie
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(error => {
        // Network fehlgeschlagen, versuche aus Cache
        console.log('🌐 Netzwerk fehlgeschlagen, versuche Cache:', event.request.url);
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            
            // Fallback für HTML-Seiten
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            
            // Fallback für andere Ressourcen
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Message Handler für Updates
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
