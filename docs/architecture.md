# Guide d'Architecture et Bonnes Pratiques

## 1. Architecture Globale

Notre application suit une architecture en couches avec une séparation claire des responsabilités :

- **Couche Présentation** : Composants React dans `/components` et `/app`
- **Couche Logique Métier** : Hooks et utilitaires dans `/hooks` et `/lib/utils`
- **Couche Accès aux Données** : API et mappeurs dans `/lib/server/api` et `/lib/server/mapping`
- **Couche Infrastructure** : Configuration Supabase dans `/lib/server/supabase`

Nous utilisons le modèle "Server Components" de Next.js pour maximiser les performances, avec une distinction claire entre les composants serveur et client.

## 2. Principes SOLID

Nous appliquons les principes SOLID dans notre code :

### Single Responsibility Principle (SRP)
Chaque fonction ou composant ne doit avoir qu'une seule raison de changer.

✅ **Bon exemple** :
\`\`\`typescript
// Fonction qui récupère uniquement les IDs
async function fetchLibraryIdsByLanguageId(languageId: number): Promise<number[]> {
  // ...
}

// Fonction qui récupère uniquement les données
async function fetchLibrariesData(libraryIds: number[]): Promise<DbLibrary[]> {
  // ...
}

// Fonction qui orchestre le processus
export const getFrameworksByLanguageId = cache(async (languageId: number): Promise<Library[]> => {
  const libraryIds = await fetchLibraryIdsByLanguageId(languageId);
  const librariesData = await fetchLibrariesData(libraryIds);
  return librariesData.map(dbToLibrary);
});
\`\`\`

❌ **Mauvais exemple** :
\`\`\`typescript
export const getFrameworksByLanguageId = cache(async (languageId: number): Promise<Library[]> => {
  // Récupération des IDs, des données et transformation tout dans une seule fonction
  // ...
});
\`\`\`

### Open/Closed Principle (OCP)
Les entités doivent être ouvertes à l'extension mais fermées à la modification.

✅ **Bon exemple** :
\`\`\`typescript
// Fonction de base pour générer un slug
export function generateSlug(name: string): string {
  // Logique de base
}

// Extension pour les cas spécifiques sans modifier la fonction originale
export function generateLanguageSlug(name: string): string {
  // Cas spéciaux pour les langages
  if (specialCases[name]) return specialCases[name];
  
  // Utilisation de la fonction de base pour les autres cas
  return generateSlug(name);
}
\`\`\`

### Liskov Substitution Principle (LSP)
Les objets d'une classe dérivée doivent pouvoir remplacer les objets d'une classe de base.

### Interface Segregation Principle (ISP)
Plusieurs interfaces spécifiques sont préférables à une seule interface générale.

✅ **Bon exemple** :
\`\`\`typescript
// Types spécifiques pour différentes entités
interface LanguageBase {
  id: number;
  name: string;
  // Propriétés communes
}

interface ProgrammingLanguage extends LanguageBase {
  paradigms: string[];
  // Propriétés spécifiques aux langages de programmation
}

interface MarkupLanguage extends LanguageBase {
  doctype: string;
  // Propriétés spécifiques aux langages de balisage
}
\`\`\`

### Dependency Inversion Principle (DIP)
Dépendre des abstractions, pas des implémentations concrètes.

✅ **Bon exemple** :
\`\`\`typescript
// Dépendance sur une interface/type plutôt qu'une implémentation
function processLanguage(language: Language) {
  // ...
}
\`\`\`

## 3. Structure des Dossiers

\`\`\`
/app                   # Routes et pages Next.js
  /api                 # Routes API
  /language            # Pages des langages
/components            # Composants React réutilisables
/hooks                 # Hooks React personnalisés
/lib                   # Logique métier et utilitaires
  /client              # Code exécuté côté client
  /server              # Code exécuté côté serveur
    /api               # Fonctions d'accès aux données
    /mapping           # Fonctions de transformation de données
    /supabase          # Configuration et utilitaires Supabase
  /utils               # Fonctions utilitaires génériques
/types                 # Définitions de types TypeScript
  /database            # Types correspondant aux tables de la base de données
  /models              # Types utilisés dans l'application
  /dto                 # Types pour les transferts de données
/public                # Fichiers statiques
\`\`\`

## 4. Conventions de Nommage

- **Fichiers** : kebab-case pour les fichiers (`language-card.tsx`)
- **Composants React** : PascalCase (`LanguageCard`)
- **Fonctions** : camelCase (`getLanguageById`)
- **Types/Interfaces** : PascalCase (`Language`, `DbLanguage`)
- **Variables d'environnement** : SCREAMING_SNAKE_CASE (`NEXT_PUBLIC_SUPABASE_URL`)

## 5. Gestion des Types

Nous utilisons une approche en couches pour les types :

- **Types de Base de Données** (`/types/database`) : Correspondent exactement à la structure des tables
- **Types de Modèles** (`/types/models`) : Représentent les données utilisées dans l'application
- **Types DTO** (`/types/dto`) : Pour les transferts de données entre le client et le serveur

Les fonctions de mapping (`/lib/server/mapping`) convertissent entre ces différents types.

## 6. Gestion des Erreurs

Nous utilisons une approche en trois niveaux pour la gestion des erreurs :

1. **Capture** : Toujours utiliser try/catch pour capturer les erreurs
2. **Journalisation** : Logger les erreurs avec des informations contextuelles
3. **Récupération gracieuse** : Toujours fournir une valeur par défaut en cas d'erreur

\`\`\`typescript
try {
  // Code qui peut échouer
} catch (error) {
  console.error(`Contexte de l'erreur: ${contextInfo}`, error);
  return defaultValue; // Valeur par défaut pour une récupération gracieuse
}
\`\`\`

## 7. Requêtes à Supabase

### Bonnes Pratiques

1. **Utiliser le client serveur** pour les requêtes sensibles :
   \`\`\`typescript
   const supabase = createServerSupabaseClient();
   \`\`\`

2. **Spécifier les colonnes** pour optimiser les performances :
   \`\`\`typescript
   const { data } = await supabase
     .from("languages")
     .select("id, name, description")
   \`\`\`

3. **Utiliser le cache React** pour les requêtes fréquentes :
   \`\`\`typescript
   export const getLanguages = cache(async () => {
     // ...
   });
   \`\`\`

4. **Utiliser TanStack Query** pour la mise en cache côté client :
   \`\`\`typescript
   const { data, isLoading } = useQuery({
     queryKey: ['languages'],
     queryFn: fetchLanguages
   });
   \`\`\`

## 8. Optimisation des Performances

1. **Mise en cache** :
   - Utiliser `cache()` de React pour les fonctions serveur
   - Utiliser TanStack Query pour les requêtes client
   - Implémenter des stratégies de revalidation appropriées

2. **Chargement différé** :
   - Utiliser `React.lazy()` et `Suspense` pour les composants volumineux
   - Implémenter des squelettes de chargement pour améliorer l'UX

3. **Pagination et chargement à la demande** :
   - Limiter le nombre d'éléments chargés initialement
   - Implémenter le chargement à la demande ou la pagination

4. **Optimisation des images** :
   - Utiliser le composant `Image` de Next.js
   - Spécifier les dimensions et utiliser des formats modernes

## 9. Tests

Nous utilisons une approche de test en trois niveaux :

1. **Tests unitaires** : Pour les fonctions et composants isolés
2. **Tests d'intégration** : Pour les interactions entre composants
3. **Tests end-to-end** : Pour les parcours utilisateur complets

Chaque fonction d'API et composant majeur devrait avoir des tests associés.

## 10. Déploiement

Notre application est déployée sur Vercel avec les configurations suivantes :

- **Environnement de production** : Branche `main`
- **Environnement de prévisualisation** : Pull Requests
- **Variables d'environnement** : Configurées dans le dashboard Vercel

## Conclusion

Ce guide est un document vivant qui évoluera avec le projet. Suivez ces principes pour maintenir un code propre, maintenable et performant.

Pour toute question ou suggestion d'amélioration, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.
