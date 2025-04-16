"use server"

import { uploadFile, deleteFile } from "@/lib/server/storage"

/**
 * Action serveur pour télécharger un fichier
 * @param formData FormData contenant le fichier à télécharger
 * @returns Résultat de l'opération avec l'URL du fichier en cas de succès
 */
export async function uploadFileAction(formData: FormData) {
  try {
    const file = formData.get("file") as File
    const bucket = (formData.get("bucket") as string) || "logos"

    if (!file) {
      return {
        success: false,
        message: "Aucun fichier fourni",
      }
    }

    // Vérifier si c'est un SVG
    const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")

    // Vérifier le type de fichier
    if (!isSvg && !file.type.startsWith("image/")) {
      return {
        success: false,
        message: "Seuls les fichiers image sont autorisés",
      }
    }

    const url = await uploadFile(file, bucket)

    if (!url) {
      return {
        success: false,
        message: "Erreur lors du téléchargement du fichier",
      }
    }

    return {
      success: true,
      message: "Fichier téléchargé avec succès",
      url,
    }
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors du téléchargement du fichier",
    }
  }
}

/**
 * Action serveur pour supprimer un fichier
 * @param url URL du fichier à supprimer
 * @param bucket Nom du bucket (par défaut: 'logos')
 * @returns Résultat de l'opération
 */
export async function deleteFileAction(url: string, bucket = "logos") {
  try {
    const success = await deleteFile(url, bucket)

    if (!success) {
      return {
        success: false,
        message: "Erreur lors de la suppression du fichier",
      }
    }

    return {
      success: true,
      message: "Fichier supprimé avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression du fichier",
    }
  }
}
