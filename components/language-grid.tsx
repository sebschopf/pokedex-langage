"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import LanguageCard from "./language-card"
import LanguageDetail from "./language-detail"
import type { Language } from "@/types/language"
import LanguageCardSkeleton from "./language-card-skeleton"

interface LanguageGridProps {
  languages: Language[]
}

export default function LanguageGrid({ languages }: LanguageGridProps) {
  const searchParams = useSearchParams()
  const [filteredLanguages, setFilteredLanguages] = useState<Language[]>(languages)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const detailsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Ajoutons un état de chargement
  const [isLoading, setIsLoading] = useState(true)

  // Utiliser une chaîne de requête complète comme dépendance pour éviter les boucles infinies
  const queryString = searchParams.toString()

  useEffect(() => {
    setIsLoading(true)

    // Simuler un délai pour montrer le skeleton (à enlever en production)
    const timer = setTimeout(() => {
      let result = [...languages]

      const query = searchParams.get("query")?.toLowerCase() || ""
      const type = searchParams.get("type") || ""
      const usageMin = searchParams.get("usageMin") ? Number.parseInt(searchParams.get("usageMin") as string) : 0
      const sort = searchParams.get("sort") || "name"
      const openSource = searchParams.get("openSource") === "true"

      // Filtrage
      if (query) {
        result = result.filter(
          (lang) => lang.name.toLowerCase().includes(query) || lang.shortDescription.toLowerCase().includes(query),
        )
      }

      if (type && type !== "all") {
        result = result.filter((lang) => lang.type === type)
      }

      if (usageMin > 0) {
        result = result.filter((lang) => lang.usageRate >= usageMin)
      }

      // Filtrer par open source si demandé
      if (openSource) {
        result = result.filter((lang) => lang.isOpenSource === true)
      }

      // Tri
      if (sort === "usage") {
        result = result.sort((a, b) => b.usageRate - a.usageRate)
      } else if (sort === "year") {
        result = result.sort((a, b) => b.createdYear - a.createdYear)
      } else {
        // Par défaut, tri par nom
        result = result.sort((a, b) => a.name.localeCompare(b.name))
      }

      setFilteredLanguages(result)
      setIsLoading(false)

      // Réinitialiser la langue sélectionnée si elle n'est plus dans les résultats filtrés
      if (selectedLanguage && !result.some((lang) => lang.id === selectedLanguage.id)) {
        setSelectedLanguage(null)
      }
    }, 300) // Délai court pour éviter les flashs de skeleton

    return () => clearTimeout(timer)
  }, [languages, queryString, selectedLanguage, refreshKey])

  const handleCardClick = (language: Language) => {
    setSelectedLanguage(language)

    // Attendre que le composant de détail soit rendu avant de faire défiler
    setTimeout(() => {
      if (detailsRef.current) {
        // Faire défiler jusqu'au composant de détail avec un petit décalage vers le haut
        const yOffset = -20 // Décalage de 20px vers le haut pour une meilleure visibilité
        const y = detailsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })

        // Annoncer aux lecteurs d'écran que les détails sont affichés
        const announcer = document.createElement("div")
        announcer.setAttribute("aria-live", "polite")
        announcer.setAttribute("class", "sr-only")
        announcer.textContent = `Détails du langage ${language.name} affichés`
        document.body.appendChild(announcer)

        // Supprimer l'annonce après qu'elle ait été lue
        setTimeout(() => {
          document.body.removeChild(announcer)
        }, 1000)
      }
    }, 100)
  }

  const handleCloseDetail = () => {
    setSelectedLanguage(null)

    // Remettre le focus sur la grille après fermeture des détails
    setTimeout(() => {
      if (gridRef.current) {
        const firstCard = gridRef.current.querySelector('[role="button"]') as HTMLElement
        if (firstCard) {
          firstCard.focus()
        }
      }
    }, 100)
  }

  const handleCorrectionSubmitted = () => {
    // Forcer un rafraîchissement des données
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <>
      <div ref={detailsRef} aria-live="polite" id="language-detail-section">
        {selectedLanguage ? (
          <LanguageDetail
            language={selectedLanguage}
            onClose={handleCloseDetail}
            onCorrectionSubmitted={handleCorrectionSubmitted}
          />
        ) : null}
      </div>

      {!selectedLanguage && (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          id="language-results"
          role="region"
          aria-label="Résultats de recherche"
          aria-live="polite"
        >
          {isLoading ? (
            // Afficher des skeletons pendant le chargement
            Array(8)
              .fill(0)
              .map((_, index) => <LanguageCardSkeleton key={index} />)
          ) : filteredLanguages.length > 0 ? (
            filteredLanguages.map((language) => (
              <LanguageCard
                key={`${language.id}-${refreshKey}`}
                language={language}
                onClick={() => handleCardClick(language)}
                onCorrectionSubmitted={handleCorrectionSubmitted}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold mb-2">Aucun résultat trouvé</h2>
              <p>Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

