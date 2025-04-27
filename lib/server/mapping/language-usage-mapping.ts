import type { DbLanguageUsage } from '@/types/database/language-usage';
import type { LanguageUsage } from '@/types/models/language-usage';

/**
 * Convertit un usage de langage de la base de données en modèle d'application
 * @param dbUsage Usage de langage de la base de données
 * @returns Usage de langage pour l'application
 */
export function dbToLanguageUsage(dbUsage: DbLanguageUsage): LanguageUsage {
  return {
    id: dbUsage.id,
    languageId: dbUsage.language_id,
    categoryId: dbUsage.category_id,
    createdAt: dbUsage.created_at,
  };
}

/**
 * Convertit un modèle d'application en usage de langage pour la base de données
 * @param usage Usage de langage pour l'application
 * @returns Usage de langage pour la base de données
 */
export function languageUsageToDb(usage: LanguageUsage): DbLanguageUsage {
  return {
    id: usage.id,
    language_id: usage.languageId,
    category_id: usage.categoryId,
    created_at: usage.createdAt,
  };
}
