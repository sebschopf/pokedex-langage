"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@/lib/supabase/server"
import { dbToUsageCategory } from "@/lib/server/mapping/usage-category-mapping"

/**
 * Crée une nouvelle catégorie d'usage
 */
export async function createUsageCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = (formData.get("description") as string) || null

    if (!name) {
      return {
        success: false,
        message: "Le nom est requis",
      }
    }

    const supabase = createServerClient()

    // Vérifier si une catégorie avec le même nom existe déjà
    const { data: existingCategory } = await supabase
      .from("usage_categories")
      .select("id")
      .eq("name", name)
      .maybeSingle()

    if (existingCategory) {
      return {
        success: false,
        message: "Une catégorie avec ce nom existe déjà",
      }
    }

    // Créer la catégorie
    const { data, error } = await supabase
      .from("usage_categories")
      .insert({
        name,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la création de la catégorie:", error)
      return {
        success: false,
        message: "Erreur lors de la création de la catégorie",
      }
    }

    // Revalider les chemins
    revalidatePath("/usage-categories")

    return {
      success: true,
      message: "Catégorie créée avec succès",
      data: dbToUsageCategory(data),
    }
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création de la catégorie",
    }
  }
}

/**
 * Met à jour une catégorie d'usage existante
 */
export async function updateUsageCategory(formData: FormData) {
  try {
    const id = Number(formData.get("id"))
    const name = formData.get("name") as string
    const description = (formData.get("description") as string) || null

    if (!id || !name) {
      return {
        success: false,
        message: "ID et nom sont requis",
      }
    }

    const supabase = createServerClient()

    // Vérifier si la catégorie existe
    const { data: existingCategory } = await supabase.from("usage_categories").select("id").eq("id", id).maybeSingle()

    if (!existingCategory) {
      return {
        success: false,
        message: "Catégorie non trouvée",
      }
    }

    // Vérifier si une autre catégorie avec le même nom existe déjà
    const { data: duplicateCategory } = await supabase
      .from("usage_categories")
      .select("id")
      .eq("name", name)
      .neq("id", id)
      .maybeSingle()

    if (duplicateCategory) {
      return {
        success: false,
        message: "Une autre catégorie avec ce nom existe déjà",
      }
    }

    // Mettre à jour la catégorie
    const { data, error } = await supabase
      .from("usage_categories")
      .update({
        name,
        description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error)
      return {
        success: false,
        message: "Erreur lors de la mise à jour de la catégorie",
      }
    }

    // Revalider les chemins
    revalidatePath("/usage-categories")
    revalidatePath(`/usage-categories/${id}`)

    return {
      success: true,
      message: "Catégorie mise à jour avec succès",
      data: dbToUsageCategory(data),
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de la catégorie",
    }
  }
}

/**
 * Supprime une catégorie d'usage
 */
export async function deleteUsageCategory(formData: FormData) {
  try {
    const id = Number(formData.get("id"))

    if (!id) {
      return {
        success: false,
        message: "ID requis",
      }
    }

    const supabase = createServerClient()

    // Vérifier si la catégorie existe
    const { data: existingCategory } = await supabase.from("usage_categories").select("id").eq("id", id).maybeSingle()

    if (!existingCategory) {
      return {
        success: false,
        message: "Catégorie non trouvée",
      }
    }

    // Supprimer les associations avec les langages
    await supabase.from("language_usage").delete().eq("category_id", id)

    // Supprimer la catégorie
    const { error } = await supabase.from("usage_categories").delete().eq("id", id)

    if (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error)
      return {
        success: false,
        message: "Erreur lors de la suppression de la catégorie",
      }
    }

    // Revalider les chemins
    revalidatePath("/usage-categories")

    return {
      success: true,
      message: "Catégorie supprimée avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression de la catégorie",
    }
  }
}
