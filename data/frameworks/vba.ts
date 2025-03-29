import type { Framework } from "./types"

export const vbaFrameworks: Record<string, Framework> = {
  "Excel Object Model": {
    name: "Excel Object Model",
    description: "Modèle d'objet pour automatiser et étendre Excel avec VBA",
    usedFor: "Automatisation Excel, macros, tableaux de bord, applications de données",
    features: [
      "Manipulation de cellules et plages",
      "Formatage conditionnel",
      "Graphiques dynamiques",
      "Fonctions personnalisées",
      "Événements de classeur",
    ],
    officialWebsite: "https://learn.microsoft.com/office/vba/api/overview/excel",
    uniqueSellingPoint: "Automatisation complète d'Excel via programmation",
    bestFor: "Analystes financiers et professionnels utilisant Excel intensivement",
    version: "Office 365",
    documentation: "https://learn.microsoft.com/office/vba/api/overview/excel",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/office/vba/api/overview/excel" },
      {
        name: "Tutoriels",
        url: "https://learn.microsoft.com/office/vba/excel/concepts/getting-started-with-vba-in-office",
      },
      {
        name: "Exemples",
        url: "https://learn.microsoft.com/office/vba/excel/concepts/excel-performance/excel-tips-and-tricks",
      },
    ],
  },
  "Word Object Model": {
    name: "Word Object Model",
    description: "Modèle d'objet pour automatiser et étendre Word avec VBA",
    usedFor: "Automatisation Word, génération de documents, traitement de texte",
    features: [
      "Manipulation de texte",
      "Formatage de documents",
      "Génération de rapports",
      "Modèles de documents",
      "Fusion et publipostage",
    ],
    officialWebsite: "https://learn.microsoft.com/office/vba/api/overview/word",
    uniqueSellingPoint: "Automatisation complète de Word via programmation",
    bestFor: "Professionnels créant des documents et rapports complexes",
    version: "Office 365",
    documentation: "https://learn.microsoft.com/office/vba/api/overview/word",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/office/vba/api/overview/word" },
      {
        name: "Tutoriels",
        url: "https://learn.microsoft.com/office/vba/word/concepts/getting-started-with-vba-in-office",
      },
      { name: "Exemples", url: "https://learn.microsoft.com/office/vba/word/concepts/working-with-word-objects" },
    ],
  },
  "Access Object Model": {
    name: "Access Object Model",
    description: "Modèle d'objet pour automatiser et étendre Access avec VBA",
    usedFor: "Applications de base de données, formulaires, rapports, automatisation",
    features: [
      "Manipulation de données",
      "Requêtes dynamiques",
      "Formulaires personnalisés",
      "Rapports avancés",
      "Intégration avec SQL",
    ],
    officialWebsite: "https://learn.microsoft.com/office/vba/api/overview/access",
    uniqueSellingPoint: "Création d'applications de base de données complètes",
    bestFor: "Développeurs d'applications de données départementales",
    version: "Office 365",
    documentation: "https://learn.microsoft.com/office/vba/api/overview/access",
    resources: [
      { name: "Documentation officielle", url: "https://learn.microsoft.com/office/vba/api/overview/access" },
      {
        name: "Tutoriels",
        url: "https://learn.microsoft.com/office/vba/access/concepts/getting-started-with-vba-in-office",
      },
      { name: "Exemples", url: "https://learn.microsoft.com/office/vba/access/concepts/data-access-objects" },
    ],
  },
  VBScript: {
    name: "VBScript",
    description: "Langage de script basé sur Visual Basic pour l'automatisation Windows",
    usedFor: "Scripts système, automatisation Windows, administration système",
    features: ["Scripts WSH", "Automatisation COM", "Scripts HTA", "Interaction avec le système", "Tâches planifiées"],
    officialWebsite:
      "https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)",
    uniqueSellingPoint: "Automatisation Windows avec syntaxe similaire à VBA",
    bestFor: "Administrateurs système et automatisation de tâches Windows",
    version: "5.8",
    documentation:
      "https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)",
    resources: [
      {
        name: "Documentation officielle",
        url: "https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)",
      },
      {
        name: "Référence",
        url: "https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d1wf56tt(v=vs.84)",
      },
      {
        name: "Exemples",
        url: "https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6hbb8h6t(v=vs.84)",
      },
    ],
  },
  VSTO: {
    name: "VSTO",
    description: "Visual Studio Tools for Office - Extension de VBA avec .NET",
    usedFor: "Applications Office professionnelles, add-ins, intégration .NET",
    features: [
      "Développement .NET pour Office",
      "Débogage avancé",
      "Contrôles Windows Forms",
      "Sécurité améliorée",
      "Déploiement professionnel",
    ],
    officialWebsite: "https://learn.microsoft.com/visualstudio/vsto/",
    uniqueSellingPoint: "Développement Office professionnel avec .NET et Visual Studio",
    bestFor: "Développeurs .NET créant des solutions Office d'entreprise",
    version: "Visual Studio 2022",
    documentation: "https://learn.microsoft.com/visualstudio/vsto/office-solutions-development-overview",
    resources: [
      {
        name: "Documentation officielle",
        url: "https://learn.microsoft.com/visualstudio/vsto/office-solutions-development-overview",
      },
      {
        name: "Tutoriels",
        url: "https://learn.microsoft.com/visualstudio/vsto/walkthrough-creating-your-first-vsto-add-in-for-excel",
      },
      { name: "Exemples", url: "https://github.com/OfficeDev/Office-VSTO-Samples" },
    ],
  },
}

