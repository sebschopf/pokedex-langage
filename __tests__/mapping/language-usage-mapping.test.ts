import { dbToLanguageUsage, languageUsageToDb } from "@/lib/server/mapping/language-usage-mapping"
import type { DbLanguageUsage } from "@/types/database/language-usage"
import type { LanguageUsage } from "@/types/models/language-usage"
import { describe, test, expect } from "@jest/globals"

describe("LanguageUsage mapping", () => {
  // Données de test pour DbLanguageUsage
  const mockDbLanguageUsage: DbLanguageUsage = {
    id: 1,
    language_id: 2,
    category_id: 3,
    created_at: "2023-01-01T00:00:00Z",
  }

  // Données de test pour LanguageUsage
  const mockLanguageUsage: LanguageUsage = {
    id: 4,
    languageId: 5,
    categoryId: 6,
    createdAt: "2023-02-01T00:00:00Z",
  }

  test("dbToLanguageUsage converts DbLanguageUsage to LanguageUsage correctly", () => {
    const result = dbToLanguageUsage(mockDbLanguageUsage)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbLanguageUsage.id)
    expect(result.languageId).toBe(mockDbLanguageUsage.language_id)
    expect(result.categoryId).toBe(mockDbLanguageUsage.category_id)
    expect(result.createdAt).toBe(mockDbLanguageUsage.created_at)
  })

  test("languageUsageToDb converts LanguageUsage to DbLanguageUsage correctly", () => {
    const result = languageUsageToDb(mockLanguageUsage)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockLanguageUsage.id)
    expect(result.language_id).toBe(mockLanguageUsage.languageId)
    expect(result.category_id).toBe(mockLanguageUsage.categoryId)
    expect(result.created_at).toBe(mockLanguageUsage.createdAt)
  })

  test("Round-trip conversion from DB to model and back preserves all data", () => {
    const model = dbToLanguageUsage(mockDbLanguageUsage)
    const dbAgain = languageUsageToDb(model)

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain).toEqual(mockDbLanguageUsage)
  })

  test("Round-trip conversion from model to DB and back preserves all data", () => {
    const db = languageUsageToDb(mockLanguageUsage)
    const modelAgain = dbToLanguageUsage(db)

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain).toEqual(mockLanguageUsage)
  })

  test("dbToLanguageUsage handles null values correctly", () => {
    const dbLanguageUsageWithNulls: DbLanguageUsage = {
      id: 7,
      language_id: null,
      category_id: null,
      created_at: null,
    }

    const result = dbToLanguageUsage(dbLanguageUsageWithNulls)

    expect(result.id).toBe(dbLanguageUsageWithNulls.id)
    expect(result.languageId).toBeNull()
    expect(result.categoryId).toBeNull()
    expect(result.createdAt).toBeNull()
  })
})
