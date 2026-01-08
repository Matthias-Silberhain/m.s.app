// Service Worker für Matthias Silberhain Portfolio PWA
const CACHE_NAME = 'ms-portfolio-v2';
const APP_VERSION = '2.0.0';

// Dateien, die im Cache gespeichert werden sollen
const urlsToCache = [
  // HTML
  '/m.s.app/',
  '/m.s.app/index.html',
  
  // PWA Dateien
  '/m.s.app/manifest.json',
  '/m.s.app/sw.js',
  
  // CSS
  '/m.s.app/style.css',
  
  // Icons (wichtigste)
  '/m.s.app/icons/icon-192x192.png',
  '/m.s.app/icons/icon-512x512.png',
  
  // Fonts (EB Garamond, Cinzel)
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap',
  
  // Externe Icons (falls verwendet)
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css'
];

// ========== INSTALL ==========
self.addEventListener('install', event => {
  console.log('[Service Worker] Installiert Version', APP_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching wichtige Dateien');
        return cache.addAll(urlsToCache)
          .then(() => {
            console.log('[Service Worker] Alle Dateien gecached');
            return self.skipWaiting();
          })
          .catch(error => {
            console.error('[Service Worker] Fehler beim Caching:', error);
          });
      })
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
    .then(() => {
      console.log('[Service Worker] Jetzt Kontrolle über alle Tabs übernehmen');
      return self.clients.claim();
    })
  );
});

// ========== FETCH ==========
self.addEventListener('fetch', event => {
  // Nur GET Requests cachen
  if (event.request.method !== 'GET') return;
  
  // Externe Ressourcen (CDNs) und interne behandeln
  const url = new URL(event.request.url);
  
  // Strategie: Cache First, dann Netzwerk
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn im Cache gefunden, zurückgeben
        if (cachedResponse) {
          console.log('[Service Worker] Aus Cache:', url.pathname);
          return cachedResponse;
        }
        
        // Sonst vom Netzwerk laden
        console.log('[Service Worker] Lade vom Netzwerk:', url.pathname);
        return fetch(event.request)
          .then(response => {
            // Prüfen ob die Antwort gültig ist
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Response klonen (stream kann nur einmal gelesen werden)
            const responseToCache = response.clone();
            
            // Im Cache speichern für nächste Anfragen
            caches.open(CACHE_NAME)
              .then(cache => {
                // Prüfen ob es eine HTML-Datei ist
                if (event.request.url.includes('/m.s.app/') && 
                    event.request.headers.get('accept').includes('text/html')) {
                  console.log('[Service Worker] HTML im Cache gespeichert:', url.pathname);
                }
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch fehlgeschlagen:', error);
            
            // Fallback für Offline: Startseite zurückgeben
            if (event.request.mode === 'navigate') {
              return caches.match('/m.s.app/index.html');
            }
            
            // Fallback für CSS/JS: Leere Antwort
            if (event.request.destination === 'style' || 
                event.request.destination === 'script') {
              return new Response('/* Offline */', {
                headers: { 'Content-Type': 'text/css' }
              });
            }
            
            return new Response('Offline - Bitte Netzwerkverbindung prüfen', {
              status: 408,
              statusText: 'Offline'
            });
          });
      })
  );
});

// ========== BACKGROUND SYNC (optional) ==========
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[Service Worker] Background Sync gestartet');
    event.waitUntil(syncOfflineData());
  }
});

// ========== PUSH NOTIFICATIONS (optional) ==========
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/m.s.app/icons/icon-192x192.png',
    badge: '/m.s.app/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Öffnen',
        icon: '/m.s.app/icons/open-icon.png'
      },
      {
        action: 'close',
        title: 'Schließen',
        icon: '/m.s.app/icons/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Matthias Silberhain', options)
  );
});

// ========== HELPER FUNCTIONS ==========
async function syncOfflineData() {
  // Hier können offline Daten synchronisiert werden
  console.log('[Service Worker] Synchronisiere Offline-Daten...');
  // Implementierung je nach Bedarf
}
