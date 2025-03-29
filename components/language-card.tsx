"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Language } from "@/types/language"
import CorrectionForm from "./correction-form"

interface LanguageCardProps {
  language: Language
  onClick: () => void
  onCorrectionSubmitted: () => void
}

export default function LanguageCard({ language, onClick, onCorrectionSubmitted }: LanguageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLongText, setIsLongText] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showCorrectionForm, setShowCorrectionForm] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  const router = useRouter() // Initialize useRouter here

  // Fonction pour normaliser l'ID du langage pour le chemin de l'image
  const getNormalizedImagePath = (id: string) => {
    // Remplacer les caractères spéciaux qui pourraient causer des problèmes dans les URLs
    const normalizedId = id
      .toLowerCase()
      .replace(/#/g, "sharp")
      .replace(/\+/g, "plus")
      .replace(/\./g, "dot")
      .replace(/\s/g, "")
      .replace(/\//g, "")
      .replace(/\\/g, "")

    return `/images/${normalizedId}.svg`
  }

  const imagePath = getNormalizedImagePath(language.id)

  // Détecter si le texte est long et nécessite un ajustement
  useEffect(() => {
    if (textRef.current) {
      const textLength = language.shortDescription.length
      setIsLongText(textLength > 80) // Seuil approximatif pour 3 lignes
    }
  }, [language.shortDescription])

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "bg-green-500"
    if (usage >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Gérer le clic sur le bouton de correction
  const handleCorrectionClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Empêcher le clic de se propager à la carte
    setShowCorrectionForm(true)
  }

  const handleCorrectionSuccess = () => {
    setShowCorrectionForm(false)
    onCorrectionSubmitted()
  }

  // Gérer les erreurs d'image
  const handleImageError = () => {
    console.error(`Erreur de chargement de l'image: ${imagePath} pour ${language.name}`)
    setImageError(true)
  }

  // Gérer la navigation au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
  }

  // Générer un logo coloré basé sur le nom du langage (solution de secours)
  const generateColoredLogo = (name: string) => {
    // Couleurs avec un bon contraste pour le texte blanc (ratio > 4.5:1)
    const accessibleColors = [
      "#2563EB", // Bleu foncé
      "#7C3AED", // Violet
      "#047857", // Vert foncé
      "#B91C1C", // Rouge foncé
      "#4338CA", // Indigo
      "#0F766E", // Cyan foncé
      "#6D28D9", // Violet moyen
      "#9D174D", // Rose foncé
      "#1E40AF", // Bleu royal
      "#064E3B", // Vert forêt
    ]

    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const color = accessibleColors[hash % accessibleColors.length]

    return (
      <div
        className="w-full h-full flex items-center justify-center border-4 border-black"
        style={{ backgroundColor: color }}
        aria-label={`Logo généré pour ${name}`}
        role="img"
      >
        <div className="text-center">
          <span className="text-3xl font-black text-white block">{name.substring(0, 3).toUpperCase()}</span>
          <span className="text-xs font-bold text-white mt-1 block">{language.type}</span>
        </div>
      </div>
    )
  }

  // Déterminer la classe de couleur pour le type de langage
  const getTypeColorClass = (type: string) => {
    switch (type) {
      case "Frontend":
        return "bg-blue-700" // Assure un contraste suffisant avec le texte blanc
      case "Backend":
        return "bg-purple-700"
      case "Fullstack":
        return "bg-indigo-700"
      case "Mobile":
        return "bg-red-700"
      case "Data":
        return "bg-green-700"
      default:
        return "bg-gray-700"
    }
  }

  // Badge de licence en style néo-brutaliste
  const renderLicenseBadge = () => {
    if (language.isOpenSource) {
      return (
        <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold" aria-label="Langage open-source">
          Open Source
        </div>
      )
    } else {
      return (
        <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold" aria-label="Langage propriétaire">
          Propriétaire
        </div>
      )
    }
  }

  return (
    <>
      <article
        className={`
          min-h-[420px] h-[420px] border-4 border-black bg-white 
          ${isHovered ? "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" : "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"}
          transition-all duration-300 cursor-pointer relative
          overflow-y-auto
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Carte du langage ${language.name}. Cliquez pour voir les détails.`}
        aria-describedby={`language-desc-${language.id}`}
      >
        <div className="p-6 pb-8 flex flex-col h-full justify-between">
          <header className="mb-4">
            <div className="flex justify-between items-start">
              <button
                onClick={(e) => {
                  e.stopPropagation() // Empêcher le clic de se propager à la carte
                  const pathname = router.pathname
                  router.push(`${pathname}?type=${language.type}`)
                }}
                className={`inline-block px-3 py-1 text-white font-bold mb-2 ${getTypeColorClass(language.type)} cursor-pointer hover:opacity-90 transition-opacity`}
                aria-label={`Filtrer par type: ${language.type}`}
              >
                {language.type}
              </button>

              {renderLicenseBadge()}
            </div>
            <h2 id={`language-name-${language.id}`} className="text-3xl font-black text-black">
              {language.name}
            </h2>
          </header>

          <figure
            className="flex justify-center items-center mt-2 mb-6 flex-1 h-32"
            aria-hidden="true"
            style={{ minHeight: "128px" }} // Hauteur fixe pour éviter les décalages
          >
            <div className="w-32 h-32 flex items-center justify-center">
              {imageError ? (
                generateColoredLogo(language.name)
              ) : (
                <Image
                  src={imagePath || "/placeholder.svg"}
                  alt={`Logo du langage ${language.name}`}
                  width={128}
                  height={128}
                  className={`object-contain ${language.id === "java" ? "scale-75" : ""}`}
                  priority={language.usageRate > 70} // Priorité uniquement aux langages très populaires
                  onError={handleImageError}
                  unoptimized={true}
                />
              )}
            </div>
          </figure>

          <p
            ref={textRef}
            className={`
              text-lg font-medium mb-3 text-center min-h-[3.5rem] flex items-center justify-center
              ${isLongText ? "leading-tight text-base" : "leading-normal"}
            `}
            id={`language-desc-${language.id}`}
          >
            {language.shortDescription}
          </p>

          <footer className="mt-auto">
            <div className="mb-2 font-bold" id={`usage-label-${language.id}`}>
              Taux d'utilisation:
            </div>
            <div
              className="w-full bg-gray-200 h-6 border-2 border-black"
              role="progressbar"
              aria-valuenow={language.usageRate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-labelledby={`usage-label-${language.id}`}
              style={{ height: "24px" }} // Hauteur fixe
            >
              <div
                className={`h-full ${getUsageColor(language.usageRate)}`}
                style={{ width: `${language.usageRate}%` }}
              >
                <span className="px-2 font-bold">{language.usageRate}%</span>
              </div>
            </div>
          </footer>
        </div>

        {/* Bouton de suggestion de correction */}
        <button
          onClick={handleCorrectionClick}
          className="absolute top-2 right-2 bg-white border-2 border-black text-xs font-bold px-2 py-1 hover:bg-yellow-300 hover:-rotate-2 transition-all z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          aria-label={`Suggérer une correction pour ${language.name}`}
        >
          <span className="font-black text-base">✎</span>
        </button>
      </article>

      {/* Formulaire de correction */}
      {showCorrectionForm && (
        <CorrectionForm
          language={language}
          onClose={() => setShowCorrectionForm(false)}
          onSuccess={handleCorrectionSuccess}
        />
      )}
    </>
  )
}

