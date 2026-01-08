/**
 * DARK MODE TOGGLE - Matthias Silberhain PWA
 * Version 2.0 - Korrigierte Dark-Mode Logik
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Dark-Mode.js geladen');
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (!darkModeToggle) {
        console.error('❌ Dark-Mode Toggle Button nicht gefunden!');
        return;
    }
    
    // Prüfe gespeicherte Einstellung oder Systempräferenz
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedMode = localStorage.getItem('darkMode');
    
    // Initialisiere Dark Mode
    if (savedMode === 'enabled' || (!savedMode && prefersDarkScheme.matches)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Event Listener für Toggle
    darkModeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Systempräferenz-Änderungen überwachen
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        console.log('🌙 Dark Mode aktiviert');
        
        // Dispatch Event für andere Skripte
        window.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { enabled: true }
        }));
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        console.log('☀️ Dark Mode deaktiviert');
        
        // Dispatch Event für andere Skripte
        window.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { enabled: false }
        }));
    }
    
    // Hilfsfunktion für andere Skripte
    window.isDarkModeEnabled = function() {
        return body.classList.contains('dark-mode');
    };
    
    console.log('✅ Dark-Mode.js initialisiert');
});
