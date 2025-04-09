"use client"

import type React from "react"
import { ExternalLink, Github, BookOpen } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import ToggleExpandButton from "./ui/toggle-expand-button"

interface FrameworkCardProps {
  name: string
  language: string
  frameworksData: { [key: string]: any }
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ name, language, frameworksData }) => {
  // État pour suivre si la description est étendue ou non
  const [isExpanded, setIsExpanded] = useState(false)
  // Référence pour détecter si le contenu est tronqué
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  // État pour suivre si le contenu est tronqué
  const [isTruncated, setIsTruncated] = useState(false)

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
  }

  // Vérifier si le contenu est tronqué au chargement et au redimensionnement
  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current) {
        const lineHeight = Number.parseInt(window.getComputedStyle(descriptionRef.current).lineHeight) || 24
        const twoLinesHeight = lineHeight * 2
        const fullHeight = descriptionRef.current.scrollHeight

        // Définir comme tronqué si plus de 2 lignes
        setIsTruncated(fullHeight > twoLinesHeight + 5) // +5px pour la marge d'erreur
      }
    }

    // Exécuter après le rendu initial et à chaque redimensionnement
    setTimeout(checkTruncation, 0)
    window.addEventListener("resize", checkTruncation)

    return () => {
      window.removeEventListener("resize", checkTruncation)
    }
  }, [frameworkData.description])

  // Fonction pour basculer l'état d'expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all h-full bg-white">
      {/* En-tête avec nom et description */}
      <div className="border-b-2 border-black p-4">
        <h3 className="text-xl font-bold mb-2">{frameworkData.name}</h3>
        <div className="relative h-[3.6rem]">
          {/* Hauteur augmentée pour garantir la visibilité des 2 lignes */}
          <div
            className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded
                ? "h-auto absolute top-0 left-0 right-0 bg-white z-10 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2"
                : "h-full"
            }`}
          >
            <p
              ref={descriptionRef}
              className={`text-lg text-gray-600 leading-relaxed pr-8 ${!isExpanded ? "line-clamp-2" : ""}`}
            >
              {frameworkData.description}
            </p>

            {/* Bouton d'expansion uniquement si le contenu est tronqué */}
            {isTruncated && (
              <ToggleExpandButton
                isExpanded={isExpanded}
                onClick={toggleExpand}
                className={isExpanded ? "top-2 right-2" : ""}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Sous-type (si disponible) */}
        {frameworkData.subtype && (
          <div className="mb-3">
            <span className="inline-block bg-yellow-400 text-black text-sm font-bold px-3 py-1.5 border-2 border-black rounded-none">
              {frameworkData.subtype}
            </span>
          </div>
        )}

        {/* Section IDÉAL POUR */}
        {frameworkData.bestFor && (
          <div className="mb-4">
            <div className="inline-block bg-black text-white text-sm font-bold px-3 py-1.5 mb-3 rounded-none">
              IDÉAL POUR
            </div>
            <p className="text-sm leading-relaxed">{frameworkData.bestFor}</p>
          </div>
        )}

        {/* Section FONCTIONNALITÉS */}
        {frameworkData.features && frameworkData.features.length > 0 && (
          <div className="mb-4">
            <div className="inline-block bg-black text-white text-sm font-bold px-3 py-1.5 mb-3 rounded-none">
              FONCTIONNALITÉS
            </div>
            <ul className="text-sm list-disc pl-5 space-y-2">
              {frameworkData.features.map((feature: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Version */}
        {frameworkData.version && frameworkData.version !== "N/A" && (
          <div className="text-sm mt-4 mb-2">
            <span className="font-bold">Version:</span> {frameworkData.version}
          </div>
        )}

        {/* Liens */}
        <div className="flex flex-wrap gap-3 pt-4">
          {frameworkData.officialWebsite && (
            <a
              href={frameworkData.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-blue-600 text-white px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all rounded-none hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Site officiel
            </a>
          )}
          {frameworkData.githubUrl && (
            <a
              href={frameworkData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-gray-800 text-white px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all rounded-none hover:bg-gray-900"
            >
              <Github className="h-4 w-4 mr-2" /> GitHub
            </a>
          )}
          {frameworkData.documentation && (
            <a
              href={frameworkData.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-green-600 text-white px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all rounded-none hover:bg-green-700"
            >
              <BookOpen className="h-4 w-4 mr-2" /> Documentation
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default FrameworkCard
