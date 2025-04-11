/**
 * Type représentant un statut de tâche tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'todo_status' dans Supabase
 */
export type DbTodoStatus = {
    created_at: string | null
    description: string | null
    id: number
    name: string
  }
  