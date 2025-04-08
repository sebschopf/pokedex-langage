export interface Library {
  id: string;
  name: string;
  languageId: string;
  description?: string | null;
  officialWebsite?: string | null;
  githubUrl?: string | null;
  logoPath?: string | null;
  popularity?: number | null;
  isOpenSource?: boolean | null;
  createdAt: string;
  updatedAt?: string | null;
  features?: string[] | null;
  uniqueSellingPoint?: string | null;
  bestFor?: string | null;
  usedFor?: string[] | null;
  documentationUrl?: string | null;
  version?: string | null;
  technologyType?: string | null;
  subtype?: string | null;
}