import type { DbLanguage } from '@/types/database/language';
import type { Language } from '@/types/models/language';

/**
 * Convertit un objet de langage de la base de données en objet de langage pour l'application
 * @param dbLanguage Objet de la base de données à convertir
 * @returns Objet de langage pour l'application
 */
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  // Convertir tools de Json à Record<string, any> | null
  let toolsConverted: Record<string, any> | null = null;

  if (dbLanguage.tools) {
    // Si c'est une chaîne, essayer de la parser en JSON
    if (typeof dbLanguage.tools === 'string') {
      try {
        toolsConverted = JSON.parse(dbLanguage.tools);
      } catch (e) {
        console.error('Erreur lors de la conversion de tools:', e);
        toolsConverted = null;
      }
    }
    // Si c'est déjà un objet, l'utiliser directement
    else if (typeof dbLanguage.tools === 'object') {
      toolsConverted = dbLanguage.tools as Record<string, any>;
    }
  }

  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    description: dbLanguage.description ?? null,
    shortDescription: dbLanguage.short_description ?? null,
    type: dbLanguage.type ?? null,
    creator: dbLanguage.creator ?? null,
    yearCreated: dbLanguage.year_created ?? null,
    usageRate: dbLanguage.usage_rate ?? null,
    isOpenSource: dbLanguage.is_open_source ?? null,
    usedFor: dbLanguage.used_for ?? null,
    logoPath: dbLanguage.logo_path ?? null,
    popularFrameworks: dbLanguage.popular_frameworks ?? null,
    createdAt: dbLanguage.created_at ?? null,
    updatedAt: dbLanguage.updated_at ?? null,
    githubUrl: dbLanguage.github_url ?? null,
    websiteUrl: dbLanguage.website_url ?? null,
    currentVersion: dbLanguage.current_version ?? null,
    lastUpdated: dbLanguage.last_updated ?? null,
    license: dbLanguage.license ?? null,
    difficulty: dbLanguage.difficulty ?? null,
    strengths: dbLanguage.strengths ?? null,
    tools: toolsConverted,
  };
}
