const fs = require('fs');
const path = require('path');

// Fonction pour convertir snake_case en camelCase
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Fonction pour convertir CamelCase en kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Fonction pour convertir le premier caractère en majuscule
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fonction pour créer un dossier s'il n'existe pas
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Lire le fichier de types généré par Supabase
const databaseTypesPath = path.join(__dirname, '../types/database-types.ts');
let databaseTypes;

try {
  databaseTypes = fs.readFileSync(databaseTypesPath, 'utf8');
} catch (error) {
  console.error(`Erreur lors de la lecture du fichier ${databaseTypesPath}:`, error);
  process.exit(1);
}

// Créer les dossiers nécessaires
const typesDir = path.join(__dirname, '../types');
const databaseDir = path.join(typesDir, 'database');
const modelsDir = path.join(typesDir, 'models');
const dtoDir = path.join(typesDir, 'dto');
const mappingDir = path.join(__dirname, '../lib/server/mapping');

ensureDirectoryExists(databaseDir);
ensureDirectoryExists(modelsDir);
ensureDirectoryExists(dtoDir);
ensureDirectoryExists(mappingDir);

// Extraire les tables de la définition de Database
const tablesMatch = databaseTypes.match(/public: {\s+Tables: {([\s\S]*?)},\s+Views:/);
if (!tablesMatch) {
  console.error('Structure de tables non trouvée dans le fichier de types');
  process.exit(1);
}

const tablesContent = tablesMatch[1];
const tableRegex = /(\w+): {\s+Row: {([\s\S]*?)},\s+Insert:/g;
let tableMatch;
const tables = [];

while ((tableMatch = tableRegex.exec(tablesContent)) !== null) {
  const tableName = tableMatch[1];
  const rowContent = tableMatch[2];
  
  // Extraire les propriétés de la table
  const properties = [];
  const propRegex = /(\w+): ([^,]+),?/g;
  let propMatch;
  
  while ((propMatch = propRegex.exec(rowContent)) !== null) {
    const propName = propMatch[1];
    const propType = propMatch[2].trim();
    properties.push({ name: propName, type: propType });
  }
  
  tables.push({ name: tableName, properties });
}

// Générer les fichiers de types pour chaque table
const dbExports = [];
const modelExports = [];
const mappingExports = [];

tables.forEach(table => {
  // Ignorer les tables système ou non pertinentes si nécessaire
  // if (table.name === 'system_table') return;
  
  // 1. Générer le type de base de données (DbType)
  const dbTypeName = `Db${capitalize(toCamelCase(table.name.slice(0, -1)))}`;
  const dbFileName = toKebabCase(table.name.slice(0, -1)) + '.ts';
  
  const dbTypeContent = `/**
 * Type représentant un(e) ${table.name.slice(0, -1)} tel que stocké(e) dans la base de données
 * Correspond exactement à la structure de la table '${table.name}' dans Supabase
 */
export type ${dbTypeName} = {
${table.properties.map(prop => `  ${prop.name}: ${prop.type}`).join('\n')}
}
`;
  
  fs.writeFileSync(path.join(databaseDir, dbFileName), dbTypeContent);
  dbExports.push(`export type { ${dbTypeName} } from "./${dbFileName.replace('.ts', '')}"`);
  
  // 2. Générer le type de modèle (Model)
  const modelTypeName = capitalize(toCamelCase(table.name.slice(0, -1)));
  const modelFileName = dbFileName;
  
  const modelTypeContent = `/**
 * Interface représentant un(e) ${table.name.slice(0, -1)} dans l'application
 * Version transformée et normalisée de ${dbTypeName}
 */
export interface ${modelTypeName} {
${table.properties.map(prop => `  ${toCamelCase(prop.name)}: ${prop.type}`).join('\n')}
}
`;
  
  fs.writeFileSync(path.join(modelsDir, modelFileName), modelTypeContent);
  modelExports.push(`export type { ${modelTypeName} } from "./${modelFileName.replace('.ts', '')}"`);
  
  // 3. Générer les fonctions de mapping
  const mappingFileName = `${toKebabCase(modelTypeName)}-mapping.ts`;
  
  const mappingContent = `import type { ${dbTypeName} } from "@/types/database";
import type { ${modelTypeName} } from "@/types/models";

/**
 * Convertit un objet ${dbTypeName} en ${modelTypeName}
 * @param db${modelTypeName} Objet de la base de données
 * @returns Objet ${modelTypeName} pour l'application
 */
export function dbTo${modelTypeName}(db${modelTypeName}: ${dbTypeName}): ${modelTypeName} {
  return {
${table.properties.map(prop => `    ${toCamelCase(prop.name)}: db${modelTypeName}.${prop.name},`).join('\n')}
  };
}

/**
 * Convertit un objet ${modelTypeName} en ${dbTypeName}
 * @param ${modelTypeName.toLowerCase()} Objet de l'application
 * @returns Objet pour la base de données
 */
export function ${modelTypeName.toLowerCase()}ToDb(${modelTypeName.toLowerCase()}: Partial<${modelTypeName}>): Partial<${dbTypeName}> {
  const db${modelTypeName}: Partial<${dbTypeName}> = {};
  
${table.properties.map(prop => `  if (${modelTypeName.toLowerCase()}.${toCamelCase(prop.name)} !== undefined) db${modelTypeName}.${prop.name} = ${modelTypeName.toLowerCase()}.${toCamelCase(prop.name)};`).join('\n')}
  
  return db${modelTypeName};
}
`;
  
  fs.writeFileSync(path.join(mappingDir, mappingFileName), mappingContent);
  mappingExports.push(`export * from "./${mappingFileName.replace('.ts', '')}"`);
});

// Générer les fichiers index.ts
const dbIndexContent = `/**
 * Point d'entrée pour tous les types de base de données
 * Ces types correspondent exactement à la structure des tables dans Supabase
 */
${dbExports.join('\n')}

// Type générique pour les données JSON dans Supabase
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
`;

const modelIndexContent = `/**
 * Point d'entrée pour tous les types de modèles d'application
 * Ces types sont les versions transformées et normalisées des types de base de données
 */
${modelExports.join('\n')}
`;

const mappingIndexContent = `/**
 * Point d'entrée pour toutes les fonctions de mapping
 * Ces fonctions convertissent entre les types de base de données et les types d'application
 */
${mappingExports.join('\n')}
`;

fs.writeFileSync(path.join(databaseDir, 'index.ts'), dbIndexContent);
fs.writeFileSync(path.join(modelsDir, 'index.ts'), modelIndexContent);
fs.writeFileSync(path.join(mappingDir, 'index.ts'), mappingIndexContent);

// Créer un fichier index.ts principal pour les types
const mainIndexContent = `/**
 * Point d'entrée principal pour tous les types de l'application
 */

// Types de base de données (structure exacte des tables Supabase)
export * from "./database"

// Types de modèles (versions transformées pour l'application)
export * from "./models"

// Types DTO (Data Transfer Objects)
export * from "./dto"
`;

fs.writeFileSync(path.join(typesDir, 'index.ts'), mainIndexContent);

// Créer un fichier index.ts vide pour les DTO
const dtoIndexContent = `/**
 * Point d'entrée pour tous les types DTO (Data Transfer Objects)
 * Ces types sont utilisés pour le transfert de données entre les couches de l'application
 */
// Ajoutez vos exports DTO ici au fur et à mesure que vous les créez
`;

fs.writeFileSync(path.join(dtoDir, 'index.ts'), dtoIndexContent);

console.log('Génération des types terminée avec succès !');
console.log(`
Fichiers générés:
- ${tables.length} types de base de données dans types/database/
- ${tables.length} types de modèles dans types/models/
- ${tables.length} fonctions de mapping dans lib/server/mapping/
- Fichiers index.ts dans chaque dossier
`);