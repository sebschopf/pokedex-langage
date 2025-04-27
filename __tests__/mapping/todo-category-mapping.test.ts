import { dbToTodoCategory, todoCategoryToDb } from '@/lib/server/mapping/todo-category-mapping';
import type { DbTodoCategory } from '@/types/database/todo-category';
import type { TodoCategory } from '@/types/models/todo-category';
import { describe, test, expect } from '@jest/globals';

describe('TodoCategory mapping', () => {
  // Données de test pour DbTodoCategory
  const mockDbTodoCategory: DbTodoCategory = {
    id: 1,
    name: 'Fonctionnalité',
    color: '#4CAF50', // Couleur verte
    created_at: '2023-01-01T00:00:00Z',
  };

  // Données de test pour TodoCategory
  const mockTodoCategory: TodoCategory = {
    id: 2,
    name: 'Bug',
    color: '#F44336', // Couleur rouge
    createdAt: '2023-02-01T00:00:00Z',
  };

  test('dbToTodoCategory convertit DbTodoCategory en TodoCategory correctement', () => {
    const result = dbToTodoCategory(mockDbTodoCategory);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbTodoCategory.id);
    expect(result.name).toBe(mockDbTodoCategory.name);
    expect(result.color).toBe(mockDbTodoCategory.color); // Vérifier que la couleur est correctement mappée
    expect(result.createdAt).toBe(mockDbTodoCategory.created_at);
  });

  test('todoCategoryToDb convertit TodoCategory en DbTodoCategory correctement', () => {
    const result = todoCategoryToDb(mockTodoCategory);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockTodoCategory.id);
    expect(result.name).toBe(mockTodoCategory.name);
    expect(result.color).toBe(mockTodoCategory.color); // Vérifier que la couleur est correctement mappée
    expect(result.created_at).toBe(mockTodoCategory.createdAt);
  });

  test('Conversion aller-retour de DB à modèle et retour préserve toutes les données', () => {
    const model = dbToTodoCategory(mockDbTodoCategory);
    const dbAgain = todoCategoryToDb(model);

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain.id).toBe(mockDbTodoCategory.id);
    expect(dbAgain.name).toBe(mockDbTodoCategory.name);
    expect(dbAgain.color).toBe(mockDbTodoCategory.color); // Vérifier que la couleur est préservée
    expect(dbAgain.created_at).toBe(mockDbTodoCategory.created_at);
  });

  test('Conversion aller-retour de modèle à DB et retour préserve toutes les données', () => {
    const db = todoCategoryToDb(mockTodoCategory);
    const modelAgain = dbToTodoCategory(db as DbTodoCategory);

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain.id).toBe(mockTodoCategory.id);
    expect(modelAgain.name).toBe(mockTodoCategory.name);
    expect(modelAgain.color).toBe(mockTodoCategory.color); // Vérifier que la couleur est préservée
    expect(modelAgain.createdAt).toBe(mockTodoCategory.createdAt);
  });

  test('todoCategoryToDb gère les données partielles correctement', () => {
    const partialCategory: Partial<TodoCategory> = {
      name: 'Documentation',
      color: '#2196F3', // Couleur bleue
    };

    const result = todoCategoryToDb(partialCategory);

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.name).toBe(partialCategory.name);
    expect(result.color).toBe(partialCategory.color); // Vérifier que la couleur est correctement mappée

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined();
    expect(result.created_at).toBeUndefined();
  });
});
