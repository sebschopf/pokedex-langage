import { createClient } from "@supabase/supabase-js"
import { generateLanguageSlug } from "../utils/slug/slug-generator"

// Charger les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.error("Les variables d'environnement NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requises")
  process.exit(1)
}

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

async function fixLanguageSlugs() {
  console.log("Récupération des langages...")

  // Récupérer tous les langages
  const { data: languages, error } = await supabase.from("languages").select("id, name, slug")

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return
  }

  if (!languages || languages.length === 0) {
    console.log("Aucun langage trouvé")
    return
  }

  console.log(`${languages.length} langages trouvés`)

  // Parcourir les langages et corriger les slugs
  let updatedCount = 0

  for (const language of languages) {
    const correctSlug = generateLanguageSlug(language.name)

    // Si le slug actuel est différent du slug correct
    if (language.slug !== correctSlug) {
      console.log(`Correction du slug pour ${language.name}: ${language.slug} -> ${correctSlug}`)

      // Mettre à jour le slug
      const { error: updateError } = await supabase
        .from("languages")
        .update({ slug: correctSlug })
        .eq("id", language.id)

      if (updateError) {
        console.error(`Erreur lors de la mise à jour du slug pour ${language.name}:`, updateError)
      } else {
        updatedCount++
      }
    }
  }

  console.log(`${updatedCount} slugs ont été corrigés`)
}

// Exécuter le script
fixLanguageSlugs()
  .then(() => {
    console.log("Script terminé")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Erreur lors de l'exécution du script:", error)
    process.exit(1)
  })

  // Exécuter le script: npx ts-node scripts/fix-language-slugs.ts