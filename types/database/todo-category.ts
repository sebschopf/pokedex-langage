/**
 * Type représentant une catégorie de tâche telle que stockée dans la base de données
 * Correspond exactement à la structure de la table 'todo_categories' dans Supabase
 */
export type DbTodoCategory = {
    color: string
    created_at: string | null
    id: number
    name: string
  }
  