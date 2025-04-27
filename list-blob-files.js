import { list } from '@vercel/blob';

async function listBlobFiles() {
  try {
    console.log('Récupération de la liste des fichiers dans Blob...');
    
    // Lister tous les fichiers avec le préfixe du projet
    const { blobs, cursor } = await list({
      prefix: 'pokedex-langage/',
      limit: 1000,
    });
    
    console.log(`${blobs.length} fichiers trouvés dans Blob.`);
    
    // Organiser les fichiers par dossier
    const filesByFolder = {};
    
    blobs.forEach(blob => {
      const pathParts = blob.pathname.split('/');
      const folder = pathParts.slice(0, -1).join('/');
      
      if (!filesByFolder[folder]) {
        filesByFolder[folder] = [];
      }
      
      filesByFolder[folder].push({
        name: pathParts[pathParts.length - 1],
        size: Math.round(blob.size / 1024 * 100) / 100, // Taille en KB avec 2 décimales
        url: blob.url,
        uploadedAt: new Date(blob.uploadedAt).toLocaleString(),
      });
    });
    
    // Afficher les fichiers par dossier
    console.log('\nFichiers par dossier:');
    Object.keys(filesByFolder).sort().forEach(folder => {
      console.log(`\n${folder}/ (${filesByFolder[folder].length} fichiers):`);
      filesByFolder[folder].forEach(file => {
        console.log(`  - ${file.name} (${file.size} KB)`);
      });
    });
    
    // Vérifier s'il y a plus de fichiers (pagination)
    if (cursor) {
      console.log('\nIl y a plus de fichiers disponibles. Utilisez le curseur pour la pagination.');
    }
    
    return { blobs, cursor };
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error);
    throw error;
  }
}

// Exécuter la fonction
listBlobFiles().catch(console.error);