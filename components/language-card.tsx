"use client"

import Link from "next/link"
import type { Language } from "@/types/models/language"
import { getTypeBadgeColor } from "@/utils/theme"
import { getImageName } from "@/utils/image"
import LanguageImage from "./language-image"
import { generateLanguageSlug } from "@/utils/slug"
import { cn } from "@/utils/theme"

interface LanguageCardProps {
  language: Language
}

export function LanguageCard({ language }: LanguageCardProps) {
  // Générer un slug à partir du nom si nécessaire
  const getSlug = () => {
    if (language.slug && language.slug.trim() !== "") return language.slug

    return generateLanguageSlug(language.name)
  }

  // Préparer l'URL de l'image
  const imageSrc = language.logoPath || `/images/${getImageName(language.name)}.svg`

  // Valeur par défaut pour le type
  const languageType = language.type || "Autre"

  // Valeur par défaut pour le taux d'utilisation - s'assurer que c'est toujours un nombre
  const usageRate = typeof language.usageRate === "number" ? language.usageRate : 0

  return (
    <Link
      href={language.slug ? `/language/${language.slug}` : `/language/id/${language.id}`}
      className={cn(
        "block h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1",
        "dark:bg-[#2a2a20] dark:border-[#3a3a30] dark:shadow-[8px_8px_0px_0px_rgba(58,58,48,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(58,58,48,1)]",
      )}
      aria-label={`Voir les détails de ${language.name}`}
    >
      <div className="p-4 pb-6 flex flex-col h-full">
        {/* Badges en haut */}
        <div className="flex justify-between items-start mb-4">
          <div className={`${getTypeBadgeColor(languageType)} text-white font-bold px-2 py-1`}>{languageType}</div>

          {language.isOpenSource !== undefined && (
            <div
              className={`${language.isOpenSource ? "bg-green-500 text-white" : "bg-red-600 text-white"} font-bold px-2 py-1`}
            >
              {language.isOpenSource ? "Open Source" : "Propriétaire"}
            </div>
          )}
        </div>

        {/* Nom du langage */}
        <h2 className="text-2xl font-bold mb-4">{language.name}</h2>

        {/* Affichage du slug pour débogage */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Slug: {getSlug()}</p>

        {/* Logo - Utilisation du composant LanguageImage */}
        <div className="flex justify-center items-center mb-4 flex-grow">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <LanguageImage
              src={imageSrc}
              alt={`Logo ${language.name}`}
              width={96}
              height={96}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-center mb-4 line-clamp-3">{language.shortDescription || "Aucune description disponible"}</p>

        {/* Taux d'utilisation */}
        <div className="mt-auto">
          <p className="font-bold mb-1">Taux d'utilisation:</p>
          <div
            className="w-full h-6 bg-gray-200 dark:bg-gray-700 border border-black dark:border-[#3a3a30]"
            role="progressbar"
            aria-valuenow={usageRate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-yellow-400 dark:bg-yellow-600 flex items-center"
              style={{ width: `${usageRate}%` }}
            >
              <span className="pl-2 font-bold">{usageRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
