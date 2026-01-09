/**
 * PWA - Service Worker & Installation
 */

(function() {
    'use strict';
    
    console.log('📱 PWA Initialisierung');
    
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Service Worker liegt im Root
            const swUrl = '/m.s.app/sw.js';
            
            navigator.serviceWorker.register(swUrl)
                .then(function(registration) {
                    console.log('✅ Service Worker registriert:', registration.scope);
                    
                    // Update Check
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        console.log('🔄 Neuer Service Worker gefunden');
                        
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('🆕 Neuer Service Worker verfügbar');
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.error('❌ Service Worker Registrierung fehlgeschlagen:', error);
                });
        });
    }
    
    // Installation
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('📲 PWA Installation verfügbar');
        
        // Install Button nach 5 Sekunden zeigen
        setTimeout(showInstallButton, 5000);
    });
    
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA erfolgreich installiert');
        deferredPrompt = null;
        hideInstallButton();
    });
    
    // Install Button
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
        
        // Nach 15 Sekunden verstecken
        setTimeout(hideInstallButton, 15000);
    }
    
    function hideInstallButton() {
        const installBtn = document.getElementById('installPwaBtn');
        if (installBtn && installBtn.parentNode) {
            installBtn.parentNode.removeChild(installBtn);
        }
    }
    
    // Network Status
    window.addEventListener('online', () => {
        console.log('📶 Online');
        document.body.classList.remove('offline');
    });
    
    window.addEventListener('offline', () => {
        console.log('⚠️ Offline');
        document.body.classList.add('offline');
    });
    
    // Initial Check
    if (!navigator.onLine) {
        document.body.classList.add('offline');
    }
    
    console.log('✅ PWA.js initialisiert');
})();
