"use server"

import { createServerClient } from "@/lib/supabase/server"
import { libraryToDb, dbToLibrary } from "@/lib/server/mapping"
import { revalidatePath } from "next/cache"
import type { Library } from "@/types/models/library"
import type { DbLibrary } from "@/types/database/library"
import { deleteFile } from "@/lib/server/storage"
import { generateSlug } from "@/utils/slugs"

/**
 * Récupère une bibliothèque par son slug
 */
export async function getLibraryBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("libraries").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Erreur lors de la récupération de la bibliothèque avec le slug ${slug}:`, error)
    return null
  }

  // Utiliser une assertion de type pour résoudre l'erreur
  return dbToLibrary(data as DbLibrary)
}

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
      // Correction: utiliser languageId au lieu de language_id
      languageId: Number(formData.get("languageId")) || null,
      description: formData.get("description") as string,
      officialWebsite: formData.get("officialWebsite") as string,
      githubUrl: formData.get("githubUrl") as string,
      logoPath: formData.get("logo") as string,
      isOpenSource: formData.get("isOpenSource") === "true",
      // Générer un slug à partir du nom
      slug: generateSlug(formData.get("name") as string),
      createdAt: new Date().toISOString(),
    }

    const supabase = createServerClient()
    const dbData = libraryToDb(library)

    // Créer un objet qui respecte les contraintes de type de Supabase
    const insertData = {
      name: dbData.name!,
      slug: dbData.slug!,
      // Correction: utiliser language_id pour la base de données
      language_id: dbData.language_id,
      description: dbData.description || null,
      official_website: dbData.official_website || null,
      github_url: dbData.github_url || null,
      logo_path: dbData.logo_path || null,
      is_open_source: dbData.is_open_source || null,
      created_at: dbData.created_at || new Date().toISOString(),
      updated_at: dbData.updated_at || null,
    }

    const { data, error } = await supabase.from("libraries").insert(insertData).select().single()

    if (error) {
      console.error("Erreur lors de la création de la bibliothèque:", error)
      return {
        success: false,
        message: "Erreur lors de la création de la bibliothèque",
      }
    }

    // Utiliser une assertion de type pour résoudre l'erreur
    const newLibrary = dbToLibrary(data as DbLibrary)

    revalidatePath("/")
    revalidatePath("/libraries")
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
    const library: Partial<Library> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) library.name = formData.get("name") as string
    if (formData.has("slug")) library.slug = formData.get("slug") as string
    if (formData.has("languageId")) {
      // Correction: utiliser languageId au lieu de language_id
      library.languageId = Number(formData.get("languageId")) || null
    }
    if (formData.has("description")) library.description = formData.get("description") as string
    if (formData.has("officialWebsite")) library.officialWebsite = formData.get("officialWebsite") as string
    if (formData.has("githubUrl")) library.githubUrl = formData.get("githubUrl") as string
    if (formData.has("logo")) {
      const oldLogo = (await getLibraryBySlug(formData.get("slug") as string))?.logoPath
      const newLogo = formData.get("logo") as string

      // Si le logo a changé et que l'ancien logo était stocké dans Supabase, le supprimer
      if (oldLogo && oldLogo !== newLogo && oldLogo.includes("supabase.co")) {
        await deleteFile(oldLogo)
      }

      library.logoPath = newLogo
    }
    if (formData.has("isOpenSource")) library.isOpenSource = formData.get("isOpenSource") === "true"

    const supabase = createServerClient()
    const dbData = libraryToDb(library)

    // Créer un objet de mise à jour qui ne contient que les champs à modifier
    const updateData: Record<string, any> = {}

    // N'ajouter que les champs qui sont présents dans dbData
    if (dbData.name !== undefined) updateData.name = dbData.name
    if (dbData.slug !== undefined) updateData.slug = dbData.slug
    // Correction: utiliser language_id pour la base de données
    if (dbData.language_id !== undefined) updateData.language_id = dbData.language_id
    if (dbData.description !== undefined) updateData.description = dbData.description
    if (dbData.official_website !== undefined) updateData.official_website = dbData.official_website
    if (dbData.github_url !== undefined) updateData.github_url = dbData.github_url
    if (dbData.logo_path !== undefined) updateData.logo_path = dbData.logo_path
    if (dbData.is_open_source !== undefined) updateData.is_open_source = dbData.is_open_source

    // Ajouter le timestamp de mise à jour
    updateData.updated_at = new Date().toISOString()

    const { error } = await supabase.from("libraries").update(updateData).eq("id", Number(id))

    if (error) {
      console.error(`Erreur lors de la mise à jour de la bibliothèque ${id}:`, error)
      return {
        success: false,
        message: "Erreur lors de la mise à jour de la bibliothèque",
      }
    }

    const slug = formData.get("slug") as string
    revalidatePath("/")
    revalidatePath(`/libraries/${slug}`)
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
export async function deleteLibraryAction(id: string, logoUrl?: string) {
  try {
    // Supprimer le logo si fourni
    if (logoUrl && logoUrl.includes("supabase.co")) {
      await deleteFile(logoUrl)
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("libraries").delete().eq("id", Number(id))

    if (error) {
      console.error(`Erreur lors de la suppression de la bibliothèque ${id}:`, error)
      return {
        success: false,
        message: "Erreur lors de la suppression de la bibliothèque",
      }
    }

    revalidatePath("/")
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
