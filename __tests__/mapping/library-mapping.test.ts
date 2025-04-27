import { dbToLibrary, libraryToDb } from '@/lib/server/mapping/library-mapping';
import type { DbLibrary } from '@/types/database/library';
import type { Library } from '@/types/models/library';
import { describe, test, expect } from '@jest/globals';

describe('Library mapping', () => {
  // Données de test pour DbLibrary
  const mockDbLibrary: DbLibrary = {
    id: 1,
    name: 'Test Library',
    slug: 'test-library',
    description: 'A test library',
    language_id: 1,
    technology_type: 'framework',
    official_website: 'https://test-library.com',
    github_url: 'https://github.com/test/library',
    logo_path: '/images/test-library.png',
    popularity: 85,
    is_open_source: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
    features: ['Feature 1', 'Feature 2'],
    unique_selling_point: 'Unique selling point',
    best_for: 'Web development',
    used_for: 'Building web applications',
    documentation_url: 'https://docs.test-library.com',
    version: '1.0.0',
    subtype: 'frontend',
    license: 'MIT',
    website_url: 'https://exemple.com',
  };

  // Données de test pour Library
  const mockLibrary: Library = {
    id: 2,
    name: 'Another Library',
    slug: 'another-library',
    description: 'Another test library',
    languageId: 2,
    technologyType: 'library',
    officialWebsite: 'https://another-library.com',
    githubUrl: 'https://github.com/another/library',
    logoPath: '/images/another-library.png',
    popularity: 75,
    isOpenSource: true,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-02T00:00:00Z',
    features: ['Feature A', 'Feature B'],
    uniqueSellingPoint: 'Another unique selling point',
    bestFor: 'Mobile development',
    usedFor: 'Building mobile applications',
    documentationUrl: 'https://docs.another-library.com',
    version: '2.0.0',
    subtype: 'mobile',
    license: 'MIT',
    websiteUrl: 'https://example.com',
  };

  test('dbToLibrary converts DbLibrary to Library correctly', () => {
    const result = dbToLibrary(mockDbLibrary);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbLibrary.id);
    expect(result.name).toBe(mockDbLibrary.name);
    expect(result.slug).toBe(mockDbLibrary.slug);
    expect(result.description).toBe(mockDbLibrary.description);
    expect(result.languageId).toBe(mockDbLibrary.language_id);
    expect(result.technologyType).toBe(mockDbLibrary.technology_type);
    expect(result.officialWebsite).toBe(mockDbLibrary.official_website);
    expect(result.githubUrl).toBe(mockDbLibrary.github_url);
    expect(result.logoPath).toBe(mockDbLibrary.logo_path);
    expect(result.popularity).toBe(mockDbLibrary.popularity);
    expect(result.isOpenSource).toBe(mockDbLibrary.is_open_source);
    expect(result.createdAt).toBe(mockDbLibrary.created_at);
    expect(result.updatedAt).toBe(mockDbLibrary.updated_at);
    expect(result.features).toEqual(mockDbLibrary.features);
    expect(result.uniqueSellingPoint).toBe(mockDbLibrary.unique_selling_point);
    expect(result.bestFor).toBe(mockDbLibrary.best_for);
    expect(result.usedFor).toBe(mockDbLibrary.used_for);
    expect(result.documentationUrl).toBe(mockDbLibrary.documentation_url);
    expect(result.version).toBe(mockDbLibrary.version);
    expect(result.subtype).toBe(mockDbLibrary.subtype);
  });

  test('libraryToDb converts Library to DbLibrary correctly', () => {
    const result = libraryToDb(mockLibrary);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockLibrary.id);
    expect(result.name).toBe(mockLibrary.name);
    expect(result.slug).toBe(mockLibrary.slug);
    expect(result.description).toBe(mockLibrary.description);
    expect(result.language_id).toBe(mockLibrary.languageId);
    expect(result.technology_type).toBe(mockLibrary.technologyType);
    expect(result.official_website).toBe(mockLibrary.officialWebsite);
    expect(result.github_url).toBe(mockLibrary.githubUrl);
    expect(result.logo_path).toBe(mockLibrary.logoPath);
    expect(result.popularity).toBe(mockLibrary.popularity);
    expect(result.is_open_source).toBe(mockLibrary.isOpenSource);
    expect(result.created_at).toBe(mockLibrary.createdAt);
    expect(result.updated_at).toBe(mockLibrary.updatedAt);
    expect(result.features).toEqual(mockLibrary.features);
    expect(result.unique_selling_point).toBe(mockLibrary.uniqueSellingPoint);
    expect(result.best_for).toBe(mockLibrary.bestFor);
    expect(result.used_for).toBe(mockLibrary.usedFor);
    expect(result.documentation_url).toBe(mockLibrary.documentationUrl);
    expect(result.version).toBe(mockLibrary.version);
    expect(result.subtype).toBe(mockLibrary.subtype);
  });

  test('Round-trip conversion from DB to model and back preserves all data', () => {
    const model = dbToLibrary(mockDbLibrary);
    const dbAgain = libraryToDb(model);

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain).toEqual(mockDbLibrary);
  });

  test('Round-trip conversion from model to DB and back preserves all data', () => {
    const db = libraryToDb(mockLibrary);
    const modelAgain = dbToLibrary(db as DbLibrary);

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain).toEqual(mockLibrary);
  });

  test('libraryToDb handles partial data correctly', () => {
    const partialLibrary: Partial<Library> = {
      name: 'Partial Library',
      technologyType: 'tool',
      isOpenSource: false,
    };

    const result = libraryToDb(partialLibrary);

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.name).toBe(partialLibrary.name);
    expect(result.technology_type).toBe(partialLibrary.technologyType);
    expect(result.is_open_source).toBe(partialLibrary.isOpenSource);

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined();
    expect(result.description).toBeUndefined();
    expect(result.language_id).toBeUndefined();
    // etc.
  });
});
