// Réexporter les fonctions d'API
export * from "./api"

// Réexporter les fonctions de mapping
export * from "./mapping"

// Réexporter les fonctions de stockage
export * from "./storage"

// Réexporter les fonctions d'authentification avec des alias pour éviter les conflits
export {
  hasRole as hasRoleAuth,
  // Suppression de getCurrentUserRole s'il n'existe pas dans ./auth
  requireAuthSC,
  requireRoleSC,
  requireAdminSC,
  requireValidatorSC,
  requireVerifiedSC,
} from "./auth"

// Réexporter les fonctions Supabase depuis le bon chemin
export { createServerClient, createAdminClient } from "@/lib/supabase"
