/**
 * Interface représentant une catégorie de technologie dans l'application
 */
export interface TechnologyCategory {
  id: number
  type: string
  color: string
  iconName: string
  createdAt: string | null
}
