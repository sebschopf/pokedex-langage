
      const fs = require('fs');
      // Utiliser ts-node pour charger le fichier TypeScript
      require('ts-node/register');
      const data = require('./frameworks/vba');
      // Écrire les données dans un fichier temporaire
      fs.writeFileSync('temp-data.json', JSON.stringify(data));
    