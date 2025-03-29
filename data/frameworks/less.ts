import type { Framework } from "./types"

export const lessFrameworks: Record<string, Framework> = {
  Less: {
    name: "Less",
    description:
      "Préprocesseur CSS qui étend le CSS avec des fonctionnalités dynamiques comme les variables, les mixins et les fonctions",
    usedFor:
      "Développement CSS avancé, maintenance de feuilles de style complexes, thèmes, frameworks CSS personnalisés",
    features: [
      "Variables pour réutilisation de valeurs",
      "Mixins pour réutilisation de blocs CSS",
      "Fonctions et opérations mathématiques",
      "Nesting pour meilleure organisation",
      "Importation et modularité",
      "Compatibilité avec CSS standard",
      "Compilation côté client ou serveur",
    ],
    officialWebsite: "https://lesscss.org/",
    uniqueSellingPoint:
      "Préprocesseur CSS qui ajoute des fonctionnalités de programmation au CSS tout en restant très proche de la syntaxe CSS standard",
    bestFor: "Projets nécessitant une organisation CSS avancée avec une courbe d'apprentissage minimale",
    version: "4.2.0",
    documentation: "https://lesscss.org/usage/",
    resources: [
      { name: "Documentation", url: "https://lesscss.org/usage/" },
      { name: "GitHub", url: "https://github.com/less/less.js" },
      { name: "Tutoriels", url: "https://lesscss.org/features/" },
    ],
  },
  "Ant Design": {
    name: "Ant Design",
    description: "Système de design d'entreprise pour applications web React utilisant Less pour ses styles",
    usedFor: "Applications d'entreprise, tableaux de bord, interfaces administratives, applications React",
    features: [
      "Plus de 50 composants UI",
      "Thèmes personnalisables via Less",
      "Design system complet",
      "Responsive design",
      "Internationalisation",
    ],
    officialWebsite: "https://ant.design/",
    uniqueSellingPoint: "Système de design d'entreprise complet avec personnalisation avancée via Less",
    bestFor: "Applications d'entreprise React nécessitant un design system cohérent et personnalisable",
    version: "5.11",
    documentation: "https://ant.design/docs/react/introduce",
    resources: [
      { name: "Documentation", url: "https://ant.design/docs/react/introduce" },
      { name: "GitHub", url: "https://github.com/ant-design/ant-design" },
      { name: "Personnalisation", url: "https://ant.design/docs/react/customize-theme" },
    ],
  },
  "Semantic UI": {
    name: "Semantic UI",
    description: "Framework UI qui utilise Less pour ses styles et une syntaxe basée sur le langage naturel",
    usedFor: "Interfaces utilisateur, applications web, sites d'entreprise",
    features: [
      "Syntaxe intuitive basée sur le langage naturel",
      "Personnalisation via variables Less",
      "Plus de 50 composants UI",
      "Thèmes personnalisables",
      "Responsive design",
    ],
    officialWebsite: "https://semantic-ui.com/",
    uniqueSellingPoint: "Framework UI avec syntaxe intuitive et personnalisation avancée via Less",
    bestFor: "Projets nécessitant une interface utilisateur intuitive et hautement personnalisable",
    version: "2.4.2",
    documentation: "https://semantic-ui.com/introduction/getting-started.html",
    resources: [
      { name: "Documentation", url: "https://semantic-ui.com/introduction/getting-started.html" },
      { name: "GitHub", url: "https://github.com/Semantic-Org/Semantic-UI" },
      { name: "Thèmes", url: "https://semantic-ui.com/usage/theming.html" },
    ],
  },
  UIkit: {
    name: "UIkit",
    description: "Framework frontend léger et modulaire qui utilise Less pour ses styles",
    usedFor: "Sites web modernes, applications web, interfaces utilisateur",
    features: [
      "Composants modulaires",
      "Personnalisation via Less",
      "Animations et transitions",
      "Système de grille flexible",
      "Approche mobile-first",
    ],
    officialWebsite: "https://getuikit.com/",
    uniqueSellingPoint: "Framework frontend léger avec personnalisation avancée via Less",
    bestFor: "Projets nécessitant une interface utilisateur moderne et personnalisable",
    version: "3.17.11",
    documentation: "https://getuikit.com/docs/introduction",
    resources: [
      { name: "Documentation", url: "https://getuikit.com/docs/introduction" },
      { name: "GitHub", url: "https://github.com/uikit/uikit" },
      { name: "Personnalisation", url: "https://getuikit.com/docs/less" },
    ],
  },
  "Bootstrap (anciennement)": {
    name: "Bootstrap (anciennement)",
    description: "Les versions 3 et antérieures de Bootstrap utilisaient Less comme préprocesseur CSS",
    usedFor: "Sites web responsives, applications web, interfaces utilisateur (versions antérieures à Bootstrap 4)",
    features: [
      "Système de grille responsive",
      "Composants UI préconçus",
      "Personnalisation via variables Less",
      "Mixins Less réutilisables",
      "Compatible avec tous les navigateurs",
    ],
    officialWebsite: "https://getbootstrap.com/docs/3.4/",
    uniqueSellingPoint: "Framework CSS populaire qui utilisait Less pour la personnalisation (avant de passer à Sass)",
    bestFor: "Projets utilisant d'anciennes versions de Bootstrap (v3 et antérieures)",
    version: "3.4.1",
    documentation: "https://getbootstrap.com/docs/3.4/",
    resources: [
      { name: "Documentation", url: "https://getbootstrap.com/docs/3.4/" },
      { name: "GitHub", url: "https://github.com/twbs/bootstrap/tree/v3.4.1" },
      { name: "Personnalisation", url: "https://getbootstrap.com/docs/3.4/customize/" },
    ],
  },
  PrestaShop: {
    name: "PrestaShop",
    description: "Plateforme e-commerce open source qui utilise Less pour les thèmes et l'interface d'administration",
    usedFor: "Boutiques en ligne, e-commerce, thèmes de boutique personnalisés",
    features: [
      "Thèmes personnalisables via Less",
      "Interface d'administration utilisant Less",
      "Modules front-office et back-office",
      "Responsive design",
      "Personnalisation avancée",
    ],
    officialWebsite: "https://www.prestashop.com/",
    uniqueSellingPoint:
      "Plateforme e-commerce qui utilise Less pour faciliter la personnalisation des thèmes et de l'interface",
    bestFor: "Développeurs de thèmes et modules PrestaShop nécessitant une personnalisation avancée",
    version: "8.1",
    documentation: "https://devdocs.prestashop-project.org/",
    resources: [
      { name: "Documentation", url: "https://devdocs.prestashop-project.org/" },
      { name: "GitHub", url: "https://github.com/PrestaShop/PrestaShop" },
      { name: "Guide des thèmes", url: "https://devdocs.prestashop-project.org/8/themes/" },
    ],
  },
}

