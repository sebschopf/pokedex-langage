export default function Footer() {
  return (
    <footer className="mt-12 border-t-8 border-black bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
          Sources des données
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-4 bg-black text-white p-2 inline-block">Taux d'utilisation</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://survey.stackoverflow.co/2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  Stack Overflow Developer Survey 2023
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://www.tiobe.com/tiobe-index/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  TIOBE Index
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://github.blog/2023-11-08-the-state-of-open-source-and-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  GitHub Octoverse Report
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://www.jetbrains.com/lp/devecosystem-2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  JetBrains Developer Ecosystem Survey 2023
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://spectrum.ieee.org/top-programming-languages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  IEEE Spectrum Programming Language Rankings
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://redmonk.com/sogrady/category/programming-languages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  RedMonk Programming Language Rankings
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">→</span>
                <a
                  href="https://pypl.github.io/PYPL.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:bg-yellow-300 transition-colors border-b-2 border-black"
                >
                  PYPL Index
                </a>
              </li>
            </ul>
          </div>

          <div className="border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-4 bg-red-600 text-white p-2 inline-block">Note importante</h3>
            <p className="font-medium mb-4">
              Les taux d'utilisation sont des estimations basées sur une combinaison de ces sources et peuvent varier
              selon:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Les domaines d'application</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Les régions géographiques</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Les secteurs d'activité</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>La période de l'enquête</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t-4 border-black pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="font-bold text-lg">
            © {new Date().getFullYear()} POKEDEX<span className="text-red-600">_DEV</span>
          </p>
          <div className="mt-2 md:mt-0">
            <span className="bg-black text-white font-bold px-3 py-1 inline-block">
              Encyclopédie des langages de programmation
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

