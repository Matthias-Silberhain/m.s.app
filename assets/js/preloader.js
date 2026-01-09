/**
 * PRELOADER - Matthias Silberhain PWA
 * Typewriter für ALLE Geräte
 */

(function() {
    'use strict';
    
    console.log('🚀 Preloader gestartet');
    
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
        
        // 3. TYPEWRITER FÜR ALLE GERÄTE (auch Mobile!)
        if (preloaderText) {
            startTypewriter(preloaderText);
        } else {
            // Fallback
            setTimeout(() => finishPreloader(preloader), 2000);
        }
        
        // 4. Line Animation starten
        const line = document.querySelector('.preloader-line');
        if (line) {
            setTimeout(() => {
                line.classList.add('active');
            }, 300);
        }
        
        // 5. Preloader beenden nach Zeit (etwas länger für Typewriter)
        setTimeout(() => finishPreloader(preloader), 3500);
        
        // 6. Absolute Sicherheit
        setTimeout(() => finishPreloader(preloader), 5000);
        
        // 7. Window Load Backup
        window.addEventListener('load', () => {
            setTimeout(() => finishPreloader(preloader), 1000);
        });
    }
    
    function startTypewriter(element) {
        const text = 'MATTHIAS SILBERHAIN';
        let i = 0;
        
        // Schnellere Geschwindigkeit auf Touch-Geräten
        const isTouchDevice = 'ontouchstart' in window;
        const speed = isTouchDevice ? 60 : 80;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Cursor-Blinken hinzufügen nach Fertigstellung
                element.style.position = 'relative';
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.marginLeft = '5px';
                cursor.style.color = '#c0c0c0';
                element.appendChild(cursor);
            }
        }
        
        // Kurze Verzögerung, dann starten
        setTimeout(() => {
            element.textContent = '';
            typeWriter();
        }, 300);
    }
    
    function finishPreloader(preloader) {
        if (!preloader || preloader.classList.contains('loaded')) {
            return;
        }
        
        console.log('✅ Beende Preloader');
        
        // 1. Klassen setzen
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
        
        // 2. Fade-out Animation
        setTimeout(() => {
            preloader.style.opacity = '0';
            
            // 3. Komplett verstecken
            setTimeout(() => {
                preloader.style.display = 'none';
                console.log('🎉 Preloader versteckt');
                
                // 4. Animationen im Content starten
                startContentAnimations();
            }, 600);
        }, 100);
    }
    
    function startContentAnimations() {
        // Alle Inhalte nacheinander einfaden lassen
        const elements = document.querySelectorAll('.inhalt > *');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });
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
