"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@/lib/supabase/server"

// Types pour les todos
interface Todo {
  id?: number
  title: string
  description?: string | null
  status_id?: number | null
  category_id?: number | null
  user_id?: string | null
  due_date?: string | null
}

/**
 * Crée une nouvelle tâche
 * @param todo Données de la tâche à créer
 * @returns Résultat de l'opération avec la tâche créée en cas de succès
 */
export async function createTodo(todo: Todo) {
  try {
    const supabase = createServerClient()

    // Vérifier les données requises
    if (!todo.title) {
      return {
        success: false,
        message: "Le titre est obligatoire",
      }
    }

    // Insérer la tâche dans la base de données
    const { data, error } = await supabase
      .from("todos")
      .insert({
        title: todo.title,
        description: todo.description || null,
        status_id: todo.status_id || null,
        category_id: todo.category_id || null,
        user_id: todo.user_id || null,
        due_date: todo.due_date || null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Revalider les chemins
    revalidatePath("/todos")

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
 * Met à jour une tâche existante
 * @param id ID de la tâche à mettre à jour
 * @param todo Données de la tâche à mettre à jour
 * @returns Résultat de l'opération avec la tâche mise à jour en cas de succès
 */
export async function updateTodo(id: number, todo: Partial<Todo>) {
  try {
    const supabase = createServerClient()

    // Vérifier que l'ID est valide
    if (!id) {
      return {
        success: false,
        message: "ID de tâche manquant",
      }
    }

    // Mettre à jour la tâche dans la base de données
    const { data, error } = await supabase
      .from("todos")
      .update({
        title: todo.title,
        description: todo.description,
        status_id: todo.status_id,
        category_id: todo.category_id,
        user_id: todo.user_id,
        due_date: todo.due_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Revalider les chemins
    revalidatePath("/todos")
    revalidatePath(`/todos/${id}`)

    return {
      success: true,
      message: "Tâche mise à jour avec succès",
      data,
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
 * Supprime une tâche
 * @param id ID de la tâche à supprimer
 * @returns Résultat de l'opération
 */
export async function deleteTodo(id: number) {
  try {
    const supabase = createServerClient()

    // Vérifier que l'ID est valide
    if (!id) {
      return {
        success: false,
        message: "ID de tâche manquant",
      }
    }

    // Supprimer la tâche de la base de données
    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) {
      throw error
    }

    // Revalider les chemins
    revalidatePath("/todos")

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

/**
 * Marque une tâche comme terminée
 * @param id ID de la tâche à marquer comme terminée
 * @returns Résultat de l'opération
 */
export async function completeTodo(id: number) {
  try {
    const supabase = createServerClient()

    // Récupérer l'ID du statut "terminé"
    const { data: statusData, error: statusError } = await supabase
      .from("todo_status")
      .select("id")
      .eq("name", "Terminé")
      .single()

    if (statusError) {
      throw statusError
    }

    const completedStatusId = statusData.id

    // Mettre à jour le statut de la tâche
    const { data, error } = await supabase
      .from("todos")
      .update({
        status_id: completedStatusId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Revalider les chemins
    revalidatePath("/todos")
    revalidatePath(`/todos/${id}`)

    return {
      success: true,
      message: "Tâche marquée comme terminée",
      data,
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de la tâche:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour du statut de la tâche",
    }
  }
}
