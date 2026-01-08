// Service Worker für Matthias Silberhain PWA
const CACHE_NAME = 'matthias-silberhain-v1';
const urlsToCache = [
  '/m.s.app/',
  '/m.s.app/index.html',
  '/m.s.app/assets/css/style.css',
  '/m.s.app/assets/js/menu.js',
  '/m.s.app/assets/images/logo.png',
  '/m.s.app/assets/icons/icon-72x72.png',
  '/m.s.app/assets/icons/icon-96x96.png',
  '/m.s.app/assets/icons/icon-128x128.png',
  '/m.s.app/assets/icons/icon-144x144.png',
  '/m.s.app/assets/icons/icon-152x152.png',
  '/m.s.app/assets/icons/icon-192x192.png',
  '/m.s.app/assets/icons/icon-384x384.png',
  '/m.s.app/assets/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap'
];

// Install Event
self.addEventListener('install', event => {
  console.log('Service Worker: Installiert');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching Dateien');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', event => {
  console.log('Service Worker: Aktiviert');
  // Alte Caches bereinigen
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Lösche alten Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetch Event für', event.request.url);
  
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn die Ressource im Cache ist, gib sie zurück
        if (cachedResponse) {
          console.log('Service Worker: Aus Cache:', event.request.url);
          return cachedResponse;
        }
        
        // Ansonsten lade sie vom Netzwerk
        return fetch(event.request)
          .then(response => {
            // Nur gültige Antworten cachen
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Klone die Response, um sie im Cache zu speichern
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Neu geladen und im Cache gespeichert:', event.request.url);
              });
            
            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch fehlgeschlagen:', error);
            // Optional: Eine benutzerdefinierte Offline-Seite zurückgeben
            // return caches.match('/offline.html');
          });
      })
  );
});
