import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-4 text-black uppercase tracking-tighter lcp-title">
          À PROPOS
        </h1>
        <div className="w-32 h-2 bg-black mx-auto mb-8"></div>
      </div>

      <section className="mb-10 bg-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <h2 className="text-3xl font-black mb-6 text-black uppercase tracking-tight border-b-4 border-black pb-2">
          Le projet Pokedex des langages
        </h2>
        <p className="mb-4 text-lg">
          Ce projet a pour but de créer une encyclopédie des langages de programmation, inspirée du concept du Pokedex
          dans l'univers Pokémon. L'objectif est de fournir une ressource éducative et ludique pour découvrir et
          comparer les différents langages de programmation.
        </p>
        <p className="mb-4 text-lg">
          Chaque langage est présenté sous forme de carte avec ses caractéristiques principales, son histoire, ses cas
          d'usage et son taux d'utilisation dans l'industrie.
        </p>
        <p className="text-lg font-medium">
          Ce projet est open-source et les contributions sont les bienvenues. Si vous souhaitez ajouter un langage,
          corriger une information ou améliorer le site, n'hésitez pas à utiliser le bouton "✎" présent sur chaque
          carte.
        </p>
      </section>

      <section className="mb-10 bg-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <h2 className="text-3xl font-black mb-6 text-black uppercase tracking-tight border-b-4 border-black pb-2">
          Sources d'information
        </h2>
        <p className="mb-6 text-lg">Les informations présentées sur ce site proviennent de diverses sources :</p>
        <ul className="mb-6 space-y-4">
          {[
            {
              name: "TIOBE Index",
              url: "https://www.tiobe.com/tiobe-index/",
              description: "Pour les statistiques d'utilisation des langages",
            },
            {
              name: "GitHub Trending",
              url: "https://github.com/trending",
              description: "Pour les tendances actuelles",
            },
            {
              name: "Stack Overflow Tags",
              url: "https://stackoverflow.com/tags",
              description: "Pour la popularité des langages parmi les développeurs",
            },
            {
              name: "Wikipedia",
              url: "https://en.wikipedia.org/wiki/List_of_programming_languages",
              description: "Pour l'histoire et les caractéristiques des langages",
            },
            {
              name: "JetBrains Developer Ecosystem",
              url: "https://www.jetbrains.com/lp/devecosystem/",
              description: "Pour les tendances d'adoption",
            },
          ].map((source, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 mt-1.5 bg-black mr-3"></div>
              <div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-lg hover:underline hover:text-blue-700 transition-colors"
                >
                  {source.name}
                </a>
                <span className="mx-2">—</span>
                <span>{source.description}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-lg font-medium p-4 bg-gray-100 border-l-4 border-black">
          Les logos des langages de programmation sont la propriété de leurs détenteurs respectifs et sont utilisés à
          des fins éducatives.
        </p>
      </section>

      <section className="mb-12 bg-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <h2 className="text-3xl font-black mb-6 text-black uppercase tracking-tight border-b-4 border-black pb-2">
          Technologies utilisées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Next.js",
              description: "Framework React pour le développement web",
            },
            {
              name: "TypeScript",
              description: "Pour un code plus robuste et typé",
            },
            {
              name: "Tailwind CSS",
              description: "Pour le style et la mise en page",
            },
            {
              name: "Vercel",
              description: "Pour l'hébergement et le déploiement",
            },
          ].map((tech, index) => (
            <div key={index} className="p-4 border-2 border-black bg-white">
              <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-white border-4 border-black text-black font-black text-xl hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
        >
          ← RETOUR À L'ACCUEIL
        </Link>
      </div>
    </div>
  )
}

