import type { DbTodo, DbTodoCategory, DbTodoStatus } from "@/types/database"
import type { Todo, TodoCategory, TodoStatus } from "@/types/models"

/**
 * Convertit un objet DbTodo en Todo
 * @param dbTodo Objet de la base de données
 * @returns Objet Todo pour l'application
 */
export function dbToTodo(dbTodo: DbTodo): Todo {
  return {
    id: dbTodo.id,
    title: dbTodo.title,
    description: dbTodo.description,
    statusId: dbTodo.status_id,
    categoryId: dbTodo.category_id,
    userId: dbTodo.user_id,
    isCompleted: dbTodo.is_completed,
    dueDate: dbTodo.due_date,
    createdAt: dbTodo.created_at,
    updatedAt: dbTodo.updated_at,
  }
}

/**
 * Convertit un objet Todo en DbTodo
 * @param todo Objet de l'application
 * @returns Objet pour la base de données
 */
export function todoToDb(todo: Partial<Todo>): Partial<DbTodo> {
  const dbTodo: Partial<DbTodo> = {}

  if (todo.id !== undefined) dbTodo.id = todo.id
  if (todo.title !== undefined) dbTodo.title = todo.title
  if (todo.description !== undefined) dbTodo.description = todo.description
  if (todo.statusId !== undefined) dbTodo.status_id = todo.statusId
  if (todo.categoryId !== undefined) dbTodo.category_id = todo.categoryId
  if (todo.userId !== undefined) dbTodo.user_id = todo.userId
  if (todo.isCompleted !== undefined) dbTodo.is_completed = todo.isCompleted
  if (todo.dueDate !== undefined) dbTodo.due_date = todo.dueDate
  if (todo.createdAt !== undefined) dbTodo.created_at = todo.createdAt
  if (todo.updatedAt !== undefined) dbTodo.updated_at = todo.updatedAt

  return dbTodo
}
