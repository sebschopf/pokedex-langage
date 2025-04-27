import { createServerClient } from '@/lib/supabase/server';
import { dbToLibrary } from '@/lib/server/mapping/library-mapping/db-to-library';
import { libraryToDbForUpdate } from '@/lib/server/mapping/library-mapping/for-update';
import type { Library } from '@/types/models/library';
import type { DbLibrary } from '@/types/database/library';

/**
 * Met à jour une bibliothèque existante
 * @param id ID de la bibliothèque à mettre à jour
 * @param library Données partielles de la bibliothèque à mettre à jour
 * @returns La bibliothèque mise à jour
 * @throws {Error} Si aucune donnée n'est fournie ou si une erreur survient
 */
export async function updateLibrary(id: number, library: Partial<Library>): Promise<Library> {
  try {
    const supabase = createServerClient();

    // Convertir en format DB pour la mise à jour
    const dbLibrary = libraryToDbForUpdate(library);

    const { data, error } = await supabase
      .from('libraries')
      .update(dbLibrary)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Erreur lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error);
      throw error;
    }

    // Utiliser une assertion de type pour indiquer à TypeScript que data est bien de type DbLibrary
    return dbToLibrary(data as DbLibrary);
  } catch (error) {
    console.error(`Exception lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error);
    throw error;
  }
}
