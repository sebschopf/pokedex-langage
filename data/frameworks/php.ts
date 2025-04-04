import type { Framework } from "./types"

export const phpFrameworks: Record<string, Framework> = {
  Laravel: {
    name: "Laravel",
    description: "Framework PHP élégant pour le développement web avec une syntaxe expressive",
    usedFor: "Applications web, APIs RESTful, applications d'entreprise, e-commerce",
    features: [
      "Système de routage expressif",
      "ORM Eloquent puissant",
      "Migration de base de données",
      "Système de templates Blade",
      "Écosystème complet (Forge, Vapor, Nova, etc.)",
    ],
    officialWebsite: "https://laravel.com/",
    uniqueSellingPoint: "Développement web PHP moderne avec élégance et productivité",
    bestFor: "Applications web PHP modernes nécessitant un développement rapide",
    version: "10.0",
    documentation: "https://laravel.com/docs",
    resources: [
      { name: "Documentation officielle", url: "https://laravel.com/docs" },
      { name: "Laracasts", url: "https://laracasts.com/" },
      { name: "GitHub", url: "https://github.com/laravel/laravel" },
    ],
  },
  Symfony: {
    name: "Symfony",
    description: "Framework PHP professionnel et ensemble de composants réutilisables",
    usedFor: "Applications web d'entreprise, APIs, microservices, applications complexes",
    features: [
      "Architecture modulaire avec composants",
      "Haute performance",
      "Flexibilité et extensibilité",
      "Outils de débogage puissants",
      "Communauté et écosystème matures",
    ],
    officialWebsite: "https://symfony.com/",
    uniqueSellingPoint: "Framework PHP robuste et flexible pour applications d'entreprise",
    bestFor: "Applications PHP complexes nécessitant fiabilité et maintenabilité",
    version: "6.3",
    documentation: "https://symfony.com/doc/current/index.html",
    resources: [
      { name: "Documentation officielle", url: "https://symfony.com/doc/current/index.html" },
      { name: "SymfonyCasts", url: "https://symfonycasts.com/" },
      { name: "GitHub", url: "https://github.com/symfony/symfony" },
    ],
  },
  WordPress: {
    name: "WordPress",
    description: "Système de gestion de contenu (CMS) le plus populaire au monde",
    usedFor: "Blogs, sites web, e-commerce, portfolios, sites d'entreprise",
    features: [
      "Interface d'administration intuitive",
      "Système de plugins extensible",
      "Thèmes personnalisables",
      "SEO-friendly",
      "Communauté massive",
    ],
    officialWebsite: "https://wordpress.org/",
    uniqueSellingPoint: "CMS flexible et accessible pour tous types de sites web",
    bestFor: "Sites web nécessitant une gestion de contenu simple et efficace",
    version: "6.4",
    documentation: "https://developer.wordpress.org/",
    resources: [
      { name: "Documentation officielle", url: "https://developer.wordpress.org/" },
      { name: "WordPress.tv", url: "https://wordpress.tv/" },
      { name: "GitHub", url: "https://github.com/WordPress/WordPress" },
    ],
  },
  CodeIgniter: {
    name: "CodeIgniter",
    description: "Framework PHP léger et rapide avec une empreinte minimale",
    usedFor: "Applications web, APIs, sites de petite à moyenne taille",
    features: [
      "Empreinte légère",
      "Performance élevée",
      "Configuration minimale",
      "Bibliothèque complète",
      "Documentation claire",
    ],
    officialWebsite: "https://codeigniter.com/",
    uniqueSellingPoint: "Framework PHP ultra-léger et performant avec courbe d'apprentissage douce",
    bestFor: "Applications PHP nécessitant performance et simplicité",
    version: "4.3",
    documentation: "https://codeigniter.com/user_guide/index.html",
    resources: [
      { name: "Documentation officielle", url: "https://codeigniter.com/user_guide/index.html" },
      { name: "Forum", url: "https://forum.codeigniter.com/" },
      { name: "GitHub", url: "https://github.com/codeigniter4/CodeIgniter4" },
    ],
  },
  CakePHP: {
    name: "CakePHP",
    description: "Framework PHP rapide et flexible suivant le pattern MVC",
    usedFor: "Applications web, APIs, applications d'entreprise",
    features: [
      "Convention over Configuration",
      "ORM intégré",
      "Génération de code",
      "Validation de données",
      "Sécurité intégrée",
    ],
    officialWebsite: "https://cakephp.org/",
    uniqueSellingPoint: "Framework PHP mature avec conventions claires et productivité élevée",
    bestFor: "Applications PHP nécessitant un développement rapide et structuré",
    version: "5.0",
    documentation: "https://book.cakephp.org/5/en/index.html",
    resources: [
      { name: "Documentation officielle", url: "https://book.cakephp.org/5/en/index.html" },
      { name: "API", url: "https://api.cakephp.org/" },
      { name: "GitHub", url: "https://github.com/cakephp/cakephp" },
    ],
  },
  Yii: {
    name: "Yii",
    description: "Framework PHP haute performance pour le développement web moderne",
    usedFor: "Applications web, APIs, applications d'entreprise, e-commerce",
    features: [
      "Architecture MVC",
      "Générateur de code Gii",
      "Sécurité avancée",
      "Caching intégré",
      "Intégration avec jQuery",
    ],
    officialWebsite: "https://www.yiiframework.com/",
    uniqueSellingPoint: "Framework PHP performant avec génération de code et sécurité avancée",
    bestFor: "Applications PHP nécessitant performance et sécurité",
    version: "2.0",
    documentation: "https://www.yiiframework.com/doc/guide/2.0/en",
    resources: [
      { name: "Documentation officielle", url: "https://www.yiiframework.com/doc/guide/2.0/en" },
      { name: "Forum", url: "https://forum.yiiframework.com/" },
      { name: "GitHub", url: "https://github.com/yiisoft/yii2" },
    ],
  },
  Laminas: {
    name: "Laminas",
    description: "Collection de packages PHP professionnels (anciennement Zend Framework)",
    usedFor: "Applications web d'entreprise, APIs, microservices",
    features: [
      "Architecture modulaire",
      "Composants indépendants",
      "Haute qualité de code",
      "Testabilité",
      "Intégration avec PSR",
    ],
    officialWebsite: "https://getlaminas.org/",
    uniqueSellingPoint: "Packages PHP modulaires et professionnels pour applications d'entreprise",
    bestFor: "Applications PHP d'entreprise nécessitant qualité et modularité",
    version: "3.0",
    documentation: "https://docs.laminas.dev/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.laminas.dev/" },
      { name: "GitHub", url: "https://github.com/laminas" },
      { name: "Blog", url: "https://getlaminas.org/blog/" },
    ],
  },
  Slim: {
    name: "Slim",
    description: "Micro-framework PHP pour créer des applications web et des APIs",
    usedFor: "APIs RESTful, microservices, applications web légères, prototypes",
    features: ["Routage puissant", "Middleware", "Injection de dépendances", "PSR-7 compatible", "Empreinte minimale"],
    officialWebsite: "https://www.slimframework.com/",
    uniqueSellingPoint: "Framework minimaliste mais complet pour APIs et applications légères",
    bestFor: "APIs RESTful et applications nécessitant légèreté et flexibilité",
    version: "4.12",
    documentation: "https://www.slimframework.com/docs/v4/",
    resources: [
      { name: "Documentation", url: "https://www.slimframework.com/docs/v4/" },
      { name: "GitHub", url: "https://github.com/slimphp/Slim" },
      { name: "Tutoriels", url: "https://www.slimframework.com/docs/v4/tutorial/first-app.html" },
    ],
  },
  Drupal: {
    name: "Drupal",
    description: "CMS et framework pour créer des sites web et applications complexes",
    usedFor: "Sites web d'entreprise, portails, applications web, e-commerce, intranets",
    features: [
      "Système de modules extensible",
      "Taxonomie avancée",
      "Types de contenu personnalisables",
      "Gestion des utilisateurs et permissions",
      "API RESTful intégrée",
    ],
    officialWebsite: "https://www.drupal.org/",
    uniqueSellingPoint: "CMS enterprise-grade avec capacités de framework pour sites complexes",
    bestFor: "Sites web d'entreprise nécessitant flexibilité et fonctionnalités avancées",
    version: "10.1",
    documentation: "https://www.drupal.org/documentation",
    resources: [
      { name: "Documentation", url: "https://www.drupal.org/documentation" },
      { name: "GitHub", url: "https://github.com/drupal/drupal" },
      { name: "Drupal API", url: "https://api.drupal.org/" },
    ],
  },
}

