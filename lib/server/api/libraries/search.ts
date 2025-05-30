import { createServerClient } from '@/lib/supabase/server';
import { dbToLibrary } from '@/lib/server/mapping/library-mapping/db-to-library'; // Correction de l'importation
import type { Library } from '@/types/models/library';
import type { DbLibrary } from '@/types/database/library'; // Ajout de l'importation du type

/**
 * Recherche des bibliothèques par nom
 * @param query Terme de recherche
 * @returns Liste des bibliothèques correspondant à la recherche
 */
export async function searchLibraries(query: string): Promise<Library[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('libraries')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');

    if (error) {
      console.error(
        `Erreur lors de la recherche de bibliothèques avec le terme "${query}":`,
        error,
      );
      return [];
    }

    return data.map(item => dbToLibrary(item as DbLibrary)); // Ajout de l'assertion de type
  } catch (error) {
    console.error(
      `Exception lors de la recherche de bibliothèques avec le terme "${query}":`,
      error,
    );
    return [];
  }
}
