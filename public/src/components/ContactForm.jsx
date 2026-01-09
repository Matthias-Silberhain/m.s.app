import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ContactForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'reader'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      contactType: 'reader'
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800' 
    : 'bg-gray-800 border border-gray-700';

  const inputClass = `w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-silver focus:border-transparent transition-colors`;

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Kontakt</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Treten Sie mit mir in Kontakt – ob als Leser, Verlag oder für eine Veranstaltung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className={`rounded-xl shadow-xl p-8 ${cardClass}`}>
          <h3 className="text-2xl font-bold text-silver mb-6">Kontaktformular</h3>
          
          {isSubmitted ? (
            <div className="p-6 bg-gradient-to-r from-green-900 to-green-800 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">✓</div>
                <h4 className="text-xl font-bold text-white mb-2">Nachricht gesendet!</h4>
                <p className="text-green-200">
                  Vielen Dank für Ihre Nachricht. Ich werde mich so schnell wie möglich bei Ihnen melden.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-silver mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label className="block text-silver mb-2">E-Mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label className="block text-silver mb-2">Ich bin *</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'reader', label: 'Leser/Leserin' },
                    { value: 'publisher', label: 'Verlag' },
                    { value: 'event', label: 'Veranstalter' },
                    { value: 'other', label: 'Sonstiges' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="contactType"
                        value={option.value}
                        checked={formData.contactType === option.value}
                        onChange={handleChange}
                        className="mr-2 text-silver"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-silver mb-2">Betreff *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Betreff Ihrer Nachricht"
                />
              </div>

              <div>
                <label className="block text-silver mb-2">Nachricht *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={inputClass}
                  placeholder="Ihre Nachricht..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isSubmitting 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-600 text-silver hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          )}
        </div>

        <div>
          <div className={`rounded-xl shadow-xl p-8 mb-8 ${cardClass}`}>
            <h3 className="text-2xl font-bold text-silver mb-6">Kontaktinformationen</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-2xl mr-4">📧</div>
                <div>
                  <h4 className="text-lg font-semibold text-silver mb-1">E-Mail</h4>
                  <p className="text-gray-300">kontakt@matthias-silberhain.de</p>
                  <p className="text-gray-400 text-sm">Antwort innerhalb von 2-3 Werktagen</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl mr-4">🏢</div>
                <div>
                  <h4 className="text-lg font-semibold text-silver mb-1">Verlagskontakt</h4>
                  <p className="text-gray-300">Lektorat: lektorat@silberhain-verlag.de</p>
                  <p className="text-gray-400 text-sm">Für Verlage und geschäftliche Anfragen</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl mr-4">🎤</div>
                <div>
                  <h4 className="text-lg font-semibold text-silver mb-1">Veranstaltungen</h4>
                  <p className="text-gray-300">events@matthias-silberhain.de</p>
                  <p className="text-gray-400 text-sm">Für Lesungen und Vorträge</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-8 ${cardClass}`}>
            <h3 className="text-2xl font-bold text-silver mb-6">Häufige Anfragen</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-silver mb-2">Lesungen buchen</h4>
                <p className="text-gray-400">
                  Ich halte regelmäßig Lesungen in Bibliotheken, Buchhandlungen und auf Literaturfestivals. 
                  Für Terminanfragen nutzen Sie bitte das Kontaktformular.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-silver mb-2">Manuskripte einreichen</h4>
                <p className="text-gray-400">
                  Bitte beachten Sie, dass ich derzeit keine unaufgeforderten Manuskripte annehmen kann. 
                  Für Veröffentlichungsanfragen wenden Sie sich direkt an meinen Verlag.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-silver mb-2">Kooperationen</h4>
                <p className="text-gray-400">
                  Ich stehe offen für interessante Kooperationsprojekte mit anderen Künstlern, 
                  Institutionen und Medien. Sprechen Sie mich gerne an.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
