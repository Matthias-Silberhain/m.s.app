import React from 'react';

const PortfolioShowcase = () => {
  const works = [
    { 
      id: 1, 
      title: 'Die vergessene Stadt', 
      type: 'Roman', 
      year: 2023,
      description: 'Ein historischer Roman über eine verlorene Zivilisation.',
      pages: 432,
      rating: 4.8
    },
    { 
      id: 2, 
      title: 'Schatten der Erinnerung', 
      type: 'Kurzgeschichten', 
      year: 2022,
      description: 'Eine Sammlung mysteriöser und psychologischer Kurzgeschichten.',
      pages: 256,
      rating: 4.6
    },
    { 
      id: 3, 
      title: 'Zeitensprung', 
      type: 'Science-Fiction', 
      year: 2021,
      description: 'Eine Reise durch verschiedene Zeitebenen und Dimensionen.',
      pages: 384,
      rating: 4.9
    },
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
          <div key={work.id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
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
                  <div className="text-silver font-bold">{work.pages}</div>
                  <div className="text-gray-500 text-sm">Seiten</div>
                </div>
                <div className="text-center">
                  <div className="text-silver font-bold">{work.rating}/5</div>
                  <div className="text-gray-500 text-sm">Bewertung</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioShowcase;
