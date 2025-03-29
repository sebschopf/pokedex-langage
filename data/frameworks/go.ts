import type { Framework } from "./types"

export const goFrameworks: Record<string, Framework> = {
  Gin: {
    name: "Gin",
    description:
      "Framework web HTTP léger et rapide pour Go, inspiré par Martini avec des performances bien meilleures",
    usedFor:
      "APIs RESTful, microservices, applications web hautes performances, services backend, applications cloud natives",
    features: [
      "Routage extrêmement rapide basé sur httprouter",
      "Middleware flexible et extensible",
      "Validation de données et binding de formulaires/JSON",
      "Gestion des erreurs avec récupération élégante",
      "Rendu de templates multiformats (JSON, XML, HTML, etc.)",
      "Support pour le téléchargement/téléversement de fichiers",
      "Groupes de routes pour une meilleure organisation",
      "Injection de dépendances via le contexte",
      "Tests unitaires facilités",
      "Logging personnalisable",
    ],
    officialWebsite: "https://gin-gonic.com/",
    uniqueSellingPoint:
      "Combinaison parfaite entre performances exceptionnelles (jusqu'à 40 fois plus rapide que d'autres frameworks Go) et API élégante inspirée de Martini, idéale pour les applications à fort trafic",
    bestFor:
      "Développeurs cherchant un framework Go minimaliste mais complet avec des performances optimales pour des APIs et services web à fort trafic",
    version: "1.9.1",
    documentation: "https://gin-gonic.com/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://gin-gonic.com/docs/" },
      { name: "GitHub", url: "https://github.com/gin-gonic/gin" },
      { name: "Exemples", url: "https://github.com/gin-gonic/examples" },
      { name: "Tutoriel Go par l'exemple", url: "https://gobyexample.com/" },
      { name: "Awesome Gin", url: "https://github.com/FlowerWrong/awesome-gin" },
      { name: "Gin Web Framework (vidéo)", url: "https://www.youtube.com/watch?v=qR0WnWL2o1Q" },
      { name: "Comparaison de performances", url: "https://github.com/gin-gonic/gin#benchmarks" },
    ],
  },
  Echo: {
    name: "Echo",
    description: "Framework web haute performance et minimaliste pour Go avec une API élégante et extensible",
    usedFor:
      "APIs RESTful, microservices, applications web, services cloud, applications temps réel, backends pour applications mobiles",
    features: [
      "Routage optimisé avec support des paramètres et expressions régulières",
      "Middleware extensible avec architecture en oignon",
      "Validation de données intégrée",
      "Binding et rendu de données (JSON, XML, MsgPack, etc.)",
      "Templates HTML avec différents moteurs",
      "WebSockets natifs",
      "Groupes de routes et sous-domaines",
      "Gestion automatique des TLS/HTTPS",
      "Système de contexte puissant",
      "Injection de dépendances",
    ],
    officialWebsite: "https://echo.labstack.com/",
    uniqueSellingPoint:
      "API minimaliste et élégante combinée à des performances exceptionnelles et une extensibilité maximale, avec une documentation claire et complète",
    bestFor:
      "Développeurs Go cherchant un framework bien structuré, hautement personnalisable et performant pour des applications web modernes",
    version: "4.11.2",
    documentation: "https://echo.labstack.com/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://echo.labstack.com/docs/" },
      { name: "GitHub", url: "https://github.com/labstack/echo" },
      { name: "Guide de démarrage", url: "https://echo.labstack.com/docs/quick-start" },
      { name: "Cookbook", url: "https://echo.labstack.com/docs/cookbook/hello-world" },
      { name: "Awesome Echo", url: "https://github.com/Lajule/awesome-echo" },
      { name: "Echo Middleware", url: "https://echo.labstack.com/middleware/" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=_pww3NJuWnk" },
    ],
  },
  Fiber: {
    name: "Fiber",
    description:
      "Framework web Express-inspiré pour Go basé sur Fasthttp, conçu pour faciliter les choses sans sacrifier les performances",
    usedFor:
      "APIs RESTful, microservices, applications web, services temps réel, applications à fort trafic, migration depuis Node.js/Express",
    features: [
      "API inspirée d'Express.js pour une transition facile depuis Node.js",
      "Routage ultra-rapide basé sur Fasthttp",
      "Middleware à faible surcharge avec Next support",
      "Système de templates intégré",
      "WebSockets natifs",
      "Rate limiter et compression",
      "Support pour les tests API",
      "Zéro allocation de mémoire dans le hot path",
      "Serveur API prêt pour la production",
      "Utilitaires pour les cookies, préfixage de routes, etc.",
    ],
    officialWebsite: "https://gofiber.io/",
    uniqueSellingPoint:
      "Expérience de développement similaire à Express.js avec la puissance et les performances de Go, permettant une transition en douceur pour les développeurs JavaScript/Node.js",
    bestFor:
      "Développeurs JavaScript/Node.js passant à Go ou équipes cherchant un framework Go avec une syntaxe familière et des performances exceptionnelles",
    version: "2.51.0",
    documentation: "https://docs.gofiber.io/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.gofiber.io/" },
      { name: "GitHub", url: "https://github.com/gofiber/fiber" },
      { name: "Exemples", url: "https://github.com/gofiber/recipes" },
      { name: "Awesome Fiber", url: "https://github.com/gofiber/awesome-fiber" },
      { name: "Middleware", url: "https://docs.gofiber.io/category/-middleware" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=Iq2qT0fRhAA" },
      { name: "Comparaison avec Express.js", url: "https://docs.gofiber.io/extra/benchmarks" },
    ],
  },
  Buffalo: {
    name: "Buffalo",
    description: "Framework web complet pour Go qui aide à développer rapidement des applications web robustes",
    usedFor:
      "Applications web complètes, sites web avec backend, applications monolithiques, prototypage rapide, applications CRUD, sites avec authentification",
    features: [
      "Génération de code et scaffolding",
      "Hot reloading pour un développement rapide",
      "Intégration avec Webpack pour les assets frontend",
      "ORM intégré (Pop) pour l'accès aux bases de données",
      "Système de templates Buffalo (Plush)",
      "Internationalisation (i18n) intégrée",
      "Authentification et autorisation",
      "Migrations de base de données",
      "Outils de test intégrés",
      "CLI puissante pour la génération de code",
    ],
    officialWebsite: "https://gobuffalo.io/",
    uniqueSellingPoint:
      "Approche 'batteries included' qui fournit tout ce dont vous avez besoin pour développer des applications web complètes en Go, de la base de données au frontend, avec une expérience de développement rapide similaire à Ruby on Rails",
    bestFor:
      "Développeurs cherchant un framework Go tout-en-un pour construire rapidement des applications web complètes avec une expérience de développement productive",
    version: "1.1.0",
    documentation: "https://gobuffalo.io/documentation/",
    resources: [
      { name: "Documentation officielle", url: "https://gobuffalo.io/documentation/" },
      { name: "GitHub", url: "https://github.com/gobuffalo/buffalo" },
      { name: "Guide de démarrage", url: "https://gobuffalo.io/documentation/getting_started/installation/" },
      { name: "Tutoriels", url: "https://gobuffalo.io/documentation/tutorials/" },
      { name: "Vidéos", url: "https://gobuffalo.io/documentation/videos/" },
      { name: "Slack Community", url: "https://gophers.slack.com/messages/buffalo/" },
      { name: "Comparaison avec Rails", url: "https://blog.gobuffalo.io/from-rails-to-buffalo-19a28ef89c9b" },
    ],
  },
  Beego: {
    name: "Beego",
    description: "Framework web MVC complet pour Go inspiré par Django et Rails, avec une architecture modulaire",
    usedFor:
      "Applications web d'entreprise, APIs RESTful, microservices, applications backend, systèmes CMS, sites e-commerce, applications avec ORM",
    features: [
      "Architecture MVC complète",
      "ORM puissant et intégré",
      "Routage intelligent avec annotations",
      "Validation de formulaires et de données",
      "Internationalisation (i18n)",
      "Système de cache flexible",
      "Logs personnalisables",
      "Administration automatique (comme Django)",
      "Génération de documentation Swagger",
      "Outils de déploiement et monitoring",
    ],
    officialWebsite: "https://beego.vip/",
    uniqueSellingPoint:
      "Framework MVC complet et mature pour Go avec une approche inspirée de Django et Rails, offrant une solution tout-en-un pour les applications d'entreprise avec une architecture modulaire",
    bestFor:
      "Équipes d'entreprise cherchant un framework Go complet avec une architecture MVC claire et des fonctionnalités d'entreprise intégrées",
    version: "2.1.0",
    documentation: "https://beego.vip/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://beego.vip/docs/" },
      { name: "GitHub", url: "https://github.com/beego/beego" },
      { name: "Quickstart", url: "https://beego.vip/quickstart" },
      { name: "Exemples", url: "https://github.com/beego/samples" },
      { name: "Blog", url: "https://beego.vip/blog/" },
      { name: "Vidéos tutoriels", url: "https://www.youtube.com/results?search_query=beego+framework" },
      {
        name: "Livre: Building Web Apps with Beego",
        url: "https://www.packtpub.com/product/building-web-apps-with-beego/9781785282317",
      },
    ],
  },
  Gorilla: {
    name: "Gorilla",
    description:
      "Boîte à outils web modulaire pour Go offrant des packages réutilisables pour construire des applications web",
    usedFor:
      "Applications web, APIs RESTful, WebSockets, services web personnalisés, middleware personnalisés, applications nécessitant des composants spécifiques",
    features: [
      "Routeur mux puissant et flexible",
      "Gestion des sessions et cookies sécurisés",
      "Implémentation WebSocket complète",
      "Gestion du contexte pour les requêtes",
      "Schéma pour la validation et le binding",
      "RPC over HTTP",
      "Compression HTTP",
      "Packages indépendants et composables",
      "Compatibilité avec la bibliothèque standard net/http",
      "Faible couplage entre les composants",
    ],
    officialWebsite: "https://www.gorillatoolkit.org/",
    uniqueSellingPoint:
      "Approche modulaire et composable permettant de choisir uniquement les composants nécessaires, avec une intégration parfaite avec la bibliothèque standard Go et une grande flexibilité",
    bestFor:
      "Développeurs Go préférant une approche à la carte pour construire des applications web, en sélectionnant uniquement les composants dont ils ont besoin",
    version: "1.0.0",
    documentation: "https://www.gorillatoolkit.org/pkg/",
    resources: [
      { name: "Site officiel", url: "https://www.gorillatoolkit.org/" },
      { name: "GitHub (gorilla/mux)", url: "https://github.com/gorilla/mux" },
      { name: "GitHub (gorilla/websocket)", url: "https://github.com/gorilla/websocket" },
      { name: "GitHub (gorilla/sessions)", url: "https://github.com/gorilla/sessions" },
      { name: "Tutoriel mux", url: "https://www.gorillatoolkit.org/pkg/mux" },
      { name: "Tutoriel WebSocket", url: "https://www.gorillatoolkit.org/pkg/websocket" },
      { name: "Exemples d'utilisation", url: "https://github.com/gorilla" },
    ],
  },
}

