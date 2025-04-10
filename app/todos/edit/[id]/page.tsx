import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { TodoForm } from "@/components/todo-form"

export const dynamic = "force-dynamic"

export default async function EditTodoPage({ params }: { params: { id: string } }) {
  const todoId = Number.parseInt(params.id)

  // Vérifier si l'utilisateur est connecté
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Récupérer la tâche
  const { data: todo, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", todoId)
    .eq("user_id", session.user.id)
    .single()

  if (error || !todo) {
    redirect("/todos")
  }

  // Récupérer les catégories et les statuts
  const { data: categories } = await supabase.from("todo_categories").select("*").order("name")

  const { data: statuses } = await supabase.from("todo_status").select("*").order("id")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Modifier la tâche</h1>
      <div className="max-w-2xl mx-auto">
        <TodoForm todo={todo} categories={categories || []} statuses={statuses || []} />
      </div>
    </div>
  )
}
