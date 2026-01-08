/**
 * MOBILE MENU - Matthias Silberhain PWA
 * Burger Menu für mobile Navigation in PWA
 * Version 3.0 - PWA optimiert
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen (PWA Version)');
    
    // Defensive Prüfung aller Elemente
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Warnung wenn Elemente fehlen (nur loggen, nicht abbrechen)
    if (!burgerButton) {
        console.warn('Menu.js: Burger Button (id="burgerButton") fehlt auf dieser Seite!');
    }
    
    if (!mainNav) {
        console.warn('Menu.js: Navigation (id="mainNav") fehlt auf dieser Seite!');
    }
    
    if (!burgerButton || !mainNav) {
        return; // Abbrechen wenn essentielle Elemente fehlen
    }
    
    const navLinks = mainNav.querySelectorAll('a');
    
    // Menü umschalten
    function toggleMenu() {
        const isOpen = burgerButton.classList.contains('aktiv');
        
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    // Menü öffnen
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            setTimeout(() => {
                menuOverlay.style.opacity = '1';
            }, 10);
        }
        
        document.body.classList.add('menu-open');
        
        // Fokus auf ersten Link setzen für Accessibility
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 300);
        
        console.log('Mobile Menu geöffnet');
    }
    
    // Menü schließen
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            menuOverlay.style.opacity = '0';
        }
        
        document.body.classList.remove('menu-open');
        burgerButton.focus(); // Fokus zurück auf Burger Button
        
        console.log('Mobile Menu geschlossen');
    }
    
    // Event Listeners
    burgerButton.addEventListener('click', toggleMenu);
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü schließen bei Link-Klick (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 || isMobile) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC Taste zum Schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerButton.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Automatisch schließen bei Fenster-Resize zu Desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && burgerButton.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // ARIA Attribute für Accessibility
    function updateAriaAttributes() {
        const isExpanded = burgerButton.classList.contains('aktiv');
        burgerButton.setAttribute('aria-expanded', isExpanded.toString());
        burgerButton.setAttribute('aria-label', 
            isExpanded ? 'Hauptmenü schließen' : 'Hauptmenü öffnen'
        );
        
        // Navigation sichtbar/unsichtbar für Screen Reader
        mainNav.setAttribute('aria-hidden', (!isExpanded).toString());
    }
    
    // Initiale ARIA Attribute
    updateAriaAttributes();
    
    // Observer für Zustandsänderungen
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateAriaAttributes();
            }
        });
    });
    
    observer.observe(burgerButton, { attributes: true });
    observer.observe(mainNav, { attributes: true });
    
    console.log('✅ Menu.js für PWA initialisiert');
});
