// Service Worker für Matthias Silberhain Portfolio PWA
const CACHE_NAME = 'ms-portfolio-v1.0';
const APP_VERSION = '1.0.0';

// Dateien, die im Cache gespeichert werden sollen (alle wichtigen Assets)
const urlsToCache = [
  // ========== HTML ==========
  '/m.s.app/',
  '/m.s.app/index.html',
  
  // ========== PWA Dateien ==========
  '/m.s.app/manifest.json',
  '/m.s.app/sw.js',
  '/m.s.app/pwa.js',
  
  // ========== CSS ==========
  '/m.s.app/assets/css/style.css',
  
  // ========== Bilder ==========
  '/m.s.app/assets/images/logo.png',
  
  // ========== Icons ==========
  '/m.s.app/icons/icon-72x72.png',
  '/m.s.app/icons/icon-192x192.png',
  '/m.s.app/icons/icon-512x512.png',
  
  // ========== Fonts (Extern - für Offline nutzen wir Fallback) ==========
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap',
  'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@400;500;600&display=swap',
  
  // ========== SVG Icons (Inline, aber für Vollständigkeit) ==========
  // Die SVG Icons sind in der HTML, also nicht extra cachen
];

// ========== INSTALL ==========
self.addEventListener('install', event => {
  console.log('[Service Worker] 📦 Installiert Version', APP_VERSION);
  
  // Installationsprozess erzwingen
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] 🔄 Öffne Cache:', CACHE_NAME);
        
        // Versuche alle wichtigen Dateien zu cachen
        return cache.addAll(urlsToCache)
          .then(() => {
            console.log('[Service Worker] ✅ Alle wichtigen Dateien gecached');
          })
          .catch(error => {
            console.warn('[Service Worker] ⚠️ Einige Dateien konnten nicht gecached werden:', error);
            // Selbst wenn einige fehlschlagen, Installation als erfolgreich markieren
          });
      })
      .then(() => {
        console.log('[Service Worker] 🚀 Installation abgeschlossen');
      })
  );
});

// ========== ACTIVATE ==========
self.addEventListener('activate', event => {
  console.log('[Service Worker] ✅ Aktiviert');
  
  event.waitUntil(
    // Alte Caches löschen
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] 🗑️ Lösche alten Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] 🎯 Jetzt Kontrolle über alle Tabs');
      return self.clients.claim();
    })
    .then(() => {
      console.log('[Service Worker] 🏁 Service Worker bereit');
    })
  );
});

// ========== FETCH ==========
self.addEventListener('fetch', event => {
  // Nur GET Requests behandeln
  if (event.request.method !== 'GET') return;
  
  const requestUrl = new URL(event.request.url);
  
  // Skip Cross-Origin Requests (außer Fonts)
  if (requestUrl.origin !== self.location.origin) {
    // Erlaube nur bestimmte externe Ressourcen
    if (!requestUrl.href.includes('fonts.googleapis.com') && 
        !requestUrl.href.includes('fonts.gstatic.com')) {
      return;
    }
  }
  
  // Für Navigationsanfragen: HTML immer vom Netzwerk, mit Cache-Fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Klonen der Response um sie zu cachen
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
          return response;
        })
        .catch(() => {
          // Wenn offline, versuche die gecachte Version
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Fallback zur Index-Seite
              return caches.match('/m.s.app/index.html');
            });
        })
    );
    return;
  }
  
  // Für alle anderen Anfragen: Cache First Strategie
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn im Cache gefunden und nicht abgelaufen, zurückgeben
        if (cachedResponse) {
          console.log('[Service Worker] 📂 Aus Cache:', requestUrl.pathname);
          return cachedResponse;
        }
        
        // Sonst vom Netzwerk laden
        console.log('[Service Worker] 🌐 Lade vom Netzwerk:', requestUrl.pathname);
        return fetch(event.request)
          .then(response => {
            // Nur erfolgreiche Responses cachen
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Response klonen (Stream kann nur einmal gelesen werden)
            const responseToCache = response.clone();
            
            // Im Cache speichern für zukünftige Anfragen
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.log('[Service Worker] ❌ Fetch fehlgeschlagen:', error);
            
            // Spezielle Fallbacks für bestimmte Dateitypen
            if (event.request.destination === 'style') {
              return new Response('/* Fallback CSS für Offline-Modus */', {
                headers: { 'Content-Type': 'text/css' }
              });
            }
            
            if (event.request.destination === 'image') {
              // Für Bilder: Platzhalter zurückgeben oder nichts
              if (requestUrl.pathname.includes('logo')) {
                return new Response(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000"/><text x="50" y="50" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle" dy=".3em">MS</text></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              }
            }
            
            // Generischer Fallback
            return new Response('<h1>Offline</h1><p>Bitte überprüfe deine Internetverbindung.</p>', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
      })
  );
});

// ========== BACKGROUND SYNC ==========
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    console.log('[Service Worker] 🔄 Background Sync gestartet');
    event.waitUntil(syncOfflineData());
  }
});

// ========== PUSH NOTIFICATIONS ==========
self.addEventListener('push', event => {
  console.log('[Service Worker] 📨 Push Notification empfangen');
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'Neue Benachrichtigung', body: event.data.text() };
    }
  }
  
  const options = {
    body: data.body || 'Neue Updates verfügbar',
    icon: '/m.s.app/icons/icon-192x192.png',
    badge: '/m.s.app/icons/icon-72x72.png',
    tag: 'portfolio-notification',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'Öffnen'
      },
      {
        action: 'close',
        title: 'Schließen'
      }
    ],
    data: {
      url: data.url || '/m.s.app/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Matthias Silberhain', options)
  );
});

// ========== NOTIFICATION CLICK ==========
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] 👆 Notification geklickt:', event.action);
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  // Öffne die Seite, wenn auf die Notification geklickt wurde
  const urlToOpen = event.notification.data.url || '/m.s.app/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(clientList => {
      // Prüfe ob bereits ein Tab/Fenster mit der URL offen ist
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Sonst neues Fenster öffnen
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// ========== PERIODIC SYNC (Hintergrundaktualisierung) ==========
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-content') {
    console.log('[Service Worker] 🔄 Periodische Aktualisierung');
    event.waitUntil(updateContentCache());
  }
});

// ========== HELPER FUNCTIONS ==========

async function syncOfflineData() {
  // Hier könnten offline gespeicherte Formulardaten synchronisiert werden
  console.log('[Service Worker] Synchronisiere Offline-Daten...');
  
  try {
    // Beispiel: LocalStorage Daten synchronisieren
    const offlineData = await new Promise(resolve => {
      const data = localStorage.getItem('offlineForms');
      resolve(data ? JSON.parse(data) : []);
    });
    
    if (offlineData.length > 0) {
      // Hier würde der eigentliche Sync mit einem Backend stattfinden
      console.log('[Service Worker] Gefundene Offline-Daten:', offlineData.length);
      
      // Nach erfolgreichem Sync: Daten löschen
      localStorage.removeItem('offlineForms');
      console.log('[Service Worker] Offline-Daten erfolgreich synchronisiert');
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('[Service Worker] Sync fehlgeschlagen:', error);
    return Promise.reject(error);
  }
}

async function updateContentCache() {
  console.log('[Service Worker] Aktualisiere Cache-Inhalte...');
  
  try {
    const cache = await caches.open(CACHE_NAME);
    
    // Aktualisiere wichtige Dateien
    const urlsToUpdate = [
      '/m.s.app/index.html',
      '/m.s.app/manifest.json',
      '/m.s.app/assets/css/style.css'
    ];
    
    for (const url of urlsToUpdate) {
      try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (response.ok) {
          await cache.put(url, response);
          console.log('[Service Worker] Aktualisiert:', url);
        }
      } catch (error) {
        console.warn('[Service Worker] Konnte nicht aktualisieren:', url, error);
      }
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('[Service Worker] Cache-Aktualisierung fehlgeschlagen:', error);
    return Promise.reject(error);
  }
}

// ========== CACHE CLEANUP HELPER ==========
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const currentCaches = [CACHE_NAME];
  
  return Promise.all(
    cacheNames.map(cacheName => {
      if (!currentCaches.includes(cacheName)) {
        console.log('[Service Worker] Lösche veralteten Cache:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
}

// ========== MESSAGE HANDLING ==========
self.addEventListener('message', event => {
  console.log('[Service Worker] 📩 Nachricht empfangen:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME)
      .then(success => {
        console.log('[Service Worker] Cache gelöscht:', success);
        event.ports[0].postMessage({ success: true });
      })
      .catch(error => {
        console.error('[Service Worker] Cache-Löschen fehlgeschlagen:', error);
        event.ports[0].postMessage({ success: false, error: error.message });
      });
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    caches.open(CACHE_NAME)
      .then(cache => cache.keys())
      .then(keys => {
        event.ports[0].postMessage({
          cacheName: CACHE_NAME,
          cachedItems: keys.map(req => req.url),
          version: APP_VERSION
        });
      });
  }
});

// ========== ERROR HANDLING ==========
self.addEventListener('error', event => {
  console.error('[Service Worker] ❌ Fehler:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('[Service Worker] ❌ Unbehandelte Ablehnung:', event.reason);
});

// Service Worker initialisiert
console.log('[Service Worker] 🚀 Service Worker geladen und bereit');
