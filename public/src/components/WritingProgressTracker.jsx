import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const WritingProgressTracker = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Echo der Vergangenheit',
      genre: 'Historischer Roman',
      targetWords: 120000,
      currentWords: 75432,
      deadline: '2024-12-15',
      status: 'writing',
      progress: 63,
      description: 'Ein Roman über die Wiener Moderne und das Fin de Siècle.',
      dailyGoal: 1000,
      lastUpdated: '2024-03-20'
    },
    {
      id: 2,
      title: 'Nebelkind - Kurzgeschichten',
      genre: 'Literarische Kurzgeschichten',
      targetWords: 50000,
      currentWords: 32500,
      deadline: '2024-08-30',
      status: 'editing',
      progress: 65,
      description: 'Eine Sammlung atmosphärischer Kurzgeschichten über Kindheitserinnerungen.',
      dailyGoal: 500,
      lastUpdated: '2024-03-19'
    },
    {
      id: 3,
      title: 'Quanten der Zeit',
      genre: 'Science-Fiction',
      targetWords: 150000,
      currentWords: 12000,
      deadline: '2025-06-01',
      status: 'planning',
      progress: 8,
      description: 'Eine Trilogie über Zeitreisen und Quantenphysik.',
      dailyGoal: 750,
      lastUpdated: '2024-03-18'
    },
    {
      id: 4,
      title: 'Stilles Feuer',
      genre: 'Drama',
      targetWords: 90000,
      currentWords: 90000,
      deadline: '2024-02-01',
      status: 'completed',
      progress: 100,
      description: 'Familiendrama über drei Generationen im Ruhrgebiet.',
      dailyGoal: 0,
      lastUpdated: '2024-02-15'
    }
  ]);

  const [newWords, setNewWords] = useState({});

  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800' 
    : 'bg-gray-800 border border-gray-700';

  const getStatusColor = (status) => {
    switch(status) {
      case 'planning': return 'bg-yellow-900 text-yellow-300';
      case 'writing': return 'bg-blue-900 text-blue-300';
      case 'editing': return 'bg-purple-900 text-purple-300';
      case 'completed': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'planning': return 'Planung';
      case 'writing': return 'Schreibphase';
      case 'editing': return 'Überarbeitung';
      case 'completed': return 'Abgeschlossen';
      default: return '';
    }
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleAddWords = (projectId) => {
    const wordsToAdd = parseInt(newWords[projectId] || 0);
    if (wordsToAdd > 0) {
      setProjects(projects.map(project => {
        if (project.id === projectId) {
          const newCurrentWords = project.currentWords + wordsToAdd;
          const newProgress = Math.min(100, Math.round((newCurrentWords / project.targetWords) * 100));
          return {
            ...project,
            currentWords: newCurrentWords,
            progress: newProgress,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return project;
      }));
      setNewWords({...newWords, [projectId]: ''});
    }
  };

  const handleNewWordsChange = (projectId, value) => {
    setNewWords({...newWords, [projectId]: value});
  };

  const calculateDailyAverage = (project) => {
    if (project.status === 'completed') return 0;
    
    const today = new Date();
    const deadline = new Date(project.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 0) return 0;
    
    const wordsLeft = project.targetWords - project.currentWords;
    return Math.ceil(wordsLeft / daysLeft);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Schreibfortschritt</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Verfolgen Sie meine aktuellen Projekte und den Fortschritt meiner Arbeit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className={`rounded-xl shadow-xl p-6 ${cardClass}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-silver mb-2">{project.title}</h3>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-gray-700 text-silver rounded-full text-sm">
                    {project.genre}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-silver">{project.progress}%</div>
                <div className="text-gray-400 text-sm">Fortschritt</div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{project.description}</p>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{project.currentWords.toLocaleString()} von {project.targetWords.toLocaleString()} Wörtern</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg ${theme === 'black' ? 'bg-gray-800' : 'bg-gray-700'}`}>
                <div className="text-2xl font-bold text-silver mb-1">
                  {calculateDaysLeft(project.deadline)}
                </div>
                <div className="text-gray-400 text-sm">Tage bis Frist</div>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'black' ? 'bg-gray-800' : 'bg-gray-700'}`}>
                <div className="text-2xl font-bold text-silver mb-1">
                  {calculateDailyAverage(project).toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Wörter/Tag nötig</div>
              </div>
            </div>

            {project.status !== 'completed' && (
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={newWords[project.id] || ''}
                  onChange={(e) => handleNewWordsChange(project.id, e.target.value)}
                  placeholder="Heutige Wörter"
                  className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-silver"
                  min="0"
                />
                <button
                  onClick={() => handleAddWords(project.id)}
                  className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-silver font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Hinzufügen
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Zuletzt aktualisiert: {project.lastUpdated}</span>
                <span>Tagesziel: {project.dailyGoal} Wörter</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className={`rounded-xl shadow-xl p-8 ${cardClass}`}>
          <h3 className="text-2xl font-bold text-silver mb-6">Schreibstatistiken</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {projects.reduce((sum, project) => sum + project.currentWords, 0).toLocaleString()}
              </div>
              <div className="text-gray-400">Gesamte Wörter</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-gray-400">Abgeschlossene Projekte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {projects.filter(p => p.status !== 'completed').length}
              </div>
              <div className="text-gray-400">Aktive Projekte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)}%
              </div>
              <div className="text-gray-400">Durchschnittl. Fortschritt</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-silver mb-4">Schreibziele 2024</h4>
            <div className="space-y-4">
              {projects
                .filter(p => p.status !== 'completed')
                .map(project => (
                  <div key={project.id}>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>{project.title}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingProgressTracker;
