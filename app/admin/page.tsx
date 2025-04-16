import { requireAdminSC } from "@/lib/server/auth/authorize"
import { getUserWithDetails } from "@/lib/server/api/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminDashboardPage() {
  // Cette fonction redirigera automatiquement si l'utilisateur n'est pas admin
  const userId = await requireAdminSC()

  // Récupérer les détails de l'utilisateur
  const { profile } = await getUserWithDetails(userId)

  return (
    <div className="space-y-6">
      <AdminSidebar
        title="Tableau de bord d'administration"
        description={`Bienvenue, ${profile?.fullName || profile?.username || "Administrateur"}`}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Langages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123</div>
            <p className="text-xs text-muted-foreground">+5 ce mois-ci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Frameworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">+12 ce mois-ci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <p className="text-xs text-muted-foreground">+24 ce mois-ci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Corrections en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">8 nouvelles aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      {/* Autres sections du tableau de bord */}
    </div>
  )
}
