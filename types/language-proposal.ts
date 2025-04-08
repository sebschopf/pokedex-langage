export interface LanguageProposal {
  id: string;
  name: string;
  type?: string | null;
  description?: string | null;
  createdYear?: number | null;
  creator?: string | null;
  usedFor?: string | null;
  strengths?: string[] | null;
  popularFrameworks?: string[] | null;
  userId?: string | null;
  status: string;
  createdAt: string;
  updatedAt?: string | null;
  reason?: string | null;
  officialWebsite?: string | null;
  githubUrl?: string | null;
}