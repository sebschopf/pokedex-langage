import type { Framework } from "./types"

export const swiftFrameworks: Record<string, Framework> = {
  SwiftUI: {
    name: "SwiftUI",
    description: "Framework déclaratif pour construire des interfaces utilisateur sur toutes les plateformes Apple",
    usedFor: "Applications iOS, macOS, watchOS et tvOS",
    features: [
      "Syntaxe déclarative",
      "Composition de vues",
      "État et liaison de données",
      "Animations",
      "Accessibilité",
    ],
    officialWebsite: "https://developer.apple.com/xcode/swiftui/",
    uniqueSellingPoint:
      "Création d'interfaces utilisateur déclaratives et cohérentes pour toutes les plateformes Apple",
    bestFor: "Applications Apple modernes avec des interfaces utilisateur riches",
    version: "5.0",
    documentation: "https://developer.apple.com/documentation/swiftui/",
  },
  UIKit: {
    name: "UIKit",
    description: "Framework pour construire des interfaces utilisateur sur iOS et tvOS",
    usedFor: "Applications iOS et tvOS",
    features: [
      "Contrôles d'interface utilisateur",
      "Gestion des événements",
      "Animation",
      "Dessin et impression",
      "Accessibilité",
    ],
    officialWebsite: "https://developer.apple.com/documentation/uikit",
    uniqueSellingPoint: "Framework mature et complet pour les interfaces utilisateur iOS",
    bestFor: "Applications iOS nécessitant un contrôle précis de l'interface utilisateur",
    version: "17.0",
    documentation: "https://developer.apple.com/documentation/uikit",
  },
  Combine: {
    name: "Combine",
    description: "Framework de programmation réactive pour Swift",
    usedFor: "Gestion des événements asynchrones, traitement des données, interfaces réactives",
    features: [
      "Publishers et Subscribers",
      "Opérateurs de transformation",
      "Gestion des erreurs",
      "Schedulers",
      "Intégration avec SwiftUI",
    ],
    officialWebsite: "https://developer.apple.com/documentation/combine",
    uniqueSellingPoint: "Programmation réactive native pour l'écosystème Apple",
    bestFor: "Applications Swift nécessitant une gestion avancée des événements asynchrones",
    version: "4.0",
    documentation: "https://developer.apple.com/documentation/combine",
  },
  Vapor: {
    name: "Vapor",
    description: "Framework web pour Swift côté serveur",
    usedFor: "Applications web, APIs RESTful, microservices, applications backend",
    features: ["Routage", "ORM (Fluent)", "Templating (Leaf)", "WebSockets", "Authentification"],
    officialWebsite: "https://vapor.codes/",
    uniqueSellingPoint: "Framework web Swift performant et élégant",
    bestFor: "Applications backend Swift nécessitant des performances et une syntaxe moderne",
    version: "4.0",
    documentation: "https://docs.vapor.codes/",
  },
}

