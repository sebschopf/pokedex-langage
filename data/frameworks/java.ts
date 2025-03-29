import type { Framework } from "./types"

export const javaFrameworks: Record<string, Framework> = {
  Spring: {
    name: "Spring",
    description:
      "Framework Java complet pour le développement d'applications d'entreprise avec une approche modulaire et flexible",
    usedFor:
      "Applications d'entreprise, microservices, applications web, applications cloud, applications réactives, batch processing, intégration de systèmes",
    features: [
      "Inversion de contrôle (IoC) et injection de dépendances",
      "Spring Boot pour la configuration automatique et le démarrage rapide",
      "Spring MVC pour les applications web",
      "Spring WebFlux pour la programmation réactive",
      "Spring Data pour l'accès aux données (SQL, NoSQL, etc.)",
      "Spring Security pour l'authentification et l'autorisation",
      "Spring Cloud pour les architectures microservices",
      "Spring Batch pour le traitement par lots",
      "Spring Integration pour l'intégration d'entreprise",
      "Support pour les tests unitaires et d'intégration",
    ],
    officialWebsite: "https://spring.io/",
    uniqueSellingPoint:
      "Écosystème complet et modulaire qui simplifie le développement d'applications Java d'entreprise avec une approche moderne et des outils de productivité comme Spring Boot",
    bestFor:
      "Équipes développant des applications d'entreprise complexes nécessitant modularité, testabilité et évolutivité, particulièrement adaptées aux architectures microservices et cloud-native",
    version: "6.1.3 (Spring Framework) / 3.2.2 (Spring Boot)",
    documentation: "https://docs.spring.io/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.spring.io/" },
      { name: "Spring Guides", url: "https://spring.io/guides" },
      { name: "Spring Boot Reference", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
      { name: "GitHub", url: "https://github.com/spring-projects" },
      { name: "Spring Blog", url: "https://spring.io/blog" },
      { name: "Spring Academy", url: "https://spring.academy/" },
      { name: "Baeldung Spring Tutorials", url: "https://www.baeldung.com/spring-tutorial" },
    ],
  },
  Hibernate: {
    name: "Hibernate",
    description:
      "Framework ORM (Object-Relational Mapping) leader pour Java qui simplifie l'accès aux bases de données relationnelles en mappant les objets Java aux tables de base de données",
    usedFor:
      "Persistance de données, mapping objet-relationnel, accès aux bases de données, applications avec modèles de données complexes, applications d'entreprise",
    features: [
      "Mapping objet-relationnel transparent",
      "HQL (Hibernate Query Language) pour des requêtes orientées objet",
      "Gestion des transactions et du cache",
      "Lazy loading et chargement par lots pour l'optimisation des performances",
      "Associations et héritage entre entités",
      "Validation de données via Bean Validation",
      "Génération automatique de schéma",
      "Support pour les procédures stockées et les requêtes natives SQL",
      "Événements et intercepteurs pour la logique métier",
      "Intégration avec JPA (Java Persistence API)",
    ],
    officialWebsite: "https://hibernate.org/",
    uniqueSellingPoint:
      "Solution ORM mature et complète qui élimine le code JDBC répétitif et permet aux développeurs de se concentrer sur la logique métier plutôt que sur la persistance des données",
    bestFor:
      "Applications Java nécessitant un accès aux bases de données relationnelles avec des modèles de données complexes et une abstraction de la couche de persistance",
    version: "6.4.1.Final",
    documentation: "https://hibernate.org/orm/documentation/",
    resources: [
      { name: "Documentation officielle", url: "https://hibernate.org/orm/documentation/" },
      {
        name: "Guide utilisateur",
        url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html",
      },
      { name: "GitHub", url: "https://github.com/hibernate/hibernate-orm" },
      { name: "Tutoriels Hibernate", url: "https://www.baeldung.com/hibernate-tutorials" },
      { name: "Javadoc", url: "https://docs.jboss.org/hibernate/orm/current/javadocs/" },
      { name: "Forum Hibernate", url: "https://discourse.hibernate.org/" },
      {
        name: "Livre: Java Persistence with Hibernate",
        url: "https://www.manning.com/books/java-persistence-with-hibernate-second-edition",
      },
    ],
  },
  "Jakarta EE": {
    name: "Jakarta EE",
    description:
      "Plateforme d'entreprise standardisée pour Java (anciennement Java EE) qui fournit des spécifications pour le développement d'applications d'entreprise multi-niveaux",
    usedFor:
      "Applications d'entreprise, applications web, services web, microservices, applications cloud, traitement de transactions, messagerie d'entreprise",
    features: [
      "Servlets et JSP pour les applications web",
      "Jakarta Persistence (JPA) pour l'accès aux données",
      "Enterprise JavaBeans (EJB) pour les composants d'entreprise",
      "Jakarta RESTful Web Services (JAX-RS) pour les APIs REST",
      "Jakarta Enterprise Beans (EJB) pour la logique métier",
      "Jakarta Contexts and Dependency Injection (CDI) pour l'injection de dépendances",
      "Jakarta Bean Validation pour la validation des données",
      "Jakarta Security pour l'authentification et l'autorisation",
      "Jakarta Messaging (JMS) pour la messagerie asynchrone",
      "Jakarta Transactions (JTA) pour les transactions distribuées",
    ],
    officialWebsite: "https://jakarta.ee/",
    uniqueSellingPoint:
      "Plateforme standardisée et portable qui garantit la compatibilité entre différents serveurs d'applications et fournit un ensemble complet de spécifications pour le développement d'applications d'entreprise",
    bestFor:
      "Organisations nécessitant des applications d'entreprise standardisées, portables et évolutives avec un fort accent sur la stabilité et la compatibilité à long terme",
    version: "10",
    documentation: "https://jakarta.ee/specifications/",
    resources: [
      { name: "Spécifications officielles", url: "https://jakarta.ee/specifications/" },
      { name: "Tutoriels", url: "https://jakarta.ee/resources/#tutorials" },
      { name: "GitHub", url: "https://github.com/eclipse-ee4j" },
      { name: "Compatible Products", url: "https://jakarta.ee/compatibility/" },
      { name: "Jakarta EE Starter", url: "https://start.jakarta.ee/" },
      { name: "Jakarta EE Community", url: "https://jakarta.ee/community/" },
      { name: "Jakarta EE Newsletter", url: "https://jakarta.ee/newsletter/" },
    ],
  },
  "Android SDK": {
    name: "Android SDK",
    description:
      "Kit de développement logiciel complet fourni par Google pour créer, tester et déployer des applications Android sur smartphones, tablettes, montres connectées, TV et autres appareils",
    usedFor:
      "Applications mobiles Android, applications pour Android TV, Wear OS, Android Auto, applications IoT avec Android Things, jeux mobiles",
    features: [
      "Android Studio IDE intégré avec éditeur de code intelligent",
      "Émulateurs pour tester sur différents appareils et versions d'Android",
      "Jetpack - bibliothèques, outils et conseils pour accélérer le développement",
      "Architecture Components pour des applications robustes (ViewModel, LiveData, Room)",
      "Kotlin first - support complet pour le développement en Kotlin",
      "Outils de débogage et de profilage avancés",
      "Bibliothèques d'interface utilisateur Material Design",
      "Outils de test automatisés (Espresso, UI Automator)",
      "Intégration avec Google Play Services et Firebase",
      "Outils de publication sur Google Play Store",
    ],
    officialWebsite: "https://developer.android.com/",
    uniqueSellingPoint:
      "Environnement de développement complet et officiel pour créer des applications Android avec des outils modernes, une documentation exhaustive et un support pour les dernières technologies comme Jetpack Compose",
    bestFor:
      "Développeurs souhaitant créer des applications natives pour l'écosystème Android avec accès à toutes les fonctionnalités de la plateforme et une distribution via Google Play Store",
    version: "34 (Android 14)",
    documentation: "https://developer.android.com/docs",
    resources: [
      { name: "Documentation officielle", url: "https://developer.android.com/docs" },
      { name: "Android Developers Blog", url: "https://android-developers.googleblog.com/" },
      { name: "Codelabs", url: "https://developer.android.com/codelabs" },
      { name: "Samples", url: "https://github.com/android/samples" },
      { name: "Android Jetpack", url: "https://developer.android.com/jetpack" },
      { name: "Kotlin pour Android", url: "https://developer.android.com/kotlin" },
      { name: "Cours Android (Google)", url: "https://developer.android.com/courses" },
    ],
  },
  Quarkus: {
    name: "Quarkus",
    description: "Framework Java conçu pour les environnements cloud-native et serverless",
    usedFor: "Microservices, applications cloud-native, applications Kubernetes, serverless, edge computing",
    features: [
      "Démarrage ultra-rapide",
      "Empreinte mémoire réduite",
      "Live coding",
      "Compilation native avec GraalVM",
      "Extensions pour l'écosystème Java",
    ],
    officialWebsite: "https://quarkus.io/",
    uniqueSellingPoint:
      "Java supersonic subatomic - optimisé pour les environnements cloud avec démarrage instantané et faible consommation de ressources",
    bestFor: "Applications cloud-native nécessitant performances et efficacité des ressources",
    version: "3.6",
    documentation: "https://quarkus.io/guides/",
    resources: [
      { name: "Documentation", url: "https://quarkus.io/guides/" },
      { name: "GitHub", url: "https://github.com/quarkusio/quarkus" },
      { name: "Tutoriels", url: "https://quarkus.io/get-started/" },
    ],
  },
  Micronaut: {
    name: "Micronaut",
    description: "Framework JVM moderne pour microservices et applications serverless",
    usedFor: "Microservices, applications cloud, serverless, applications réactives",
    features: [
      "Injection de dépendances à la compilation",
      "Démarrage rapide",
      "Faible consommation mémoire",
      "Support natif pour GraalVM",
      "Programmation réactive",
    ],
    officialWebsite: "https://micronaut.io/",
    uniqueSellingPoint:
      "Framework polyglotte avec injection de dépendances à la compilation pour performances optimales",
    bestFor: "Applications cloud modernes nécessitant performances et polyvalence",
    version: "4.2",
    documentation: "https://docs.micronaut.io/latest/guide/index.html",
    resources: [
      { name: "Documentation", url: "https://docs.micronaut.io/latest/guide/index.html" },
      { name: "GitHub", url: "https://github.com/micronaut-projects/micronaut-core" },
      { name: "Guides", url: "https://guides.micronaut.io/" },
    ],
  },
  Vaadin: {
    name: "Vaadin",
    description: "Framework pour construire des applications web progressives en Java",
    usedFor: "Applications web d'entreprise, interfaces utilisateur riches, applications métier",
    features: [
      "Composants UI Java",
      "Architecture serveur-side",
      "Intégration avec l'écosystème Java",
      "Thèmes personnalisables",
      "PWA support",
    ],
    officialWebsite: "https://vaadin.com/",
    uniqueSellingPoint: "Développement d'interfaces web riches entièrement en Java sans JavaScript",
    bestFor: "Applications d'entreprise nécessitant interfaces riches et développement full-Java",
    version: "24.3",
    documentation: "https://vaadin.com/docs",
    resources: [
      { name: "Documentation", url: "https://vaadin.com/docs" },
      { name: "GitHub", url: "https://github.com/vaadin/flow" },
      { name: "Tutoriels", url: "https://vaadin.com/tutorials" },
    ],
  },
}

