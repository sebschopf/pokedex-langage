"use server"
import { getLibraryBySlug, createLibrary, updateLibrary, deleteLibrary } from "@/lib/server/api/libraries"
import { revalidatePath } from "next/cache"
import type { Library } from "@/types/models/library"
import { deleteFile } from "@/lib/server/storage"

/**
 * Action serveur pour créer une bibliothèque
 * @param formData FormData contenant les données de la bibliothèque
 * @returns Résultat de l'opération avec la bibliothèque créée en cas de succès
 */
export async function createLibraryAction(formData: FormData) {
  try {
    // Créer un objet partiel de Library avec les données du formulaire
    const library: Partial<Library> = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      languageId: Number(formData.get("languageId")),
      technologyType: formData.get("technologyType") as string,
      websiteUrl: (formData.get("websiteUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      logoPath: (formData.get("logoPath") as string) || null,
      isPopular: formData.get("isPopular") === "true",
      documentationUrl: (formData.get("documentationUrl") as string) || null,
      bestFor: (formData.get("bestFor") as string) || null,
      category: (formData.get("category") as string) || null,
      stars: Number(formData.get("stars")) || null,
      license: (formData.get("license") as string) || null,
      features: formData.get("features") ? (formData.get("features") as string).split(",").map((s) => s.trim()) : null,
      version: (formData.get("version") as string) || null,
      subtype: (formData.get("subtype") as string) || null,
      popularity: Number(formData.get("popularity")) || null,
      isOpenSource: formData.get("isOpenSource") === "true",
      // Propriétés obligatoires
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      createdAt: new Date().toISOString(),
    }

    // Créer la bibliothèque
    const result = await createLibrary(library)

    // Revalider les chemins
    const languageSlug = formData.get("languageSlug") as string
    if (languageSlug) {
      revalidatePath(`/languages/${languageSlug}`)
    }
    revalidatePath("/libraries")
    revalidatePath("/admin/libraries")

    return {
      success: true,
      message: "Bibliothèque créée avec succès",
      data: result,
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
export async function updateLibraryAction(id: number, formData: FormData) {
  try {
    const library: Partial<Library> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) library.name = formData.get("name") as string
    if (formData.has("description")) library.description = formData.get("description") as string
    if (formData.has("languageId")) library.languageId = Number(formData.get("languageId"))
    if (formData.has("technologyType")) library.technologyType = formData.get("technologyType") as string
    if (formData.has("websiteUrl")) library.websiteUrl = formData.get("websiteUrl") as string
    if (formData.has("githubUrl")) library.githubUrl = formData.get("githubUrl") as string
    if (formData.has("logoPath")) {
      const oldLibrary = await getLibraryBySlug(formData.get("slug") as string)
      const oldLogo = oldLibrary?.logoPath
      const newLogo = formData.get("logoPath") as string

      // Si le logo a changé et que l'ancien logo était stocké dans Supabase, le supprimer
      if (oldLogo && oldLogo !== newLogo && oldLogo.includes("supabase.co")) {
        await deleteFile(oldLogo)
      }

      library.logoPath = newLogo
    }
    if (formData.has("isPopular")) library.isPopular = formData.get("isPopular") === "true"
    if (formData.has("documentationUrl")) library.documentationUrl = formData.get("documentationUrl") as string
    if (formData.has("bestFor")) library.bestFor = formData.get("bestFor") as string
    if (formData.has("category")) library.category = formData.get("category") as string
    if (formData.has("stars")) library.stars = Number(formData.get("stars"))
    if (formData.has("license")) library.license = formData.get("license") as string
    if (formData.has("features"))
      library.features = (formData.get("features") as string).split(",").map((s) => s.trim())
    if (formData.has("version")) library.version = formData.get("version") as string
    if (formData.has("subtype")) library.subtype = formData.get("subtype") as string
    if (formData.has("popularity")) library.popularity = Number(formData.get("popularity"))
    if (formData.has("isOpenSource")) library.isOpenSource = formData.get("isOpenSource") === "true"

    // Mettre à jour la bibliothèque
    await updateLibrary(id, library)

    // Revalider les chemins
    const slug = formData.get("slug") as string
    const languageSlug = formData.get("languageSlug") as string

    revalidatePath(`/libraries/${slug}`)
    if (languageSlug) {
      revalidatePath(`/languages/${languageSlug}`)
    }
    revalidatePath("/libraries")
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
 * @param logoUrl URL du logo à supprimer (optionnel)
 * @returns Résultat de l'opération
 */
export async function deleteLibraryAction(id: number, logoUrl?: string, languageSlug?: string) {
  try {
    // Supprimer le logo si fourni
    if (logoUrl && logoUrl.includes("supabase.co")) {
      await deleteFile(logoUrl)
    }

    // Supprimer la bibliothèque
    await deleteLibrary(id)

    // Revalider les chemins
    if (languageSlug) {
      revalidatePath(`/languages/${languageSlug}`)
    }
    revalidatePath("/libraries")
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
