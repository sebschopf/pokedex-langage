## CI/CD

Ce projet utilise GitHub Actions pour l'intégration continue et le déploiement continu.

### Workflows

- **CI/CD Pipeline**: Exécuté à chaque push sur la branche main et à chaque pull request. Il vérifie le linting, exécute les tests et construit le projet.
- **Pull Request Checks**: Exécuté à chaque pull request. Il vérifie les types, exécute les tests et commente la PR avec les résultats.
- **Deploy to Vercel**: Exécuté à chaque push sur la branche main. Il déploie l'application sur Vercel après avoir exécuté les tests.

### Badges

[![CI/CD Pipeline](https://github.com/sebschopf/pokedex-langage/actions/workflows/ci.yml/badge.svg)](https://github.com/sebschopf/pokedex-langage/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/sebschopf/pokedex-langage/branch/main/graph/badge.svg)](https://codecov.io/gh/sebschopf/pokedex-langage)

### Hooks Git

Ce projet utilise Husky pour exécuter des hooks Git:

- **pre-commit**: Exécute lint-staged pour vérifier et formater le code avant de le committer.
- **pre-push**: Exécute les tests avant de pousser les changements.

Pour installer les hooks, exécutez:

\`\`\`bash
npm run prepare
