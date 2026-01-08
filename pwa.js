// PWA Funktionen für Matthias Silberhain Portfolio

// ========== SERVICE WORKER REGISTRATION ==========
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')  // Pfad korrigiert (kein /m.s.app/)
        .then(registration => {
          console.log('✅ Service Worker registriert:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('🔄 Service Worker Update gefunden!');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 Neue Version verfügbar!');
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

function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Install Button nach 5 Sekunden zeigen
    setTimeout(() => {
      showInstallButton();
    }, 5000);
  });
  
  // Verstecke Button nach erfolgreicher Installation
  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA wurde erfolgreich installiert!');
    hideInstallButton();
    deferredPrompt = null;
  });
}

// ========== INSTALL BUTTON FUNCTIONS ==========
function showInstallButton() {
  // Überprüfe ob bereits installiert
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return; // Bereits installiert
  }
  
  // Erstelle Install Button
  const installButton = document.createElement('button');
  installButton.id = 'pwaInstallButton';
  installButton.innerHTML = `
    <svg class="button-arrow" viewBox="0 0 24 24" style="width:18px;height:18px;">
      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
    </svg>
    <span>App installieren</span>
  `;
  
  // Styling
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(45deg, rgba(192,192,192,0.3), rgba(192,192,192,0.2));
    color: #d6d9de;
    border: 1px solid rgba(200,205,215,0.5);
    border-radius: 4px;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.1em;
    text-decoration: none;
    font-size: 0.95rem;
    padding: 12px 20px;
    cursor: pointer;
    z-index: 9998;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  `;
  
  // Dark Mode Styling
  if (document.body.classList.contains('dark-mode')) {
    installButton.style.background = 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2))';
    installButton.style.borderColor = 'rgba(255,255,255,0.4)';
    installButton.style.color = '#ffffff';
  }
  
  document.body.appendChild(installButton);
  
  // Animation einblenden
  setTimeout(() => {
    installButton.style.opacity = '1';
    installButton.style.transform = 'translateY(0)';
  }, 100);
  
  // Click Event
  installButton.addEventListener('click', () => {
    if (!deferredPrompt) return;
    
    installButton.style.opacity = '0';
    installButton.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      installButton.remove();
    }, 300);
    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User hat die PWA installiert');
      } else {
        console.log('❌ User hat die Installation abgelehnt');
      }
      deferredPrompt = null;
    });
  });
  
  // Auto-hide nach 30 Sekunden
  setTimeout(() => {
    if (installButton.parentNode) {
      installButton.style.opacity = '0';
      installButton.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (installButton.parentNode) {
          installButton.remove();
        }
      }, 300);
    }
  }, 30000);
}

function hideInstallButton() {
  const button = document.getElementById('pwaInstallButton');
  if (button) {
    button.remove();
  }
}

// ========== OFFLINE DETECTION ==========
function initOfflineDetection() {
  function updateOnlineStatus() {
    // Optional: Zeige Offline-Status irgendwo an
    if (!navigator.onLine) {
      console.log('📴 Offline Modus aktiv');
    }
  }
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

// ========== UPDATE NOTIFICATION ==========
function showUpdateNotification() {
  // Nur zeigen, wenn nicht zu oft
  const lastUpdateTime = localStorage.getItem('lastUpdatePrompt');
  const now = Date.now();
  
  if (lastUpdateTime && (now - lastUpdateTime < 24 * 60 * 60 * 1000)) {
    return; // Nur einmal pro Tag anzeigen
  }
  
  localStorage.setItem('lastUpdatePrompt', now);
  
  const updateNotification = document.createElement('div');
  updateNotification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 70px;
      right: 20px;
      background: rgba(0,0,0,0.9);
      color: #ffffff;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(192,192,192,0.3);
      font-family: 'Cinzel', serif;
      font-size: 0.9rem;
      max-width: 250px;
      z-index: 9997;
      box-shadow: 0 5px 20px rgba(0,0,0,0.5);
    ">
      <p style="margin:0 0 10px 0;">Neue Version verfügbar!</p>
      <button id="reloadBtn" style="
        background: rgba(192,192,192,0.3);
        color: white;
        border: 1px solid rgba(192,192,192,0.5);
        padding: 5px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
        margin-right: 10px;
      ">Aktualisieren</button>
      <button id="closeUpdate" style="
        background: transparent;
        border: none;
        color: #999;
        cursor: pointer;
      ">Später</button>
    </div>
  `;
  
  document.body.appendChild(updateNotification);
  
  document.getElementById('reloadBtn').addEventListener('click', () => {
    window.location.reload();
  });
  
  document.getElementById('closeUpdate').addEventListener('click', () => {
    updateNotification.remove();
  });
  
  // Auto-remove nach 20 Sekunden
  setTimeout(() => {
    if (updateNotification.parentNode) {
      updateNotification.remove();
    }
  }, 20000);
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initialisiere PWA Features...');
  
  // Warte bis Preloader fertig ist
  const initPWA = () => {
    if (document.body.classList.contains('loaded')) {
      registerServiceWorker();
      initInstallPrompt();
      initOfflineDetection();
    } else {
      setTimeout(initPWA, 500);
    }
  };
  
  initPWA();
});

// ========== EXPOSE FOR DEBUGGING ==========
window.PWA = {
  registerServiceWorker,
  initInstallPrompt,
  initOfflineDetection
};
