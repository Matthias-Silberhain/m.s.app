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
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeSection === item.id 
                ? 'bg-gray-700 text-silver' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
