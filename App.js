// App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import PortfolioShowcase from './components/PortfolioShowcase';
import WritingBlog from './components/WritingBlog';
import BookGallery from './components/BookGallery';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import ReadingList from './components/ReadingList';
import WritingProgressTracker from './components/WritingProgressTracker';
import Preloader from './components/Preloader';
import './App.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Simuliere Ladezeit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [activeSection, setActiveSection] = useState('portfolio');
  
  const renderSection = () => {
    switch(activeSection) {
      case 'portfolio': return <PortfolioShowcase />;
      case 'blog': return <WritingBlog />;
      case 'gallery': return <BookGallery />;
      case 'about': return <AboutSection />;
      case 'contact': return <ContactForm />;
      case 'reading': return <ReadingList />;
      case 'progress': return <WritingProgressTracker />;
      default: return <PortfolioShowcase />;
    }
  };

  // Hintergrund und Textfarbe basierend auf Theme
  const appThemeClass = theme === 'dark-gray' 
    ? 'bg-gray-900 text-gray-300' 
    : 'bg-black text-gray-300';

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={`min-h-screen ${appThemeClass}`}>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>
      
      <footer className={`py-6 mt-12 ${theme === 'dark-gray' ? 'bg-gray-800' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Matthias Silberhain. Alle Rechte vorbehalten.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="https://github.com" className="hover:text-silver">GitHub</a>
            <a href="#" className="hover:text-silver">Impressum</a>
            <a href="#" className="hover:text-silver">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
