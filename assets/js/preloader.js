/**
 * PRELOADER - Matthias Silberhain PWA
 * Version 3.0 - Stabil und mobiloptimiert
 */

(function() {
    'use strict';
    
    console.log('🎬 Preloader initialisiert');
    
    // DOM-Elemente
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const preloaderLine = document.querySelector('.preloader-line');
    const currentYear = document.getElementById('currentYear');
    
    // Safety timeout
    let safetyTimeout;
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window;
    
    /**
     * Initialisiere Preloader
     */
    function initPreloader() {
        if (!preloader) {
            console.error('❌ Preloader-Element nicht gefunden');
            return;
        }
        
        // Setze aktuelles Jahr
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
        
        // Setze initialen Zustand
        resetPreloader();
        
        // Starte Preloader-Sequenz basierend auf Gerätetyp
        if (isMobile || isTouchDevice) {
            startMobilePreloader();
        } else {
            startDesktopPreloader();
        }
        
        // Safety timeout nach 5 Sekunden
        safetyTimeout = setTimeout(finishPreloader, 5000);
        
        // Window load als Backup
        window.addEventListener('load', handleWindowLoad);
    }
    
    /**
     * Setze Preloader zurück
     */
    function resetPreloader() {
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        if (preloaderText) {
            preloaderText.textContent = '';
        }
        
        if (preloaderLine) {
            preloaderLine.classList.remove('active');
        }
        
        document.body.classList.remove('loaded');
    }
    
    /**
     * Preloader für Mobile (schneller)
     */
    function startMobilePreloader() {
        console.log('📱 Mobile Preloader gestartet');
        
        if (preloaderText) {
            preloaderText.textContent = 'MATTHIAS SILBERHAIN';
        }
        
        // Line-Animation starten
        if (preloaderLine) {
            setTimeout(() => {
                preloaderLine.classList.add('active');
            }, 300);
        }
        
        // Kürzere Wartezeit für Mobile
        setTimeout(finishPreloader, 1500);
    }
    
    /**
     * Preloader für Desktop (mit Typewriter)
     */
    function startDesktopPreloader() {
        console.log('💻 Desktop Preloader gestartet');
        
        if (preloaderText) {
            typeWriterEffect();
        } else {
            // Fallback
            setTimeout(finishPreloader, 2000);
        }
        
        // Line-Animation starten
        if (preloaderLine) {
            setTimeout(() => {
                preloaderLine.classList.add('active');
            }, 500);
        }
    }
    
    /**
     * Typewriter Effekt
     */
    function typeWriterEffect() {
        const text = "MATTHIAS SILBERHAIN";
        let index = 0;
        const speed = 80;
        
        function type() {
            if (index < text.length) {
                preloaderText.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                setTimeout(finishPreloader, 300);
            }
        }
        
        // Starte Typewriter nach kurzer Verzögerung
        setTimeout(() => {
            preloaderText.textContent = '';
            type();
        }, 300);
    }
    
    /**
     * Beende Preloader
     */
    function finishPreloader() {
        // Clear safety timeout
        if (safetyTimeout) {
            clearTimeout(safetyTimeout);
        }
        
        if (!preloader || preloader.classList.contains('loaded')) {
            return;
        }
        
        console.log('✅ Preloader beenden');
        
        // Markiere als geladen
        preloader.classList.add('loaded');
        
        // Fade-out Animation
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            // Verstecke komplett
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
            
            // Zeige Inhalte an
            showContent();
            
            console.log('🎉 Preloader abgeschlossen');
        }, 600);
    }
    
    /**
     * Zeige Inhalte nach Preloader an
     */
    function showContent() {
        const elements = document.querySelectorAll('.inhalt, .social-section, .footer');
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            }
        });
    }
    
    /**
     * Handle Window Load Event
     */
    function handleWindowLoad() {
        console.log('📦 Window loaded - Preloader beenden');
        
        // Wenn Preloader noch aktiv, beende ihn
        if (preloader && !preloader.classList.contains('loaded')) {
            setTimeout(finishPreloader, 500);
        }
    }
    
    /**
     * Error Handling
     */
    function handleErrors() {
        // Bilder laden eventuell nicht, aber das sollte den Preloader nicht blockieren
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                console.warn('⚠️ Bild konnte nicht geladen werden:', img.src);
            });
        });
        
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('❌ JavaScript Fehler:', e.message);
            // Trotzdem Preloader beenden
            setTimeout(finishPreloader, 1000);
        });
    }
    
    // Starte alles wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initPreloader();
            handleErrors();
        });
    } else {
        initPreloader();
        handleErrors();
    }
    
    // Globale Funktion für andere Skripte
    window.preloader = {
        finish: finishPreloader,
        isLoaded: () => document.body.classList.contains('loaded')
    };
})();
