"use server"

import { createLanguage, updateLanguage, deleteLanguage, getLanguageBySlug } from "@/lib/data"
import { revalidatePath } from "next/cache"
import type { Language } from "@/types/language"
import { deleteFile } from "@/lib/storage"

/**
 * Action serveur pour créer un langage
 * @param formData FormData contenant les données du langage
 * @returns Résultat de l'opération avec le langage créé en cas de succès
 */
export async function createLanguageAction(formData: FormData) {
  try {
    const language: Omit<Language, "id"> = {
      name: formData.get("name") as string,
      logo: formData.get("logo") as string,
      shortDescription: formData.get("shortDescription") as string,
      type: (formData.get("type") as Language["type"]) || "Fullstack",
      usedFor: formData.get("usedFor") as string,
      usageRate: Number(formData.get("usageRate")) || 0,
      createdYear: Number(formData.get("createdYear")) || 0,
      popularFrameworks: (formData.get("popularFrameworks") as string)?.split(",").map((s) => s.trim()) || [],
      strengths: (formData.get("strengths") as string)?.split(",").map((s) => s.trim()) || [],
      difficulty: Number(formData.get("difficulty")) as Language["difficulty"],
      isOpenSource: formData.get("isOpenSource") === "true",
      tools: JSON.parse((formData.get("tools") as string) || "{}"),
    }

    const newLanguage = await createLanguage(language)

    if (!newLanguage) {
      return {
        success: false,
        message: "Erreur lors de la création du langage",
      }
    }

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
    const language: Partial<Omit<Language, "id">> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) language.name = formData.get("name") as string
    if (formData.has("logo")) {
      const oldLogo = (await getLanguageBySlug(formData.get("slug") as string))?.logo
      const newLogo = formData.get("logo") as string

      // Si le logo a changé et que l'ancien logo était stocké dans Supabase, le supprimer
      if (oldLogo && oldLogo !== newLogo && oldLogo.includes("supabase.co")) {
        await deleteFile(oldLogo)
      }

      language.logo = newLogo
    }
    if (formData.has("shortDescription")) language.shortDescription = formData.get("shortDescription") as string
    if (formData.has("type")) language.type = formData.get("type") as Language["type"]
    if (formData.has("usedFor")) language.usedFor = formData.get("usedFor") as string
    if (formData.has("usageRate")) language.usageRate = Number(formData.get("usageRate"))
    if (formData.has("createdYear")) language.createdYear = Number(formData.get("createdYear"))
    if (formData.has("popularFrameworks"))
      language.popularFrameworks = (formData.get("popularFrameworks") as string)?.split(",").map((s) => s.trim()) || []
    if (formData.has("strengths"))
      language.strengths = (formData.get("strengths") as string)?.split(",").map((s) => s.trim()) || []
    if (formData.has("difficulty")) language.difficulty = Number(formData.get("difficulty")) as Language["difficulty"]
    if (formData.has("isOpenSource")) language.isOpenSource = formData.get("isOpenSource") === "true"
    if (formData.has("tools")) language.tools = JSON.parse((formData.get("tools") as string) || "{}")

    const success = await updateLanguage(id, language)

    if (!success) {
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

    const success = await deleteLanguage(id)

    if (!success) {
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

