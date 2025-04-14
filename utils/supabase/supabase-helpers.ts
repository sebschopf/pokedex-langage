/**
 * Vérifie si une erreur Supabase est une erreur de contrainte unique
 * @param error Erreur Supabase
 * @returns true si c'est une erreur de contrainte unique
 */
export function isUniqueConstraintError(error: any): boolean {
  return error?.code === "23505"
}

/**
 * Vérifie si une erreur Supabase est une erreur de contrainte de clé étrangère
 * @param error Erreur Supabase
 * @returns true si c'est une erreur de contrainte de clé étrangère
 */
export function isForeignKeyConstraintError(error: any): boolean {
  return error?.code === "23503"
}

/**
 * Formate un message d'erreur Supabase pour l'affichage
 * @param error Erreur Supabase
 * @returns Message d'erreur formaté
 */
export function formatSupabaseErrorMessage(error: any): string {
  if (!error) return "Une erreur inconnue est survenue"

  if (isUniqueConstraintError(error)) {
    return "Cette entrée existe déjà"
  }

  if (isForeignKeyConstraintError(error)) {
    return "Cette opération fait référence à une entrée qui n'existe pas"
  }

  return error.message || "Une erreur est survenue"
}

/**
 * Gère une erreur Supabase et retourne une valeur par défaut
 * @param error Erreur Supabase
 * @param defaultValue Valeur par défaut à retourner
 * @returns Valeur par défaut
 */
export function handleSupabaseError<T>(error: any, defaultValue: T): T {
  if (error) {
    console.error("Erreur Supabase:", formatSupabaseErrorMessage(error), error)
  }
  return defaultValue
}

/**
 * Obtient l'URL publique d'un fichier stocké dans Supabase
 * @param bucket Nom du bucket
 * @param path Chemin du fichier
 * @returns URL publique du fichier
 */
export function getPublicFileUrl(bucket: string, path: string): string {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!storageUrl) return ""

  return `${storageUrl}/storage/v1/object/public/${bucket}/${path}`
}
