import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-silver font-bold mb-4">MATTHIAS SILBERHAIN</div>
          <div className="text-gray-400">Lade Autoren-App...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl text-silver font-bold mb-6">Willkommen zur Autoren-App</h1>
      <p className="text-gray-400 mb-8">Die App wird bald vollständig sein!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl text-silver mb-2">Portfolio</h2>
          <p className="text-gray-400">Wird bald verfügbar sein</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl text-silver mb-2">Buch-Galerie</h2>
          <p className="text-gray-400">Wird bald verfügbar sein</p>
        </div>
      </div>
    </div>
  );
}

export default App;
