"use server"

import { getLibraryBySlug, createLibrary, updateLibrary } from "@/lib/server/api/libraries"
import { revalidatePath } from "next/cache"
import { generateLanguageSlug } from "@/utils/slug/slug-generator"
import type { Library } from "@/types/models/library"

/**
 * Crée ou met à jour une bibliothèque
 */
export async function createOrUpdateLibrary(formData: FormData) {
  try {
    const id = formData.get("id") ? Number(formData.get("id")) : null
    const name = formData.get("name") as string
    const slug = (formData.get("slug") as string) || generateLanguageSlug(name)

    // Créer un objet partiel de bibliothèque avec les données du formulaire
    const libraryData: Partial<Library> = {
      name,
      slug,
      language_id: formData.get("language_id") ? Number(formData.get("language_id")) : null,
      description: (formData.get("description") as string) || null,
      officialWebsite: (formData.get("officialWebsite") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      documentationUrl: (formData.get("documentationUrl") as string) || null,
      version: (formData.get("version") as string) || null,
      logoPath: (formData.get("logoPath") as string) || null,
      features: formData.get("features") ? (formData.get("features") as string).split(",").map((f) => f.trim()) : null,
      usedFor: (formData.get("usedFor") as string) || null,
      bestFor: (formData.get("bestFor") as string) || null,
      uniqueSellingPoint: (formData.get("uniqueSellingPoint") as string) || null,
      technologyType: (formData.get("technologyType") as string) || null,
      subtype: (formData.get("subtype") as string) || null,
      popularity: formData.get("popularity") ? Number(formData.get("popularity")) : null,
      isOpenSource: formData.get("isOpenSource") ? formData.get("isOpenSource") === "true" : null,
    }

    let result: Library

    if (id) {
      // Mise à jour d'une bibliothèque existante
      result = await updateLibrary(id, libraryData)
    } else {
      // Création d'une nouvelle bibliothèque
      result = await createLibrary(libraryData as Omit<Library, "id">)
    }

    // Revalider les chemins
    revalidatePath("/libraries")
    revalidatePath(`/libraries/${result.slug}`)

    if (result.language_id) {
      revalidatePath(`/languages/${result.language_id}`)
    }

    return {
      success: true,
      message: id ? "Bibliothèque mise à jour avec succès" : "Bibliothèque créée avec succès",
      data: result,
    }
  } catch (error) {
    console.error("Erreur lors de la création/mise à jour de la bibliothèque:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création/mise à jour de la bibliothèque",
    }
  }
}

/**
 * Met à jour les propriétés spécifiques d'une bibliothèque
 */
export async function updateLibraryProperties(formData: FormData) {
  try {
    const id = Number(formData.get("id"))
    const slug = formData.get("slug") as string

    if (!id || !slug) {
      return {
        success: false,
        message: "ID ou slug de bibliothèque manquant",
      }
    }

    // Récupérer la bibliothèque existante
    const existingLibrary = await getLibraryBySlug(slug)

    if (!existingLibrary) {
      return {
        success: false,
        message: "Bibliothèque non trouvée",
      }
    }

    // Créer un objet partiel avec les propriétés à mettre à jour
    const updateData: Partial<Library> = {}

    // Ajouter les propriétés à mettre à jour si elles sont présentes dans le formulaire
    if (formData.has("officialWebsite")) updateData.officialWebsite = formData.get("officialWebsite") as string
    if (formData.has("githubUrl")) updateData.githubUrl = formData.get("githubUrl") as string
    if (formData.has("documentationUrl")) updateData.documentationUrl = formData.get("documentationUrl") as string
    if (formData.has("version")) updateData.version = formData.get("version") as string
    if (formData.has("logoPath")) updateData.logoPath = formData.get("logoPath") as string
    if (formData.has("features")) {
      updateData.features = (formData.get("features") as string).split(",").map((f) => f.trim())
    }
    if (formData.has("usedFor")) updateData.usedFor = formData.get("usedFor") as string
    if (formData.has("bestFor")) updateData.bestFor = formData.get("bestFor") as string
    if (formData.has("uniqueSellingPoint")) updateData.uniqueSellingPoint = formData.get("uniqueSellingPoint") as string
    if (formData.has("technologyType")) updateData.technologyType = formData.get("technologyType") as string
    if (formData.has("subtype")) updateData.subtype = formData.get("subtype") as string
    if (formData.has("popularity")) updateData.popularity = Number(formData.get("popularity"))
    if (formData.has("isOpenSource")) updateData.isOpenSource = formData.get("isOpenSource") === "true"

    // Mettre à jour la bibliothèque
    const result = await updateLibrary(id, updateData)

    // Revalider les chemins
    revalidatePath("/libraries")
    revalidatePath(`/libraries/${result.slug}`)

    if (result.language_id) {
      revalidatePath(`/languages/${result.language_id}`)
    }

    return {
      success: true,
      message: "Propriétés de la bibliothèque mises à jour avec succès",
      data: result,
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des propriétés de la bibliothèque:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour des propriétés de la bibliothèque",
    }
  }
}
