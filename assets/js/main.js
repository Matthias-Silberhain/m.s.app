/**
 * MAIN.JS - Zentrale Initialisierung für Matthias Silberhain PWA
 * Diese Datei dient als Einstiegspunkt für die PWA
 */

console.log('🚀 Matthias Silberhain PWA gestartet');

// Setze aktuelles Jahr im Footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Debug Info
    console.log('🌐 PWA Modus:', window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser');
    console.log('📱 User Agent:', navigator.userAgent);
    console.log('✅ Alle Skripte geladen und bereit');
});

// Export für Debugging
window.App = {
    version: '2.0',
    name: 'Matthias Silberhain PWA',
    initTime: new Date().toISOString()
};
