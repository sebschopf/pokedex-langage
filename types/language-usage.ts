//types/language-usage.ts
export interface LanguageUsage {
  // Propriétés principales (camelCase pour l'utilisation dans l'application)
  id: string
  languageId?: number | null // Changé de string à number pour correspondre à la base de données
  categoryId?: number | null // Changé de string à number pour correspondre à la base de données
  createdAt?: string | null

  // Propriétés en snake_case pour la compatibilité avec la base de données
  language_id?: number | null // Changé de string à number
  category_id?: number | null // Changé de string à number
  created_at?: string | null
}

