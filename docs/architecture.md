# Architecture du Projet Pokedex Langage de Programmation

## Vue d'ensemble

Ce projet est une application web moderne qui catalogue et présente différents langages de programmation, leurs frameworks associés, et d'autres technologies connexes. L'application est construite avec une architecture orientée composants, utilisant Next.js comme framework principal.

## Stack Technologique

### Frontend

- **Next.js 14+** : Framework React avec rendu côté serveur (SSR) et génération statique (SSG)
- **React 18+** : Bibliothèque UI pour la construction d'interfaces utilisateur
- **TypeScript** : Superset typé de JavaScript pour une meilleure maintenabilité
- **Tailwind CSS** : Framework CSS utilitaire pour le styling
- **shadcn/ui** : Composants UI réutilisables basés sur Radix UI

### Backend

- **Next.js API Routes** : Points d'entrée API serverless
- **Supabase** : Plateforme backend-as-a-service (alternative open source à Firebase)
  - Base de données PostgreSQL
  - Authentification et gestion des utilisateurs
  - Stockage de fichiers

### Outils de développement

- **ESLint** : Linting du code JavaScript/TypeScript
- **Prettier** : Formatage du code
- **TanStack Query** (anciennement React Query) : Gestion des états serveur et mise en cache

### Déploiement

- **Vercel** : Plateforme de déploiement optimisée pour Next.js
- **GitHub** : Gestion de version et CI/CD

## Architecture Logicielle

L'application suit une architecture en couches avec une séparation claire des responsabilités :

### 1. Couche Présentation

- **Components** (`/components`) : Composants React réutilisables
- **Pages** (`/app`) : Routes et pages de l'application (App Router de Next.js)

### 2. Couche Logique Métier

- **Hooks** (`/hooks`) : Hooks React personnalisés pour la logique métier
- **Utilitaires** (`/utils`) : Fonctions utilitaires génériques
- **Lib** (`/lib`) : Logique métier spécifique à l'application
- **Actions** (`/app/actions`) : Server Actions pour les opérations côté serveur

### 3. Couche Accès aux Données

- **API** (`/lib/server/api`) : Fonctions d'accès aux données
- **Mapping** (`/lib/server/mapping`) : Conversion entre les types de base de données et les modèles
- **Client API** (`/lib/client/api.ts`) : Fonctions client pour interagir avec l'API

### 4. Couche Infrastructure

- **Supabase** (`/lib/server/supabase`) : Configuration et clients Supabase
- **Middleware** (`/middleware.ts`) : Middleware Next.js pour l'authentification et la protection des routes

## Méthodologies et Principes

### 1. Principes SOLID

- **Single Responsibility** : Chaque module a une seule raison de changer
- **Open/Closed** : Les modules sont ouverts à l'extension mais fermés à la modification
- **Liskov Substitution** : Les sous-types doivent être substituables à leurs types de base
- **Interface Segregation** : Plusieurs interfaces spécifiques sont préférables à une seule interface générale
- **Dependency Inversion** : Dépendre des abstractions, pas des implémentations

### 2. Architecture Orientée Composants

- Composants autonomes et réutilisables
- Composition plutôt qu'héritage
- Props pour la configuration et les données
- État local pour les interactions utilisateur

### 3. Gestion des Types

- Types stricts avec TypeScript
- Séparation entre types de base de données et modèles d'application
- Utilisation d'interfaces pour définir les contrats
- Fonctions de conversion entre types de base de données et modèles

### 4. Gestion d'État

- État local avec `useState` et `useReducer`
- État global avec React Context API
- État serveur avec TanStack Query
- Server Actions pour les mutations côté serveur

## Structure des Dossiers

\`\`\`
/app # Routes et pages Next.js (App Router)
/actions # Server Actions pour les opérations côté serveur
/api # Routes API
/admin # Pages d'administration
/languages # Pages des langages
/suggestions # Pages de suggestions et corrections
/components # Composants React réutilisables
/admin # Composants d'administration
/ui # Composants UI génériques
/hooks # Hooks React personnalisés
/lib # Logique métier et utilitaires spécifiques
/client # Code côté client
/api.ts # Fonctions client pour interagir avec l'API
/auth-helpers.ts # Helpers pour l'authentification côté client
/permissions.ts # Vérification des permissions
/supabase.ts # Client Supabase côté client
/server # Code côté serveur
/api # Fonctions d'accès aux données
/languages.ts # API pour les langages
/libraries.ts # API pour les bibliothèques
/corrections.ts # API pour les corrections
/users.ts # API pour les utilisateurs
/mapping # Fonctions de transformation
/language-mapping.ts # Mapping pour les langages
/library-mapping.ts # Mapping pour les bibliothèques
/correction-mapping.ts # Mapping pour les corrections
/index.ts # Point d'entrée pour les mappings
/supabase # Configuration Supabase
/client.ts # Client Supabase côté serveur
/index.ts # Point d'entrée pour Supabase
/database-mapping.ts # Fonctions de mapping (legacy)
/database-types.ts # Types de base de données (legacy)
/storage.ts # Gestion du stockage de fichiers
/supabase-app-router.ts # Client Supabase pour App Router
/supabase-server.ts # Client Supabase côté serveur (legacy)
/utils # Utilitaires spécifiques à l'application
/middleware.ts # Middleware Next.js pour l'authentification
/types # Définitions de types TypeScript
/database # Types correspondant aux tables
/language.ts # Type pour la table languages
/library.ts # Type pour la table libraries
/correction.ts # Type pour la table corrections
/todo.ts # Type pour la table todos
/index.ts # Point d'entrée pour les types de base de données
/models # Types utilisés dans l'application
/language.ts # Type Language pour l'application
/library.ts # Type Library pour l'application
/correction.ts # Type Correction pour l'application
/todo.ts # Type Todo pour l'application
/dto # Types pour les transferts de données
/database-types.ts # Types générés par Supabase
/index.ts # Point d'entrée pour tous les types
/utils # Utilitaires génériques
/conversion # Conversion entre types
/type-conversion.ts # Conversion de types
/null-undefined.ts # Gestion des valeurs null et undefined
/index.ts # Point d'entrée pour les conversions
/formatting # Formatage de données
/format-date.ts # Formatage de dates
/get-image-name.ts # Extraction de noms de fichiers
/index.ts # Point d'entrée pour le formatage
/date.ts # Alias pour formatting/format-date.ts
/public # Fichiers statiques
\`\`\`

## Flux de Données

1. **Requête Client** : L'utilisateur interagit avec l'interface
2. **Composant React** : Capture l'interaction et appelle un hook, une fonction ou un Server Action
3. **Server Action / Hook / Fonction** : Exécute la logique métier et interagit avec l'API ou Supabase
4. **Mapping** : Convertit les données entre le format de la base de données et les modèles d'application
5. **Réponse** : Les données sont renvoyées au client et affichées

## Authentification et Autorisation

- Authentification basée sur Supabase Auth
- Middleware Next.js pour la protection des routes
- Composant RoleProtected pour la protection basée sur les rôles
- Vérification des rôles dans les Server Actions et API Routes

## Gestion des Erreurs

- Capture des erreurs avec try/catch
- Journalisation des erreurs
- Pages d'erreur personnalisées
- Récupération gracieuse avec valeurs par défaut

## Performance

- Mise en cache avec React Cache et TanStack Query
- Optimisation des images avec Next.js Image
- Chargement différé des composants
- Pagination et chargement à la demande
- Revalidation des chemins après les mutations

## Conclusion

Cette architecture est conçue pour être modulaire, maintenable et évolutive. Elle suit les meilleures pratiques modernes de développement web et s'appuie sur des technologies éprouvées. La séparation claire des responsabilités et l'utilisation de types stricts facilitent la maintenance et l'évolution du projet.
\`\`\`

This updated architecture.md file now reflects the changes we've made to your codebase, including:

1. Added Server Actions in the architecture layers
2. Updated the folder structure to include the new organization of files
3. Added details about client API functions
4. Included information about the middleware for authentication and route protection
5. Added more details about the mapping functions and type conversions
6. Updated the flow of data to include Server Actions
7. Added information about the RoleProtected component for role-based authorization
8. Mentioned path revalidation after mutations

Is there anything specific you'd like me to emphasize or add to this updated documentation?
\`\`\`
