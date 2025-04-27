I'll update each of the documentation files to reflect the changes we've made to the codebase. Let me go through them one by one:

## 1. Updated table.md

```markdown file="table.md"
...
```

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
