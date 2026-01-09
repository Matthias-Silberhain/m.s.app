import React from 'react';

const ReadingList = () => {
  const books = [
    {
      id: 1,
      title: 'Der Name des Windes',
      author: 'Patrick Rothfuss',
      genre: 'Fantasy',
      status: 'Gelesen',
      rating: 5
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopie',
      status: 'Gelesen',
      rating: 5
    },
    {
      id: 3,
      title: 'Der Alchimist',
      author: 'Paulo Coelho',
      genre: 'Philosophie',
      status: 'Aktuell',
      rating: 4
    },
    {
      id: 4,
      title: 'Kafka am Strand',
      author: 'Haruki Murakami',
      genre: 'Magischer Realismus',
      status: 'Auf der Liste',
      rating: 0
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Gelesen': return 'bg-green-900 text-green-300';
      case 'Aktuell': return 'bg-yellow-900 text-yellow-300';
      case 'Auf der Liste': return 'bg-blue-900 text-blue-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Leseliste</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Bücher, die mich inspirieren, prägen und zum Nachdenken anregen.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-4 px-6 text-left text-silver font-bold">Buch</th>
              <th className="py-4 px-6 text-left text-silver font-bold">Autor</th>
              <th className="py-4 px-6 text-left text-silver font-bold">Genre</th>
              <th className="py-4 px-6 text-left text-silver font-bold">Status</th>
              <th className="py-4 px-6 text-left text-silver font-bold">Bewertung</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{book.title}</div>
                </td>
                <td className="py-4 px-6 text-gray-300">{book.author}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {book.genre}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(book.status)}`}>
                    {book.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="text-yellow-400">
                    {renderStars(book.rating)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-silver mb-4">Aktuelle Empfehlung</h3>
          <p className="text-gray-400">
            "Der Name des Windes" von Patrick Rothfuss - Eine Meisterleistung im Storytelling.
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-silver mb-4">Klassiker</h3>
          <p className="text-gray-400">
            "1984" bleibt zeitlos relevant mit seinen gesellschaftlichen Warnungen.
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-silver mb-4">Als nächstes</h3>
          <p className="text-gray-400">
            Haruki Murakamis magischer Realismus fasziniert mich immer wieder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
