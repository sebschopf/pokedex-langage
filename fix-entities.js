const { replaceInFile } = require('replace-in-file');

async function fixEntities() {
  const options = {
    files: ['./app/**/*.tsx', './components/**/*.tsx'],
    from: /(\s|>)'(\w)/g,
    to: '$1&apos;$2',
  };

  try {
    const results = await replaceInFile(options);
    const changedFiles = results.filter(result => result.hasChanged).map(result => result.file);

    if (changedFiles.length > 0) {
      console.log('Remplacement effectué dans les fichiers:', changedFiles);
    } else {
      console.log("Aucun fichier n'a été modifié.");
    }
  } catch (error) {
    console.error('Erreur lors du remplacement:', error);
  }
}

// Correction pour les apostrophes en début de mot
async function fixLeadingApostrophes() {
  const options = {
    files: ['./app/**/*.tsx', './components/**/*.tsx'],
    from: /(\s|>)"([^"]*)"(\s|<)/g,
    to: '$1&quot;$2&quot;$3',
  };

  try {
    const results = await replaceInFile(options);
    const changedFiles = results.filter(result => result.hasChanged).map(result => result.file);

    if (changedFiles.length > 0) {
      console.log('Remplacement des guillemets effectué dans les fichiers:', changedFiles);
    } else {
      console.log("Aucun fichier n'a été modifié pour les guillemets.");
    }
  } catch (error) {
    console.error('Erreur lors du remplacement des guillemets:', error);
  }
}

// Exécuter les deux fonctions
async function runAll() {
  await fixEntities();
  await fixLeadingApostrophes();
}

runAll();
