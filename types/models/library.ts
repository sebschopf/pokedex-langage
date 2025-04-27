/**
 * Type représentant une bibliothèque ou un framework dans l'application
 */
export type Library = {
  id: number;
  name: string;
  slug: string;
  languageId: number | null;
  description: string | null;
  officialWebsite: string | null;
  githubUrl: string | null;
  logoPath: string | null;
  popularity: number | null;
  isOpenSource: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  features: string[] | null;
  uniqueSellingPoint: string | null;
  bestFor: string | null;
  usedFor: string | null;
  documentationUrl: string | null;
  version: string | null;
  technologyType: string | null;
  subtype: string | null;
  license: string | null;
  websiteUrl: string | null;
};
