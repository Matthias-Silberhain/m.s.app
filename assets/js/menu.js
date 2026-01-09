/**
 * MOBILE MENÜ - Korrigierte Version
 */

(function() {
    'use strict';
    
    console.log('🍔 Mobile Menu initialisiert');
    
    // Warte bis DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    function init() {
        const burgerButton = document.getElementById('burgerButton');
        const mainNav = document.getElementById('mainNav');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (!burgerButton || !mainNav) {
            console.error('❌ Menü-Elemente nicht gefunden');
            return;
        }
        
        // SICHERSTELLEN: Menü ist initial GESCHLOSSEN
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
            if (window.innerWidth > 768 && mainNav.classList.contains('aktiv')) {
                closeMenu();
            }
        });
        
        // Funktionen
        function toggleMenu() {
            if (mainNav.classList.contains('aktiv')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            burgerButton.classList.add('aktiv');
            mainNav.classList.add('aktiv');
            
            if (menuOverlay) {
                menuOverlay.classList.add('active');
            }
            
            document.body.classList.add('menu-open');
            
            // Accessibility
            burgerButton.setAttribute('aria-expanded', 'true');
            mainNav.setAttribute('aria-hidden', 'false');
            
            console.log('📱 Menü geöffnet');
        }
        
        function closeMenu() {
            burgerButton.classList.remove('aktiv');
            mainNav.classList.remove('aktiv');
            
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            
            document.body.classList.remove('menu-open');
            
            // Accessibility
            burgerButton.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
            
            console.log('📱 Menü geschlossen');
        }
        
        // Initiale Accessibility-Attribute
        burgerButton.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        
        // Globale Funktion
        window.closeMobileMenu = closeMenu;
        
        console.log('✅ Mobile Menu initialisiert');
    }
})();
