import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import PortfolioShowcase from './components/PortfolioShowcase';
import WritingBlog from './components/WritingBlog';
import BookGallery from './components/BookGallery';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import ReadingList from './components/ReadingList';
import WritingProgressTracker from './components/WritingProgressTracker';
import Preloader from './components/Preloader';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('portfolio');
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'portfolio':
        return <PortfolioShowcase />;
      case 'blog':
        return <WritingBlog />;
      case 'gallery':
        return <BookGallery />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactForm />;
      case 'reading':
        return <ReadingList />;
      case 'progress':
        return <WritingProgressTracker />;
      default:
        return <PortfolioShowcase />;
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'black'
          ? 'bg-black text-gray-300'
          : 'bg-gray-900 text-gray-300'
      }`}
    >
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="container mx-auto px-4 py-8">{renderSection()}</main>
      <footer
        className={`py-6 mt-12 ${
          theme === 'black' ? 'bg-gray-900' : 'bg-gray-800'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-silver">
            © {new Date().getFullYear()} Matthias Silberhain. Alle Rechte
            vorbehalten.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a
              href="https://github.com"
              className="hover:text-silver transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-silver transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-silver transition-colors">
              Datenschutz
            </a>
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
