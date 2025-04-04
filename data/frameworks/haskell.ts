import type { Framework } from "./types"

export const haskellFrameworks: Record<string, Framework> = {
  Yesod: {
    name: "Yesod",
    description: "Framework web type-safe pour Haskell",
    usedFor: "Applications web, APIs RESTful, sites web type-safe",
    features: [
      "Sécurité de type à la compilation",
      "Génération de routes type-safe",
      "Protection contre les vulnérabilités web courantes",
      "Performances élevées",
      "Modèles HTML type-safe",
    ],
    officialWebsite: "https://www.yesodweb.com/",
    uniqueSellingPoint: "Framework web avec sécurité de type extrême pour éliminer les bugs à la compilation",
    bestFor: "Applications web nécessitant sécurité et fiabilité maximales",
    version: "1.6",
    documentation: "https://www.yesodweb.com/book",
    resources: [
      { name: "Documentation officielle", url: "https://www.yesodweb.com/book" },
      { name: "GitHub", url: "https://github.com/yesodweb/yesod" },
      { name: "Tutoriels", url: "https://www.yesodweb.com/page/quickstart" },
    ],
  },
  Servant: {
    name: "Servant",
    description: "Bibliothèque pour définir des APIs type-safe au niveau du type",
    usedFor: "APIs RESTful, services web, documentation d'API",
    features: [
      "Définition d'API au niveau du type",
      "Génération de client",
      "Documentation automatique",
      "Sécurité de type extrême",
      "Extensible via type families",
    ],
    officialWebsite: "https://www.servant.dev/",
    uniqueSellingPoint: "Définition d'APIs comme des types pour garantie de correction totale",
    bestFor: "APIs nécessitant documentation et cohérence parfaites",
    version: "0.20",
    documentation: "https://docs.servant.dev/en/stable/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.servant.dev/en/stable/" },
      { name: "GitHub", url: "https://github.com/haskell-servant/servant" },
      { name: "Tutoriels", url: "https://docs.servant.dev/en/stable/tutorial/index.html" },
    ],
  },
  Scotty: {
    name: "Scotty",
    description: "Micro-framework web minimaliste inspiré par Ruby's Sinatra",
    usedFor: "Applications web légères, APIs simples, prototypes",
    features: [
      "API simple et intuitive",
      "Routage basé sur les patterns",
      "Middleware",
      "Gestion des exceptions",
      "Intégration avec WAI",
    ],
    officialWebsite: "https://hackage.haskell.org/package/scotty",
    uniqueSellingPoint: "Framework web Haskell minimaliste pour développement rapide",
    bestFor: "Applications web simples et prototypes rapides",
    version: "0.12",
    documentation: "https://hackage.haskell.org/package/scotty",
    resources: [
      { name: "Documentation officielle", url: "https://hackage.haskell.org/package/scotty" },
      { name: "GitHub", url: "https://github.com/scotty-web/scotty" },
      { name: "Tutoriels", url: "https://github.com/scotty-web/scotty/wiki" },
    ],
  },
  Hakyll: {
    name: "Hakyll",
    description: "Générateur de sites statiques en Haskell",
    usedFor: "Blogs, sites web statiques, documentation, portfolios",
    features: [
      "Basé sur des règles",
      "Intégration avec Pandoc",
      "Support pour Markdown, LaTeX, etc.",
      "Système de templates",
      "Génération incrémentale",
    ],
    officialWebsite: "https://jaspervdj.be/hakyll/",
    uniqueSellingPoint: "Générateur de sites statiques programmable et flexible",
    bestFor: "Sites web statiques nécessitant personnalisation avancée",
    version: "4.15",
    documentation: "https://jaspervdj.be/hakyll/tutorials.html",
    resources: [
      { name: "Documentation officielle", url: "https://jaspervdj.be/hakyll/tutorials.html" },
      { name: "GitHub", url: "https://github.com/jaspervdj/hakyll" },
      { name: "Exemples", url: "https://jaspervdj.be/hakyll/examples.html" },
    ],
  },
}

