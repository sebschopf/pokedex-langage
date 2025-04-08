export interface Profile {
  id: string;
  userId: string;
  username?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  website?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}