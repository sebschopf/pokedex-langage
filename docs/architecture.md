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

### 3. Couche Accès aux Données
- **API** (`/lib/server/api`) : Fonctions d'accès aux données
- **Mapping** (`/lib/server/mapping`) : Conversion entre les types de base de données et les modèles

### 4. Couche Infrastructure
- **Supabase** (`/lib/server/supabase`) : Configuration et clients Supabase

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

### 4. Gestion d'État
- État local avec `useState` et `useReducer`
- État global avec React Context API
- État serveur avec TanStack Query

## Structure des Dossiers

\`\`\`
/app                   # Routes et pages Next.js (App Router)
  /api                 # Routes API
  /language            # Pages des langages
  /profile             # Pages de profil utilisateur
  /login               # Pages d'authentification
/components            # Composants React réutilisables
  /admin               # Composants d'administration
  /ui                  # Composants UI génériques
/hooks                 # Hooks React personnalisés
/lib                   # Logique métier et utilitaires spécifiques
  /client              # Code côté client
  /server              # Code côté serveur
    /api               # Fonctions d'accès aux données
    /mapping           # Fonctions de transformation
    /supabase          # Configuration Supabase
  /hooks               # Hooks spécifiques à l'application
  /providers           # Providers React Context
/utils                 # Utilitaires génériques
  /conversion          # Conversion entre types
  /date                # Manipulation de dates
  /pagination          # Utilitaires de pagination
  /security            # Sécurité
  /slug                # Génération de slugs
  /storage             # Gestion du stockage
  /string              # Manipulation de chaînes
  /supabase            # Utilitaires Supabase
  /theme               # Thème et apparence
  /type-check          # Vérification de types
  /validation          # Validation de données
/types                 # Définitions de types TypeScript
  /database            # Types correspondant aux tables
  /models              # Types utilisés dans l'application
  /dto                 # Types pour les transferts de données
/public                # Fichiers statiques
/scripts               # Scripts utilitaires
\`\`\`

## Flux de Données

1. **Requête Client** : L'utilisateur interagit avec l'interface
2. **Composant React** : Capture l'interaction et appelle un hook ou une fonction
3. **Hook/Fonction** : Exécute la logique métier et appelle l'API si nécessaire
4. **API Client** : Envoie la requête au serveur
5. **API Route** : Traite la requête et interagit avec Supabase
6. **Mapping** : Convertit les données de la base de données en modèles d'application
7. **Réponse** : Les données sont renvoyées au client et affichées

## Authentification et Autorisation

- Authentification basée sur Supabase Auth
- Stratégie de session avec cookies
- Rôles utilisateur pour l'autorisation
- Middleware Next.js pour la protection des routes

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

## Conclusion

Cette architecture est conçue pour être modulaire, maintenable et évolutive. Elle suit les meilleures pratiques modernes de développement web et s'appuie sur des technologies éprouvées.
