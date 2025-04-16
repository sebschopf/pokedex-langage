"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

/**
 * Action serveur pour créer une tâche
 * @param formData FormData contenant les données de la tâche
 * @returns Résultat de l'opération avec la tâche créée en cas de succès
 */
export async function createTodoAction(formData: FormData) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est connecté
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return {
        success: false,
        message: "Vous devez être connecté pour créer une tâche",
      }
    }

    // Récupérer les données du formulaire
    const title = formData.get("title") as string
    const description = (formData.get("description") as string) || null
    const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
    const statusId = formData.get("statusId") ? Number(formData.get("statusId")) : null
    const dueDate = (formData.get("dueDate") as string) || null

    // Vérifier que le titre est fourni
    if (!title) {
      return {
        success: false,
        message: "Le titre est obligatoire",
      }
    }

    // Créer un objet avec les données de la tâche
    const todoData = {
      title: title,
      description: description,
      category_id: categoryId,
      status_id: statusId,
      due_date: dueDate,
      user_id: user.id,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: null,
    }

    // Insérer la tâche dans la base de données
    const { data, error } = await supabase.from("todos").insert(todoData).select().single()

    if (error) {
      console.error("Erreur lors de la création de la tâche:", error)
      return {
        success: false,
        message: "Une erreur est survenue lors de la création de la tâche",
      }
    }

    // Revalider les chemins
    revalidatePath("/todos")
    revalidatePath("/admin/todos")

    return {
      success: true,
      message: "Tâche créée avec succès",
      data,
    }
  } catch (error) {
    console.error("Erreur lors de la création de la tâche:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création de la tâche",
    }
  }
}

/**
 * Action serveur pour mettre à jour une tâche
 * @param id ID de la tâche à mettre à jour
 * @param formData FormData contenant les données de la tâche
 * @returns Résultat de l'opération
 */
export async function updateTodoAction(id: number, formData: FormData) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est connecté
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return {
        success: false,
        message: "Vous devez être connecté pour mettre à jour une tâche",
      }
    }

    // Créer un objet pour stocker les données à mettre à jour
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("title")) updateData.title = formData.get("title") as string
    if (formData.has("description")) updateData.description = formData.get("description") as string
    if (formData.has("categoryId")) updateData.category_id = Number(formData.get("categoryId"))
    if (formData.has("statusId")) updateData.status_id = Number(formData.get("statusId"))
    if (formData.has("dueDate")) updateData.due_date = formData.get("dueDate") as string
    if (formData.has("isCompleted")) updateData.is_completed = formData.get("isCompleted") === "true"

    // Mettre à jour la tâche
    const { error } = await supabase.from("todos").update(updateData).eq("id", id).eq("user_id", user.id)

    if (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error)
      return {
        success: false,
        message: "Une erreur est survenue lors de la mise à jour de la tâche",
      }
    }

    // Revalider les chemins
    revalidatePath("/todos")
    revalidatePath("/admin/todos")

    return {
      success: true,
      message: "Tâche mise à jour avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de la tâche",
    }
  }
}

/**
 * Action serveur pour supprimer une tâche
 * @param id ID de la tâche à supprimer
 * @returns Résultat de l'opération
 */
export async function deleteTodoAction(id: number) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est connecté
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return {
        success: false,
        message: "Vous devez être connecté pour supprimer une tâche",
      }
    }

    // Supprimer la tâche
    const { error } = await supabase.from("todos").delete().eq("id", id).eq("user_id", user.id)

    if (error) {
      console.error("Erreur lors de la suppression de la tâche:", error)
      return {
        success: false,
        message: "Une erreur est survenue lors de la suppression de la tâche",
      }
    }

    // Revalider les chemins
    revalidatePath("/todos")
    revalidatePath("/admin/todos")

    return {
      success: true,
      message: "Tâche supprimée avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression de la tâche",
    }
  }
}
