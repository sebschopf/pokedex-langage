import type { Framework } from "./types"

export const dartFrameworks: Record<string, Framework> = {
  Flutter: {
    name: "Flutter",
    description:
      "Framework UI multiplateforme de Google pour créer des applications natives compilées à partir d'une seule base de code Dart",
    usedFor:
      "Applications mobiles iOS et Android, applications web progressives (PWA), applications de bureau (Windows, macOS, Linux), applications embarquées",
    features: [
      "Hot Reload pour un développement rapide",
      "Widgets personnalisables et composables",
      "Rendu haute performance avec le moteur Skia",
      "Animations fluides à 60 FPS",
      "Intégration native avec les plateformes cibles",
      "Gestion d'état intégrée et extensible",
      "Internationalisation et accessibilité",
      "Tests unitaires, d'intégration et de widgets",
      "DevTools pour le débogage et l'analyse de performances",
      "Support pour Material Design et Cupertino (iOS)",
    ],
    officialWebsite: "https://flutter.dev/",
    uniqueSellingPoint:
      "Développement multiplateforme avec une expérience utilisateur native et des performances exceptionnelles grâce à la compilation AOT (Ahead-of-Time)",
    bestFor:
      "Équipes souhaitant développer des applications multiplateformes avec une interface utilisateur riche, des animations fluides et une expérience utilisateur native",
    version: "3.19.0",
    documentation: "https://docs.flutter.dev/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.flutter.dev/" },
      { name: "Flutter Cookbook", url: "https://docs.flutter.dev/cookbook" },
      { name: "Flutter Community", url: "https://flutter.dev/community" },
      { name: "Flutter Gems (packages populaires)", url: "https://fluttergems.dev/" },
      { name: "Flutter YouTube Channel", url: "https://www.youtube.com/c/flutterdev" },
      { name: "Flutter GitHub", url: "https://github.com/flutter/flutter" },
      { name: "Awesome Flutter", url: "https://github.com/Solido/awesome-flutter" },
      { name: "Flutter Apprentice (livre)", url: "https://www.raywenderlich.com/books/flutter-apprentice" },
    ],
  },
  AngularDart: {
    name: "AngularDart",
    description:
      "Version Dart du framework Angular, optimisée pour les applications web d'entreprise avec typage statique et performances élevées",
    usedFor:
      "Applications web d'entreprise, applications à grande échelle, applications web progressives (PWA), applications internes d'entreprise",
    features: [
      "Architecture basée sur les composants",
      "Injection de dépendances robuste",
      "Typage statique complet",
      "Formulaires réactifs et basés sur les templates",
      "Routage puissant et configurable",
      "Compilation AOT (Ahead-of-Time) pour des performances optimales",
      "Intégration avec les services web et APIs REST",
      "Tests unitaires et d'intégration intégrés",
      "Internationalisation (i18n)",
      "Intégration avec l'écosystème Dart",
    ],
    officialWebsite: "https://angulardart.dev/",
    uniqueSellingPoint:
      "Combinaison de la structure robuste d'Angular avec les avantages du typage statique de Dart pour des applications web d'entreprise fiables et maintenables",
    bestFor:
      "Équipes de développement d'entreprise cherchant à construire des applications web complexes avec une architecture solide et un typage fort",
    version: "7.0.0",
    documentation: "https://angulardart.dev/guide",
    resources: [
      { name: "Guide officiel", url: "https://angulardart.dev/guide" },
      { name: "Tutoriels", url: "https://angulardart.dev/tutorial" },
      { name: "API Reference", url: "https://angulardart.dev/api" },
      { name: "GitHub", url: "https://github.com/dart-lang/angular" },
      { name: "Exemples", url: "https://github.com/dart-lang/angular_examples" },
      { name: "Community", url: "https://dart.dev/community" },
    ],
  },
  Aqueduct: {
    name: "Aqueduct",
    description:
      "Framework serveur Dart complet pour le développement d'APIs RESTful et d'applications backend (Note: maintenant considéré comme legacy, remplacé par Conduit)",
    usedFor: "APIs RESTful, services backend, microservices, applications serveur, authentification et autorisation",
    features: [
      "ORM intégré pour la persistance des données",
      "Système de routage basé sur les contrôleurs",
      "Authentification OAuth 2.0 intégrée",
      "Documentation OpenAPI automatique",
      "Tests d'intégration et unitaires",
      "Migrations de base de données",
      "Validation des requêtes",
      "Gestion des erreurs HTTP",
      "Middleware configurable",
      "Support pour PostgreSQL",
    ],
    officialWebsite: "https://aqueduct.io/",
    uniqueSellingPoint:
      "Framework backend Dart tout-en-un avec ORM, authentification et documentation API intégrés pour un développement rapide et structuré",
    bestFor:
      "Développeurs Dart cherchant à construire des APIs RESTful complètes avec une architecture MVC et des fonctionnalités d'entreprise",
    version: "4.0.0-b1 (legacy)",
    documentation: "https://aqueduct.io/docs/",
    resources: [
      { name: "Documentation", url: "https://aqueduct.io/docs/" },
      { name: "GitHub", url: "https://github.com/stablekernel/aqueduct" },
      { name: "Tutoriels", url: "https://aqueduct.io/docs/tut/getting-started/" },
      { name: "Conduit (successeur)", url: "https://github.com/conduit-dart/conduit" },
      { name: "API Reference", url: "https://pub.dev/documentation/aqueduct/latest/" },
    ],
  },
  Shelf: {
    name: "Shelf",
    description: "Bibliothèque Dart minimaliste et composable pour créer des applications web et des serveurs HTTP",
    usedFor:
      "APIs RESTful légères, microservices, middleware HTTP, serveurs web personnalisés, applications backend modulaires",
    features: [
      "Architecture basée sur les middleware",
      "Composabilité et extensibilité maximales",
      "Handlers pour le traitement des requêtes HTTP",
      "Support pour les serveurs HTTP asynchrones",
      "Intégration facile avec d'autres bibliothèques Dart",
      "Testabilité élevée",
      "Performances optimisées",
      "Support pour les streams et les réponses asynchrones",
      "Routage flexible via shelf_router",
      "Support pour HTTP/2",
    ],
    officialWebsite: "https://pub.dev/packages/shelf",
    uniqueSellingPoint:
      "Approche minimaliste et composable pour construire des serveurs HTTP en Dart, offrant une flexibilité maximale et une excellente testabilité",
    bestFor:
      "Développeurs préférant une approche modulaire et composable pour construire des applications backend, ou nécessitant un contrôle précis sur le pipeline HTTP",
    version: "1.4.1",
    documentation: "https://pub.dev/documentation/shelf/latest/",
    resources: [
      { name: "Package sur pub.dev", url: "https://pub.dev/packages/shelf" },
      { name: "Documentation API", url: "https://pub.dev/documentation/shelf/latest/" },
      { name: "GitHub", url: "https://github.com/dart-lang/shelf" },
      { name: "Exemples", url: "https://github.com/dart-lang/shelf/tree/master/example" },
      { name: "shelf_router (routage)", url: "https://pub.dev/packages/shelf_router" },
      { name: "shelf_static (fichiers statiques)", url: "https://pub.dev/packages/shelf_static" },
      { name: "Tutoriel Dart.dev", url: "https://dart.dev/tutorials/server/httpserver" },
    ],
  },
}

