import type { DbTechnologySubtype, TechnologySubtype } from "@/types/database/technology-subtype"

/**
 * Convertit un sous-type de technologie de la base de données en modèle d'application
 * @param dbSubtype Sous-type de technologie de la base de données
 * @returns Sous-type de technologie pour l'application
 */
export function dbToTechnologySubtype(dbSubtype: DbTechnologySubtype): TechnologySubtype {
  return {
    id: dbSubtype.id,
    name: dbSubtype.name,
    categoryId: dbSubtype.category_id,
    createdAt: dbSubtype.created_at,
  }
}

/**
 * Convertit un modèle d'application en sous-type de technologie pour la base de données
 * @param subtype Sous-type de technologie pour l'application
 * @returns Sous-type de technologie pour la base de données
 */
export function technologySubtypeToDb(subtype: TechnologySubtype): DbTechnologySubtype {
  return {
    id: subtype.id,
    name: subtype.name,
    category_id: subtype.categoryId,
    created_at: subtype.createdAt,
  }
}
