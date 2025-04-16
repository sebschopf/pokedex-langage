import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { dbToCorrection } from "@/lib/server/mapping/correction-mapping"

export async function GET(request: Request) {
  try {
    const supabase = createServerClient()
    const url = new URL(request.url)
    const languageId = url.searchParams.get("languageId")
    const status = url.searchParams.get("status") || "pending"

    let query = supabase.from("corrections").select("*")

    if (languageId) {
      query = query.eq("language_id", Number(languageId))
    }

    query = query.eq("status", status)

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json(data ? data.map(dbToCorrection) : [])
  } catch (error: any) {
    console.error("Erreur lors de la récupération des suggestions:", error)
    return NextResponse.json(
      { message: error.message || "Erreur lors de la récupération des suggestions" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    // Convertir en format DB et insérer dans la base de données
    // const dbCorrection = correctionToDb(correction)

    // S'assurer que les champs obligatoires sont présents
    const insertData = {
      correction_text: body.correction_text || "", // Champ obligatoire
      language_id: body.language_id || 0, // Champ obligatoire
      status: "pending",
      field: body.field,
      framework: body.framework,
      suggestion: body.suggestion,
      user_id: body.user_id,
      created_at: new Date().toISOString(),
    }

    // Insérer dans la base de données
    const { data, error } = await supabase.from("corrections").insert(insertData).select().single()

    if (error) {
      return NextResponse.json({ message: "Erreur lors de la création de la suggestion" }, { status: 500 })
    }

    return NextResponse.json(dbToCorrection(data), { status: 201 })
  } catch (error: any) {
    console.error("Erreur lors de la création de la suggestion:", error)
    return NextResponse.json(
      { message: error.message || "Erreur lors de la création de la suggestion" },
      { status: 500 },
    )
  }
}
