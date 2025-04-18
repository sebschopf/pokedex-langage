import { dbToCorrection, correctionToDb, dbToCorrectionWithLanguage } from "@/lib/server/mapping/correction-mapping"
import type { DbCorrection } from "@/types/database/correction"
import type { Correction } from "@/types/models/correction"
import { describe, test, expect } from "@jest/globals"

describe("Correction mapping", () => {
  // Données de test pour DbCorrection
  const mockDbCorrection: DbCorrection = {
    id: 1,
    language_id: 2,
    correction_text: "Correction text example",
    suggestion: "Suggestion example",
    field: "description",
    framework: "React",
    status: "pending",
    user_id: "user123",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  }

  // Données de test pour Correction
  const mockCorrection: Correction = {
    id: 2,
    languageId: 3,
    correctionText: "Another correction text",
    suggestion: "Another suggestion",
    field: "creator",
    framework: "Angular",
    status: "approved",
    userId: "user456",
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-02T00:00:00Z",
  }

  test("dbToCorrection converts DbCorrection to Correction correctly", () => {
    const result = dbToCorrection(mockDbCorrection)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbCorrection.id)
    expect(result.languageId).toBe(mockDbCorrection.language_id)
    expect(result.correctionText).toBe(mockDbCorrection.correction_text)
    expect(result.suggestion).toBe(mockDbCorrection.suggestion)
    expect(result.field).toBe(mockDbCorrection.field)
    expect(result.framework).toBe(mockDbCorrection.framework)
    expect(result.status).toBe(mockDbCorrection.status)
    expect(result.userId).toBe(mockDbCorrection.user_id)
    expect(result.createdAt).toBe(mockDbCorrection.created_at)
    expect(result.updatedAt).toBe(mockDbCorrection.updated_at)
  })

  test("correctionToDb converts Correction to DbCorrection correctly", () => {
    const result = correctionToDb(mockCorrection)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockCorrection.id)
    expect(result.language_id).toBe(mockCorrection.languageId)
    expect(result.correction_text).toBe(mockCorrection.correctionText)
    expect(result.suggestion).toBe(mockCorrection.suggestion)
    expect(result.field).toBe(mockCorrection.field)
    expect(result.framework).toBe(mockCorrection.framework)
    expect(result.status).toBe(mockCorrection.status)
    expect(result.user_id).toBe(mockCorrection.userId)
    expect(result.created_at).toBe(mockCorrection.createdAt)
    expect(result.updated_at).toBe(mockCorrection.updatedAt)
  })

  test("dbToCorrectionWithLanguage adds language name to correction", () => {
    const languageName = "JavaScript"
    const result = dbToCorrectionWithLanguage(mockDbCorrection, languageName)

    // Vérifier que toutes les propriétés de base sont correctement converties
    expect(result.id).toBe(mockDbCorrection.id)
    expect(result.languageId).toBe(mockDbCorrection.language_id)
    expect(result.correctionText).toBe(mockDbCorrection.correction_text)

    // Vérifier que le nom du langage est ajouté
    expect(result.languageName).toBe(languageName)
  })

  test("Round-trip conversion from DB to model and back preserves all data", () => {
    const model = dbToCorrection(mockDbCorrection)
    const dbAgain = correctionToDb(model)

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain).toEqual(mockDbCorrection)
  })

  test("Round-trip conversion from model to DB and back preserves all data", () => {
    const db = correctionToDb(mockCorrection)
    const modelAgain = dbToCorrection(db)

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain).toEqual(mockCorrection)
  })

  test("dbToCorrection handles null values correctly", () => {
    const dbCorrectionWithNulls: DbCorrection = {
      id: 3,
      language_id: 4,
      correction_text: "Correction with nulls",
      suggestion: null,
      field: null,
      framework: null,
      status: "rejected",
      user_id: null,
      created_at: null,
      updated_at: null,
    }

    const result = dbToCorrection(dbCorrectionWithNulls)

    expect(result.id).toBe(dbCorrectionWithNulls.id)
    expect(result.languageId).toBe(dbCorrectionWithNulls.language_id)
    expect(result.correctionText).toBe(dbCorrectionWithNulls.correction_text)
    expect(result.suggestion).toBeNull()
    expect(result.field).toBeNull()
    expect(result.framework).toBeNull()
    expect(result.status).toBe(dbCorrectionWithNulls.status)
    expect(result.userId).toBeNull()
    expect(result.createdAt).toBeNull()
    expect(result.updatedAt).toBeNull()
  })
})
