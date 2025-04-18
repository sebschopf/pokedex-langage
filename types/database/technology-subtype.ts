/**
 * Type représentant un sous-type de technologie tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'technology_subtypes' dans Supabase
 */
export type DbTechnologySubtype = {
  category_id: number | null
  created_at: string | null
  id: number
  name: string
}

/**
 * Interface représentant un sous-type de technologie dans l'application
 * Version avec des noms de propriétés en camelCase
 */
export interface TechnologySubtype {
  id: number
  name: string
  categoryId: number | null
  createdAt: string | null
}
