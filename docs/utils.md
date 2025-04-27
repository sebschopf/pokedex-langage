I'll update each of the documentation files to reflect the changes we've made to the codebase. Let me go through them one by one:

## 1. Updated table.md

### libraries

```plaintext
id                  integer         NOT NULL (PK)
name                varchar         NOT NULL
slug                varchar         NOT NULL
description         text
language_id         integer         NOT NULL (FK -> languages.id)
technology_type     varchar
website_url         varchar
github_url          varchar
logo_path           varchar
is_popular          boolean
created_at          timestamp
updated_at          timestamp
documentation_url   varchar
best_for            text
category            varchar
stars               integer
last_release        varchar
license             varchar
features            array
version             varchar
subtype             varchar
popularity          integer
is_open_source      boolean
```

### profiles

```plaintext
id                  uuid            NOT NULL (PK)
username            text
created_at          timestamp
updated_at          timestamp
avatar_url          text
full_name           text
bio                 text
website             text
email               text
is_verified         boolean
```

### user_roles

```plaintext
id                  uuid            NOT NULL (PK)
user_id             uuid            NOT NULL (FK -> auth.users.id)
role                user_role       NOT NULL (enum: admin, validator, verified, registered)
created_at          timestamp
updated_at          timestamp
```

### language_proposals

```plaintext
id                  integer         NOT NULL (PK)
name                varchar         NOT NULL
type                varchar
description         text
created_year        integer
creator             varchar
used_for            text
strengths           array
popular_frameworks  array
user_id             uuid
status              varchar         NOT NULL
created_at          timestamp
updated_at          timestamp
```

### corrections

```plaintext
id                  integer         NOT NULL (PK)
language_id         integer         NOT NULL (FK -> languages.id)
framework           text
correction_text     text            NOT NULL
status              text            NOT NULL
created_at          timestamp
updated_at          timestamp
field               varchar
suggestion          text
user_id             uuid
```

## Relations entre les Tables

1. **corrections.language_id** -> languages.id
2. **language_usage.language_id** -> languages.id
3. **language_usage.category_id** -> usage_categories.id
4. **libraries.language_id** -> languages.id
5. **library_languages.language_id** -> languages.id
6. **library_languages.library_id** -> libraries.id
7. **technology_subtypes.category_id** -> technology_categories.id
8. **todos.category_id** -> todo_categories.id
9. **todos.status_id** -> todo_status.id
10. **user_roles.user_id** -> auth.users.id

## Système de Rôles et Permissions

### Rôles Utilisateurs

- **admin** - Administrateur avec tous les droits
- **validator** - Validateur qui peut approuver/rejeter des propositions et corrections
- **verified** - Utilisateur vérifié
- **registered** - Utilisateur simplement enregistré
- **anonymous** - Utilisateur non connecté (implicite)

### Politiques d'Accès (RLS)

#### Table corrections

1. **Lecture**: Les utilisateurs peuvent voir leurs propres corrections; les admins et validateurs peuvent voir toutes les corrections
2. **Modification**: Seuls les admins et validateurs peuvent modifier les corrections
3. **Insertion**: Tout le monde peut soumettre des corrections

#### Table language_proposals

1. **Lecture**: Les utilisateurs peuvent voir leurs propres propositions; les admins et validateurs peuvent voir toutes les propositions
2. **Modification**: Seuls les admins et validateurs peuvent modifier les propositions
3. **Insertion**: Seuls les utilisateurs enregistrés peuvent proposer des langages
4. **Suppression**: Seuls les admins peuvent supprimer des propositions

#### Table languages

1. **Lecture**: Tout le monde peut lire les langages
2. **Insertion/Modification/Suppression**: Seuls les admins et validateurs peuvent gérer les langages

## Flux de Travail

### Proposition d'un Nouveau Langage

1. Un utilisateur enregistré soumet une proposition via la table language_proposals
2. Un validateur ou admin examine la proposition
3. Si approuvée, un admin ou validateur crée une entrée dans la table languages
4. Le statut de la proposition est mis à jour

### Correction d'un Langage Existant

1. N'importe quel utilisateur peut soumettre une correction via la table corrections
2. Un validateur ou admin examine la correction
3. Si approuvée, un admin ou validateur met à jour l'entrée correspondante dans la table languages
4. Le statut de la correction est mis à jour

## Fonctions de Mapping

Pour faciliter la conversion entre les types de base de données et les modèles d'application, nous utilisons des fonctions de mapping:

```typescript
// Exemple de fonction de mapping pour les langages
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    shortDescription: dbLanguage.short_description,
    type: dbLanguage.type,
    usedFor: dbLanguage.used_for,
    usageRate: dbLanguage.usage_rate,
    yearCreated: dbLanguage.year_created,
    popularFrameworks: dbLanguage.popular_frameworks || [],
    strengths: dbLanguage.strengths || [],
    isOpenSource: dbLanguage.is_open_source,
    createdAt: dbLanguage.created_at,
    updatedAt: dbLanguage.updated_at,
    creator: dbLanguage.creator,
    description: dbLanguage.description,
    logoPath: dbLanguage.logo_path,
    githubUrl: dbLanguage.github_url || null,
    websiteUrl: dbLanguage.website_url || null,
    // ...autres propriétés
  };
}

// Fonction inverse pour convertir un modèle en objet de base de données
export function languageToDb(language: Partial<Language>): Partial<DbLanguage> {
  const dbLanguage: Partial<DbLanguage> = {};

  if (language.id !== undefined) dbLanguage.id = language.id;
  if (language.name !== undefined) dbLanguage.name = language.name;
  if (language.slug !== undefined) dbLanguage.slug = language.slug;
  // ...autres propriétés

  return dbLanguage;
}
```

## Bonnes Pratiques pour l'Interaction avec la Base de Données

### Clients Supabase

#### Côté Serveur

```typescript
// lib/server/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  });
});
```

#### Côté Client

```typescript
// lib/client/supabase.ts
import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function createBrowserClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: 'supabase-auth',
      },
    },
  );

  return supabaseClient;
}
```

### Exemples d'Opérations Courantes

#### Récupérer les Langages

```typescript
// lib/server/api/languages.ts
export async function getLanguages(options = {}) {
  const { page = 1, pageSize = 10, search, category, subtype } = options;

  const supabase = createServerClient();

  let query = supabase.from('languages').select('*', { count: 'exact' });

  // Appliquer les filtres
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq('type', category);
  }

  // Pagination
  const offset = (page - 1) * pageSize;

  const { data, error, count } = await query.range(offset, offset + pageSize - 1).order('name');

  if (error) {
    console.error('Erreur lors de la récupération des langages:', error);
    throw error;
  }

  // Convertir les données avec la fonction de mapping
  const mappedData = data ? data.map(dbToLanguage) : [];

  return {
    data: mappedData,
    totalCount: count || 0,
    page,
    pageSize,
  };
}
```

#### Server Actions pour les Mutations

```typescript
// app/actions/language-actions.ts
'use server';

export async function createLanguageAction(formData: FormData) {
  try {
    const language = {
      name: formData.get('name') as string,
      // ...autres propriétés
      slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
    };

    const supabase = createServerClient();
    const dbData = languageToDb(language);

    const { data, error } = await supabase.from('languages').insert(dbData).select().single();

    if (error) {
      console.error('Erreur lors de la création du langage:', error);
      return {
        success: false,
        message: 'Erreur lors de la création du langage',
      };
    }

    // Revalider les chemins pour mettre à jour les données
    revalidatePath('/');
    revalidatePath('/admin/languages');

    return {
      success: true,
      message: 'Langage créé avec succès',
      data: dbToLanguage(data),
    };
  } catch (error) {
    console.error('Erreur lors de la création du langage:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de la création du langage',
    };
  }
}
```

## Conclusion

Cette documentation fournit une vue d'ensemble de la structure de la base de données du projet Pokedex Langage de Programmation, ainsi que des informations sur les relations entre les tables, les rôles utilisateurs, les politiques d'accès et les flux de travail. Pour des cas d'utilisation plus spécifiques ou des questions, n'hésitez pas à consulter l'équipe de développement.

````plaintext

## 2. Updated api.md

```markdown type="code" file="api.md"
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
````

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

  const supabase = createServerClient();

  // Calculer l'offset pour la pagination
  const offset = (page - 1) * pageSize;

  // Construire la requête de base
  let query = supabase.from('languages').select('*', { count: 'exact' });

  // Appliquer les filtres si nécessaire
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq('type', category);
  }

  if (subtype) {
    query = query.contains('subtypes', [subtype]);
  }

  // Exécuter la requête avec pagination
  const { data, error, count } = await query.range(offset, offset + pageSize - 1).order('name');

  if (error) {
    console.error('Erreur lors de la récupération des langages:', error);
    throw error;
  }

  // Convertir les données avec la fonction de mapping
  const mappedData = data ? data.map(item => dbToLanguage(item as DbLanguage)) : [];

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Une erreur inattendue est survenue' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

## Authentification et Autorisation

L'API utilise Supabase Auth pour l'authentification et l'autorisation :

```typescript
// lib/server/auth/session.ts
import { createServerSupabaseClient } from '@/lib/server/supabase/client';
import { ApiError } from '@/lib/server/api/error-handling';

export async function requireAuth() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new ApiError('Non authentifié', 401);
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  const supabase = createServerClient();

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

## 3. Updated react-query.md

```markdown file="react-query.md"
...
```

## Structure des hooks

Nous avons organisé nos hooks TanStack Query en deux catégories principales :

1. **Hooks de requête** (`hooks/use-queries.ts`) : Pour récupérer des données
2. **Hooks de mutation** (`hooks/use-mutations.ts`) : Pour modifier des données

### Clés de requête

Nous utilisons un système centralisé de clés de requête pour organiser notre cache :

```typescript
// hooks/query-keys.ts
export const QUERY_KEYS = {
  languages: 'languages',
  languageDetail: (id: string | number) => ['language', id.toString()],
  languageBySlug: (slug: string) => ['language', 'slug', slug],
  frameworks: (languageId: string | number) => ['frameworks', languageId.toString()],
  libraries: 'libraries',
  libraryDetail: (id: string | number) => ['library', id.toString()],
  corrections: 'corrections',
  correctionDetail: (id: string | number) => ['correction', id.toString()],
  proposals: 'proposals',
  proposalDetail: (id: string | number) => ['proposal', id.toString()],
  userProfile: (userId: string) => ['user', userId],
};
```

## Hooks de requête

### Exemple : Récupérer tous les langages

```typescript
// hooks/use-queries.ts
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { fetchLanguages } from '@/lib/client/api';
import type { Language } from '@/types/models/language';

export function useLanguages(options = {}) {
  return useQuery<{ data: Language[]; totalCount: number; page: number; pageSize: number }>({
    queryKey: [QUERY_KEYS.languages, options],
    queryFn: () => fetchLanguages(options),
  });
}
```

### Exemple : Récupérer un langage par son ID

```typescript
// hooks/use-queries.ts
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { fetchLanguageById } from '@/lib/client/api';
import type { Language } from '@/types/models/language';

export function useLanguage(id: string | number) {
  return useQuery<Language>({
    queryKey: [QUERY_KEYS.languageDetail(id)],
    queryFn: () => fetchLanguageById(id.toString()),
    enabled: !!id,
  });
}
```

### Utilisation dans un composant

```typescriptreact
// components/language-list.tsx
'use client'

import { useLanguages } from '@/hooks/use-queries'
import { LanguageCard } from './language-card'
import { Skeleton } from '@/components/ui/skeleton'

export function LanguageList() {
  const { data, isLoading, error } = useLanguages()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Erreur: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data.map(language => (
        <LanguageCard key={language.id} language={language} />
      ))}
    </div>
  )
}
```

## Hooks de mutation

### Exemple : Créer un nouveau langage

```typescript
// hooks/use-mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { createLanguageClient } from '@/lib/client/api';
import type { Language } from '@/types/models/language';

export function useCreateLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLanguage: Omit<Language, 'id'>) => createLanguageClient(newLanguage),
    onSuccess: () => {
      // Invalider la requête des langages pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
    },
  });
}
```

### Exemple : Mettre à jour un langage

```typescript
// hooks/use-mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { updateLanguageClient } from '@/lib/client/api';
import type { Language } from '@/types/models/language';

export function useUpdateLanguage(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedLanguage: Partial<Language>) =>
      updateLanguageClient(id.toString(), updatedLanguage),
    onSuccess: () => {
      // Invalider les requêtes concernées
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languageDetail(id)] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
    },
  });
}
```

### Utilisation dans un formulaire

```typescriptreact
// components/language-form.tsx
'use client'

import { useCreateLanguage } from '@/hooks/use-mutations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

export function LanguageForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    shortDescription: '',
  })

  const createLanguage = useCreateLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createLanguage.mutateAsync(formData)
      toast({
        title: 'Succès',
        description: 'Langage créé avec succès',
      })
      // Réinitialiser le formulaire
      setFormData({ name: '', type: '', shortDescription: '' })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Nom</label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <Input
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="shortDescription">Description courte</label>
        <Textarea
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          required
        />
      </div>
      <Button type="submit" disabled={createLanguage.isPending}>
        {createLanguage.isPending ? "Création..." : "Créer"}
      </Button>
    </form>
  )
}
```

## Intégration avec les Server Actions

Bien que TanStack Query soit excellent pour gérer les requêtes et mutations côté client, notre application utilise également des Server Actions pour certaines opérations. Voici comment les intégrer :

```typescriptreact
// components/language-form-with-server-action.tsx
'use client'

import { createLanguageAction } from '@/app/actions/language-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/hooks/query-keys'
import { useRef } from 'react'
import { toast } from '@/components/ui/use-toast'

export function LanguageFormWithServerAction() {
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()

  async function handleAction(formData: FormData) {
    const result = await createLanguageAction(formData)

    if (result.success) {
      toast({
        title: 'Succès',
        description: result.message,
      })
      // Réinitialiser le formulaire
      formRef.current?.reset()
      // Invalider les requêtes pour mettre à jour les données
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] })
    } else {
      toast({
        title: 'Erreur',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form ref={formRef} action={handleAction} className="space-y-4">
      <div>
        <label htmlFor="name">Nom</label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <Input id="type" name="type" required />
      </div>
      <div>
        <label htmlFor="shortDescription">Description courte</label>
        <Textarea id="shortDescription" name="shortDescription" required />
      </div>
      <Button type="submit">Créer</Button>
    </form>
  )
}
```

## Bonnes pratiques

### 1. Gestion des erreurs

Toujours gérer les erreurs dans les hooks et les composants :

```typescriptreact
const { data, isLoading, error } = useLanguages()

if (error) {
  return <ErrorComponent message={error.message} />
}
```

### 2. États de chargement

Toujours afficher un état de chargement pour améliorer l'expérience utilisateur :

```typescriptreact
const { isPending } = createLanguage

<Button disabled={isPending}>
  {isPending ? "Chargement..." : "Soumettre"}
</Button>
```

### 3. Invalidation du cache

Après une mutation, invalider les requêtes concernées :

```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
};
```

### 4. Optimistic Updates

Pour une meilleure UX, utiliser les mises à jour optimistes :

```typescript
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
```

### 5. Préchargement des données

Pour améliorer les performances, précharger les données qui seront probablement nécessaires :

```typescript
// Précharger les détails d'un langage au survol
const queryClient = useQueryClient();

function handleMouseEnter(id: string) {
  queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.languageDetail(id)],
    queryFn: () => fetchLanguageById(id),
  });
}
```

## Débogage

En développement, vous pouvez utiliser React Query Devtools pour inspecter l'état du cache et des requêtes. Les devtools sont automatiquement incluses en mode développement.

Pour les activer, ajoutez simplement :

```typescriptreact
<ReactQueryDevtools initialIsOpen={false} />
```

Cela vous permettra de voir toutes les requêtes, leur état, les données mises en cache, et plus encore.

## Ressources

- [Documentation officielle de TanStack Query](https://tanstack.com/query/latest/docs/react/overview)
- [Exemples de patterns avancés](https://tanstack.com/query/latest/docs/react/guides/advanced-patterns)
- [Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [Infinite Queries](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)

````plaintext

## 4. Updated utils.md

```markdown type="code" file="utils.md"
# Documentation des Utilitaires (Utils)

## Introduction

Le dossier `utils/` contient des fonctions utilitaires génériques qui peuvent être utilisées dans toute l'application. Ces utilitaires sont organisés en modules thématiques pour faciliter leur maintenance et leur utilisation.

## Structure

\`\`\`
/utils
 ┣ conversion          # Conversion entre différents types de données
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┣ null-undefined.ts # Gestion des valeurs null et undefined
 ┃ ┗ type-conversion.ts # Conversion entre types (string, number, boolean, etc.)
 ┣ formatting          # Formatage de données
 ┃ ┣ format-date.ts    # Fonctions de formatage de date
 ┃ ┣ get-image-name.ts # Extraction de noms de fichiers
 ┃ ┗ index.ts          # Point d'entrée du module
 ┣ date.ts             # Alias pour formatting/format-date.ts
 ┗ index.ts            # Point d'entrée principal qui exporte tous les modules
\`\`\`

## Modules

### 1. Conversion

Le module `conversion` fournit des fonctions pour convertir entre différents types de données.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `null-undefined.ts` : Gestion des valeurs null et undefined
- `type-conversion.ts` : Conversion entre types (string, number, boolean, etc.)

#### Fonctions principales
```typescript
// Conversion de types
toNumber(value: any): number
toNumberOrNull(value: any): number | null
toString(value: any): string
toStringOrNull(value: any): string | null
toBoolean(value: any): boolean
toBooleanOrNull(value: any): boolean | null
toArray<T>(value: any): T[]
toArrayOrNull<T>(value: any): T[] | null

// Gestion des valeurs null/undefined
nullToUndefined(value: any): any | undefined
undefinedToNull(value: any): any | null
nullToDefault<T>(value: T | null | undefined, defaultValue: T): T
````

#### Exemple d'utilisation

```typescript
import { toNumber, nullToDefault } from '@/utils/conversion';

const num = toNumber('123'); // 123
const value = nullToDefault(null, 'default'); // 'default'
```

### 2. Formatting

Le module `formatting` fournit des fonctions pour formater différents types de données.

#### Fichiers

- `index.ts` : Exporte toutes les fonctions du module
- `format-date.ts` : Fonctions de formatage de date
- `get-image-name.ts` : Extraction de noms de fichiers

#### Fonctions principales

```typescript
// Formatage de dates
formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string

// Extraction de noms de fichiers
getImageName(path: string): string
```

#### Exemple d'utilisation

```typescript
import { formatDate } from '@/utils/formatting';
import { getImageName } from '@/utils/formatting';

const formatted = formatDate(new Date(), { day: 'numeric', month: 'long', year: 'numeric' }); // '1 janvier 2023'
const imageName = getImageName('/images/logo.png'); // 'logo'
```

### 3. Date (Alias)

Le fichier `date.ts` est un alias pour `formatting/format-date.ts` pour faciliter l'importation des fonctions de formatage de date.

#### Exemple d'utilisation

```typescript
import { formatDate } from '@/utils/date';

const formatted = formatDate(new Date()); // '01/01/2023'
```

## Fonctions de Conversion

### toNumber

Convertit une valeur en nombre.

```typescript
/**
 * Convertit une valeur en nombre
 * @param value Valeur à convertir
 * @returns Nombre converti
 */
export function toNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}
```

### toString

Convertit une valeur en chaîne de caractères.

```typescript
/**
 * Convertit une valeur en chaîne de caractères
 * @param value Valeur à convertir
 * @returns Chaîne de caractères convertie
 */
export function toString(value: any): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}
```

### toBoolean

Convertit une valeur en booléen.

```typescript
/**
 * Convertit une valeur en booléen
 * @param value Valeur à convertir
 * @returns Booléen converti
 */
export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
}
```

### toArray

Convertit une valeur en tableau.

```typescript
/**
 * Convertit une valeur en tableau
 * @param value Valeur à convertir
 * @returns Tableau converti
 */
export function toArray<T>(value: any): T[] {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value] as T[];
}
```

## Fonctions de Formatage

### formatDate

Formate une date en chaîne de caractères lisible.

```typescript
/**
 * Formate une date en chaîne de caractères lisible
 * @param date Date à formater
 * @param options Options de formatage
 * @returns Date formatée
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Utiliser l'API Intl pour le formatage localisé
  return new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
}
```

### getImageName

Extrait le nom de fichier d'une URL ou d'un chemin d'image.

```typescript
/**
 * Extrait le nom de fichier d'une URL ou d'un chemin d'image
 * @param path Chemin ou URL de l'image
 * @returns Nom du fichier sans extension
 */
export function getImageName(path: string): string {
  if (!path) return '';

  // Extraire le nom de fichier du chemin
  const filename = path.split('/').pop() || '';

  // Supprimer l'extension
  return filename.split('.')[0];
}
```

## Bonnes Pratiques

### 1. Importation

Pour importer des fonctions utilitaires, utilisez l'une des approches suivantes :

#### Importation directe d'une fonction spécifique

```typescript
import { toNumber } from '@/utils/conversion';
// ou
import { toNumber } from '@/utils';
```

#### Importation d'un module entier

```typescript
import * as ConversionUtils from '@/utils/conversion';
// ou
import { Conversion } from '@/utils';
```

### 2. Création de nouvelles fonctions utilitaires

Lorsque vous créez une nouvelle fonction utilitaire :

1. **Identifiez le module approprié** : Placez la fonction dans le module thématique correspondant.
2. **Créez un nouveau module si nécessaire** : Si la fonction ne correspond à aucun module existant, créez un nouveau module.
3. **Exportez depuis index.ts** : Assurez-vous d'exporter la fonction depuis le fichier index.ts du module.
4. **Ajoutez au fichier principal** : Ajoutez l'exportation au fichier utils/index.ts principal si nécessaire.

### 3. Tests

Chaque fonction utilitaire devrait être accompagnée de tests unitaires pour garantir son bon fonctionnement.

### 4. Documentation

Documentez chaque fonction avec des commentaires JSDoc pour faciliter son utilisation :

```typescript
/**
 * Convertit une valeur en nombre.
 * @param value - La valeur à convertir
 * @param defaultValue - Valeur par défaut si la conversion échoue
 * @returns Le nombre converti ou la valeur par défaut
 */
export function toNumber(value: any, defaultValue: number = 0): number {
  // Implémentation
}
```

## Utilisation avec les Fonctions de Mapping

Les utilitaires de conversion sont particulièrement utiles avec les fonctions de mapping pour convertir entre les types de base de données et les modèles d'application :

```typescript
// lib/server/mapping/language-mapping.ts
import { toNumber, toString, toBoolean, toArray } from '@/utils/conversion';

export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: toNumber(dbLanguage.id),
    name: toString(dbLanguage.name),
    slug: toString(dbLanguage.slug),
    shortDescription: dbLanguage.short_description || null,
    type: dbLanguage.type || null,
    usedFor: dbLanguage.used_for || null,
    usageRate: toNumber(dbLanguage.usage_rate),
    yearCreated: toNumber(dbLanguage.year_created),
    popularFrameworks: toArray(dbLanguage.popular_frameworks),
    strengths: toArray(dbLanguage.strengths),
    isOpenSource: toBoolean(dbLanguage.is_open_source),
    // ...autres propriétés
  };
}
```

## Conclusion

Le dossier `utils/` fournit un ensemble complet de fonctions utilitaires organisées de manière modulaire. Cette organisation facilite la maintenance, la réutilisation et l'extension des fonctionnalités. Utilisez ces utilitaires pour éviter de réinventer la roue et maintenir la cohérence dans toute l'application.

Pour toute question ou suggestion d'amélioration, n'hésitez pas à contacter l'équipe de développement.
