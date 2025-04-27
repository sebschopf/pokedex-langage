import type { DbCorrection } from '@/types/database/correction';
import type { Correction, CorrectionWithLanguage } from '@/types/models/correction';

/**
 * Convertit une correction de la base de données en modèle d'application
 * @param dbCorrection Correction de la base de données
 * @returns Correction pour l'application
 */
export function dbToCorrection(
  dbCorrection: DbCorrection & { languages?: { name: string } },
): Correction {
  const correction: Correction = {
    id: dbCorrection.id,
    languageId: dbCorrection.language_id,
    correctionText: dbCorrection.correction_text,
    suggestion: dbCorrection.suggestion,
    field: dbCorrection.field,
    framework: dbCorrection.framework,
    status: dbCorrection.status,
    userId: dbCorrection.user_id,
    createdAt: dbCorrection.created_at,
    updatedAt: dbCorrection.updated_at,
  };

  return correction;
}

/**
 * Convertit un modèle d'application en correction pour la base de données
 * @param correction Correction pour l'application
 * @returns Correction pour la base de données
 */
export function correctionToDb(correction: Correction): DbCorrection {
  return {
    id: correction.id,
    language_id: correction.languageId,
    correction_text: correction.correctionText,
    suggestion: correction.suggestion,
    field: correction.field,
    framework: correction.framework,
    status: correction.status,
    user_id: correction.userId,
    created_at: correction.createdAt,
    updated_at: correction.updatedAt,
  };
}

/**
 * Crée une correction avec le nom du langage
 * @param dbCorrection Correction de la base de données
 * @param languageName Nom du langage
 * @returns Correction avec le nom du langage
 */
export function dbToCorrectionWithLanguage(
  dbCorrection: DbCorrection,
  languageName: string,
): CorrectionWithLanguage {
  const correction = dbToCorrection(dbCorrection);
  return {
    ...correction,
    languageName,
  };
}
