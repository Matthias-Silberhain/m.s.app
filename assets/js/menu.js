/**
 * MOBILE MENÜ - Stabil und zuverlässig
 */

(function() {
    'use strict';
    
    console.log('🍔 Menu.js geladen');
    
    // Warte, bis der DOM vollständig geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        // DOM ist bereits geladen
        setTimeout(initMenu, 100);
    }
    
    function initMenu() {
        const burgerButton = document.getElementById('burgerButton');
        const mainNav = document.getElementById('mainNav');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (!burgerButton || !mainNav) {
            console.error('❌ Menü-Elemente nicht gefunden!');
            return;
        }
        
        // Stelle sicher, dass das Menü initial geschlossen ist
        closeMenu();
        
        // Event Listener für Burger Button
        burgerButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Event Listener für Overlay (schließen)
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                closeMenu();
            });
        }
        
        // Schließen bei Klick auf Nav Links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Verhindere Standard nur bei internen Links (optional)
                if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                }
                closeMenu();
            });
        });
        
        // Schließen bei Escape Taste
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('aktiv')) {
                closeMenu();
            }
        });
        
        // Schließen bei Fenster-Resize (wenn zu Desktop wechselt)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
        
        // Schließen bei Klick außerhalb des Menüs (optional)
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('aktiv') && 
                !mainNav.contains(e.target) && 
                e.target !== burgerButton) {
                closeMenu();
            }
        });
        
        // Hilfsfunktionen
        function toggleMenu() {
            if (mainNav.classList.contains('aktiv')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            console.log('📱 Menü öffnen');
            burgerButton.classList.add('aktiv');
            mainNav.classList.add('aktiv');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            
            // Accessibility
            burgerButton.setAttribute('aria-expanded', 'true');
            mainNav.setAttribute('aria-hidden', 'false');
        }
        
        function closeMenu() {
            console.log('📱 Menü schließen');
            burgerButton.classList.remove('aktiv');
            mainNav.classList.remove('aktiv');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Accessibility
            burgerButton.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
        }
        
        // Setze initiale Accessibility-Attribute
        burgerButton.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        
        // Globale Funktion für andere Skripte
        window.closeMobileMenu = closeMenu;
        
        console.log('✅ Menu.js initialisiert');
    }
})();
