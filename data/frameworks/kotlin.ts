import type { Framework } from "./types"

export const kotlinFrameworks: Record<string, Framework> = {
  "Android SDK": {
    name: "Android SDK",
    description: "Kit de développement officiel pour créer des applications Android natives en Kotlin",
    usedFor: "Applications mobiles Android, applications Android TV, Wear OS",
    features: [
      "Support complet pour Kotlin",
      "Composants d'architecture Android",
      "Jetpack Compose pour UI déclarative",
      "Coroutines pour asynchrone",
      "Intégration avec Google Play Services",
    ],
    officialWebsite: "https://developer.android.com/kotlin",
    uniqueSellingPoint: "Développement Android natif avec Kotlin comme langage recommandé",
    bestFor: "Applications Android natives performantes et modernes",
    version: "34 (Android 14)",
    documentation: "https://developer.android.com/kotlin/first",
    resources: [
      { name: "Documentation officielle", url: "https://developer.android.com/kotlin/first" },
      { name: "Codelabs", url: "https://developer.android.com/courses" },
      { name: "GitHub", url: "https://github.com/android/kotlin" },
    ],
  },
  Ktor: {
    name: "Ktor",
    description: "Framework asynchrone pour créer des applications connectées en Kotlin",
    usedFor: "Applications web, microservices, APIs RESTful, applications client-serveur",
    features: [
      "Serveur et client HTTP",
      "WebSockets",
      "Coroutines pour asynchrone",
      "Extensions modulaires",
      "Multiplateforme",
    ],
    officialWebsite: "https://ktor.io/",
    uniqueSellingPoint: "Framework web asynchrone léger et moderne pour Kotlin",
    bestFor: "Applications web et microservices Kotlin nécessitant asynchronicité",
    version: "2.3",
    documentation: "https://ktor.io/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://ktor.io/docs/" },
      { name: "GitHub", url: "https://github.com/ktorio/ktor" },
      { name: "Tutoriels", url: "https://ktor.io/learn/" },
    ],
  },
  Spring: {
    name: "Spring",
    description: "Framework d'entreprise pour Java et Kotlin avec support Kotlin natif",
    usedFor: "Applications d'entreprise, microservices, applications web, applications cloud",
    features: [
      "Support Kotlin natif",
      "Spring Boot pour configuration automatique",
      "Coroutines pour programmation réactive",
      "DSL Kotlin pour configuration",
      "Extensions Kotlin",
    ],
    officialWebsite: "https://spring.io/guides/tutorials/spring-boot-kotlin/",
    uniqueSellingPoint: "Puissance de Spring avec la concision et sécurité de Kotlin",
    bestFor: "Applications d'entreprise Kotlin nécessitant robustesse et écosystème mature",
    version: "6.0",
    documentation: "https://docs.spring.io/spring-framework/reference/languages/kotlin.html",
    resources: [
      {
        name: "Documentation officielle",
        url: "https://docs.spring.io/spring-framework/reference/languages/kotlin.html",
      },
      { name: "GitHub", url: "https://github.com/spring-projects/spring-framework" },
      { name: "Tutoriels", url: "https://spring.io/guides?q=kotlin" },
    ],
  },
  "Compose Multiplatform": {
    name: "Compose Multiplatform",
    description:
      "Framework UI déclaratif pour Kotlin permettant de partager des interfaces utilisateur entre plateformes",
    usedFor: "Applications multiplateformes, interfaces utilisateur partagées, applications desktop et mobiles",
    features: [
      "UI déclarative",
      "Code partagé entre plateformes",
      "Prévisualisation en temps réel",
      "Animations fluides",
      "Thèmes personnalisables",
    ],
    officialWebsite: "https://www.jetbrains.com/lp/compose-multiplatform/",
    uniqueSellingPoint: "Création d'interfaces utilisateur multiplateformes avec une seule base de code Kotlin",
    bestFor: "Applications nécessitant des interfaces utilisateur cohérentes sur plusieurs plateformes",
    version: "1.5",
    documentation: "https://www.jetbrains.com/help/kotlin-multiplatform-dev/compose-multiplatform-getting-started.html",
    resources: [
      {
        name: "Documentation officielle",
        url: "https://www.jetbrains.com/help/kotlin-multiplatform-dev/compose-multiplatform-getting-started.html",
      },
      { name: "GitHub", url: "https://github.com/JetBrains/compose-multiplatform" },
      { name: "Exemples", url: "https://github.com/JetBrains/compose-multiplatform/tree/master/examples" },
    ],
  },
  "KotlinX Coroutines": {
    name: "KotlinX Coroutines",
    description: "Bibliothèque pour la programmation asynchrone et concurrente en Kotlin",
    usedFor: "Programmation asynchrone, concurrence, opérations de longue durée, applications réactives",
    features: [
      "Coroutines légères",
      "Flow pour flux de données asynchrones",
      "Channels pour communication entre coroutines",
      "Contextes et dispatchers",
      "Gestion des exceptions",
    ],
    officialWebsite: "https://kotlinlang.org/docs/coroutines-overview.html",
    uniqueSellingPoint: "Programmation asynchrone simplifiée avec code séquentiel et performances élevées",
    bestFor: "Applications Kotlin nécessitant asynchronicité et concurrence",
    version: "1.7",
    documentation: "https://kotlinlang.org/docs/coroutines-guide.html",
    resources: [
      { name: "Documentation officielle", url: "https://kotlinlang.org/docs/coroutines-guide.html" },
      { name: "GitHub", url: "https://github.com/Kotlin/kotlinx.coroutines" },
      { name: "Tutoriels", url: "https://kotlinlang.org/docs/coroutines-basics.html" },
    ],
  },
  Exposed: {
    name: "Exposed",
    description: "Framework ORM SQL léger pour Kotlin",
    usedFor: "Accès aux bases de données, mapping objet-relationnel, requêtes SQL",
    features: [
      "DSL SQL type-safe",
      "API DAO pour mapping objet-relationnel",
      "Transactions",
      "Support pour plusieurs bases de données",
      "Extensions Kotlin",
    ],
    officialWebsite: "https://github.com/JetBrains/Exposed",
    uniqueSellingPoint: "ORM Kotlin idiomatique avec DSL SQL type-safe",
    bestFor: "Applications Kotlin nécessitant accès aux bases de données relationnelles",
    version: "0.44.0",
    documentation: "https://github.com/JetBrains/Exposed/wiki",
    resources: [
      { name: "Documentation officielle", url: "https://github.com/JetBrains/Exposed/wiki" },
      { name: "GitHub", url: "https://github.com/JetBrains/Exposed" },
      { name: "Exemples", url: "https://github.com/JetBrains/Exposed/tree/master/samples" },
    ],
  },
}

