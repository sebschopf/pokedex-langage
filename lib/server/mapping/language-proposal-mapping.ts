import type { DbLanguageProposal } from "@/types/database/language-proposal"
import type { LanguageProposal } from "@/types/models/language-proposal"
import { toNumber, toString } from "@/utils/conversion/type-conversion"

/**
 * Convertit un objet DbLanguageProposal en LanguageProposal
 * @param dbProposal Objet de la base de données
 * @returns Objet LanguageProposal pour l'application
 */
export function dbToLanguageProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: toNumber(dbProposal.id),
    name: toString(dbProposal.name),
    description: toString(dbProposal.description),
    createdAt: dbProposal.created_at,
    updatedAt: dbProposal.updated_at,
    status: toString(dbProposal.status),
    userId: dbProposal.user_id,
    createdYear: dbProposal.created_year,
    creator : dbProposal.creator,
    popularFrameworks: dbProposal.popular_frameworks,
    strengths: dbProposal.strengths,
    type: dbProposal.type,
    usedFor: dbProposal.used_for,
  }
}

/**
 * Convertit un objet LanguageProposal en DbLanguageProposal
 * @param proposal Objet de l'application
 * @returns Objet pour la base de données
 */
export function languageProposalToDb(proposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  const dbProposal: Partial<DbLanguageProposal> = {}

  if (proposal.id !== undefined) dbProposal.id = proposal.id
  if (proposal.name !== undefined) dbProposal.name = proposal.name
  if (proposal.description !== undefined) dbProposal.description = proposal.description
  if (proposal.createdAt !== undefined) dbProposal.created_at = proposal.createdAt
  if (proposal.updatedAt !== undefined) dbProposal.updated_at = proposal.updatedAt
  if (proposal.status !== undefined) dbProposal.status = proposal.status
  if (proposal.userId !== undefined) dbProposal.user_id = proposal.userId
  if (proposal.createdYear !==undefined) dbProposal.created_year = proposal.createdYear
  if (proposal.creator !== undefined) dbProposal.creator = proposal.creator
  if (proposal.popularFrameworks !== undefined) dbProposal.popular_frameworks = proposal.popularFrameworks
  if (proposal.strengths !== undefined) dbProposal.strengths = proposal.strengths
  if (proposal.type !== undefined) dbProposal.type = proposal.type
  if (proposal.usedFor !== undefined) dbProposal.used_for = proposal.usedFor

  
  return dbProposal
}
