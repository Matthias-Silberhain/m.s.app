/**
 * DARK MODE
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Darkmode.js geladen');
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (!darkModeToggle) {
        console.warn('⚠️ Dark Mode Toggle nicht gefunden');
        return;
    }
    
    // Gespeicherten Modus prüfen
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedMode = localStorage.getItem('darkMode');
    
    // Initialer Modus
    if (savedMode === 'enabled' || (!savedMode && prefersDarkScheme.matches)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Event Listener
    darkModeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // System Preference
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
    
    // Funktionen
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        updateToggleIcon(true);
        console.log('🌙 Dark Mode aktiviert');
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        updateToggleIcon(false);
        console.log('☀️ Dark Mode deaktiviert');
    }
    
    function updateToggleIcon(isDark) {
        const moonIcon = document.querySelector('.moon-icon');
        const sunIcon = document.querySelector('.sun-icon');
        
        if (isDark) {
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'block';
        } else {
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIcon) sunIcon.style.display = 'none';
        }
    }
    
    console.log('✅ Darkmode.js initialisiert');
});
