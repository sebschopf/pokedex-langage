"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

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
    const supabase = createServerSupabaseClient()

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

    // Insérer la correction dans la base de données
    const { error } = await supabase.from("corrections").insert({
      language_id: languageId,
      framework: correction.type === "framework" ? correction.frameworkName : null,
      correction_text: correctionText,
      status: "pending",
    })

    if (error) throw error

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
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("corrections")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error

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

