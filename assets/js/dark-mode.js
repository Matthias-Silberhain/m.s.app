/**
 * DARK MODE - Garantiert funktionierend
 */

(function() {
    'use strict';
    
    console.log('🌙 Dark Mode initialisiert');
    
    // Funktionen
    function enableDarkMode() {
        console.log('🌙 Aktiviere Dark Mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        updateToggleIcon(true);
    }
    
    function disableDarkMode() {
        console.log('☀️ Deaktiviere Dark Mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        updateToggleIcon(false);
    }
    
    function updateToggleIcon(isDark) {
        const moonIcon = document.querySelector('.moon-icon');
        const sunIcon = document.querySelector('.sun-icon');
        
        if (!moonIcon || !sunIcon) {
            console.error('❌ Icons nicht gefunden');
            return;
        }
        
        if (isDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }
    
    function toggleDarkMode() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Initialisierung
    function init() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        if (!darkModeToggle) {
            console.error('❌ Dark Mode Toggle nicht gefunden');
            return;
        }
        
        // Initialen Modus setzen
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedMode = localStorage.getItem('darkMode');
        
        if (savedMode === 'enabled' || (!savedMode && prefersDarkScheme.matches)) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
        
        // Event Listener
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDarkMode();
        });
        
        // System Preference Changes
        prefersDarkScheme.addEventListener('change', function(e) {
            if (!localStorage.getItem('darkMode')) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
        
        console.log('✅ Dark Mode initialisiert');
    }
    
    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
