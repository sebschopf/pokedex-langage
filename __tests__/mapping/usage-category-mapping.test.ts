import { dbToUsageCategory, usageCategoryToDb } from '@/lib/server/mapping/usage-category-mapping';
import type { DbUsageCategory } from '@/types/database/usage-category';
import type { UsageCategory } from '@/types/models/usage-category';
import { describe, test, expect } from '@jest/globals';

describe('UsageCategory mapping', () => {
  // Données de test pour DbUsageCategory
  const mockDbUsageCategory: DbUsageCategory = {
    id: 1,
    name: 'Web Development',
    description: "Développement d'applications web",
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
  };

  // Données de test pour UsageCategory
  const mockUsageCategory: UsageCategory = {
    id: 2,
    name: 'Mobile Development',
    description: "Développement d'applications mobiles",
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-02T00:00:00Z',
  };

  test('dbToUsageCategory convertit DbUsageCategory en UsageCategory correctement', () => {
    const result = dbToUsageCategory(mockDbUsageCategory);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbUsageCategory.id);
    expect(result.name).toBe(mockDbUsageCategory.name);
    expect(result.description).toBe(mockDbUsageCategory.description);
    expect(result.createdAt).toBe(mockDbUsageCategory.created_at);
    expect(result.updatedAt).toBe(mockDbUsageCategory.updated_at);
  });

  test('usageCategoryToDb convertit UsageCategory en DbUsageCategory correctement', () => {
    const result = usageCategoryToDb(mockUsageCategory);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockUsageCategory.id);
    expect(result.name).toBe(mockUsageCategory.name);
    expect(result.description).toBe(mockUsageCategory.description);
    expect(result.created_at).toBe(mockUsageCategory.createdAt);
    expect(result.updated_at).toBe(mockUsageCategory.updatedAt);
  });

  test('Conversion aller-retour de DB à modèle et retour préserve toutes les données', () => {
    const model = dbToUsageCategory(mockDbUsageCategory);
    const dbAgain = usageCategoryToDb(model);

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain.id).toBe(mockDbUsageCategory.id);
    expect(dbAgain.name).toBe(mockDbUsageCategory.name);
    expect(dbAgain.description).toBe(mockDbUsageCategory.description);
    expect(dbAgain.created_at).toBe(mockDbUsageCategory.created_at);
    expect(dbAgain.updated_at).toBe(mockDbUsageCategory.updated_at);
  });

  test('Conversion aller-retour de modèle à DB et retour préserve toutes les données', () => {
    const db = usageCategoryToDb(mockUsageCategory);
    const modelAgain = dbToUsageCategory(db as DbUsageCategory);

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain.id).toBe(mockUsageCategory.id);
    expect(modelAgain.name).toBe(mockUsageCategory.name);
    expect(modelAgain.description).toBe(mockUsageCategory.description);
    expect(modelAgain.createdAt).toBe(mockUsageCategory.createdAt);
    expect(modelAgain.updatedAt).toBe(mockUsageCategory.updatedAt);
  });

  test('usageCategoryToDb gère les données partielles correctement', () => {
    const partialCategory: Partial<UsageCategory> = {
      name: 'Data Science',
      description: 'Analyse et traitement de données',
    };

    const result = usageCategoryToDb(partialCategory);

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.name).toBe(partialCategory.name);
    expect(result.description).toBe(partialCategory.description);

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined();
    expect(result.created_at).toBeUndefined();
    expect(result.updated_at).toBeUndefined();
  });
});
