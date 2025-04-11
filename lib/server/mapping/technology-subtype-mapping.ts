import type { DbTechnologySubtype } from "@/types/database"
import type { TechnologySubtype } from "@/types/models"

/**
 * Convertit un objet DbTechnologySubtype en TechnologySubtype
 * @param dbSubtype Objet de la base de données
 * @returns Objet TechnologySubtype pour l'application
 */
export function dbToTechnologySubtype(dbSubtype: DbTechnologySubtype): TechnologySubtype {
  return {
    id: dbSubtype.id,
    categoryId: dbSubtype.category_id,
    createdAt: dbSubtype.created_at,
    name: dbSubtype.name,
  }
}

/**
 * Convertit un objet TechnologySubtype en DbTechnologySubtype
 * @param subtype Objet de l'application
 * @returns Objet pour la base de données
 */
export function technologySubtypeToDb(subtype: Partial<TechnologySubtype>): Partial<DbTechnologySubtype> {
  const dbSubtype: Partial<DbTechnologySubtype> = {}

  if (subtype.id !== undefined) dbSubtype.id = subtype.id
  if (subtype.categoryId !== undefined) dbSubtype.category_id = subtype.categoryId
  if (subtype.createdAt !== undefined) dbSubtype.created_at = subtype.createdAt
  if (subtype.name !== undefined) dbSubtype.name = subtype.name

  return dbSubtype
}
