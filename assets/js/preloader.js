/**
 * PRELOADER - Matthias Silberhain PWA
 * Robuste Version für alle Geräte
 */

(function() {
    'use strict';
    
    console.log('🚀 Preloader initialisiert');
    
    // Warte auf DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        const preloader = document.getElementById('preloader');
        const preloaderText = document.getElementById('type-text');
        const currentYear = document.getElementById('currentYear');
        
        // 1. Preloader sicherstellen
        if (!preloader) {
            console.error('❌ Preloader nicht gefunden');
            document.body.classList.add('loaded');
            return;
        }
        
        // Preloader anzeigen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        // 2. Aktuelles Jahr setzen
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
        
        // 3. Gerät erkennen
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            startMobilePreloader(preloaderText);
        } else {
            startDesktopPreloader(preloaderText);
        }
        
        // 4. Line Animation starten
        const line = document.querySelector('.preloader-line');
        if (line) {
            setTimeout(() => {
                line.classList.add('active');
            }, 300);
        }
        
        // 5. Preloader beenden nach Zeit
        const delay = isMobile ? 1800 : 2500;
        setTimeout(() => finishPreloader(preloader), delay);
        
        // 6. Absolute Sicherheit
        setTimeout(() => finishPreloader(preloader), 4000);
        
        // 7. Window Load Backup
        window.addEventListener('load', () => {
            setTimeout(() => finishPreloader(preloader), 1000);
        });
    }
    
    function startMobilePreloader(preloaderText) {
        console.log('📱 Mobile Preloader');
        
        // Sofort Text anzeigen (keine Animation auf Mobile)
        if (preloaderText) {
            preloaderText.textContent = 'MATTHIAS SILBERHAIN';
        }
    }
    
    function startDesktopPreloader(preloaderText) {
        console.log('💻 Desktop Preloader');
        
        // Typewriter Effect
        if (preloaderText) {
            const text = 'MATTHIAS SILBERHAIN';
            let i = 0;
            const speed = 80;
            
            function typeWriter() {
                if (i < text.length) {
                    preloaderText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            
            setTimeout(() => {
                preloaderText.textContent = '';
                typeWriter();
            }, 300);
        }
    }
    
    function finishPreloader(preloader) {
        if (!preloader || preloader.classList.contains('loaded')) {
            return;
        }
        
        console.log('✅ Beende Preloader');
        
        // 1. Klassen setzen
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
        
        // 2. Fade-out
        setTimeout(() => {
            preloader.style.opacity = '0';
            
            // 3. Komplett verstecken
            setTimeout(() => {
                preloader.style.display = 'none';
                console.log('🎉 Preloader versteckt');
            }, 600);
        }, 100);
    }
    
    // Error Handling
    window.addEventListener('error', (e) => {
        console.error('❌ Fehler:', e.message);
        
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }
    });
})();
