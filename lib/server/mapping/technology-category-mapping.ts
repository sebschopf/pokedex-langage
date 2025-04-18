import type { DbTechnologyCategory, } from "@/types/database/technology-category"
import type { TechnologyCategory, } from "@/types/models/technology-category"
/**
 * Convertit une catégorie de technologie de la base de données en modèle d'application
 * @param dbCategory Catégorie de technologie de la base de données
 * @returns Catégorie de technologie pour l'application
 */
export function dbToTechnologyCategory(dbCategory: DbTechnologyCategory): TechnologyCategory {
  return {
    id: dbCategory.id,
    type: dbCategory.type,
    color: dbCategory.color,
    iconName: dbCategory.icon_name,
    createdAt: dbCategory.created_at,
  }
}

/**
 * Convertit un modèle d'application en catégorie de technologie pour la base de données
 * @param category Catégorie de technologie pour l'application
 * @returns Catégorie de technologie pour la base de données
 */
export function technologyCategoryToDb(category: TechnologyCategory): DbTechnologyCategory {
  return {
    id: category.id,
    type: category.type,
    color: category.color,
    icon_name: category.iconName,
    created_at: category.createdAt,
  }
}
