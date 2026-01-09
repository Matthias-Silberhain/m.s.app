import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ReadingList = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Der Name des Windes',
      author: 'Patrick Rothfuss',
      genre: 'Fantasy',
      status: 'read',
      rating: 5,
      comment: 'Meisterhaft erzählt, eine der besten Fantasy-Geschichten aller Zeiten.',
      year: 2007
    },
    {
      id: 2,
      title: 'Gödel, Escher, Bach',
      author: 'Douglas Hofstadter',
      genre: 'Philosophie/Mathematik',
      status: 'reading',
      rating: null,
      comment: 'Eine anspruchsvolle, aber faszinierende Lektüre über Systeme und Selbstreferenz.',
      year: 1979
    },
    {
      id: 3,
      title: 'Stolz und Vorurteil',
      author: 'Jane Austen',
      genre: 'Klassiker',
      status: 'read',
      rating: 4,
      comment: 'Zeitlose Charakterstudie mit wunderbarer Ironie.',
      year: 1813
    },
    {
      id: 4,
      title: 'Die Vermessung der Welt',
      author: 'Daniel Kehlmann',
      genre: 'Historischer Roman',
      status: 'to-read',
      rating: null,
      comment: 'Steht schon lange auf meiner Liste. Die Verbindung von Humboldt und Gauß klingt vielversprechend.',
      year: 2005
    },
    {
      id: 5,
      title: 'Solaris',
      author: 'Stanisław Lem',
      genre: 'Science-Fiction',
      status: 'read',
      rating: 5,
      comment: 'Philosophische Science-Fiction vom Feinsten. Lems Visionen sind prophetisch.',
      year: 1961
    },
    {
      id: 6,
      title: 'Die Archive der Dresdner Frauenkirche',
      author: 'Jens-Christian Wagner',
      genre: 'Historische Forschung',
      status: 'reading',
      rating: null,
      comment: 'Faszinierende historische Recherche für mein nächstes Buchprojekt.',
      year: 2022
    },
    {
      id: 7,
      title: 'Das Café am Rande der Welt',
      author: 'John Strelecky',
      genre: 'Philosophie',
      status: 'read',
      rating: 3,
      comment: 'Einfache, aber wirksame Lebensweisheiten in einer netten Geschichte verpackt.',
      year: 2003
    },
    {
      id: 8,
      title: 'Die unsichtbare Bibliothek',
      author: 'Genevieve Cogman',
      genre: 'Fantasy',
      status: 'to-read',
      rating: null,
      comment: 'Empfohlen von einer Leserin. Klingt nach einem spannenden Konzept für Bibliophilen.',
      year: 2015
    }
  ];

  const filteredBooks = filter === 'all' 
    ? books 
    : books.filter(book => book.status === filter);

  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800' 
    : 'bg-gray-800 border border-gray-700';

  const getStatusColor = (status) => {
    switch(status) {
      case 'read': return 'bg-green-900 text-green-300';
      case 'reading': return 'bg-blue-900 text-blue-300';
      case 'to-read': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'read': return 'Gelesen';
      case 'reading': return 'Lese ich gerade';
      case 'to-read': return 'Auf meiner Liste';
      default: return '';
    }
  };

  const getRatingStars = (rating) => {
    if (!rating) return null;
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Meine Leseliste</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Bücher, die mich inspirieren, herausfordern und begeistern.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-silver' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-silver'
            }`}
          >
            Alle Bücher
          </button>
          <button
            onClick={() => setFilter('reading')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'reading' 
                ? 'bg-blue-900 text-blue-300' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-blue-300'
            }`}
          >
            Aktuell lese ich
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'read' 
                ? 'bg-green-900 text-green-300' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-green-300'
            }`}
          >
            Bereits gelesen
          </button>
          <button
            onClick={() => setFilter('to-read')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'to-read' 
                ? 'bg-yellow-900 text-yellow-300' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-yellow-300'
            }`}
          >
            Auf meiner Liste
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className={`rounded-xl shadow-xl p-6 ${cardClass}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-silver mb-1">{book.title}</h3>
                <p className="text-gray-400">{book.author} • {book.year}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(book.status)}`}>
                {getStatusText(book.status)}
              </span>
            </div>
            
            <div className="mb-4">
              <span className="px-3 py-1 bg-gray-700 text-silver rounded-full text-sm">
                {book.genre}
              </span>
            </div>
            
            <p className="text-gray-300 mb-4">{book.comment}</p>
            
            {book.rating && (
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 text-lg">
                  {getRatingStars(book.rating)}
                </div>
                <span className="text-silver font-bold">{book.rating}/5</span>
              </div>
            )}
            
            {book.status === 'to-read' && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                  Zur Wunschliste hinzufügen
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className={`rounded-xl shadow-xl p-8 ${cardClass}`}>
          <h3 className="text-2xl font-bold text-silver mb-6">Leseziele & Statistik</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {books.filter(b => b.status === 'read').length}
              </div>
              <div className="text-gray-400">Bücher gelesen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {books.filter(b => b.status === 'reading').length}
              </div>
              <div className="text-gray-400">Aktuell lesend</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-silver mb-2">
                {books.filter(b => b.status === 'to-read').length}
              </div>
              <div className="text-gray-400">Auf der Liste</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-silver mb-4">Jahresziel 2024</h4>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-4 rounded-full" 
                style={{ width: '45%' }}
              ></div>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>9 von 20 Büchern</span>
              <span>45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
