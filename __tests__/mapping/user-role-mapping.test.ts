import { dbToUserRole, userRoleToDb } from '@/lib/server/mapping/user-role-mapping';
import type { DbUserRole } from '@/types/database/user-role';
import type { UserRole } from '@/types/models/user-role';
import { describe, test, expect } from '@jest/globals';

describe('UserRole mapping', () => {
  // Données de test pour DbUserRole
  const mockDbUserRole: DbUserRole = {
    id: 'user123',
    role: 'admin',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
  };

  // Données de test pour UserRole
  const mockUserRole: UserRole = {
    id: 'user456',
    role: 'validator',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-02T00:00:00Z',
  };

  test('dbToUserRole convertit DbUserRole en UserRole correctement', () => {
    const result = dbToUserRole(mockDbUserRole);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbUserRole.id);
    expect(result.role).toBe(mockDbUserRole.role);
    expect(result.createdAt).toBe(mockDbUserRole.created_at);
    expect(result.updatedAt).toBe(mockDbUserRole.updated_at);
  });

  test('userRoleToDb convertit UserRole en DbUserRole correctement', () => {
    const result = userRoleToDb(mockUserRole);

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockUserRole.id);
    expect(result.role).toBe(mockUserRole.role);
    expect(result.created_at).toBe(mockUserRole.createdAt);
    expect(result.updated_at).toBe(mockUserRole.updatedAt);
  });

  test('Conversion aller-retour de DB à modèle et retour préserve toutes les données', () => {
    const model = dbToUserRole(mockDbUserRole);
    const dbAgain = userRoleToDb(model);

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain.id).toBe(mockDbUserRole.id);
    expect(dbAgain.role).toBe(mockDbUserRole.role);
    expect(dbAgain.created_at).toBe(mockDbUserRole.created_at);
    expect(dbAgain.updated_at).toBe(mockDbUserRole.updated_at);
  });

  test('Conversion aller-retour de modèle à DB et retour préserve toutes les données', () => {
    const db = userRoleToDb(mockUserRole);
    const modelAgain = dbToUserRole(db as DbUserRole);

    // Vérifier que toutes les propriétés sont préservées
    expect(modelAgain.id).toBe(mockUserRole.id);
    expect(modelAgain.role).toBe(mockUserRole.role);
    expect(modelAgain.createdAt).toBe(mockUserRole.createdAt);
    expect(modelAgain.updatedAt).toBe(mockUserRole.updatedAt);
  });

  test('userRoleToDb gère les données partielles correctement', () => {
    const partialUserRole: Partial<UserRole> = {
      id: 'user789',
      role: 'verified',
    };

    const result = userRoleToDb(partialUserRole);

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.id).toBe(partialUserRole.id);
    expect(result.role).toBe(partialUserRole.role);

    // Vérifier que les autres propriétés sont undefined
    expect(result.created_at).toBeUndefined();
    expect(result.updated_at).toBeUndefined();
  });
});
