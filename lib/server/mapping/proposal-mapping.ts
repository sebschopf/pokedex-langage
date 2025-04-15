import type { DbLanguageProposal } from "@/types/database/language-proposal"
import type { LanguageProposal } from "@/types/models/language-proposal"
import { toNumber, toString } from "@/utils/conversion/type-conversion"

/**
 * Convertit un objet DbLanguageProposal en LanguageProposal
 * @param dbProposal Objet de la base de données
 * @returns Objet LanguageProposal pour l'application
 */
export function dbToProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: toNumber(dbProposal.id),
    name: dbProposal.name,
    description: dbProposal.description || null,
    type: dbProposal.type || null,
    // Suppression des propriétés qui n'existent pas dans les types
    // yearCreated, isOpenSource, websiteUrl, githubUrl
    userId: dbProposal.user_id,
    status: dbProposal.status || "pending",
    // Suppression des propriétés qui n'existent pas dans les types
    // reviewComment, reviewerId
    createdAt: dbProposal.created_at || null,
    updatedAt: dbProposal.updated_at || null,
  }
}

/**
 * Convertit un objet LanguageProposal en DbLanguageProposal
 * @param proposal Objet de l'application
 * @returns Objet pour la base de données
 */
export function proposalToDb(proposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  const dbProposal: Partial<DbLanguageProposal> = {}

  if (proposal.id !== undefined) dbProposal.id = toString(proposal.id)
  if (proposal.name !== undefined) dbProposal.name = proposal.name
  if (proposal.description !== undefined) dbProposal.description = proposal.description
  if (proposal.type !== undefined) dbProposal.type = proposal.type
  // Suppression des propriétés qui n'existent pas dans les types
  // yearCreated, isOpenSource, websiteUrl, githubUrl
  if (proposal.userId !== undefined) dbProposal.user_id = proposal.userId
  if (proposal.status !== undefined) dbProposal.status = proposal.status
  // Suppression des propriétés qui n'existent pas dans les types
  // reviewComment, reviewerId
  if (proposal.createdAt !== undefined) dbProposal.created_at = proposal.createdAt
  if (proposal.updatedAt !== undefined) dbProposal.updated_at = proposal.updatedAt

  return dbProposal
}
