import React from 'react';

const PortfolioShowcase = () => {
  const works = [
    {
      id: 1,
      title: 'Die vergessene Stadt',
      type: 'Roman',
      year: 2023,
      publisher: 'Literatur Verlag',
      description: 'Ein historischer Roman über eine verlorene Zivilisation.',
      link: '#',
    },
    {
      id: 2,
      title: 'Schatten der Erinnerung',
      type: 'Kurzgeschichtensammlung',
      year: 2022,
      publisher: 'Kurz & Gut Verlag',
      description:
        'Eine Sammlung mysteriöser und psychologischer Kurzgeschichten.',
      link: '#',
    },
    {
      id: 3,
      title: 'Zeitensprung',
      type: 'Science-Fiction',
      year: 2021,
      publisher: 'Zukunftsbuch Verlag',
      description: 'Eine Reise durch verschiedene Zeitebenen und Dimensionen.',
      link: '#',
    },
    {
      id: 4,
      title: 'Das letzte Rätsel',
      type: 'Krimi',
      year: 2020,
      publisher: 'Spannung Verlag',
      description: 'Ein kniffliger Fall, der einen unerwarteten Wendepunkt nimmt.',
      link: '#',
    },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-silver mb-4">Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hier finden Sie eine Auswahl meiner veröffentlichten Werke - von
          Romanen bis zu Kurzgeschichten.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {works.map((work) => (
          <div
            key={work.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {work.title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {work.type}
                    </span>
                    <span className="mx-3 text-gray-400">•</span>
                    <span className="text-gray-600">{work.year}</span>
                  </div>
                </div>
                <span className="text-3xl">📘</span>
              </div>

              <p className="text-gray-600 mb-4">{work.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Verlag: {work.publisher}
                </span>
                <a
                  href={work.link}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  Mehr erfahren
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Veröffentlichungsstatistiken
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-blue-600">12</div>
            <div className="text-gray-600 mt-2">Veröffentlichte Werke</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600">5</div>
            <div className="text-gray-600 mt-2">Auszeichnungen</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-purple-600">7</div>
            <div className="text-gray-600 mt-2">Jahre Erfahrung</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-yellow-600">15+</div>
            <div className="text-gray-600 mt-2">Länder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;
