// Cache Name
const CACHE_NAME = 'm.s.app-v1.0';

// Assets to cache
const urlsToCache = [
  '/m.s.app/',
  '/m.s.app/index.html',
  '/m.s.app/manifest.json',
  '/m.s.app/icons/icon-72x72.png',
  '/m.s.app/icons/icon-96x96.png',
  '/m.s.app/icons/icon-128x128.png',
  '/m.s.app/icons/icon-144x144.png',
  '/m.s.app/icons/icon-192x192.png',
  '/m.s.app/icons/icon-256x256.png',
  '/m.s.app/icons/icon-384x384.png',
  '/m.s.app/icons/icon-512x512.png',
  '/m.s.app/icons/icon-32x32.png',
  '/m.s.app/icons/icon-16x16.png',
  '/m.s.app/icons/icon-180x180.png'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Event
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
