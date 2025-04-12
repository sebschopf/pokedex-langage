/**
 * Interface représentant une correction dans l'application
 * Version transformée et normalisée de DbCorrection
 */
export interface Correction {
    id: number
    correctionText: string
    createdAt: string| null
    field: string | null
    framework: string | null
    languageId: number
    status: string
    suggestion: string | null
    updatedAt:number
    userId: string | null;
    // Champ optionnel pour stocker le nom du langage lors des jointures
    languageName?: string
  }
  