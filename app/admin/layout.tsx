import type React from "react"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin"

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  // Vérifier si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/dashboard")
  }

  // Vérifier le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole || (userRole.role !== "admin" && userRole.role !== "validator")) {
    redirect("/")
  }

  return <AdminLayout userRole={userRole.role}>{children}</AdminLayout>
}
