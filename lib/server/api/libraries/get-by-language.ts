import { createServerClient } from '@/lib/supabase/server';
import { dbToLibrary } from '@/lib/server/mapping/library-mapping/db-to-library'; // Correction de l'importation
import type { Library } from '@/types/models/library';
import type { DbLibrary } from '@/types/database/library'; // Ajout de l'importation du type

/**
 * Récupère les bibliothèques associées à un langage
 * @param languageId ID du langage
 * @returns Liste des bibliothèques associées au langage
 */
export async function getLibrariesByLanguageId(languageId: number): Promise<Library[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('libraries')
      .select('*')
      .eq('language_id', languageId)
      .order('name');

    if (error) {
      console.error(
        `Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`,
        error,
      );
      return [];
    }

    return data.map(item => dbToLibrary(item as DbLibrary)); // Ajout de l'assertion de type
  } catch (error) {
    console.error(
      `Exception lors de la récupération des bibliothèques pour le langage ${languageId}:`,
      error,
    );
    return [];
  }
}
