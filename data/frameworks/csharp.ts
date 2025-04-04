import type { Framework } from "./types"

export const csharpFrameworks: Record<string, Framework> = {
  ".NET": {
    name: ".NET",
    description: "Plateforme de développement complète pour construire différents types d'applications",
    usedFor: "Applications web, desktop, mobile, cloud, IoT, jeux, microservices",
    features: [
      "Runtime multiplateforme",
      "Bibliothèque standard riche",
      "Interopérabilité avec plusieurs langages",
      "Garbage collection automatique",
      "Support pour les applications cloud natives",
    ],
    officialWebsite: "https://dotnet.microsoft.com/",
    uniqueSellingPoint: "Plateforme unifiée pour tous types d'applications avec performances élevées",
    bestFor: "Développement d'applications d'entreprise et systèmes critiques",
    version: "8.0",
    documentation: "https://learn.microsoft.com/dotnet/",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/dotnet/" },
      { name: "GitHub", url: "https://github.com/dotnet/runtime" },
      { name: "Tutoriels", url: "https://dotnet.microsoft.com/learn" },
    ],
  },
  "ASP.NET": {
    name: "ASP.NET",
    description: "Framework pour construire des applications web et des services",
    usedFor: "Applications web, APIs RESTful, microservices, applications temps réel",
    features: [
      "MVC architectural pattern",
      "Razor Pages pour des pages web simples",
      "APIs web avec minimal APIs ou controllers",
      "SignalR pour les communications temps réel",
      "Blazor pour les applications web interactives",
    ],
    officialWebsite: "https://dotnet.microsoft.com/apps/aspnet",
    uniqueSellingPoint: "Performance exceptionnelle et productivité élevée pour les applications web",
    bestFor: "Applications web d'entreprise nécessitant performance et sécurité",
    version: "8.0",
    documentation: "https://learn.microsoft.com/aspnet/core/",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/aspnet/core/" },
      { name: "GitHub", url: "https://github.com/dotnet/aspnetcore" },
      { name: "Tutoriels", url: "https://learn.microsoft.com/aspnet/core/tutorials/" },
    ],
  },
  Unity: {
    name: "Unity",
    description: "Moteur de jeu multiplateforme leader pour le développement de jeux 2D et 3D",
    usedFor: "Jeux vidéo, réalité virtuelle, réalité augmentée, simulations, visualisations",
    features: [
      "Éditeur visuel puissant",
      "Scripting en C#",
      "Moteur physique intégré",
      "Support multiplateforme",
      "Asset Store riche",
    ],
    officialWebsite: "https://unity.com/",
    uniqueSellingPoint: "Environnement de développement complet pour créer des jeux professionnels",
    bestFor: "Développement de jeux et applications interactives pour toutes plateformes",
    version: "2023.2",
    documentation: "https://docs.unity3d.com/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.unity3d.com/" },
      { name: "Unity Learn", url: "https://learn.unity.com/" },
      { name: "Asset Store", url: "https://assetstore.unity.com/" },
    ],
  },
  Xamarin: {
    name: "Xamarin",
    description: "Plateforme pour développer des applications mobiles multiplateformes avec C#",
    usedFor: "Applications mobiles iOS et Android, applications d'entreprise",
    features: [
      "Code partagé entre plateformes",
      "Accès natif aux APIs de plateforme",
      "Performances natives",
      "Intégration avec Visual Studio",
      "Xamarin.Forms pour UI partagée",
    ],
    officialWebsite: "https://dotnet.microsoft.com/apps/xamarin",
    uniqueSellingPoint: "Développement mobile multiplateforme avec C# et .NET",
    bestFor: "Applications d'entreprise nécessitant une présence sur iOS et Android",
    version: "5.0",
    documentation: "https://learn.microsoft.com/xamarin/",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/xamarin/" },
      { name: "GitHub", url: "https://github.com/xamarin/Xamarin.Forms" },
      { name: "Tutoriels", url: "https://learn.microsoft.com/xamarin/get-started/tutorials/" },
    ],
  },
  ".NET MAUI": {
    name: ".NET MAUI",
    description: "Framework multiplateforme pour créer des applications natives pour mobile et bureau avec .NET",
    usedFor: "Applications mobiles iOS et Android, applications de bureau Windows et macOS",
    features: [
      "Une seule base de code pour toutes les plateformes",
      "Contrôles natifs",
      "XAML pour les interfaces utilisateur",
      "Hot Reload",
      "Intégration avec les services Azure",
    ],
    officialWebsite: "https://dotnet.microsoft.com/apps/maui",
    uniqueSellingPoint: "Évolution de Xamarin.Forms permettant de cibler mobile et bureau avec une seule base de code",
    bestFor: "Applications multiplateformes nécessitant une expérience utilisateur native",
    version: "8.0",
    documentation: "https://learn.microsoft.com/dotnet/maui/",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/dotnet/maui/" },
      { name: "GitHub", url: "https://github.com/dotnet/maui" },
      { name: "Tutoriels", url: "https://learn.microsoft.com/dotnet/maui/get-started/tutorials" },
    ],
  },
  "Entity Framework Core": {
    name: "Entity Framework Core",
    description: "ORM (Object-Relational Mapping) moderne et puissant pour .NET",
    usedFor: "Accès aux données, mapping objet-relationnel, applications avec bases de données",
    features: [
      "LINQ pour les requêtes",
      "Migrations de base de données",
      "Support de multiples fournisseurs de base de données",
      "Modèle Code First ou Database First",
      "Suivi des modifications et chargement différé",
    ],
    officialWebsite: "https://learn.microsoft.com/ef/core/",
    uniqueSellingPoint: "ORM puissant et flexible intégré à l'écosystème .NET",
    bestFor: "Applications .NET nécessitant un accès aux données relationnel type-safe",
    version: "8.0",
    documentation: "https://learn.microsoft.com/ef/core/",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/ef/core/" },
      { name: "GitHub", url: "https://github.com/dotnet/efcore" },
      { name: "Tutoriels", url: "https://learn.microsoft.com/ef/core/get-started/" },
    ],
  },
  Blazor: {
    name: "Blazor",
    description: "Framework pour construire des applications web interactives avec C# au lieu de JavaScript",
    usedFor: "Applications web interactives, SPAs, PWAs, applications d'entreprise",
    features: [
      "Composants UI réutilisables",
      "Exécution côté serveur ou WebAssembly",
      "Intégration complète avec .NET",
      "Interopérabilité JavaScript",
      "Déploiement progressif",
    ],
    officialWebsite: "https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor",
    uniqueSellingPoint: "Développement web full-stack en C# sans JavaScript",
    bestFor: "Équipes .NET souhaitant créer des applications web sans JavaScript",
    version: "8.0",
    documentation: "https://learn.microsoft.com/aspnet/core/blazor/",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/aspnet/core/blazor/" },
      { name: "GitHub", url: "https://github.com/dotnet/aspnetcore" },
      { name: "Tutoriels", url: "https://learn.microsoft.com/aspnet/core/blazor/tutorials/" },
    ],
  },
}

