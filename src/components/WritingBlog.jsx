import React from 'react';

const WritingBlog = () => {
  const posts = [
    {
      id: 1,
      title: 'Die Kunst des Weltaufbaus',
      date: '15. März 2024',
      excerpt: 'Wie man glaubwürdige Welten für Fantasy- und Science-Fiction-Geschichten erschafft...',
      readTime: '5 min',
      tags: ['Schreibtipps', 'Fantasy']
    },
    {
      id: 2,
      title: 'Von der Idee zum Manuskript',
      date: '28. Februar 2024',
      excerpt: 'Mein Prozess zur Entwicklung einer Buchidee in ein vollständiges Manuskript...',
      readTime: '7 min',
      tags: ['Schreibprozess', 'Manuskript']
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Schreib-Blog</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Gedanken, Einblicke und Updates aus meiner Schreibwerkstatt.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-silver mb-2">{post.title}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">{post.date}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{post.readTime} Lesezeit</span>
                </div>
              </div>
              <div className="text-3xl">📝</div>
            </div>
            
            <p className="text-gray-400 mb-6">{post.excerpt}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="text-silver hover:text-white font-medium">
                Weiterlesen →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WritingBlog;
