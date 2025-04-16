import { createServerSupabaseClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import StorageManager from "@/components/storage-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin/layout"

export const metadata = {
  title: "Gestion des médias | POKEDEX_DEV",
  description: "Gérez les médias du site",
}

export default async function AdminStoragePage() {
  const supabase = createServerClient()

  // Vérifier si l'utilisateur est connecté et a le rôle admin ou validator
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/storage")
  }

  // Vérifier le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole || (userRole.role !== "admin" && userRole.role !== "validator")) {
    redirect("/")
  }

  return (
    <AdminLayout userRole={userRole.role}>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">Gestion des médias</h1>

        <Tabs defaultValue="logos">
          <TabsList className="mb-6">
            <TabsTrigger value="logos">Logos des langages</TabsTrigger>
            <TabsTrigger value="avatars">Avatars</TabsTrigger>
            <TabsTrigger value="autres">Autres médias</TabsTrigger>
          </TabsList>

          <TabsContent value="logos">
            <StorageManager bucket="logos" path="" />
          </TabsContent>

          <TabsContent value="avatars">
            <StorageManager bucket="avatars" path="" />
          </TabsContent>

          <TabsContent value="autres">
            <StorageManager bucket="public" path="" />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
