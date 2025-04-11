/**
 * Type représentant une correction telle que stockée dans la base de données
 * Correspond exactement à la structure de la table 'corrections' dans Supabase
 */
export type DbCorrection = {
    correction_text: string
    created_at: string | null
    field: string | null
    framework: string | null
    id: number
    language_id: number
    status: string
    suggestion: string | null
    updated_at: string | null
    user_id: string | null
  }
  