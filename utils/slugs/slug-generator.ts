/**
 * Utilitaires pour la génération et validation des slugs
 */

/**
 * Génère un slug à partir d'un nom
 * @param name Nom à convertir en slug
 * @returns Slug généré
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^\w-]+/g, '') // Supprime les caractères non alphanumériques
    .replace(/--+/g, '-') // Remplace les tirets multiples par un seul
    .replace(/^-+/, '') // Supprime les tirets au début
    .replace(/-+$/, '') // Supprime les tirets à la fin
    .replace(/\.+/g, '') // Supprime les points
    .replace(/\/+/g, '-'); // Remplace les slashs par des tirets
}

/**
 * Génère un slug unique en ajoutant un suffixe si nécessaire
 * @param name Nom à convertir en slug
 * @param existingSlugs Liste des slugs existants pour vérifier l'unicité
 * @returns Slug unique généré
 */
export function generateUniqueSlug(name: string, existingSlugs: string[] = []): string {
  const slug = generateSlug(name);
  let counter = 1;

  // Si le slug existe déjà, ajouter un suffixe numérique
  let tempSlug = slug;
  while (existingSlugs.includes(tempSlug)) {
    tempSlug = `${slug}-${counter}`;
    counter++;
  }

  return tempSlug;
}

/**
 * Génère un slug spécifiquement pour un langage de programmation
 * @param name Nom du langage à convertir en slug
 * @returns Slug généré pour le langage
 */
export function generateLanguageSlug(name: string): string {
  return generateSlug(name);
}
