import type { DbTodoStatus } from "@/types/database"
import type { TodoStatus } from "@/types/models"

/**
 * Convertit un objet DbTodoStatus en TodoStatus
 * @param dbStatus Objet de la base de données
 * @returns Objet TodoStatus pour l'application
 */
export function dbToTodoStatus(dbStatus: DbTodoStatus): TodoStatus {
  return {
    id: dbStatus.id,
    name: dbStatus.name,
    description: dbStatus.description,
    createdAt: dbStatus.created_at,
  }
}

/**
 * Convertit un objet TodoStatus en DbTodoStatus
 * @param status Objet de l'application
 * @returns Objet pour la base de données
 */
export function todoStatusToDb(status: Partial<TodoStatus>): Partial<DbTodoStatus> {
  const dbStatus: Partial<DbTodoStatus> = {}

  if (status.id !== undefined) dbStatus.id = status.id
  if (status.name !== undefined) dbStatus.name = status.name
  if (status.description !== undefined) dbStatus.description = status.description
  if (status.createdAt !== undefined) dbStatus.created_at = status.createdAt

  return dbStatus
}
