import {
  dbToTechnologyCategory,
  technologyCategoryToDb,
} from '@/lib/server/mapping/technology-category-mapping';
import type { DbTechnologyCategory } from '@/types/database/technology-category';
import type { TechnologyCategory } from '@/types/models/technology-category';
import { describe, test, expect } from '@jest/globals';

describe('TechnologyCategory mapping', () => {
  // Données de test pour DbTechnologyCategory
  const mockDbTechnologyCategory: DbTechnologyCategory = {
    id: 1,
    type: 'frontend',
    color: '#4CAF50',
    icon_name: 'code',
    created_at: '2023-01-01T00:00:00Z',
  };

  // Données de test pour TechnologyCategory
  const mockTechnologyCategory: TechnologyCategory = {
    id: 2,
    type: 'backend',
    color: '#2196F3',
    iconName: 'server',
    createdAt: '2023-02-01T00:00:00Z',
  };

  test('dbToTechnologyCategory converts DbTechnologyCategory to TechnologyCategory correctly', () => {
    const result = dbToTechnologyCategory(mockDbTechnologyCategory);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbTechnologyCategory.id);
    expect(result.type).toBe(mockDbTechnologyCategory.type);
    expect(result.color).toBe(mockDbTechnologyCategory.color);
    expect(result.iconName).toBe(mockDbTechnologyCategory.icon_name);
    expect(result.createdAt).toBe(mockDbTechnologyCategory.created_at);
  });

  test('technologyCategoryToDb converts TechnologyCategory to DbTechnologyCategory correctly', () => {
    const result = technologyCategoryToDb(mockTechnologyCategory);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockTechnologyCategory.id);
    expect(result.type).toBe(mockTechnologyCategory.type);
    expect(result.color).toBe(mockTechnologyCategory.color);
    expect(result.icon_name).toBe(mockTechnologyCategory.iconName);
    expect(result.created_at).toBe(mockTechnologyCategory.createdAt);
  });

  test('Round-trip conversion from DB to model and back preserves all data', () => {
    const model = dbToTechnologyCategory(mockDbTechnologyCategory);
    const dbAgain = technologyCategoryToDb(model);

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain).toEqual(mockDbTechnologyCategory);
  });

  test('Round-trip conversion from model to DB and back preserves all data', () => {
    const db = technologyCategoryToDb(mockTechnologyCategory);
    const modelAgain = dbToTechnologyCategory(db as DbTechnologyCategory);

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain).toEqual(mockTechnologyCategory);
  });

  test('dbToTechnologyCategory handles null values correctly', () => {
    const dbCategoryWithNulls: DbTechnologyCategory = {
      id: 3,
      type: 'mobile',
      color: '#FF9800',
      icon_name: 'smartphone',
      created_at: null,
    };

    const result = dbToTechnologyCategory(dbCategoryWithNulls);

    expect(result.id).toBe(dbCategoryWithNulls.id);
    expect(result.type).toBe(dbCategoryWithNulls.type);
    expect(result.color).toBe(dbCategoryWithNulls.color);
    expect(result.iconName).toBe(dbCategoryWithNulls.icon_name);
    expect(result.createdAt).toBeNull();
  });
});
