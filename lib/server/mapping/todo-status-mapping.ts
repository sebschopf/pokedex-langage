import type { DbTodoStatus } from "@/types/database/todo-status"
import type { TodoStatus } from "@/types/models/todo-status"

/**
 * Convertit un objet de statut de tâche de la base de données en objet de statut de tâche pour l'application
 */
export function dbToTodoStatus(dbTodoStatus: DbTodoStatus): TodoStatus {
  return {
    id: dbTodoStatus.id,
    name: dbTodoStatus.name,
    description: dbTodoStatus.description,
    createdAt: dbTodoStatus.created_at,
  }
}

/**
 * Convertit un objet de statut de tâche de l'application en objet de statut de tâche pour la base de données
 */
export function todoStatusToDb(todoStatus: Partial<TodoStatus>): Partial<DbTodoStatus> {
  const dbTodoStatus: Partial<DbTodoStatus> = {}

  if (todoStatus.id !== undefined) dbTodoStatus.id = todoStatus.id
  if (todoStatus.name !== undefined) dbTodoStatus.name = todoStatus.name
  if (todoStatus.description !== undefined) dbTodoStatus.description = todoStatus.description
  if (todoStatus.createdAt !== undefined) dbTodoStatus.created_at = todoStatus.createdAt

  return dbTodoStatus
}
