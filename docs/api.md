# Documentation de l'API - Pokedex des Langages de Programmation

## Introduction

L'API du projet Pokedex des Langages de Programmation est construite sur deux mécanismes principaux :

1. **API Routes Next.js** : Endpoints RESTful dans `/app/api/`
2. **Server Actions** : Fonctions côté serveur dans `/app/actions/`

Cette documentation détaille les différents endpoints, leurs paramètres, les réponses attendues et des exemples d'utilisation.

## Table des matières

1. [Structure générale](#structure-générale)
2. [API Routes](#api-routes)
   - [Langages](#langages)
   - [Bibliothèques](#bibliothèques)
   - [Outils](#outils)
   - [Frameworks](#frameworks)
   - [Corrections](#corrections)
   - [Revalidation](#revalidation)
3. [Server Actions](#server-actions)
   - [Actions pour les langages](#actions-pour-les-langages)
   - [Actions pour les bibliothèques](#actions-pour-les-bibliothèques)
   - [Actions pour les frameworks](#actions-pour-les-frameworks)
   - [Actions pour les corrections](#actions-pour-les-corrections)
   - [Actions pour les tâches](#actions-pour-les-tâches)
4. [Gestion des erreurs](#gestion-des-erreurs)
5. [Authentification et autorisation](#authentification-et-autorisation)
6. [Bonnes pratiques](#bonnes-pratiques)

## Structure générale

### Organisation des API Routes

\`\`\`
/api
/languages # Gestion des langages de programmation
/[id] # Opérations sur un langage spécifique
/frameworks # Frameworks associés à un langage
/slug/[slug] # Récupération d'un langage par son slug
/libraries # Gestion des bibliothèques
/[id] # Opérations sur une bibliothèque spécifique
/tools # Gestion des outils d'analyse
/[id]/languages # Gestion des langages associés à un outil
/proposals # Propositions de nouveaux langages
/[id] # Opérations sur une proposition spécifique
/corrections # Corrections pour les langages existants
/[id] # Opérations sur une correction spécifique
/revalidate # Revalidation du cache Next.js
\`\`\`

### Organisation des Server Actions

\`\`\`
/app/actions
/language-actions.ts # Actions pour les langages
/library-actions.ts # Actions pour les bibliothèques
/framework-actions.ts # Actions pour les frameworks
/correction-actions.ts # Actions pour les corrections
/todo-actions.ts # Actions pour les tâches
\`\`\`

## API Routes

### Langages

#### GET /api/languages

Récupère la liste des langages de programmation avec pagination et filtres.

**Paramètres de requête**

- `page` (optionnel) : Numéro de page (défaut: 1)
- `pageSize` (optionnel) : Nombre d'éléments par page (défaut: 10)
- `search` (optionnel) : Terme de recherche
- `type` (optionnel) : Filtrer par type de langage
- `openSource` (optionnel) : Filtrer par statut open source (true/false)
- `usageMin` (optionnel) : Taux d'utilisation minimum
- `sort` (optionnel) : Tri des résultats (name, usage, year)

**Réponse**
\`\`\`json
{
"data": [
{
"id": 1,
"name": "JavaScript",
"slug": "javascript",
"shortDescription": "Langage de programmation de scripts",
"type": "Dynamically typed",
"usageRate": 95,
"isOpenSource": true,
// autres propriétés
},
// autres langages
],
"totalCount": 100,
"page": 1,
"pageSize": 10,
"totalPages": 10
}
\`\`\`

**Exemple de requête**
\`\`\`javascript
// Récupérer les langages open source avec un taux d'utilisation > 50
fetch('/api/languages?openSource=true&usageMin=50&sort=usage')
.then(response => response.json())
.then(data => console.log(data));
\`\`\`

#### GET /api/languages/[id]

Récupère les détails d'un langage spécifique par son ID.

**Paramètres de chemin**

- `id` : ID du langage

**Réponse**
\`\`\`json
{
"id": 1,
"name": "JavaScript",
"slug": "javascript",
"shortDescription": "Langage de programmation de scripts",
"type": "Dynamically typed",
"usageRate": 95,
"isOpenSource": true,
// autres propriétés
}
\`\`\`

#### GET /api/languages/slug/[slug]

Récupère les détails d'un langage spécifique par son slug.

**Paramètres de chemin**

- `slug` : Slug du langage

**Réponse**
Identique à GET /api/languages/[id]

#### POST /api/languages

Crée un nouveau langage.

**Corps de la requête**
\`\`\`json
{
"name": "Rust",
"slug": "rust",
"shortDescription": "Langage système performant et sûr",
"type": "Statically typed",
"usageRate": 78,
"isOpenSource": true,
// autres propriétés
}
\`\`\`

**Réponse**
\`\`\`json
{
"id": 10,
"name": "Rust",
"slug": "rust",
"shortDescription": "Langage système performant et sûr",
"type": "Statically typed",
"usageRate": 78,
"isOpenSource": true,
// autres propriétés
}
\`\`\`

**Autorisation requise** : Rôle "verified" ou supérieur

#### PUT /api/languages/[id]

Met à jour un langage existant.

**Paramètres de chemin**

- `id` : ID du langage

**Corps de la requête**
\`\`\`json
{
"name": "Rust",
"shortDescription": "Langage système performant, sûr et concurrent",
// propriétés à mettre à jour
}
\`\`\`

**Réponse**
\`\`\`json
{
"id": 10,
"name": "Rust",
"slug": "rust",
"shortDescription": "Langage système performant, sûr et concurrent",
// autres propriétés
}
\`\`\`

**Autorisation requise** : Rôle "validator" ou supérieur

#### DELETE /api/languages/[id]

Supprime un langage.

**Paramètres de chemin**

- `id` : ID du langage

**Réponse**
\`\`\`json
{
"success": true,
"message": "Langage supprimé avec succès"
}
\`\`\`

**Autorisation requise** : Rôle "admin"

### Bibliothèques

#### GET /api/libraries

Récupère la liste des bibliothèques avec pagination et filtres.

**Paramètres de requête**

- `page` (optionnel) : Numéro de page (défaut: 1)
- `pageSize` (optionnel) : Nombre d'éléments par page (défaut: 20)
- `search` (optionnel) : Terme de recherche
- `languageId` (optionnel) : Filtrer par ID de langage
- `technologyType` (optionnel) : Filtrer par type de technologie
- `sort` (optionnel) : Tri des résultats

**Réponse**
\`\`\`json
{
"data": [
{
"id": 1,
"name": "React",
"slug": "react",
"languageId": 1,
"description": "Bibliothèque JavaScript pour construire des interfaces utilisateur",
"isOpenSource": true,
// autres propriétés
},
// autres bibliothèques
],
"totalCount": 50,
"page": 1,
"pageSize": 20,
"totalPages": 3
}
\`\`\`

#### POST /api/libraries

Crée une nouvelle bibliothèque.

**Corps de la requête**
\`\`\`json
{
"name": "Vue.js",
"slug": "vue-js",
"languageId": 1,
"description": "Framework JavaScript progressif pour construire des interfaces utilisateur",
"isOpenSource": true,
// autres propriétés
}
\`\`\`

**Réponse**
\`\`\`json
{
"id": 5,
"name": "Vue.js",
"slug": "vue-js",
"languageId": 1,
"description": "Framework JavaScript progressif pour construire des interfaces utilisateur",
"isOpenSource": true,
// autres propriétés
}
\`\`\`

**Autorisation requise** : Rôle "verified" ou supérieur

### Outils

#### GET /api/tools/[id]/languages

Récupère les langages associés à un outil spécifique.

**Paramètres de chemin**

- `id` : ID de l'outil

**Réponse**
\`\`\`json
[
{
"language_id": 1,
"primary_language": true,
"languages": {
"id": 1,
"name": "JavaScript",
"slug": "javascript",
"logo_path": "/images/javascript.png"
}
},
// autres langages associés
]
\`\`\`

#### POST /api/tools/[id]/languages

Ajoute ou met à jour une association entre un outil et un langage.

**Paramètres de chemin**

- `id` : ID de l'outil

**Corps de la requête**
\`\`\`json
{
"languageId": 2,
"isPrimary": true
}
\`\`\`

**Réponse**
\`\`\`json
{
"message": "Association mise à jour avec succès"
}
\`\`\`

**Autorisation requise** : Rôle "validator" ou supérieur

#### DELETE /api/tools/[id]/languages

Supprime une association entre un outil et un langage.

**Paramètres de chemin**

- `id` : ID de l'outil

**Paramètres de requête**

- `languageId` : ID du langage à dissocier

**Réponse**
\`\`\`json
{
"message": "Association supprimée avec succès"
}
\`\`\`

**Autorisation requise** : Rôle "validator" ou supérieur

### Frameworks

#### GET /api/frameworks

Récupère la liste des frameworks associés à un langage.

**Paramètres de requête**

- `languageId` : ID du langage

**Réponse**
\`\`\`json
[
{
"id": 1,
"name": "React",
"slug": "react",
"description": "Bibliothèque JavaScript pour construire des interfaces utilisateur",
// autres propriétés
},
// autres frameworks
]
\`\`\`

### Corrections

#### GET /api/corrections

Récupère la liste des corrections proposées.

**Paramètres de requête**

- `status` (optionnel) : Filtrer par statut (pending, approved, rejected)
- `languageId` (optionnel) : Filtrer par ID de langage
- `userId` (optionnel) : Filtrer par ID d'utilisateur

**Réponse**
\`\`\`json
[
{
"id": 1,
"languageId": 1,
"field": "shortDescription",
"suggestion": "Langage de programmation de scripts côté client et serveur",
"type": "language",
"status": "pending",
"createdAt": "2023-01-01T00:00:00Z",
// autres propriétés
},
// autres corrections
]
\`\`\`

**Autorisation requise** : Rôle "registered" pour voir ses propres corrections, "validator" pour voir toutes les corrections

#### POST /api/corrections

Soumet une nouvelle correction.

**Corps de la requête**
\`\`\`json
{
"languageId": 1,
"field": "shortDescription",
"suggestion": "Langage de programmation de scripts côté client et serveur",
"type": "language"
}
\`\`\`

**Réponse**
\`\`\`json
{
"id": 1,
"languageId": 1,
"field": "shortDescription",
"suggestion": "Langage de programmation de scripts côté client et serveur",
"type": "language",
"status": "pending",
"createdAt": "2023-01-01T00:00:00Z",
// autres propriétés
}
\`\`\`

**Autorisation requise** : Rôle "registered" ou supérieur

### Revalidation

#### POST /api/revalidate

Revalide le cache Next.js pour les chemins spécifiés.

**Corps de la requête**
\`\`\`json
{
"paths": ["/", "/languages/javascript"],
"secret": "REVALIDATE_SECRET"
}
\`\`\`

**Réponse**
\`\`\`json
{
"revalidated": true,
"message": "Chemins revalidés avec succès"
}
\`\`\`

**Autorisation requise** : Secret de revalidation valide

## Server Actions

Les Server Actions sont des fonctions côté serveur qui peuvent être appelées directement depuis les composants React. Elles sont définies avec la directive `"use server"` et permettent de réaliser des mutations de données de manière sécurisée.

### Actions pour les langages

#### createLanguageAction

Crée un nouveau langage.

**Signature**
\`\`\`typescript
export async function createLanguageAction(formData: FormData): Promise<{
success: boolean;
message: string;
data?: Language;
}>
\`\`\`

**Paramètres**

- `formData` : Données du formulaire contenant les informations du langage

**Exemple d'utilisation**
\`\`\`typescript
// Dans un composant client
"use client";
import { createLanguageAction } from "@/app/actions/language-actions";

export default function CreateLanguageForm() {
const handleSubmit = async (e) => {
e.preventDefault();
const formData = new FormData(e.target);
const result = await createLanguageAction(formData);

    if (result.success) {
      // Traitement en cas de succès
    } else {
      // Traitement en cas d'erreur
    }

};

return (

<form onSubmit={handleSubmit}>
{/_ Champs du formulaire _/}
</form>
);
}
\`\`\`

#### updateLanguageAction

Met à jour un langage existant.

**Signature**
\`\`\`typescript
export async function updateLanguageAction(id: string, formData: FormData): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID du langage à mettre à jour
- `formData` : Données du formulaire contenant les informations à mettre à jour

#### deleteLanguageAction

Supprime un langage.

**Signature**
\`\`\`typescript
export async function deleteLanguageAction(id: string, logoUrl?: string): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID du langage à supprimer
- `logoUrl` (optionnel) : URL du logo à supprimer du stockage

### Actions pour les bibliothèques

#### createLibraryAction

Crée une nouvelle bibliothèque.

**Signature**
\`\`\`typescript
export async function createLibraryAction(formData: FormData): Promise<{
success: boolean;
message: string;
data?: Library;
}>
\`\`\`

**Paramètres**

- `formData` : Données du formulaire contenant les informations de la bibliothèque

#### updateLibraryAction

Met à jour une bibliothèque existante.

**Signature**
\`\`\`typescript
export async function updateLibraryAction(id: string, formData: FormData): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID de la bibliothèque à mettre à jour
- `formData` : Données du formulaire contenant les informations à mettre à jour

#### deleteLibraryAction

Supprime une bibliothèque.

**Signature**
\`\`\`typescript
export async function deleteLibraryAction(id: string, logoUrl?: string): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID de la bibliothèque à supprimer
- `logoUrl` (optionnel) : URL du logo à supprimer du stockage

### Actions pour les frameworks

#### createFrameworkAction

Crée un nouveau framework.

**Signature**
\`\`\`typescript
export async function createFrameworkAction(formData: FormData): Promise<{
success: boolean;
message: string;
data?: Library;
}>
\`\`\`

**Paramètres**

- `formData` : Données du formulaire contenant les informations du framework

#### updateFrameworkAction

Met à jour un framework existant.

**Signature**
\`\`\`typescript
export async function updateFrameworkAction(id: number, formData: FormData): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID du framework à mettre à jour
- `formData` : Données du formulaire contenant les informations à mettre à jour

#### deleteFrameworkAction

Supprime un framework.

**Signature**
\`\`\`typescript
export async function deleteFrameworkAction(id: number, languageSlug: string): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID du framework à supprimer
- `languageSlug` : Slug du langage associé (pour la revalidation)

### Actions pour les corrections

#### submitCorrection

Soumet une nouvelle correction.

**Signature**
\`\`\`typescript
export async function submitCorrection(params: CorrectionParams): Promise<{
success: boolean;
}>
\`\`\`

**Paramètres**
\`\`\`typescript
type CorrectionParams = {
languageId: number;
field: string;
suggestion: string;
type: "language" | "framework";
frameworkName?: string;
}
\`\`\`

### Actions pour les tâches

#### createTodo

Crée une nouvelle tâche.

**Signature**
\`\`\`typescript
export async function createTodo(todo: Todo): Promise<{
success: boolean;
message: string;
data?: Todo;
}>
\`\`\`

**Paramètres**

- `todo` : Données de la tâche à créer

#### updateTodo

Met à jour une tâche existante.

**Signature**
\`\`\`typescript
export async function updateTodo(id: number, todo: Partial<Todo>): Promise<{
success: boolean;
message: string;
data?: Todo;
}>
\`\`\`

**Paramètres**

- `id` : ID de la tâche à mettre à jour
- `todo` : Données partielles de la tâche à mettre à jour

#### deleteTodo

Supprime une tâche.

**Signature**
\`\`\`typescript
export async function deleteTodo(id: number): Promise<{
success: boolean;
message: string;
}>
\`\`\`

**Paramètres**

- `id` : ID de la tâche à supprimer

#### completeTodo

Marque une tâche comme terminée.

**Signature**
\`\`\`typescript
export async function completeTodo(id: number): Promise<{
success: boolean;
message: string;
data?: Todo;
}>
\`\`\`

**Paramètres**

- `id` : ID de la tâche à marquer comme terminée

## Gestion des erreurs

L'API utilise un système standardisé de gestion des erreurs :

\`\`\`typescript
// lib/server/api/error-handling.ts
export class ApiError extends Error {
statusCode: number;

constructor(message: string, statusCode: number = 500) {
super(message);
this.statusCode = statusCode;
this.name = 'ApiError';
}
}

export function handleApiError(error: unknown) {
console.error('API Error:', error);

if (error instanceof ApiError) {
return new Response(
JSON.stringify({ error: error.message }),
{ status: error.statusCode, headers: { 'Content-Type': 'application/json' } }
);
}

return new Response(
JSON.stringify({ error: 'Une erreur inattendue est survenue' }),
{ status: 500, headers: { 'Content-Type': 'application/json' } }
);
}
\`\`\`

### Codes d'erreur courants

- `400 Bad Request` : Requête invalide (paramètres manquants, format incorrect)
- `401 Unauthorized` : Authentification requise
- `403 Forbidden` : Authentifié mais non autorisé
- `404 Not Found` : Ressource non trouvée
- `409 Conflict` : Conflit (ex: slug déjà utilisé)
- `500 Internal Server Error` : Erreur serveur

## Authentification et autorisation

L'API utilise Supabase Auth pour l'authentification et un système de rôles personnalisé pour l'autorisation.

### Vérification d'authentification

\`\`\`typescript
// lib/server/auth/session.ts
export async function requireAuth() {
const supabase = createServerSupabaseClient();
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
throw new ApiError('Non authentifié', 401);
}

return session;
}
\`\`\`

### Vérification de rôle

\`\`\`typescript
// lib/server/auth/session.ts
export async function requireAdmin() {
const session = await requireAuth();
const supabase = createServerSupabaseClient();

const { data, error } = await supabase
.from('user_roles')
.select('role')
.eq('user_id', session.user.id)
.single();

if (error || !data || data.role !== 'admin') {
throw new ApiError('Accès non autorisé', 403);
}

return session;
}
\`\`\`

## Bonnes pratiques

### 1. Gestion des erreurs

Toujours gérer les erreurs dans les hooks et les composants :

\`\`\`typescript
const { data, isLoading, error } = useLanguages()

if (error) {
return <ErrorComponent message={error.message} />
}
\`\`\`

### 2. États de chargement

Toujours afficher un état de chargement pour améliorer l'expérience utilisateur :

\`\`\`typescript
const { isPending } = createLanguage

<Button disabled={isPending}>
  {isPending ? "Chargement..." : "Soumettre"}
</Button>
\`\`\`

### 3. Invalidation du cache

Après une mutation, invalider les requêtes concernées :

\`\`\`typescript
onSuccess: () => {
queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] })
}
\`\`\`

### 4. Optimistic Updates

Pour une meilleure UX, utiliser les mises à jour optimistes :

\`\`\`typescript
onMutate: async (newTodo) => {
// Annuler les requêtes en cours
await queryClient.cancelQueries({ queryKey: ['todos'] })

// Sauvegarder l'état précédent
const previousTodos = queryClient.getQueryData(['todos'])

// Mettre à jour le cache de manière optimiste
queryClient.setQueryData(['todos'], old => [...old, newTodo])

// Retourner le contexte avec l'état précédent
return { previousTodos }
},
onError: (err, newTodo, context) => {
// En cas d'erreur, restaurer l'état précédent
queryClient.setQueryData(['todos'], context.previousTodos)
}
\`\`\`

### 5. Préchargement des données

Pour améliorer les performances, précharger les données qui seront probablement nécessaires :

\`\`\`typescript
// Précharger les détails d'un langage au survol
const queryClient = useQueryClient()

function handleMouseEnter(id: string) {
queryClient.prefetchQuery({
queryKey: [QUERY_KEYS.languageDetail(id)],
queryFn: () => fetchLanguageById(id),
})
}
