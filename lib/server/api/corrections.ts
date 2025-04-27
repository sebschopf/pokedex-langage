import { createServerClient } from '@/lib/supabase/server';
import { dbToCorrection } from '@/lib/server/mapping/correction-mapping';
import type { Correction, CorrectionWithLanguage } from '@/types/models/correction';
import type { DbCorrection } from '@/types/database/correction';
import { getLanguageById } from '@/lib/server/api/languages';

// Récupérer toutes les corrections
export async function getAllCorrections(): Promise<Correction[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('corrections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des corrections:', error);
    throw error;
  }

  return data.map(dbToCorrection);
}

// Récupérer une correction par son ID
export async function getCorrectionById(id: number): Promise<Correction | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('corrections').select('*').eq('id', id).single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Code d'erreur pour "No rows found"
      return null;
    }
    console.error(`Erreur lors de la récupération de la correction avec l'ID ${id}:`, error);
    throw error;
  }

  return dbToCorrection(data);
}

// Récupérer une correction par son ID avec le nom du langage
export async function getCorrectionWithLanguageById(
  id: number,
): Promise<CorrectionWithLanguage | null> {
  const correction = await getCorrectionById(id);

  if (!correction) {
    return null;
  }

  const language = await getLanguageById(correction.languageId);
  const languageName = language ? language.name : 'Langage inconnu';

  return {
    ...correction,
    languageName,
  };
}

// Récupérer les corrections pour un langage spécifique
export async function getCorrectionsByLanguageId(languageId: number): Promise<Correction[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('corrections')
    .select('*')
    .eq('language_id', languageId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(
      `Erreur lors de la récupération des corrections pour le langage ${languageId}:`,
      error,
    );
    throw error;
  }

  return data.map(dbToCorrection);
}

// Créer une nouvelle correction
export async function createCorrection(correction: Omit<Correction, 'id'>): Promise<Correction> {
  const supabase = createServerClient();

  // Convertir la correction en format de base de données
  const dbCorrection = {
    language_id: correction.languageId,
    correction_text: correction.correctionText,
    suggestion: correction.suggestion,
    field: correction.field,
    framework: correction.framework,
    status: correction.status,
    user_id: correction.userId,
    created_at: correction.createdAt,
    updated_at: correction.updatedAt,
  } as DbCorrection;

  const { data, error } = await supabase.from('corrections').insert(dbCorrection).select().single();

  if (error) {
    console.error('Erreur lors de la création de la correction:', error);
    throw error;
  }

  return dbToCorrection(data);
}

// Mettre à jour une correction existante
export async function updateCorrection(
  id: number,
  correction: Partial<Correction>,
): Promise<Correction> {
  const supabase = createServerClient();

  // Récupérer la correction existante
  const existingCorrection = await getCorrectionById(id);

  if (!existingCorrection) {
    throw new Error(`Correction avec l'ID ${id} non trouvée`);
  }

  // Préparer les données à mettre à jour
  const updateData: Partial<DbCorrection> = {};

  if (correction.correctionText !== undefined)
    updateData.correction_text = correction.correctionText;
  if (correction.languageId !== undefined) updateData.language_id = correction.languageId;
  if (correction.suggestion !== undefined) updateData.suggestion = correction.suggestion;
  if (correction.field !== undefined) updateData.field = correction.field;
  if (correction.framework !== undefined) updateData.framework = correction.framework;
  if (correction.status !== undefined) updateData.status = correction.status;
  if (correction.userId !== undefined) updateData.user_id = correction.userId;
  if (correction.createdAt !== undefined) updateData.created_at = correction.createdAt;
  if (correction.updatedAt !== undefined) updateData.updated_at = correction.updatedAt;

  const { data, error } = await supabase
    .from('corrections')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour de la correction avec l'ID ${id}:`, error);
    throw error;
  }

  return dbToCorrection(data);
}

// Supprimer une correction
export async function deleteCorrection(id: number): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase.from('corrections').delete().eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression de la correction avec l'ID ${id}:`, error);
    throw error;
  }
}
