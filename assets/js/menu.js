/**
 * MOBILE MENÜ - Matthias Silberhain PWA
 * Version 2.0 - Korrigierte Menü-Logik
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen');
    
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.getElementById('menuOverlay');
    
    // Prüfe ob alle Elemente existieren
    if (!burgerButton || !mainNav) {
        console.error('❌ Menü-Elemente nicht gefunden!');
        return;
    }
    
    // Event Listener für Burger Button
    burgerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Event Listener für Overlay (schließen)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Schließen bei Klick auf Nav Links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
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
    
    // Toggle Funktion
    function toggleMenu() {
        if (mainNav.classList.contains('aktiv')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Menü öffnen
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        
        // Accessibility
        burgerButton.setAttribute('aria-expanded', 'true');
        mainNav.setAttribute('aria-hidden', 'false');
        
        console.log('📱 Menü geöffnet');
    }
    
    // Menü schließen
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Accessibility
        burgerButton.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        
        console.log('📱 Menü geschlossen');
    }
    
    // Setze initiale Accessibility-Attribute
    burgerButton.setAttribute('aria-expanded', 'false');
    mainNav.setAttribute('aria-hidden', 'true');
    
    // Hilfsfunktion für andere Skripte
    window.closeMobileMenu = closeMenu;
    
    console.log('✅ Menu.js initialisiert');
});
