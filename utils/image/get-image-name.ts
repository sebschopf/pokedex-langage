/**
 * Utilitaires pour la gestion des images
 */

/**
 * Normalise le nom d'un langage pour l'utiliser dans un nom de fichier d'image
 * @param name Nom du langage
 * @returns Nom normalisé pour le fichier image
 */
export function getImageName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Vérifie si une URL d'image est valide
 * @param url URL de l'image à vérifier
 * @returns true si l'URL est valide, false sinon
 */
export function isValidImageUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('/images/');
}

/**
 * Génère une URL d'image de secours pour un langage
 * @param name Nom du langage
 * @returns URL de l'image de secours
 */
export function getFallbackImageUrl(name: string): string {
  return `/images/placeholder-${getImageName(name)}.svg`;
}
