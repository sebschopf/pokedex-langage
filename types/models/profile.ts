/**
 * Interface représentant un profil utilisateur dans l'application
 * Version transformée et normalisée de DbProfile
 */
export interface Profile {
  id: string
  email: string // Toujours présent dans l'application après transformation
  username: string | null
  fullName: string | null
  avatarUrl: string | null
  bio: string | null
  website: string | null
  isVerified: boolean | null
  createdAt: string | null
  updatedAt: string | null
}
