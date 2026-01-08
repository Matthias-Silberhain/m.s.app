// Service Worker Registrierung
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/m.s.app/sw.js')
      .then(registration => {
        console.log('Service Worker registriert:', registration);
      })
      .catch(error => {
        console.log('Service Worker Registrierung fehlgeschlagen:', error);
      });
  });
}

// Installationsprompt
let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
      installButton.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});

// Online/Offline Status
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
  const status = document.getElementById('onlineStatus');
  if (navigator.onLine) {
    if (status) status.textContent = 'Online';
  } else {
    if (status) status.textContent = 'Offline';
  }
}

// Initialer Aufruf
updateOnlineStatus();
