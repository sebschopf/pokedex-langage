import fs from "fs"
import { glob } from "glob"

// Définir manuellement les noms de tables valides
// Ces noms correspondent aux tables dans votre base de données Supabase
const validTableNames = [
  "languages",
  "libraries",
  "corrections",
  "language_proposals",
  "profiles",
  "user_roles",
  "todos",
  "todo_categories",
  "todo_status",
  "technology_categories",
  "technology_subtypes",
  "usage_categories",
  "library_languages",
  "language_usage",
]

// Regex pour trouver les appels à useSupabaseMutation
const MUTATION_REGEX = /table:\s*['"]([^'"]+)['"]/g

async function validateTableNames() {
  console.log("Vérification des noms de tables dans les appels à useSupabaseMutation...")
  console.log("Tables valides:", validTableNames.join(", "))

  // Trouver tous les fichiers TypeScript et TSX dans le projet
  const files = await glob("**/*.{ts,tsx}", {
    ignore: ["node_modules/**", ".next/**", "dist/**", "scripts/**", "types/**"],
  })

  let hasErrors = false
  const issues = []

  // Parcourir chaque fichier
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8")
    const lines = content.split("\n")

    // Chercher les appels à useSupabaseMutation
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Utiliser exec() au lieu de matchAll() pour la compatibilité
      let match
      const matches = []
      while ((match = MUTATION_REGEX.exec(line)) !== null) {
        matches.push(match)
      }

      for (const match of matches) {
        const tableName = match[1]

        // Vérifier si le nom de table est valide
        if (!validTableNames.includes(tableName)) {
          issues.push({
            file,
            line: i + 1,
            tableName,
          })
          hasErrors = true
        }
      }

      // Réinitialiser le regex pour la prochaine ligne
      MUTATION_REGEX.lastIndex = 0
    }
  }

  // Afficher les résultats
  if (hasErrors) {
    console.error("❌ Des noms de tables invalides ont été trouvés:")
    issues.forEach((issue) => {
      console.error(`  - ${issue.file}:${issue.line} - Table invalide: "${issue.tableName}"`)
      console.error(`    Tables valides: ${validTableNames.join(", ")}`)
    })
    process.exit(1)
  } else {
    console.log("✅ Tous les noms de tables utilisés sont valides!")
  }
}

validateTableNames().catch((err) => {
  console.error("Erreur:", err)
  process.exit(1)
})
