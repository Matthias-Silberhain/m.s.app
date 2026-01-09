import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black z-50">
      <div className="relative mb-8">
        <div className="text-5xl font-bold text-silver mb-2 tracking-wider">
          MATTHIAS SILBERHAIN
        </div>
        <div className="text-lg text-gray-400 text-center">Autor & Schriftsteller</div>
        
        {/* Logo */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-silver rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-20 h-20 border-2 border-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">✍️</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-gray-600 to-silver transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-silver">{progress}%</div>
      <div className="mt-8 text-gray-500 text-sm">Lade Autoren-Portfolio...</div>
      
      {/* Pulsierende Punkte */}
      <div className="flex space-x-2 mt-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-silver rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
