import type { Library } from "@/types/models/library"
import { libraryToDb } from "./library-to-db"
import type { DbLibrary } from "@/types/database/library"

/**
 * Convertit un objet Library partiel en objet pour la mise à jour dans la base de données
 * @param library Objet Library partiel à convertir pour la mise à jour
 * @returns Objet partiel prêt pour la mise à jour dans Supabase
 * @throws {Error} Si aucune donnée n'est fournie pour la mise à jour
 */
export function libraryToDbForUpdate(library: Partial<Library>): Partial<DbLibrary> {
  const dbLibrary = libraryToDb(library)

  // Vérifier qu'il y a des données à mettre à jour
  if (Object.keys(dbLibrary).length === 0) {
    throw new Error("Aucune donnée fournie pour la mise à jour")
  }

  // Retourner directement l'objet partiel
  return dbLibrary
}
