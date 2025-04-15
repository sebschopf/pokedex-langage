/**
 * Interface représentant un utilisateur dans l'application
 * Combine les informations de profil et d'authentification
 */
export interface User {
    id: string
    email: string
    username: string | null
    fullName: string | null
    avatarUrl: string | null
    bio: string | null
    website: string | null
    isVerified: boolean | false
    createdAt: string | null
    updatedAt: string | null
  }
  