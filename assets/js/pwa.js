/**
 * PWA - Service Worker & Installation
 */

(function() {
    'use strict';
    
    console.log('📱 PWA Initialisierung');
    
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            const swUrl = '/m.s.app/sw.js';
            
            navigator.serviceWorker.register(swUrl)
                .then(function(registration) {
                    console.log('✅ Service Worker registriert:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        console.log('🔄 Service Worker Update gefunden');
                        
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('🆕 Neuer Service Worker verfügbar');
                                // Hier könntest du ein Update-Banner anzeigen
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.error('❌ Service Worker Registrierung fehlgeschlagen:', error);
                });
        });
    }
    
    // Before Install Prompt
    let deferredPrompt;
    const installButton = document.createElement('button');
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('📲 PWA Installation verfügbar');
        
        // Optional: Install Button anzeigen
        showInstallPromotion();
    });
    
    // App Installed Event
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA erfolgreich installiert');
        deferredPrompt = null;
        
        // Install Button verstecken
        if (installButton.parentNode) {
            installButton.parentNode.removeChild(installButton);
        }
    });
    
    // Install Button Funktion
    function showInstallPromotion() {
        installButton.textContent = 'App installieren';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #000;
            color: white;
            border: 1px solid silver;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            cursor: pointer;
            font-family: 'Cinzel', serif;
        `;
        
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
            
            installButton.parentNode.removeChild(installButton);
        });
        
        document.body.appendChild(installButton);
        
        // Automatisch nach 10 Sekunden verstecken
        setTimeout(() => {
            if (installButton.parentNode) {
                installButton.parentNode.removeChild(installButton);
            }
        }, 10000);
    }
    
    // Offline Status
    window.addEventListener('online', () => {
        console.log('📶 Online');
        document.body.classList.remove('offline');
    });
    
    window.addEventListener('offline', () => {
        console.log('⚠️ Offline');
        document.body.classList.add('offline');
    });
    
    // Initialer Offline Check
    if (!navigator.onLine) {
        document.body.classList.add('offline');
        console.log('⚠️ Starte offline');
    }
})();
