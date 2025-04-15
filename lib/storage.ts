import { createServerSupabaseClient } from "@/lib/server/supabase/client"
import { v4 as uuidv4 } from "uuid"

/**
 * Télécharge un fichier SVG vers le stockage Supabase
 * @param file Fichier à télécharger
 * @param bucket Nom du bucket (par défaut: 'logos')
 * @returns URL publique du fichier ou null en cas d'erreur
 */
export async function uploadFile(file: File, bucket = "logos"): Promise<string | null> {
  try {
    const supabase = createServerSupabaseClient()

    // Vérifier si c'est un SVG
    const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")

    // Générer un nom de fichier unique
    const fileExt = file.name.split(".").pop() || (isSvg ? "svg" : "png")
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`

    // Options pour le téléchargement
    const options = {
      contentType: isSvg ? "image/svg+xml" : file.type,
    }

    // Télécharger le fichier
    const { error } = await supabase.storage.from(bucket).upload(filePath, file, options)

    if (error) {
      console.error("Erreur lors du téléchargement du fichier:", error)
      return null
    }

    // Obtenir l'URL publique
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier:", error)
    return null
  }
}

/**
 * Supprime un fichier du stockage Supabase
 * @param url URL du fichier à supprimer
 * @param bucket Nom du bucket (par défaut: 'logos')
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteFile(url: string, bucket = "logos"): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Extraire le nom du fichier de l'URL
    const fileName = url.split("/").pop()

    if (!fileName) {
      console.error("Nom de fichier invalide:", url)
      return false
    }

    const { error } = await supabase.storage.from(bucket).remove([fileName])

    if (error) {
      console.error("Erreur lors de la suppression du fichier:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier:", error)
    return false
  }
}
