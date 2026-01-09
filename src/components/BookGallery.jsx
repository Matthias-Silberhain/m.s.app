import React from 'react';

const BookGallery = () => {
  const books = [
    {
      id: 1,
      title: 'Die vergessene Stadt',
      cover: '🏛️',
      genre: 'Historischer Roman',
      year: 2023,
      description: 'Eine epische Reise durch antike Ruinen und verborgene Geheimnisse.'
    },
    {
      id: 2,
      title: 'Schatten der Erinnerung',
      cover: '🌑',
      genre: 'Psychologischer Thriller',
      year: 2022,
      description: 'Dunkle Geheimnisse kommen ans Licht in dieser packenden Geschichte.'
    },
    {
      id: 3,
      title: 'Zeitensprung',
      cover: '⏳',
      genre: 'Science-Fiction',
      year: 2021,
      description: 'Eine abenteuerliche Reise durch Zeit und Raum.'
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Buch-Galerie</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Meine Werke im Überblick - Cover, Beschreibungen und Leseproben.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <div className="text-8xl mb-4">{book.cover}</div>
            <h3 className="text-2xl font-bold text-silver mb-2">{book.title}</h3>
            <div className="mb-4">
              <span className="px-3 py-1 bg-gray-700 text-silver rounded-full text-sm">
                {book.genre}
              </span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-400">{book.year}</span>
            </div>
            <p className="text-gray-400 mb-6">{book.description}</p>
            <div className="space-x-4">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                Leseprobe
              </button>
              <button className="px-4 py-2 bg-silver hover:bg-gray-300 text-gray-900 rounded-lg transition-colors">
                Mehr erfahren
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGallery;
