// extract-frameworks-composite.js
const fs = require("fs")
const path = require("path")

// Fonction pour échapper les apostrophes dans les chaînes SQL
function escapeSql(str) {
  if (typeof str !== "string") return ""
  return str.replace(/'/g, "''")
}

// Mapper les propriétés aux colonnes Supabase
const propertyMap = {
  name: "name",
  description: "description",
  officialWebsite: "official_website",
  uniqueSellingPoint: "unique_selling_point",
  bestFor: "best_for",
  features: "features",
  isOpenSource: "is_open_source",
  popularity: "popularity",
  usedFor: "used_for",
  version: "version",
  documentation: "documentation_url",
}

// Générer les requêtes SQL
let sqlQueries = `-- Requêtes SQL générées à partir de l'ancien système de frameworks
-- Exécutez ces requêtes dans l'interface SQL de Supabase

`

// Fonction pour extraire le nom du langage à partir du nom du fichier
function getLanguageFromFilename(filename) {
  // Enlever l'extension .ts
  const baseName = path.basename(filename, ".ts")

  // Convertir les formats comme "csharp" en "C#"
  const specialCases = {
    csharp: "C#",
    cpp: "C++",
    fsharp: "F#",
    objectivec: "Objective-C",
    js: "JavaScript",
    vba: "VBA",
  }

  if (specialCases[baseName]) {
    return specialCases[baseName]
  }

  // Sinon, première lettre en majuscule
  return baseName.charAt(0).toUpperCase() + baseName.slice(1)
}

// Fonction pour analyser manuellement un fichier TypeScript
function parseTypeScriptFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")

  // Extraire le nom de la variable exportée (ex: cFrameworks, clojureFrameworks)
  const exportMatch = content.match(/export const (\w+):\s*Record<string,\s*Framework>/)
  if (!exportMatch) return null

  const exportVarName = exportMatch[1]

  // Extraire les objets framework
  const frameworks = {}

  // Utiliser une expression régulière pour trouver les définitions d'objets
  const objectRegex = /(\w+):\s*{([^{}]*({[^{}]*})*[^{}]*)*}/g
  let match

  while ((match = objectRegex.exec(content)) !== null) {
    const key = match[1]
    const objectContent = match[0]

    // Analyser les propriétés de l'objet
    const framework = {}

    // Extraire le nom
    const nameMatch = objectContent.match(/name:\s*"([^"]*)"/)
    if (nameMatch) framework.name = nameMatch[1]

    // Extraire la description
    const descMatch = objectContent.match(/description:\s*"([^"]*)"/)
    if (descMatch) framework.description = descMatch[1]

    // Extraire usedFor
    const usedForMatch = objectContent.match(/usedFor:\s*"([^"]*)"/)
    if (usedForMatch) framework.usedFor = usedForMatch[1]

    // Extraire officialWebsite
    const websiteMatch = objectContent.match(/officialWebsite:\s*"([^"]*)"/)
    if (websiteMatch) framework.officialWebsite = websiteMatch[1]

    // Extraire uniqueSellingPoint
    const uspMatch = objectContent.match(/uniqueSellingPoint:\s*"([^"]*)"/)
    if (uspMatch) framework.uniqueSellingPoint = uspMatch[1]

    // Extraire bestFor
    const bestForMatch = objectContent.match(/bestFor:\s*"([^"]*)"/)
    if (bestForMatch) framework.bestFor = bestForMatch[1]

    // Extraire version
    const versionMatch = objectContent.match(/version:\s*"([^"]*)"/)
    if (versionMatch) framework.version = versionMatch[1]

    // Extraire documentation
    const docMatch = objectContent.match(/documentation:\s*"([^"]*)"/)
    if (docMatch) framework.documentation = docMatch[1]

    // Extraire popularity si disponible
    const popularityMatch = objectContent.match(/popularity:\s*(\d+)/)
    if (popularityMatch) framework.popularity = Number.parseInt(popularityMatch[1])

    // Extraire isOpenSource
    const openSourceMatch = objectContent.match(/isOpenSource:\s*(true|false)/)
    if (openSourceMatch) framework.isOpenSource = openSourceMatch[1] === "true"

    // Extraire features (plus complexe car c'est un tableau)
    const featuresMatch = objectContent.match(/features:\s*\[(.*?)\]/s)
    if (featuresMatch) {
      const featuresStr = featuresMatch[1]
      const features = featuresStr
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.startsWith('"') && f.endsWith('"'))
        .map((f) => f.slice(1, -1))

      framework.features = features
    }

    // Extraire resources (plus complexe car c'est un tableau d'objets)
    const resourcesMatch = objectContent.match(/resources:\s*\[(.*?)\]/s)
    if (resourcesMatch) {
      const resourcesStr = resourcesMatch[1]
      const resourceObjects = resourcesStr.match(/{([^{}]*)}/g)

      if (resourceObjects) {
        framework.resources = resourceObjects.map((obj) => {
          const nameMatch = obj.match(/name:\s*"([^"]*)"/)
          const urlMatch = obj.match(/url:\s*"([^"]*)"/)

          return {
            name: nameMatch ? nameMatch[1] : "",
            url: urlMatch ? urlMatch[1] : "",
          }
        })
      }
    }

    frameworks[key] = framework
  }

  return frameworks
}

// Fonction principale
function main() {
  const frameworksDir = path.join(__dirname, "frameworks")

  // Vérifier si le dossier existe
  if (!fs.existsSync(frameworksDir)) {
    console.error(`Le dossier ${frameworksDir} n'existe pas.`)
    return
  }

  // Lire tous les fichiers dans le dossier frameworks
  const files = fs
    .readdirSync(frameworksDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts" && file !== "types.ts")

  let totalFrameworks = 0

  // Traiter chaque fichier
  for (const file of files) {
    const filePath = path.join(frameworksDir, file)
    const languageName = getLanguageFromFilename(file)

    console.log(`Traitement de ${file} (${languageName})...`)

    const frameworks = parseTypeScriptFile(filePath)
    if (!frameworks) {
      console.log(`  Aucun framework trouvé dans ${file}`)
      continue
    }

    let frameworkCount = 0

    // Pour chaque framework dans ce fichier
    for (const [key, framework] of Object.entries(frameworks)) {
      // Déterminer le nom du framework
      const frameworkName = framework.name || key

      // Échapper les valeurs pour SQL
      const escapedName = escapeSql(frameworkName)
      const escapedLanguage = escapeSql(languageName)

      // Construire les colonnes et valeurs pour INSERT
      const insertColumns = ["name", "language_id"]
      const insertValues = [`'${escapedName}'`, `(SELECT id FROM language_id)`]

      // Construire les clauses SET pour UPDATE
      const updateClauses = []

      // Traiter chaque propriété mappable
      for (const [oldProp, newCol] of Object.entries(propertyMap)) {
        if (oldProp === "name") continue // Déjà traité

        if (framework[oldProp] !== undefined) {
          let value

          if (oldProp === "features" && Array.isArray(framework[oldProp])) {
            // Traiter les tableaux pour la colonne features
            value = `ARRAY[${framework[oldProp].map((f) => `'${escapeSql(f)}'`).join(", ")}]`
          } else if (typeof framework[oldProp] === "boolean") {
            // Traiter les booléens
            value = framework[oldProp] ? "true" : "false"
          } else if (typeof framework[oldProp] === "number") {
            // Traiter les nombres
            value = framework[oldProp]
          } else if (framework[oldProp] === null) {
            // Traiter les valeurs null
            value = "NULL"
          } else {
            // Traiter les chaînes
            value = `'${escapeSql(framework[oldProp])}'`
          }

          // Ajouter la clause SET pour cette propriété
          updateClauses.push(`  ${newCol} = COALESCE(libraries.${newCol}, ${value})`)

          // Ajouter à la liste des colonnes et valeurs pour INSERT
          insertColumns.push(newCol)
          insertValues.push(value)
        }
      }

      // Traiter les ressources (GitHub URL)
      if (framework.resources && Array.isArray(framework.resources)) {
        // Extraire GitHub URL
        const githubResource = framework.resources.find(
          (r) => r.name === "GitHub" || (r.url && r.url.includes("github.com")),
        )
        if (githubResource && githubResource.url) {
          const githubUrl = escapeSql(githubResource.url)
          updateClauses.push(`  github_url = COALESCE(libraries.github_url, '${githubUrl}')`)
          insertColumns.push("github_url")
          insertValues.push(`'${githubUrl}'`)
        }
      }

      // Générer la requête SQL complète avec ON CONFLICT (name, language_id)
      sqlQueries += `
-- Framework: ${frameworkName} (${languageName})
WITH language_id AS (
  SELECT id FROM languages WHERE name = '${escapedLanguage}'
)
INSERT INTO libraries (
  ${insertColumns.join(", ")}
)
VALUES (
  ${insertValues.join(", ")}
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
${updateClauses.join(",\n")};

`
      frameworkCount++
    }

    console.log(`  ${frameworkCount} frameworks trouvés dans ${file}`)
    totalFrameworks += frameworkCount
  }

  // Écrire les requêtes dans un fichier
  fs.writeFileSync("update-libraries.sql", sqlQueries)
  console.log(`Requêtes SQL générées pour ${totalFrameworks} frameworks dans update-libraries.sql`)
}

main()

