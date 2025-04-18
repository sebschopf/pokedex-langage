/**
 * Interface représentant une tâche dans la base de données
 * Correspond exactement à la structure de la table todos dans Supabase
 */
export interface DbTodo {
  id: number
  title: string
  description: string | null
  is_completed: boolean | null
  status_id: number | null
  category_id: number | null
  user_id: string | null
  due_date: string | null
  created_at: string | null
  updated_at: string | null
}

/**
 * Interface représentant un utilisateur dans la base de données
 * Cette interface est utilisée pour les relations avec les tâches
 */
export interface DbUser {
  id: string
  username: string | null
  avatar_url: string | null
}
