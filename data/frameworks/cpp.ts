import type { Framework } from "./types"

export const cppFrameworks: Record<string, Framework> = {
  Qt: {
    name: "Qt",
    description:
      "Framework C++ complet pour le développement d'applications multiplateformes avec interfaces graphiques",
    usedFor:
      "Applications de bureau multiplateformes, interfaces utilisateur, applications embarquées, applications mobiles, systèmes automobiles",
    features: [
      "Widgets natifs",
      "QML pour interfaces modernes",
      "Signaux et slots",
      "Support multiplateforme",
      "Outils de développement intégrés",
    ],
    officialWebsite: "https://www.qt.io/",
    uniqueSellingPoint:
      "Écosystème complet pour développer des applications multiplateformes avec une expérience utilisateur native",
    bestFor: "Applications d'entreprise multiplateformes nécessitant des interfaces utilisateur riches et natives",
    version: "6.6",
    documentation: "https://doc.qt.io/qt-6/",
    resources: [
      { name: "Documentation", url: "https://doc.qt.io/qt-6/" },
      { name: "Getting Started", url: "https://doc.qt.io/qt-6/gettingstarted.html" },
      { name: "Tutoriels", url: "https://doc.qt.io/qt-6/tutorials.html" },
      { name: "Forum Qt", url: "https://forum.qt.io/" },
      { name: "Qt Wiki", url: "https://wiki.qt.io/" },
      { name: "Qt Blog", url: "https://www.qt.io/blog" },
    ],
  },
  Boost: {
    name: "Boost",
    description: "Collection de bibliothèques C++ haute qualité couvrant un large éventail de fonctionnalités",
    usedFor:
      "Développement C++ avancé, programmation générique, métaprogrammation, concurrence, traitement d'images, mathématiques",
    features: [
      "Plus de 160 bibliothèques",
      "Programmation générique",
      "Gestion de la mémoire",
      "Multithreading",
      "Algorithmes avancés",
    ],
    officialWebsite: "https://www.boost.org/",
    uniqueSellingPoint:
      "Bibliothèques C++ de haute qualité qui étendent les fonctionnalités standard et simplifient le développement complexe",
    bestFor:
      "Développeurs C++ cherchant à améliorer la productivité et la qualité du code avec des composants réutilisables",
    version: "1.84.0",
    documentation: "https://www.boost.org/doc/",
    resources: [
      { name: "Documentation", url: "https://www.boost.org/doc/" },
      { name: "Getting Started", url: "https://www.boost.org/doc/libs/1_84_0/more/getting_started/index.html" },
      { name: "Tutoriels", url: "https://www.boost.org/doc/libs/1_84_0/libs/libraries.htm" },
      { name: "Mailing Lists", url: "https://www.boost.org/community/groups.html" },
      { name: "GitHub", url: "https://github.com/boostorg/boost" },
      { name: "Stack Overflow", url: "https://stackoverflow.com/questions/tagged/boost" },
    ],
  },
  "Unreal Engine": {
    name: "Unreal Engine",
    description:
      "Moteur de jeu 3D complet et open source pour créer des jeux et expériences interactives de haute qualité",
    usedFor:
      "Jeux AAA, visualisation architecturale, simulations, réalité virtuelle, cinéma virtuel, expériences interactives",
    features: [
      "Blueprints (programmation visuelle)",
      "Rendu photoréaliste",
      "Physique avancée",
      "Marketplace",
      "Outils d'animation",
    ],
    officialWebsite: "https://www.unrealengine.com/",
    uniqueSellingPoint:
      "Combinaison puissante de programmation visuelle (Blueprints) et de performances C++ pour des jeux de qualité professionnelle",
    bestFor: "Jeux 3D de haute qualité, visualisations architecturales et expériences immersives",
    version: "5.3",
    documentation: "https://docs.unrealengine.com/",
    resources: [
      { name: "Documentation", url: "https://docs.unrealengine.com/" },
      { name: "Learning Portal", url: "https://dev.epicgames.com/community/learning" },
      { name: "Tutoriels vidéo", url: "https://www.unrealengine.com/en-US/onlinelearning-courses" },
      { name: "Forums", url: "https://forums.unrealengine.com/" },
      { name: "Marketplace", url: "https://www.unrealengine.com/marketplace/en-US/store" },
      { name: "GitHub", url: "https://github.com/EpicGames/UnrealEngine" },
    ],
  },
  POCO: {
    name: "POCO",
    description: "Bibliothèques C++ pour construire des applications réseau et Internet",
    usedFor: "Applications réseau, services web, microservices, applications IoT, applications distribuées",
    features: ["Abstraction réseau", "Accès aux bases de données", "Cryptographie", "XML et JSON", "Multithreading"],
    officialWebsite: "https://pocoproject.org/",
    uniqueSellingPoint:
      "Bibliothèques C++ modernes et élégantes pour le développement d'applications réseau et distribuées",
    bestFor: "Applications C++ orientées réseau nécessitant performance et maintenabilité",
    version: "1.12.4",
    documentation: "https://docs.pocoproject.org/",
    resources: [
      { name: "Documentation", url: "https://docs.pocoproject.org/" },
      { name: "Getting Started", url: "https://pocoproject.org/docs/00200-GettingStarted.html" },
      { name: "Tutoriels", url: "https://pocoproject.org/docs/" },
      { name: "GitHub", url: "https://github.com/pocoproject/poco" },
      { name: "Forum", url: "https://pocoproject.org/forum/" },
      { name: "Exemples", url: "https://github.com/pocoproject/poco/tree/master/Examples" },
    ],
  },
  GTK: {
    name: "GTK",
    description: "Framework d'interface graphique multiplateforme pour le développement d'applications de bureau",
    usedFor: "Développement d'applications de bureau multiplateformes, interfaces graphiques natives",
    features: [
      "Multiplateforme (Linux, Windows, macOS)",
      "Riche bibliothèque de widgets",
      "Intégration avec GNOME",
      "Accessibilité",
      "Internationalisation",
      "Système de thèmes",
    ],
    officialWebsite: "https://www.gtk.org/",
    uniqueSellingPoint: "Interface graphique native multiplateforme avec une riche bibliothèque de composants",
    bestFor: "Applications de bureau multiplateformes nécessitant une interface native",
    version: "4.12",
    documentation: "https://docs.gtk.org/",
    resources: [
      { name: "Documentation", url: "https://docs.gtk.org/" },
      { name: "Getting Started", url: "https://docs.gtk.org/gtk4/getting_started.html" },
      { name: "Tutoriels", url: "https://www.gtk.org/docs/tutorials/" },
      { name: "GitHub", url: "https://github.com/GNOME/gtk" },
    ],
  },
  wxWidgets: {
    name: "wxWidgets",
    description: "Bibliothèque C++ pour le développement d'interfaces graphiques multiplateformes",
    usedFor: "Applications de bureau multiplateformes, interfaces utilisateur natives, applications portables",
    features: [
      "Widgets natifs",
      "Support multiplateforme (Windows, macOS, Linux, etc.)",
      "Outils de développement rapide",
      "Extensible",
      "Licence libre",
    ],
    officialWebsite: "https://www.wxwidgets.org/",
    uniqueSellingPoint:
      "Interfaces utilisateur natives sur toutes les plateformes principales avec une seule base de code",
    bestFor: "Applications de bureau nécessitant apparence native sur multiples plateformes",
    version: "3.2.4",
    documentation: "https://docs.wxwidgets.org/",
    resources: [
      { name: "Documentation", url: "https://docs.wxwidgets.org/" },
      { name: "GitHub", url: "https://github.com/wxWidgets/wxWidgets" },
      { name: "Tutoriels", url: "https://docs.wxwidgets.org/trunk/overview_helloworld.html" },
    ],
  },
  OpenFrameworks: {
    name: "OpenFrameworks",
    description: "Boîte à outils C++ open source conçue pour la création artistique et expérimentale",
    usedFor: "Art numérique, installations interactives, visualisations de données, prototypage créatif",
    features: [
      "Graphiques et OpenGL",
      "Audio et vidéo",
      "Traitement d'images",
      "Communication réseau",
      "Intégration matérielle",
    ],
    officialWebsite: "https://openframeworks.cc/",
    uniqueSellingPoint: "Environnement créatif pour artistes et designers avec puissance du C++",
    bestFor: "Artistes numériques et créateurs d'installations interactives",
    version: "0.12.0",
    documentation: "https://openframeworks.cc/documentation/",
    resources: [
      { name: "Documentation", url: "https://openframeworks.cc/documentation/" },
      { name: "GitHub", url: "https://github.com/openframeworks/openFrameworks" },
      { name: "Tutoriels", url: "https://openframeworks.cc/learning/" },
    ],
  },
  Cinder: {
    name: "Cinder",
    description: "Bibliothèque C++ pour la programmation créative et le design interactif",
    usedFor: "Art numérique, design interactif, visualisations, prototypage, installations",
    features: ["Graphiques 2D/3D", "Audio", "Vidéo", "Calcul GPU", "Intégration avec OpenGL"],
    officialWebsite: "https://libcinder.org/",
    uniqueSellingPoint: "Bibliothèque de qualité professionnelle pour applications créatives avec performances C++",
    bestFor: "Développeurs et artistes créant applications visuelles haute performance",
    version: "1.0",
    documentation: "https://libcinder.org/docs/",
    resources: [
      { name: "Documentation", url: "https://libcinder.org/docs/" },
      { name: "GitHub", url: "https://github.com/cinder/Cinder" },
      { name: "Guides", url: "https://libcinder.org/docs/guides/" },
    ],
  },
}

