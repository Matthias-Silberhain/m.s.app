/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain PWA
 * Zentrale Funktionen für PWA optimiert
 * Version 3.1 - Korrigierte Preloader-Logik
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Matthias Silberhain PWA');
    
    // ================= PRELOADER (KORRIGIERT) =================
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Preloader anzeigen
        preloader.style.display = 'flex';
        
        // Sicherstellen, dass Preloader sichtbar ist
        setTimeout(() => {
            preloader.style.opacity = '1';
            preloader.style.visibility = 'visible';
        }, 10);
        
        // Typing Animation nur wenn Element existiert
        const typeTextElement = document.getElementById('type-text');
        if (typeTextElement && !isMobileDevice()) {
            const text = "Matthias Silberhain";
            let index = 0;
            const typingSpeed = 60;
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    setTimeout(finishPreloader, 300);
                }
            }
            
            // Starte Typing nach kurzer Verzögerung
            setTimeout(() => {
                typeTextElement.textContent = '';
                typeWriter();
            }, 300);
        } else {
            // Ohne Typing: Kurzer Preloader
            setTimeout(finishPreloader, 1500);
        }
        
        // Sicherheits-Timeout
        setTimeout(finishPreloader, 3000);
        
        function finishPreloader() {
            if (!preloader.classList.contains('loaded')) {
                preloader.classList.add('loaded');
                preloader.style.opacity = '0';
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                    showContent();
                }, 500);
            }
        }
    } else {
        // Kein Preloader gefunden
        showContent();
    }
    
    function showContent() {
        document.body.classList.add('loaded');
        
        // Alle Inhaltsbereiche anzeigen
        const contentElements = document.querySelectorAll(
            '.inhalt, .social-section, .footer, #pwaStatusIndicator'
        );
        
        contentElements.forEach((element, index) => {
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.visibility = 'visible';
                }, 100 * index);
            }
        });
        
        console.log('✅ Preloader abgeschlossen, Inhalt angezeigt');
    }
    
    // ================= HELPER FUNCTIONS =================
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Mobile Menü schließen
                    closeMobileMenu();
                }
            }
        });
    });
    
    // ================= MOBILE MENU HELPER =================
    function closeMobileMenu() {
        const burger = document.getElementById('burgerButton');
        const nav = document.getElementById('mainNav');
        const overlay = document.getElementById('menuOverlay');
        
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
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
    
    highlightActiveNavLink();
    
    // ================= ERROR HANDLING =================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Fehler:', e.message, 'in', e.filename, 'Zeile:', e.lineno);
    });
    
    console.log('✅ Global.js initialisiert');
});
