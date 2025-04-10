/**
 * lib/index.ts
 *
 * Point d'entrée central pour toutes les fonctions et utilitaires de la bibliothèque
 */

// Exports des fonctions API
export {
    getLanguageBySlug,
    getFrameworksByLanguageId,
    clearFrameworksCache,
    type FrameworkFilterOptions,
  } from "./api"
  
  // Exports des utilitaires
  export * from "./utils"
  
  // Exports des fonctions Supabase
  export {
    createSupabaseClient,
    createClientSupabaseClient,
    createServerSupabaseClient,
    createAdminSupabaseClient,
  } from "./supabase"
  export { createServerComponentSupabaseClient } from "./supabase-server"
  
  // Exports des fonctions d'authentification
  export { withTokenRefresh } from "./auth-helpers"
  
  // Exports des fonctions de session
  export {
    requireAuth,
    requireRole,
  } from "./session"
  
  // Exports des fonctions de sécurité
  export { logSecurityEvent } from "./security-logger"
  
  // Exports des fonctions de gestion des sessions
  export { limitActiveSessions } from "./session-manager"
  
  // Exports des clients API
  export {
    todosApi,
    categoriesApi,
    statusesApi,
  } from "./supabase-client"
  