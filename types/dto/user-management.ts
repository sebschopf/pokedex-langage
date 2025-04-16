import type { UserRoleTypeDB } from "@/lib/client/permissions"

export interface AuthUser {
  id: number
  email: string
  createdAt: string
  lastSignInAt: string | null
}

export interface UserRoleData {
  id: number
  role: UserRoleTypeDB
  createdAt: string
  updatedAt: string | null
}

export interface UserProfile {
  id: number
  avatarUrl: string | null
  fullName: string | null
  username: string | null
  bio: string | null
  website: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface UserWithDetails {
  id: number
  auth: AuthUser
  role: UserRoleData
  profile: UserProfile
}
