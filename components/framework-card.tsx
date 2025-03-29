"use client"

import type React from "react"

import { ExternalLink } from "lucide-react"
import { frameworksData } from "@/data/frameworks"

// Ajouter un bouton de correction pour les frameworks
interface FrameworkCardProps {
  name: string
  language: string
  index: number
  onClick?: () => void
  onCorrection?: (frameworkName: string, e: React.MouseEvent) => void
}

export default function FrameworkCard({ name, language, index, onClick, onCorrection }: FrameworkCardProps) {
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
  }

  const getRecommendedBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-red-600 text-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
          CHOIX RECOMMANDÉ
        </div>
      )
    }
    return null
  }

  const getBeginnerBadge = (name: string) => {
    // Liste des frameworks considérés comme adaptés aux débutants
    const beginnerFriendlyFrameworks = [
      // Frontend
      "React",
      "Vue.js",
      "Angular",
      "Svelte",
      "Alpine.js",
      // CSS
      "Bootstrap",
      "Tailwind CSS",
      "Bulma",
      "Water.css",
      "PicoCSS",
      // Backend
      "Express",
      "Flask",
      "Django",
      "Spring Boot",
      "Laravel",
      "Sinatra",
      // Mobile
      "Flutter",
      "React Native",
      // Jeux
      "LÖVE",
      "Unity",
      // Autres
      "Next.js",
      "Astro",
      "jQuery",
    ]

    if (beginnerFriendlyFrameworks.includes(name)) {
      return (
        <div className="px-2 py-1 bg-green-600 text-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          DÉBUTANT
        </div>
      )
    }
    return null
  }

  return (
    <div className="relative h-full">
      {getRecommendedBadge(index)}
      <article
        className="h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-default"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick?.()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Carte du framework ${name} pour ${language}. Appuyez sur Entrée pour voir les détails.`}
      >
        {/* Ajouter un bouton de correction en haut à droite */}
        {onCorrection && (
          <button
            onClick={(e) => onCorrection(name, e)}
            className="absolute top-2 right-2 bg-white border-2 border-black text-xs font-bold px-2 py-1 hover:bg-yellow-300 hover:-rotate-2 transition-all z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label={`Suggérer une correction pour ${name}`}
          >
            <span className="font-black">✎</span>
          </button>
        )}

        <div className="p-6 flex flex-col h-full">
          {/* En-tête de la carte avec badge pour les frameworks CSS */}
          <header className="mb-4">
            <div className="flex justify-between items-start">
              <h5 className="text-xl font-black">{name}</h5>
              <div className="flex gap-2">
                {language === "CSS" || language === "HTML/CSS" ? (
                  <div className="px-2 py-1 bg-blue-500 text-white text-xs font-bold">FRAMEWORK WEB</div>
                ) : null}
                {getBeginnerBadge(name)}
              </div>
            </div>
            <p className="text-sm mt-3 font-medium">{frameworkData.description}</p>
          </header>

          {/* Contenu détaillé */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-sm mb-2 bg-black text-white inline-block px-2 py-1">UTILISÉ POUR</h4>
                <p className="text-sm mt-2">{frameworkData.usedFor}</p>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2 bg-black text-white inline-block px-2 py-1">POINT FORT UNIQUE</h4>
                <p className="text-sm mt-2 font-bold text-blue-800">{frameworkData.uniqueSellingPoint}</p>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2 bg-black text-white inline-block px-2 py-1">IDÉAL POUR</h4>
                <p className="text-sm mt-2">{frameworkData.bestFor}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="pt-4 border-t-2 border-black">
                <div className="flex flex-col gap-3">
                  {frameworkData.officialWebsite && (
                    <a
                      href={frameworkData.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-bold bg-blue-600 text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all visited:bg-purple-700"
                    >
                      <ExternalLink size={14} className="mr-2" /> Site officiel
                    </a>
                  )}

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

                  {/* Toujours afficher la section RESSOURCES */}
                  <div className="mt-2">
                    <h4 className="font-bold text-sm mb-2 bg-black text-white inline-block px-2 py-1">RESSOURCES</h4>
                    <ul className="space-y-2 mt-2">
                      {frameworkData.resources && frameworkData.resources.length > 0 ? (
                        frameworkData.resources.map((resource, index) => (
                          <li key={index}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm font-medium bg-yellow-300 text-black px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all visited:bg-yellow-500"
                            >
                              <ExternalLink size={12} className="mr-2" /> {resource.name}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-gray-500">Aucune ressource disponible pour le moment</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

