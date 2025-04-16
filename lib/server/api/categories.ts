// Fonctions API pour les catégories
// À implémenter selon vos besoins

import type { TechnologyCategory, UsageCategory } from "@/types/models"
{ createServerClient } from "@/lib/supabase"
import { dbToTechnologyCategory } from "@/lib/server/mapping/technology-category-mapping"
import { dbToUsageCategory } from "@/lib/server/mapping/usage-category-mapping"

/**
 * Récupère toutes les catégories de technologie
 * @returns Liste des catégories
 */
export async function getTechnologyCategories(): Promise<TechnologyCategory[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("technology_categories").select("*")

    if (error) {
      console.error("Erreur lors de la récupération des catégories:", error)
      return []
    }

    // Note: Vous devrez créer la fonction dbToTechnologyCategory dans lib/server/mapping
    return data.map(dbToTechnologyCategory)
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error)
    return []
  }
}

/**
 * Récupère toutes les catégories d'usage
 * @returns Liste des catégories
 */
export async function getUsageCategories(): Promise<UsageCategory[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("usage_categories").select("*")

    if (error) {
      console.error("Erreur lors de la récupération des catégories d'usage:", error)
      return []
    }

    // Note: Vous devrez créer la fonction dbToUsageCategory dans lib/server/mapping
    return data.map(dbToUsageCategory)
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories d'usage:", error)
    return []
  }
}

// Ajoutez d'autres fonctions selon vos besoins
