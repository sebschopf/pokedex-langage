import { getAllCorrections, updateCorrectionStatus } from "@/lib/data"
import { RoleProtected } from "@/components/role-protected"

// Type local qui étend Correction avec les données jointes
type CorrectionWithJoins = Awaited<ReturnType<typeof getAllCorrections>>[number]

export default async function AdminCorrectionsPage() {
  const corrections = await getAllCorrections()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Corrections</h1>

      <RoleProtected requiredRole="validator">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Corrections en attente</h2>

          {corrections.filter((c) => c.status === "pending").length === 0 ? (
            <p className="text-muted-foreground">Aucune correction en attente.</p>
          ) : (
            <div className="space-y-4">
              {corrections
                .filter((c) => c.status === "pending")
                .map((correction) => {
                  // Déterminer le type de correction et le nom associé
                  const isFrameworkCorrection = !!correction.framework
                  const correctionName = isFrameworkCorrection
                    ? `Correction pour ${correction.framework}`
                    : `Correction pour langage ID: ${correction.languageId}`

                  return (
                    <div key={String(correction.id)} className="border p-4 rounded-md">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{correctionName}</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En attente</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Champ: {correction.field}</p>
                      <p className="mt-2">{correction.suggestion}</p>

                      <div className="mt-4 flex gap-2 justify-end">
                        <form
                          action={async () => {
                            "use server"
                            await updateCorrectionStatus(String(correction.id), "approved")
                          }}
                        >
                          <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">Approuver</button>
                        </form>

                        <form
                          action={async () => {
                            "use server"
                            await updateCorrectionStatus(String(correction.id), "rejected")
                          }}
                        >
                          <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm">Rejeter</button>
                        </form>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </RoleProtected>
    </div>
  )
}

