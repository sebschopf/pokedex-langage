import fs from "fs"
import { glob } from "glob"
import type { Database } from "../types/database-types"

// Extraire les noms de tables valides
type TableName = keyof Database["public"]["Tables"]
const validTableNames = Object.keys(require("../types/database-types").Database.public.Tables)

// Regex pour trouver les appels à useSupabaseMutation
const TABLE_REGEX = /table:\s*['"]([^'"]+)['"]/g

async function main() {
  console.log("Vérification des noms de tables dans les appels à useSupabaseMutation...")

  // Trouver tous les fichiers TypeScript et TSX
  const files = await glob("**/*.{ts,tsx}", {
    ignore: ["node_modules/**", ".next/**", "dist/**", "scripts/**"],
  })

  let hasErrors = false
  const issues: { file: string; line: number; tableName: string }[] = []

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8")
    const lines = content.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const matches = Array.from(line.matchAll(TABLE_REGEX))

      for (const match of matches) {
        const tableName = match[1]
        if (!validTableNames.includes(tableName)) {
          issues.push({
            file,
            line: i + 1,
            tableName,
          })
          hasErrors = true
        }
      }
    }
  }

  if (hasErrors) {
    console.error("❌ Problèmes détectés:")
    issues.forEach((issue) => {
      console.error(`  ${issue.file}:${issue.line} - Table invalide: "${issue.tableName}"`)
      console.error(`  Tables valides: ${validTableNames.join(", ")}`)
      console.error("")
    })
    process.exit(1)
  } else {
    console.log("✅ Tous les noms de tables sont valides!")
  }
}

main().catch((err) => {
  console.error("Erreur:", err)
  process.exit(1)
})
