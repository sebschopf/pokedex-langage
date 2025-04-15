
##  Updated api.md

# Documentation de l'API

## Introduction

L'API du projet Pokedex Langage de Programmation est construite sur Next.js API Routes, offrant une interface RESTful pour interagir avec la base de données Supabase. Cette documentation détaille les différents endpoints, leur fonctionnement, et les bonnes pratiques pour les utiliser.

## Architecture de l'API

L'API est organisée selon les principes suivants :

1. **Routes API Next.js** : Endpoints serverless dans `/app/api/`
2. **Server Actions** : Fonctions côté serveur dans `/app/actions/`
3. **Fonctions d'accès aux données** : Logique métier dans `/lib/server/api/`
4. **Fonctions de mapping** : Conversion des données dans `/lib/server/mapping/`
5. **Client Supabase** : Interaction avec la base de données via `/lib/server/supabase/`

## Structure des Endpoints

\`\`\`
/api
  /languages            # Gestion des langages de programmation
    /[id]               # Opérations sur un langage spécifique
      /frameworks       # Frameworks associés à un langage
    /slug/[slug]        # Récupération d'un langage par son slug
  /library              # Gestion des bibliothèques et frameworks
    /[id]               # Opérations sur une bibliothèque spécifique
  /proposals            # Propositions de nouveaux langages
    /[id]               # Opérations sur une proposition spécifique
  /corrections          # Corrections pour les langages existants
    /[id]               # Opérations sur une correction spécifique
  /revalidate           # Revalidation du cache Next.js
  /storage              # Gestion des fichiers stockés
    /[bucket]/[...path] # Accès aux fichiers dans un bucket
\`\`\`

## Server Actions

En plus des routes API, l'application utilise des Server Actions pour les opérations côté serveur :

\`\`\`
/app/actions
  /language-actions.ts  # Actions pour les langages
  /framework-actions.ts # Actions pour les frameworks
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
```json
{
  "data": [
    {
      "id": 1,
      "name": "JavaScript",
      "shortDescription": "...",
      "logoPath": "...",
      "slug": "javascript",
      "type": "Frontend",
      "usageRate": 85
    }
  ],
  "totalCount": 100,
  "page": 1,
  "pageSize": 10
}
```

#### GET /api/languages/[id]

Récupère les détails d'un langage spécifique.

**Paramètres de chemin :**

- `id` : ID du langage


**Réponse :**

```json
{
  "id": 1,
  "name": "JavaScript",
  "description": "...",
  "shortDescription": "...",
  "logoPath": "...",
  "slug": "javascript",
  "type": "Frontend",
  "usageRate": 85,
  "yearCreated": 1995,
  "creator": "Brendan Eich",
  "popularFrameworks": ["React", "Vue", "Angular"],
  "strengths": ["Versatile", "Ubiquitous", "Easy to learn"],
  "isOpenSource": true,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z",
  "githubUrl": "https://github.com/tc39/ecma262",
  "websiteUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
}
```

#### GET /api/languages/slug/[slug]

Récupère les détails d'un langage par son slug.

**Paramètres de chemin :**

- `slug` : Slug du langage


**Réponse :**
Identique à GET /api/languages/[id]

#### GET /api/languages/[id]/frameworks

Récupère les frameworks associés à un langage.

**Paramètres de chemin :**

- `id` : ID du langage


**Réponse :**

```json
[
  {
    "id": 1,
    "name": "React",
    "description": "...",
    "logoPath": "...",
    "languageId": 1,
    "technologyType": "framework",
    "websiteUrl": "https://reactjs.org",
    "githubUrl": "https://github.com/facebook/react"
  }
]
```

### Bibliothèques

#### GET /api/library

Récupère la liste des bibliothèques et frameworks.

**Paramètres de requête :**

- `page` (optionnel) : Numéro de page pour la pagination
- `pageSize` (optionnel) : Nombre d'éléments par page
- `search` (optionnel) : Terme de recherche
- `languageId` (optionnel) : Filtrer par langage
- `technologyType` (optionnel) : Filtrer par type de technologie


**Réponse :**

```json
{
  "data": [
    {
      "id": 1,
      "name": "React",
      "description": "...",
      "languageId": 1,
      "technologyType": "framework"
    }
  ],
  "totalCount": 50,
  "page": 1,
  "pageSize": 10
}
```

#### GET /api/library/[id]

Récupère les détails d'une bibliothèque spécifique.

**Paramètres de chemin :**

- `id` : ID de la bibliothèque


**Réponse :**

```json
{
  "id": 1,
  "name": "React",
  "description": "A JavaScript library for building user interfaces",
  "languageId": 1,
  "technologyType": "framework",
  "websiteUrl": "https://reactjs.org",
  "githubUrl": "https://github.com/facebook/react",
  "logoPath": "...",
  "isPopular": true,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z",
  "documentationUrl": "https://reactjs.org/docs/getting-started.html",
  "bestFor": "Building interactive UIs",
  "category": "UI",
  "stars": 200000,
  "lastRelease": "18.2.0",
  "license": "MIT"
}
```

### Corrections

#### POST /api/corrections

Soumet une correction pour un langage existant.

**Corps de la requête :**

```json
{
  "languageId": 1,
  "field": "description",
  "correctionText": "La description actuelle contient une erreur...",
  "suggestion": "Voici la description corrigée..."
}
```

**Réponse :**

```json
{
  "id": 456,
  "status": "pending",
  "message": "Correction soumise avec succès"
}
```

#### GET /api/corrections

Récupère la liste des corrections (admin uniquement).

**Réponse :**

```json
{
  "data": [
    {
      "id": 456,
      "languageId": 1,
      "field": "description",
      "correctionText": "...",
      "suggestion": "...",
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00Z",
      "userId": "user-123"
    }
  ],
  "totalCount": 20,
  "page": 1,
  "pageSize": 10
}
```

## Server Actions

### Langages

#### createLanguageAction

Crée un nouveau langage.

**Paramètres :**

- `formData` : FormData contenant les données du langage


**Exemple d'utilisation :**

```typescriptreact
<form action={createLanguageAction}>
  <input name="name" />
  <input name="type" />
  <input name="shortDescription" />
  {/* Autres champs */}
  <button type="submit">Créer</button>
</form>
```

**Réponse :**

```json
{
  "success": true,
  "message": "Langage créé avec succès",
  "data": {
    "id": 123,
    "name": "Nouveau Langage",
    "slug": "nouveau-langage",
    "type": "Programming"
  }
}
```

#### updateLanguageAction

Met à jour un langage existant.

**Paramètres :**

- `id` : ID du langage
- `formData` : FormData contenant les données à mettre à jour


**Exemple d'utilisation :**

```typescriptreact
<form action={async (formData) => {
  await updateLanguageAction("123", formData);
}}>
  <input name="name" />
  <input name="type" />
  {/* Autres champs */}
  <button type="submit">Mettre à jour</button>
</form>
```

**Réponse :**

```json
{
  "success": true,
  "message": "Langage mis à jour avec succès"
}
```

#### deleteLanguageAction

Supprime un langage.

**Paramètres :**

- `id` : ID du langage
- `logoUrl` (optionnel) : URL du logo à supprimer


**Exemple d'utilisation :**

```typescriptreact
<form action={async () => {
  await deleteLanguageAction("123", "https://example.com/logo.png");
}}>
  <button type="submit">Supprimer</button>
</form>
```

**Réponse :**

```json
{
  "success": true,
  "message": "Langage supprimé avec succès"
}
```

### Frameworks

#### createFrameworkAction

Crée un nouveau framework.

**Paramètres :**

- `formData` : FormData contenant les données du framework


**Exemple d'utilisation :**

```typescriptreact
<form action={createFrameworkAction}>
  <input name="name" />
  <input name="languageId" />
  <input name="description" />
  {/* Autres champs */}
  <button type="submit">Créer</button>
</form>
```

**Réponse :**

```json
{
  "success": true,
  "message": "Framework créé avec succès",
  "data": {
    "id": 456,
    "name": "Nouveau Framework",
    "languageId": 123
  }
}
```

## Implémentation Côté Serveur

Les endpoints API s'appuient sur des fonctions d'accès aux données dans `/lib/server/api/`. Voici quelques exemples :

### Exemple : Récupération des langages

```typescript
// lib/server/api/languages.ts
import { createServerSupabaseClient } from '@/lib/server/supabase/client';
import { dbToLanguage } from '@/lib/server/mapping/language-mapping';
import type { DbLanguage } from '@/types/database/language';
import type { Language } from '@/types/models/language';

export async function getLanguages(options = {}) {
  const { page = 1, pageSize = 10, search, category, subtype } = options;

  const supabase = createServerSupabaseClient();

  // Calculer l'offset pour la pagination
  const offset = (page - 1) * pageSize;

  // Construire la requête de base
  let query = supabase.from("languages").select("*", { count: "exact" });

  // Appliquer les filtres si nécessaire
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq("type", category);
  }

  if (subtype) {
    query = query.contains("subtypes", [subtype]);
  }

  // Exécuter la requête avec pagination
  const { data, error, count } = await query
    .range(offset, offset + pageSize - 1)
    .order("name");

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error);
    throw error;
  }

  // Convertir les données avec la fonction de mapping
  const mappedData = data ? data.map((item) => dbToLanguage(item as DbLanguage)) : [];

  return {
    data: mappedData,
    totalCount: count || 0,
    page,
    pageSize,
  };
}
```

## Gestion des Erreurs

L'API utilise un système standardisé de gestion des erreurs :

```typescript
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
```

## Authentification et Autorisation

L'API utilise Supabase Auth pour l'authentification et l'autorisation :

```typescript
// lib/server/auth/session.ts
import { createServerSupabaseClient } from '@/lib/server/supabase/client';
import { ApiError } from '@/lib/server/api/error-handling';

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
```

## Client API

Pour faciliter l'interaction avec l'API côté client, nous utilisons des fonctions dans `/lib/client/api.ts` :

```typescript
// lib/client/api.ts
import { withTokenRefresh } from './auth-helpers';
import type { Language } from '@/types/models/language';

export async function fetchLanguages() {
  return withTokenRefresh(async () => {
    const response = await fetch('/api/languages');
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la récupération des langages');
    }
    return await response.json();
  });
}

export async function fetchLanguageById(id: string) {
  return withTokenRefresh(async () => {
    const response = await fetch(`/api/languages/${id}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la récupération du langage');
    }
    return await response.json();
  });
}

export async function createLanguageClient(languageData: Partial<Language>) {
  return withTokenRefresh(async () => {
    const response = await fetch('/api/languages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(languageData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la création du langage');
    }

    return await response.json();
  });
}
```

## Bonnes Pratiques

1. **Utiliser les fonctions d'accès aux données** : Ne pas appeler Supabase directement depuis les routes API.
2. **Valider les entrées** : Toujours valider les données entrantes avant de les traiter.
3. **Gérer les erreurs** : Utiliser try/catch et renvoyer des réponses d'erreur appropriées.
4. **Mettre en cache** : Utiliser `cache()` pour les opérations de lecture fréquentes.
5. **Limiter les requêtes** : Implémenter la pagination pour les listes volumineuses.
6. **Sécuriser les endpoints** : Utiliser `requireAuth()` et `requireAdmin()` pour protéger les endpoints sensibles.
7. **Journaliser les actions** : Enregistrer les actions importantes pour le débogage et l'audit.
8. **Utiliser les Server Actions** : Pour les opérations de mutation, privilégier les Server Actions qui offrent une meilleure expérience utilisateur.


## Conclusion

Cette API fournit une interface complète pour interagir avec la base de données du projet. Elle est conçue pour être sécurisée, performante et facile à utiliser. Pour toute question ou problème, consultez les fichiers source ou contactez l'équipe de développement.