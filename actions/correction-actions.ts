"use server"

import { revalidatePath } from "next/cache"
import { languages } from "@/data/languages"
import { frameworksData } from "@/data/frameworks"

// Type pour les corrections soumises
type CorrectionSubmission = {
  languageId: string
  field: string
  suggestion: string
  type: "language" | "framework"
  frameworkName?: string
}

// Stockage en mémoire des corrections (dans un environnement de production, utiliser une base de données)
const pendingCorrections: CorrectionSubmission[] = []
const appliedCorrections: Record<string, Record<string, any>> = {}
const appliedFrameworkCorrections: Record<string, Record<string, Record<string, any>>> = {}

// Action serveur pour soumettre une correction
export async function submitCorrection(correction: CorrectionSubmission) {
  // Validation de base
  if (!correction.languageId || !correction.field || !correction.suggestion) {
    throw new Error("Données de correction incomplètes")
  }

  // Dans un environnement réel, vous voudriez valider davantage et peut-être modérer

  // Ajouter aux corrections en attente
  pendingCorrections.push(correction)

  // Appliquer immédiatement la correction (dans un environnement réel, cela passerait par un processus de modération)
  if (correction.type === "language") {
    applyLanguageCorrection(correction)
  } else if (correction.type === "framework" && correction.frameworkName) {
    applyFrameworkCorrection(correction)
  }

  // Revalider le chemin pour que les changements soient visibles
  revalidatePath("/")

  return { success: true }
}

// Fonction pour appliquer une correction aux données de langage
function applyLanguageCorrection(correction: CorrectionSubmission) {
  // Trouver le langage à corriger
  const language = languages.find((lang) => lang.id === correction.languageId)

  if (!language) {
    throw new Error(`Langage avec ID ${correction.languageId} non trouvé`)
  }

  // Stocker la correction appliquée
  if (!appliedCorrections[correction.languageId]) {
    appliedCorrections[correction.languageId] = {}
  }

  // Appliquer la correction selon le champ
  switch (correction.field) {
    case "usedFor":
      appliedCorrections[correction.languageId].usedFor = correction.suggestion
      language.usedFor = correction.suggestion
      break
    case "shortDescription":
      appliedCorrections[correction.languageId].shortDescription = correction.suggestion
      language.shortDescription = correction.suggestion
      break
    case "usageRate":
      const rate = Number.parseInt(correction.suggestion)
      if (!isNaN(rate) && rate >= 0 && rate <= 100) {
        appliedCorrections[correction.languageId].usageRate = rate
        language.usageRate = rate
      }
      break
    case "popularFrameworks":
      const frameworks = correction.suggestion
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
      if (frameworks.length > 0) {
        appliedCorrections[correction.languageId].popularFrameworks = frameworks
        language.popularFrameworks = frameworks
      }
      break
    case "strengths":
      const strengths = correction.suggestion
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      if (strengths.length > 0) {
        appliedCorrections[correction.languageId].strengths = strengths
        language.strengths = strengths
      }
      break
    default:
      throw new Error(`Champ ${correction.field} non reconnu`)
  }
}

// Fonction pour appliquer une correction aux données de framework
function applyFrameworkCorrection(correction: CorrectionSubmission) {
  if (!correction.frameworkName) {
    throw new Error("Nom du framework manquant")
  }

  // Initialiser la structure de données si nécessaire
  if (!appliedFrameworkCorrections[correction.languageId]) {
    appliedFrameworkCorrections[correction.languageId] = {}
  }

  if (!appliedFrameworkCorrections[correction.languageId][correction.frameworkName]) {
    appliedFrameworkCorrections[correction.languageId][correction.frameworkName] = {}
  }

  // Stocker la correction dans notre structure de données
  appliedFrameworkCorrections[correction.languageId][correction.frameworkName][correction.field] = correction.suggestion

  // Vérifier si le framework existe dans les données
  if (frameworksData[correction.frameworkName]) {
    const framework = frameworksData[correction.frameworkName]

    // Appliquer la correction selon le champ
    try {
      switch (correction.field) {
        case "description":
          framework.description = correction.suggestion
          break
        case "usedFor":
          framework.usedFor = correction.suggestion
          break
        case "uniqueSellingPoint":
          framework.uniqueSellingPoint = correction.suggestion
          break
        case "bestFor":
          framework.bestFor = correction.suggestion
          break
        case "version":
          framework.version = correction.suggestion
          break
        case "features":
          const features = correction.suggestion
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
          if (features.length > 0) {
            framework.features = features
          }
          break
        case "resources":
          // Traiter les ressources au format "Nom|URL" (un par ligne)
          const resourceLines = correction.suggestion.split("\n")
          const resources = resourceLines
            .map((line) => {
              const parts = line.split("|")
              if (parts.length === 2) {
                return { name: parts[0].trim(), url: parts[1].trim() }
              }
              return null
            })
            .filter(Boolean) as { name: string; url: string }[]

          if (resources.length > 0) {
            framework.resources = resources
          }
          break
        default:
          console.log(`Champ ${correction.field} non reconnu pour les frameworks`)
      }
    } catch (error) {
      console.error("Erreur lors de l'application de la correction au framework:", error)
    }
  } else {
    console.log(`Framework ${correction.frameworkName} non trouvé dans les données`)
  }
}

// Action pour récupérer les corrections appliquées
export async function getAppliedCorrections() {
  return {
    languages: appliedCorrections,
    frameworks: appliedFrameworkCorrections,
  }
}

// Action pour récupérer les corrections en attente
export async function getPendingCorrections() {
  return pendingCorrections
}

