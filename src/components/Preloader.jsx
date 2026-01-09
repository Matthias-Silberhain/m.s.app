import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-5xl text-silver font-bold mb-4 animate-pulse">
          MATTHIAS SILBERHAIN
        </div>
        <div className="text-gray-400 mb-4">Autor & Schriftsteller</div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-silver w-3/4"></div>
        </div>
        <div className="text-gray-500 mt-4">Lade Autoren-Portfolio...</div>
      </div>
    </div>
  );
};

export default Preloader;
