import { dbToLibraryLanguage, libraryLanguageToDb } from "@/lib/server/mapping/library-languages-mapping"
import type { DbLibraryLanguage } from "@/types/database/library-languages"
import type { LibraryLanguage } from "@/types/models/library-languages"
import { describe, test, expect } from "vitest"

describe("LibraryLanguage mapping", () => {
  // Données de test pour DbLibraryLanguage
  const mockDbLibraryLanguage: DbLibraryLanguage = {
    id: 1,
    library_id: 1,
    language_id: 2,
    primary_language: true,
    created_at: "2023-01-01T00:00:00Z",
  }

  // Données de test pour LibraryLanguage
  const mockLibraryLanguage: LibraryLanguage = {
    id: 2,
    libraryId: 3,
    languageId: 4,
    primaryLanguage: false,
    createdAt: "2023-02-01T00:00:00Z",
  }

  test("dbToLibraryLanguage converts DbLibraryLanguage to LibraryLanguage correctly", () => {
    const result = dbToLibraryLanguage(mockDbLibraryLanguage)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbLibraryLanguage.id)
    expect(result.libraryId).toBe(mockDbLibraryLanguage.library_id)
    expect(result.languageId).toBe(mockDbLibraryLanguage.language_id)
    expect(result.primaryLanguage).toBe(mockDbLibraryLanguage.primary_language)
    expect(result.createdAt).toBe(mockDbLibraryLanguage.created_at)
  })

  test("libraryLanguageToDb converts LibraryLanguage to DbLibraryLanguage correctly", () => {
    const result = libraryLanguageToDb(mockLibraryLanguage)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockLibraryLanguage.id)
    expect(result.library_id).toBe(mockLibraryLanguage.libraryId)
    expect(result.language_id).toBe(mockLibraryLanguage.languageId)
    expect(result.primary_language).toBe(mockLibraryLanguage.primaryLanguage)
    expect(result.created_at).toBe(mockLibraryLanguage.createdAt)
  })

  test("Round-trip conversion from DB to model and back preserves all data", () => {
    const model = dbToLibraryLanguage(mockDbLibraryLanguage)
    const dbAgain = libraryLanguageToDb(model)

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain).toEqual(mockDbLibraryLanguage)
  })

  test("Round-trip conversion from model to DB and back preserves all data", () => {
    const db = libraryLanguageToDb(mockLibraryLanguage)
    const modelAgain = dbToLibraryLanguage(db as DbLibraryLanguage)

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain).toEqual(mockLibraryLanguage)
  })

  test("libraryLanguageToDb handles partial data correctly", () => {
    const partialLibraryLanguage: Partial<LibraryLanguage> = {
      libraryId: 5,
      languageId: 6,
    }

    const result = libraryLanguageToDb(partialLibraryLanguage)

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.library_id).toBe(partialLibraryLanguage.libraryId)
    expect(result.language_id).toBe(partialLibraryLanguage.languageId)

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined()
    expect(result.primary_language).toBeUndefined()
    expect(result.created_at).toBeUndefined()
  })
})
