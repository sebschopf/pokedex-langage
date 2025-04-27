import { createServerClient } from '@/lib/supabase/server';
import { dbToUsageCategory } from '@/lib/server/mapping/usage-category-mapping';
import { dbToLanguage } from '@/lib/server/mapping/language-mapping/language-mapping';
import type { UsageCategory } from '@/types/models/usage-category';
import type { Language } from '@/types/models/language';
import { filterNonNullable } from '@/utils/array';

/**
 * Récupère toutes les catégories d'usage
 */
export async function getAllUsageCategories(): Promise<UsageCategory[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('usage_categories').select('*').order('name');

    if (error) {
      console.error("Erreur lors de la récupération des catégories d'usage:", error);
      return [];
    }

    return data.map(dbToUsageCategory);
  } catch (error) {
    console.error("Exception lors de la récupération des catégories d'usage:", error);
    return [];
  }
}

/**
 * Récupère une catégorie d'usage par son ID
 */
export async function getUsageCategoryById(id: number): Promise<UsageCategory | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('usage_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Code d'erreur pour "No rows found"
        return null;
      }
      console.error(
        `Erreur lors de la récupération de la catégorie d'usage avec l'ID ${id}:`,
        error,
      );
      throw error;
    }

    return dbToUsageCategory(data);
  } catch (error) {
    console.error(
      `Exception lors de la récupération de la catégorie d'usage avec l'ID ${id}:`,
      error,
    );
    return null;
  }
}

/**
 * Récupère les langages associés à une catégorie d'usage
 */
export async function getLanguagesByUsageCategoryId(categoryId: number): Promise<Language[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('language_usage')
      .select('language_id')
      .eq('category_id', categoryId);

    if (error) {
      console.error(
        `Erreur lors de la récupération des langages pour la catégorie ${categoryId}:`,
        error,
      );
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Utiliser la fonction utilitaire filterNonNullable
    const languageIds = filterNonNullable(data.map(item => item.language_id));

    if (languageIds.length === 0) {
      return [];
    }

    const { data: languages, error: languagesError } = await supabase
      .from('languages')
      .select('*')
      .in('id', languageIds)
      .order('name');

    if (languagesError) {
      console.error(`Erreur lors de la récupération des langages:`, languagesError);
      return [];
    }

    return languages.map(dbToLanguage);
  } catch (error) {
    console.error(
      `Exception lors de la récupération des langages pour la catégorie ${categoryId}:`,
      error,
    );
    return [];
  }
}

/**
 * Récupère les catégories d'usage associées à un langage
 */
export async function getUsageCategoriesByLanguageId(languageId: number): Promise<UsageCategory[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('language_usage')
      .select('category_id')
      .eq('language_id', languageId);

    if (error) {
      console.error(
        `Erreur lors de la récupération des catégories pour le langage ${languageId}:`,
        error,
      );
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Utiliser la fonction utilitaire filterNonNullable
    const categoryIds = filterNonNullable(data.map(item => item.category_id));

    if (categoryIds.length === 0) {
      return [];
    }

    const { data: categories, error: categoriesError } = await supabase
      .from('usage_categories')
      .select('*')
      .in('id', categoryIds)
      .order('name');

    if (categoriesError) {
      console.error(`Erreur lors de la récupération des catégories:`, categoriesError);
      return [];
    }

    return categories.map(dbToUsageCategory);
  } catch (error) {
    console.error(
      `Exception lors de la récupération des catégories pour le langage ${languageId}:`,
      error,
    );
    return [];
  }
}
