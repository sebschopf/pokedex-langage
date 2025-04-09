export type UserRoleType = "admin" | "validator" | "verified" | "registered"

export interface UserRole {
  id: string;
  userId: string;
  role: UserRoleType;
  createdAt: string;
  updatedAt?: string | null;
}