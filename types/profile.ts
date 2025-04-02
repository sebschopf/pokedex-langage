// types/profile.ts
export interface Profile {
    id: string;
    username: string | null;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
    
    // Propriétés en snake_case pour la compatibilité avec la base de données
    avatar_url?: string | null;
    created_at?: string;
    updated_at?: string;
  }