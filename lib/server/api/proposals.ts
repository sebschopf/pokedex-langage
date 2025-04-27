// Correction des importations
import { createServerClient } from '@/lib/supabase/server';
import {
  dbToLanguageProposal,
  languageProposalToDb,
} from '@/lib/server/mapping/language-proposal-mapping';
import type { DbLanguageProposal } from '@/types/database/language-proposal';
import type { LanguageProposal } from '@/types/models/language-proposal';

/**
 * Crée une nouvelle proposition
 */
export async function createProposal(proposal: Partial<LanguageProposal>) {
  const supabase = createServerClient();
  const dbData = languageProposalToDb(proposal);

  // Vérifier et ajouter les champs obligatoires
  if (!dbData.name) {
    throw new Error('Le nom de la proposition est obligatoire');
  }

  // Créer un objet d'insertion avec les champs obligatoires garantis
  const insertData = {
    name: dbData.name,
    status: dbData.status || 'pending',
    user_id: dbData.user_id || '', // Assurez-vous que user_id est défini
    created_at: dbData.created_at || new Date().toISOString(),
    // Ajouter d'autres champs optionnels
    description: dbData.description,
    type: dbData.type,
    updated_at: dbData.updated_at,
    created_year: dbData.created_year,
    creator: dbData.creator,
    popular_frameworks: dbData.popular_frameworks,
    strengths: dbData.strengths,
    used_for: dbData.used_for,
  };

  const { data: insertedData, error } = await supabase
    .from('language_proposals')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création de la proposition:', error);
    throw error;
  }

  return dbToLanguageProposal(insertedData as DbLanguageProposal);
}

/**
 * Met à jour une proposition existante
 */
export async function updateProposal(id: number, proposal: Partial<LanguageProposal>) {
  const supabase = createServerClient();
  const dbData = languageProposalToDb(proposal);

  // Créer un objet de mise à jour qui ne contient que les champs à modifier
  const updateData: Record<string, any> = {};

  // N'ajouter que les champs qui sont présents dans dbData
  if (dbData.name !== undefined) updateData.name = dbData.name;
  if (dbData.description !== undefined) updateData.description = dbData.description;
  if (dbData.type !== undefined) updateData.type = dbData.type;
  if (dbData.status !== undefined) updateData.status = dbData.status;
  if (dbData.user_id !== undefined) updateData.user_id = dbData.user_id;
  if (dbData.created_year !== undefined) updateData.created_year = dbData.created_year;
  if (dbData.creator !== undefined) updateData.creator = dbData.creator;
  if (dbData.popular_frameworks !== undefined)
    updateData.popular_frameworks = dbData.popular_frameworks;
  if (dbData.strengths !== undefined) updateData.strengths = dbData.strengths;
  if (dbData.used_for !== undefined) updateData.used_for = dbData.used_for;

  // Ajouter le timestamp de mise à jour
  updateData.updated_at = new Date().toISOString();

  const { data: updatedData, error } = await supabase
    .from('language_proposals')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour de la proposition ${id}:`, error);
    throw error;
  }

  return dbToLanguageProposal(updatedData as DbLanguageProposal);
}
