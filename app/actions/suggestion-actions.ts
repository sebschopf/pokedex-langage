'use server';

import { createServerClient } from '@/lib/supabase/server';
import { createCorrection } from '@/lib/server/api/corrections';
import type { Correction } from '@/types/models/correction';

export async function handleCreateCorrection(formData: FormData) {
  try {
    // Vérifier à nouveau la session côté serveur
    const supabase = createServerClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const currentSession = sessionData.session;

    if (!currentSession) {
      return { success: false, message: 'Vous devez être connecté pour soumettre une correction' };
    }

    const languageId = Number.parseInt(formData.get('languageId') as string);
    const correctionText = formData.get('correctionText') as string;
    const field = formData.get('field') as string;
    const suggestion = formData.get('suggestion') as string;

    // Obtenir la date actuelle pour les deux champs de date
    const now = new Date().toISOString();

    // Créer un objet correction avec updatedAt
    const correction: Omit<Correction, 'id'> = {
      languageId,
      correctionText,
      field: field || null,
      suggestion: suggestion || null,
      status: 'pending',
      userId: currentSession.user.id,
      createdAt: now,
      updatedAt: now, // Ajouter updatedAt avec la même valeur que createdAt
      framework: null,
    };

    // Enregistrer la correction
    await createCorrection(correction);

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la création de la correction:', error);
    return { success: false };
  }
}
