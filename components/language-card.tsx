"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Language } from "@/types"
import { getImageName, getTypeBadgeColor } from "@/lib/utils"

interface LanguageCardProps {
  language: Language
}

export function LanguageCard({ language }: LanguageCardProps) {
  const [imageError, setImageError] = useState(false)

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

  // Gérer l'erreur de chargement d'image
  const handleImageError = () => {
    setImageError(true)
  }

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

        {/* Logo - Correction pour la taille du logo */}
        <div className="flex justify-center items-center mb-4 flex-grow">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 border-2 border-black">
                <span className="text-2xl font-bold">{language.name.charAt(0).toUpperCase()}</span>
              </div>
            ) : (
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={`Logo ${language.name}`}
                width={96}
                height={96}
                className="object-contain max-w-full max-h-full"
                style={{ width: "auto", height: "auto", maxWidth: "96px", maxHeight: "96px" }} // Correction pour le ratio d'aspect
                onError={handleImageError}
              />
            )}
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
