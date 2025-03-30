"use client"

import Link from "next/link"
import type { Language } from "@/types/language"
import LanguageImage from "./language-image"

interface LanguageCardProps {
  language: Language
}

export function LanguageCard({ language }: LanguageCardProps) {
  // Fonction pour obtenir le nom correct de l'image en fonction du nom du langage
  const getImageName = (name: string) => {
    // Conversion en minuscules et gestion des caractères spéciaux
    if (name === "C++") return "cpp"
    if (name === "C#") return "csharp"
    // Pour les autres langages, conversion en minuscules et suppression des caractères spéciaux
    return name.toLowerCase().replace(/[^a-z0-9]/g, "")
  }

  // Déterminer la couleur du badge de type
  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "backend":
        return "bg-purple-600"
      case "frontend":
        return "bg-blue-500"
      case "fullstack":
        return "bg-indigo-600"
      case "mobile":
        return "bg-red-500"
      case "système":
      case "systeme":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  // Générer un slug à partir du nom si nécessaire
  const getSlug = () => {
    if (language.slug) return language.slug
    return language.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
  }

  // Préparer l'URL de l'image
  const imageSrc = language.logo || `/images/${getImageName(language.name)}.svg`

  // Valeur par défaut pour le type
  const languageType = language.type || "Autre"

  // Valeur par défaut pour le taux d'utilisation
  const usageRate = language.usageRate !== undefined ? language.usageRate : 0

  return (
    <Link
      href={`/languages/${getSlug()}`}
      className="block h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      <div className="p-4 pb-6 flex flex-col h-full">
        {/* Badges en haut */}
        <div className="flex justify-between items-start mb-4">
          <div className={`${getTypeBadgeColor(languageType)} text-white font-bold px-2 py-1`}>{languageType}</div>

          {language.isOpenSource && <div className="bg-green-500 text-white font-bold px-2 py-1">Open Source</div>}
        </div>

        {/* Nom du langage */}
        <h2 className="text-2xl font-bold mb-4">{language.name}</h2>

        {/* Logo */}
        <div className="flex justify-center items-center mb-4 flex-grow">
          <div className="relative h-24 w-24">
            <LanguageImage
              src={imageSrc}
              alt={`Logo ${language.name}`}
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-center mb-4">{language.shortDescription || "Aucune description disponible"}</p>

        {/* Taux d'utilisation */}
        <div className="mt-auto">
          <p className="font-bold mb-1">Taux d'utilisation:</p>
          <div className="w-full h-6 bg-gray-200 border border-black">
            <div className="h-full bg-yellow-400 flex items-center" style={{ width: `${usageRate}%` }}>
              <span className="pl-2 font-bold">{usageRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

