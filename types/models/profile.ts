/**
 * Interface représentant un profil utilisateur dans l'application
 * Version transformée et normalisée de DbProfile
 */
export interface Profile {
    avatarUrl: string | null
    bio: string | null
    createdAt: string | null
    fullName: string | null
    id: string
    updatedAt: string | null
    username: string | null
    website: string | null
  }
  