/**
 * Interface représentant une catégorie de tâche dans l'application
 */
export interface TodoCategory {
  id: number;
  name: string;
  color: string;
  createdAt: string | null;
}
