import { createServerClient } from "@/lib/supabase/server"

/**
 * Ajoute une association entre une bibliothèque/outil et un langage
 * @param libraryId ID de la bibliothèque ou de l'outil
 * @param languageId ID du langage
 * @param isPrimary Indique si c'est le langage principal
 * @returns Résultat de l'opération
 */
export async function addLanguageToLibrary(libraryId: number, languageId: number, isPrimary = false) {
  try {
    const supabase = createServerClient()

    // Si on définit ce langage comme principal, mettre à jour les autres langages
    if (isPrimary) {
      // Mettre à jour tous les autres langages pour qu'ils ne soient plus principaux
      const { error: updateError } = await supabase
        .from("library_languages")
        .update({ primary_language: false })
        .eq("library_id", libraryId)
        .neq("language_id", languageId)

      if (updateError) {
        console.error("Erreur lors de la mise à jour des autres langages:", updateError)
        return { success: false, message: "Erreur lors de la mise à jour des autres langages" }
      }
    }

    // Vérifier si l'association existe déjà
    const { data: existingAssoc, error: checkError } = await supabase
      .from("library_languages")
      .select("*")
      .eq("library_id", libraryId)
      .eq("language_id", languageId)
      .maybeSingle()

    if (checkError) {
      throw checkError
    }

    // Si l'association existe déjà, mettre à jour le statut primaire
    if (existingAssoc) {
      const { error: updateError } = await supabase
        .from("library_languages")
        .update({ primary_language: isPrimary })
        .eq("library_id", libraryId)
        .eq("language_id", languageId)

      if (updateError) throw updateError
      return { success: true, message: "Association mise à jour" }
    }

    // Sinon, créer une nouvelle association
    const { error: insertError } = await supabase.from("library_languages").insert({
      library_id: libraryId,
      language_id: languageId,
      primary_language: isPrimary,
      created_at: new Date().toISOString(),
    })

    if (insertError) throw insertError

    return { success: true, message: "Association créée avec succès" }
  } catch (error) {
    console.error("Erreur lors de l'ajout du langage à la bibliothèque:", error)
    return { success: false, message: "Erreur lors de l'ajout du langage" }
  }
}
