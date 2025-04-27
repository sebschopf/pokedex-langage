/**
 * Interface représentant un statut de tâche dans l'application
 */
export interface TodoStatus {
  id: number;
  name: string;
  description: string | null;
  createdAt: string | null;
}
