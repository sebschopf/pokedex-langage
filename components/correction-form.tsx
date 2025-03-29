"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { submitCorrection } from "@/actions/correction-actions"
import type { Language } from "@/types/language"

// Mettre à jour l'interface pour inclure un paramètre optionnel pour le framework
interface CorrectionFormProps {
  language: Language
  framework?: string // Nom du framework si on corrige un framework
  onClose: () => void
  onSuccess: () => void
}

// Mettre à jour le composant pour gérer les corrections de frameworks
export default function CorrectionForm({ language, framework, onClose, onSuccess }: CorrectionFormProps) {
  const [correctionType, setCorrectionType] = useState<string>("language") // "language" ou "framework"
  const [field, setField] = useState<string>("usedFor")
  const [frameworkField, setFrameworkField] = useState<string>("description")
  const [suggestion, setSuggestion] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [frameworkName, setFrameworkName] = useState<string>(framework || "")

  // Initialiser le type de correction en fonction de la présence d'un framework
  useEffect(() => {
    if (framework) {
      setCorrectionType("framework")
      setFrameworkName(framework)
    }
  }, [framework])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!suggestion.trim()) {
      setError("Veuillez entrer une suggestion")
      return
    }

    if (correctionType === "framework" && !frameworkName.trim()) {
      setError("Veuillez entrer un nom de framework")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      if (correctionType === "language") {
        await submitCorrection({
          languageId: language.id,
          field,
          suggestion,
          type: "language",
        })
      } else {
        await submitCorrection({
          languageId: language.id,
          frameworkName: framework || frameworkName,
          field: frameworkField,
          suggestion,
          type: "framework",
        })
      }

      setIsSubmitting(false)
      onSuccess()
    } catch (err) {
      setIsSubmitting(false)
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    }
  }

  // Aide pour le format des ressources
  const getPlaceholder = () => {
    if (correctionType === "framework" && frameworkField === "resources") {
      return "Format: Nom du lien|URL\nExemple:\nDocumentation officielle|https://example.com\nTutoriels|https://tutorials.com"
    }
    return "Entrez votre suggestion ici..."
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b-4 border-black">
          <h2 className="text-2xl font-black">
            {framework ? `Suggérer une correction pour ${framework}` : "Suggérer une correction"}
          </h2>
          <button onClick={onClose} className="bg-black text-white p-1 hover:bg-gray-800" aria-label="Fermer">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {!framework && (
            <div className="mb-4">
              <label htmlFor="correction-type" className="block font-bold mb-2">
                Type de correction:
              </label>
              <select
                id="correction-type"
                value={correctionType}
                onChange={(e) => setCorrectionType(e.target.value)}
                className="w-full p-2 border-4 border-black font-medium"
              >
                <option value="language">Langage de programmation</option>
                <option value="framework">Framework ou bibliothèque</option>
              </select>
            </div>
          )}

          {correctionType === "framework" && (
            <div className="mb-4">
              <label htmlFor="framework-name" className="block font-bold mb-2">
                Nom du framework:
              </label>
              <input
                id="framework-name"
                type="text"
                value={frameworkName}
                onChange={(e) => setFrameworkName(e.target.value)}
                placeholder="Entrez le nom du framework"
                readOnly={!!framework}
                className="w-full p-2 border-4 border-black font-medium"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="field" className="block font-bold mb-2">
              Champ à corriger:
            </label>
            {correctionType === "language" ? (
              <select
                id="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full p-2 border-4 border-black font-medium"
              >
                <option value="usedFor">Utilisé pour</option>
                <option value="shortDescription">Description courte</option>
                <option value="popularFrameworks">Frameworks populaires</option>
                <option value="strengths">Forces</option>
                <option value="usageRate">Taux d'utilisation</option>
              </select>
            ) : (
              <select
                id="field"
                value={frameworkField}
                onChange={(e) => setFrameworkField(e.target.value)}
                className="w-full p-2 border-4 border-black font-medium"
              >
                <option value="description">Description</option>
                <option value="usedFor">Utilisé pour</option>
                <option value="features">Fonctionnalités</option>
                <option value="uniqueSellingPoint">Point fort unique</option>
                <option value="bestFor">Idéal pour</option>
                <option value="version">Version</option>
                <option value="resources">Ressources (liens)</option>
              </select>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="suggestion" className="block font-bold mb-2">
              Votre suggestion:
            </label>
            <textarea
              id="suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full p-2 border-4 border-black font-medium min-h-[120px]"
              placeholder={getPlaceholder()}
            />
            {correctionType === "framework" && frameworkField === "resources" && (
              <p className="text-sm text-gray-600 mt-1">
                Entrez chaque ressource sur une nouvelle ligne au format "Nom|URL"
              </p>
            )}
            {error && <p className="text-red-600 font-medium mt-1">{error}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 border-4 border-black font-bold hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-black text-white border-4 border-black font-bold hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

