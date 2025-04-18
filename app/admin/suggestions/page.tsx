import { requireAdminSC } from "@/lib/server/auth/authorize"
import { getAllCorrections } from "@/lib/server/api/corrections"
import { submitCorrection } from "@/app/actions/correction-actions"
import { CorrectionList } from "@/components/admin/correction-list"

export default async function AdminSuggestionsPage() {
  // Vérifier que l'utilisateur est administrateur
  await requireAdminSC()

  // Récupérer toutes les corrections avec le statut "pending"
  const allCorrections = await getAllCorrections()
  const pendingCorrections = allCorrections.filter((correction) => correction.status === "pending")

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Suggestions en attente</h1>

      {pendingCorrections.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Aucune suggestion en attente</p>
      ) : (
        <CorrectionList corrections={pendingCorrections} showApproveReject={true} approveAction={submitCorrection} />
      )}
    </div>
  )
}
