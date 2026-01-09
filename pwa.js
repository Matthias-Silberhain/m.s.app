/**
 * PWA Installation und Service Worker Registrierung
 */

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    const swUrl = '/m.s.app/sw.js';
    
    navigator.serviceWorker.register(swUrl)
      .then(function(registration) {
        console.log('✅ Service Worker registriert:', registration.scope);
      })
      .catch(function(error) {
        console.error('❌ Service Worker Registrierung fehlgeschlagen:', error);
      });
  });
}

// Before Install Prompt Handling
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('📲 PWA Installation verfügbar');
});

// App Installed Event
window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA erfolgreich installiert');
  deferredPrompt = null;
});
