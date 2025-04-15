/**
 * Interface représentant une catégorie de tâche dans la base de données
 * Correspond exactement à la structure de la table todo_categories dans Supabase
 */
export interface DbTodoCategory {
  id: number
  name: string
  color: string
  created_at: string | null
}
