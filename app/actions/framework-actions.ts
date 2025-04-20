"use server"

import { createServerClient } from "@/lib/supabase/server"
import { libraryToDb, dbToLibrary } from "@/lib/server/mapping"
import { revalidatePath } from "next/cache"
import type { Library } from "@/types/models/library"
import type { DbLibrary } from "@/types/database/library"

export async function createFrameworkAction(formData: FormData) {
  try {
    // Créer un objet avec toutes les propriétés requises
    const framework: Partial<Library> = {
      name: formData.get("name") as string,
      languageId: Number.parseInt(formData.get("languageId") as string),
      description: (formData.get("description") as string) || null,
      // Utiliser officialWebsite au lieu de websiteUrl
      officialWebsite: (formData.get("website") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      logoPath: (formData.get("logoPath") as string) || null,
      // Utiliser popularity au lieu de isPopular
      popularity: formData.has("popularity") ? Number.parseInt(formData.get("popularity") as string) : null,
      isOpenSource: formData.get("isOpenSource") === "true",
      // Propriétés obligatoires pour Library
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      technologyType: "framework",
      createdAt: new Date().toISOString(),
    }

    const supabase = createServerClient()
    const dbData = libraryToDb(framework)

    // Assurez-vous que les champs obligatoires sont présents
    const insertData = {
      name: dbData.name!,
      slug: dbData.slug!,
      language_id: dbData.language_id!,
      technology_type: dbData.technology_type!,
      created_at: dbData.created_at!,
      // Autres champs optionnels
      description: dbData.description,
      official_website: dbData.official_website,
      github_url: dbData.github_url,
      logo_path: dbData.logo_path,
      updated_at: dbData.updated_at,
      documentation_url: dbData.documentation_url,
      best_for: dbData.best_for,
      features: dbData.features,
      version: dbData.version,
      subtype: dbData.subtype,
      popularity: dbData.popularity,
      is_open_source: dbData.is_open_source,
      used_for: dbData.used_for,
      unique_selling_point: dbData.unique_selling_point,
    }

    const { data, error } = await supabase.from("libraries").insert(insertData).select().single()

    if (error) {
      console.error("Erreur lors de la création du framework:", error)
      return {
        success: false,
        message: "Erreur lors de la création du framework",
      }
    }

    // Utiliser une conversion de type sécurisée
    const newFramework = dbToLibrary(data as unknown as DbLibrary)

    const languageSlug = formData.get("languageSlug") as string
    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/frameworks")

    return {
      success: true,
      message: "Framework créé avec succès",
      data: newFramework,
    }
  } catch (error) {
    console.error("Erreur lors de la création du framework:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création du framework",
    }
  }
}

export async function updateFrameworkAction(id: number, formData: FormData) {
  try {
    const framework: Partial<Library> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) framework.name = formData.get("name") as string
    if (formData.has("languageId")) framework.languageId = Number.parseInt(formData.get("languageId") as string)
    if (formData.has("description")) framework.description = (formData.get("description") as string) || null
    if (formData.has("website")) framework.officialWebsite = (formData.get("website") as string) || null
    if (formData.has("githubUrl")) framework.githubUrl = (formData.get("githubUrl") as string) || null
    if (formData.has("logoPath")) framework.logoPath = (formData.get("logoPath") as string) || null
    if (formData.has("popularity")) {
      framework.popularity = Number.parseInt(formData.get("popularity") as string)
    }
    if (formData.has("isOpenSource")) framework.isOpenSource = formData.get("isOpenSource") === "true"

    const supabase = createServerClient()
    const dbData = libraryToDb(framework)

    // Créer un objet de mise à jour qui ne contient que les champs à modifier
    const updateData: Record<string, any> = {}

    // N'ajouter que les champs qui sont présents dans dbData
    if (dbData.name !== undefined) updateData.name = dbData.name
    if (dbData.language_id !== undefined) updateData.language_id = dbData.language_id
    if (dbData.description !== undefined) updateData.description = dbData.description
    if (dbData.official_website !== undefined) updateData.official_website = dbData.official_website
    if (dbData.github_url !== undefined) updateData.github_url = dbData.github_url
    if (dbData.logo_path !== undefined) updateData.logo_path = dbData.logo_path
    if (dbData.popularity !== undefined) updateData.popularity = dbData.popularity
    if (dbData.is_open_source !== undefined) updateData.is_open_source = dbData.is_open_source

    // Ajouter le timestamp de mise à jour
    updateData.updated_at = new Date().toISOString()

    const { error } = await supabase.from("libraries").update(updateData).eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour du framework ${id}:`, error)
      return {
        success: false,
        message: "Erreur lors de la mise à jour du framework",
      }
    }

    const languageSlug = formData.get("languageSlug") as string
    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/frameworks")

    return {
      success: true,
      message: "Framework mis à jour avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du framework:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour du framework",
    }
  }
}

export async function deleteFrameworkAction(id: number, languageSlug: string) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.from("libraries").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression du framework ${id}:`, error)
      return {
        success: false,
        message: "Erreur lors de la suppression du framework",
      }
    }

    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/frameworks")

    return {
      success: true,
      message: "Framework supprimé avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du framework:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression du framework",
    }
  }
}
