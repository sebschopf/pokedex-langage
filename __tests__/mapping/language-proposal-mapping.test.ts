import { dbToLanguageProposal, languageProposalToDb } from "@/lib/server/mapping/language-proposal-mapping"
import type { DbLanguageProposal } from "@/types/database/language-proposal"
import type { LanguageProposal } from "@/types/models/language-proposal"
import { describe, test, expect } from "@jest/globals"

describe("LanguageProposal mapping", () => {
  // Données de test pour DbLanguageProposal
  const mockDbLanguageProposal: DbLanguageProposal = {
    id: 1,
    name: "Test Language",
    description: "A test language proposal",
    user_id: "user123",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
    status: "pending",
    type: "programming",
    created_year: 2023,
    creator: "Test Creator",
    used_for: "Testing",
    strengths: ["Easy to test", "Good documentation"],
    popular_frameworks: ["Test Framework", "Jest"],
  }

  // Données de test pour LanguageProposal
  const mockLanguageProposal: LanguageProposal = {
    id: 2,
    name: "Another Test Language",
    description: "Another test language proposal",
    userId: "user456",
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-02T00:00:00Z",
    status: "approved",
    type: "markup",
    createdYear: 2022,
    creator: "Another Creator",
    usedFor: "Documentation",
    strengths: ["Simple syntax", "Widely supported"],
    popularFrameworks: ["Framework A", "Framework B"],
  }

  test("dbToLanguageProposal converts DbLanguageProposal to LanguageProposal correctly", () => {
    const result = dbToLanguageProposal(mockDbLanguageProposal)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbLanguageProposal.id)
    expect(result.name).toBe(mockDbLanguageProposal.name)
    expect(result.description).toBe(mockDbLanguageProposal.description)
    expect(result.userId).toBe(mockDbLanguageProposal.user_id)
    expect(result.createdAt).toBe(mockDbLanguageProposal.created_at)
    expect(result.updatedAt).toBe(mockDbLanguageProposal.updated_at)
    expect(result.status).toBe(mockDbLanguageProposal.status)
    expect(result.type).toBe(mockDbLanguageProposal.type)
    expect(result.createdYear).toBe(mockDbLanguageProposal.created_year)
    expect(result.creator).toBe(mockDbLanguageProposal.creator)
    expect(result.usedFor).toBe(mockDbLanguageProposal.used_for)
    expect(result.strengths).toEqual(mockDbLanguageProposal.strengths)
    expect(result.popularFrameworks).toEqual(mockDbLanguageProposal.popular_frameworks)
  })

  test("languageProposalToDb converts LanguageProposal to DbLanguageProposal correctly", () => {
    const result = languageProposalToDb(mockLanguageProposal)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockLanguageProposal.id)
    expect(result.name).toBe(mockLanguageProposal.name)
    expect(result.description).toBe(mockLanguageProposal.description)
    expect(result.user_id).toBe(mockLanguageProposal.userId)
    expect(result.created_at).toBe(mockLanguageProposal.createdAt)
    expect(result.updated_at).toBe(mockLanguageProposal.updatedAt)
    expect(result.status).toBe(mockLanguageProposal.status)
    expect(result.type).toBe(mockLanguageProposal.type)
    expect(result.created_year).toBe(mockLanguageProposal.createdYear)
    expect(result.creator).toBe(mockLanguageProposal.creator)
    expect(result.used_for).toBe(mockLanguageProposal.usedFor)
    expect(result.strengths).toEqual(mockLanguageProposal.strengths)
    expect(result.popular_frameworks).toEqual(mockLanguageProposal.popularFrameworks)
  })

  test("Round-trip conversion from DB to model and back preserves all data", () => {
    const model = dbToLanguageProposal(mockDbLanguageProposal)
    const dbAgain = languageProposalToDb(model)

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain.id).toBe(mockDbLanguageProposal.id)
    expect(dbAgain.name).toBe(mockDbLanguageProposal.name)
    expect(dbAgain.description).toBe(mockDbLanguageProposal.description)
    expect(dbAgain.user_id).toBe(mockDbLanguageProposal.user_id)
    expect(dbAgain.created_at).toBe(mockDbLanguageProposal.created_at)
    expect(dbAgain.updated_at).toBe(mockDbLanguageProposal.updated_at)
    expect(dbAgain.status).toBe(mockDbLanguageProposal.status)
    expect(dbAgain.type).toBe(mockDbLanguageProposal.type)
    expect(dbAgain.created_year).toBe(mockDbLanguageProposal.created_year)
    expect(dbAgain.creator).toBe(mockDbLanguageProposal.creator)
    expect(dbAgain.used_for).toBe(mockDbLanguageProposal.used_for)
    expect(dbAgain.strengths).toEqual(mockDbLanguageProposal.strengths)
    expect(dbAgain.popular_frameworks).toEqual(mockDbLanguageProposal.popular_frameworks)
  })

  test("Round-trip conversion from model to DB and back preserves all data", () => {
    const db = languageProposalToDb(mockLanguageProposal)
    const modelAgain = dbToLanguageProposal(db as DbLanguageProposal)

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain.id).toBe(mockLanguageProposal.id)
    expect(modelAgain.name).toBe(mockLanguageProposal.name)
    expect(modelAgain.description).toBe(mockLanguageProposal.description)
    expect(modelAgain.userId).toBe(mockLanguageProposal.userId)
    expect(modelAgain.createdAt).toBe(mockLanguageProposal.createdAt)
    expect(modelAgain.updatedAt).toBe(mockLanguageProposal.updatedAt)
    expect(modelAgain.status).toBe(mockLanguageProposal.status)
    expect(modelAgain.type).toBe(mockLanguageProposal.type)
    expect(modelAgain.createdYear).toBe(mockLanguageProposal.createdYear)
    expect(modelAgain.creator).toBe(mockLanguageProposal.creator)
    expect(modelAgain.usedFor).toBe(mockLanguageProposal.usedFor)
    expect(modelAgain.strengths).toEqual(mockLanguageProposal.strengths)
    expect(modelAgain.popularFrameworks).toEqual(mockLanguageProposal.popularFrameworks)
  })

  test("languageProposalToDb handles partial data correctly", () => {
    const partialProposal: Partial<LanguageProposal> = {
      name: "Partial Test",
      status: "pending",
      type: "scripting",
    }

    const result = languageProposalToDb(partialProposal)

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.name).toBe(partialProposal.name)
    expect(result.status).toBe(partialProposal.status)
    expect(result.type).toBe(partialProposal.type)

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined()
    expect(result.description).toBeUndefined()
    expect(result.user_id).toBeUndefined()
    // etc.
  })
})
