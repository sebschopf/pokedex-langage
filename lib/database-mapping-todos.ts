import type { Todo, TodoCategory, TodoStatus } from "@/types"

// Types DB pour les todos (à ajouter dans database.ts si ce n'est pas déjà fait)
export type DbTodo = {
  id: number
  title: string
  description: string | null
  status_id: number | null
  category_id: number | null
  user_id: string
  is_completed: boolean
  due_date: string | null
  created_at: string
  updated_at: string
}

export type DbTodoCategory = {
  id: number
  name: string
  color: string
  created_at: string
}

export type DbTodoStatus = {
  id: number
  name: string
  description: string | null
  created_at: string
}

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
    status_id: dbTodo.status_id,
    category_id: dbTodo.category_id,
    user_id: dbTodo.user_id,
    is_completed: dbTodo.is_completed,
    due_date: dbTodo.due_date,
    created_at: dbTodo.created_at,
    updated_at: dbTodo.updated_at,
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
  if (todo.status_id !== undefined) dbTodo.status_id = todo.status_id
  if (todo.category_id !== undefined) dbTodo.category_id = todo.category_id
  if (todo.user_id !== undefined) dbTodo.user_id = todo.user_id
  if (todo.is_completed !== undefined) dbTodo.is_completed = todo.is_completed
  if (todo.due_date !== undefined) dbTodo.due_date = todo.due_date
  if (todo.created_at !== undefined) dbTodo.created_at = todo.created_at
  if (todo.updated_at !== undefined) dbTodo.updated_at = todo.updated_at

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
    created_at: dbCategory.created_at,
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
  if (category.created_at !== undefined) dbCategory.created_at = category.created_at

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
    description: dbStatus.description,
    created_at: dbStatus.created_at,
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
  if (status.created_at !== undefined) dbStatus.created_at = status.created_at

  return dbStatus
}
