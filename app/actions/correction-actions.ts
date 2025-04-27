'use server';

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { createCorrection, updateCorrection } from '@/lib/server/api/corrections';
import type { Correction } from '@/types/models/correction';

// Créer ou mettre à jour une correction
export async function createOrUpdateCorrection(formData: FormData) {
  try {
    const id = formData.get('id') ? Number(formData.get('id')) : null;
    const languageId = Number(formData.get('language_id'));
    const correctionText = formData.get('correction_text') as string;
    const suggestion = formData.get('suggestion') as string;
    const field = formData.get('field') as string;
    const framework = formData.get('framework') as string;
    const status = (formData.get('status') as string) || 'pending';

    // Vérifier les données requises
    if (!languageId || !correctionText) {
      return {
        success: false,
        message: 'Langage et texte de correction requis',
      };
    }

    // Préparer les données de la correction
    const correctionData: Omit<Correction, 'id'> = {
      languageId: languageId,
      correctionText: correctionText,
      suggestion: suggestion || null,
      field: field || null,
      framework: framework || null,
      status,
      userId: null,
      createdAt: null,
      updatedAt: null,
    };

    let result: Correction;

    if (id) {
      // Mise à jour d'une correction existante
      result = await updateCorrection(id, correctionData);
    } else {
      // Création d'une nouvelle correction
      result = await createCorrection(correctionData);
    }

    // Revalider les chemins
    revalidatePath('/corrections');
    revalidatePath(`/languages/${languageId}`);

    return {
      success: true,
      message: id ? 'Correction mise à jour avec succès' : 'Correction créée avec succès',
      data: result,
    };
  } catch (error) {
    console.error('Erreur lors de la création/mise à jour de la correction:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de la création/mise à jour de la correction',
    };
  }
}

// Soumettre une correction (alias pour createOrUpdateCorrection avec des paramètres spécifiques)
export async function submitCorrection(formData: FormData) {
  // Assurez-vous que le statut est "pending" pour les nouvelles soumissions
  const newFormData = new FormData();

  // Copier toutes les valeurs du formData original
  // Utiliser Array.from pour éviter les problèmes d'itération
  Array.from(formData.entries()).forEach(([key, value]) => {
    newFormData.append(key, value);
  });

  // Définir le statut comme "pending"
  newFormData.set('status', 'pending');

  // Utiliser la fonction existante
  return createOrUpdateCorrection(newFormData);
}

// Approuver une correction
export async function approveCorrection(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) {
    return {
      success: false,
      message: 'ID de correction manquant',
    };
  }

  try {
    // Mettre à jour le statut de la correction
    const result = await updateCorrection(id, { status: 'approved' });

    // Revalider les chemins
    revalidatePath('/admin/corrections');
    revalidatePath(`/languages/${result.languageId}`);

    return {
      success: true,
      message: 'Correction approuvée avec succès',
      data: result,
    };
  } catch (error) {
    console.error("Erreur lors de l'approbation de la correction:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'approbation de la correction",
    };
  }
}

// Rejeter une correction
export async function rejectCorrection(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) {
    return {
      success: false,
      message: 'ID de correction manquant',
    };
  }

  try {
    // Mettre à jour le statut de la correction
    const result = await updateCorrection(id, { status: 'rejected' });

    // Revalider les chemins
    revalidatePath('/admin/corrections');
    revalidatePath(`/languages/${result.languageId}`);

    return {
      success: true,
      message: 'Correction rejetée avec succès',
      data: result,
    };
  } catch (error) {
    console.error('Erreur lors du rejet de la correction:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors du rejet de la correction',
    };
  }
}

// Supprimer une correction
export async function deleteCorrection(formData: FormData) {
  try {
    const id = Number(formData.get('id'));
    const supabase = createServerClient();

    const { error } = await supabase.from('corrections').delete().eq('id', id);

    if (error) {
      throw error;
    }

    // Revalider les chemins
    revalidatePath('/corrections');
    revalidatePath('/admin/corrections');

    return {
      success: true,
      message: 'Correction supprimée avec succès',
    };
  } catch (error) {
    console.error('Erreur lors de la suppression de la correction:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de la suppression de la correction',
    };
  }
}
