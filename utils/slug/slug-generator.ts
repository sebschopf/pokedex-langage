/**
 * Utilitaires pour la génération et validation de slugs
 */

/**
 * Génère un slug à partir d'un nom
 * @param name Nom à convertir en slug
 * @returns Slug généré
 */
export function generateSlug(name: string): string {
  if (!name) return ""

  // Mappings spécifiques pour les langages avec caractères spéciaux
  const specialCases: Record<string, string> = {
    "C#": "csharp",
    "C++": "cpp",
    "F#": "fsharp",
    "Visual Basic .NET": "vbnet",
    ".NET": "dotnet",
    "Objective-C": "objective-c",
    "Objective-C++": "objective-cpp",
    "T-SQL": "tsql",
    "PL/SQL": "plsql",
    "ASP.NET": "aspnet",
    TypeScript: "typescript",
    JavaScript: "javascript",
    "Visual Basic": "vb",
  }

  // Vérifier si le nom est un cas spécial
  if (specialCases[name]) {
    return specialCases[name]
  }

  // Sinon, générer un slug standard
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Supprimer les caractères spéciaux
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-") // Éviter les tirets multiples
    .replace(/^-+|-+$/g, "") // Supprimer les tirets au début et à la fin
}

/**
 * Vérifie si un slug est valide
 * @param slug Slug à vérifier
 * @returns true si le slug est valide
 */
export function isValidSlug(slug: string): boolean {
  if (!slug) return false

  // Un slug valide ne contient que des lettres minuscules, des chiffres et des tirets
  // et ne commence ni ne finit par un tiret
  const validSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return validSlugRegex.test(slug)
}
