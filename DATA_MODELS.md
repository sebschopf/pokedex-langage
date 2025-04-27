# Modèles de Données - Pokedex des Langages de Programmation

Ce document détaille les modèles de données utilisés dans le projet "Pokedex des Langages de Programmation", incluant les schémas de base de données et les types TypeScript correspondants.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Langages de programmation](#langages-de-programmation)
3. [Bibliothèques et frameworks](#bibliothèques-et-frameworks)
4. [Utilisateurs et rôles](#utilisateurs-et-rôles)
5. [Associations et relations](#associations-et-relations)
6. [Corrections et propositions](#corrections-et-propositions)
7. [Tâches (Todos)](#tâches-todos)
8. [Autres modèles](#autres-modèles)

## Vue d'ensemble

Le projet utilise une approche de double typage :

1. **Types de base de données** : Représentent la structure exacte des tables dans Supabase (snake_case)
2. **Types d'application** : Représentent les données utilisées dans l'application (camelCase)

Des fonctions de mapping assurent la conversion entre ces deux formats.

## Langages de programmation

### Schéma de base de données

\`\`\`sql
CREATE TABLE languages (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
slug VARCHAR(255) NOT NULL UNIQUE,
description TEXT,
short_description TEXT,
type VARCHAR(100),
creator VARCHAR(255),
year_created INTEGER,
usage_rate INTEGER,
is_open_source BOOLEAN,
used_for TEXT,
logo_path TEXT,
popular_frameworks TEXT[],
strengths TEXT[],
tools JSONB,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE,
github_url TEXT,
website_url TEXT,
current_version VARCHAR(100),
last_updated TIMESTAMP WITH TIME ZONE,
license VARCHAR(100),
difficulty INTEGER
);
\`\`\`

### Types TypeScript

#### Type de base de données

\`\`\`typescript
export type DbLanguage = {
id: number;
name: string;
slug: string;
description?: string | null;
short_description?: string | null;
type?: string | null;
creator?: string | null;
year_created?: number | null;
usage_rate?: number | null;
is_open_source?: boolean | null;
used_for?: string | null;
logo_path?: string | null;
popular_frameworks?: string[] | null;
created_at?: string | null;
updated_at?: string | null;
github_url?: string | null;
website_url?: string | null;
current_version?: string | null;
last_updated?: string | null;
license?: string | null;
difficulty?: number | null;
strengths?: string[] | null;
tools?: Json | null;
};
\`\`\`

#### Type d'application

\`\`\`typescript
export type Language = {
id: number;
name: string;
slug: string;
description: string | null;
shortDescription: string | null;
type: string | null;
creator: string | null;
yearCreated: number | null;
usageRate: number | null;
isOpenSource: boolean | null;
usedFor: string | null;
logoPath: string | null;
popularFrameworks: string[] | null;
createdAt: string | null;
updatedAt: string | null;
githubUrl: string | null;
websiteUrl: string | null;
currentVersion: string | null;
lastUpdated: string | null;
license: string | null;
difficulty: number | null;
strengths: string[] | null;
tools: Record<string, any> | null;
};
\`\`\`

### Fonctions de mapping

\`\`\`typescript
// Conversion de DbLanguage vers Language
export function dbToLanguage(dbLanguage: DbLanguage): Language {
// Convertir tools de Json à Record<string, any> | null
let toolsConverted: Record<string, any> | null = null;

if (dbLanguage.tools) {
// Si c'est une chaîne, essayer de la parser en JSON
if (typeof dbLanguage.tools === "string") {
try {
toolsConverted = JSON.parse(dbLanguage.tools);
} catch (e) {
console.error("Erreur lors de la conversion de tools:", e);
toolsConverted = null;
}
}
// Si c'est déjà un objet, l'utiliser directement
else if (typeof dbLanguage.tools === "object" && !Array.isArray(dbLanguage.tools)) {
toolsConverted = dbLanguage.tools as Record<string, any>;
}
}

return {
id: dbLanguage.id,
name: dbLanguage.name,
slug: dbLanguage.slug,
description: dbLanguage.description ?? null,
shortDescription: dbLanguage.short_description ?? null,
type: dbLanguage.type ?? null,
creator: dbLanguage.creator ?? null,
yearCreated: dbLanguage.year_created ?? null,
usageRate: dbLanguage.usage_rate ?? null,
isOpenSource: dbLanguage.is_open_source ?? null,
usedFor: dbLanguage.used_for ?? null,
logoPath: dbLanguage.logo_path ?? null,
popularFrameworks: dbLanguage.popular_frameworks ?? null,
createdAt: dbLanguage.created_at ?? null,
updatedAt: dbLanguage.updated_at ?? null,
githubUrl: dbLanguage.github_url ?? null,
websiteUrl: dbLanguage.website_url ?? null,
currentVersion: dbLanguage.current_version ?? null,
lastUpdated: dbLanguage.last_updated ?? null,
license: dbLanguage.license ?? null,
difficulty: dbLanguage.difficulty ?? null,
strengths: dbLanguage.strengths ?? null,
tools: toolsConverted,
};
}
\`\`\`

## Bibliothèques et frameworks

### Schéma de base de données

\`\`\`sql
CREATE TABLE libraries (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
slug VARCHAR(255) NOT NULL UNIQUE,
language_id INTEGER REFERENCES languages(id),
description TEXT,
official_website TEXT,
github_url TEXT,
logo_path TEXT,
popularity INTEGER,
is_open_source BOOLEAN,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE,
features TEXT[],
unique_selling_point TEXT,
best_for TEXT,
used_for TEXT,
documentation_url TEXT,
version VARCHAR(100),
technology_type VARCHAR(100),
subtype VARCHAR(100),
license TEXT,
website_url TEXT
);
\`\`\`

### Types TypeScript

#### Type de base de données

\`\`\`typescript
export type DbLibrary = {
id: number;
name: string;
slug: string;
language_id: number | null;
description: string | null;
official_website: string | null;
github_url: string | null;
logo_path: string | null;
popularity: number | null;
is_open_source: boolean | null;
created_at: string | null;
updated_at: string | null;
features: string[] | null;
unique_selling_point: string | null;
best_for: string | null;
used_for: string | null;
documentation_url: string | null;
version: string | null;
technology_type: string | null;
subtype: string | null;
license: string | null;
website_url: string | null;
};
\`\`\`

#### Type d'application

\`\`\`typescript
export type Library = {
id: number;
name: string;
slug: string;
languageId: number | null;
description: string | null;
officialWebsite: string | null;
githubUrl: string | null;
logoPath: string | null;
popularity: number | null;
isOpenSource: boolean | null;
createdAt: string | null;
updatedAt: string | null;
features: string[] | null;
uniqueSellingPoint: string | null;
bestFor: string | null;
usedFor: string | null;
documentationUrl: string | null;
version: string | null;
technologyType: string | null;
subtype: string | null;
license: string | null;
websiteUrl: string | null;
};
\`\`\`

## Utilisateurs et rôles

### Schéma de base de données

\`\`\`sql
-- Table des rôles utilisateurs
CREATE TABLE user_roles (
id UUID PRIMARY KEY REFERENCES auth.users(id),
role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'validator', 'verified', 'registered')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE
);

-- Table des profils utilisateurs
CREATE TABLE profiles (
id UUID PRIMARY KEY REFERENCES auth.users(id),
username VARCHAR(255) UNIQUE,
full_name VARCHAR(255),
bio TEXT,
website VARCHAR(255),
avatar_url TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE
);
\`\`\`

### Types TypeScript

#### Types de rôles

\`\`\`typescript
// Type pour les rôles stockés en base de données
export type UserRoleTypeDB = "admin" | "validator" | "verified" | "registered";

// Type étendu pour l'application qui inclut "anonymous" pour les utilisateurs non connectés
export type UserRoleType = UserRoleTypeDB | "anonymous";
\`\`\`

#### Type de base de données pour les rôles

\`\`\`typescript
export interface DbUserRole {
id: string;
role: UserRoleTypeDB;
created_at: string | null;
updated_at: string | null;
}
\`\`\`

#### Type d'application pour les rôles

\`\`\`typescript
export interface UserRole {
id: string;
role: UserRoleTypeDB;
createdAt: string | null;
updatedAt: string | null;
}
\`\`\`

#### Type pour les profils utilisateurs

\`\`\`typescript
export interface UserProfile {
id: string;
avatarUrl: string | null;
fullName: string | null;
username: string | null;
bio: string | null;
website: string | null;
createdAt: string | null;
updatedAt: string | null;
}
\`\`\`

## Associations et relations

### Association entre bibliothèques et langages

\`\`\`sql
CREATE TABLE library_languages (
library_id INTEGER REFERENCES libraries(id) ON DELETE CASCADE,
language_id INTEGER REFERENCES languages(id) ON DELETE CASCADE,
primary_language BOOLEAN DEFAULT false,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
PRIMARY KEY (library_id, language_id)
);
\`\`\`

### Types TypeScript

\`\`\`typescript
// Type pour les langages associés à une bibliothèque
export interface AssociatedLanguage {
id: number;
name: string;
slug: string;
isPrimary: boolean;
logo_path?: string | null;
}

// Type pour une bibliothèque avec ses langages associés
export interface ToolWithLanguages extends Library {
languages?: AssociatedLanguage[];
}
\`\`\`

## Corrections et propositions

### Schéma de base de données

\`\`\`sql
CREATE TABLE corrections (
id SERIAL PRIMARY KEY,
language_id INTEGER REFERENCES languages(id) ON DELETE CASCADE,
field VARCHAR(100) NOT NULL,
suggestion TEXT NOT NULL,
type VARCHAR(50) NOT NULL CHECK (type IN ('language', 'framework')),
framework_name VARCHAR(255),
status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
comment TEXT,
user_id UUID REFERENCES auth.users(id),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE,
reviewed_by UUID REFERENCES auth.users(id),
reviewed_at TIMESTAMP WITH TIME ZONE
);
\`\`\`

### Types TypeScript

\`\`\`typescript
export interface Correction {
id: number;
languageId: number;
field: string;
suggestion: string;
type: 'language' | 'framework';
frameworkName?: string | null;
status: 'pending' | 'approved' | 'rejected';
comment?: string | null;
userId?: string | null;
createdAt: string;
updatedAt?: string | null;
reviewedBy?: string | null;
reviewedAt?: string | null;
}
\`\`\`

## Tâches (Todos)

### Schéma de base de données

\`\`\`sql
CREATE TABLE todo_categories (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE todo_status (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
color VARCHAR(50),
order_index INTEGER NOT NULL
);

CREATE TABLE todos (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
status_id INTEGER REFERENCES todo_status(id),
category_id INTEGER REFERENCES todo_categories(id),
user_id UUID REFERENCES auth.users(id),
assigned_to UUID REFERENCES auth.users(id),
due_date TIMESTAMP WITH TIME ZONE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE,
completed_at TIMESTAMP WITH TIME ZONE,
priority INTEGER DEFAULT 0
);
\`\`\`

### Types TypeScript

\`\`\`typescript
export interface TodoCategory {
id: number;
name: string;
description: string | null;
createdAt: string;
}

export interface TodoStatus {
id: number;
name: string;
color: string | null;
orderIndex: number;
}

export interface Todo {
id: number;
title: string;
description: string | null;
statusId: number | null;
categoryId: number | null;
userId: string | null;
assignedTo: string | null;
dueDate: string | null;
createdAt: string;
updatedAt: string | null;
completedAt: string | null;
priority: number;
}
\`\`\`

## Autres modèles

### Paramètres de recherche

\`\`\`typescript
export interface LanguageSearchParams {
query?: string;
type?: string;
usageMin?: string;
usageMax?: string;
openSource?: string;
sort?: string;
page?: string;
pageSize?: string;
}
\`\`\`

### Options pour les API

\`\`\`typescript
export interface GetLanguagesOptions {
page?: number;
pageSize?: number;
search?: string;
category?: string;
subtype?: string;
openSource?: boolean;
minUsage?: number;
sort?: "name" | "usage" | "year";
}
