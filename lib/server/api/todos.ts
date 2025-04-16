import { createServerClient } from "../../supabase/"
import { dbToTodo, dbToTodoCategory, dbToTodoStatus } from "../mapping/todo-mapping"
import type { Todo, TodoCategory, TodoStatus } from "@/types/models"

/**
 * Récupère toutes les tâches de l'utilisateur actuel
 * @returns Liste des tâches triées par date d'échéance
 */
export async function getUserTodos(): Promise<Todo[]> {
  try {
    const supabase = createServerClient()

    // Récupérer l'utilisateur actuel
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return []

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", session.user.id)
      .order("due_date", { ascending: true })

    if (error) {
      console.error("Erreur lors de la récupération des tâches:", error)
      return []
    }

    return data.map(dbToTodo)
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error)
    return []
  }
}

/**
 * Récupère toutes les catégories de tâches
 * @returns Liste des catégories triées par nom
 */
export async function getTodoCategories(): Promise<TodoCategory[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("todo_categories").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des catégories:", error)
      return []
    }

    return data.map(dbToTodoCategory)
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error)
    return []
  }
}

/**
 * Récupère tous les statuts de tâches
 * @returns Liste des statuts triés par nom
 */
export async function getTodoStatuses(): Promise<TodoStatus[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("todo_status").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des statuts:", error)
      return []
    }

    return data.map(dbToTodoStatus)
  } catch (error) {
    console.error("Erreur lors de la récupération des statuts:", error)
    return []
  }
}

/**
 * Crée une nouvelle tâche
 * @param todo Données de la tâche à créer
 * @returns La tâche créée ou null en cas d'erreur
 */
export async function createTodo(todo: Omit<Todo, "id" | "createdAt" | "updatedAt">): Promise<Todo | null> {
  try {
    const supabase = createServerClient()

    // Récupérer l'utilisateur actuel
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return null

    const newTodo = {
      ...todo,
      user_id: session.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("todos").insert(newTodo).select().single()

    if (error) {
      console.error("Erreur lors de la création de la tâche:", error)
      return null
    }

    return dbToTodo(data)
  } catch (error) {
    console.error("Erreur lors de la création de la tâche:", error)
    return null
  }
}

/**
 * Met à jour une tâche existante
 * @param id ID de la tâche à mettre à jour
 * @param todo Données partielles de la tâche à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateTodo(id: number, todo: Partial<Todo>): Promise<boolean> {
  try {
    const supabase = createServerClient()

    const { error } = await supabase
      .from("todos")
      .update({
        ...todo,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour de la tâche avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la tâche avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime une tâche
 * @param id ID de la tâche à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteTodo(id: number): Promise<boolean> {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de la tâche avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression de la tâche avec l'ID ${id}:`, error)
    return false
  }
}
