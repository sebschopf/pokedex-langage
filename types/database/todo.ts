/**
 * Type représentant une tâche telle que stockée dans la base de données
 * Correspond exactement à la structure de la table 'todos' dans Supabase
 */
export type DbTodo = {
    category_id: number | null
    created_at: string | null
    description: string | null
    due_date: string | null
    id: number
    is_completed: boolean | null
    status_id: number | null
    title: string
    updated_at: string | null
    user_id: string | null
  }
  