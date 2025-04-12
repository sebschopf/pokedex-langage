/**
 * Fichier contenant des fonctions utilitaires pour travailler avec Supabase
 */
import { createClientSupabaseClient } from "@/lib/client/supabase"

/**
 * Gère les erreurs Supabase de manière standardisée
 * @param error L'erreur Supabase
 * @param defaultMessage Message par défaut si l'erreur n'a pas de message
 * @returns Un message d'erreur formaté
 */
export function handleSupabaseError(error: any, defaultMessage = "Une erreur est survenue"): string {
  if (!error) return defaultMessage

  // Vérifier si c'est une erreur Supabase avec un message
  if (error.message) return error.message

  // Vérifier si c'est une erreur avec un code et des détails
  if (error.code && error.details) {
    return `Erreur ${error.code}: ${error.details}`
  }

  // Fallback pour tout autre type d'erreur
  return defaultMessage
}

/**
 * Vérifie si un bucket existe et le crée si nécessaire
 * @param bucketName Nom du bucket à vérifier/créer
 * @returns true si le bucket existe ou a été créé, false sinon
 */
export async function ensureBucketExists(bucketName: string): Promise<boolean> {
  try {
    const supabase = createClientSupabaseClient()

    // Vérifier si le bucket existe
    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) throw error

    // Vérifier si le bucket existe dans la liste
    const bucketExists = buckets.some((bucket) => bucket.name === bucketName)

    if (!bucketExists) {
      // Créer le bucket s'il n'existe pas
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: false, // Définir sur true si vous voulez que les fichiers soient publics par défaut
      })

      if (createError) throw createError
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la vérification/création du bucket ${bucketName}:`, error)
    return false
  }
}

/**
 * Génère une URL publique pour un fichier dans un bucket
 * @param bucketName Nom du bucket
 * @param filePath Chemin du fichier dans le bucket
 * @returns URL publique ou null en cas d'erreur
 */
export function getPublicFileUrl(bucketName: string, filePath: string): string | null {
  try {
    const supabase = createClientSupabaseClient()
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL publique:", error)
    return null
  }
}
