import type { DbLanguageProposal } from "@/types/database/language-proposal"
import type { LanguageProposal } from "@/types/models/language-proposal"

/**
 * Convertit un objet de proposition de langage de la base de données en objet pour l'application
 * @param dbLanguageProposal Proposition de langage de la base de données
 * @returns Proposition de langage pour l'application
 */
export function dbToLanguageProposal(dbLanguageProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: dbLanguageProposal.id,
    name: dbLanguageProposal.name,
    description: dbLanguageProposal.description,
    userId: dbLanguageProposal.user_id,
    createdAt: dbLanguageProposal.created_at,
    updatedAt: dbLanguageProposal.updated_at,
    status: dbLanguageProposal.status,
    type: dbLanguageProposal.type,
    createdYear: dbLanguageProposal.created_year,
    creator: dbLanguageProposal.creator,
    usedFor: dbLanguageProposal.used_for,
    strengths: dbLanguageProposal.strengths,
    popularFrameworks: dbLanguageProposal.popular_frameworks,
  }
}

/**
 * Convertit un objet de proposition de langage de l'application en objet pour la base de données
 * @param languageProposal Proposition de langage de l'application
 * @returns Proposition de langage pour la base de données
 */
export function languageProposalToDb(languageProposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  const dbLanguageProposal: Partial<DbLanguageProposal> = {}

  if (languageProposal.id !== undefined) dbLanguageProposal.id = languageProposal.id
  if (languageProposal.name !== undefined) dbLanguageProposal.name = languageProposal.name
  if (languageProposal.description !== undefined) dbLanguageProposal.description = languageProposal.description
  if (languageProposal.userId !== undefined) dbLanguageProposal.user_id = languageProposal.userId
  if (languageProposal.createdAt !== undefined) dbLanguageProposal.created_at = languageProposal.createdAt
  if (languageProposal.updatedAt !== undefined) dbLanguageProposal.updated_at = languageProposal.updatedAt
  if (languageProposal.status !== undefined) dbLanguageProposal.status = languageProposal.status
  if (languageProposal.type !== undefined) dbLanguageProposal.type = languageProposal.type
  if (languageProposal.createdYear !== undefined) dbLanguageProposal.created_year = languageProposal.createdYear
  if (languageProposal.creator !== undefined) dbLanguageProposal.creator = languageProposal.creator
  if (languageProposal.usedFor !== undefined) dbLanguageProposal.used_for = languageProposal.usedFor
  if (languageProposal.strengths !== undefined) dbLanguageProposal.strengths = languageProposal.strengths
  if (languageProposal.popularFrameworks !== undefined)
    dbLanguageProposal.popular_frameworks = languageProposal.popularFrameworks

  return dbLanguageProposal
}
