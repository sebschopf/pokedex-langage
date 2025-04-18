import {
    dbProfileToProfile,
    profileToDbProfile,
    dbUserToUser,
    userToDbUser,
    dbUserWithProfileToUserWithProfile,
    userWithProfileToDbUserWithProfile,
    createProfileWithAuth,
  } from "@/lib/server/mapping/profile-mapping"
  import type { DbProfile, DbUser, DbUserWithProfile } from "@/types/database/profile"
  import type { Profile, User, UserWithProfile } from "@/types/models/profile"
  import { describe, test, expect } from "@jest/globals"
  
  describe("Profile mapping", () => {
    // Données de test pour DbProfile
    const mockDbProfile: DbProfile = {
      id: "user123",
      username: "johndoe",
      full_name: "John Doe",
      avatar_url: "/images/avatar.png",
      bio: "Software developer",
      website: "https://johndoe.com",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
    }
  
    // Données de test pour Profile
    const mockProfile: Profile = {
      id: "user456",
      username: "janedoe",
      fullName: "Jane Doe",
      avatarUrl: "/images/jane.png",
      bio: "UX Designer",
      website: "https://janedoe.com",
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2023-02-02T00:00:00Z",
    }
  
    // Données de test pour DbUser
    const mockDbUser: DbUser = {
      id: "user123",
      email: "john@example.com",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
    }
  
    // Données de test pour User
    const mockUser: User = {
      id: "user456",
      email: "jane@example.com",
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2023-02-02T00:00:00Z",
    }
  
    // Données de test pour DbUserWithProfile
    const mockDbUserWithProfile: DbUserWithProfile = {
      ...mockDbUser,
      profile: mockDbProfile,
      role: "admin",
    }
  
    // Données de test pour UserWithProfile
    const mockUserWithProfile: UserWithProfile = {
      ...mockUser,
      profile: mockProfile,
      role: "validator",
    }
  
    test("dbProfileToProfile converts DbProfile to Profile correctly", () => {
      const result = dbProfileToProfile(mockDbProfile)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockDbProfile.id)
      expect(result.username).toBe(mockDbProfile.username)
      expect(result.fullName).toBe(mockDbProfile.full_name)
      expect(result.avatarUrl).toBe(mockDbProfile.avatar_url)
      expect(result.bio).toBe(mockDbProfile.bio)
      expect(result.website).toBe(mockDbProfile.website)
      expect(result.createdAt).toBe(mockDbProfile.created_at)
      expect(result.updatedAt).toBe(mockDbProfile.updated_at)
    })
  
    test("profileToDbProfile converts Profile to DbProfile correctly", () => {
      const result = profileToDbProfile(mockProfile)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockProfile.id)
      expect(result.username).toBe(mockProfile.username)
      expect(result.full_name).toBe(mockProfile.fullName)
      expect(result.avatar_url).toBe(mockProfile.avatarUrl)
      expect(result.bio).toBe(mockProfile.bio)
      expect(result.website).toBe(mockProfile.website)
      expect(result.created_at).toBe(mockProfile.createdAt)
      expect(result.updated_at).toBe(mockProfile.updatedAt)
    })
  
    test("dbUserToUser converts DbUser to User correctly", () => {
      const result = dbUserToUser(mockDbUser)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockDbUser.id)
      expect(result.email).toBe(mockDbUser.email)
      expect(result.createdAt).toBe(mockDbUser.created_at)
      expect(result.updatedAt).toBe(mockDbUser.updated_at)
    })
  
    test("userToDbUser converts User to DbUser correctly", () => {
      const result = userToDbUser(mockUser)
  
      // Vérifier que toutes les propriétés sont correctement converties
      expect(result.id).toBe(mockUser.id)
      expect(result.email).toBe(mockUser.email)
      expect(result.created_at).toBe(mockUser.createdAt)
      expect(result.updated_at).toBe(mockUser.updatedAt)
    })
  
    test("dbUserWithProfileToUserWithProfile converts DbUserWithProfile to UserWithProfile correctly", () => {
      const result = dbUserWithProfileToUserWithProfile(mockDbUserWithProfile)
  
      // Vérifier que les propriétés de base sont correctement converties
      expect(result.id).toBe(mockDbUserWithProfile.id)
      expect(result.email).toBe(mockDbUserWithProfile.email)
      expect(result.createdAt).toBe(mockDbUserWithProfile.created_at)
      expect(result.updatedAt).toBe(mockDbUserWithProfile.updated_at)
      expect(result.role).toBe(mockDbUserWithProfile.role)
  
      // Vérifier que le profil est correctement converti
      expect(result.profile).toBeDefined()
      if (result.profile) {
        expect(result.profile.id).toBe(mockDbUserWithProfile.profile?.id)
        expect(result.profile.username).toBe(mockDbUserWithProfile.profile?.username)
        expect(result.profile.fullName).toBe(mockDbUserWithProfile.profile?.full_name)
        // etc.
      }
    })
  
    test("userWithProfileToDbUserWithProfile converts UserWithProfile to DbUserWithProfile correctly", () => {
      const result = userWithProfileToDbUserWithProfile(mockUserWithProfile)
  
      // Vérifier que les propriétés de base sont correctement converties
      expect(result.id).toBe(mockUserWithProfile.id)
      expect(result.email).toBe(mockUserWithProfile.email)
      expect(result.created_at).toBe(mockUserWithProfile.createdAt)
      expect(result.updated_at).toBe(mockUserWithProfile.updatedAt)
      expect(result.role).toBe(mockUserWithProfile.role)
  
      // Vérifier que le profil est correctement converti
      expect(result.profile).toBeDefined()
      if (result.profile) {
        expect(result.profile.id).toBe(mockUserWithProfile.profile?.id)
        expect(result.profile.username).toBe(mockUserWithProfile.profile?.username)
        expect(result.profile.full_name).toBe(mockUserWithProfile.profile?.fullName)
        // etc.
      }
    })
  
    test("createProfileWithAuth combines profile and auth data correctly", () => {
      const authData = {
        email: "john@example.com",
        email_confirmed_at: "2023-01-01T00:00:00Z",
      }
  
      const result = createProfileWithAuth(mockProfile, authData)
  
      // Vérifier que les propriétés du profil sont préservées
      expect(result.id).toBe(mockProfile.id)
      expect(result.username).toBe(mockProfile.username)
      expect(result.fullName).toBe(mockProfile.fullName)
      // etc.
  
      // Vérifier que les données d'authentification sont ajoutées
      expect(result.email).toBe(authData.email)
      expect(result.isVerified).toBe(true)
    })
  
    test("createProfileWithAuth handles unverified email correctly", () => {
      const authData = {
        email: "john@example.com",
        email_confirmed_at: null,
      }
  
      const result = createProfileWithAuth(mockProfile, authData)
  
      expect(result.email).toBe(authData.email)
      expect(result.isVerified).toBe(false)
    })
  
    test("Round-trip conversion from DB to model and back preserves all data", () => {
      const model = dbProfileToProfile(mockDbProfile)
      const dbAgain = profileToDbProfile(model)
  
      // Vérifier que toutes les propriétés sont préservées
      expect(dbAgain).toEqual(mockDbProfile)
    })
  
    test("Round-trip conversion from model to DB and back preserves all data", () => {
      const db = profileToDbProfile(mockProfile)
      const modelAgain = dbProfileToProfile(db)
  
      // Vérifier que toutes les propriétés sont préservées
      expect(modelAgain).toEqual(mockProfile)
    })
  
    test("dbProfileToProfile handles null values correctly", () => {
      const dbProfileWithNulls: DbProfile = {
        id: "user789",
        username: null,
        full_name: null,
        avatar_url: null,
        bio: null,
        website: null,
        created_at: null,
        updated_at: null,
      }
  
      const result = dbProfileToProfile(dbProfileWithNulls)
  
      expect(result.id).toBe(dbProfileWithNulls.id)
      expect(result.username).toBeNull()
      expect(result.fullName).toBeNull()
      expect(result.avatarUrl).toBeNull()
      expect(result.bio).toBeNull()
      expect(result.website).toBeNull()
      expect(result.createdAt).toBeNull()
      expect(result.updatedAt).toBeNull()
    })
  })
  