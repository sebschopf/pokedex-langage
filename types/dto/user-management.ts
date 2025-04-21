import type { UserRoleTypeDB } from "@/lib/client/permissions"

export interface AuthUser {
  id: string // UUID dans Supabase
  email: string
  createdAt: string
  lastSignInAt: string | null
}

export interface UserRoleData {
  id: string // UUID dans Supabase
  role: UserRoleTypeDB
  createdAt: string
  updatedAt: string | null
}

export interface UserProfile {
  id: string // UUID dans Supabase
  avatarUrl: string | null
  fullName: string | null
  username: string | null
  bio: string | null
  website: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface UserWithDetails {
  id: string // UUID dans Supabase
  auth: AuthUser
  role: UserRoleData
  profile: UserProfile
}
