"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useRef, useEffect, useState } from "react"
import type { Language } from "@/types/language"
import FrameworkCard from "./framework-card"
import { X } from "lucide-react"
import CorrectionForm from "./correction-form"

interface LanguageDetailProps {
  language: Language
  onClose: () => void
  onCorrectionSubmitted: () => void
}

export default function LanguageDetail({ language, onClose, onCorrectionSubmitted }: LanguageDetailProps) {
  const router = useRouter()
  const detailRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [showCorrectionForm, setShowCorrectionForm] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)

  useEffect(() => {
    // Focus sur le conteneur de détails au chargement pour l'accessibilité
    if (detailRef.current) {
      detailRef.current.focus()
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  // Mettre à jour la fonction handleCorrectionClick pour passer null comme framework
  const handleCorrectionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowCorrectionForm(true)
  }

  // Ajouter une fonction pour corriger un framework spécifique
  const handleFrameworkCorrectionClick = (frameworkName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setSelectedFramework(frameworkName)
    setShowCorrectionForm(true)
  }

  const handleCorrectionSuccess = () => {
    setShowCorrectionForm(false)
    onCorrectionSubmitted()

    // Remettre le focus sur le bouton de correction
    setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus()
      }
    }, 100)
  }

  // Nouvelle fonction pour gérer le clic sur le tag de type
  const handleTypeClick = (type: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose() // Fermer les détails du langage
    router.push(`/?type=${type}`) // Rediriger vers la page d'accueil avec le filtre de type
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
        <div
          className="px-2 py-1 bg-green-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Langage open-source"
        >
          Open Source
        </div>
      )
    } else {
      return (
        <div
          className="px-2 py-1 bg-red-600 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Langage propriétaire"
        >
          Propriétaire
        </div>
      )
    }
  }

  return (
    <>
      <div
        ref={detailRef}
        className="w-full border-4 border-black bg-white mb-8"
        tabIndex={-1}
        role="region"
        aria-label={`Détails du langage ${language.name}`}
      >
        {/* En-tête */}
        <div className="p-4 bg-white border-b-4 border-black sticky top-0 z-50">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`inline-block px-3 py-1 text-white font-bold ${getTypeColorClass(language.type)} cursor-pointer hover:opacity-80 transition-opacity`}
                  aria-label={`Type: ${language.type}. Cliquez pour filtrer par ce type.`}
                  onClick={(e) => handleTypeClick(language.type, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleTypeClick(language.type, e as unknown as React.MouseEvent)
                    }
                  }}
                >
                  {language.type}
                </div>
                {renderLicenseBadge()}
              </div>
              <h3 className="text-3xl font-black text-black">{language.name} - Détails</h3>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="px-3 py-1 bg-black text-white font-bold"
                aria-label={`Année de création: ${language.createdYear}`}
              >
                {language.createdYear}
              </div>
              <button
                onClick={handleCorrectionClick}
                className="bg-white border-4 border-black px-2 py-1 font-bold text-sm hover:bg-yellow-300 hover:-rotate-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                aria-label={`Suggérer une correction pour ${language.name}`}
              >
                <span className="font-black text-base">✎ Corriger</span>
              </button>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                aria-label="Fermer les détails"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 md:p-6">
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Section à deux colonnes pour "Utilisé pour" et "Forces" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-bold text-xl border-b-2 border-black pb-1" id="used-for-heading">
                  Utilisé pour:
                </h4>
                <div className="text-lg mt-2 space-y-2" aria-labelledby="used-for-heading">
                  {language.usedFor.split(",").map((use, index) => (
                    <p key={index} className="flex items-start">
                      <span
                        className="inline-block bg-red-600 text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-3"
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                      <span>{use.trim()}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-bold text-xl border-b-2 border-black pb-1" id="strengths-heading">
                  Forces:
                </h4>
                <ul className="mt-2 space-y-2" aria-labelledby="strengths-heading">
                  {language.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className="inline-block bg-green-600 text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-3"
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span className="text-lg">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {language.tools && (
              <div>
                <h4 className="font-bold text-xl border-b-2 border-black pb-1" id="tools-heading">
                  Outils spécifiques:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4" aria-labelledby="tools-heading">
                  {language.tools.parsers && (
                    <div>
                      <h5 className="font-bold text-lg" id="parsers-heading">
                        Parseurs HTML:
                      </h5>
                      <ul className="list-disc pl-5 mt-2 space-y-1" aria-labelledby="parsers-heading">
                        {language.tools.parsers.map((parser, index) => (
                          <li key={index} className="text-lg">
                            {parser}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {language.tools.validators && (
                    <div>
                      <h5 className="font-bold text-lg" id="validators-heading">
                        Validateurs HTML:
                      </h5>
                      <ul className="list-disc pl-5 mt-2 space-y-1" aria-labelledby="validators-heading">
                        {language.tools.validators.map((validator, index) => (
                          <li key={index} className="text-lg">
                            {validator}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {language.tools.templateEngines && (
                    <div>
                      <h5 className="font-bold text-lg" id="engines-heading">
                        Moteurs de templates:
                      </h5>
                      <ul className="list-disc pl-5 mt-2 space-y-1" aria-labelledby="engines-heading">
                        {language.tools.templateEngines.map((engine, index) => (
                          <li key={index} className="text-lg">
                            {engine}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Frameworks section avec guide de sélection */}
            <div className="mt-8 pb-8">
              <h4 className="text-2xl font-black border-b-4 border-black pb-2 mb-6" id="frameworks-heading">
                Frameworks populaires:
              </h4>

              {/* Guide de sélection des frameworks */}
              <div
                className="mb-6 border-4 border-black p-4 bg-yellow-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                role="region"
                aria-labelledby="guide-heading"
              >
                <h5 className="text-lg font-black mb-3 bg-black text-white p-2 inline-block" id="guide-heading">
                  Guide de sélection des frameworks
                </h5>
                <p className="font-medium mb-3">
                  Chaque framework a des points forts spécifiques qui le rendent idéal pour certains types de projets:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span
                      className="inline-block bg-black text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-2"
                      aria-hidden="true"
                    >
                      !
                    </span>
                    <span>
                      <strong className="bg-yellow-300 px-1 border-b-4 border-black">Point fort unique</strong>: La
                      caractéristique distinctive qui différencie ce framework des autres
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="inline-block bg-black text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-2"
                      aria-hidden="true"
                    >
                      !
                    </span>
                    <span>
                      <strong className="bg-yellow-300 px-1 border-b-4 border-black">Idéal pour</strong>: Les types de
                      projets pour lesquels ce framework est particulièrement adapté
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="inline-block bg-black text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-2"
                      aria-hidden="true"
                    >
                      !
                    </span>
                    <span>
                      Le badge{" "}
                      <strong className="bg-red-600 text-white text-xs px-1 border-2 border-black">
                        CHOIX RECOMMANDÉ
                      </strong>{" "}
                      indique les frameworks les plus populaires et largement utilisés dans l'industrie
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="inline-block bg-black text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-2"
                      aria-hidden="true"
                    >
                      !
                    </span>
                    <span>
                      Le badge{" "}
                      <strong className="bg-green-600 text-white text-xs px-1 border-2 border-black">DÉBUTANT</strong>{" "}
                      indique les frameworks particulièrement adaptés aux débutants avec une courbe d'apprentissage plus
                      douce
                    </span>
                  </li>
                </ul>
              </div>

              {/* Affichage des frameworks avec pagination si nécessaire */}
              {language.popularFrameworks.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  role="list"
                  aria-labelledby="frameworks-heading"
                >
                  {language.popularFrameworks.map((framework, index) => (
                    <FrameworkCard
                      key={index}
                      name={framework}
                      language={language.name}
                      index={index}
                      onCorrection={handleFrameworkCorrectionClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="border-4 border-black p-4 bg-gray-100" role="status" aria-live="polite">
                  <p className="font-bold text-center">
                    Aucun framework populaire n'est actuellement listé pour ce langage.
                  </p>
                  <p className="text-center mt-2">
                    Vous pouvez suggérer des frameworks en utilisant le bouton "Corriger" en haut de la page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de correction */}
      {showCorrectionForm && (
        <CorrectionForm
          language={language}
          framework={selectedFramework || undefined}
          onClose={() => {
            setShowCorrectionForm(false)
            setSelectedFramework(null)
          }}
          onSuccess={() => {
            handleCorrectionSuccess()
            setSelectedFramework(null)
          }}
        />
      )}
    </>
  )
}

