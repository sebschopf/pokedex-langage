import type { Library } from "@/types/models/library"
import { libraryToDb } from "./library-to-db"

/**
 * Convertit un objet Library partiel en objet pour la mise à jour dans la base de données
 * @param library Objet Library partiel à convertir pour la mise à jour
 * @returns Objet prêt pour la mise à jour dans Supabase
 * @throws {Error} Si aucune donnée n'est fournie pour la mise à jour
 */
export function libraryToDbForUpdate(library: Partial<Library>): Record<string, any> {
  const dbLibrary = libraryToDb(library)

  // Vérifier qu'il y a des données à mettre à jour
  if (Object.keys(dbLibrary).length === 0) {
    throw new Error("Aucune donnée fournie pour la mise à jour")
  }

  // Convertir en Record<string, any> pour satisfaire les attentes de Supabase
  return Object.entries(dbLibrary).reduce(
    (acc, [key, value]) => {
      acc[key] = value
      return acc
    },
    {} as Record<string, any>,
  )
}
