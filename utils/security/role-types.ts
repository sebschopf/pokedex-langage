/**
 * Types et interfaces liés aux rôles utilisateurs
 */

// Type pour les rôles stockés en base de données (correspond exactement à l'enum PostgreSQL)
export type UserRoleTypeDB = 'admin' | 'validator' | 'verified' | 'registered';

// Type étendu pour l'application qui inclut "anonymous" pour les utilisateurs non connectés
export type UserRoleType = UserRoleTypeDB | 'anonymous';

// Structure de la hiérarchie des rôles
export interface RoleHierarchy {
  [role: string]: number;
}

// Définition de la hiérarchie des rôles avec leurs valeurs numériques
export const ROLE_HIERARCHY: RoleHierarchy = {
  admin: 100,
  validator: 50,
  verified: 20,
  registered: 10,
  anonymous: 0,
};
