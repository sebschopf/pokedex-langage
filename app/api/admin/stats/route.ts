import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(_request: Request) {
  const supabase = createServerClient()

  try {
    // Récupérer les utilisateurs (profiles)
    const { data: users, error: usersError } = await supabase.from("profiles").select("*")
    if (usersError) {
      console.error("Erreur lors de la récupération des profils:", usersError)
      return NextResponse.json({ error: "Échec de la récupération des profils" }, { status: 500 })
    }

    // Récupérer les langages
    const { data: products, error: productsError } = await supabase.from("languages").select("*")
    if (productsError) {
      console.error("Erreur lors de la récupération des langages:", productsError)
      return NextResponse.json({ error: "Échec de la récupération des langages" }, { status: 500 })
    }

    // Récupérer les corrections
    const { data: orders, error: ordersError } = await supabase.from("corrections").select("*")
    if (ordersError) {
      console.error("Erreur lors de la récupération des corrections:", ordersError)
      return NextResponse.json({ error: "Échec de la récupération des corrections" }, { status: 500 })
    }

    // Récupérer les todos
    const { data: todos, error: todosError } = await supabase.from("todos").select("*")
    if (todosError) {
      console.error("Erreur lors de la récupération des todos:", todosError)
      return NextResponse.json({ error: "Échec de la récupération des todos" }, { status: 500 })
    }

    // Récupérer les corrections en attente
    const { data: pendingCorrections, error: pendingCorrectionsError } = await supabase
      .from("corrections")
      .select("*")
      .eq("status", "pending")
    if (pendingCorrectionsError) {
      console.error("Erreur lors de la récupération des corrections en attente:", pendingCorrectionsError)
      return NextResponse.json({ error: "Échec de la récupération des corrections en attente" }, { status: 500 })
    }

    // Calculer les statistiques
    const userCount = users.length
    const productCount = products.length
    const orderCount = orders.length
    const todoCount = todos.length
    const pendingCount = pendingCorrections.length

    return NextResponse.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      todos: todoCount,
      pendingCorrections: pendingCount,
    })
  } catch (error) {
    console.error("Erreur inattendue lors de la récupération des statistiques:", error)
    return NextResponse.json({ error: "Erreur serveur inattendue" }, { status: 500 })
  }
}
