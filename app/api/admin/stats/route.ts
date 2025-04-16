import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createServerClient()
  const { data: users, error: usersError } = await supabase.from("users").select("*")

  const { data: products, error: productsError } = await supabase.from("products").select("*")

  const { data: orders, error: ordersError } = await supabase.from("orders").select("*")

  if (usersError || productsError || ordersError) {
    console.error("Error fetching data:", usersError, productsError, ordersError)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }

  const userCount = users ? users.length : 0
  const productCount = products ? products.length : 0
  const orderCount = orders ? orders.length : 0

  return NextResponse.json({
    users: userCount,
    products: productCount,
    orders: orderCount,
  })
}
