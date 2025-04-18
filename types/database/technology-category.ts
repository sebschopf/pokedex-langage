/**
 * Type représentant une catégorie de technologie telle que stockée dans la base de données
 * Correspond exactement à la structure de la table 'technology_categories' dans Supabase
 */
export type DbTechnologyCategory = {
  color: string
  created_at: string | null
  icon_name: string
  id: number
  type: string
}

/**
 * Interface représentant une catégorie de technologie dans l'application
 * Version avec des noms de propriétés en camelCase
 */
export interface TechnologyCategory {
  id: number
  type: string
  color: string
  iconName: string
  createdAt: string | null
}
