import { dbToTodoStatus, todoStatusToDb } from '@/lib/server/mapping/todo-status-mapping';
import type { DbTodoStatus } from '@/types/database/todo-status';
import type { TodoStatus } from '@/types/models/todo-status';
import { describe, test, expect } from '@jest/globals';

describe('TodoStatus mapping', () => {
  // Données de test pour DbTodoStatus
  const mockDbTodoStatus: DbTodoStatus = {
    id: 1,
    name: 'En cours',
    description: 'La tâche est en cours de réalisation',
    created_at: '2023-01-01T00:00:00Z',
  };

  // Données de test pour TodoStatus
  const mockTodoStatus: TodoStatus = {
    id: 2,
    name: 'Terminé',
    description: 'La tâche a été complétée',
    createdAt: '2023-02-01T00:00:00Z',
  };

  test('dbToTodoStatus convertit DbTodoStatus en TodoStatus correctement', () => {
    const result = dbToTodoStatus(mockDbTodoStatus);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbTodoStatus.id);
    expect(result.name).toBe(mockDbTodoStatus.name);
    expect(result.description).toBe(mockDbTodoStatus.description);
    expect(result.createdAt).toBe(mockDbTodoStatus.created_at);
  });

  test('todoStatusToDb convertit TodoStatus en DbTodoStatus correctement', () => {
    const result = todoStatusToDb(mockTodoStatus);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockTodoStatus.id);
    expect(result.name).toBe(mockTodoStatus.name);
    expect(result.description).toBe(mockTodoStatus.description);
    expect(result.created_at).toBe(mockTodoStatus.createdAt);
  });

  test('Conversion aller-retour de DB à modèle et retour préserve toutes les données', () => {
    const model = dbToTodoStatus(mockDbTodoStatus);
    const dbAgain = todoStatusToDb(model);

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain.id).toBe(mockDbTodoStatus.id);
    expect(dbAgain.name).toBe(mockDbTodoStatus.name);
    expect(dbAgain.description).toBe(mockDbTodoStatus.description);
    expect(dbAgain.created_at).toBe(mockDbTodoStatus.created_at);
  });

  test('Conversion aller-retour de modèle à DB et retour préserve toutes les données', () => {
    const db = todoStatusToDb(mockTodoStatus);
    const modelAgain = dbToTodoStatus(db as DbTodoStatus);

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain.id).toBe(mockTodoStatus.id);
    expect(modelAgain.name).toBe(mockTodoStatus.name);
    expect(modelAgain.description).toBe(mockTodoStatus.description);
    expect(modelAgain.createdAt).toBe(mockTodoStatus.createdAt);
  });

  test('todoStatusToDb gère les données partielles correctement', () => {
    const partialStatus: Partial<TodoStatus> = {
      name: 'En attente',
      description: 'La tâche est en attente de validation',
    };

    const result = todoStatusToDb(partialStatus);

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.name).toBe(partialStatus.name);
    expect(result.description).toBe(partialStatus.description);

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined();
    expect(result.created_at).toBeUndefined();
  });
});
