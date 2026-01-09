import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutSection = () => {
  const { theme } = useTheme();

  const cardClass = theme === 'black' 
    ? 'bg-gray-900 border border-gray-800' 
    : 'bg-gray-800 border border-gray-700';

  const milestones = [
    { year: '2010', event: 'Erste Veröffentlichung einer Kurzgeschichte' },
    { year: '2013', event: 'Abschluss des Literaturstudiums' },
    { year: '2015', event: 'Erster Roman "Stille Wasser"' },
    { year: '2018', event: 'Deutscher Buchpreis für "Die vergessene Stadt"' },
    { year: '2021', event: 'Beginn der "Zeitensprung"-Trilogie' },
    { year: '2023', event: 'Übersetzung der Werke in 12 Sprachen' },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-silver mb-4 tracking-wide">Über mich</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Die Reise eines Schriftstellers – von den ersten schriftstellerischen Versuchen bis zu den Bestsellern.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className={`rounded-xl shadow-xl p-8 mb-8 ${cardClass}`}>
            <h3 className="text-2xl font-bold text-silver mb-6">Meine Geschichte</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Geboren und aufgewachsen in Heidelberg, entdeckte ich meine Liebe zum Schreiben bereits in jungen Jahren. 
                Meine ersten Geschichten entstanden in alten Schulheften, versteckt vor neugierigen Blicken.
              </p>
              <p>
                Nach dem Abitur studierte ich Literaturwissenschaft und Philosophie in Heidelberg und Wien. 
                Diese Jahre prägten nicht nur meinen Schreibstil, sondern auch meine Weltsicht.
              </p>
              <p>
                Meine Karriere als Autor begann mit Kurzgeschichten in Literaturzeitschriften. 
                2015 folgte dann mein erster Roman "Stille Wasser", der mich einem breiteren Publikum bekannt machte.
              </p>
              <p>
                Heute lebe ich mit meiner Familie in einem alten Bauernhaus im Schwarzwald, 
                wo ich zwischen Bücherregalen und bei stets frischem Kaffee meine Geschichten schreibe.
              </p>
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-8 ${cardClass}`}>
            <h3 className="text-2xl font-bold text-silver mb-6">Mein Schreibprozess</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-silver mb-2">Forschung</h4>
                <p className="text-gray-400">
                  Jedes Buch beginnt mit intensiver Recherche. Ob historische Epochen oder wissenschaftliche Konzepte – 
                  ich lege Wert auf Authentizität und Tiefgang.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-silver mb-2">Plotting</h4>
                <p className="text-gray-400">
                  Ich entwickle detaillierte Charakterbögen und Plot-Strukturen, bevor ich mit dem Schreiben beginne. 
                  Diese Grundlage gibt mir die Freiheit, mich auf die Sprache zu konzentrieren.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-silver mb-2">Schreiben</h4>
                <p className="text-gray-400">
                  Ich schreibe täglich, meist in den frühen Morgenstunden. Meine Werkzeuge: 
                  Ein Notizbuch für erste Ideen und ein alter Laptop für das Manuskript.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={`rounded-xl shadow-xl p-8 mb-8 ${cardClass}`}>
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center mr-6">
                <span className="text-4xl">✍️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-silver">Matthias Silberhain</h3>
                <p className="text-gray-400">Autor & Schriftsteller</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-silver w-32">Geboren</span>
                <span className="text-gray-300">1985, Heidelberg</span>
              </div>
              <div className="flex items-center">
                <span className="text-silver w-32">Wohnort</span>
                <span className="text-gray-300">Schwarzwald, Deutschland</span>
              </div>
              <div className="flex items-center">
                <span className="text-silver w-32">Genre</span>
                <span className="text-gray-300">Literarische Fiktion, Historische Romane, Science-Fiction</span>
              </div>
              <div className="flex items-center">
                <span className="text-silver w-32">Auszeichnungen</span>
                <span className="text-gray-300">12 literarische Preise</span>
              </div>
              <div className="flex items-center">
                <span className="text-silver w-32">Sprachen</span>
                <span className="text-gray-300">Deutsch, Englisch, Französisch</span>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-8 mb-8 ${cardClass}`}>
            <h3 className="text-2xl font-bold text-silver mb-6">Meilensteine</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start mb-6 last:mb-0">
                  <div className="w-8 h-8 rounded-full bg-silver flex items-center justify-center mr-4 z-10">
                    <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-silver">{milestone.year}</div>
                    <div className="text-gray-300">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-8 ${cardClass}`}>
            <h3 className="text-2xl font-bold text-silver mb-6">Inspiration</h3>
            <p className="text-gray-300 mb-4">
              Meine Inspiration finde ich in der Natur, alten Architekturen, 
              wissenschaftlichen Entdeckungen und den Geschichten der Menschen, die ich treffe.
            </p>
            <p className="text-gray-300">
              "Schreiben ist für mich eine Art, die Welt zu verstehen und zu ordnen. 
              Jede Geschichte ist eine Reise, auf die ich mich gemeinsam mit meinen Lesern begebe."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
