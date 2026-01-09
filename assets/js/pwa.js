/**
 * PWA - Optimiert für Animationen
 */

(function() {
    'use strict';
    
    console.log('📱 PWA initialisiert');
    
    // Warte auf Preloader Fertigstellung
    const waitForPreloader = setInterval(() => {
        if (document.body.classList.contains('loaded')) {
            clearInterval(waitForPreloader);
            initPWA();
        }
    }, 100);
    
    function initPWA() {
        // Service Worker Registration
        if ('serviceWorker' in navigator) {
            // Kleine Verzögerung für besseres UX
            setTimeout(() => {
                const swUrl = '/m.s.app/sw.js';
                
                navigator.serviceWorker.register(swUrl)
                    .then(function(registration) {
                        console.log('✅ Service Worker registriert:', registration.scope);
                        
                        // Animation für erfolgreiche Registration
                        if (document.getElementById('preloader')) {
                            const line = document.querySelector('.preloader-line');
                            if (line) {
                                line.style.background = 'linear-gradient(90deg, transparent, #4CAF50, #4CAF50, transparent)';
                            }
                        }
                    })
                    .catch(function(error) {
                        console.error('❌ Service Worker Registrierung fehlgeschlagen:', error);
                    });
            }, 500);
        }
        
        // Installation Prompt (nach Preloader)
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            console.log('📲 PWA Installation verfügbar');
            
            // Zeige Install Button nach 3 Sekunden
            setTimeout(showInstallButton, 3000);
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('🎉 PWA erfolgreich installiert');
            deferredPrompt = null;
            
            // Erfolgsanimation
            const installBtn = document.getElementById('installPwaBtn');
            if (installBtn) {
                installBtn.innerHTML = '✅ Installiert';
                installBtn.style.background = '#4CAF50';
                setTimeout(() => {
                    if (installBtn.parentNode) {
                        installBtn.parentNode.removeChild(installBtn);
                    }
                }, 2000);
            }
        });
    }
    
    function showInstallButton() {
        // ... (restlicher Code bleibt gleich)
    }
    
    // ... (restlicher Code bleibt gleich)
})();
