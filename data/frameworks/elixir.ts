import type { Framework } from "./types"

export const elixirFrameworks: Record<string, Framework> = {
  Phoenix: {
    name: "Phoenix",
    description:
      "Framework web complet et performant pour Elixir, conçu pour créer des applications robustes et hautement évolutives",
    usedFor:
      "Applications web, APIs RESTful, applications temps réel, microservices, applications à haute disponibilité, systèmes distribués",
    features: [
      "Architecture MVC",
      "Système de routage expressif",
      "Générateurs de code pour un développement rapide",
      "LiveView pour des interfaces réactives sans JavaScript",
      "Channels pour la communication bidirectionnelle en temps réel",
      "PubSub pour la communication entre processus",
      "Présence pour suivre les utilisateurs en ligne",
      "Tests intégrés",
      "Haute performance et faible latence",
      "Support pour WebSockets et longpolling",
    ],
    officialWebsite: "https://www.phoenixframework.org/",
    uniqueSellingPoint:
      "Performances exceptionnelles et développement d'applications temps réel avec une productivité élevée grâce à LiveView qui élimine le besoin de JavaScript côté client",
    bestFor:
      "Applications web nécessitant une haute concurrence, une faible latence et une tolérance aux pannes, comme les plateformes de chat, les jeux en ligne, les tableaux de bord en temps réel",
    version: "1.7.10",
    documentation: "https://hexdocs.pm/phoenix/overview.html",
    resources: [
      { name: "Documentation officielle", url: "https://hexdocs.pm/phoenix/overview.html" },
      { name: "Guides", url: "https://hexdocs.pm/phoenix/up_and_running.html" },
      { name: "GitHub", url: "https://github.com/phoenixframework/phoenix" },
      { name: "Phoenix LiveView", url: "https://github.com/phoenixframework/phoenix_live_view" },
      { name: "Livre: Programming Phoenix", url: "https://pragprog.com/titles/phoenix14/programming-phoenix-1-4/" },
      { name: "Forum Elixir", url: "https://elixirforum.com/c/phoenix-forum" },
      { name: "Awesome Phoenix", url: "https://github.com/droptheplot/awesome-phoenix" },
    ],
  },
  Nerves: {
    name: "Nerves",
    description:
      "Framework pour construire des applications embarquées et IoT avec Elixir sur des plateformes matérielles comme Raspberry Pi",
    usedFor:
      "Internet des objets (IoT), systèmes embarqués, automatisation industrielle, domotique, robotique, applications de surveillance, kiosques interactifs",
    features: [
      "Système d'exploitation minimal basé sur Linux",
      "Mises à jour OTA (Over-The-Air)",
      "Démarrage rapide (quelques secondes)",
      "Système de fichiers en lecture seule pour la résilience",
      "Gestion des firmwares",
      "Intégration avec les interfaces matérielles (GPIO, I2C, SPI)",
      "Support pour de nombreuses cartes (Raspberry Pi, BeagleBone, etc.)",
      "Écosystème de packages Nerves (Nerves Hub, Nerves Livebook)",
      "Tolérance aux pannes héritée d'Erlang/OTP",
      "Outils de débogage à distance",
    ],
    officialWebsite: "https://www.nerves-project.org/",
    uniqueSellingPoint:
      "Développement d'applications IoT robustes et professionnelles avec la puissance d'Elixir et d'Erlang/OTP, offrant une tolérance aux pannes et des mises à jour à distance sécurisées",
    bestFor:
      "Projets IoT nécessitant fiabilité, mises à jour à distance et longue durée de fonctionnement sans intervention humaine",
    version: "1.10.4",
    documentation: "https://hexdocs.pm/nerves/getting-started.html",
    resources: [
      { name: "Documentation officielle", url: "https://hexdocs.pm/nerves/getting-started.html" },
      { name: "GitHub", url: "https://github.com/nerves-project/nerves" },
      { name: "Nerves Hub", url: "https://www.nerves-hub.org/" },
      { name: "Nerves Livebook", url: "https://github.com/livebook-dev/nerves_livebook" },
      { name: "Elixir Circuits", url: "https://github.com/elixir-circuits" },
      { name: "Forum Elixir (catégorie Nerves)", url: "https://elixirforum.com/c/nerves-forum" },
      {
        name: "Livre: Build a Weather Station with Elixir and Nerves",
        url: "https://pragprog.com/titles/passweather/build-a-weather-station-with-elixir-and-nerves/",
      },
    ],
  },
  Absinthe: {
    name: "Absinthe",
    description: "Framework GraphQL pour Elixir, permettant de créer des APIs GraphQL performantes et flexibles",
    usedFor:
      "APIs GraphQL, applications avec requêtes complexes, applications mobiles, applications avec besoins de données flexibles, agrégation de données",
    features: [
      "Implémentation complète de la spécification GraphQL",
      "Schémas GraphQL en Elixir pur",
      "Résolution parallèle des requêtes",
      "Subscriptions en temps réel",
      "Intégration avec Phoenix",
      "Middleware et plugins extensibles",
      "Validation et introspection",
      "Batching et dataloader pour éviter le problème N+1",
      "Support pour les directives et les fragments",
      "Documentation intégrée avec GraphiQL",
    ],
    officialWebsite: "https://absinthe-graphql.org/",
    uniqueSellingPoint:
      "Implémentation GraphQL native pour Elixir qui exploite la concurrence et la tolérance aux pannes d'Erlang/OTP pour des APIs GraphQL hautement performantes et évolutives",
    bestFor: "APIs nécessitant des requêtes flexibles, des performances élevées et des fonctionnalités en temps réel",
    version: "1.7.5",
    documentation: "https://hexdocs.pm/absinthe/overview.html",
    resources: [
      { name: "Documentation officielle", url: "https://hexdocs.pm/absinthe/overview.html" },
      { name: "GitHub", url: "https://github.com/absinthe-graphql/absinthe" },
      { name: "Guide", url: "https://hexdocs.pm/absinthe/start.html" },
      { name: "Absinthe.Phoenix", url: "https://github.com/absinthe-graphql/absinthe_phoenix" },
      { name: "Absinthe.Plug", url: "https://github.com/absinthe-graphql/absinthe_plug" },
      { name: "Dataloader", url: "https://github.com/absinthe-graphql/dataloader" },
      {
        name: "Livre: Craft GraphQL APIs in Elixir with Absinthe",
        url: "https://pragprog.com/titles/wwgraphql/craft-graphql-apis-in-elixir-with-absinthe/",
      },
    ],
  },
  Ecto: {
    name: "Ecto",
    description:
      "Bibliothèque de base de données et ORM pour Elixir, offrant un moyen robuste d'interagir avec les bases de données relationnelles",
    usedFor:
      "Accès aux bases de données, modélisation de données, migrations de schémas, requêtes complexes, validation de données, applications avec persistance",
    features: [
      "Adaptateurs pour PostgreSQL, MySQL, SQLite et autres",
      "DSL de requête composable et type-safe",
      "Migrations de schéma",
      "Associations et relations",
      "Validations et contraintes",
      "Transactions",
      "Changesets pour les transformations de données sécurisées",
      "Requêtes paramétrées pour éviter les injections SQL",
      "Support pour les types personnalisés",
      "Fonctions d'agrégation et sous-requêtes",
    ],
    officialWebsite: "https://hexdocs.pm/ecto/Ecto.html",
    uniqueSellingPoint:
      "ORM fonctionnel qui sépare clairement les préoccupations (requêtes, schémas, changesets) et offre une sécurité de type sans sacrifier la flexibilité ou les performances",
    bestFor:
      "Applications nécessitant un accès fiable et performant aux bases de données avec une modélisation de données robuste",
    version: "3.10.3",
    documentation: "https://hexdocs.pm/ecto/Ecto.html",
    resources: [
      { name: "Documentation officielle", url: "https://hexdocs.pm/ecto/Ecto.html" },
      { name: "GitHub", url: "https://github.com/elixir-ecto/ecto" },
      { name: "Guide", url: "https://hexdocs.pm/ecto/getting-started.html" },
      { name: "Ecto.SQL", url: "https://hexdocs.pm/ecto_sql/Ecto.Adapters.SQL.html" },
      { name: "Forum Elixir (catégorie Ecto)", url: "https://elixirforum.com/c/elixir-framework-forum/ecto-forum" },
      { name: "Tutoriel Ecto", url: "https://www.poeticoding.com/ecto-the-elixir-database-library/" },
      { name: "Awesome Ecto", url: "https://github.com/elixir-ecto/ecto/wiki/Awesome-Ecto" },
    ],
  },
}

