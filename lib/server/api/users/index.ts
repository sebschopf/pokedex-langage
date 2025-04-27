/**
 * Point d'entrée pour toutes les fonctions d'API liées aux utilisateurs
 */

// Fonctions liées aux profils
export { getUserProfile, updateUserProfile, createUserProfile, deleteUserProfile } from './profile';

// Fonctions liées à l'authentification
export { updateUserAuth, updateUserProfileWithAuth, getUserAuthInfo } from './auth';

// Fonctions liées aux rôles
export { getUserRole, updateUserRole, hasRole } from './roles';

// Fonctions liées aux détails utilisateur
export { getUserWithDetails, getAllUsersWithDetails, searchUsers } from './details';

// Types
export type { UserWithDetails } from './details';
