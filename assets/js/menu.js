/**
 * MOBILE MENÜ
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen');
    
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!burgerButton || !mainNav) {
        console.error('❌ Menü-Elemente nicht gefunden!');
        return;
    }
    
    // Event Listener
    burgerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Nav Links schließen Menü
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Escape Taste
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Resize
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
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        
        burgerButton.setAttribute('aria-expanded', 'true');
        mainNav.setAttribute('aria-hidden', 'false');
        
        console.log('📱 Menü geöffnet');
    }
    
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        burgerButton.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        
        console.log('📱 Menü geschlossen');
    }
    
    // Initial
    burgerButton.setAttribute('aria-expanded', 'false');
    mainNav.setAttribute('aria-hidden', 'true');
    
    // Globale Funktion
    window.closeMobileMenu = closeMenu;
    
    console.log('✅ Menu.js initialisiert');
});
