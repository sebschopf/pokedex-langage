import type { DbUsageCategory } from "@/types/database/usage-category"
import type { UsageCategory } from "@/types/models/usage-category"

/**
 * Convertit un objet de catégorie d'usage de la base de données en objet de catégorie d'usage pour l'application
 */
export function dbToUsageCategory(dbUsageCategory: DbUsageCategory): UsageCategory {
  return {
    id: dbUsageCategory.id,
    name: dbUsageCategory.name,
    createdAt: dbUsageCategory.created_at,
  }
}

/**
 * Convertit un objet de catégorie d'usage de l'application en objet de catégorie d'usage pour la base de données
 */
export function usageCategoryToDb(usageCategory: Partial<UsageCategory>): Partial<DbUsageCategory> {
  const dbUsageCategory: Partial<DbUsageCategory> = {}

  if (usageCategory.id !== undefined) dbUsageCategory.id = usageCategory.id
  if (usageCategory.name !== undefined) dbUsageCategory.name = usageCategory.name
  if (usageCategory.createdAt !== undefined) dbUsageCategory.created_at = usageCategory.createdAt

  return dbUsageCategory
}
