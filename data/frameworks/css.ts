import type { Framework } from "./types"

export const cssFrameworks: Record<string, Framework> = {
  Bootstrap: {
    name: "Bootstrap",
    description: "Framework CSS populaire pour la création de sites web responsives et mobiles-first",
    usedFor:
      "Sites web responsives, applications web, interfaces utilisateur, tableaux de bord, sites e-commerce, projets nécessitant un développement rapide",
    features: [
      "Système de grille responsive à 12 colonnes",
      "Composants pré-construits (navbar, cards, modals, etc.)",
      "Utilitaires flexibles pour le spacing, la typographie et plus",
      "JavaScript intégré pour les interactions",
      "Personnalisable via Sass",
      "Compatible avec tous les navigateurs modernes",
      "Accessibilité intégrée",
      "Système d'icônes (Bootstrap Icons)",
      "Documentation complète et exemples",
      "Large communauté et support",
    ],
    officialWebsite: "https://getbootstrap.com/",
    uniqueSellingPoint:
      "Solution complète et éprouvée pour développer rapidement des interfaces responsives avec une courbe d'apprentissage minimale et une compatibilité maximale",
    bestFor:
      "Projets nécessitant un développement rapide avec une apparence professionnelle et cohérente, idéal pour les développeurs qui privilégient la productivité à la personnalisation extrême",
    version: "5.3",
    documentation: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    resources: [
      { name: "Documentation officielle", url: "https://getbootstrap.com/docs/5.3/getting-started/introduction/" },
      { name: "GitHub", url: "https://github.com/twbs/bootstrap" },
      { name: "Exemples officiels", url: "https://getbootstrap.com/docs/5.3/examples/" },
      { name: "Thèmes Bootstrap", url: "https://themes.getbootstrap.com/" },
      { name: "Bootstrap Icons", url: "https://icons.getbootstrap.com/" },
      { name: "Cours Bootstrap (W3Schools)", url: "https://www.w3schools.com/bootstrap5/" },
      { name: "Communauté Stack Overflow", url: "https://stackoverflow.com/questions/tagged/bootstrap-5" },
    ],
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    description: "Framework CSS utilitaire pour la création d'interfaces personnalisées sans quitter votre HTML",
    usedFor:
      "Interfaces utilisateur personnalisées, sites web modernes, applications web, prototypage rapide, projets nécessitant une personnalisation poussée",
    features: [
      "Classes utilitaires atomiques pour tous les aspects du design",
      "Approche mobile-first",
      "Système de design configurable (couleurs, espacement, typographie, etc.)",
      "JIT (Just-In-Time) compiler pour des builds optimisés",
      "Purge CSS intégré pour éliminer les classes non utilisées",
      "Thèmes sombres/clairs natifs",
      "Responsive design via préfixes de breakpoints",
      "Extensible via plugins",
      "État des composants (hover, focus, etc.)",
      "Personnalisation avancée via tailwind.config.js",
    ],
    officialWebsite: "https://tailwindcss.com/",
    uniqueSellingPoint:
      "Approche utilitaire qui permet de créer des designs entièrement personnalisés sans écrire de CSS, tout en maintenant une cohérence visuelle grâce à un système de design configurable",
    bestFor:
      "Développeurs qui souhaitent un contrôle total sur le design sans les contraintes des frameworks de composants traditionnels, idéal pour les projets avec une identité visuelle unique",
    version: "3.3",
    documentation: "https://tailwindcss.com/docs/installation",
    resources: [
      { name: "Documentation officielle", url: "https://tailwindcss.com/docs/installation" },
      { name: "GitHub", url: "https://github.com/tailwindlabs/tailwindcss" },
      { name: "Tailwind UI (composants premium)", url: "https://tailwindui.com/" },
      { name: "Tailwind Play (playground)", url: "https://play.tailwindcss.com/" },
      { name: "Headless UI (composants accessibles)", url: "https://headlessui.dev/" },
      { name: "Tailwind CSS Cheat Sheet", url: "https://nerdcave.com/tailwind-cheat-sheet" },
      { name: "Awesome Tailwind CSS", url: "https://github.com/aniftyco/awesome-tailwindcss" },
    ],
  },
  "Water.css": {
    name: "Water.css",
    description: "Collection de styles sans classes pour créer des sites web simples et élégants avec juste du HTML",
    usedFor:
      "Sites web minimalistes, blogs personnels, prototypes, projets qui privilégient le HTML sémantique, pages de documentation simples",
    features: [
      "Aucune classe CSS requise",
      "Extrêmement léger (moins de 2KB)",
      "Thèmes clair et sombre automatiques (basés sur les préférences du système)",
      "Styles responsives par défaut",
      "Typographie lisible et élégante",
      "Styles pour tous les éléments HTML courants",
      "Formulaires et tableaux élégants",
      "Variables CSS pour la personnalisation",
      "Aucune dépendance",
      "Haute compatibilité avec les navigateurs",
    ],
    officialWebsite: "https://watercss.kognise.dev/",
    uniqueSellingPoint:
      "Framework ultra-léger sans classes qui transforme instantanément du HTML brut en un site web élégant, idéal pour les projets où la simplicité est primordiale",
    bestFor:
      "Développeurs qui souhaitent créer rapidement des sites web simples et élégants sans se soucier du CSS, parfait pour les prototypes et les petits projets",
    version: "2.1.1",
    documentation: "https://watercss.kognise.dev/",
    resources: [
      { name: "Site officiel", url: "https://watercss.kognise.dev/" },
      { name: "GitHub", url: "https://github.com/kognise/water.css" },
      { name: "Démo", url: "https://watercss.kognise.dev/#demo" },
      { name: "Personnalisation", url: "https://watercss.kognise.dev/#customization" },
      { name: "Comparaison avec d'autres frameworks sans classes", url: "https://github.com/dbohdan/classless-css" },
      {
        name: "Article: CSS sans classes",
        url: "https://dev.to/kognise/water-css-a-just-add-css-collection-of-styles-1mgk",
      },
      { name: "NPM Package", url: "https://www.npmjs.com/package/water.css" },
    ],
  },
  "Material UI": {
    name: "Material UI",
    description: "Bibliothèque de composants React implémentant le Material Design de Google",
    usedFor:
      "Applications web React, interfaces utilisateur cohérentes, tableaux de bord, applications d'entreprise, applications mobiles web",
    features: [
      "Plus de 100 composants React réutilisables",
      "Implémentation fidèle des spécifications Material Design",
      "Système de thème personnalisable",
      "Support pour les modes sombre et clair",
      "Composants entièrement accessibles",
      "Styles basés sur Emotion ou styled-components",
      "Système de grille responsive",
      "Utilitaires de style (Box, Stack, Grid)",
      "Hooks personnalisés pour la logique commune",
      "Intégration avec TypeScript",
    ],
    officialWebsite: "https://mui.com/",
    uniqueSellingPoint:
      "Implémentation complète et élégante du Material Design pour React avec une grande flexibilité de personnalisation et une excellente expérience développeur",
    bestFor:
      "Applications React nécessitant une interface utilisateur professionnelle et cohérente basée sur les principes du Material Design",
    version: "5.14",
    documentation: "https://mui.com/material-ui/getting-started/installation/",
    resources: [
      { name: "Documentation officielle", url: "https://mui.com/material-ui/getting-started/installation/" },
      { name: "GitHub", url: "https://github.com/mui/material-ui" },
      { name: "Composants", url: "https://mui.com/material-ui/react-autocomplete/" },
      { name: "Templates", url: "https://mui.com/material-ui/getting-started/templates/" },
      { name: "Showcase", url: "https://mui.com/material-ui/discover-more/showcase/" },
      { name: "Blog", url: "https://mui.com/blog/" },
      { name: "Material Icons", url: "https://mui.com/material-ui/material-icons/" },
    ],
  },
  "Windi CSS": {
    name: "Windi CSS",
    description:
      "Framework CSS utilitaire basé sur la compilation à la demande (JIT), alternative plus rapide à Tailwind CSS",
    usedFor:
      "Sites web modernes, applications web, interfaces utilisateur personnalisées, prototypage rapide, projets nécessitant des performances de build optimales",
    features: [
      "Compilation à la demande (JIT) pour des builds ultra-rapides",
      "Compatible avec la syntaxe Tailwind CSS",
      "Génération automatique des variants (hover, focus, etc.)",
      "Attributs de valeur (ex: p-${size}) pour une flexibilité accrue",
      "Groupes de classes réutilisables avec @apply",
      "Utilitaires supplémentaires non disponibles dans Tailwind",
      "Mode d'inspection visuelle intégré",
      "Support pour les directives importantes",
      "Plugins et extensions",
      "Intégration avec les frameworks populaires (Vue, React, Svelte)",
    ],
    officialWebsite: "https://windicss.org/",
    uniqueSellingPoint:
      "Vitesse de compilation nettement supérieure à Tailwind CSS grâce à l'approche JIT native, tout en offrant une syntaxe compatible et des fonctionnalités supplémentaires",
    bestFor:
      "Projets utilisant l'approche utilitaire de Tailwind CSS mais nécessitant des performances de build optimales et des fonctionnalités supplémentaires",
    version: "3.5.6",
    documentation: "https://windicss.org/guide/",
    resources: [
      { name: "Documentation officielle", url: "https://windicss.org/guide/" },
      { name: "GitHub", url: "https://github.com/windicss/windicss" },
      { name: "Playground", url: "https://windicss.org/play/" },
      { name: "Intégrations", url: "https://windicss.org/integrations/" },
      { name: "Migration depuis Tailwind", url: "https://windicss.org/guide/migration.html" },
      { name: "Comparaison avec Tailwind", url: "https://windicss.org/guide/comparison.html" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=3PS4Ux_FAXs" },
    ],
  },
  "Pure CSS": {
    name: "Pure CSS",
    description: "Ensemble de modules CSS petits et responsifs qui peuvent être utilisés dans tout projet web",
    usedFor:
      "Sites web légers, applications mobiles, projets nécessitant une empreinte minimale, sites à faible bande passante",
    features: [
      "Extrêmement léger (moins de 4KB minifié et gzippé)",
      "Modulaire - utilisez uniquement ce dont vous avez besoin",
      "Conçu pour être responsive",
      "Compatible avec tous les navigateurs modernes",
      "Système de grille basé sur Flexbox",
      "Formulaires élégants",
      "Boutons et menus simples",
      "Tables responsives",
      "Approche minimaliste",
      "Facile à étendre et personnaliser",
    ],
    officialWebsite: "https://purecss.io/",
    uniqueSellingPoint:
      "Framework CSS ultra-léger et modulaire offrant l'essentiel pour des projets web performants, idéal pour les environnements à faible bande passante",
    bestFor:
      "Projets où la performance et la taille du fichier sont critiques, comme les sites mobiles ou les applications dans des régions à faible connectivité",
    version: "3.0.0",
    documentation: "https://purecss.io/",
    resources: [
      { name: "Documentation officielle", url: "https://purecss.io/" },
      { name: "GitHub", url: "https://github.com/pure-css/pure/" },
      { name: "Layouts", url: "https://purecss.io/layouts/" },
      { name: "Customize", url: "https://purecss.io/customize/" },
      { name: "Extend", url: "https://purecss.io/extend/" },
      { name: "Blog", url: "https://purecss.io/blog/" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=oZCpDvH1dRo" },
    ],
  },
  PicoCSS: {
    name: "Pico CSS",
    description:
      "Framework CSS minimal et sémantique qui fournit des styles élégants pour les éléments HTML natifs sans classes",
    usedFor:
      "Sites web minimalistes, prototypes, blogs, documentation, projets qui privilégient le HTML sémantique, sites à faible maintenance",
    features: [
      "Styles pour les éléments HTML natifs sans classes CSS",
      "Taille minimale (~10KB minifié et gzippé)",
      "Design responsive par défaut",
      "Thèmes clair et sombre intégrés",
      "Personnalisation via variables CSS",
      "Grille basée sur CSS Grid",
      "Composants de formulaire élégants",
      "Typographie soignée",
      "Accessibilité intégrée",
      "Aucune dépendance JavaScript",
    ],
    officialWebsite: "https://picocss.com/",
    uniqueSellingPoint:
      "Approche 'classless' qui permet de créer des sites web élégants en écrivant uniquement du HTML sémantique, sans avoir à ajouter de classes CSS",
    bestFor:
      "Développeurs qui préfèrent se concentrer sur le contenu et la structure HTML plutôt que sur les classes CSS, idéal pour les projets simples et les prototypes rapides",
    version: "2.0.0",
    documentation: "https://picocss.com/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://picocss.com/docs/" },
      { name: "GitHub", url: "https://github.com/picocss/pico" },
      { name: "Exemples", url: "https://picocss.com/examples/" },
      { name: "Personnalisation", url: "https://picocss.com/docs/customization.html" },
      { name: "Thèmes", url: "https://picocss.com/docs/themes.html" },
      { name: "Composants", url: "https://picocss.com/docs/cards.html" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=Gy9MZYnHvQg" },
    ],
  },
  "Semantic UI": {
    name: "Semantic UI",
    description:
      "Framework de développement qui utilise une syntaxe basée sur le langage naturel et un HTML sémantique",
    usedFor:
      "Interfaces utilisateur riches et intuitives, applications web, sites d'entreprise, tableaux de bord, e-commerce",
    features: [
      "Plus de 50 composants d'interface utilisateur",
      "Syntaxe basée sur le langage naturel (classes comme 'ui red button')",
      "Système de thème personnalisable",
      "Intégration avec React, Angular, etc.",
      "API JavaScript pour les interactions complexes",
      "Responsive design",
      "Système de grille flexible",
      "Variables LESS pour la personnalisation",
      "Animations et transitions",
      "Intégration avec jQuery",
    ],
    officialWebsite: "https://semantic-ui.com/",
    uniqueSellingPoint:
      "Syntaxe intuitive basée sur le langage naturel et l'HTML sémantique, rendant le code plus lisible et plus facile à comprendre",
    bestFor:
      "Projets nécessitant une interface utilisateur riche avec une syntaxe intuitive et un grand nombre de composants prêts à l'emploi",
    version: "2.4.2",
    documentation: "https://semantic-ui.com/introduction/getting-started.html",
    resources: [
      { name: "Documentation officielle", url: "https://semantic-ui.com/introduction/getting-started.html" },
      { name: "GitHub", url: "https://github.com/Semantic-Org/Semantic-UI" },
      { name: "Semantic UI React", url: "https://react.semantic-ui.com/" },
      { name: "Themes", url: "https://semantic-ui.com/usage/theming.html" },
      { name: "Exemples", url: "https://semantic-ui.com/kitchen-sink.html" },
      { name: "Fomantic-UI (fork maintenu)", url: "https://fomantic-ui.com/" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=a9mUH1EWp40" },
    ],
  },
  UIkit: {
    name: "UIkit",
    description: "Framework frontend léger et modulaire pour développer des interfaces web rapides et puissantes",
    usedFor:
      "Sites web modernes, applications web, interfaces utilisateur complexes, projets nécessitant une approche modulaire",
    features: [
      "Plus de 30 composants modulaires",
      "Système de grille flexible basé sur Flexbox",
      "Animations et transitions fluides",
      "Thèmes personnalisables",
      "Intégration JavaScript complète",
      "Approche mobile-first",
      "Système d'icônes intégré",
      "Préprocesseur Less/Sass",
      "Personnalisation via variables",
      "Architecture extensible via plugins",
    ],
    officialWebsite: "https://getuikit.com/",
    uniqueSellingPoint:
      "Combinaison parfaite de légèreté, modularité et élégance visuelle, avec une attention particulière aux animations et transitions fluides",
    bestFor:
      "Projets nécessitant une interface utilisateur moderne et élégante avec des animations fluides et une approche modulaire",
    version: "3.17.11",
    documentation: "https://getuikit.com/docs/introduction",
    resources: [
      { name: "Documentation officielle", url: "https://getuikit.com/docs/introduction" },
      { name: "GitHub", url: "https://github.com/uikit/uikit" },
      { name: "Exemples", url: "https://getuikit.com/docs/examples" },
      { name: "Changelog", url: "https://getuikit.com/changelog" },
      { name: "Blog", url: "https://getuikit.com/blog" },
      { name: "Tutoriel vidéo", url: "https://www.youtube.com/watch?v=JdXoUgYQebM" },
      { name: "Thèmes communautaires", url: "https://github.com/topics/uikit-theme" },
    ],
  },
  Foundation: {
    name: "Foundation",
    description: "Framework front-end responsive avancé pour créer des sites et applications professionnels",
    usedFor: "Sites web d'entreprise, applications web, emails responsives, prototypage",
    features: [
      "Système de grille responsive avancé",
      "Composants d'interface utilisateur",
      "Typographie responsive",
      "Formulaires et validation",
      "Navigation et menus",
      "Personnalisation via Sass",
      "Accessibilité",
      "Framework d'emails responsives",
      "Système de plugins",
    ],
    officialWebsite: "https://get.foundation/",
    uniqueSellingPoint:
      "Framework professionnel avec options avancées pour les besoins d'entreprise et une approche 'mobile-first'",
    bestFor: "Projets d'entreprise nécessitant flexibilité et personnalisation avancée",
    version: "6.7.5",
    documentation: "https://get.foundation/sites/docs/",
    resources: [
      { name: "Documentation", url: "https://get.foundation/sites/docs/" },
      { name: "GitHub", url: "https://github.com/foundation/foundation-sites" },
      { name: "Tutoriels", url: "https://get.foundation/learn/tutorials.html" },
    ],
  },
  Bulma: {
    name: "Bulma",
    description: "Framework CSS moderne basé sur Flexbox sans JavaScript",
    usedFor: "Sites web modernes, interfaces utilisateur, applications web, prototypage",
    features: [
      "Basé entièrement sur Flexbox",
      "Modulaire et léger",
      "Sans JavaScript",
      "Responsive par défaut",
      "Système de colonnes flexible",
      "Composants modernes",
      "Personnalisation via variables Sass",
      "Approche mobile-first",
    ],
    officialWebsite: "https://bulma.io/",
    uniqueSellingPoint: "Framework CSS pur sans JavaScript avec une approche moderne basée sur Flexbox",
    bestFor: "Projets nécessitant une interface moderne sans dépendance JavaScript",
    version: "0.9.4",
    documentation: "https://bulma.io/documentation/",
    resources: [
      { name: "Documentation", url: "https://bulma.io/documentation/" },
      { name: "GitHub", url: "https://github.com/jgthms/bulma" },
      { name: "Extensions", url: "https://bulma.io/extensions/" },
    ],
  },
  "Chakra UI": {
    name: "Chakra UI",
    description: "Bibliothèque de composants React simples, modulaires et accessibles",
    usedFor: "Applications React, interfaces utilisateur accessibles, prototypage rapide",
    features: [
      "Composants accessibles",
      "Styles basés sur props",
      "Thèmes personnalisables",
      "Support pour mode sombre",
      "Responsive par défaut",
      "Composants modulaires",
      "Hooks personnalisés",
      "Animations et transitions",
    ],
    officialWebsite: "https://chakra-ui.com/",
    uniqueSellingPoint:
      "Bibliothèque de composants React avec accessibilité intégrée et API de style basée sur les props",
    bestFor: "Applications React nécessitant accessibilité et développement rapide",
    version: "2.8.0",
    documentation: "https://chakra-ui.com/docs/getting-started",
    resources: [
      { name: "Documentation", url: "https://chakra-ui.com/docs/getting-started" },
      { name: "GitHub", url: "https://github.com/chakra-ui/chakra-ui" },
      { name: "Composants", url: "https://chakra-ui.com/docs/components" },
    ],
  },
  Skeleton: {
    name: "Skeleton",
    description: "Framework CSS ultra-léger pour sites responsives",
    usedFor: "Sites web simples, prototypes, projets nécessitant base minimale",
    features: [
      "Ultra-léger (~400 lignes de CSS)",
      "Système de grille responsive",
      "Typographie de base",
      "Boutons et formulaires",
      "Utilitaires simples",
      "Mobile-first",
      "Sans classes complexes",
    ],
    officialWebsite: "http://getskeleton.com/",
    uniqueSellingPoint: "Framework CSS minimaliste qui fournit juste l'essentiel pour démarrer rapidement",
    bestFor: "Projets simples nécessitant une base CSS légère sans superflu",
    version: "2.0.4",
    documentation: "http://getskeleton.com/",
    resources: [
      { name: "Documentation", url: "http://getskeleton.com/" },
      { name: "GitHub", url: "https://github.com/dhg/Skeleton" },
      { name: "Démo", url: "http://getskeleton.com/#examples" },
    ],
  },
  Milligram: {
    name: "Milligram",
    description: "Framework CSS minimaliste pour un démarrage rapide avec un style minimal",
    usedFor: "Sites web légers, prototypes, projets avec design minimaliste",
    features: [
      "Taille minimale (2kb gzippé)",
      "Typographie responsive",
      "Système de grille basé sur Flexbox",
      "Formulaires élégants",
      "Utilisation de variables CSS",
      "Style épuré et minimaliste",
      "Compatible avec tous les navigateurs modernes",
    ],
    officialWebsite: "https://milligram.io/",
    uniqueSellingPoint: "Framework CSS ultra-léger avec style minimaliste et moderne",
    bestFor: "Projets nécessitant une base CSS légère avec un style élégant",
    version: "1.4.1",
    documentation: "https://milligram.io/",
    resources: [
      { name: "Documentation", url: "https://milligram.io/" },
      { name: "GitHub", url: "https://github.com/milligram/milligram" },
      { name: "Exemples", url: "https://milligram.io/#examples" },
    ],
  },
}

