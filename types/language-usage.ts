//types/language-usage.ts
export interface LanguageUsage {
    // Propriétés principales (camelCase pour l'utilisation dans l'application)
    id: string | number
    languageId?: number | null
    categoryId?: number | null
    createdAt?: string | null
  
    // Propriétés en snake_case pour la compatibilité avec la base de données
    language_id?: number | null
    category_id?: number | null
    created_at?: string | null
  }
  
  