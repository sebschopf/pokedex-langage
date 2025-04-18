/**
 * Interface représentant une correction dans l'application
 */
export interface Correction {
  id: number
  languageId: number
  correctionText: string
  suggestion: string | null
  field: string | null
  framework: string | null
  status: string
  userId: string | null
  createdAt: string | null
  updatedAt: string | null
}

/**
 * Interface pour les corrections avec le nom du langage
 */
export interface CorrectionWithLanguage extends Correction {
  languageName: string
}

/**
 * Fonction pour ajouter le nom du langage à une correction
 */
export function addLanguageNameToCorrection(correction: Correction, languageName: string): CorrectionWithLanguage {
  return {
    ...correction,
    languageName,
  }
}
