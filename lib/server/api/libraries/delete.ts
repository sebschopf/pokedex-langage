import { createServerClient } from '@/lib/supabase/server';

/**
 * Supprime une bibliothèque
 * @param id ID de la bibliothèque à supprimer
 * @returns true si la suppression a réussi
 * @throws {Error} Si une erreur survient lors de la suppression
 */
export async function deleteLibrary(id: number): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('libraries').delete().eq('id', id);

    if (error) {
      console.error(`Erreur lors de la suppression de la bibliothèque avec l'ID ${id}:`, error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error(`Exception lors de la suppression de la bibliothèque avec l'ID ${id}:`, error);
    throw error;
  }
}
