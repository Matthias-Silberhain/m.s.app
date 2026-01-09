/**
 * MOBILE MENÜ - Stabil und funktioniert
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
        
        // 1. SICHERSTELLEN: Menü ist initial GESCHLOSSEN
        closeMenu();
        
        // 2. Event Listener für Burger Button
        burgerButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // 3. Event Listener für Overlay (schließen)
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                closeMenu();
            });
        }
        
        // 4. Schließen bei Klick auf Nav Links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                closeMenu();
            });
        });
        
        // 5. Schließen bei Escape Taste
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('aktiv')) {
                closeMenu();
            }
        });
        
        // 6. Schließen bei Fenster-Resize (wenn zu Desktop wechselt)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('aktiv')) {
                closeMenu();
            }
        });
        
        // 7. Schließen bei Klick außerhalb des Menüs
        document.addEventListener('click', function(e) {
            // Wenn Menü offen ist UND Klick NICHT auf Menü oder Burger
            if (mainNav.classList.contains('aktiv') && 
                !mainNav.contains(e.target) && 
                e.target !== burgerButton && 
                !burgerButton.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Funktionen
        function toggleMenu() {
            console.log('🔄 Toggle Menu aufgerufen');
            
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
            
            if (menuOverlay) {
                menuOverlay.classList.add('active');
            }
            
            document.body.classList.add('menu-open');
            
            // Accessibility
            burgerButton.setAttribute('aria-expanded', 'true');
            mainNav.setAttribute('aria-hidden', 'false');
        }
        
        function closeMenu() {
            console.log('📱 Menü schließen');
            
            burgerButton.classList.remove('aktiv');
            mainNav.classList.remove('aktiv');
            
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            
            document.body.classList.remove('menu-open');
            
            // Accessibility
            burgerButton.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
        }
        
        // Initiale Accessibility-Attribute
        burgerButton.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        
        // Globale Funktion für andere Skripte
        window.closeMobileMenu = closeMenu;
        
        // DEBUG: Zeige Menü-Status
        console.log('✅ Mobile Menu initialisiert');
        console.log('Menü Status:', mainNav.classList.contains('aktiv') ? 'GEÖFFNET' : 'GESCHLOSSEN');
    }
})();
