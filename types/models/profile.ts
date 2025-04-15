/**
 * Interface représentant un profil utilisateur dans l'application
 * Version transformée et normalisée de DbProfile
 */
export interface Profile {
  id: string // Garder comme string pour correspondre à DbProfile
  username: string | null
  fullName: string | null
  avatarUrl: string | null
  bio: string | null
  website: string | null
  createdAt: string | null
  updatedAt: string | null
}
