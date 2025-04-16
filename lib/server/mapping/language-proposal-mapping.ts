import type { DbLanguageProposal } from "@/types/database/language-proposal"
import type { LanguageProposal } from "@/types/models/language-proposal"
import { toNumber, } from "@/utils/conversion/type-conversion"

/**
 * Convertit un objet DbLanguageProposal en LanguageProposal
 * @param dbProposal Objet de la base de données
 * @returns Objet LanguageProposal pour l'application
 */
export function dbToLanguageProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: toNumber(dbProposal.id),
    name: dbProposal.name,
    description: dbProposal.description || null,
    type: dbProposal.type || null,
    userId: dbProposal.user_id|| "",
    status: dbProposal.status || "pending",
    createdAt: dbProposal.created_at || null,
    updatedAt: dbProposal.updated_at || null,
    createdYear: dbProposal.created_year || null,
    creator: dbProposal.creator || null,
    popularFrameworks: dbProposal.popular_frameworks || [],
    strengths: dbProposal.strengths || [],
    usedFor: dbProposal.used_for || null,
    // Ajoutez d'autres propriétés selon vos besoins
  }
}

/**
 * Convertit un objet LanguageProposal en DbLanguageProposal
 * @param proposal Objet de l'application
 * @returns Objet pour la base de données
 */
export function languageProposalToDb(proposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  const dbProposal: Partial<DbLanguageProposal> = {}

  if (proposal.id !== undefined) dbProposal.id = (proposal.id)
  if (proposal.name !== undefined) dbProposal.name = proposal.name
  if (proposal.description !== undefined) dbProposal.description = proposal.description
  if (proposal.type !== undefined) dbProposal.type = proposal.type
  if (proposal.userId !== undefined) dbProposal.user_id = proposal.userId
  if (proposal.status !== undefined) dbProposal.status = proposal.status
  if (proposal.createdAt !== undefined) dbProposal.created_at = proposal.createdAt
  if (proposal.updatedAt !== undefined) dbProposal.updated_at = proposal.updatedAt
  // Propriétés supplémentaires
  if (proposal.createdYear !== undefined) dbProposal.created_year = proposal.createdYear
  if (proposal.creator !== undefined) dbProposal.creator = proposal.creator
  if (proposal.popularFrameworks !== undefined) dbProposal.popular_frameworks = proposal.popularFrameworks
  if (proposal.strengths !== undefined) dbProposal.strengths = proposal.strengths
  if (proposal.usedFor !== undefined) dbProposal.used_for = proposal.usedFor
  // Ajoutez d'autres propriétés selon vos besoins

  return dbProposal
}
