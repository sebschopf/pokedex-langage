import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Cette route API peut être utilisée pour revalider les pages après des modifications dans Supabase
// Vous pouvez configurer des webhooks Supabase pour appeler cette route
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Vérifier le secret pour sécuriser l'endpoint
    const secret = request.headers.get("x-revalidate-secret")
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 401 })
    }

    // Extraire les informations du webhook
    const { table, record, type } = body

    // Revalider les chemins appropriés en fonction de la table modifiée
    if (table === "languages") {
      // Revalider la page d'accueil et la page de détail du langage
      revalidatePath("/")
      if (record?.slug) {
        revalidatePath(`/languages/${record.slug}`)
      }
    } else if (table === "frameworks") {
      // Revalider la page du langage associé
      if (record?.language_id) {
        // Vous devrez peut-être récupérer le slug du langage à partir de l'ID
        // Pour simplifier, nous revalidons toutes les pages
        revalidatePath("/")
      }
    } else if (table === "corrections") {
      // Revalider la page d'administration des corrections
      revalidatePath("/admin/corrections")
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error("Erreur lors de la revalidation:", error)
    return NextResponse.json({ error: "Erreur lors de la revalidation" }, { status: 500 })
  }
}
