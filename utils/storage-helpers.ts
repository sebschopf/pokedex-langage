import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"
import type { Database } from "@/lib/database-types"

// Types pour les buckets de stockage
export type StorageBucket = "avatars" | "logos" | "frameworks"

/**
 * Télécharge un fichier dans un bucket Supabase
 * @param bucket Le nom du bucket
 * @param file Le fichier à télécharger
 * @param path Chemin personnalisé (optionnel)
 * @returns Le chemin du fichier téléchargé
 */
export async function uploadFile(bucket: StorageBucket, file: File, path?: string): Promise<string> {
  const supabase = createClientComponentClient<Database>()
  
  // Générer un nom de fichier unique si aucun chemin n'est fourni
  const filePath = path || `${uuidv4()}.${file.name.split(".").pop()}`
  
  // Vérifier si le bucket existe, sinon le créer
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExists = buckets?.some(b => b.name === bucket)
  
  if (!bucketExists) {
    await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 1024 * 1024 * 5, // 5MB
    })
  }
  
  // Télécharger le fichier
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true })
  
  if (uploadError) {
    throw uploadError
  }
  
  return filePath
}

/**
 * Télécharge un logo SVG pour un langage de programmation et met à jour la base de données
 * @param languageId L'identifiant du langage
 * @param file Le fichier SVG à télécharger
 * @returns Le chemin du fichier téléchargé
 */
export async function uploadLanguageLogo(languageId: number, file: File): Promise<string> {
  const supabase = createClientComponentClient<Database>()
  
  // Vérifier que le fichier est bien un SVG
  if (file.type !== "image/svg+xml") {
    throw new Error("Le logo doit être au format SVG")
  }
  
  // Créer un nom de fichier unique pour éviter les collisions
  const fileName = `logo_${languageId}_${Date.now()}.svg`
  
  // Télécharger le fichier
  const filePath = await uploadFile("logos", file, fileName)
  
  // Mettre à jour la colonne logo_path dans la table languages
  const { error } = await supabase
    .from("languages")
    .update({ logo_path: filePath })
    .eq("id", languageId)
  
  if (error) {
    // Si la mise à jour échoue, supprimer le fichier téléchargé
    await deleteFile("logos", filePath)
    throw new Error(`Erreur lors de la mise à jour de la base de données: ${error.message}`)
  }
  
  return filePath
}

/**
 * Récupère l'URL publique d'un fichier
 * @param bucket Le nom du bucket
 * @param path Le chemin du fichier
 * @returns L'URL publique du fichier
 */
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClientComponentClient<Database>()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Récupère le chemin du logo d'un langage depuis la base de données
 * @param languageId L'identifiant du langage
 * @returns Le chemin du logo ou null si non trouvé
 */
export async function getLanguageLogoPath(languageId: number): Promise<string | null> {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from("languages")
    .select("logo_path")
    .eq("id", languageId)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return data.logo_path
}

/**
 * Récupère l'URL publique du logo d'un langage
 * @param languageId L'identifiant du langage
 * @returns L'URL publique du logo ou null si non trouvé
 */
export async function getLanguageLogoUrl(languageId: number): Promise<string | null> {
  const logoPath = await getLanguageLogoPath(languageId)
  
  if (!logoPath) {
    return null
  }
  
  return getPublicUrl("logos", logoPath)
}

/**
 * Supprime un fichier d'un bucket
 * @param bucket Le nom du bucket
 * @param path Le chemin du fichier
 */
export async function deleteFile(bucket: StorageBucket, path: string): Promise<void> {
  const supabase = createClientComponentClient<Database>()
  const { error } = await supabase.storage.from(bucket).remove([path])
  
  if (error) {
    throw error
  }
}

/**
 * Supprime le logo d'un langage et met à jour la base de données
 * @param languageId L'identifiant du langage
 */
export async function deleteLanguageLogo(languageId: number): Promise<void> {
  const supabase = createClientComponentClient<Database>()
  
  // Récupérer le chemin du logo
  const logoPath = await getLanguageLogoPath(languageId)
  
  if (!logoPath) {
    return
  }
  
  // Supprimer le fichier
  await deleteFile("logos", logoPath)
  
  // Mettre à jour la base de données
  await supabase
    .from("languages")
    .update({ logo_path: null })
    .eq("id", languageId)
}

/**
 * Liste les fichiers dans un bucket
 * @param bucket Le nom du bucket
 * @param folder Dossier optionnel pour filtrer les résultats
 * @returns Liste des fichiers
 */
export async function listFiles(bucket: StorageBucket, folder?: string): Promise<any[]> {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase.storage.from(bucket).list(folder || "")
  
  if (error) {
    throw error
  }
  
  return data || []
}