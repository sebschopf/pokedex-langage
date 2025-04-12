/**
 * Utilitaires pour la gestion du stockage
 */

/**
 * Génère un nom de fichier unique pour le stockage
 * @param originalName Nom original du fichier
 * @returns Nom de fichier unique
 */
export function generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 10)
    const extension = originalName.split(".").pop()
  
    return `${timestamp}-${randomString}.${extension}`
  }
  
  /**
   * Obtient l'URL complète d'un fichier stocké
   * @param path Chemin du fichier
   * @param bucket Bucket de stockage
   * @returns URL complète du fichier
   */
  export function getStorageUrl(path: string, bucket = "default"): string {
    const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || ""
    return `${baseUrl}/${bucket}/${path}`
  }
  
  /**
   * Vérifie si un type de fichier est autorisé
   * @param mimeType Type MIME du fichier
   * @param allowedTypes Types MIME autorisés
   * @returns true si le type est autorisé
   */
  export function isAllowedFileType(
    mimeType: string,
    allowedTypes: string[] = ["image/jpeg", "image/png", "image/gif"],
  ): boolean {
    return allowedTypes.includes(mimeType)
  }
  
  /**
   * Vérifie si la taille d'un fichier est dans les limites
   * @param sizeInBytes Taille du fichier en octets
   * @param maxSizeInMB Taille maximale en Mo
   * @returns true si la taille est dans les limites
   */
  export function isFileSizeValid(sizeInBytes: number, maxSizeInMB = 5): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    return sizeInBytes <= maxSizeInBytes
  }
  