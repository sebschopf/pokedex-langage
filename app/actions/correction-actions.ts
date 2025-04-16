"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { createCorrection, updateCorrection } from "@/lib/server/api/corrections"
import type { Correction } from "@/types/models/correction"

// Interface pour les corrections soumises
interface CorrectionSubmission {
  languageId: string | number
  field: string
  suggestion: string
  type: "language" | "framework"
  frameworkName?: string // Utilisé pour les corrections de frameworks
}

export async function submitCorrection(correction: CorrectionSubmission) {
  // Validation de base
  if (!correction.languageId || !correction.field || !correction.suggestion) {
    throw new Error("Données de correction incomplètes")
  }

  try {
    const supabase = createServerClient()

    // Convertir languageId en nombre si c'est une chaîne
    const languageId =
      typeof correction.languageId === "string" ? Number.parseInt(correction.languageId) : correction.languageId

    // Récupérer le slug du langage pour la revalidation
    const { data: languageData } = await supabase.from("languages").select("slug").eq("id", languageId).single()

    if (!languageData) {
      throw new Error("Langage non trouvé")
    }

    // Formater le texte de correction
    const correctionText = `Champ: ${correction.field}, Suggestion: ${correction.suggestion}`

    // Créer l'objet correction
    const correctionData: Omit<Correction, "id" | "updatedAt"> = {
      languageId,
      correctionText,
      field: correction.field,
      suggestion: correction.suggestion,
      framework: correction.type === "framework" ? correction.frameworkName || null : null,      status: "pending",
      userId: null, // Sera défini par la fonction createCorrection
      createdAt: new Date().toISOString(),
    }

    // Créer la correction via la fonction d'API
    await createCorrection(correctionData)

    // Revalidate the page
    revalidatePath(`/languages/${languageData.slug}`)

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la soumission de la correction:", error)
    throw error
  }
}

export async function updateCorrectionStatus(id: number, status: string, slug: string) {
  try {
    // Mettre à jour le statut via la fonction d'API
    await updateCorrection(id, {
      status,
      updatedAt: Date.now(), // Utiliser un timestamp numérique comme attendu par le type Correction
    })

    // Revalidate the pages
    revalidatePath(`/languages/${slug}`)
    revalidatePath("/admin/corrections")

    return {
      success: true,
      message: "Le statut de la correction a été mis à jour avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de la correction:", error)
    throw error
  }
}
