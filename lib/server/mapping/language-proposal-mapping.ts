import type { DbLanguageProposal } from "@/types/database"
import type { LanguageProposal } from "@/types/models"

/**
 * Convertit un objet DbLanguageProposal en LanguageProposal
 * @param dbProposal Objet de la base de données
 * @returns Objet LanguageProposal pour l'application
 */
export function dbToLanguageProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: dbProposal.id,
    createdAt: dbProposal.created_at,
    createdYear: dbProposal.created_year,
    creator: dbProposal.creator,
    description: dbProposal.description,
    name: dbProposal.name,
    popularFrameworks: dbProposal.popular_frameworks,
    status: dbProposal.status,
    strengths: dbProposal.strengths,
    type: dbProposal.type,
    updatedAt: dbProposal.updated_at,
    usedFor: dbProposal.used_for,
    userId: dbProposal.user_id,
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
  if (proposal.createdAt !== undefined) dbProposal.created_at = proposal.createdAt
  if (proposal.createdYear !== undefined) dbProposal.created_year = proposal.createdYear
  if (proposal.creator !== undefined) dbProposal.creator = proposal.creator
  if (proposal.description !== undefined) dbProposal.description = proposal.description
  if (proposal.name !== undefined) dbProposal.name = proposal.name
  if (proposal.popularFrameworks !== undefined) dbProposal.popular_frameworks = proposal.popularFrameworks
  if (proposal.status !== undefined) dbProposal.status = proposal.status
  if (proposal.strengths !== undefined) dbProposal.strengths = proposal.strengths
  if (proposal.type !== undefined) dbProposal.type = proposal.type
  if (proposal.updatedAt !== undefined) dbProposal.updated_at = proposal.updatedAt
  if (proposal.usedFor !== undefined) dbProposal.used_for = proposal.usedFor
  if (proposal.userId !== undefined) dbProposal.user_id = proposal.userId

  return dbProposal
}
