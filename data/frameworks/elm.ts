import type { Framework } from "./types"

export const elmFrameworks: Record<string, Framework> = {
  "elm-ui": {
    name: "elm-ui",
    description:
      "Bibliothèque de mise en page et de conception d'interfaces utilisateur pour Elm qui remplace complètement CSS",
    usedFor:
      "Création d'interfaces utilisateur, mise en page responsive, applications web sans CSS, prototypage rapide",
    features: [
      "Système de mise en page déclaratif",
      "Pas besoin de CSS ou HTML",
      "Alignement et espacement intuitifs",
      "Responsive design sans media queries",
      "Typographie contrôlée par le code",
      "Gestion des couleurs et des thèmes",
      "Animations et transitions",
      "Accessibilité intégrée",
      "Performances optimisées",
      "Type-safety complète",
    ],
    officialWebsite: "https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/",
    uniqueSellingPoint:
      "Création d'interfaces utilisateur sans CSS ni HTML, en utilisant uniquement des fonctions Elm type-safe qui garantissent une mise en page cohérente et sans bugs",
    bestFor:
      "Développeurs Elm qui souhaitent éviter les problèmes de CSS et créer des interfaces utilisateur robustes avec une approche purement fonctionnelle",
    version: "1.1.8",
    documentation: "https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/",
    resources: [
      { name: "Documentation officielle", url: "https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/" },
      { name: "GitHub", url: "https://github.com/mdgriffith/elm-ui" },
      { name: "Guide elm-ui", url: "https://korban.net/posts/elm/2019-11-17-elm-ui-introduction/" },
      { name: "Exemples elm-ui", url: "https://github.com/mdgriffith/elm-ui/tree/master/examples" },
      { name: "Elm UI Explorer", url: "https://elm-ui-explorer.netlify.app/" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=Ie-gqwSHQr0" },
      { name: "Comparaison avec CSS", url: "https://korban.net/posts/elm/2020-04-07-elm-ui-cheatsheet/" },
    ],
  },
  "elm-css": {
    name: "elm-css",
    description: "Bibliothèque pour écrire du CSS en Elm de manière type-safe et composable",
    usedFor: "Stylisation d'applications Elm, création de thèmes, animations CSS, styles dynamiques, design systems",
    features: [
      "CSS type-safe en Elm pur",
      "Prévention des erreurs CSS courantes à la compilation",
      "Styles composables et réutilisables",
      "Support pour les pseudo-classes et pseudo-éléments",
      "Media queries type-safe",
      "Animations et keyframes",
      "Variables CSS et calculs",
      "Génération de classes CSS optimisées",
      "Intégration avec l'architecture Elm",
      "Support pour les préfixes vendeurs",
    ],
    officialWebsite: "https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/",
    uniqueSellingPoint:
      "Écriture de CSS en Elm avec une vérification de type complète, éliminant les erreurs CSS courantes tout en permettant une composition et réutilisation des styles",
    bestFor: "Applications Elm nécessitant des styles complexes et maintenables avec une sécurité de type",
    version: "18.0.0",
    documentation: "https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/",
    resources: [
      { name: "Documentation officielle", url: "https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/" },
      { name: "GitHub", url: "https://github.com/rtfeldman/elm-css" },
      { name: "Guide elm-css", url: "https://github.com/rtfeldman/elm-css/blob/master/README.md" },
      { name: "Tutoriel", url: "https://elmprogramming.com/elm-css.html" },
      { name: "Exemples", url: "https://github.com/rtfeldman/elm-css-examples" },
      { name: "Elm CSS Patterns", url: "https://github.com/bigardone/elm-css-patterns" },
      { name: "Livre: Elm in Action (avec elm-css)", url: "https://www.manning.com/books/elm-in-action" },
    ],
  },
  "elm-spa": {
    name: "elm-spa",
    description:
      "Framework pour créer des applications à page unique (SPA) en Elm avec une structure cohérente et des fonctionnalités prêtes à l'emploi",
    usedFor:
      "Applications web à page unique, applications Elm complexes, prototypage rapide, applications avec routage",
    features: [
      "Générateur de code pour la structure du projet",
      "Routage automatique basé sur la structure des fichiers",
      "Gestion des pages et des layouts",
      "Chargement paresseux des pages",
      "Transitions de page fluides",
      "Gestion d'état globale et locale",
      "Intégration avec elm-ui et elm-css",
      "Support pour l'authentification",
      "Gestion des erreurs",
      "Développement rapide avec hot reloading",
    ],
    officialWebsite: "https://www.elm-spa.dev/",
    uniqueSellingPoint:
      "Création d'applications Elm complexes avec une architecture cohérente et un routage automatique, réduisant considérablement le code boilerplate tout en maintenant la fiabilité d'Elm",
    bestFor: "Applications Elm de taille moyenne à grande nécessitant une structure organisée et un routage robuste",
    version: "6.0.4",
    documentation: "https://www.elm-spa.dev/guide",
    resources: [
      { name: "Documentation officielle", url: "https://www.elm-spa.dev/guide" },
      { name: "GitHub", url: "https://github.com/ryannhg/elm-spa" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=FgaoOgJ5CAU" },
      { name: "Exemples", url: "https://github.com/ryannhg/elm-spa/tree/main/examples" },
      { name: "Modèles de démarrage", url: "https://www.elm-spa.dev/examples" },
      { name: "Blog de l'auteur", url: "https://rhg.dev/posts/introducing-elm-spa" },
      { name: "Communauté Elm", url: "https://discourse.elm-lang.org/t/elm-spa-6-0-a-framework-for-elm-apps/6866" },
    ],
  },
  "elm-graphql": {
    name: "elm-graphql",
    description:
      "Bibliothèque pour générer du code Elm type-safe à partir de schémas GraphQL, permettant d'interagir avec des APIs GraphQL sans erreurs d'exécution",
    usedFor:
      "Intégration avec des APIs GraphQL, requêtes de données complexes, applications avec état de données riche, applications frontend connectées à des backends GraphQL",
    features: [
      "Génération de code Elm à partir de schémas GraphQL",
      "Requêtes, mutations et abonnements type-safe",
      "Validation des requêtes à la compilation",
      "Autocomplétion dans l'IDE",
      "Décodeurs générés automatiquement",
      "Support pour les fragments GraphQL",
      "Optimisation des requêtes",
      "Gestion des erreurs robuste",
      "Documentation générée automatiquement",
      "Intégration avec l'architecture Elm",
    ],
    officialWebsite: "https://package.elm-lang.org/packages/dillonkearns/elm-graphql/latest/",
    uniqueSellingPoint:
      "Interaction avec des APIs GraphQL sans aucune erreur d'exécution grâce à la génération de code Elm type-safe qui capture toutes les contraintes du schéma GraphQL",
    bestFor:
      "Applications Elm qui consomment des APIs GraphQL et nécessitent une fiabilité maximale dans la manipulation des données",
    version: "5.0.12",
    documentation: "https://package.elm-lang.org/packages/dillonkearns/elm-graphql/latest/",
    resources: [
      {
        name: "Documentation officielle",
        url: "https://package.elm-lang.org/packages/dillonkearns/elm-graphql/latest/",
      },
      { name: "GitHub", url: "https://github.com/dillonkearns/elm-graphql" },
      { name: "Guide de démarrage", url: "https://github.com/dillonkearns/elm-graphql/blob/master/README.md" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=memIRXFSNkU" },
      { name: "Elm Radio Podcast", url: "https://elm-radio.com/episode/elm-graphql" },
      { name: "Exemples", url: "https://github.com/dillonkearns/elm-graphql/tree/master/examples" },
      { name: "Blog de l'auteur", url: "https://incrementalelm.com/articles/" },
    ],
  },
}

