import dotenv from 'dotenv';
import { put } from '@vercel/blob';
import fs from 'fs/promises';
import { statSync } from 'fs'; // Importer statSync depuis le module fs standard
import path from 'path';
import { fileURLToPath } from 'url';

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: '.env.local' });

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname); // Chemin absolu vers la racine du projet
const BLOB_PREFIX = 'pokedex-langage/'; // Préfixe pour tous les fichiers dans Blob

// Dossiers et fichiers à ignorer (liste plus restreinte)
const IGNORE_PATTERNS = [
  '.git',
  'node_modules',
  '.next',
  '.vercel',
  'dist',
  'build',
  '.env',
  '.env.local',
  '.env.development',
  '.env.production',
  '.DS_Store',
  'sync-project-to-blob.mjs',
  'list-blob-files.js'
];

// Extensions de fichiers à inclure (vide = toutes les extensions)
const INCLUDE_EXTENSIONS = [
  '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', 
  '.scss', '.html', '.svg', '.png', '.jpg', '.jpeg', 
  '.gif', '.webp', '.ico', '.txt', '.pdf'
];

// Fonction pour vérifier si un chemin doit être ignoré
function shouldIgnore(filePath) {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  
  // Vérifier les patterns à ignorer
  for (const pattern of IGNORE_PATTERNS) {
    if (
      relativePath === pattern ||
      relativePath.startsWith(`${pattern}${path.sep}`) ||
      relativePath.startsWith(`${pattern}/`) ||
      relativePath.includes(`${path.sep}${pattern}${path.sep}`) ||
      relativePath.includes(`/${pattern}/`)
    ) {
      return true;
    }
  }
  
  // Si INCLUDE_EXTENSIONS est défini, vérifier l'extension pour les fichiers (pas les dossiers)
  if (INCLUDE_EXTENSIONS.length > 0) {
    try {
      const stats = statSync(filePath); // Utiliser statSync importé directement
      if (!stats.isDirectory()) {
        const ext = path.extname(filePath).toLowerCase();
        if (!INCLUDE_EXTENSIONS.includes(ext)) {
          return true;
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la vérification du fichier ${filePath}:`, error);
      return true; // En cas d'erreur, ignorer le fichier
    }
  }
  
  return false;
}

// Fonction pour déterminer le type MIME
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.md': 'text/markdown',
    '.ts': 'application/typescript',
    '.tsx': 'application/typescript',
    '.jsx': 'application/javascript',
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

// Fonction pour lister tous les fichiers récursivement
async function listAllFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    const files = await Promise.all(entries.map(async entry => {
      const fullPath = path.join(dir, entry.name);
      
      // Vérifier si le chemin doit être ignoré avant de continuer
      if (shouldIgnore(fullPath)) {
        console.log(`Ignoré: ${fullPath}`);
        return [];
      }
      
      return entry.isDirectory() ? 
        await listAllFiles(fullPath) : 
        [fullPath];
    }));
    
    return files.flat();
  } catch (error) {
    console.error(`Erreur lors de la lecture du répertoire ${dir}:`, error);
    return [];
  }
}

// Fonction pour télécharger un fichier vers Blob
async function uploadFileToBlobWithRetry(filePath, blobPath, retries = 3) {
  try {
    const fileContent = await fs.readFile(filePath);
    const contentType = getMimeType(filePath);
    
    console.log(`Téléchargement de ${filePath} vers ${blobPath} (${contentType})`);
    
    const blob = await put(blobPath, fileContent, {
      access: 'public',
      addRandomSuffix: false,
      contentType,
      allowOverwrite: true
    });
    
    return blob;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Erreur lors du téléchargement de ${filePath}, nouvelle tentative (${retries} restantes)...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return uploadFileToBlobWithRetry(filePath, blobPath, retries - 1);
    }
    
    console.error(`Échec du téléchargement de ${filePath} :`, error);
    throw error;
  }
}

// Fonction principale
async function syncProjectToBlob() {
  try {
    console.log('Début de la synchronisation du projet vers Blob...');
    
    // Vérifier que le token est configuré
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('Erreur: BLOB_READ_WRITE_TOKEN n\'est pas configuré.');
      console.error('Veuillez configurer cette variable d\'environnement avant d\'exécuter le script.');
      return;
    }
    
    // Lister tous les fichiers du projet
    console.log('Listage des fichiers du projet...');
    const allFiles = await listAllFiles(PROJECT_ROOT);
    console.log(`${allFiles.length} fichiers trouvés.`);
    
    // Télécharger chaque fichier vers Blob
    console.log('Téléchargement des fichiers vers Blob...');
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < allFiles.length; i++) {
      const filePath = allFiles[i];
      const relativePath = path.relative(PROJECT_ROOT, filePath);
      const blobPath = `${BLOB_PREFIX}${relativePath.replace(/\\/g, '/')}`;
      
      try {
        await uploadFileToBlobWithRetry(filePath, blobPath);
        successCount++;
        console.log(`[${i + 1}/${allFiles.length}] Succès: ${relativePath}`);
      } catch (error) {
        errorCount++;
        errors.push({ filePath, error: error.message });
        console.error(`[${i + 1}/${allFiles.length}] Échec: ${relativePath}`);
      }
    }
    
    console.log('\nSynchronisation terminée!');
    console.log(`${successCount} fichiers téléchargés avec succès.`);
    
    if (errorCount > 0) {
      console.error(`${errorCount} fichiers n'ont pas pu être téléchargés:`);
      errors.forEach(({ filePath, error }) => {
        console.error(`- ${filePath}: ${error}`);
      });
    }
    
    return { successCount, errorCount, errors };
  } catch (error) {
    console.error('Erreur lors de la synchronisation:', error);
    throw error;
  }
}

// Exécuter la fonction principale
syncProjectToBlob().catch(console.error);