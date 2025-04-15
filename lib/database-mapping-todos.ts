import type { DbTodo } from "@/types/database/todo"
import type { DbTodoCategory } from "@/types/database/todo-category"
import type { DbTodoStatus } from "@/types/database/todo-status"
import type { Todo, TodoCategory, TodoStatus } from "@/types/models/todo"

/**
 * Convertit un objet DbTodo en Todo
 * @param dbTodo Objet de la base de données
 * @returns Objet Todo pour l'application
 */
export function dbToTodo(dbTodo: DbTodo): Todo {
  return {
    id: dbTodo.id,
    title: dbTodo.title,
    description: dbTodo.description || "",
    isCompleted: dbTodo.is_completed || false,
    categoryId: dbTodo.category_id || null,
    statusId: dbTodo.status_id || null,
    userId: dbTodo.user_id || null,
    dueDate: dbTodo.due_date || null,
    createdAt: dbTodo.created_at || null,
    updatedAt: dbTodo.updated_at || null,
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
  if (todo.isCompleted !== undefined) dbTodo.is_completed = todo.isCompleted
  if (todo.categoryId !== undefined) dbTodo.category_id = todo.categoryId
  if (todo.statusId !== undefined) dbTodo.status_id = todo.statusId
  if (todo.userId !== undefined) dbTodo.user_id = todo.userId
  if (todo.dueDate !== undefined) dbTodo.due_date = todo.dueDate
  if (todo.createdAt !== undefined) dbTodo.created_at = todo.createdAt
  if (todo.updatedAt !== undefined) dbTodo.updated_at = todo.updatedAt

  return dbTodo
}

/**
 * Convertit un objet DbTodoCategory en TodoCategory
 * @param dbCategory Objet de la base de données
 * @returns Objet TodoCategory pour l'application
 */
export function dbToTodoCategory(dbCategory: DbTodoCategory): TodoCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    color: dbCategory.color,
    createdAt: dbCategory.created_at || null,
  }
}

/**
 * Convertit un objet TodoCategory en DbTodoCategory
 * @param category Objet de l'application
 * @returns Objet pour la base de données
 */
export function todoCategoryToDb(category: Partial<TodoCategory>): Partial<DbTodoCategory> {
  const dbCategory: Partial<DbTodoCategory> = {}

  if (category.id !== undefined) dbCategory.id = category.id
  if (category.name !== undefined) dbCategory.name = category.name
  if (category.color !== undefined) dbCategory.color = category.color
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt

  return dbCategory
}

/**
 * Convertit un objet DbTodoStatus en TodoStatus
 * @param dbStatus Objet de la base de données
 * @returns Objet TodoStatus pour l'application
 */
export function dbToTodoStatus(dbStatus: DbTodoStatus): TodoStatus {
  return {
    id: dbStatus.id,
    name: dbStatus.name,
    description: dbStatus.description || null,
    createdAt: dbStatus.created_at || null,
  }
}

/**
 * Convertit un objet TodoStatus en DbTodoStatus
 * @param status Objet de l'application
 * @returns Objet pour la base de données
 */
export function todoStatusToDb(status: Partial<TodoStatus>): Partial<DbTodoStatus> {
  const dbStatus: Partial<DbTodoStatus> = {}

  if (status.id !== undefined) dbStatus.id = status.id
  if (status.name !== undefined) dbStatus.name = status.name
  if (status.description !== undefined) dbStatus.description = status.description
  if (status.createdAt !== undefined) dbStatus.created_at = status.createdAt

  return dbStatus
}
