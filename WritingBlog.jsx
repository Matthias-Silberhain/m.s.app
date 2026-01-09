import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const WritingBlog = () => {
  const { theme } = useTheme();
  const [expandedPost, setExpandedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: 'Die Kunst des Weltaufbaus',
      date: '15. März 2024',
      excerpt: 'Wie man glaubwürdige Welten für Fantasy- und Science-Fiction-Geschichten erschafft...',
      content: 'Der Weltaufbau ist ein essentieller Bestandteil des Schreibens, besonders in den Genres Fantasy und Science-Fiction. Eine gut konstruierte Welt kann den Leser vollständig in die Geschichte eintauchen lassen. In diesem Beitrag teile ich meine bewährten Methoden für den Aufbau glaubwürdiger Welten, von Geografie über Politik bis hin zu kulturellen Details.',
      tags: ['Schreibtipps', 'Fantasy', 'Weltaufbau'],
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Von der Idee zum Manuskript',
      date: '28. Februar 2024',
      excerpt: 'Mein Prozess zur Entwicklung einer Buchidee in ein vollständiges Manuskript...',
      content: 'Jedes Buch beginnt mit einem Funken - einer Idee. Aber wie wird aus dieser Idee ein vollständiges Manuskript? In diesem Beitrag zeige ich meinen persönlichen Prozess, von der ersten Konzeptphase über das Plotting bis hin zum Schreiben und Überarbeiten. Ich teile auch meine bevorzugten Tools und Techniken, die mir dabei helfen, organisiert zu bleiben.',
      tags: ['Schreibprozess', 'Manuskript', 'Plotting'],
      readTime: '7 min'
    },
    {
      id: 3,
      title: 'Charakterentwicklung',
      date: '10. Januar 2024',
      excerpt: 'Tiefgründige Charaktere erschaffen, die den Lesern im Gedächtnis bleiben...',
      content: 'Ein guter Charakter kann eine Geschichte tragen. In diesem Artikel erfahren Sie, wie Sie lebendige, vielschichtige Charaktere entwickeln, die Ihre Leser lieben (oder hassen) werden. Wir besprechen Hintergrundgeschichten, Motivationen und Charakterbögen.',
      tags: ['Charaktere', 'Schreibhandwerk', 'Entwicklung'],
      readTime: '6 min'
    },
    {
      id: 4,
      title: 'Überwindung von Schreibblockaden',
      date: '5. Dezember 2023',
      excerpt: 'Strategien, um kreative Blockaden zu überwinden und den Schreibfluss zurückzugewinnen...',
      content: 'Jeder Schriftsteller kennt sie: Schreibblockaden. In diesem Beitrag teile ich meine persönlichen Strategien, um solche Blockaden zu überwinden. Von kurzen Pausen bis hin zu kreativen Übungen - entdecken Sie, was für Sie funktioniert.',
      tags: ['Schreibblockade', 'Kreativität', 'Tipps'],
      readTime: '4 min'
    },
  ];

  const toggleExpand = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800 hover:border-gray-700' 
    : 'bg-gray-800 border border-gray-700 hover:border-gray-600';

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Schreib-Blog</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Gedanken, Tipps und Einblicke in meine Arbeit als Autor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post.id} className={`rounded-xl shadow-xl transition-all duration-300 ${cardClass} ${expandedPost === post.id ? 'md:col-span-2' : ''}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-silver mb-2">{post.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} Lesezeit</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleExpand(post.id)}
                  className="text-silver hover:text-white transition-colors"
                >
                  {expandedPost === post.id ? 'Weniger anzeigen' : 'Mehr lesen'}
                </button>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-silver rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                {expandedPost === post.id ? post.content : post.excerpt}
              </p>

              {expandedPost === post.id && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-semibold text-silver mb-2">Kommentare und Diskussion</h4>
                  <p className="text-gray-400 mb-4">Teilen Sie Ihre Gedanken und Erfahrungen in den Kommentaren!</p>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                      Kommentar hinzufügen
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-silver rounded-lg transition-colors">
                      Beitrag teilen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-silver mb-4">Abonnieren Sie den Blog</h3>
        <p className="text-gray-400 mb-6">Verpassen Sie keinen neuen Beitrag. Kostenlos abonnieren!</p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Ihre E-Mail-Adresse"
            className="flex-grow px-4 py-3 bg-gray-800 text-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-silver"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-silver font-semibold rounded-r-lg hover:opacity-90 transition-opacity">
            Abonnieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingBlog;
