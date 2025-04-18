import { dbToTechnologySubtype, technologySubtypeToDb } from "@/lib/server/mapping/technology-subtype-mapping"
import type { DbTechnologySubtype } from "@/types/database/technology-subtype"
import type { TechnologySubtype } from "@/types/models/technology-subtype"
import { describe, test, expect } from "@jest/globals"

describe("TechnologySubtype mapping", () => {
  // Données de test pour DbTechnologySubtype
  const mockDbTechnologySubtype: DbTechnologySubtype = {
    id: 1,
    name: "Framework",
    category_id: 2,
    created_at: "2023-01-01T00:00:00Z",
  }

  // Données de test pour TechnologySubtype
  const mockTechnologySubtype: TechnologySubtype = {
    id: 3,
    name: "Library",
    categoryId: 4,
    createdAt: "2023-02-01T00:00:00Z",
  }

  test("dbToTechnologySubtype converts DbTechnologySubtype to TechnologySubtype correctly", () => {
    const result = dbToTechnologySubtype(mockDbTechnologySubtype)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbTechnologySubtype.id)
    expect(result.name).toBe(mockDbTechnologySubtype.name)
    expect(result.categoryId).toBe(mockDbTechnologySubtype.category_id)
    expect(result.createdAt).toBe(mockDbTechnologySubtype.created_at)
  })

  test("technologySubtypeToDb converts TechnologySubtype to DbTechnologySubtype correctly", () => {
    const result = technologySubtypeToDb(mockTechnologySubtype)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockTechnologySubtype.id)
    expect(result.name).toBe(mockTechnologySubtype.name)
    expect(result.category_id).toBe(mockTechnologySubtype.categoryId)
    expect(result.created_at).toBe(mockTechnologySubtype.createdAt)
  })

  test("Round-trip conversion from DB to model and back preserves all data", () => {
    const model = dbToTechnologySubtype(mockDbTechnologySubtype)
    const dbAgain = technologySubtypeToDb(model)

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain).toEqual(mockDbTechnologySubtype)
  })

  test("Round-trip conversion from model to DB and back preserves all data", () => {
    const db = technologySubtypeToDb(mockTechnologySubtype)
    const modelAgain = dbToTechnologySubtype(db as DbTechnologySubtype)

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain).toEqual(mockTechnologySubtype)
  })

  test("dbToTechnologySubtype handles null values correctly", () => {
    const dbSubtypeWithNulls: DbTechnologySubtype = {
      id: 5,
      name: "Tool",
      category_id: null,
      created_at: null,
    }

    const result = dbToTechnologySubtype(dbSubtypeWithNulls)

    expect(result.id).toBe(dbSubtypeWithNulls.id)
    expect(result.name).toBe(dbSubtypeWithNulls.name)
    expect(result.categoryId).toBeNull()
    expect(result.createdAt).toBeNull()
  })
})
