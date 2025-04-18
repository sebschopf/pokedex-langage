import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createServerClient()
  // Remplacer "users" par "profiles"
  const { data: users, error: usersError } = await supabase.from("profiles").select("*")

  // Remplacer "products" par "languages"
  const { data: products, error: productsError } = await supabase.from("languages").select("*")

  // Remplacer "orders" par "corrections"
  const { data: orders, error: ordersError } = await supabase.from("corrections").select("*")

  if (usersError || productsError || ordersError) {
    console.error("Error fetching data:", usersError, productsError, ordersError)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }

  const userCount = users ? users.length : 0
  const productCount = products ? products.length : 0
  const orderCount = orders ? orders.length : 0

  // Ajouter des statistiques sur les todos
  const { data: todos, error: todosError } = await supabase.from("todos").select("*")
  const todoCount = todos ? todos.length : 0

  // Ajouter des statistiques sur les formulaires en attente
  const { data: pendingCorrections, error: pendingCorrectionsError } = await supabase
    .from("corrections")
    .select("*")
    .eq("status", "pending")

  const pendingCount = pendingCorrections ? pendingCorrections.length : 0

  return NextResponse.json({
    users: userCount,
    products: productCount,
    orders: orderCount,
    todos: todoCount,
    pendingCorrections: pendingCount,
  })
}
