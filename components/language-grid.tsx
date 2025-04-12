import type React from "react"
import { LanguageCard } from "./language-card"
import { LanguageCardSkeleton } from "./language-card-skeleton"
import type { Language } from "@/types/models"

interface LanguageGridProps {
  languages?: Language[] // Rendu optionnel avec ?
  isLoading?: boolean
}

export const LanguageGrid: React.FC<LanguageGridProps> = ({
  languages = [], // Valeur par défaut pour éviter les erreurs
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LanguageCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {languages.map((language) => (
        <LanguageCard key={language.id} language={language} />
      ))}
    </div>
  )
}
