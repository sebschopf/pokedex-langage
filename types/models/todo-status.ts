/**
 * Interface représentant un statut de tâche dans l'application
 * Version transformée et normalisée de DbTodoStatus
 */
export interface TodoStatus {
    createdAt: string | null
    description: string | null
    id: number
    name: string
  }
  