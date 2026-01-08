/**
 * PWA FUNKTIONEN - Matthias Silberhain Portfolio PWA
 * Optimiert für Dark Mode und Preloader
 */

// ========== SERVICE WORKER REGISTRATION ==========
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Warte bis Seite vollständig geladen ist
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initServiceWorker);
        } else {
            initServiceWorker();
        }
    } else {
        console.warn('⚠️ Service Worker nicht unterstützt');
    }
    
    function initServiceWorker() {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('✅ Service Worker registriert:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 Service Worker Update gefunden!');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('🔄 Neue PWA Version verfügbar!');
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.error('❌ Service Worker Registration fehlgeschlagen:', error);
            });
    }
}

// ========== INSTALL PROMPT ==========
let deferredPrompt;

function initInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('📱 PWA Install Prompt verfügbar');
        
        // Install Button nach 3 Sekunden zeigen (nur wenn nicht im Standalone Modus)
        if (!isPWAInstalled()) {
            setTimeout(showInstallButton, 3000);
        }
    });
    
    // Verstecke Button nach erfolgreicher Installation
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA wurde erfolgreich installiert!');
        hideInstallButton();
        deferredPrompt = null;
        
        // Zeige Erfolgsmeldung
        showInstallSuccess();
    });
}

// ========== INSTALL BUTTON FUNCTIONS ==========
function isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

function showInstallButton() {
    // Überprüfe ob bereits installiert
    if (isPWAInstalled()) {
        return;
    }
    
    // Prüfe ob Button bereits existiert
    if (document.getElementById('pwaInstallButton')) {
        return;
    }
    
    // Erstelle Install Button
    const installButton = document.createElement('button');
    installButton.id = 'pwaInstallButton';
    installButton.innerHTML = `
        <svg class="install-icon" viewBox="0 0 24 24" style="width:20px;height:20px;margin-right:8px;">
            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
        </svg>
        <span>App installieren</span>
    `;
    
    // Styling
    installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        font-family: 'Cinzel', serif;
        font-weight: 600;
        letter-spacing: 0.05em;
        font-size: 0.95rem;
        padding: 12px 24px;
        cursor: pointer;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        animation: pulse 2s infinite;
    `;
    
    // Pulse Animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); }
            50% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.7); }
            100% { box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(installButton);
    
    // Animation einblenden
    setTimeout(() => {
        installButton.style.opacity = '1';
        installButton.style.transform = 'translateY(0)';
    }, 100);
    
    // Click Event
    installButton.addEventListener('click', () => {
        if (!deferredPrompt) return;
        
        // Animation ausblenden
        installButton.style.opacity = '0';
        installButton.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            if (installButton.parentNode) {
                installButton.remove();
            }
        }, 300);
        
        // Prompt zeigen
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ User hat die PWA installiert');
            } else {
                console.log('❌ User hat die Installation abgelehnt');
                // Button nach 10 Sekunden wieder zeigen
                setTimeout(showInstallButton, 10000);
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
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (button.parentNode) {
                button.remove();
            }
        }, 300);
    }
}

function showInstallSuccess() {
    const successMsg = document.createElement('div');
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 200, 0, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            z-index: 10001;
            box-shadow: 0 4px 12px rgba(0, 200, 0, 0.3);
            animation: slideIn 0.3s ease;
        ">
            ✅ PWA erfolgreich installiert!
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMsg);
    
    // Nach 3 Sekunden entfernen
    setTimeout(() => {
        if (successMsg.parentNode) {
            successMsg.remove();
        }
    }, 3000);
}

// ========== OFFLINE DETECTION ==========
function initOfflineDetection() {
    function updateOnlineStatus() {
        const statusElement = document.getElementById('connectionStatus');
        const statusText = document.getElementById('pwaStatus');
        const statusIndicator = document.getElementById('pwaStatusIndicator');
        
        if (navigator.onLine) {
            if (statusElement) {
                statusElement.innerHTML = '📶 Online';
                statusElement.className = 'online';
            }
            if (statusText) {
                statusText.textContent = 'Online';
                statusText.style.color = '#4ade80';
            }
            if (statusIndicator) {
                statusIndicator.classList.add('online');
                statusIndicator.classList.remove('offline');
            }
            console.log('🌐 Online');
        } else {
            if (statusElement) {
                statusElement.innerHTML = '📴 Offline';
                statusElement.className = 'offline';
            }
            if (statusText) {
                statusText.textContent = 'Offline';
                statusText.style.color = '#f87171';
            }
            if (statusIndicator) {
                statusIndicator.classList.add('offline');
                statusIndicator.classList.remove('online');
            }
            console.log('📴 Offline Modus aktiv');
            
            // Zeige Offline-Hinweis
            showOfflineNotification();
        }
    }
    
    function showOfflineNotification() {
        // Nur einmal anzeigen
        if (document.getElementById('offlineNotification')) return;
        
        const notification = document.createElement('div');
        notification.id = 'offlineNotification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 87, 87, 0.9);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                font-family: 'Cinzel', serif;
                font-size: 0.85rem;
                z-index: 10001;
                box-shadow: 0 4px 12px rgba(255, 87, 87, 0.3);
                text-align: center;
                max-width: 300px;
            ">
                📴 Offline - Verwende gespeicherte Version
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Nach 5 Sekunden entfernen
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial aufrufen
    setTimeout(updateOnlineStatus, 1000);
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
            <p style="margin:0 0 10px 0; color: #667eea;">✨ Neue Version verfügbar!</p>
            <button id="reloadBtn" style="
                background: rgba(102, 126, 234, 0.8);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-family: inherit;
                margin-right: 10px;
                font-size: 0.85rem;
            ">Jetzt aktualisieren</button>
            <button id="closeUpdate" style="
                background: transparent;
                border: none;
                color: #999;
                cursor: pointer;
                font-size: 0.85rem;
            ">Später</button>
        </div>
    `;
    
    document.body.appendChild(updateNotification);
    
    document.getElementById('reloadBtn').addEventListener('click', () => {
        // Service Worker update
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(registration => {
                if (registration) {
                    registration.update();
                }
            });
        }
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
function initPWA() {
    console.log('🚀 Initialisiere PWA Features...');
    
    // Prüfe ob Preloader bereits fertig ist
    if (document.body.classList.contains('loaded')) {
        startPWA();
    } else {
        // Warte auf Preloader
        const checkInterval = setInterval(() => {
            if (document.body.classList.contains('loaded')) {
                clearInterval(checkInterval);
                startPWA();
            }
        }, 100);
        
        // Timeout nach 5 Sekunden
        setTimeout(() => {
            clearInterval(checkInterval);
            startPWA();
        }, 5000);
    }
}

function startPWA() {
    console.log('✅ Preloader fertig, starte PWA...');
    
    // Initialisiere alle PWA Funktionen
    registerServiceWorker();
    initInstallPrompt();
    initOfflineDetection();
    
    // Zeige PWA Status Indicator
    const statusIndicator = document.getElementById('pwaStatusIndicator');
    if (statusIndicator) {
        statusIndicator.style.display = 'block';
        setTimeout(() => {
            statusIndicator.style.opacity = '1';
        }, 100);
    }
}

// ========== START PWA INITIALIZATION ==========
// Warte bis DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPWA);
} else {
    // DOM ist bereits geladen
    initPWA();
}

// ========== EXPOSE FOR DEBUGGING ==========
window.PWA = {
    registerServiceWorker,
    initInstallPrompt,
    initOfflineDetection,
    showInstallButton,
    hideInstallButton
};

console.log('📱 PWA Module geladen und bereit');
