import type { DbTodo, DbUser } from "@/types/database/todo"
import type { DbTodoCategory } from "@/types/database/todo-category"
import type { DbTodoStatus } from "@/types/database/todo-status"
import type { Todo, TodoWithDetails, User } from "@/types/models/todo"

/**
 * Convertit un objet de tâche de la base de données en objet de tâche pour l'application
 */
export function dbToTodo(dbTodo: DbTodo): Todo {
  return {
    id: dbTodo.id,
    title: dbTodo.title,
    description: dbTodo.description,
    isCompleted: dbTodo.is_completed,
    categoryId: dbTodo.category_id,
    statusId: dbTodo.status_id,
    userId: dbTodo.user_id,
    dueDate: dbTodo.due_date,
    createdAt: dbTodo.created_at,
    updatedAt: dbTodo.updated_at,
  }
}

/**
 * Convertit un objet de tâche de l'application en objet de tâche pour la base de données
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
 * Convertit un objet utilisateur de la base de données en objet utilisateur pour l'application
 */
export function dbToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    username: dbUser.username,
    avatarUrl: dbUser.avatar_url,
  }
}

/**
 * Convertit un objet de tâche de la base de données avec des relations en objet de tâche détaillé pour l'application
 */
export function dbToTodoWithDetails(
  dbTodo: DbTodo,
  dbCategory?: DbTodoCategory,
  dbStatus?: DbTodoStatus,
  dbUser?: DbUser,
): TodoWithDetails {
  const todo = dbToTodo(dbTodo)

  return {
    ...todo,
    category: dbCategory
      ? {
          id: dbCategory.id,
          name: dbCategory.name,
          createdAt: dbCategory.created_at,
        }
      : null,
    status: dbStatus
      ? {
          id: dbStatus.id,
          name: dbStatus.name,
          description: dbStatus.description,
          createdAt: dbStatus.created_at,
        }
      : null,
    user: dbUser ? dbToUser(dbUser) : null,
  }
}
