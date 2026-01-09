import React from 'react';

const AboutSection = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Über mich</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Meine Reise als Schriftsteller und was mich antreibt.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border-4 border-silver">
                <span className="text-6xl">✍️</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-silver mb-4">Matthias Silberhain</h3>
              <p className="text-gray-400 mb-4">
                Seit über einem Jahrzehnt widme ich mich der Kunst des Geschichtenerzählens. 
                Meine Werke spannen verschiedene Genres, von historischen Romanen bis hin zu 
                Science-Fiction, vereint durch tiefgreifende Charaktere und fesselnde Handlungen.
              </p>
              <p className="text-gray-400 mb-6">
                Als Autor strebe ich danach, Leser in Welten zu entführen, die zum Nachdenken 
                anregen und Emotionen wecken. Jede Geschichte ist für mich eine Reise, die 
                ich gemeinsam mit meinen Lesern antrete.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-silver">12+</div>
                  <div className="text-gray-500">Veröffentlichte Werke</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-silver">7</div>
                  <div className="text-gray-500">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-silver">3</div>
                  <div className="text-gray-500">Literaturpreise</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-silver">15+</div>
                  <div className="text-gray-500">Länder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
