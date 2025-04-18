/**
 * Interface représentant un sous-type de technologie dans l'application
 */
export interface TechnologySubtype {
  id: number
  name: string
  categoryId: number | null
  createdAt: string | null
}
