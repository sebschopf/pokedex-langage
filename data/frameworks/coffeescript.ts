import type { Framework } from "./types"

export const coffeescriptFrameworks: Record<string, Framework> = {
  "Backbone.js": {
    name: "Backbone.js",
    description:
      "Framework JavaScript léger qui apporte une structure MVC aux applications web, particulièrement populaire avec CoffeeScript",
    usedFor:
      "Applications web single-page, interfaces utilisateur structurées, applications frontend avec des modèles de données complexes",
    features: [
      "Modèles avec liaison de données et événements personnalisés",
      "Collections pour gérer des groupes de modèles",
      "Vues avec gestion déclarative des événements",
      "Routeur pour les applications à page unique",
      "Synchronisation avec le serveur via RESTful JSON",
      "Dépendance minimale (uniquement Underscore.js)",
      "Architecture légère et non-intrusive",
    ],
    officialWebsite: "https://backbonejs.org/",
    uniqueSellingPoint:
      "Structure MVC légère et flexible qui s'intègre parfaitement avec la syntaxe élégante de CoffeeScript",
    bestFor:
      "Applications web nécessitant une structure organisée mais flexible, particulièrement celles écrites en CoffeeScript",
    version: "1.4.1",
    documentation: "https://backbonejs.org/#documentation",
    resources: [
      { name: "Documentation officielle", url: "https://backbonejs.org/#documentation" },
      { name: "GitHub", url: "https://github.com/jashkenas/backbone" },
      {
        name: "Tutoriel Backbone avec CoffeeScript",
        url: "https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites",
      },
      { name: "Backbone Fundamentals (livre)", url: "https://addyosmani.com/backbone-fundamentals/" },
      { name: "Stack Overflow", url: "https://stackoverflow.com/questions/tagged/backbone.js" },
    ],
  },
  "Chaplin.js": {
    name: "Chaplin.js",
    description:
      "Framework d'architecture construit sur Backbone.js, spécialement conçu pour les applications CoffeeScript",
    usedFor: "Applications web single-page complexes, applications d'entreprise, interfaces utilisateur riches",
    features: [
      "Architecture modulaire basée sur Backbone.js",
      "Gestion du cycle de vie des contrôleurs",
      "Système de routage amélioré",
      "Gestion de la mémoire et prévention des fuites",
      "Médiateur pour la communication entre composants",
      "Support pour les régions et les layouts",
      "Optimisé pour CoffeeScript",
    ],
    officialWebsite: "http://chaplinjs.org/",
    uniqueSellingPoint:
      "Extension de Backbone.js avec une architecture plus robuste et des patterns de conception avancés, parfaitement adaptée à la syntaxe CoffeeScript",
    bestFor: "Applications CoffeeScript complexes nécessitant une architecture plus structurée que Backbone.js seul",
    version: "1.2.0",
    documentation: "http://chaplinjs.org/docs/chaplin.html",
    resources: [
      { name: "Documentation officielle", url: "http://chaplinjs.org/docs/chaplin.html" },
      { name: "GitHub", url: "https://github.com/chaplinjs/chaplin" },
      { name: "Guide de démarrage", url: "http://chaplinjs.org/getting-started.html" },
      { name: "Tutoriels", url: "https://github.com/chaplinjs/chaplin/wiki/Tutorials" },
      { name: "Exemples d'applications", url: "https://github.com/chaplinjs/chaplin-boilerplate" },
    ],
  },
  Spine: {
    name: "Spine",
    description: "Framework MVC léger pour construire des applications JavaScript, optimisé pour CoffeeScript",
    usedFor: "Applications web single-page, interfaces utilisateur réactives, applications mobiles HTML5",
    features: [
      "Modèles avec événements et validation",
      "Contrôleurs avec gestion des événements",
      "Routage client",
      "Liaison de données bidirectionnelle",
      "Support pour le stockage local et REST",
      "Architecture orientée événements",
      "Syntaxe concise idéale pour CoffeeScript",
    ],
    officialWebsite: "http://spinejs.com/",
    uniqueSellingPoint:
      "Framework MVC ultra-léger avec une API élégante qui exploite parfaitement la syntaxe concise de CoffeeScript",
    bestFor: "Applications web légères nécessitant des performances optimales et une syntaxe élégante",
    version: "1.6.1",
    documentation: "http://spinejs.com/docs/",
    resources: [
      { name: "Documentation officielle", url: "http://spinejs.com/docs/" },
      { name: "GitHub", url: "https://github.com/spine/spine" },
      { name: "Tutoriels", url: "http://spinejs.com/docs/example" },
      { name: "API Reference", url: "http://spinejs.com/docs/api" },
      { name: "Exemples", url: "https://github.com/spine/spine/tree/master/example" },
    ],
  },
  "CoffeeScript + jQuery": {
    name: "CoffeeScript + jQuery",
    description:
      "Combinaison de CoffeeScript avec la bibliothèque jQuery pour une manipulation DOM élégante et concise",
    usedFor:
      "Manipulation DOM, animations web, applications interactives, prototypage rapide, amélioration progressive",
    features: [
      "Syntaxe CoffeeScript concise pour le code jQuery",
      "Sélecteurs CSS pour la manipulation DOM",
      "Gestion simplifiée des événements",
      "Animations et effets visuels",
      "Requêtes AJAX simplifiées",
      "Compatibilité cross-browser",
      "Chaînage des méthodes pour un code plus lisible",
    ],
    officialWebsite: "https://coffeescript.org/",
    uniqueSellingPoint:
      "Combinaison de la syntaxe élégante de CoffeeScript avec la puissance et la facilité d'utilisation de jQuery pour un code plus lisible et maintenable",
    bestFor:
      "Développeurs cherchant à améliorer la lisibilité et la concision de leur code jQuery ou projets nécessitant une manipulation DOM élégante",
    version: "jQuery 3.6.4 / CoffeeScript 2.7.0",
    documentation: "https://coffeescript.org/#jquery",
    resources: [
      { name: "Documentation CoffeeScript", url: "https://coffeescript.org/" },
      { name: "Documentation jQuery", url: "https://api.jquery.com/" },
      { name: "CoffeeScript Cookbook", url: "https://coffeescript-cookbook.github.io/" },
      {
        name: "Tutoriel CoffeeScript + jQuery",
        url: "https://code.tutsplus.com/tutorials/rocking-out-with-coffeescript--net-17027",
      },
      { name: "Exemples de code", url: "https://gist.github.com/search?q=coffeescript+jquery" },
    ],
  },
}

