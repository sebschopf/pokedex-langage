"use server"

import { createServerClient } from "@/lib/supabase/server"
import { languageToDb, dbToLanguage } from "@/lib/server/mapping"
import { revalidatePath } from "next/cache"
import type { Language } from "@/types/models/language"
import type { DbLanguage } from "@/types/database/language"
import { deleteFile } from "@/lib/server/storage"

/**
 * Récupère un langage par son slug
 */
export async function getLanguageBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("languages").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Erreur lors de la récupération du langage avec le slug ${slug}:`, error)
    return null
  }

  // Utiliser une assertion de type pour résoudre l'erreur
  return dbToLanguage(data as unknown as DbLanguage)
}

/**
 * Action serveur pour créer un langage
 * @param formData FormData contenant les données du langage
 * @returns Résultat de l'opération avec le langage créé en cas de succès
 */
export async function createLanguageAction(formData: FormData) {
  try {
    // Créer un objet partiel de Language avec les données du formulaire
    const language: Partial<Language> = {
      name: formData.get("name") as string,
      logoPath: formData.get("logo") as string,
      shortDescription: formData.get("shortDescription") as string,
      type: formData.get("type") as string,
      usedFor: formData.get("usedFor") as string,
      usageRate: Number(formData.get("usageRate")) || 0,
      yearCreated: Number(formData.get("createdYear")) || 0,
      popularFrameworks: (formData.get("popularFrameworks") as string)?.split(",").map((s) => s.trim()) || [],
      // Suppression de la propriété strengths
      difficulty: Number(formData.get("difficulty")),
      isOpenSource: formData.get("isOpenSource") === "true",
      // Propriétés obligatoires
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      createdAt: new Date().toISOString(),
    }

    const supabase = createServerClient()
    const dbData = languageToDb(language)

    // Créer un objet qui respecte les contraintes de type de Supabase
    // en incluant tous les champs obligatoires
    const insertData = {
      name: dbData.name!,
      slug: dbData.slug!,
      type: dbData.type!,
      // Champs optionnels avec valeurs par défaut si nécessaire
      short_description: dbData.short_description,
      used_for: dbData.used_for,
      usage_rate: dbData.usage_rate,
      year_created: dbData.year_created,
      popular_frameworks: dbData.popular_frameworks,
      // Suppression de strengths
      is_open_source: dbData.is_open_source,
      created_at: dbData.created_at || new Date().toISOString(),
      updated_at: dbData.updated_at,
      creator: dbData.creator,
      description: dbData.description,
      logo_path: dbData.logo_path,
      github_url: dbData.github_url || null,
      website_url: dbData.website_url || null,
      current_version: dbData.current_version || null,
      last_updated: dbData.last_updated || null,
      license: dbData.license || null,
      difficulty: dbData.difficulty,
      // Suppression de tools
    }

    const { data, error } = await supabase.from("languages").insert(insertData).select().single()

    if (error) {
      console.error("Erreur lors de la création du langage:", error)
      return {
        success: false,
        message: "Erreur lors de la création du langage",
      }
    }

    // Utiliser une assertion de type pour résoudre l'erreur
    const newLanguage = dbToLanguage(data as unknown as DbLanguage)

    revalidatePath("/")
    revalidatePath("/admin/languages")

    return {
      success: true,
      message: "Langage créé avec succès",
      data: newLanguage,
    }
  } catch (error) {
    console.error("Erreur lors de la création du langage:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création du langage",
    }
  }
}

/**
 * Action serveur pour mettre à jour un langage
 * @param id ID du langage à mettre à jour
 * @param formData FormData contenant les données du langage
 * @returns Résultat de l'opération
 */
export async function updateLanguageAction(id: string, formData: FormData) {
  try {
    const language: Partial<Language> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) language.name = formData.get("name") as string
    if (formData.has("logo")) {
      const oldLogo = (await getLanguageBySlug(formData.get("slug") as string))?.logoPath
      const newLogo = formData.get("logo") as string

      // Si le logo a changé et que l'ancien logo était stocké dans Supabase, le supprimer
      if (oldLogo && oldLogo !== newLogo && oldLogo.includes("supabase.co")) {
        await deleteFile(oldLogo)
      }

      language.logoPath = newLogo
    }
    if (formData.has("shortDescription")) language.shortDescription = formData.get("shortDescription") as string
    if (formData.has("type")) language.type = formData.get("type") as string
    if (formData.has("usedFor")) language.usedFor = formData.get("usedFor") as string
    if (formData.has("usageRate")) language.usageRate = Number(formData.get("usageRate"))
    if (formData.has("createdYear")) language.yearCreated = Number(formData.get("createdYear"))
    if (formData.has("popularFrameworks"))
      language.popularFrameworks = (formData.get("popularFrameworks") as string)?.split(",").map((s) => s.trim()) || []

    // Suppression des propriétés strengths et tools

    if (formData.has("difficulty")) language.difficulty = Number(formData.get("difficulty"))
    if (formData.has("isOpenSource")) language.isOpenSource = formData.get("isOpenSource") === "true"

    // Ajoutez d'autres champs selon vos besoins
    if (formData.has("githubUrl")) language.githubUrl = formData.get("githubUrl") as string
    if (formData.has("websiteUrl")) language.websiteUrl = formData.get("websiteUrl") as string
    if (formData.has("currentVersion")) language.currentVersion = formData.get("currentVersion") as string
    if (formData.has("lastUpdated")) language.lastUpdated = formData.get("lastUpdated") as string
    if (formData.has("license")) language.license = formData.get("license") as string

    const supabase = createServerClient()
    const dbData = languageToDb(language)

    // Créer un objet de mise à jour qui ne contient que les champs à modifier
    const updateData: Record<string, any> = {}

    // N'ajouter que les champs qui sont présents dans dbData
    if (dbData.name !== undefined) updateData.name = dbData.name
    if (dbData.slug !== undefined) updateData.slug = dbData.slug
    if (dbData.short_description !== undefined) updateData.short_description = dbData.short_description
    if (dbData.type !== undefined) updateData.type = dbData.type
    if (dbData.used_for !== undefined) updateData.used_for = dbData.used_for
    if (dbData.usage_rate !== undefined) updateData.usage_rate = dbData.usage_rate
    if (dbData.year_created !== undefined) updateData.year_created = dbData.year_created
    if (dbData.popular_frameworks !== undefined) updateData.popular_frameworks = dbData.popular_frameworks

    // Suppression des propriétés strengths et tools

    if (dbData.is_open_source !== undefined) updateData.is_open_source = dbData.is_open_source
    if (dbData.creator !== undefined) updateData.creator = dbData.creator
    if (dbData.description !== undefined) updateData.description = dbData.description
    if (dbData.logo_path !== undefined) updateData.logo_path = dbData.logo_path
    if (dbData.github_url !== undefined) updateData.github_url = dbData.github_url
    if (dbData.website_url !== undefined) updateData.website_url = dbData.website_url
    if (dbData.current_version !== undefined) updateData.current_version = dbData.current_version
    if (dbData.last_updated !== undefined) updateData.last_updated = dbData.last_updated
    if (dbData.license !== undefined) updateData.license = dbData.license
    if (dbData.difficulty !== undefined) updateData.difficulty = dbData.difficulty

    // Ajouter le timestamp de mise à jour
    updateData.updated_at = new Date().toISOString()

    const { error } = await supabase.from("languages").update(updateData).eq("id", Number(id))

    if (error) {
      console.error(`Erreur lors de la mise à jour du langage ${id}:`, error)
      return {
        success: false,
        message: "Erreur lors de la mise à jour du langage",
      }
    }

    const slug = formData.get("slug") as string
    revalidatePath("/")
    revalidatePath(`/languages/${slug}`)
    revalidatePath("/admin/languages")

    return {
      success: true,
      message: "Langage mis à jour avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du langage:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour du langage",
    }
  }
}

/**
 * Action serveur pour supprimer un langage
 * @param id ID du langage à supprimer
 * @param logoUrl URL du logo à supprimer (optionnel)
 * @returns Résultat de l'opération
 */
export async function deleteLanguageAction(id: string, logoUrl?: string) {
  try {
    // Supprimer le logo si fourni
    if (logoUrl && logoUrl.includes("supabase.co")) {
      await deleteFile(logoUrl)
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("languages").delete().eq("id", Number(id))

    if (error) {
      console.error(`Erreur lors de la suppression du langage ${id}:`, error)
      return {
        success: false,
        message: "Erreur lors de la suppression du langage",
      }
    }

    revalidatePath("/")
    revalidatePath("/admin/languages")

    return {
      success: true,
      message: "Langage supprimé avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du langage:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression du langage",
    }
  }
}
