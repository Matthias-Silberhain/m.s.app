import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Nachricht wurde gesendet! (Dies ist eine Demo)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Kontakt</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Treten Sie mit mir in Kontakt - für Leser, Verlage und Veranstalter.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-silver"
                  placeholder="Ihr Name"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="email">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-silver"
                  placeholder="ihre@email.de"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="subject">
                Betreff
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-silver"
                placeholder="Betreff Ihrer Nachricht"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-400 mb-2" htmlFor="message">
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-silver resize-none"
                placeholder="Ihre Nachricht..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-silver hover:bg-gray-300 text-gray-900 font-bold rounded-lg transition-colors"
              >
                Nachricht senden
              </button>
            </div>
          </form>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-bold text-silver mb-4">Alternative Kontaktwege</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="text-gray-400">E-Mail</div>
                <div className="text-silver">kontakt@silberhain.de</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-gray-400">Telefon</div>
                <div className="text-silver">+49 123 456789</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="text-gray-400">Büro</div>
                <div className="text-silver">München, Deutschland</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
