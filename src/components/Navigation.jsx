import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Navigation = ({ activeSection, setActiveSection }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'portfolio', label: 'Portfolio', icon: '📚' },
    { id: 'blog', label: 'Blog', icon: '✍️' },
    { id: 'gallery', label: 'Bücher', icon: '📖' },
    { id: 'about', label: 'Über mich', icon: '👤' },
    { id: 'contact', label: 'Kontakt', icon: '📧' },
    { id: 'reading', label: 'Leseliste', icon: '📋' },
    { id: 'progress', label: 'Schreibfortschritt', icon: '📈' },
  ];

  const navClass =
    theme === 'black'
      ? 'bg-gray-900 border-b border-gray-800'
      : 'bg-gray-800 border-b border-gray-700';

  return (
    <header className={`sticky top-0 z-10 shadow-lg ${navClass}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 border-2 border-silver rounded-full flex items-center justify-center">
                  <span className="text-xl">M</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-silver rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-silver tracking-wide">
                  Matthias Silberhain
                </h1>
                <p className="text-sm text-gray-400">Autor & Schriftsteller</p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="md:hidden flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <span className="text-silver">
                {theme === 'black' ? '🌙' : '🌘'}
              </span>
              <span className="text-silver text-sm">
                {theme === 'black' ? 'Schwarz' : 'Dunkelgrau'}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-silver shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-silver'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              title={`Zu ${
                theme === 'black' ? 'Dunkelgrau' : 'Schwarz'
              } wechseln`}
            >
              <span className="text-silver">
                {theme === 'black' ? '🌙' : '🌘'}
              </span>
              <span className="text-silver font-medium">
                {theme === 'black' ? 'Schwarz' : 'Dunkelgrau'}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
