// app/admin/users/page.tsx
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { UserManagement } from "@/components/admin"

export const metadata = {
  title: "Gestion des utilisateurs | POKEDEX_DEV",
  description: "Gérez les rôles et les permissions des utilisateurs",
}

export default async function AdminUsersPage() {
  const supabase = createServerSupabaseClient()

  // Vérifier si l'utilisateur est connecté et a le rôle admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/users")
  }

  // Vérifier le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole || userRole.role !== "admin") {
    redirect("/admin/dashboard")
  }

  // Récupérer tous les utilisateurs avec leurs rôles
  const { data: usersData } = await supabase
    .from("user_roles")
    .select(`
      id,
      role,
      created_at,
      auth_users:id (
        email,
        created_at
      )
    `)
    .order("created_at", { ascending: false })

  // Transformer les données pour qu'elles correspondent à l'interface User
  const users =
    usersData?.map((user) => ({
      id: user.id,
      role: user.role,
      created_at: user.created_at,
      auth_users: {
        email: user.auth_users[0]?.email || "",
        created_at: user.auth_users[0]?.created_at || "",
      },
    })) || []

  return <UserManagement users={users} />
}

// Récupérer tous les utilisateurs avec leurs rôles
async function fetchUsers() {
  const supabase = createServerSupabaseClient();
  const { data: usersData } = await supabase
    .from("user_roles")
    .select(`
      id,
      role,
      created_at,
      profiles:id (
        avatar_url
      ),
      auth_users:id (
        email,
        created_at
      )
    `)
    .order("created_at", { ascending: false })

  // Transformer les données
  return (
    usersData?.map((user) => ({
      id: user.id,
      role: user.role,
      created_at: user.created_at,
      avatar_url: user.profiles?.[0]?.avatar_url || null,
      auth_users: {
        email: user.auth_users[0]?.email || "",
        created_at: user.auth_users[0]?.created_at || "",
      },
    })) || []
  )
}

(async () => {
  const users = await fetchUsers();
})();
