import React, { useState } from 'react';

const WritingProgressTracker = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Neuer Roman',
      genre: 'Historische Fiktion',
      progress: 65,
      words: 52000,
      target: 80000,
      deadline: '30.06.2024',
      status: 'In Arbeit'
    },
    {
      id: 2,
      title: 'Kurzgeschichtensammlung',
      genre: 'Fantasy',
      progress: 40,
      words: 16000,
      target: 40000,
      deadline: '15.09.2024',
      status: 'In Planung'
    },
    {
      id: 3,
      title: 'Non-Fiction Essay',
      genre: 'Essay',
      progress: 90,
      words: 9000,
      target: 10000,
      deadline: '31.03.2024',
      status: 'Finalisierung'
    },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Arbeit': return 'bg-blue-900 text-blue-300';
      case 'In Planung': return 'bg-yellow-900 text-yellow-300';
      case 'Finalisierung': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const addProject = () => {
    const newProject = {
      id: projects.length + 1,
      title: 'Neues Projekt',
      genre: 'Noch festzulegen',
      progress: 0,
      words: 0,
      target: 50000,
      deadline: '31.12.2024',
      status: 'In Planung'
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Schreibfortschritt</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Aktuelle Projekte und mein Fortschritt bei neuen Werken.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-silver mb-2">{project.title}</h3>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {project.genre}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="text-3xl">📖</div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Fortschritt</span>
                <span className="text-silver font-bold">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-gray-600 to-silver h-3 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-silver">{project.words.toLocaleString()}</div>
                <div className="text-gray-500 text-sm">Wörter</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-silver">{project.target.toLocaleString()}</div>
                <div className="text-gray-500 text-sm">Ziel</div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <div className="text-gray-400">
                  Deadline: <span className="text-silver">{project.deadline}</span>
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={addProject}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-silver font-bold rounded-lg transition-colors border-2 border-dashed border-gray-600"
        >
          + Neues Projekt hinzufügen
        </button>
      </div>
    </div>
  );
};

export default WritingProgressTracker;
