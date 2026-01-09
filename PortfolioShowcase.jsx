import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PortfolioShowcase = () => {
  const { theme } = useTheme();
  
  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800 hover:border-gray-700' 
    : 'bg-gray-800 border border-gray-700 hover:border-gray-600';

  const works = [
    { 
      id: 1, 
      title: 'Die vergessene Stadt', 
      type: 'Roman', 
      year: 2023,
      description: 'Ein historischer Roman über eine verlorene Zivilisation.',
      stats: { pages: 432, rating: 4.8 }
    },
    // ... andere Werke
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Portfolio</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Eine Auswahl meiner veröffentlichten Werke - jede Geschichte ein Unikat.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <div key={work.id} className={`rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ${cardClass}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-silver mb-2">{work.title}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-gray-700 text-silver rounded-full text-sm">
                      {work.type}
                    </span>
                    <span className="text-gray-400">{work.year}</span>
                  </div>
                </div>
                <div className="text-3xl text-silver">📘</div>
              </div>
              
              <p className="text-gray-400 mb-6">{work.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-silver font-bold">{work.stats.pages}</div>
                    <div className="text-gray-500 text-sm">Seiten</div>
                  </div>
                  <div className="text-center">
                    <div className="text-silver font-bold">{work.stats.rating}/5</div>
                    <div className="text-gray-500 text-sm">Bewertung</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-silver text-center mb-8">Statistiken</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '12', label: 'Veröffentlichte Werke', color: 'text-blue-400' },
            { value: '5', label: 'Literaturpreise', color: 'text-yellow-400' },
            { value: '7', label: 'Jahre Erfahrung', color: 'text-green-400' },
            { value: '15k+', label: 'Leser weltweit', color: 'text-purple-400' }
          ].map((stat, index) => (
            <div key={index} className={`p-6 rounded-xl ${cardClass} text-center`}>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;
