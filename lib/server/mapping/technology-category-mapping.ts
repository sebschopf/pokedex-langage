import type { DbTechnologyCategory } from "@/types/database"
import type { TechnologyCategory } from "@/types/models"

/**
 * Convertit un objet DbTechnologyCategory en TechnologyCategory
 * @param dbCategory Objet de la base de données
 * @returns Objet TechnologyCategory pour l'application
 */
export function dbToTechnologyCategory(dbCategory: DbTechnologyCategory): TechnologyCategory {
  return {
    id: dbCategory.id,
    color: dbCategory.color,
    createdAt: dbCategory.created_at,
    iconName: dbCategory.icon_name,
    type: dbCategory.type,
  }
}

/**
 * Convertit un objet TechnologyCategory en DbTechnologyCategory
 * @param category Objet de l'application
 * @returns Objet pour la base de données
 */
export function technologyCategoryToDb(category: Partial<TechnologyCategory>): Partial<DbTechnologyCategory> {
  const dbCategory: Partial<DbTechnologyCategory> = {}

  if (category.id !== undefined) dbCategory.id = category.id
  if (category.color !== undefined) dbCategory.color = category.color
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt
  if (category.iconName !== undefined) dbCategory.icon_name = category.iconName
  if (category.type !== undefined) dbCategory.type = category.type

  return dbCategory
}
