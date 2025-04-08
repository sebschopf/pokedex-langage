export type CorrectionStatus = "pending" | "approved" | "rejected";

export interface Correction {
  id: string;
  languageId: string;
  framework?: string | null;
  correctionText?: string | null;
  field: string;
  suggestion: string;
  status: CorrectionStatus;
  userId?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface NewCorrection {
  languageId: string;
  field: string;
  suggestion: string;
  type?: "language" | "framework";
  frameworkName?: string;
}