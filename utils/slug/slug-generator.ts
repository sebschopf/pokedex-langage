/**
 * Fonctions utilitaires pour la génération et la gestion des slugs
 */

/**
 * Génère un slug URL-friendly à partir d'une chaîne de caractères
 * @param texte Le texte à convertir en slug
 * @returns Une chaîne en minuscules avec les espaces remplacés par des tirets et les caractères spéciaux supprimés
 */
export function generateSlug(texte: string): string {
  return texte
    .toLowerCase()
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/[^\w-]+/g, "") // Supprime tous les caractères non alphanumériques sauf les tirets
    .replace(/--+/g, "-") // Remplace les tirets multiples par un seul tiret
    .replace(/^-+/, "") // Supprime les tirets au début
    .replace(/-+$/, "") // Supprime les tirets à la fin
}

/**
 * Génère un slug spécifiquement pour les langages de programmation
 * Gère les cas spéciaux comme C++, C#, etc.
 *
 * @param nomLangage Le nom du langage de programmation
 * @returns Un slug URL-friendly pour le langage
 */
export function generateLanguageSlug(nomLangage: string): string {
  // Gestion des cas spéciaux
  const casSpeciaux: Record<string, string> = {
    "C++": "cpp",
    "C#": "csharp",
    "F#": "fsharp",
    "Visual Basic .NET": "vb-net",
    "Objective-C": "objective-c",
    "Objective-C++": "objective-cpp",
    TypeScript: "typescript",
    JavaScript: "javascript",
  }

  // Vérifie si le nom du langage est un cas spécial
  if (casSpeciaux[nomLangage]) {
    return casSpeciaux[nomLangage]
  }

  // Sinon, utilise le générateur de slug standard
  return generateSlug(nomLangage)
}

/**
 * Valide si une chaîne est un slug valide
 * Un slug valide contient uniquement des caractères alphanumériques minuscules et des tirets,
 * et ne commence pas et ne se termine pas par un tiret.
 *
 * @param slug Le slug à valider
 * @returns Vrai si le slug est valide, faux sinon
 */
export function isValidSlug(slug: string): boolean {
  if (!slug) return false

  // Un slug valide correspond à ce modèle :
  // - Commence par une lettre minuscule ou un chiffre
  // - Contient uniquement des lettres minuscules, des chiffres et des tirets
  // - N'a pas de tirets consécutifs
  // - Ne se termine pas par un tiret
  const regexSlugValide = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  return regexSlugValide.test(slug)
}
