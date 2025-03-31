//types/language-proposal.ts
export interface LanguageProposal {
    // Propriétés principales (camelCase pour l'utilisation dans l'application)
    id: string | number
    name: string
    type?: string | null
    description?: string | null
    createdYear?: number | null
    creator?: string | null
    usedFor?: string | null
    strengths?: string[] | null
    popularFrameworks?: string[] | null
    userId?: string | null
    status: string
    createdAt?: string | null
    updatedAt?: string | null
  
    // Propriétés en snake_case pour la compatibilité avec la base de données
    created_year?: number | null
    used_for?: string | null
    popular_frameworks?: string[] | null
    user_id?: string | null
    created_at?: string | null
    updated_at?: string | null
  }
  
  