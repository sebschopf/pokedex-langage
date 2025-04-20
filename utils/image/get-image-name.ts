/**
 * Normalise le nom d'un langage pour l'utiliser dans un nom de fichier d'image
 */
export function getImageName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

/**
 * Vérifie si une URL d'image est valide
 */
export function isValidImageUrl(url: string): boolean {
  return url.startsWith("http") || url.startsWith("/images/")
}
