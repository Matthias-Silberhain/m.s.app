// components/PortfolioShowcase.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PortfolioShowcase = () => {
  const { theme } = useTheme();
  
  const cardClass = theme === 'dark-gray' ? 'bg-gray-800' : 'bg-gray-900';
  const statClass = theme === 'dark-gray' ? 'bg-gray-800' : 'bg-gray-900';

  const works = [
    // ... (same as before)
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-silver mb-4">Portfolio</h2>
        <p className="max-w-2xl mx-auto">
          Hier finden Sie eine Auswahl meiner veröffentlichten Werke - von Romanen bis zu Kurzgeschichten.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {works.map((work) => (
          <div key={work.id} className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${cardClass}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-silver">{work.title}</h3>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm font-medium">{work.type}</span>
                    <span className="mx-3 text-gray-500">•</span>
                    <span>{work.year}</span>
                  </div>
                </div>
                <span className="text-3xl">📘</span>
              </div>
              
              <p className="mb-4">{work.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Verlag: {work.publisher}</span>
                <a href={work.link} className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
                  Mehr erfahren
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-silver mb-6">Veröffentlichungsstatistiken</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className={`p-6 rounded-xl shadow-md ${statClass}`}>
            <div className="text-4xl font-bold text-blue-400">12</div>
            <div className="mt-2">Veröffentlichte Werke</div>
          </div>
          <div className={`p-6 rounded-xl shadow-md ${statClass}`}>
            <div className="text-4xl font-bold text-green-400">5</div>
            <div className="mt-2">Auszeichnungen</div>
          </div>
          <div className={`p-6 rounded-xl shadow-md ${statClass}`}>
            <div className="text-4xl font-bold text-purple-400">7</div>
            <div className="mt-2">Jahre Erfahrung</div>
          </div>
          <div className={`p-6 rounded-xl shadow-md ${statClass}`}>
            <div className="text-4xl font-bold text-yellow-400">15+</div>
            <div className="mt-2">Länder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;
