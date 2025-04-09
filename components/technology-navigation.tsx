"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface TechnologyNavigationProps {
  categories: string[]
  languageName: string
}

export default function TechnologyNavigation({ categories, languageName }: TechnologyNavigationProps) {
  const [isSticky, setIsSticky] = useState(false)

  // Fonction pour gérer le défilement et rendre la navigation sticky
  useEffect(() => {
    const handleScroll = () => {
      // Position à partir de laquelle la navigation devient sticky
      const navPosition = document.getElementById("tech-nav-container")?.offsetTop || 0
      const scrollPosition = window.scrollY + 80 // Ajout d'un décalage pour la barre de navigation

      if (scrollPosition >= navPosition) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fonction pour gérer le défilement fluide vers les ancres
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calculer la position avec un décalage pour la navigation collante
      const offset = isSticky ? 120 : 40
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset

      // Défilement fluide
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Mettre à jour l'URL avec l'ancre (optionnel)
      window.history.pushState(null, "", `#${targetId}`)
    }
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div id="tech-nav-container" className="mb-6">
      <div
        className={`${
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 bg-yellow-300 border-b-4 border-black py-3 px-4 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]"
            : "bg-transparent py-0 px-0"
        } transition-all duration-300 ease-in-out transform`}
        style={{
          transform: isSticky ? "translateY(0)" : "translateY(-5px)",
          opacity: isSticky ? 1 : 0.95,
        }}
      >
        <div className={`container ${isSticky ? "mx-auto" : ""}`}>
          {isSticky && (
            <h3 className="font-bold text-lg mb-2 transition-opacity duration-300">Environnement {languageName}</h3>
          )}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const targetId = `category-${category.replace(/\s+/g, "-").toLowerCase()}`
              return (
                <a
                  key={category}
                  href={`#${targetId}`}
                  onClick={(e) => handleSmoothScroll(e, targetId)}
                  className={`inline-flex items-center px-3 py-2 ${
                    isSticky ? "bg-white" : "bg-white"
                  } border-4 border-black text-black font-bold hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none rounded-none`}
                >
                  {category}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
