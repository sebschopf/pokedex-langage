import type { DbTodoCategory } from "@/types/database"
import type { TodoCategory } from "@/types/models"

/**
 * Convertit un objet DbTodoCategory en TodoCategory
 * @param dbCategory Objet de la base de données
 * @returns Objet TodoCategory pour l'application
 */
export function dbToTodoCategory(dbCategory: DbTodoCategory): TodoCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    color: dbCategory.color,
    createdAt: dbCategory.created_at,
  }
}

/**
 * Convertit un objet TodoCategory en DbTodoCategory
 * @param category Objet de l'application
 * @returns Objet pour la base de données
 */
export function todoCategoryToDb(category: Partial<TodoCategory>): Partial<DbTodoCategory> {
  const dbCategory: Partial<DbTodoCategory> = {}

  if (category.id !== undefined) dbCategory.id = category.id
  if (category.name !== undefined) dbCategory.name = category.name
  if (category.color !== undefined) dbCategory.color = category.color
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt

  return dbCategory
}
