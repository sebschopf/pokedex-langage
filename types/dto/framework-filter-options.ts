/**
 * Options de filtrage pour les frameworks
 */
export interface FrameworkFilterOptions {
  minPopularity?: number;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}
