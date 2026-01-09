/**
 * PRELOADER - Matthias Silberhain PWA
 * Version 4.0 - Robuste Mobile-First Lösung
 */

(function() {
    'use strict';
    
    console.log('🚀 Preloader startet auf:', window.location.hostname);
    
    // DOM-Elemente
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('type-text') || document.getElementById('preloader-text');
    const currentYear = document.getElementById('currentYear');
    
    // Kein Preloader? Sofort Inhalt zeigen
    if (!preloader) {
        console.warn('⚠️ Kein Preloader gefunden - zeige Inhalt direkt');
        document.body.classList.add('loaded');
        return;
    }
    
    /**
     * Initialisiere Preloader
     */
    function init() {
        console.log('📦 DOM bereit');
        
        // 1. Aktuelles Jahr setzen
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
        
        // 2. Preloader SOFORT sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        // 3. Body nicht als loaded markieren
        document.body.classList.remove('loaded');
        
        // 4. Mobile vs Desktop Entscheidung
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            startMobilePreloader();
        } else {
            startDesktopPreloader();
        }
        
        // 5. Absolute Sicherheit: Nach 4 Sekunden immer ausblenden
        setTimeout(finishPreloader, 4000);
    }
    
    /**
     * Mobile Preloader (schnell)
     */
    function startMobilePreloader() {
        console.log('📱 Mobile Preloader');
        
        // Sofort Text anzeigen (keine Typewriter-Animation)
        if (preloaderText) {
            preloaderText.textContent = 'MATTHIAS SILBERHAIN';
        }
        
        // Line-Animation starten
        const line = document.querySelector('.preloader-line');
        if (line) {
            setTimeout(() => line.classList.add('active'), 200);
        }
        
        // Mobile: Schneller fertig (1.5 Sekunden)
        setTimeout(finishPreloader, 1500);
    }
    
    /**
     * Desktop Preloader (mit Animation)
     */
    function startDesktopPreloader() {
        console.log('💻 Desktop Preloader');
        
        // Typewriter-Effekt
        if (preloaderText) {
            const text = 'MATTHIAS SILBERHAIN';
            let i = 0;
            const speed = 80;
            
            function typeWriter() {
                if (i < text.length) {
                    preloaderText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    setTimeout(finishPreloader, 500);
                }
            }
            
            setTimeout(() => {
                preloaderText.textContent = '';
                typeWriter();
            }, 300);
        } else {
            setTimeout(finishPreloader, 2000);
        }
        
        // Line-Animation
        const line = document.querySelector('.preloader-line');
        if (line) {
            setTimeout(() => line.classList.add('active'), 500);
        }
    }
    
    /**
     * Preloader beenden
     */
    function finishPreloader() {
        // Sicherstellen, dass Preloader existiert
        if (!preloader || preloader.classList.contains('loaded')) {
            return;
        }
        
        console.log('✅ Beende Preloader');
        
        // 1. Klasse setzen für CSS-Transitions
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
        
        // 2. Inhalt anzeigen
        const content = document.querySelectorAll('.inhalt, .social-section, .footer');
        content.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        
        // 3. Preloader nach Fade-out komplett verstecken
        setTimeout(() => {
            preloader.style.display = 'none';
            console.log('🎉 Preloader versteckt');
        }, 500);
    }
    
    /**
     * Fehlerbehandlung
     */
    function handleErrors() {
        window.addEventListener('error', (e) => {
            console.error('❌ Fehler:', e.message);
            setTimeout(finishPreloader, 500);
        });
    }
    
    // Start wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            handleErrors();
        });
    } else {
        init();
        handleErrors();
    }
    
    // Window Load als zusätzlicher Trigger
    window.addEventListener('load', () => {
        console.log('🖼️ Alle Ressourcen geladen');
        setTimeout(finishPreloader, 1000);
    });
})();
