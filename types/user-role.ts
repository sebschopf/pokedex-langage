export type UserRoleType = "admin" | "editor" | "user";

export interface UserRole {
  id: string;
  userId: string;
  role: UserRoleType;
  createdAt: string;
  updatedAt?: string | null;
}