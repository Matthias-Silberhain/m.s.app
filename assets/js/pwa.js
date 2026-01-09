/**
 * PWA - Installation & Service Worker Registration
 * Datei: assets/js/pwa.js
 */

(function() {
    'use strict';
    
    console.log('📱 PWA Initialisierung gestartet');
    
    // 1. Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // WICHTIG: Service Worker liegt im Root-Verzeichnis
            const swUrl = '/m.s.app/sw.js';
            
            navigator.serviceWorker.register(swUrl)
                .then(function(registration) {
                    console.log('✅ Service Worker registriert. Scope:', registration.scope);
                    
                    // Update-Check
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        console.log('🔄 Neuer Service Worker gefunden');
                        
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('🆕 Neuer Service Worker bereit. Seite neu laden für Update.');
                                // Optional: Update-Banner anzeigen
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.error('❌ Service Worker Registrierung fehlgeschlagen:', error);
                });
        });
    } else {
        console.log('ℹ️ Service Worker nicht unterstützt');
    }
    
    // 2. PWA Installation Prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('📲 PWA Installation verfügbar');
        
        // Optional: Install Button anzeigen nach 3 Sekunden
        setTimeout(showInstallButton, 3000);
    });
    
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA erfolgreich installiert');
        deferredPrompt = null;
        hideInstallButton();
    });
    
    // 3. Install Button Functions
    function showInstallButton() {
        if (!deferredPrompt) return;
        
        const installBtn = document.createElement('button');
        installBtn.id = 'installPwaBtn';
        installBtn.innerHTML = '📱 App installieren';
        installBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.9);
            color: #c0c0c0;
            border: 1px solid #c0c0c0;
            padding: 12px 20px;
            border-radius: 5px;
            font-family: 'Cinzel', serif;
            font-size: 14px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(192,192,192,0.3);
        `;
        
        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
            hideInstallButton();
        });
        
        document.body.appendChild(installBtn);
        
        // Automatisch nach 10 Sekunden verstecken
        setTimeout(hideInstallButton, 10000);
    }
    
    function hideInstallButton() {
        const installBtn = document.getElementById('installPwaBtn');
        if (installBtn && installBtn.parentNode) {
            installBtn.parentNode.removeChild(installBtn);
        }
    }
    
    // 4. Network Status
    function updateNetworkStatus() {
        if (!navigator.onLine) {
            console.log('⚠️ Offline Modus');
            document.body.classList.add('offline');
        } else {
            document.body.classList.remove('offline');
        }
    }
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus(); // Initial check
    
    console.log('✅ PWA.js initialisiert');
})();
