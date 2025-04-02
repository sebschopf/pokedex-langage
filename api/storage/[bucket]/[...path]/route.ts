import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { bucket: string; path: string[] } }
) {
  const { bucket, path } = params
  const filePath = path.join("/")

  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Vérifier si le bucket existe
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error("Erreur lors de la récupération des buckets:", bucketsError)
      return NextResponse.json(
        { error: "Erreur lors de la récupération des buckets" },
        { status: 500 }
      )
    }

    const bucketExists = buckets.some((b) => b.name === bucket)
    if (!bucketExists) {
      return NextResponse.json(
        { error: `Le bucket '${bucket}' n'existe pas` },
        { status: 404 }
      )
    }

    // Télécharger le fichier
    const { data, error } = await supabase.storage.from(bucket).download(filePath)

    if (error) {
      console.error("Erreur lors du téléchargement du fichier:", error)
      return NextResponse.json(
        { error: `Fichier non trouvé: ${filePath}` },
        { status: 404 }
      )
    }

    // Déterminer le type MIME
    const contentType = getContentType(filePath)

    // Créer une réponse avec le fichier
    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du fichier" },
      { status: 500 }
    )
  }
}

// Fonction pour déterminer le type MIME en fonction de l'extension du fichier
function getContentType(filePath: string): string {
  const extension = filePath.split(".").pop()?.toLowerCase() || ""
  
  const mimeTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    pdf: "application/pdf",
    json: "application/json",
    txt: "text/plain",
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
  }

  return mimeTypes[extension] || "application/octet-stream"
}