// PWA Funktionen für Matthias Silberhain Portfolio

// ========== SERVICE WORKER REGISTRATION ==========
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/m.s.app/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registriert:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('🔄 Service Worker Update gefunden!');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 Neue Version verfügbar! Seite neu laden.');
                showUpdateNotification();
              }
            });
          });
        })
        .catch(error => {
          console.error('❌ Service Worker Registration fehlgeschlagen:', error);
        });
    });
  }
}

// ========== INSTALL PROMPT ==========
let deferredPrompt;
const installButton = document.createElement('button');

function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Install Button erstellen (optional - kann in deinem Design integriert werden)
    installButton.innerHTML = `
      <svg class="button-arrow" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>App installieren</span>
    `;
    installButton.className = 'silber-button';
    installButton.id = 'installButton';
    installButton.style.display = 'none';
    installButton.style.margin = '20px auto';
    installButton.style.opacity = '0';
    installButton.style.transition = 'opacity 0.3s ease';
    
    // Finde einen geeigneten Platz für den Button (z.B. vor dem Footer)
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.parentNode.insertBefore(installButton, footer);
      
      // Button nach 5 Sekunden zeigen
      setTimeout(() => {
        installButton.style.display = 'block';
        setTimeout(() => {
          installButton.style.opacity = '1';
        }, 100);
      }, 5000);
    }
    
    installButton.addEventListener('click', () => {
      installButton.style.opacity = '0';
      setTimeout(() => {
        installButton.style.display = 'none';
      }, 300);
      
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User hat die PWA installiert');
          ga('send', 'event', 'PWA', 'install', 'accepted');
        } else {
          console.log('❌ User hat die Installation abgelehnt');
          ga('send', 'event', 'PWA', 'install', 'declined');
        }
        deferredPrompt = null;
      });
    });
  });
  
  // Verstecke Button nach erfolgreicher Installation
  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA wurde erfolgreich installiert!');
    if (installButton) {
      installButton.style.display = 'none';
    }
    deferredPrompt = null;
  });
}

// ========== OFFLINE DETECTION ==========
function initOfflineDetection() {
  const offlineIndicator = document.createElement('div');
  offlineIndicator.id = 'offlineIndicator';
  offlineIndicator.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0,0,0,0.9);
      color: #ff6b6b;
      padding: 10px 20px;
      border-radius: 4px;
      border: 1px solid #ff6b6b;
      z-index: 10000;
      font-family: 'Cinzel', serif;
      font-size: 0.9rem;
      display: none;
      align-items: center;
      gap: 10px;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>Offline Modus</span>
    </div>
  `;
  document.body.appendChild(offlineIndicator);
  
  function updateOnlineStatus() {
    const indicator = document.getElementById('offlineIndicator');
    if (navigator.onLine) {
      indicator.style.display = 'none';
    } else {
      indicator.style.display = 'flex';
    }
  }
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus(); // Initial check
}

// ========== UPDATE NOTIFICATION ==========
function showUpdateNotification() {
  // Sanfte Benachrichtigung für Updates
  const updateNotification = document.createElement('div');
  updateNotification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(192,192,192,0.95);
      color: #000;
      padding: 15px 25px;
      border-radius: 8px;
      z-index: 10001;
      font-family: 'Cinzel', serif;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      animation: fadeInUp 0.3s ease;
    ">
      <span>Neue Version verfügbar!</span>
      <button id="reloadButton" style="
        background: #000;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.8rem;
      ">Aktualisieren</button>
      <button id="closeUpdate" style="
        background: transparent;
        border: none;
        color: #000;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0 5px;
      ">×</button>
    </div>
  `;
  document.body.appendChild(updateNotification);
  
  document.getElementById('reloadButton').addEventListener('click', () => {
    window.location.reload();
  });
  
  document.getElementById('closeUpdate').addEventListener('click', () => {
    updateNotification.style.animation = 'fadeOutDown 0.3s ease';
    setTimeout(() => {
      updateNotification.remove();
    }, 300);
  });
  
  // Auto-remove nach 30 Sekunden
  setTimeout(() => {
    if (updateNotification.parentNode) {
      updateNotification.remove();
    }
  }, 30000);
}

// ========== PWA FEATURE DETECTION ==========
function checkPWASupport() {
  const features = {
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    backgroundSync: 'SyncManager' in window,
    installPrompt: 'onbeforeinstallprompt' in window,
    standalone: window.matchMedia('(display-mode: standalone)').matches
  };
  
  console.log('📱 PWA Support:', features);
  
  // Wenn bereits als PWA installiert
  if (features.standalone) {
    console.log('📱 Läuft als installierte PWA');
    // Hier können wir spezielle PWA-only Features aktivieren
  }
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initialisiere PWA Features...');
  
  // Warte bis Preloader fertig ist
  setTimeout(() => {
    registerServiceWorker();
    initInstallPrompt();
    initOfflineDetection();
    checkPWASupport();
  }, 1000);
});

// ========== EXPOSE FOR DEBUGGING ==========
window.PWA = {
  registerServiceWorker,
  initInstallPrompt,
  initOfflineDetection,
  checkPWASupport
};
