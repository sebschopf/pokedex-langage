//types/usage-category.ts
export interface UsageCategory {
    // Propriétés principales (camelCase pour l'utilisation dans l'application)
    id: string | number
    name: string
    createdAt?: string | null
  
    // Propriétés en snake_case pour la compatibilité avec la base de données
    created_at?: string | null
  }
  
  