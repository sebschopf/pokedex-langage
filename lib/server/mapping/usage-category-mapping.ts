import type { DbUsageCategory } from "@/types/database"
import type { UsageCategory } from "@/types/models"

/**
 * Convertit un objet DbUsageCategory en UsageCategory
 * @param dbCategory Objet de la base de données
 * @returns Objet UsageCategory pour l'application
 */
export function dbToUsageCategory(dbCategory: DbUsageCategory): UsageCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    createdAt: dbCategory.created_at,
  }
}

/**
 * Convertit un objet UsageCategory en DbUsageCategory
 * @param category Objet de l'application
 * @returns Objet pour la base de données
 */
export function usageCategoryToDb(category: Partial<UsageCategory>): Partial<DbUsageCategory> {
  const dbCategory: Partial<DbUsageCategory> = {}

  if (category.id !== undefined) dbCategory.id = category.id
  if (category.name !== undefined) dbCategory.name = category.name
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt

  return dbCategory
}
