import { dbToTodo, todoToDb, dbToTodoWithDetails, dbToUser } from "@/lib/server/mapping/todo-mapping"
import type { DbTodo, DbUser } from "@/types/database/todo"
import type { DbTodoCategory } from "@/types/database/todo-category"
import type { DbTodoStatus } from "@/types/database/todo-status"
import type { Todo } from "@/types/models/todo"
import { describe, test, expect } from "@jest/globals"

describe("Todo mapping", () => {
  // Données de test pour DbTodo
  const mockDbTodo: DbTodo = {
    id: 1,
    title: "Implémenter les tests",
    description: "Créer des tests unitaires pour les mappings",
    is_completed: false,
    category_id: 1,
    status_id: 2,
    user_id: "user123",
    due_date: "2023-12-31T00:00:00Z",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  }

  // Données de test pour Todo
  const mockTodo: Todo = {
    id: 2,
    title: "Refactoriser le code",
    description: "Améliorer la structure du code",
    isCompleted: true,
    categoryId: 3,
    statusId: 4,
    userId: "user456",
    dueDate: "2023-11-30T00:00:00Z",
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-02T00:00:00Z",
  }

  // Données de test pour les relations
  const mockDbCategory: DbTodoCategory = {
    id: 1,
    name: "Développement",
    color: "#4CAF50",
    created_at: "2023-01-01T00:00:00Z",
  }

  const mockDbStatus: DbTodoStatus = {
    id: 2,
    name: "En cours",
    description: "La tâche est en cours de réalisation",
    created_at: "2023-01-01T00:00:00Z",
  }

  const mockDbUser: DbUser = {
    id: "user123",
    username: "johndoe",
    avatar_url: "/images/avatar.png",
  }

  test("dbToTodo convertit DbTodo en Todo correctement", () => {
    const result = dbToTodo(mockDbTodo)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockDbTodo.id)
    expect(result.title).toBe(mockDbTodo.title)
    expect(result.description).toBe(mockDbTodo.description)
    expect(result.isCompleted).toBe(mockDbTodo.is_completed)
    expect(result.categoryId).toBe(mockDbTodo.category_id)
    expect(result.statusId).toBe(mockDbTodo.status_id)
    expect(result.userId).toBe(mockDbTodo.user_id)
    expect(result.dueDate).toBe(mockDbTodo.due_date)
    expect(result.createdAt).toBe(mockDbTodo.created_at)
    expect(result.updatedAt).toBe(mockDbTodo.updated_at)
  })

  test("todoToDb convertit Todo en DbTodo correctement", () => {
    const result = todoToDb(mockTodo)

    // Vérifier que toutes les propriétés sont correctement converties
    expect(result.id).toBe(mockTodo.id)
    expect(result.title).toBe(mockTodo.title)
    expect(result.description).toBe(mockTodo.description)
    expect(result.is_completed).toBe(mockTodo.isCompleted)
    expect(result.category_id).toBe(mockTodo.categoryId)
    expect(result.status_id).toBe(mockTodo.statusId)
    expect(result.user_id).toBe(mockTodo.userId)
    expect(result.due_date).toBe(mockTodo.dueDate)
    expect(result.created_at).toBe(mockTodo.createdAt)
    expect(result.updated_at).toBe(mockTodo.updatedAt)
  })

  test("dbToTodoWithDetails convertit DbTodo avec relations en TodoWithDetails correctement", () => {
    const result = dbToTodoWithDetails(mockDbTodo, mockDbCategory, mockDbStatus, mockDbUser)

    // Vérifier les propriétés de base
    expect(result.id).toBe(mockDbTodo.id)
    expect(result.title).toBe(mockDbTodo.title)

    // Vérifier les relations
    expect(result.category).not.toBeNull()
    if (result.category) {
      expect(result.category.id).toBe(mockDbCategory.id)
      expect(result.category.name).toBe(mockDbCategory.name)
      expect(result.category.createdAt).toBe(mockDbCategory.created_at)
    }

    expect(result.status).not.toBeNull()
    if (result.status) {
      expect(result.status.id).toBe(mockDbStatus.id)
      expect(result.status.name).toBe(mockDbStatus.name)
      expect(result.status.description).toBe(mockDbStatus.description)
      expect(result.status.createdAt).toBe(mockDbStatus.created_at)
    }

    expect(result.user).not.toBeNull()
    if (result.user) {
      expect(result.user.id).toBe(mockDbUser.id)
      expect(result.user.username).toBe(mockDbUser.username)
      expect(result.user.avatarUrl).toBe(mockDbUser.avatar_url)
    }
  })

  test("dbToUser convertit DbUser en User correctement", () => {
    const result = dbToUser(mockDbUser)

    expect(result.id).toBe(mockDbUser.id)
    expect(result.username).toBe(mockDbUser.username)
    expect(result.avatarUrl).toBe(mockDbUser.avatar_url)
  })

  test("Conversion aller-retour de DB à modèle et retour préserve toutes les données", () => {
    const model = dbToTodo(mockDbTodo)
    const dbAgain = todoToDb(model)

    // Vérifier que toutes les propriétés sont préservées
    expect(dbAgain.id).toBe(mockDbTodo.id)
    expect(dbAgain.title).toBe(mockDbTodo.title)
    expect(dbAgain.description).toBe(mockDbTodo.description)
    expect(dbAgain.is_completed).toBe(mockDbTodo.is_completed)
    expect(dbAgain.category_id).toBe(mockDbTodo.category_id)
    expect(dbAgain.status_id).toBe(mockDbTodo.status_id)
    expect(dbAgain.user_id).toBe(mockDbTodo.user_id)
    expect(dbAgain.due_date).toBe(mockDbTodo.due_date)
    expect(dbAgain.created_at).toBe(mockDbTodo.created_at)
    expect(dbAgain.updated_at).toBe(mockDbTodo.updated_at)
  })

  test("todoToDb gère les données partielles correctement", () => {
    const partialTodo: Partial<Todo> = {
      title: "Tâche partielle",
      statusId: 5,
    }

    const result = todoToDb(partialTodo)

    // Vérifier que seules les propriétés fournies sont converties
    expect(result.title).toBe(partialTodo.title)
    expect(result.status_id).toBe(partialTodo.statusId)

    // Vérifier que les autres propriétés sont undefined
    expect(result.id).toBeUndefined()
    expect(result.description).toBeUndefined()
    expect(result.is_completed).toBeUndefined()
    // etc.
  })
})
