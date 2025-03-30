"use server"

import { createLibrary, updateLibrary, deleteLibrary } from "@/lib/data"
import { revalidatePath } from "next/cache"
import type { Library } from "@/types/library"

/**
 * Action serveur pour créer une bibliothèque
 * @param formData FormData contenant les données de la bibliothèque
 * @returns Résultat de l'opération avec la bibliothèque créée en cas de succès
 */
export async function createLibraryAction(formData: FormData) {
  try {
    const languageId = formData.get("languageId") as string
    const languageSlug = formData.get("languageSlug") as string

    if (!languageId) {
      return {
        success: false,
        message: "ID de langage manquant",
      }
    }

    const library: Omit<Library, "id"> = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      usedFor: formData.get("usedFor") as string,
      features: (formData.get("features") as string)?.split(",").map((s) => s.trim()) || [],
      officialWebsite: formData.get("officialWebsite") as string,
      uniqueSellingPoint: formData.get("uniqueSellingPoint") as string,
      bestFor: formData.get("bestFor") as string,
      version: formData.get("version") as string,
    }

    const newLibrary = await createLibrary(library, languageId)

    if (!newLibrary) {
      return {
        success: false,
        message: "Erreur lors de la création de la bibliothèque",
      }
    }

    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/libraries")

    return {
      success: true,
      message: "Bibliothèque créée avec succès",
      data: newLibrary,
    }
  } catch (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création de la bibliothèque",
    }
  }
}

/**
 * Action serveur pour mettre à jour une bibliothèque
 * @param id ID de la bibliothèque à mettre à jour
 * @param formData FormData contenant les données de la bibliothèque
 * @returns Résultat de l'opération
 */
export async function updateLibraryAction(id: string, formData: FormData) {
  try {
    const languageSlug = formData.get("languageSlug") as string
    const library: Partial<Omit<Library, "id">> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) library.name = formData.get("name") as string
    if (formData.has("description")) library.description = formData.get("description") as string
    if (formData.has("usedFor")) library.usedFor = formData.get("usedFor") as string
    if (formData.has("features"))
      library.features = (formData.get("features") as string)?.split(",").map((s) => s.trim()) || []
    if (formData.has("officialWebsite")) library.officialWebsite = formData.get("officialWebsite") as string
    if (formData.has("uniqueSellingPoint")) library.uniqueSellingPoint = formData.get("uniqueSellingPoint") as string
    if (formData.has("bestFor")) library.bestFor = formData.get("bestFor") as string
    if (formData.has("version")) library.version = formData.get("version") as string

    const success = await updateLibrary(id, library)

    if (!success) {
      return {
        success: false,
        message: "Erreur lors de la mise à jour de la bibliothèque",
      }
    }

    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/libraries")

    return {
      success: true,
      message: "Bibliothèque mise à jour avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la bibliothèque:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de la bibliothèque",
    }
  }
}

/**
 * Action serveur pour supprimer une bibliothèque
 * @param id ID de la bibliothèque à supprimer
 * @param languageSlug Slug du langage parent
 * @returns Résultat de l'opération
 */
export async function deleteLibraryAction(id: string, languageSlug: string) {
  try {
    const success = await deleteLibrary(id)

    if (!success) {
      return {
        success: false,
        message: "Erreur lors de la suppression de la bibliothèque",
      }
    }

    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/libraries")

    return {
      success: true,
      message: "Bibliothèque supprimée avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la bibliothèque:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression de la bibliothèque",
    }
  }
}

