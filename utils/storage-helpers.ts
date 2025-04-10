import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Types pour les buckets de stockage
export type StorageBucket = "avatars" | "logos" | "images" | "files"

/**
 * Obtient l'URL publique d'un fichier dans un bucket de stockage Supabase
 * @param bucket Le nom du bucket de stockage
 * @param path Le chemin du fichier dans le bucket
 * @returns L'URL publique du fichier
 */
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClientComponentClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Télécharge un fichier dans un bucket de stockage Supabase
 * @param bucket Le nom du bucket de stockage
 * @param path Le chemin où stocker le fichier
 * @param file Le fichier à télécharger
 * @returns Une promesse qui se résout avec les données de téléchargement ou une erreur
 */
export async function uploadFile(bucket: StorageBucket, path: string, file: File) {
  const supabase = createClientComponentClient()
  return await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  })
}

/**
 * Supprime un fichier d'un bucket de stockage Supabase
 * @param bucket Le nom du bucket de stockage
 * @param path Le chemin du fichier à supprimer
 * @returns Une promesse qui se résout avec les données de suppression ou une erreur
 */
export async function deleteFile(bucket: StorageBucket, path: string) {
  const supabase = createClientComponentClient()
  return await supabase.storage.from(bucket).remove([path])
}
