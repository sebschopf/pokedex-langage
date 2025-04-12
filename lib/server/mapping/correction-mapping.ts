import type { DbCorrection } from "@/types/database/correction"
import type { Correction } from "@/types/models/correction"
import { toNumber, toString } from "@/utils/conversion/type-conversion"

/**
 * Convertit un objet DbCorrection en Correction
 * @param dbCorrection Objet de la base de données
 * @returns Objet Correction pour l'application
 */
export function dbToCorrection(dbCorrection: DbCorrection): Correction {
  return {
    id: toNumber(dbCorrection.id),
    correctionText: toString(dbCorrection.correction_text),
    createdAt: dbCorrection.created_at,
    field: dbCorrection.field,
    framework: dbCorrection.framework,
    languageId: toNumber(dbCorrection.language_id),
    status: toString(dbCorrection.status),
    suggestion: dbCorrection.suggestion,
    updatedAt: dbCorrection.updated_at,
    userId: dbCorrection.user_id,
  }
}

/**
 * Convertit un objet Correction en DbCorrection
 * @param correction Objet de l'application
 * @returns Objet pour la base de données
 */
export function correctionToDb(correction: Partial<Correction>): Partial<DbCorrection> {
  const dbCorrection: Partial<DbCorrection> = {}

  if (correction.id !== undefined) dbCorrection.id = correction.id
  if (correction.correctionText !== undefined) dbCorrection.correction_text = correction.correctionText
  if (correction.createdAt !== null) dbCorrection.created_at = correction.createdAt
  if (correction.field !== undefined) dbCorrection.field = correction.field
  if (correction.framework !== undefined) dbCorrection.framework = correction.framework
  if (correction.languageId !== undefined) dbCorrection.language_id = correction.languageId
  if (correction.status !== undefined) dbCorrection.status = correction.status
  if (correction.suggestion !== undefined) dbCorrection.suggestion = correction.suggestion
  if (correction.updatedAt !== undefined) dbCorrection.updated_at = correction.updatedAt
  if (correction.userId !== undefined) dbCorrection.user_id = correction.userId

  return dbCorrection
}
