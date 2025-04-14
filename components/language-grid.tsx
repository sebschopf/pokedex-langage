"use client"

import type React from "react"
import { LanguageCard } from "./language-card"
import { LanguageCardSkeleton } from "./language-card-skeleton"
import type { Language } from "@/types/models"
import { useLanguages } from "@/hooks/use-languages"
import  CategoryTitle from "./category-title"
import { useSearchParams } from "next/navigation"

interface LanguageGridProps {
  languages?: Language[] // Rendu optionnel avec ?
  isLoading?: boolean
}

export const LanguageGrid: React.FC<LanguageGridProps> = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const type = searchParams.get("type") || "all"
  const usageMin = Number.parseInt(searchParams.get("usageMin") || "0")
  const sort = searchParams.get("sort") || "name"
  const openSource = searchParams.get("openSource") === "true"

  const { languages, isLoading, error } = useLanguages()

  if (isLoading) {
    return (
      <div>
        <CategoryTitle title="Chargement des langages..." count={0} />
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <LanguageCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xl">Une erreur est survenue lors du chargement des langages.</p>
        <p>Détails: {error.message}</p>
      </div>
    )
  }

  // Filtrer les langages en fonction des paramètres de recherche
  let filteredLanguages = [...languages]

  // Filtre par recherche
  if (query) {
    const searchTerms = query.toLowerCase().split(" ")
    filteredLanguages = filteredLanguages.filter((lang) => {
      const searchableText = `${lang.name} ${lang.description} ${lang.creator || ""} ${lang.type || ""}`.toLowerCase()
      return searchTerms.every((term) => searchableText.includes(term))
    })
  }

  // Filtre par type
  if (type !== "all") {
    filteredLanguages = filteredLanguages.filter((lang) => lang.type === type)
  }

  // Filtre par taux d'utilisation
  if (usageMin > 0) {
    filteredLanguages = filteredLanguages.filter((lang) => (lang.usageRate || 0) >= usageMin)
  }

  // Filtre par licence open source
  if (openSource) {
    filteredLanguages = filteredLanguages.filter((lang) => lang.isOpenSource)
  }

  // Tri
  filteredLanguages.sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name)
    } else if (sort === "usage") {
      return (b.usageRate || 0) - (a.usageRate || 0)
    } else if (sort === "year") {
      return (a.yearCreated || 0) - (b.yearCreated || 0)
    }
    return 0
  })

  const resultsText = filteredLanguages.length === 1 ? "résultat trouvé" : "résultats trouvés"

  return (
    <div>
      <CategoryTitle
        title={query ? `Recherche: "${query}"` : "Tous les langages"}
        count={filteredLanguages.length}
        subtitle={query ? `${filteredLanguages.length} ${resultsText}` : undefined}
      />

      {filteredLanguages.length === 0 ? (
        <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xl">Aucun langage ne correspond à vos critères.</p>
          <p>Essayez de modifier vos filtres ou votre recherche.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLanguages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      )}
    </div>
  )
}
