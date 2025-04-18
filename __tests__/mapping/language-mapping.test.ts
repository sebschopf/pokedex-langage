import {
    dbToLanguage,
    languageToDb,
    dbLanguageToLanguage,
    languageToDbLanguage,
  } from "@/lib/server/mapping/language-mapping"
  import type { DbLanguage } from "@/types/database/language"
  import type { Language } from "@/types/models/language"
  import { describe, test, expect } from "@jest/globals"
  
  describe("Language mapping", () => {
    // Données de test pour DbLanguage
    const mockDbLanguage: DbLanguage = {
      id: 1,
      name: "JavaScript",
      slug: "javascript",
      short_description: "A programming language for the web",
      description: "JavaScript is a programming language used to create interactive effects within web browsers.",
      type: "scripting",
      used_for: "Web development, server-side programming",
      year_created: 1995,
      usage_rate: 65.4,
      is_open_source: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      creator: "Brendan Eich",
      logo_path: "/images/javascript.svg",
      popular_frameworks: ["React", "Vue", "Angular"],
      strengths: ["Versatile", "Widely supported", "Easy to learn"],
      tools: { editors: ["VSCode", "WebStorm"], linters: ["ESLint"] },
    }
  
    // Données de test pour Language
    const mockLanguage: Language = {
      id: 2,
      name: "Python",
      slug: "python",
      shortDescription: "A versatile programming language",
      description: "Python is an interpreted high-level general-purpose programming language.",
      type: "general-purpose",
      usedFor: "Web development, data science, AI",
      yearCreated: 1991,
      usageRate: 48.2,
      isOpenSource: true,
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2023-02-02T00:00:00Z",
      creator: "Guido van Rossum",
      logoPath: "/images/python.svg",
      popularFrameworks: ["Django", "Flask", "FastAPI"],
      strengths: ["Readable", "Extensive libraries", "Cross-platform"],
      tools: { editors: ["PyCharm", "VSCode"], linters: ["Pylint"] },
    }
  
    test("dbToLanguage converts DbLanguage to Language correctly", () => {
      const result = dbToLanguage(mockDbLanguage)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockDbLanguage.id)
      expect(result.name).toBe(mockDbLanguage.name)
      expect(result.slug).toBe(mockDbLanguage.slug)
      expect(result.shortDescription).toBe(mockDbLanguage.short_description)
      expect(result.description).toBe(mockDbLanguage.description)
      expect(result.type).toBe(mockDbLanguage.type)
      expect(result.usedFor).toBe(mockDbLanguage.used_for)
      expect(result.yearCreated).toBe(mockDbLanguage.year_created)
      expect(result.usageRate).toBe(mockDbLanguage.usage_rate)
      expect(result.isOpenSource).toBe(mockDbLanguage.is_open_source)
      expect(result.createdAt).toBe(mockDbLanguage.created_at)
      expect(result.updatedAt).toBe(mockDbLanguage.updated_at)
      expect(result.creator).toBe(mockDbLanguage.creator)
      expect(result.logoPath).toBe(mockDbLanguage.logo_path)
      expect(result.popularFrameworks).toEqual(mockDbLanguage.popular_frameworks)
      expect(result.strengths).toEqual(mockDbLanguage.strengths)
      expect(result.tools).toEqual(mockDbLanguage.tools)
    })
  
    test("languageToDb converts Language to DbLanguage correctly", () => {
      const result = languageToDb(mockLanguage)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockLanguage.id)
      expect(result.name).toBe(mockLanguage.name)
      expect(result.slug).toBe(mockLanguage.slug)
      expect(result.short_description).toBe(mockLanguage.shortDescription)
      expect(result.description).toBe(mockLanguage.description)
      expect(result.type).toBe(mockLanguage.type)
      expect(result.used_for).toBe(mockLanguage.usedFor)
      expect(result.year_created).toBe(mockLanguage.yearCreated)
      expect(result.usage_rate).toBe(mockLanguage.usageRate)
      expect(result.is_open_source).toBe(mockLanguage.isOpenSource)
      expect(result.created_at).toBe(mockLanguage.createdAt)
      expect(result.updated_at).toBe(mockLanguage.updatedAt)
      expect(result.creator).toBe(mockLanguage.creator)
      expect(result.logo_path).toBe(mockLanguage.logoPath)
      expect(result.popular_frameworks).toEqual(mockLanguage.popularFrameworks)
      expect(result.strengths).toEqual(mockLanguage.strengths)
      expect(result.tools).toEqual(mockLanguage.tools)
    })
  
    test("dbLanguageToLanguage converts DbLanguage to Language correctly", () => {
      const result = dbLanguageToLanguage(mockDbLanguage)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockDbLanguage.id)
      expect(result.name).toBe(mockDbLanguage.name)
      expect(result.slug).toBe(mockDbLanguage.slug)
      expect(result.shortDescription).toBe(mockDbLanguage.short_description)
      expect(result.description).toBe(mockDbLanguage.description)
      expect(result.type).toBe(mockDbLanguage.type)
      expect(result.usedFor).toBe(mockDbLanguage.used_for)
      expect(result.yearCreated).toBe(mockDbLanguage.year_created)
      expect(result.usageRate).toBe(mockDbLanguage.usage_rate)
      expect(result.isOpenSource).toBe(mockDbLanguage.is_open_source)
      expect(result.createdAt).toBe(mockDbLanguage.created_at)
      expect(result.updatedAt).toBe(mockDbLanguage.updated_at)
      expect(result.creator).toBe(mockDbLanguage.creator)
      expect(result.logoPath).toBe(mockDbLanguage.logo_path)
      expect(result.popularFrameworks).toEqual(mockDbLanguage.popular_frameworks)
      expect(result.strengths).toEqual(mockDbLanguage.strengths)
      expect(result.tools).toEqual(mockDbLanguage.tools)
    })
  
    test("languageToDbLanguage converts Language to DbLanguage correctly", () => {
      const result = languageToDbLanguage(mockLanguage)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockLanguage.id)
      expect(result.name).toBe(mockLanguage.name)
      expect(result.slug).toBe(mockLanguage.slug)
      expect(result.short_description).toBe(mockLanguage.shortDescription)
      expect(result.description).toBe(mockLanguage.description)
      expect(result.type).toBe(mockLanguage.type)
      expect(result.used_for).toBe(mockLanguage.usedFor)
      expect(result.year_created).toBe(mockLanguage.yearCreated)
      expect(result.usage_rate).toBe(mockLanguage.usageRate)
      expect(result.is_open_source).toBe(mockLanguage.isOpenSource)
      expect(result.created_at).toBe(mockLanguage.createdAt)
      expect(result.updated_at).toBe(mockLanguage.updatedAt)
      expect(result.creator).toBe(mockLanguage.creator)
      expect(result.logo_path).toBe(mockLanguage.logoPath)
      expect(result.popular_frameworks).toEqual(mockLanguage.popularFrameworks)
      expect(result.strengths).toEqual(mockLanguage.strengths)
      expect(result.tools).toEqual(mockLanguage.tools)
    })
  
    test("Round-trip conversion from DB to model and back preserves all data", () => {
      const model = dbLanguageToLanguage(mockDbLanguage)
      const dbAgain = languageToDbLanguage(model)
  
      // Vérifier que toutes les propriétés sont préservées
      expect(dbAgain).toEqual(mockDbLanguage)
    })
  
    test("Round-trip conversion from model to DB and back preserves all data", () => {
      const db = languageToDbLanguage(mockLanguage)
      const modelAgain = dbLanguageToLanguage(db)
  
      // Vérifier que toutes les propriétés sont préservées
      expect(modelAgain).toEqual(mockLanguage)
    })
  
    test("dbToLanguage handles null values correctly", () => {
      const dbLanguageWithNulls = {
        id: 3,
        name: "Ruby",
        slug: "ruby",
        short_description: null,
        description: null,
        type: null,
        used_for: null,
        year_created: null,
        usage_rate: null,
        is_open_source: null,
        created_at: null,
        updated_at: null,
        creator: null,
        logo_path: null,
        popular_frameworks: null,
        strengths: null,
        tools: null,
      }
  
      const result = dbToLanguage(dbLanguageWithNulls)
  
      expect(result.id).toBe(dbLanguageWithNulls.id)
      expect(result.name).toBe(dbLanguageWithNulls.name)
      expect(result.slug).toBe(dbLanguageWithNulls.slug)
      expect(result.shortDescription).toBeNull()
      expect(result.description).toBeNull()
      expect(result.type).toBeNull()
      expect(result.usedFor).toBeNull()
      expect(result.yearCreated).toBeNull()
      expect(result.usageRate).toBeNull()
      expect(result.isOpenSource).toBeFalsy() // toBoolean convertit null en false
      expect(result.createdAt).toBeNull()
      expect(result.updatedAt).toBeNull()
      expect(result.creator).toBeNull()
      expect(result.logoPath).toBeNull()
      expect(result.popularFrameworks).toBeNull()
      expect(result.strengths).toBeNull()
      expect(result.tools).toBeNull()
    })
  })
  