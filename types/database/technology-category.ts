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
