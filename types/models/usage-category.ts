// Vérifier si l'interface UsageCategory correspond à celle du fichier SQL attaché
// Si nécessaire, mettre à jour l'interface pour qu'elle corresponde

/**
 * Interface représentant une catégorie d'usage dans l'application
 */
export interface UsageCategory {
  id: number
  name: string
  description: string | null
  createdAt: string | null
  updatedAt: string | null
}
