import React from 'react';

const Navigation = ({ activeSection, setActiveSection }) => {
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
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 border-2 border-silver rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">M</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-silver rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-silver tracking-wide">Matthias Silberhain</h1>
                <p className="text-sm text-gray-400">Autor & Schriftsteller</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeSection === item.id 
                    ? 'bg-gray-700 text-silver shadow-lg' 
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                }`}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
