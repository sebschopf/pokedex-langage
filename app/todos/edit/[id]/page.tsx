"use client"

import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase"
import { updateTodoAction, createTodoAction } from "@/app/actions/todo-actions"
import TodoForm from "@/components/todo-form"
import { dbToTodo } from "@/lib/server/mapping/todo-mapping"
import { RoleProtected } from "@/components/auth/role-protected"

export default async function EditTodoPage({ params }: { params: { id: string } }) {
  // Si l'ID est "new", c'est une création, sinon c'est une modification
  const isNew = params.id === "new"

  let todo = null

  if (!isNew) {
    // Récupérer la tâche existante
    const supabase = createServerClient()
    const { data, error } = await supabase.from("todos").select("*").eq("id", params.id).single()

    if (error || !data) {
      console.error("Erreur lors de la récupération de la tâche:", error)
      notFound()
    }

    todo = dbToTodo(data)
  }

  // Fonction pour créer ou mettre à jour une tâche
  async function handleSubmit(formData: FormData) {
    "use server"

    if (isNew) {
      // Créer une nouvelle tâche
      return await createTodoAction(formData)
    } else {
      // Mettre à jour une tâche existante
      return await updateTodoAction(Number(params.id), formData)
    }
  }

  return (
    <RoleProtected requiredRole="registered">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">{isNew ? "Créer une nouvelle tâche" : "Modifier la tâche"}</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <TodoForm todo={todo} onSubmit={handleSubmit} />
        </div>
      </div>
    </RoleProtected>
  )
}
