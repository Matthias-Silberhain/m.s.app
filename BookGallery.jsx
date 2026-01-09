import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const BookGallery = () => {
  const { theme } = useTheme();
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      title: 'Die vergessene Stadt',
      subtitle: 'Ein historischer Roman',
      year: 2023,
      genre: 'Historische Fiktion',
      coverColor: 'from-blue-900 to-blue-700',
      description: 'Eine epische Reise in eine antike Zivilisation, die von der Welt vergessen wurde. Der junge Archäologe Leo entdeckt eine verborgene Stadt und enthüllt Geheimnisse, die die Geschichte der Menschheit neu schreiben könnten.',
      pages: 432,
      isbn: '978-3-86680-123-4',
      awards: ['Deutscher Buchpreis 2023', 'Bester historischer Roman']
    },
    {
      id: 2,
      title: 'Schatten der Erinnerung',
      subtitle: 'Kurzgeschichtensammlung',
      year: 2022,
      genre: 'Psychologischer Thriller',
      coverColor: 'from-purple-900 to-purple-700',
      description: 'Elf verstörende Geschichten über die Abgründe der menschlichen Psyche. Jede Erzählung führt den Leser in eine Welt zwischen Realität und Wahnsinn.',
      pages: 288,
      isbn: '978-3-86680-122-7',
      awards: ['Kurt-Tucholsky-Preis']
    },
    {
      id: 3,
      title: 'Zeitensprung',
      subtitle: 'Science-Fiction Epos',
      year: 2021,
      genre: 'Science-Fiction',
      coverColor: 'from-green-900 to-green-700',
      description: 'Im Jahr 2154 entdeckt eine Gruppe von Wissenschaftlern eine Möglichkeit, durch die Zeit zu reisen. Doch jede Veränderung der Vergangenheit hat unvorhersehbare Konsequenzen für die Zukunft.',
      pages: 512,
      isbn: '978-3-86680-121-0',
      awards: ['Deutscher Science-Fiction-Preis']
    },
    {
      id: 4,
      title: 'Das letzte Rätsel',
      subtitle: 'Ein Professor-Moritz-Krimi',
      year: 2020,
      genre: 'Krimi/Thriller',
      coverColor: 'from-red-900 to-red-700',
      description: 'Professor Moritz, ein brillanter aber exzentrischer Kryptologe, wird in eine Serie mysteriöser Morde verwickelt, die alle mit antiken Rätseln verbunden sind.',
      pages: 384,
      isbn: '978-3-86680-120-3',
      awards: ['Krimi des Jahres 2020']
    },
    {
      id: 5,
      title: 'Nebel über Avalon',
      subtitle: 'Arthurianische Legende neu erzählt',
      year: 2019,
      genre: 'Fantasy',
      coverColor: 'from-yellow-900 to-yellow-700',
      description: 'Eine moderne Interpretation der Artus-Sage, die mythologische Elemente mit historischen Fakten verbindet. Ein faszinierendes Porträt von Camelot und seinen Bewohnern.',
      pages: 448,
      isbn: '978-3-86680-119-7',
      awards: ['Phantastik-Preis']
    },
    {
      id: 6,
      title: 'Stille Wasser',
      subtitle: 'Ein literarischer Roman',
      year: 2018,
      genre: 'Literarische Fiktion',
      coverColor: 'from-cyan-900 to-cyan-700',
      description: 'Eine berührende Geschichte über Familie, Verlust und die Kraft der Erinnerung. Spielt in den malerischen Landschaften Schleswig-Holsteins.',
      pages: 320,
      isbn: '978-3-86680-118-0',
      awards: ['Aspekte-Literaturpreis']
    }
  ];

  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800' 
    : 'bg-gray-800 border border-gray-700';

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Buch-Galerie</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Eine vollständige Übersicht meiner veröffentlichten Bücher.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div 
            key={book.id} 
            className={`rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 ${cardClass}`}
            onClick={() => setSelectedBook(book)}
          >
            <div className={`h-48 ${book.coverColor} flex items-center justify-center`}>
              <div className="text-center p-4">
                <h3 className="text-2xl font-bold text-white mb-2">{book.title}</h3>
                <p className="text-gray-200">{book.subtitle}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-silver">{book.title}</h4>
                  <p className="text-gray-400">{book.subtitle}</p>
                </div>
                <span className="text-silver font-bold">{book.year}</span>
              </div>
              
              <div className="mb-4">
                <span className="px-3 py-1 bg-gray-700 text-silver rounded-full text-sm">
                  {book.genre}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4 line-clamp-3">{book.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{book.pages} Seiten</span>
                <span>ISBN: {book.isbn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-xl overflow-hidden ${cardClass}`}>
            <div className={`h-64 ${selectedBook.coverColor} flex items-center justify-center p-8`}>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">{selectedBook.title}</h3>
                <p className="text-2xl text-gray-200">{selectedBook.subtitle}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-silver">{selectedBook.title}</h4>
                  <p className="text-gray-400 text-lg">{selectedBook.subtitle} • {selectedBook.year}</p>
                </div>
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <span className="px-4 py-2 bg-gray-700 text-silver rounded-full text-lg">
                  {selectedBook.genre}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6 text-lg">{selectedBook.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h5 className="text-silver font-bold mb-2">Details</h5>
                  <p className="text-gray-400">Seiten: {selectedBook.pages}</p>
                  <p className="text-gray-400">ISBN: {selectedBook.isbn}</p>
                </div>
                <div>
                  <h5 className="text-silver font-bold mb-2">Auszeichnungen</h5>
                  <ul className="text-gray-400">
                    {selectedBook.awards.map((award, index) => (
                      <li key={index} className="mb-1">• {award}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                  Leseprobe
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-silver font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Jetzt kaufen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-silver mb-4">Erhältlich in allen Buchhandlungen</h3>
        <p className="text-gray-400 mb-8">Sowie online bei allen großen Buchhändlern.</p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {['Amazon', 'Thalia', 'Hugendubel', 'buecher.de', 'Weltbild'].map((store, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <span className="text-silver font-semibold">{store}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookGallery;
