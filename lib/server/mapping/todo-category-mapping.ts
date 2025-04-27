import type { DbTodoCategory } from '@/types/database/todo-category';
import type { TodoCategory } from '@/types/models/todo-category';

/**
 * Convertit un objet de catégorie de tâche de la base de données en objet de catégorie de tâche pour l'application
 */
export function dbToTodoCategory(dbTodoCategory: DbTodoCategory): TodoCategory {
  return {
    id: dbTodoCategory.id,
    name: dbTodoCategory.name,
    color: dbTodoCategory.color,
    createdAt: dbTodoCategory.created_at,
  };
}

/**
 * Convertit un objet de catégorie de tâche de l'application en objet de catégorie de tâche pour la base de données
 */
export function todoCategoryToDb(todoCategory: Partial<TodoCategory>): Partial<DbTodoCategory> {
  const dbTodoCategory: Partial<DbTodoCategory> = {};

  if (todoCategory.id !== undefined) dbTodoCategory.id = todoCategory.id;
  if (todoCategory.name !== undefined) dbTodoCategory.name = todoCategory.name;
  if (todoCategory.color !== undefined) dbTodoCategory.color = todoCategory.color;
  if (todoCategory.createdAt !== undefined) dbTodoCategory.created_at = todoCategory.createdAt;

  return dbTodoCategory;
}
