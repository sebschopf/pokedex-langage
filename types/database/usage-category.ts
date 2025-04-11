/**
 * Type représentant une catégorie d'usage telle que stockée dans la base de données
 * Correspond exactement à la structure de la table 'usage_categories' dans Supabase
 */
export type DbUsageCategory = {
  created_at: string | null
  id: number
  name: string
}
