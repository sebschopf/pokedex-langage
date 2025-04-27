import type { UserRoleType, UserRoleTypeDB } from '@/lib/client/permissions';

/**
 * Interface représentant un rôle utilisateur dans la base de données
 * Correspond exactement à la structure de la table user_roles dans Supabase
 */
export interface UserRole {
  id: string; // UUID dans Supabase
  role: UserRoleTypeDB; // Utiliser UserRoleTypeDB pour la base de données
  createdAt: string | null;
  updatedAt: string | null;
}

// Réexporter UserRoleType pour faciliter l'importation
export type { UserRoleType, UserRoleTypeDB };
