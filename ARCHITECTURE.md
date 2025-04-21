# Architecture du Projet - Pokedex des Langages de Programmation

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure du projet](#structure-du-projet)
3. [Choix techniques](#choix-techniques)
4. [Modèles de données](#modèles-de-données)
5. [Gestion de l'authentification et des autorisations](#gestion-de-lauthentification-et-des-autorisations)
6. [Patterns et bonnes pratiques](#patterns-et-bonnes-pratiques)
7. [Flux de données](#flux-de-données)
8. [API et endpoints](#api-et-endpoints)
9. [Considérations de performance](#considérations-de-performance)
10. [Sécurité](#sécurité)
11. [Évolutions futures](#évolutions-futures)

## Vue d'ensemble

Le "Pokedex des Langages de Programmation" est une application web qui catalogue et présente des informations détaillées sur différents langages de programmation, frameworks, bibliothèques et outils. L'application permet aux utilisateurs de découvrir, comparer et contribuer à une base de connaissances collaborative sur les technologies de développement.

### Architecture globale

L'application suit une architecture moderne basée sur Next.js avec le modèle App Router, utilisant Supabase comme backend-as-a-service pour la base de données, l'authentification et le stockage. L'architecture est conçue pour être modulaire, maintenable et évolutive.

\`\`\`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client (Next)  │◄───►│  Server (Next)  │◄───►│    Supabase     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
\`\`\`

## Structure du projet

Le projet suit une structure organisée par fonctionnalité et type de composant, conformément aux bonnes pratiques de Next.js et aux principes SOLID.

\`\`\`
/
├── app/                  # Routes Next.js (App Router)
│   ├── api/              # Routes API
│   ├── language/         # Pages des langages
│   ├── tools/            # Pages des outils
│   ├── admin/            # Pages d'administration
│   └── ...
├── components/           # Composants React
│   ├── ui/               # Composants UI réutilisables
│   ├── admin/            # Composants pour l'administration
│   └── ...
├── lib/                  # Logique métier et utilitaires
│   ├── server/           # Code côté serveur
│   │   ├── api/          # Fonctions d'accès aux données
│   │   ├── auth/         # Fonctions d'authentification
│   │   ├── mapping/      # Fonctions de mapping
│   │   └── ...
│   ├── client/           # Code côté client
│   └── ...
├── hooks/                # Hooks React personnalisés
├── types/                # Définitions de types TypeScript
│   ├── database/         # Types pour les tables de la base de données
│   ├── models/           # Types pour les modèles de données
│   └── ...
├── utils/                # Fonctions utilitaires
│   ├── security/         # Utilitaires de sécurité
│   ├── slugs/            # Utilitaires pour les slugs
│   ├── conversion/       # Utilitaires de conversion
│   └── ...
├── public/               # Fichiers statiques
└── ...
\`\`\`

## Choix techniques

### Frontend

- **Next.js (App Router)** : Framework React avec rendu côté serveur et génération statique, offrant une excellente performance et SEO.
- **TypeScript** : Typage statique pour améliorer la qualité du code et l'expérience de développement.
- **Tailwind CSS** : Framework CSS utilitaire pour un développement rapide et cohérent.
- **shadcn/ui** : Composants UI réutilisables basés sur Radix UI et Tailwind.

### Backend

- **Supabase** : Plateforme backend-as-a-service offrant :
  - Base de données PostgreSQL
  - Authentification et gestion des utilisateurs
  - Stockage de fichiers
  - API RESTful et temps réel

### Outils de développement

- **ESLint** : Linting du code pour maintenir la qualité et la cohérence.
- **Prettier** : Formatage du code.
- **TypeScript** : Vérification des types avec `tsc --noEmit`.

## Modèles de données

L'application utilise plusieurs modèles de données principaux, avec une séparation claire entre les types de base de données (snake_case) et les types d'application (camelCase).

### Langages de programmation

\`\`\`typescript
// Type d'application
interface Language {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  type: string | null;
  // ... autres propriétés
}

// Type de base de données
interface DbLanguage {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  type: string | null;
  // ... autres propriétés
}
\`\`\`

### Bibliothèques et frameworks

\`\`\`typescript
interface Library {
  id: number;
  name: string;
  slug: string;
  languageId: number | null;
  description: string | null;
  // ... autres propriétés
}
\`\`\`

### Utilisateurs et rôles

\`\`\`typescript
type UserRoleTypeDB = "admin" | "validator" | "verified" | "registered";
type UserRoleType = UserRoleTypeDB | "anonymous";

interface UserRole {
  id: string;
  role: UserRoleTypeDB;
  createdAt: string | null;
  updatedAt: string | null;
}
\`\`\`

## Gestion de l'authentification et des autorisations

### Authentification

L'application utilise Supabase Auth pour l'authentification des utilisateurs, avec un système de session basé sur JWT.

\`\`\`typescript
// Exemple de vérification d'authentification côté serveur
export async function requireAuthSC(redirectTo?: string): Promise<string> {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = redirectTo ? `/login?redirectTo=${encodeURIComponent(redirectTo)}` : "/login";
    redirect(redirectUrl);
  }

  return session.user.id;
}
\`\`\`

### Système de rôles

L'application implémente un système de rôles hiérarchique avec les niveaux suivants (du plus élevé au plus bas) :

1. **admin** : Accès complet à toutes les fonctionnalités
2. **validator** : Peut valider les contributions des utilisateurs
3. **verified** : Utilisateur vérifié pouvant contribuer du contenu
4. **registered** : Utilisateur enregistré avec accès limité
5. **anonymous** : Visiteur non connecté

\`\`\`typescript
// Hiérarchie des rôles
const ROLE_HIERARCHY: RoleHierarchy = {
  admin: 100,
  validator: 50,
  verified: 20,
  registered: 10,
  anonymous: 0,
};

// Vérification des rôles
export function checkUserRole(userRole: UserRoleType | null | undefined, requiredRole: UserRoleType): boolean {
  if (!userRole) return requiredRole === "anonymous";
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
\`\`\`

## Patterns et bonnes pratiques

### Mapping de données

L'application utilise un pattern de mapping pour convertir entre les formats de base de données (snake_case) et les formats d'application (camelCase).

\`\`\`typescript
// Exemple de fonction de mapping
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    description: dbLanguage.description ?? null,
    shortDescription: dbLanguage.short_description ?? null,
    // ... autres propriétés
  };
}
\`\`\`

### Server Actions

L'application utilise les Server Actions de Next.js pour les opérations de mutation, offrant une meilleure expérience utilisateur et une sécurité renforcée.

\`\`\`typescript
// Exemple de Server Action
export async function createLanguageAction(formData: FormData) {
  "use server";
  
  try {
    // Logique de création
    // ...
    
    return {
      success: true,
      message: "Langage créé avec succès",
      data: newLanguage,
    };
  } catch (error) {
    // Gestion des erreurs
    // ...
  }
}
\`\`\`

### Gestion des erreurs

L'application implémente une gestion des erreurs standardisée avec des classes d'erreur personnalisées et des fonctions de gestion.

\`\`\`typescript
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown) {
  // Logique de gestion des erreurs
  // ...
}
\`\`\`

## Flux de données

### Récupération des données

L'application utilise plusieurs méthodes pour récupérer des données :

1. **Server Components** : Récupération directe des données côté serveur
2. **Server Actions** : Pour les opérations de mutation
3. **API Routes** : Pour les endpoints RESTful
4. **Client Components** : Utilisation de hooks personnalisés pour les requêtes côté client

\`\`\`typescript
// Exemple de récupération de données dans un Server Component
export default async function LanguagePage({ params }: Props) {
  const language = await getLanguageBySlug(params.slug);
  
  if (!language) {
    notFound();
  }
  
  // Récupérer les frameworks et bibliothèques associés
  const [frameworks, libraries] = await Promise.all([
    getFrameworksByLanguageId(language.id),
    getLibrariesByLanguageId(language.id),
  ]);
  
  return (
    <div className="container py-8">
      <LanguageDetail language={language} frameworks={frameworks} libraries={libraries} />
    </div>
  );
}
\`\`\`

### Validation des données

L'application implémente une validation des données à plusieurs niveaux :

1. **Validation côté client** : Pour une expérience utilisateur réactive
2. **Validation côté serveur** : Pour garantir l'intégrité des données
3. **Validation au niveau de la base de données** : Contraintes et triggers PostgreSQL

## API et endpoints

L'application expose plusieurs endpoints API pour interagir avec les données :

### API Routes

\`\`\`
/api
/languages            # Gestion des langages de programmation
  /[id]               # Opérations sur un langage spécifique
  /slug/[slug]        # Récupération d'un langage par son slug
/libraries            # Gestion des bibliothèques
  /[id]               # Opérations sur une bibliothèque spécifique
/tools                # Gestion des outils
  /[id]/languages     # Gestion des langages associés à un outil
/corrections          # Gestion des corrections
/proposals            # Gestion des propositions
\`\`\`

### Server Actions

\`\`\`
/app/actions
/language-actions.ts  # Actions pour les langages
/library-actions.ts   # Actions pour les bibliothèques
/framework-actions.ts # Actions pour les frameworks
/correction-actions.ts # Actions pour les corrections
/todo-actions.ts      # Actions pour les tâches
\`\`\`

## Considérations de performance

### Stratégies de mise en cache

L'application utilise plusieurs stratégies de mise en cache pour optimiser les performances :

1. **Revalidation à la demande** : Utilisation de `revalidatePath` pour invalider le cache après des mutations
2. **Mise en cache statique** : Pour les pages qui changent rarement
3. **Streaming** : Pour améliorer le temps jusqu'au premier octet (TTFB)

\`\`\`typescript
// Exemple de revalidation après une mutation
export async function updateLanguageAction(id: string, formData: FormData) {
  "use server";
  
  try {
    // Logique de mise à jour
    // ...
    
    // Revalider les chemins pertinents
    revalidatePath("/");
    revalidatePath(`/languages/${slug}`);
    revalidatePath("/admin/languages");
    
    return {
      success: true,
      message: "Langage mis à jour avec succès",
    };
  } catch (error) {
    // Gestion des erreurs
    // ...
  }
}
\`\`\`

### Optimisation des images

L'application utilise des techniques d'optimisation des images pour améliorer les performances :

1. **Stockage optimisé** : Utilisation de Supabase Storage
2. **Chargement paresseux** : Utilisation de `loading="lazy"` pour les images
3. **Formats modernes** : Utilisation de formats d'image optimisés

## Sécurité

### Protection contre les attaques courantes

L'application implémente plusieurs mesures de sécurité :

1. **Protection CSRF** : Utilisation de tokens CSRF pour les formulaires
2. **Validation des entrées** : Validation stricte des données entrantes
3. **Échappement des sorties** : Prévention des attaques XSS
4. **Politique de sécurité du contenu (CSP)** : Restriction des sources de contenu

### Gestion des tokens

L'application utilise une gestion sécurisée des tokens JWT :

1. **Rafraîchissement automatique** : Utilisation de `withTokenRefresh` pour gérer le rafraîchissement des tokens
2. **Stockage sécurisé** : Utilisation de cookies HTTP-only pour les tokens
3. **Expiration** : Durée de vie limitée des tokens

\`\`\`typescript
export async function withTokenRefresh<T>(callback: () => Promise<T>): Promise<T> {
  try {
    return await callback();
  } catch (error: any) {
    // Logique de rafraîchissement du token
    // ...
  }
}
\`\`\`

## Évolutions futures

### Fonctionnalités planifiées

1. **Module de gestion des tâches** : Implémentation d'un système de tâches pour les validateurs et administrateurs
2. **Système de notifications** : Alertes pour les utilisateurs sur les mises à jour et validations
3. **Intégration de l'IA** : Assistance pour la génération et la validation de contenu
4. **Internationalisation** : Support multilingue pour l'interface utilisateur
5. **Mode hors ligne** : Fonctionnalités de base disponibles sans connexion Internet

### Améliorations techniques

1. **Tests automatisés** : Augmentation de la couverture des tests
2. **Optimisation des performances** : Amélioration du temps de chargement et de l'expérience utilisateur
3. **PWA** : Transformation en Progressive Web App
4. **Microservices** : Décomposition de certaines fonctionnalités en microservices pour une meilleure scalabilité
