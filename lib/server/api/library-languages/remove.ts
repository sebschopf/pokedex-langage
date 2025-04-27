import { createServerClient } from '@/lib/supabase/server';

/**
 * Supprime une association entre une bibliothèque/outil et un langage
 * @param libraryId ID de la bibliothèque ou de l'outil
 * @param languageId ID du langage
 * @returns Résultat de l'opération
 */
export async function removeLanguageFromLibrary(libraryId: number, languageId: number) {
  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from('library_languages')
      .delete()
      .eq('library_id', libraryId)
      .eq('language_id', languageId);

    if (error) throw error;

    return { success: true, message: 'Association supprimée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression du langage de la bibliothèque:', error);
    return { success: false, message: 'Erreur lors de la suppression du langage' };
  }
}
