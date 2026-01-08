const CACHE_NAME = 'ms-app-v1';
const urlsToCache = [
  '/m.s.app/',
  '/m.s.app/index.html',
  '/m.s.app/style.css',
  '/m.s.app/script.js', // falls vorhanden
  '/m.s.app/manifest.json'
  // Füge hier alle wichtigen Assets hinzu: Bilder, Fonts, etc.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
