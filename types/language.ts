export type LanguageType = "Frontend" | "Backend" | "Fullstack" | "Mobile" | "Data" | "Business";

export interface Language {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logoPath?: string | null;
  officialWebsite?: string | null;
  githubUrl?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  type?: LanguageType | null;
  popularity?: number | null;
  firstAppeared?: number | null;
  latestVersion?: string | null;
  isOpenSource?: boolean | null;
  usedFor?: string[] | null;
  features?: string[] | null;
  paradigms?: string[] | null;
  uniqueSellingPoint?: string | null;
  bestFor?: string | null;
  documentationUrl?: string | null;
  shortDescription?: string | null;
  usageRate?: number | null;
  strengths?: string[] | null;
  popularFrameworks?: string[] | null;
  tools?: any[] | null;
  createdYear?: number | null;
  creator?: string | null;
  logo?: string | null;
}