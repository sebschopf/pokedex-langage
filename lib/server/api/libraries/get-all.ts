import { createServerClient } from '@/lib/supabase/server';
import { dbToLibrary } from '@/lib/server/mapping/library-mapping/db-to-library'; // Correction de l'importation
import type { Library } from '@/types/models/library';
import type { DbLibrary } from '@/types/database/library'; // Ajout de l'importation du type

/**
 * Récupère toutes les bibliothèques
 * @returns Liste des bibliothèques
 */
export async function getAllLibraries(): Promise<Library[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('libraries').select('*').order('name');

    if (error) {
      console.error('Erreur lors de la récupération des bibliothèques:', error);
      return [];
    }

    return data.map(item => dbToLibrary(item as DbLibrary)); // Ajout de l'assertion de type
  } catch (error) {
    console.error('Exception lors de la récupération des bibliothèques:', error);
    return [];
  }
}
