import type { Framework } from "./types"

export const pythonFrameworks: Record<string, Framework> = {
  Django: {
    name: "Django",
    description: "Framework web Python pour la création d'applications web robustes",
    usedFor: "Applications web complexes, sites web d'entreprise, APIs RESTful, CMS",
    features: ["ORM", "Système de templates", "Sécurité intégrée", "Admin automatique"],
    officialWebsite: "https://www.djangoproject.com/",
    uniqueSellingPoint: "Structure robuste et sécurité intégrée",
    bestFor: "Applications web complexes et sites web d'entreprise",
    version: "4.2",
    documentation: "https://docs.djangoproject.com/en/4.2/",
  },
  Flask: {
    name: "Flask",
    description: "Microframework Python pour la création d'applications web",
    usedFor: "APIs RESTful, applications web simples, microservices, prototypes",
    features: ["Flexible", "Minimaliste", "Facile à apprendre", "Extensions"],
    officialWebsite: "https://flask.palletsprojects.com/",
    uniqueSellingPoint: "Minimalisme et flexibilité",
    bestFor: "Applications web simples et APIs",
    version: "2.3",
    documentation: "https://flask.palletsprojects.com/en/2.3.x/tutorial/",
  },
  FastAPI: {
    name: "FastAPI",
    description: "Framework web moderne, rapide et asynchrone pour Python 3.7+",
    usedFor: "APIs RESTful, microservices, applications à haute performance, applications asynchrones",
    features: [
      "Performances élevées",
      "Validation automatique des données",
      "Documentation automatique (OpenAPI)",
      "Support asynchrone natif",
      "Typage statique avec Pydantic",
    ],
    officialWebsite: "https://fastapi.tiangolo.com/",
    uniqueSellingPoint:
      "Combinaison de rapidité, simplicité et validation automatique des données avec documentation interactive",
    bestFor: "APIs modernes nécessitant des performances élevées et une documentation claire",
    version: "0.104.0",
    documentation: "https://fastapi.tiangolo.com/",
    resources: [
      { name: "Documentation officielle", url: "https://fastapi.tiangolo.com/" },
      { name: "GitHub", url: "https://github.com/tiangolo/fastapi" },
      { name: "Tutoriels", url: "https://fastapi.tiangolo.com/tutorial/" },
      { name: "Exemples avancés", url: "https://fastapi.tiangolo.com/advanced/" },
    ],
  },
  TensorFlow: {
    name: "TensorFlow",
    description: "Bibliothèque open-source pour l'apprentissage automatique et l'intelligence artificielle",
    usedFor: "Machine learning, deep learning, traitement d'images, traitement du langage naturel, analyse prédictive",
    features: [
      "Calcul numérique via graphes de flux de données",
      "Support GPU et TPU",
      "Écosystème complet (TensorFlow Extended, TensorFlow.js, etc.)",
      "Keras intégré",
      "TensorFlow Lite pour les appareils mobiles",
    ],
    officialWebsite: "https://www.tensorflow.org/",
    uniqueSellingPoint: "Plateforme complète pour le développement et le déploiement de modèles ML à l'échelle",
    bestFor: "Projets d'IA/ML de recherche et de production nécessitant flexibilité et évolutivité",
    version: "2.15.0",
    documentation: "https://www.tensorflow.org/api_docs",
    resources: [
      { name: "Documentation officielle", url: "https://www.tensorflow.org/api_docs" },
      { name: "Tutoriels", url: "https://www.tensorflow.org/tutorials" },
      { name: "GitHub", url: "https://github.com/tensorflow/tensorflow" },
      { name: "TensorFlow Hub", url: "https://tfhub.dev/" },
    ],
  },
  PyTorch: {
    name: "PyTorch",
    description: "Bibliothèque d'apprentissage automatique open-source basée sur Torch",
    usedFor: "Deep learning, recherche en IA, vision par ordinateur, traitement du langage naturel",
    features: [
      "Calcul tensoriel avec accélération GPU",
      "Différentiation automatique",
      "API Python intuitive",
      "Écosystème riche (TorchVision, TorchText, etc.)",
      "Mode eager execution pour le débogage",
    ],
    officialWebsite: "https://pytorch.org/",
    uniqueSellingPoint: "Interface pythonique intuitive et flexibilité pour la recherche en deep learning",
    bestFor: "Chercheurs en IA et développeurs nécessitant un prototypage rapide et une flexibilité maximale",
    version: "2.1.0",
    documentation: "https://pytorch.org/docs/stable/index.html",
    resources: [
      { name: "Documentation officielle", url: "https://pytorch.org/docs/stable/index.html" },
      { name: "Tutoriels", url: "https://pytorch.org/tutorials/" },
      { name: "GitHub", url: "https://github.com/pytorch/pytorch" },
      { name: "Forum PyTorch", url: "https://discuss.pytorch.org/" },
    ],
  },
  Pandas: {
    name: "Pandas",
    description: "Bibliothèque Python pour la manipulation et l'analyse de données",
    usedFor: "Analyse de données, nettoyage de données, exploration de données, préparation de données pour ML",
    features: [
      "Structures de données puissantes (DataFrame, Series)",
      "Manipulation de données tabulaires",
      "Lecture/écriture de différents formats (CSV, Excel, SQL, etc.)",
      "Fonctions statistiques intégrées",
      "Gestion des données manquantes",
    ],
    officialWebsite: "https://pandas.pydata.org/",
    uniqueSellingPoint: "Manipulation intuitive et efficace de données tabulaires avec une API riche",
    bestFor: "Scientifiques des données et analystes travaillant avec des données structurées",
    version: "2.1.0",
    documentation: "https://pandas.pydata.org/docs/",
    resources: [
      { name: "Documentation officielle", url: "https://pandas.pydata.org/docs/" },
      { name: "User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html" },
      { name: "GitHub", url: "https://github.com/pandas-dev/pandas" },
      { name: "Cookbook", url: "https://pandas.pydata.org/docs/user_guide/cookbook.html" },
    ],
  },
  NumPy: {
    name: "NumPy",
    description: "Bibliothèque fondamentale pour le calcul scientifique en Python",
    usedFor: "Calcul numérique, traitement de tableaux multidimensionnels, algèbre linéaire, statistiques",
    features: [
      "Tableaux N-dimensionnels puissants",
      "Fonctions mathématiques sophistiquées",
      "Outils d'intégration avec C/C++",
      "Algèbre linéaire, transformée de Fourier, nombres aléatoires",
      "Base pour la plupart des bibliothèques scientifiques Python",
    ],
    officialWebsite: "https://numpy.org/",
    uniqueSellingPoint: "Fondation du calcul scientifique en Python avec des opérations vectorisées efficaces",
    bestFor: "Scientifiques, ingénieurs et analystes de données nécessitant des calculs numériques performants",
    version: "1.25.0",
    documentation: "https://numpy.org/doc/stable/",
    resources: [
      { name: "Documentation officielle", url: "https://numpy.org/doc/stable/" },
      { name: "User Guide", url: "https://numpy.org/doc/stable/user/index.html" },
      { name: "GitHub", url: "https://github.com/numpy/numpy" },
      { name: "NumPy Tutorials", url: "https://numpy.org/numpy-tutorials/" },
    ],
  },
  Streamlit: {
    name: "Streamlit",
    description: "Bibliothèque Python pour créer rapidement des applications web interactives pour la data science",
    usedFor:
      "Dashboards interactifs, visualisation de données, prototypage d'applications ML, démonstrations de modèles",
    features: [
      "Création d'interfaces web en pur Python",
      "Hot-reloading automatique",
      "Widgets interactifs intégrés",
      "Intégration facile avec les bibliothèques de data science",
      "Déploiement simplifié avec Streamlit Cloud",
    ],
    officialWebsite: "https://streamlit.io/",
    uniqueSellingPoint:
      "Transformation de scripts Python en applications web interactives en quelques minutes sans connaissances frontend",
    bestFor:
      "Data scientists et ML engineers souhaitant partager rapidement leurs analyses et modèles via des interfaces web",
    version: "1.28.0",
    documentation: "https://docs.streamlit.io/",
    resources: [
      { name: "Documentation officielle", url: "https://docs.streamlit.io/" },
      { name: "Galerie", url: "https://streamlit.io/gallery" },
      { name: "GitHub", url: "https://github.com/streamlit/streamlit" },
      { name: "Communauté", url: "https://discuss.streamlit.io/" },
    ],
  },
  Pyramid: {
    name: "Pyramid",
    description: "Framework web Python flexible et pragmatique",
    usedFor: "Applications web, APIs, CMS, applications d'entreprise",
    features: [
      "Configuration minimale",
      "Extensibilité",
      "Sécurité robuste",
      "Système de templates flexible",
      "Routage avancé",
    ],
    officialWebsite: "https://trypyramid.com/",
    uniqueSellingPoint: "Framework web qui commence petit mais évolue avec votre application",
    bestFor: "Applications web nécessitant flexibilité et évolutivité",
    version: "2.0",
    documentation: "https://docs.pylonsproject.org/projects/pyramid/en/latest/",
    resources: [
      { name: "Documentation", url: "https://docs.pylonsproject.org/projects/pyramid/en/latest/" },
      { name: "GitHub", url: "https://github.com/Pylons/pyramid" },
      { name: "Tutoriels", url: "https://docs.pylonsproject.org/projects/pyramid/en/latest/quick_tutorial/index.html" },
    ],
  },
  Tornado: {
    name: "Tornado",
    description: "Bibliothèque web asynchrone et framework d'applications",
    usedFor: "Applications web asynchrones, WebSockets, applications temps réel, services à haute concurrence",
    features: ["I/O non-bloquant", "WebSockets", "Performances élevées", "Évolutivité", "Client HTTP asynchrone"],
    officialWebsite: "https://www.tornadoweb.org/",
    uniqueSellingPoint: "Framework web asynchrone natif pour applications temps réel à haute performance",
    bestFor: "Applications nécessitant connexions persistantes et traitement asynchrone",
    version: "6.3.3",
    documentation: "https://www.tornadoweb.org/en/stable/",
    resources: [
      { name: "Documentation", url: "https://www.tornadoweb.org/en/stable/" },
      { name: "GitHub", url: "https://github.com/tornadoweb/tornado" },
      { name: "Guide", url: "https://www.tornadoweb.org/en/stable/guide.html" },
    ],
  },
  "Scikit-learn": {
    name: "Scikit-learn",
    description: "Bibliothèque d'apprentissage automatique simple et efficace pour Python",
    usedFor: "Machine learning, classification, régression, clustering, prétraitement de données",
    features: [
      "Algorithmes de ML classiques",
      "Prétraitement de données",
      "Sélection de modèles",
      "Évaluation de modèles",
      "Intégration avec NumPy et Pandas",
    ],
    officialWebsite: "https://scikit-learn.org/",
    uniqueSellingPoint: "Bibliothèque ML accessible et complète avec API cohérente",
    bestFor: "Data scientists et ingénieurs ML travaillant avec des algorithmes classiques",
    version: "1.3.2",
    documentation: "https://scikit-learn.org/stable/user_guide.html",
    resources: [
      { name: "Documentation", url: "https://scikit-learn.org/stable/user_guide.html" },
      { name: "GitHub", url: "https://github.com/scikit-learn/scikit-learn" },
      { name: "Tutoriels", url: "https://scikit-learn.org/stable/auto_examples/index.html" },
    ],
  },
  Matplotlib: {
    name: "Matplotlib",
    description: "Bibliothèque de visualisation complète pour Python",
    usedFor:
      "Visualisation de données, graphiques scientifiques, figures pour publications, visualisations interactives",
    features: [
      "Graphiques statiques de haute qualité",
      "Personnalisation complète",
      "Multiples backends",
      "Intégration avec NumPy",
      "Support pour formats d'exportation variés",
    ],
    officialWebsite: "https://matplotlib.org/",
    uniqueSellingPoint: "Bibliothèque de visualisation complète et hautement personnalisable",
    bestFor: "Scientifiques et data scientists nécessitant graphiques précis et publication-ready",
    version: "3.8.2",
    documentation: "https://matplotlib.org/stable/users/index.html",
    resources: [
      { name: "Documentation", url: "https://matplotlib.org/stable/users/index.html" },
      { name: "GitHub", url: "https://github.com/matplotlib/matplotlib" },
      { name: "Galerie", url: "https://matplotlib.org/stable/gallery/index.html" },
    ],
  },
}

