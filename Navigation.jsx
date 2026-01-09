// components/Navigation.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Navigation = ({ activeSection, setActiveSection }) => {
  const { theme, toggleTheme } = useTheme();
  
  const navClass = theme === 'dark-gray' ? 'bg-gray-800' : 'bg-gray-900';
  const buttonClass = (isActive) => 
    `flex items-center px-3 py-2 rounded-lg transition-colors ${isActive 
      ? 'bg-blue-600 text-white' 
      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`;

  const navItems = [
    { id: 'portfolio', label: 'Portfolio', icon: '📚' },
    { id: 'blog', label: 'Blog', icon: '✍️' },
    { id: 'gallery', label: 'Bücher', icon: '📖' },
    { id: 'about', label: 'Über mich', icon: '👤' },
    { id: 'contact', label: 'Kontakt', icon: '📧' },
    { id: 'reading', label: 'Leseliste', icon: '📋' },
    { id: 'progress', label: 'Schreibfortschritt', icon: '📈' },
  ];

  return (
    <header className={`sticky top-0 z-10 shadow-md ${navClass}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🖋️</span>
              <h1 className="text-2xl font-bold text-silver">Matthias Silberhain</h1>
            </div>
            <div className="md:hidden">
              <button className="text-gray-300 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={buttonClass(activeSection === item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300"
            >
              <span className="mr-2">{theme === 'dark-gray' ? '⚫' : '⚪'}</span>
              <span>{theme === 'dark-gray' ? 'Zu Schwarz' : 'Zu Dunkelgrau'}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
