import type { Framework } from "./types"

export const fsharpFrameworks: Record<string, Framework> = {
  Fable: {
    name: "Fable",
    description: "Compilateur qui transforme le code F# en JavaScript/TypeScript pour le développement web et mobile",
    usedFor:
      "Applications web, applications mobiles avec React Native, applications de bureau avec Electron, jeux avec Fable.Elmish",
    features: [
      "Compilation de F# vers JavaScript/TypeScript",
      "Intégration transparente avec l'écosystème npm",
      "Support pour React via Feliz ou Fable.React",
      "Architecture Elmish (MVU) inspirée d'Elm",
      "Interopérabilité bidirectionnelle avec JavaScript",
      "Typage statique complet",
      "Inférence de types puissante",
      "Support pour les modules ES6",
      "Outils de développement modernes (webpack, vite, etc.)",
      "Hot Module Replacement",
    ],
    officialWebsite: "https://fable.io/",
    uniqueSellingPoint:
      "Développement frontend avec la sécurité et l'expressivité de F# tout en profitant de l'écosystème JavaScript, offrant une expérience de développement sans compromis",
    bestFor:
      "Développeurs .NET qui souhaitent utiliser F# pour le développement frontend tout en conservant la sécurité du typage statique",
    version: "4.1.4",
    documentation: "https://fable.io/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://fable.io/docs/" },
      { name: "GitHub", url: "https://github.com/fable-compiler/Fable" },
      { name: "Awesome Fable", url: "https://github.com/kunjee17/awesome-fable" },
      { name: "SAFE Stack", url: "https://safe-stack.github.io/" },
      { name: "Fable REPL", url: "https://fable.io/repl/" },
      { name: "Fable Community", url: "https://fable.io/community.html" },
      { name: "F# for Fun and Profit", url: "https://fsharpforfunandprofit.com/" },
    ],
  },
  Giraffe: {
    name: "Giraffe",
    description: "Framework web fonctionnel pour F# construit sur ASP.NET Core",
    usedFor: "APIs RESTful, applications web, microservices, backends pour applications SPA",
    features: [
      "Routage fonctionnel composable",
      "Middleware ASP.NET Core",
      "Modèle de programmation basé sur HttpHandler",
      "Composition de fonctions pour le pipeline HTTP",
      "Sérialisation/désérialisation JSON intégrée",
      "Validation de modèles",
      "Support pour les vues (Giraffe.ViewEngine)",
      "Intégration avec ASP.NET Core",
      "Performances élevées",
      "Testabilité excellente",
    ],
    officialWebsite: "https://giraffe.wiki/",
    uniqueSellingPoint:
      "Approche fonctionnelle élégante pour le développement web sur ASP.NET Core, offrant la puissance et la flexibilité de F# avec les performances de la plateforme .NET",
    bestFor:
      "Développeurs F# cherchant à créer des applications web et des APIs avec une approche fonctionnelle sur la plateforme ASP.NET Core",
    version: "6.0.0",
    documentation: "https://giraffe.wiki/",
    resources: [
      { name: "Documentation officielle", url: "https://giraffe.wiki/" },
      { name: "GitHub", url: "https://github.com/giraffe-fsharp/Giraffe" },
      { name: "Tutoriel", url: "https://github.com/giraffe-fsharp/Giraffe/blob/master/DOCUMENTATION.md" },
      { name: "Exemples", url: "https://github.com/giraffe-fsharp/Giraffe/tree/master/samples" },
      { name: "Giraffe Template", url: "https://github.com/dustinmoris/Giraffe-Template" },
      { name: "Giraffe.ViewEngine", url: "https://github.com/giraffe-fsharp/Giraffe.ViewEngine" },
      { name: "Comparaison avec ASP.NET MVC", url: "https://dusted.codes/functional-aspnet-core" },
    ],
  },
  FAKE: {
    name: "FAKE (F# Make)",
    description:
      "Système de build DSL pour F# inspiré par MAKE et RAKE, permettant d'automatiser les processus de build et de déploiement",
    usedFor:
      "Automatisation de builds, CI/CD, déploiement, tests, packaging, génération de documentation, scripts d'administration",
    features: [
      "DSL F# pour définir des tâches de build",
      "Exécution parallèle des tâches",
      "Dépendances entre tâches",
      "Support pour .NET, Mono, .NET Core",
      "Intégration avec les outils de build courants (MSBuild, NuGet, etc.)",
      "Modules pour Git, GitHub, Azure, Docker, etc.",
      "Extensible via des modules personnalisés",
      "Support pour les scripts FAKE (.fsx)",
      "Rechargement à chaud des scripts",
      "Logging intégré",
    ],
    officialWebsite: "https://fake.build/",
    uniqueSellingPoint:
      "Système de build entièrement programmable en F# qui combine la puissance d'un langage de programmation complet avec la simplicité d'un DSL dédié aux tâches de build",
    bestFor:
      "Projets F# ou .NET nécessitant des processus de build complexes et personnalisés avec une approche code-first",
    version: "5.23.1",
    documentation: "https://fake.build/guide.html",
    resources: [
      { name: "Documentation officielle", url: "https://fake.build/guide.html" },
      { name: "GitHub", url: "https://github.com/fsprojects/FAKE" },
      { name: "Tutoriel de démarrage", url: "https://fake.build/fake-gettingstarted.html" },
      { name: "Modules disponibles", url: "https://fake.build/modules.html" },
      { name: "Exemples", url: "https://github.com/fsprojects/FAKE/tree/release/next/help/templates" },
      { name: "Migration vers FAKE 5", url: "https://fake.build/fake-migrate-to-fake-5.html" },
      { name: "FAKE dans le SAFE Stack", url: "https://safe-stack.github.io/docs/component-fake/" },
    ],
  },
  Suave: {
    name: "Suave",
    description: "Framework web léger, non-bloquant et composable pour F#",
    usedFor: "Applications web, APIs RESTful, microservices, prototypes, services web légers",
    features: [
      "Serveur web autonome",
      "Modèle de programmation fonctionnelle",
      "Composition de WebParts",
      "Routage basé sur les fonctions",
      "Support HTTPS",
      "WebSockets",
      "Serveur OWIN",
      "Templating avec DotLiquid",
      "Performances élevées",
      "Empreinte mémoire minimale",
    ],
    officialWebsite: "https://suave.io/",
    uniqueSellingPoint:
      "Framework web F# minimaliste et élégant qui permet de créer des applications web avec une approche purement fonctionnelle, sans dépendance à ASP.NET",
    bestFor: "Applications web légères et APIs nécessitant une approche fonctionnelle pure et une empreinte minimale",
    version: "2.6.2",
    documentation: "https://suave.io/index.html",
    resources: [
      { name: "Documentation officielle", url: "https://suave.io/index.html" },
      { name: "GitHub", url: "https://github.com/SuaveIO/suave" },
      { name: "Tutoriels", url: "https://suave.io/tutorial.html" },
      { name: "Exemples", url: "https://github.com/SuaveIO/suave/tree/master/examples" },
      { name: "Music Store (exemple complet)", url: "https://github.com/SAFE-Stack/SAFE-BookStore" },
      { name: "Suave.DotLiquid", url: "https://github.com/SuaveIO/suave.dotliquid" },
      { name: "Suave.Experimental", url: "https://github.com/SuaveIO/suave.experimental" },
    ],
  },
  FsLab: {
    name: "FsLab",
    description: "Suite d'outils pour la science des données et l'analyse numérique en F#",
    usedFor:
      "Science des données, analyse statistique, visualisation de données, machine learning, traitement de données, notebooks interactifs",
    features: [
      "Intégration de bibliothèques de données F# (Deedle, FSharp.Data, etc.)",
      "Visualisation de données avec XPlot et Plotly",
      "Analyse statistique avec Math.NET Numerics",
      "Accès aux données avec type providers",
      "Notebooks F# interactifs",
      "Intégration R via RProvider",
      "Support pour les formats de données courants (CSV, JSON, XML, etc.)",
      "Traitement de données tabulaires",
      "Intégration avec .NET ML",
      "Support pour les grands ensembles de données",
    ],
    officialWebsite: "https://fslab.org/",
    uniqueSellingPoint:
      "Écosystème complet pour la science des données en F# qui combine la sécurité du typage statique avec la concision et l'expressivité de la programmation fonctionnelle",
    bestFor:
      "Scientifiques des données, analystes et chercheurs qui préfèrent un environnement de programmation fonctionnelle typée pour l'analyse de données",
    version: "2.0.0",
    documentation: "https://fslab.org/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://fslab.org/docs/" },
      { name: "GitHub", url: "https://github.com/fslaborg/FsLab" },
      { name: "Tutoriels", url: "https://fslab.org/tutorials/" },
      { name: "Deedle", url: "https://fslab.org/Deedle/" },
      { name: "FSharp.Data", url: "https://fsprojects.github.io/FSharp.Data/" },
      { name: "XPlot", url: "https://fslab.org/XPlot/" },
      {
        name: "The F# Data Science Workbook",
        url: "https://www.oreilly.com/library/view/practical-fsharp/9781484259405/",
      },
    ],
  },
  Saturn: {
    name: "Saturn",
    description: "Framework web de haut niveau pour F# construit sur Giraffe, inspiré par Elixir's Phoenix",
    usedFor: "Applications web, APIs RESTful, applications CRUD, backends pour applications SPA, microservices",
    features: [
      "Architecture MVC",
      "Système de routage élégant",
      "Contrôleurs et vues typés",
      "Génération de CRUD automatique",
      "Intégration avec Entity Framework Core",
      "Support pour l'authentification et l'autorisation",
      "Middleware composable",
      "Support pour les WebSockets",
      "Intégration avec ASP.NET Core",
      "CLI pour la génération de code",
    ],
    officialWebsite: "https://saturnframework.org/",
    uniqueSellingPoint:
      "Combinaison de la puissance fonctionnelle de F# avec des conventions inspirées de frameworks web populaires comme Phoenix et Ruby on Rails, offrant productivité et type-safety",
    bestFor:
      "Développeurs F# cherchant un framework web complet avec des conventions et une structure claire pour des applications web de taille moyenne à grande",
    version: "0.16.1",
    documentation: "https://saturnframework.org/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://saturnframework.org/docs/" },
      { name: "GitHub", url: "https://github.com/SaturnFramework/Saturn" },
      { name: "Tutoriel", url: "https://saturnframework.org/tutorials/" },
      { name: "SAFE Stack", url: "https://safe-stack.github.io/" },
      { name: "Saturn.Dotnet (CLI)", url: "https://github.com/SaturnFramework/Saturn.Dotnet" },
      { name: "Exemples", url: "https://github.com/SaturnFramework/Saturn.Sample" },
      { name: "Comparaison avec Giraffe", url: "https://saturnframework.org/explanations/overview.html" },
    ],
  },
}

