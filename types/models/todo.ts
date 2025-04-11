/**
 * Interface représentant une tâche dans l'application
 * Version transformée et normalisée de DbTodo
 */
export interface Todo {
    categoryId: number | null
    createdAt: string | null
    description: string | null
    dueDate: string | null
    id: number
    isCompleted: boolean | null
    statusId: number | null
    title: string
    updatedAt: string | null
    userId: string | null
  }
  