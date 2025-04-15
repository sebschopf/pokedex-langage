/**
 * Interface représentant une tâche dans l'application
 */
export interface Todo {
  id: number
  title: string
  description: string
  isCompleted: boolean
  categoryId: number | null
  statusId: number | null
  userId: string | null
  dueDate: string | null
  createdAt: string | null
  updatedAt: string | null
}

/**
 * Interface représentant une catégorie de tâche dans l'application
 */
export interface TodoCategory {
  id: number
  name: string
  color: string
  createdAt: string | null
}

/**
 * Interface représentant un statut de tâche dans l'application
 */
export interface TodoStatus {
  id: number
  name: string
  description: string | null
  createdAt: string | null
}
