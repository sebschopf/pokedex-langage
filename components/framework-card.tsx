import type React from "react"
import { ExternalLink } from "lucide-react"

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
    documentation: null, // Ajout de la propriété documentation
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2">{frameworkData.name}</h3>
      <p className="text-gray-700 mb-4">{frameworkData.description}</p>
      <ul className="list-disc list-inside mb-4">
        {frameworkData.features.map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <a
          href={frameworkData.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-bold bg-blue-600 text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all visited:bg-blue-800"
        >
          <ExternalLink size={14} className="mr-2" /> Site officiel
        </a>
        {frameworkData.documentation && (
          <a
            href={frameworkData.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-bold bg-green-600 text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all visited:bg-green-800"
          >
            <ExternalLink size={14} className="mr-2" /> Documentation
          </a>
        )}
      </div>
    </div>
  )
}

export default FrameworkCard

