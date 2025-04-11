/**
 * Interface représentant une bibliothèque/framework dans l'application
 * Version transformée et normalisée de DbLibrary
 */
export interface Library {
    bestFor: string | null
    createdAt: string | null
    description: string | null
    documentationUrl: string | null
    features: string[] | null
    githubUrl: string | null
    id: number
    isOpenSource: boolean | null
    languageId: number | null
    logoPath: string | null
    name: string
    officialWebsite: string | null
    popularity: number | null
    subtype: string | null // Notez que c'est "subtype" sans underscore
    technologyType: string | null
    uniqueSellingPoint: string | null
    updatedAt: string | null
    usedFor: string | null // C'est une chaîne, pas un tableau
    version: string | null
  }
  