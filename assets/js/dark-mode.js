/**
 * DARK MODE - Komplett überarbeitet mit besseren Icons
 */

(function() {
    'use strict';
    
    console.log('🌙 Dark Mode initialisiert');
    
    // Warte auf DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100); // Kleine Verzögerung für Sicherheit
    }
    
    function init() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        
        if (!darkModeToggle) {
            console.error('❌ Dark Mode Toggle nicht gefunden');
            createFallbackToggle();
            return;
        }
        
        // 1. Bessere Icons einfügen (Sonne und Mond als SVG)
        improveToggleIcons(darkModeToggle);
        
        // 2. Gespeicherten Modus prüfen
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedMode = localStorage.getItem('darkMode');
        
        // 3. Initialer Modus
        if (savedMode === 'enabled') {
            enableDarkMode(body, darkModeToggle);
        } else if (savedMode === 'disabled') {
            disableDarkMode(body, darkModeToggle);
        } else if (prefersDarkScheme.matches) {
            enableDarkMode(body, darkModeToggle);
        }
        
        // 4. Event Listener mit besserem Feedback
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (body.classList.contains('dark-mode')) {
                disableDarkMode(body, darkModeToggle);
            } else {
                enableDarkMode(body, darkModeToggle);
            }
            
            // Haptic Feedback auf mobilen Geräten
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            
            // Animation auf dem Button
            darkModeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                darkModeToggle.style.transform = 'scale(1)';
            }, 150);
        });
        
        // 5. System Preference Changes
        prefersDarkScheme.addEventListener('change', function(e) {
            if (!localStorage.getItem('darkMode')) {
                if (e.matches) {
                    enableDarkMode(body, darkModeToggle);
                } else {
                    disableDarkMode(body, darkModeToggle);
                }
            }
        });
        
        console.log('✅ Dark Mode initialisiert');
    }
    
    function improveToggleIcons(toggle) {
        // Entferne vorhandene Icons
        toggle.innerHTML = '';
        
        // Erstelle bessere Icons (wie auf deiner Website)
        const moonIcon = document.createElement('span');
        moonIcon.className = 'moon-icon';
        moonIcon.innerHTML = '🌙';
        moonIcon.style.cssText = `
            font-size: 20px;
            display: block;
            transition: all 0.3s ease;
        `;
        
        const sunIcon = document.createElement('span');
        sunIcon.className = 'sun-icon';
        sunIcon.innerHTML = '☀️';
        sunIcon.style.cssText = `
            font-size: 20px;
            display: none;
            transition: all 0.3s ease;
        `;
        
        toggle.appendChild(moonIcon);
        toggle.appendChild(sunIcon);
    }
    
    function enableDarkMode(body, toggle) {
        console.log('🌙 Aktiviere Dark Mode');
        
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        
        // Icons wechseln
        const moonIcon = toggle.querySelector('.moon-icon');
        const sunIcon = toggle.querySelector('.sun-icon');
        
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'block';
        
        // Toggle Styling für Dark Mode
        toggle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        toggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        toggle.style.color = '#ffffff';
        
        // Animation
        toggle.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
        
        // Dispatch Event für andere Skripte
        window.dispatchEvent(new CustomEvent('darkmodechange', { detail: { mode: 'dark' } }));
    }
    
    function disableDarkMode(body, toggle) {
        console.log('☀️ Deaktiviere Dark Mode');
        
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        
        // Icons wechseln
        const moonIcon = toggle.querySelector('.moon-icon');
        const sunIcon = toggle.querySelector('.sun-icon');
        
        if (moonIcon) moonIcon.style.display = 'block';
        if (sunIcon) sunIcon.style.display = 'none';
        
        // Toggle Styling für Light Mode
        toggle.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toggle.style.borderColor = 'rgba(200, 205, 215, 0.4)';
        toggle.style.color = '#d6d9de';
        toggle.style.boxShadow = 'none';
        
        // Dispatch Event
        window.dispatchEvent(new CustomEvent('darkmodechange', { detail: { mode: 'light' } }));
    }
    
    function createFallbackToggle() {
        console.warn('⚠️ Erstelle Fallback Dark Mode Toggle');
        
        const toggle = document.createElement('button');
        toggle.id = 'darkModeToggle';
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = '🌙';
        toggle.setAttribute('aria-label', 'Dark mode umschalten');
        toggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(0,0,0,0.8);
            border: 1px solid #c0c0c0;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            localStorage.setItem('darkMode', 
                document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
    }
})();
