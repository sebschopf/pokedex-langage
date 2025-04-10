import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Todo, TodoCategory, TodoStatus } from "@/types"

// Créer un client Supabase pour les composants côté client
export const createSupabaseClient = () => {
  return createClientComponentClient()
}

// Fonctions pour interagir avec les todos
export const todosApi = {
  // Récupérer toutes les tâches de l'utilisateur
  async getTodos() {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des tâches:", error)
      throw error
    }

    return data as Todo[]
  },

  // Récupérer une tâche par son ID
  async getTodoById(id: number) {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.from("todos").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération de la tâche ${id}:`, error)
      throw error
    }

    return data as Todo
  },

  // Créer une nouvelle tâche
  async createTodo(todo: Omit<Todo, "id" | "user_id" | "created_at" | "updated_at">) {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.from("todos").insert([todo]).select().single()

    if (error) {
      console.error("Erreur lors de la création de la tâche:", error)
      throw error
    }

    return data as Todo
  },

  // Mettre à jour une tâche
  async updateTodo(id: number, todo: Partial<Todo>) {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from("todos")
      .update({ ...todo, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Erreur lors de la mise à jour de la tâche ${id}:`, error)
      throw error
    }

    return data as Todo
  },

  // Supprimer une tâche
  async deleteTodo(id: number) {
    const supabase = createClientComponentClient()
    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de la tâche ${id}:`, error)
      throw error
    }

    return true
  },

  // Marquer une tâche comme terminée ou non
  async toggleTodoCompletion(id: number, isCompleted: boolean) {
    return this.updateTodo(id, { is_completed: isCompleted })
  },
}

// Fonctions pour interagir avec les catégories
export const categoriesApi = {
  // Récupérer toutes les catégories
  async getCategories() {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.from("todo_categories").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des catégories:", error)
      throw error
    }

    return data as TodoCategory[]
  },
}

// Fonctions pour interagir avec les statuts
export const statusesApi = {
  // Récupérer tous les statuts
  async getStatuses() {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.from("todo_status").select("*").order("id")

    if (error) {
      console.error("Erreur lors de la récupération des statuts:", error)
      throw error
    }

    return data as TodoStatus[]
  },
}
