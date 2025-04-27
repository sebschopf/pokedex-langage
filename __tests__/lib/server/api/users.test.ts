// __tests__/lib/server/api/users.test.ts
import { updateUserProfile } from '@/lib/server/api/users/profile';
import { createServerClient } from '@/lib/supabase/server';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import type { PostgrestSingleResponse, PostgrestError } from '@supabase/supabase-js';
import type { DbProfile } from '@/types/models/profile';

// Mock de createServerClient
jest.mock('@/lib/supabase/server', () => ({
  createServerClient: jest.fn(),
}));

describe('updateUserProfile', () => {
  // Créer un mock typé pour le client Supabase
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn<() => Promise<PostgrestSingleResponse<DbProfile>>>(),
  };

  const mockDbProfile: DbProfile = {
    id: 'test-user-id',
    username: 'updated-username',
    full_name: 'Updated Name',
    avatar_url: 'https://example.com/avatar.jpg',
    bio: 'Updated bio',
    website: 'https://updated-website.com',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
  };

  // Créer un mock d'erreur PostgrestError
  const mockPostgrestError: PostgrestError = {
    message: 'Erreur de mise à jour',
    details: "Détails de l'erreur",
    hint: "Indice pour résoudre l'erreur",
    code: 'PGRST123',
    name: 'PostgrestError',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createServerClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('devrait mettre à jour le profil utilisateur avec succès', async () => {
    // Configurer le mock pour retourner un profil mis à jour
    mockSupabase.single.mockResolvedValue({
      data: mockDbProfile,
      error: null,
      count: null,
      status: 200,
      statusText: 'OK',
    });

    const userId = 'test-user-id';
    const profileData = {
      username: 'updated-username',
      fullName: 'Updated Name',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'Updated bio',
      website: 'https://updated-website.com',
    };

    // Appeler la fonction
    const result = await updateUserProfile(userId, profileData);

    // Vérifier que les méthodes Supabase ont été appelées correctement
    expect(createServerClient).toHaveBeenCalled();
    expect(mockSupabase.from).toHaveBeenCalledWith('profiles');
    expect(mockSupabase.update).toHaveBeenCalledWith({
      username: 'updated-username',
      full_name: 'Updated Name',
      avatar_url: 'https://example.com/avatar.jpg',
      bio: 'Updated bio',
      website: 'https://updated-website.com',
    });
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', userId);
    expect(mockSupabase.select).toHaveBeenCalled();
    expect(mockSupabase.single).toHaveBeenCalled();

    // Vérifier le résultat
    expect(result).toEqual({
      id: 'test-user-id',
      username: 'updated-username',
      fullName: 'Updated Name',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'Updated bio',
      website: 'https://updated-website.com',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    });
  });

  it('devrait gérer les erreurs lors de la mise à jour', async () => {
    // Configurer le mock pour simuler une erreur
    mockSupabase.single.mockResolvedValue({
      data: null,
      error: mockPostgrestError,
      count: null,
      status: 400,
      statusText: 'Bad Request',
    });

    const userId = 'test-user-id';
    const profileData = { username: 'test-username' };

    // Vérifier que la fonction lance une erreur
    let errorCaught = false;
    try {
      await updateUserProfile(userId, profileData);
    } catch (error) {
      errorCaught = true;
      // Vérifier que l'erreur capturée est bien celle attendue
      expect(error).toBe(mockPostgrestError);
    }

    // Vérifier qu'une erreur a bien été capturée
    expect(errorCaught).toBe(true);
  });

  it('devrait mettre à jour uniquement les champs fournis', async () => {
    // Configurer le mock pour retourner un profil mis à jour
    mockSupabase.single.mockResolvedValue({
      data: mockDbProfile,
      error: null,
      count: null,
      status: 200,
      statusText: 'OK',
    });

    const userId = 'test-user-id';
    const profileData = {
      username: 'updated-username',
      // Seul le nom d'utilisateur est fourni
    };

    // Appeler la fonction
    await updateUserProfile(userId, profileData);

    // Vérifier que seul le champ username a été mis à jour
    expect(mockSupabase.update).toHaveBeenCalledWith({
      username: 'updated-username',
    });
  });
});
