import type { Framework } from "./types"

export const erlangFrameworks: Record<string, Framework> = {
  OTP: {
    name: "OTP (Open Telecom Platform)",
    description:
      "Ensemble de bibliothèques et principes de conception pour construire des applications Erlang robustes",
    usedFor: "Applications distribuées, systèmes tolérants aux pannes, télécommunications, systèmes temps réel",
    features: [
      "Supervision d'arbres",
      "Comportements génériques",
      "Gestion d'erreurs",
      "Distribution transparente",
      "Hot code swapping",
    ],
    officialWebsite: "https://www.erlang.org/",
    uniqueSellingPoint: "Framework éprouvé pour construire des systèmes distribués hautement disponibles",
    bestFor: "Applications critiques nécessitant haute disponibilité et tolérance aux pannes",
    version: "26.0",
    documentation: "https://www.erlang.org/doc/",
    resources: [
      { name: "Documentation", url: "https://www.erlang.org/doc/" },
      { name: "GitHub", url: "https://github.com/erlang/otp" },
      { name: "Tutoriels", url: "https://www.erlang.org/docs" },
    ],
  },
  Cowboy: {
    name: "Cowboy",
    description: "Serveur HTTP petit, rapide et moderne pour Erlang/OTP",
    usedFor: "Applications web, APIs RESTful, WebSockets, services HTTP",
    features: ["Support HTTP/1.1 et HTTP/2", "WebSockets", "Streaming", "Routage basé sur les patterns", "Middleware"],
    officialWebsite: "https://ninenines.eu/docs/en/cowboy/2.9/guide/",
    uniqueSellingPoint: "Serveur HTTP Erlang léger et performant avec support moderne",
    bestFor: "Applications web Erlang nécessitant performances et fonctionnalités modernes",
    version: "2.10.0",
    documentation: "https://ninenines.eu/docs/en/cowboy/2.9/guide/",
    resources: [
      { name: "Documentation", url: "https://ninenines.eu/docs/en/cowboy/2.9/guide/" },
      { name: "GitHub", url: "https://github.com/ninenines/cowboy" },
      { name: "Exemples", url: "https://github.com/ninenines/cowboy/tree/master/examples" },
    ],
  },
  "Riak Core": {
    name: "Riak Core",
    description: "Framework pour construire des applications distribuées basées sur Dynamo",
    usedFor: "Systèmes distribués, bases de données distribuées, applications à haute disponibilité",
    features: [
      "Distribution de données",
      "Partitionnement virtuel (vnodes)",
      "Hachage cohérent",
      "Réplication",
      "Auto-guérison",
    ],
    officialWebsite: "https://github.com/basho/riak_core",
    uniqueSellingPoint: "Framework pour construire des systèmes distribués inspirés par Amazon Dynamo",
    bestFor: "Applications distribuées nécessitant haute disponibilité et partition-tolerance",
    version: "3.0.9",
    documentation: "https://github.com/basho/riak_core/wiki",
    resources: [
      { name: "Documentation", url: "https://github.com/basho/riak_core/wiki" },
      { name: "GitHub", url: "https://github.com/basho/riak_core" },
      { name: "Tutoriels", url: "https://github.com/lambdaclass/riak_core_tutorial" },
    ],
  },
  "Chicago Boss": {
    name: "Chicago Boss",
    description: "Framework web MVC pour Erlang inspiré par Ruby on Rails",
    usedFor: "Applications web, APIs, sites dynamiques",
    features: ["MVC", "ORM", "Templates", "Internationalisation", "WebSockets"],
    officialWebsite: "https://github.com/ChicagoBoss/ChicagoBoss",
    uniqueSellingPoint: "Framework web Erlang avec conventions inspirées de Rails",
    bestFor: "Applications web Erlang nécessitant structure et conventions",
    version: "0.9.0",
    documentation: "https://github.com/ChicagoBoss/ChicagoBoss/wiki",
    resources: [
      { name: "Documentation", url: "https://github.com/ChicagoBoss/ChicagoBoss/wiki" },
      { name: "GitHub", url: "https://github.com/ChicagoBoss/ChicagoBoss" },
      { name: "Tutoriels", url: "https://github.com/ChicagoBoss/ChicagoBoss/wiki/Quickstart" },
    ],
  },
}

