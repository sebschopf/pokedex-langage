/**
 * Interface représentant une tâche dans la base de données
 * Correspond exactement à la structure de la table todos dans Supabase
 */
export interface DbTodo {
  id: number
  title: string
  description: string | null
  is_completed: boolean | null
  category_id: number | null
  status_id: number | null
  user_id: string | null
  due_date: string | null
  created_at: string | null
  updated_at: string | null
}
