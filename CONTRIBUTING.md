# Guide de contribution

Merci de votre intérêt pour contribuer au projet Pokedex des Langages de Programmation ! Ce document fournit des lignes directrices pour contribuer au projet.

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment puis-je contribuer ?](#comment-puis-je-contribuer-)
  - [Signaler des bugs](#signaler-des-bugs)
  - [Suggérer des améliorations](#suggérer-des-améliorations)
  - [Ajouter ou mettre à jour des langages](#ajouter-ou-mettre-à-jour-des-langages)
  - [Pull Requests](#pull-requests)
- [Style de code](#style-de-code)
- [Processus de développement](#processus-de-développement)
  - [Configuration locale](#configuration-locale)
  - [Tests](#tests)
  - [Génération des types](#génération-des-types)

## Code de conduite

Ce projet et tous ses participants sont régis par notre [Code de conduite](CODE_OF_CONDUCT.md). En participant, vous êtes censé respecter ce code.

## Comment puis-je contribuer ?

### Signaler des bugs

Les bugs sont suivis comme des [issues GitHub](https://github.com/sebschopf/pokedex-langage/issues).

Avant de créer un rapport de bug, vérifiez si le problème a déjà été signalé. Si c'est le cas, ajoutez un commentaire à l'issue existante au lieu d'en ouvrir une nouvelle.

Lorsque vous créez un rapport de bug, incluez autant de détails que possible :

- **Utilisez un titre clair et descriptif**
- **Décrivez les étapes exactes pour reproduire le problème**
- **Décrivez le comportement observé et ce à quoi vous vous attendiez**
- **Incluez des captures d'écran si possible**
- **Précisez votre environnement** (navigateur, système d'exploitation, etc.)

### Suggérer des améliorations

Les suggestions d'amélioration sont également suivies comme des [issues GitHub](https://github.com/sebschopf/pokedex-langage/issues).

- **Utilisez un titre clair et descriptif**
- **Fournissez une description détaillée de l'amélioration suggérée**
- **Expliquez pourquoi cette amélioration serait utile**
- **Incluez des maquettes ou des exemples si possible**

### Ajouter ou mettre à jour des langages

Si vous souhaitez ajouter un nouveau langage de programmation ou mettre à jour les informations d'un langage existant :

1. Vérifiez d'abord si le langage existe déjà dans la base de données
2. Pour un nouveau langage, assurez-vous d'avoir toutes les informations requises (nom, description, année de création, etc.)
3. Créez une issue décrivant le langage à ajouter ou les modifications à apporter
4. Si vous souhaitez implémenter vous-même les changements, indiquez-le dans l'issue

### Pull Requests

- Remplissez le modèle de pull request
- Ne déviez pas des spécifications de l'issue que vous résolvez
- Assurez-vous que votre code respecte les conventions de style
- Incluez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation si nécessaire
- Les pull requests doivent être basées sur la branche `main`

## Style de code

- Suivez les conventions TypeScript
- Utilisez ESLint et Prettier pour formater votre code
- Respectez l'architecture existante du projet
- Suivez les principes SOLID
- Utilisez des noms de variables et de fonctions descriptifs
- Commentez votre code lorsque nécessaire

## Processus de développement

### Configuration locale

1. Clonez le dépôt
   \`\`\`bash
   git clone https://github.com/sebschopf/pokedex-langage.git
   cd pokedex-langage
   \`\`\`

2. Installez les dépendances
   \`\`\`bash
   npm install
   \`\`\`

3. Configurez les variables d'environnement
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Puis modifiez `.env.local` avec vos propres valeurs.

4. Démarrez le serveur de développement
   \`\`\`bash
   npm run dev
   \`\`\`

### Tests

Exécutez les tests avec :
\`\`\`bash
npm test
\`\`\`

### Génération des types

Si vous modifiez la structure de la base de données, régénérez les types avec :
\`\`\`bash
npm run generate-types
\`\`\`

---

Merci de contribuer au projet Pokedex des Langages de Programmation !
