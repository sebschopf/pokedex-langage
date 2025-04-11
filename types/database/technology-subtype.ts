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
