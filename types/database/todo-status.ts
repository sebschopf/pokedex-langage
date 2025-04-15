/**
 * Interface représentant un statut de tâche dans la base de données
 * Correspond exactement à la structure de la table todo_status dans Supabase
 */
export interface DbTodoStatus {
  id: number
  name: string
  description: string | null
  created_at: string | null
}
