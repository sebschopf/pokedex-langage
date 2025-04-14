/**
 * Convertit un nom de langage en nom d'image valide
 * @param name Nom du langage
 * @returns Nom d'image normalisé
 */
export function getImageName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}