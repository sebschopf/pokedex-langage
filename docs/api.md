# Documentation de l'API

## Introduction

L'API du projet Pokedex Langage de Programmation est construite sur Next.js API Routes, offrant une interface RESTful pour interagir avec la base de données Supabase. Cette documentation détaille les différents endpoints, leur fonctionnement, et les bonnes pratiques pour les utiliser.

## Architecture de l'API

L'API est organisée selon les principes suivants :

1. **Routes API Next.js** : Endpoints serverless dans `/app/api/`
2. **Fonctions d'accès aux données** : Logique métier dans `/lib/server/api/`
3. **Fonctions de mapping** : Conversion des données dans `/lib/server/mapping/`
4. **Client Supabase** : Interaction avec la base de données via `/lib/server/supabase/`

## Structure des Endpoints

\`\`\`
/api
  /languages            # Gestion des langages de programmation
    /[id]               # Opérations sur un langage spécifique
      /frameworks       # Frameworks associés à un langage
  /proposals            # Propositions de nouveaux langages
    /[id]               # Opérations sur une proposition spécifique
  /corrections          # Corrections pour les langages existants
    /[id]               # Opérations sur une correction spécifique
  /suggestions          # Suggestions des utilisateurs
  /revalidate           # Revalidation du cache Next.js
  /storage              # Gestion des fichiers stockés
    /[bucket]/[...path] # Accès aux fichiers dans un bucket
  /seed-user-todo       # Initialisation des todos utilisateur
\`\`\`

## Endpoints Principaux

### Langages

#### GET /api/languages

Récupère la liste des langages de programmation.

**Paramètres de requête :**
- `page` (optionnel) : Numéro de page pour la pagination
- `pageSize` (optionnel) : Nombre d'éléments par page
- `search` (optionnel) : Terme de recherche
- `category` (optionnel) : Filtrer par catégorie
- `subtype` (optionnel) : Filtrer par sous-type

**Réponse :**
\`\`\`json
{
  "data": [
    {
      "id": 1,
      "name": "JavaScript",
      "description": "...",
      "logoUrl": "...",
      "slug": "javascript",
      "subtypes": ["Frontend", "Backend"],
      "category": "Programming"
    }
  ],
  "totalCount": 100,
  "page": 1,
  "pageSize": 10
}
\`\`\`

#### GET /api/languages/[id]

Récupère les détails d'un langage spécifique.

**Paramètres de chemin :**
- `id` : ID du langage

**Réponse :**
\`\`\`json
{
  "id": 1,
  "name": "JavaScript",
  "description": "...",
  "logoUrl": "...",
  "slug": "javascript",
  "subtypes": ["Frontend", "Backend"],
  "category": "Programming",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z",
  "usageCategories": [...]
}
\`\`\`

#### GET /api/languages/[id]/frameworks

Récupère les frameworks associés à un langage.

**Paramètres de chemin :**
- `id` : ID du langage

**Réponse :**
\`\`\`json
{
  "data": [
    {
      "id": 1,
      "name": "React",
      "description": "...",
      "logoUrl": "...",
      "languageId": 1
    }
  ]
}
\`\`\`

### Propositions

#### POST /api/proposals

Soumet une proposition pour un nouveau langage.

**Corps de la requête :**
\`\`\`json
{
  "name": "Nouveau Langage",
  "description": "Description du langage",
  "category": "Programming",
  "subtypes": [1, 2],
  "usageCategories": [1, 3]
}
\`\`\`

**Réponse :**
\`\`\`json
{
  "id": 123,
  "status": "pending",
  "message": "Proposition soumise avec succès"
}
\`\`\`

#### GET /api/proposals

Récupère la liste des propositions (admin uniquement).

**Réponse :**
\`\`\`json
{
  "data": [
    {
      "id": 123,
      "name": "Nouveau Langage",
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00Z",
      "userId": "user-123"
    }
  ]
}
\`\`\`

#### PUT /api/proposals/[id]

Met à jour le statut d'une proposition (admin uniquement).

**Paramètres de chemin :**
- `id` : ID de la proposition

**Corps de la requête :**
\`\`\`json
{
  "status": "approved",
  "message": "Proposition approuvée"
}
\`\`\`

**Réponse :**
\`\`\`json
{
  "success": true,
  "message": "Statut mis à jour"
}
\`\`\`

### Corrections

#### POST /api/corrections

Soumet une correction pour un langage existant.

**Corps de la requête :**
\`\`\`json
{
  "languageId": 1,
  "field": "description",
  "currentValue": "...",
  "proposedValue": "...",
  "reason": "Correction d'une erreur factuelle"
}
\`\`\`

**Réponse :**
\`\`\`json
{
  "id": 456,
  "status": "pending",
  "message": "Correction soumise avec succès"
}
\`\`\`

#### GET /api/corrections

Récupère la liste des corrections (admin uniquement).

**Réponse :**
\`\`\`json
{
  "data": [
    {
      "id": 456,
      "languageId": 1,
      "field": "description",
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00Z",
      "userId": "user-123"
    }
  ]
}
\`\`\`

### Stockage

#### GET /api/storage/[bucket]/[...path]

Récupère un fichier du stockage Supabase.

**Paramètres de chemin :**
- `bucket` : Nom du bucket
- `path` : Chemin du fichier

**Réponse :**
Le fichier demandé avec les en-têtes appropriés.

#### POST /api/storage/[bucket]/[...path]

Télécharge un fichier vers le stockage Supabase.

**Paramètres de chemin :**
- `bucket` : Nom du bucket
- `path` : Chemin du fichier

**Corps de la requête :**
Données du fichier en multipart/form-data.

**Réponse :**
\`\`\`json
{
  "path": "logos/javascript.png",
  "url": "https://..."
}
\`\`\`

### Revalidation

#### POST /api/revalidate

Revalide le cache Next.js pour les pages spécifiées.

**Corps de la requête :**
\`\`\`json
{
  "paths": ["/", "/language/javascript"],
  "secret": "votre-secret-de-revalidation"
}
\`\`\`

**Réponse :**
\`\`\`json
{
  "revalidated": true,
  "message": "Revalidation déclenchée"
}
\`\`\`

## Implémentation Côté Serveur

Les endpoints API s'appuient sur des fonctions d'accès aux données dans `/lib/server/api/`. Voici quelques exemples :

### Exemple : Récupération des langages

\`\`\`typescript
// lib/server/api/languages.ts
import { createServerSupabaseClient } from '@/lib/server/supabase';
import { dbToLanguage } from '@/lib/server/mapping/language-mapping';
import { cache } from 'react';

export const getLanguages = cache(async (options = {}) => {
  const { page = 1, pageSize = 10, search, category, subtype } = options;
  const supabase = createServerSupabaseClient();
  
  let query = supabase
    .from('languages')
    .select('*, technology_subtypes(*)');
  
  // Appliquer les filtres
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  if (category) {
    query = query.eq('category_id', category);
  }
  
  // Pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  const { data, error, count } = await query
    .range(from, to)
    .order('name')
    .returns<DbLanguage[]>();
  
  if (error) {
    console.error('Error fetching languages:', error);
    return { data: [], totalCount: 0, page, pageSize };
  }
  
  // Mapper les données
  const languages = data.map(dbToLanguage);
  
  return {
    data: languages,
    totalCount: count || 0,
    page,
    pageSize
  };
});
\`\`\`

## Gestion des Erreurs

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

## Authentification et Autorisation

L'API utilise Supabase Auth pour l'authentification et l'autorisation :

\`\`\`typescript
// lib/server/auth/session.ts
import { createServerSupabaseClient } from '@/lib/server/supabase';

export async function requireAuth() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new ApiError('Non authentifié', 401);
  }
  
  return session;
}

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

## Bonnes Pratiques

1. **Utiliser les fonctions d'accès aux données** : Ne pas appeler Supabase directement depuis les routes API.
2. **Valider les entrées** : Toujours valider les données entrantes avant de les traiter.
3. **Gérer les erreurs** : Utiliser try/catch et renvoyer des réponses d'erreur appropriées.
4. **Mettre en cache** : Utiliser `cache()` pour les opérations de lecture fréquentes.
5. **Limiter les requêtes** : Implémenter la pagination pour les listes volumineuses.
6. **Sécuriser les endpoints** : Utiliser `requireAuth()` et `requireAdmin()` pour protéger les endpoints sensibles.
7. **Journaliser les actions** : Enregistrer les actions importantes pour le débogage et l'audit.

## Conclusion

Cette API fournit une interface complète pour interagir avec la base de données du projet. Elle est conçue pour être sécurisée, performante et facile à utiliser. Pour toute question ou problème, consultez les fichiers source ou contactez l'équipe de développement.
