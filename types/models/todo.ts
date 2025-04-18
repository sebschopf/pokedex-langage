/**
 * Interface représentant une tâche dans l'application
 */
export interface Todo {
  id: number
  title: string
  description: string | null
  isCompleted: boolean | null
  categoryId: number | null
  statusId: number | null
  userId: string | null
  dueDate: string | null
  createdAt: string | null
  updatedAt: string | null
  priority: number | null
}

/**
 * Interface représentant une tâche avec des détails supplémentaires
 */
export interface TodoWithDetails extends Todo {
  category?: TodoCategory | null
  status?: TodoStatus | null
  user?: User | null
}

/**
 * Interface représentant une catégorie de tâche
 */
export interface TodoCategory {
  id: number
  name: string
  createdAt?: string | null
}

/**
 * Interface représentant un statut de tâche
 */
export interface TodoStatus {
  id: number
  name: string
  createdAt?: string | null
}

/**
 * Interface simplifiée pour l'utilisateur associé à une tâche
 */
export interface User {
  id: string
  username?: string | null
  avatarUrl?: string | null
}
