import type { Database } from "@/types/database-types"
import type { LanguageProposal } from "@/types/database/language-proposal"

// Convertir une proposition de langage de la base de données en modèle d'application
export function dbToProposal(dbProposal: Database["public"]["Tables"]["language_proposals"]["Row"]): LanguageProposal {
  return {
    id: dbProposal.id,
    name: dbProposal.name,
    description: dbProposal.description,
    user_id: dbProposal.user_id,
    created_at: dbProposal.created_at,
    updated_at: dbProposal.updated_at,
    status: dbProposal.status,
    type: dbProposal.type,
    created_year: dbProposal.created_year,
    creator: dbProposal.creator,
    used_for: dbProposal.used_for,
    strengths: dbProposal.strengths,
    popular_frameworks: dbProposal.popular_frameworks,
  }
}

// Convertir un modèle d'application en proposition de langage pour la base de données
export function proposalToDb(proposal: LanguageProposal): Database["public"]["Tables"]["language_proposals"]["Insert"] {
  return {
    id: proposal.id,
    name: proposal.name,
    description: proposal.description,
    user_id: proposal.user_id,
    created_at: proposal.created_at,
    updated_at: proposal.updated_at,
    status: proposal.status,
    type: proposal.type,
    created_year: proposal.created_year,
    creator: proposal.creator,
    used_for: proposal.used_for,
    strengths: proposal.strengths,
    popular_frameworks: proposal.popular_frameworks,
  }
}
