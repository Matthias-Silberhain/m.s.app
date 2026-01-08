/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain PWA
 * Zentrale Funktionen für PWA optimiert
 * Version 3.0 - PWA optimiert
 */

// Mobile Device Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Optimierung für mobile Geräte
if (isMobile) {
    document.documentElement.classList.add('mobile-device');
}
if (isIOS) {
    document.documentElement.classList.add('ios-device');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Matthias Silberhain PWA');
    console.log('Gerät:', isMobile ? 'Mobile' : 'Desktop', isIOS ? 'iOS' : '');
    console.log('PWA Modus:', window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser');
    
    // ================= PRELOADER (PWA optimiert) =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    if (preloader) {
        // Preloader sofort sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        // Typing Animation nur auf Desktop (bessere Performance)
        if (typeTextElement && !isMobile) {
            const text = "Matthias Silberhain";
            let index = 0;
            const typingSpeed = 60;
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.innerHTML += text.charAt(index);
                    index++;
                    
                    if (index < text.length) {
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        // Typing fertig - kurze Pause dann ausblenden
                        setTimeout(finishPreloader, 300);
                    }
                }
            }
            
            // Starte Typing mit kurzer Verzögerung
            setTimeout(() => {
                typeTextElement.innerHTML = '';
                typeWriter();
            }, 300);
        } else {
            // Auf Mobile oder ohne Typing: Kurzer Preloader
            setTimeout(finishPreloader, 1500);
        }
        
        // Sicherheits-Timeout: Maximal 3 Sekunden
        setTimeout(finishPreloader, 3000);
    } else {
        // Kein Preloader gefunden - direkt Inhalt anzeigen
        showContent();
    }
    
    function finishPreloader() {
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            
            // Fade-out Animation
            setTimeout(() => {
                preloader.style.opacity = '0';
                
                // Nach der Animation ausblenden und Inhalt zeigen
                setTimeout(() => {
                    preloader.style.display = 'none';
                    showContent();
                }, 500);
            }, 100);
        } else {
            showContent();
        }
    }
    
    function showContent() {
        // Body loaded Klasse für PWA.js
        document.body.classList.add('loaded');
        
        // Inhalt anzeigen
        const contentElements = [
            document.querySelector('.inhalt'),
            document.querySelector('.social-section'),
            document.querySelector('.footer'),
            document.getElementById('pwaStatusIndicator')
        ];
        
        contentElements.forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.visibility = 'visible';
                element.style.display = element.tagName === 'MAIN' ? 'block' : 
                                      element.classList.contains('social-section') ? 'block' : 
                                      element.classList.contains('footer') ? 'block' : 'block';
                
                // Fade-in Animation
                setTimeout(() => {
                    element.style.transition = 'opacity 0.5s ease';
                    element.style.opacity = '1';
                }, 50);
            }
        });
        
        console.log('✅ Preloader abgeschlossen, Inhalt angezeigt');
    }
    
    // ================= CURRENT YEAR IN FOOTER =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================= SMOOTH SCROLLING =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Schließe Mobile Menu wenn offen
                    closeMobileMenu();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ================= MOBILE MENU HELPER =================
    function closeMobileMenu() {
        const burger = document.getElementById('burgerButton');
        const nav = document.getElementById('mainNav');
        const overlay = document.querySelector('.menu-overlay');
        
        if (burger && nav && burger.classList.contains('aktiv')) {
            burger.classList.remove('aktiv');
            nav.classList.remove('aktiv');
            if (overlay) overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // ================= ACTIVE NAV LINK HIGHLIGHT =================
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.hauptnavigation a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }
    
    highlightActiveNavLink();
    
    // ================= LAZY LOADING FÜR BILDER =================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ================= PWA INSTALL BUTTON HELPER =================
    window.showPWAInstallButton = function() {
        // Wird von pwa.js aufgerufen
        console.log('📱 PWA Install Button angefordert');
    };
    
    // ================= ERROR HANDLING =================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Fehler:', e.message, 'in', e.filename, 'Zeile:', e.lineno);
    });
    
    console.log('✅ Global.js für PWA initialisiert');
});
