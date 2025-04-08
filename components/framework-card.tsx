import type React from "react"
import { ExternalLink, Github, BookOpen } from 'lucide-react'

interface FrameworkCardProps {
  name: string
  language: string
  frameworksData: { [key: string]: any }
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ name, language, frameworksData }) => {
  // Récupérer les données du framework ou utiliser des données par défaut simplifiées
  const frameworkData = frameworksData[name] || {
    name,
    description: `Framework populaire pour ${language}`,
    usedFor: `Développement d'applications ${language}`,
    features: ["Caractéristique 1", "Caractéristique 2", "Caractéristique 3"],
    officialWebsite: `https://www.google.com/search?q=${name}+framework`,
    uniqueSellingPoint: `Framework spécialisé pour ${language}`,
    bestFor: `Projets ${language}`,
    version: "N/A",
    documentation: null,
    githubUrl: null,
    subtype: null,
    popularity: null,
  }

  return (
    <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all h-full bg-white">
      {/* En-tête avec nom et description */}
      <div className="border-b-2 border-black p-3">
        <h3 className="text-lg font-bold">{frameworkData.name}</h3>
        <p className="text-sm text-gray-600">{frameworkData.description}</p>
      </div>
      
      <div className="p-3 space-y-3">
        {/* Sous-type (si disponible) */}
        {frameworkData.subtype && (
          <div className="mb-2">
            <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black">
              {frameworkData.subtype}
            </span>
          </div>
        )}
        
        {/* Section IDÉAL POUR */}
        {frameworkData.bestFor && (
          <div>
            <div className="inline-block bg-black text-white text-xs font-bold px-2 py-1 mb-2">
              IDÉAL POUR
            </div>
            <p className="text-sm">{frameworkData.bestFor}</p>
          </div>
        )}

        {/* Section FONCTIONNALITÉS */}
        {frameworkData.features && frameworkData.features.length > 0 && (
          <div>
            <div className="inline-block bg-black text-white text-xs font-bold px-2 py-1 mb-2">
              FONCTIONNALITÉS
            </div>
            <ul className="text-sm list-disc pl-5">
              {frameworkData.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Version */}
        {frameworkData.version && frameworkData.version !== "N/A" && (
          <div className="text-xs mt-2">
            <span className="font-bold">Version:</span> {frameworkData.version}
          </div>
        )}

        {/* Liens */}
        <div className="flex flex-wrap gap-2 pt-2">
          {frameworkData.officialWebsite && (
            <a
              href={frameworkData.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-blue-600 text-white px-2 py-1 rounded-sm hover:bg-blue-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <ExternalLink className="h-3 w-3 mr-1" /> Site officiel
            </a>
          )}
          {frameworkData.githubUrl && (
            <a
              href={frameworkData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-gray-800 text-white px-2 py-1 rounded-sm hover:bg-gray-900 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <Github className="h-3 w-3 mr-1" /> GitHub
            </a>
          )}
          {frameworkData.documentation && (
            <a
              href={frameworkData.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-green-600 text-white px-2 py-1 rounded-sm hover:bg-green-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <BookOpen className="h-3 w-3 mr-1" /> Documentation
            </a>
          )}
        </div>

        {/* Popularité (si disponible) */}
        {frameworkData.popularity && (
          <div className="mt-3">
            <p className="text-xs mb-1">Popularité: {frameworkData.popularity}%</p>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${frameworkData.popularity}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FrameworkCard