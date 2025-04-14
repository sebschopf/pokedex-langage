# Guide de Style de Code - Pokedex des Langages de Programmation

Ce guide définit les conventions de code à suivre pour le projet Pokedex des Langages de Programmation. L'objectif est de maintenir un code cohérent, lisible et maintenable pour tous les contributeurs.

## Table des matières

1. [Principes généraux](#principes-généraux)
2. [Conventions de nommage](#conventions-de-nommage)
3. [Formatage du code](#formatage-du-code)
4. [Structure des fichiers](#structure-des-fichiers)
5. [TypeScript et typage](#typescript-et-typage)
6. [React et composants](#react-et-composants)
7. [Next.js et App Router](#nextjs-et-app-router)
8. [Supabase et gestion des données](#supabase-et-gestion-des-données)
9. [Tailwind CSS et styles](#tailwind-css-et-styles)
10. [Tests](#tests)
11. [Gestion des erreurs](#gestion-des-erreurs)
12. [Performance](#performance)
13. [Accessibilité](#accessibilité)
14. [Outils recommandés](#outils-recommandés)

## Principes généraux

- **Simplicité** : Préférez un code simple et lisible à un code complexe et "intelligent".
- **Cohérence** : Suivez les conventions établies, même si vous préférez une autre approche.
- **Maintenabilité** : Écrivez du code pour les futurs développeurs (y compris vous-même dans 6 mois).
- **Documentation** : Documentez le "pourquoi", pas le "quoi" (le code lui-même devrait expliquer ce qu'il fait).
- **DRY (Don't Repeat Yourself)** : Évitez la duplication de code, mais pas au détriment de la lisibilité.

## Conventions de nommage

### Variables et fonctions

- Utilisez le **camelCase** pour les variables et fonctions :

\`\`\`typescript
// Bon
const userData = { ... };
function getUserData() { ... }

// Mauvais
const user_data = { ... };
function get_user_data() { ... }
\`\`\`

### Composants React

- Utilisez le **PascalCase** pour les composants React et leurs fichiers :

\`\`\`typescript
// Bon
function UserProfile() { ... }
// Dans un fichier nommé UserProfile.tsx

// Mauvais
function userProfile() { ... }
// Dans un fichier nommé userProfile.tsx
\`\`\`

### Types et interfaces

- Utilisez le **PascalCase** pour les types et interfaces :
- Préfixez les interfaces par `I` uniquement si nécessaire pour éviter les conflits de noms :

\`\`\`typescript
// Bon
type User = { ... }
interface UserData { ... }

// Acceptable si nécessaire pour éviter les conflits
interface IUser { ... }

// Mauvais
type user = { ... }
interface userData { ... }
\`\`\`

### Constantes

- Utilisez le **UPPER_SNAKE_CASE** pour les constantes globales :

\`\`\`typescript
// Bon
const MAX_RETRY_COUNT = 3;

// Mauvais
const maxRetryCount = 3;
\`\`\`

### Fichiers et dossiers

- Utilisez le **kebab-case** pour les noms de fichiers et dossiers, sauf pour les composants React :

\`\`\`
// Bon
- utils/
  - string-utils.ts
  - date-formatter.ts
- components/
  - UserProfile.tsx
  - LanguageCard.tsx

// Mauvais
- utils/
  - stringUtils.ts
  - DateFormatter.ts
- components/
  - user-profile.tsx
  - language_card.tsx
\`\`\`

### Exports

- Préférez les exports nommés aux exports par défaut, sauf pour les composants React principaux :

\`\`\`typescript
// Bon - pour les utilitaires et fonctions
export function formatDate() { ... }
export const MAX_COUNT = 10;

// Bon - pour les composants principaux
export default function UserProfile() { ... }

// Évitez
export default { formatDate, MAX_COUNT };
\`\`\`

## Formatage du code

### Indentation et espacement

- Utilisez **2 espaces** pour l'indentation (pas de tabulations)
- Limitez les lignes à **100 caractères** maximum
- Ajoutez des espaces autour des opérateurs :

\`\`\`typescript
// Bon
const sum = a + b;

// Mauvais
const sum=a+b;
\`\`\`

### Accolades et parenthèses

- Placez les accolades ouvrantes sur la même ligne que la déclaration :

\`\`\`typescript
// Bon
if (condition) {
  doSomething();
}

// Mauvais
if (condition)
{
  doSomething();
}
\`\`\`

- Utilisez toujours des accolades pour les blocs conditionnels, même pour une seule ligne :

\`\`\`typescript
// Bon
if (condition) {
  doSomething();
}

// Mauvais
if (condition) doSomething();
\`\`\`

### Points-virgules

- Utilisez toujours des points-virgules à la fin des instructions :

\`\`\`typescript
// Bon
const name = 'John';
function sayHello() {
  console.log('Hello');
}

// Mauvais
const name = 'John'
function sayHello() {
  console.log('Hello')
}
\`\`\`

### Guillemets

- Utilisez les guillemets simples (`'`) pour les chaînes de caractères :

\`\`\`typescript
// Bon
const name = 'John';

// Mauvais
const name = "John";
\`\`\`

- Utilisez les guillemets doubles (`"`) pour les attributs JSX :

\`\`\`tsx
// Bon
<div className="container">

// Mauvais
<div className='container'>
\`\`\`

## Structure des fichiers

### Organisation du projet

\`\`\`
/
├── app/                  # Routes Next.js (App Router)
│   ├── api/              # Routes API
│   ├── language/         # Pages des langages
│   └── ...
├── components/           # Composants React
│   ├── ui/               # Composants UI réutilisables
│   ├── admin/            # Composants pour l'administration
│   └── ...
├── lib/                  # Logique métier et utilitaires
│   ├── server/           # Code côté serveur
│   ├── client/           # Code côté client
│   └── ...
├── hooks/                # Hooks React personnalisés
├── types/                # Définitions de types TypeScript
│   ├── database/         # Types pour les tables de la base de données
│   ├── models/           # Types pour les modèles de données
│   └── ...
├── utils/                # Fonctions utilitaires
│   ├── string/           # Utilitaires pour les chaînes
│   ├── date/             # Utilitaires pour les dates
│   └── ...
├── public/               # Fichiers statiques
└── ...
\`\`\`

### Structure des composants

- Un composant par fichier
- Exportez le composant par défaut
- Groupez les composants connexes dans un dossier
- Utilisez un fichier `index.ts` pour exporter plusieurs composants d'un dossier

\`\`\`typescript
// components/LanguageCard/LanguageCard.tsx
export default function LanguageCard() { ... }

// components/LanguageCard/LanguageCardSkeleton.tsx
export function LanguageCardSkeleton() { ... }

// components/LanguageCard/index.ts
export { default } from './LanguageCard';
export * from './LanguageCardSkeleton';
\`\`\`

## TypeScript et typage

### Utilisation des types

- Préférez les `type` pour les unions, intersections et types simples :

\`\`\`typescript
type Status = 'pending' | 'success' | 'error';
type UserWithRole = User & { role: string };
\`\`\`

- Utilisez les `interface` pour les objets qui peuvent être étendus :

\`\`\`typescript
interface User {
  id: number;
  name: string;
}

interface AdminUser extends User {
  permissions: string[];
}
\`\`\`

### Typage explicite

- Ajoutez des types explicites pour les paramètres de fonction et les valeurs de retour :

\`\`\`typescript
// Bon
function getUser(id: number): User | null {
  // ...
}

// Mauvais
function getUser(id) {
  // ...
}
\`\`\`

- Évitez `any` autant que possible, utilisez `unknown` si nécessaire :

\`\`\`typescript
// Bon
function parseData(data: unknown): User {
  // Vérification de type et conversion
}

// Mauvais
function parseData(data: any): User {
  // Pas de vérification de type
}
\`\`\`

### Imports de types

- Utilisez la syntaxe d'import de type pour éviter d'importer des valeurs :

\`\`\`typescript
// Bon
import type { User } from '@/types';

// Ou
import { type User } from '@/types';

// Évitez pour les types uniquement
import { User } from '@/types';
\`\`\`

## React et composants

### Structure des composants

- Organisez vos composants dans cet ordre :
  1. Imports
  2. Types/Interfaces
  3. Constantes
  4. Composant
  5. Sous-composants
  6. Exports

\`\`\`typescript
// Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Types
interface UserProfileProps {
  userId: string;
}

// Constantes
const MAX_RETRIES = 3;

// Composant principal
export default function UserProfile({ userId }: UserProfileProps) {
  // État
  const [isLoading, setIsLoading] = useState(false);
  
  // Gestionnaires d'événements
  const handleClick = () => {
    // ...
  };
  
  // Rendu
  return (
    <div>
      <ProfileHeader />
      <Button onClick={handleClick}>Modifier</Button>
    </div>
  );
}

// Sous-composants
function ProfileHeader() {
  return <h1>Profil utilisateur</h1>;
}
\`\`\`

### Hooks

- Placez les hooks au début du composant
- Respectez les règles des hooks (appel uniquement au niveau supérieur)
- Créez des hooks personnalisés pour la logique réutilisable

\`\`\`typescript
function UserProfile() {
  // Hooks d'état
  const [user, setUser] = useState(null);
  
  // Hooks d'effet
  useEffect(() => {
    // ...
  }, []);
  
  // Hooks personnalisés
  const { isLoading, error } = useUser(userId);
  
  // Reste du composant...
}
\`\`\`

### Props

- Destructurez les props dans la signature de la fonction :

\`\`\`typescript
// Bon
function UserCard({ name, email, avatar }: UserCardProps) {
  // ...
}

// Mauvais
function UserCard(props: UserCardProps) {
  const { name, email, avatar } = props;
  // ...
}
\`\`\`

- Utilisez des valeurs par défaut pour les props optionnelles :

\`\`\`typescript
function Button({ variant = 'primary', children }: ButtonProps) {
  // ...
}
\`\`\`

## Next.js et App Router

### Organisation des routes

- Utilisez la structure de dossiers de l'App Router pour définir les routes
- Placez les composants de page dans des fichiers `page.tsx`
- Utilisez des dossiers pour les segments de route dynamiques

\`\`\`
app/
├── page.tsx              # Route: /
├── layout.tsx            # Layout racine
├── language/
│   ├── page.tsx          # Route: /language
│   ├── [slug]/
│   │   ├── page.tsx      # Route: /language/[slug]
│   │   └── layout.tsx    # Layout pour /language/[slug]
│   └── id/
│       └── [id]/
│           └── page.tsx  # Route: /language/id/[id]
└── api/
    └── languages/
        ├── route.ts      # API: /api/languages
        └── [id]/
            └── route.ts  # API: /api/languages/[id]
\`\`\`

### Composants serveur vs client

- Marquez explicitement les composants client avec la directive `'use client'`
- Par défaut, créez des composants serveur (sans directive)
- Séparez clairement la logique serveur et client

\`\`\`typescript
// Composant serveur (par défaut)
export default function LanguageList() {
  // Ce code s'exécute sur le serveur
  return <div>...</div>;
}

// Composant client
'use client';

import { useState } from 'react';

export default function InteractiveForm() {
  // Ce code s'exécute sur le client
  const [value, setValue] = useState('');
  return <div>...</div>;
}
\`\`\`

### Chargement et gestion des erreurs

- Utilisez les fichiers spéciaux pour le chargement et les erreurs :
  - `loading.tsx` pour les états de chargement
  - `error.tsx` pour la gestion des erreurs
  - `not-found.tsx` pour les pages 404

\`\`\`typescript
// app/language/[slug]/loading.tsx
export default function Loading() {
  return <div>Chargement en cours...</div>;
}

// app/language/[slug]/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Une erreur s'est produite</h2>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
\`\`\`

## Supabase et gestion des données

### Clients Supabase

- Utilisez le client serveur pour les opérations côté serveur
- Utilisez le client singleton pour les opérations côté client
- Séparez clairement les appels à la base de données de la logique métier

\`\`\`typescript
// lib/server/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// lib/client/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabaseClient;
}
\`\`\`

### Requêtes et mutations

- Utilisez des fonctions dédiées pour les opérations de base de données
- Gérez correctement les erreurs et les cas limites
- Utilisez le typage pour les résultats de requêtes

\`\`\`typescript
// lib/server/api/languages.ts
import { supabaseAdmin } from '../supabase/client';
import type { Language } from '@/types/models';

export async function getLanguageBySlug(slug: string): Promise<Language | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('languages')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error fetching language:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}
\`\`\`

### Hooks React Query

- Utilisez React Query pour la gestion des données côté client
- Créez des hooks personnalisés pour les opérations courantes
- Gérez correctement les états de chargement, d'erreur et de succès

\`\`\`typescript
// hooks/use-languages.ts
import { useQuery } from '@tanstack/react-query';
import type { Language } from '@/types/models';

async function fetchLanguages(): Promise<Language[]> {
  const response = await fetch('/api/languages');
  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }
  return response.json();
}

export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
  });
}
\`\`\`

## Tailwind CSS et styles

### Organisation des classes

- Groupez les classes Tailwind par catégorie :
  1. Layout (position, display, width, height)
  2. Spacing (margin, padding)
  3. Typography (font, text)
  4. Visual (colors, backgrounds, borders)
  5. Interactive (hover, focus)

\`\`\`tsx
// Bon
<div className="
  flex items-center justify-between
  p-4 my-2
  text-sm font-medium
  bg-white rounded-lg border border-gray-200
  hover:bg-gray-50
">

// Mauvais (mélangé sans ordre)
<div className="text-sm bg-white p-4 flex hover:bg-gray-50 items-center border-gray-200 rounded-lg my-2 border font-medium justify-between">
\`\`\`

### Composants UI réutilisables

- Utilisez des composants UI réutilisables pour les éléments communs
- Créez des variantes pour les différents styles
- Utilisez `cn()` pour combiner les classes conditionnellement

\`\`\`tsx
// components/ui/button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        // Size variants
        {
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        // Color variants
        {
          'bg-primary text-white hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground': variant === 'outline',
        },
        // Additional classes
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

### Responsive design

- Utilisez les préfixes de breakpoint de Tailwind pour le responsive design
- Concevez d'abord pour mobile, puis ajoutez des styles pour les écrans plus grands
- Testez sur différentes tailles d'écran

\`\`\`tsx
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
">
  {/* Contenu */}
</div>
\`\`\`

## Tests

### Tests unitaires

- Testez les fonctions utilitaires et les hooks personnalisés
- Utilisez Jest et React Testing Library
- Nommez les tests de manière descriptive

\`\`\`typescript
// utils/string/string-utils.test.ts
import { capitalizeFirstLetter } from './string-utils';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });
  
  it('returns an empty string when given an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
  
  it('does not change already capitalized strings', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });
});
\`\`\`

### Tests de composants

- Testez le comportement, pas l'implémentation
- Utilisez les requêtes basées sur l'accessibilité
- Simulez les interactions utilisateur

\`\`\`typescript
// components/LanguageCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageCard from './LanguageCard';

describe('LanguageCard', () => {
  it('displays the language name', () => {
    render(<LanguageCard name="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
  
  it('calls the onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<LanguageCard name="TypeScript" onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

## Gestion des erreurs

### Erreurs côté serveur

- Utilisez try/catch pour gérer les erreurs
- Journalisez les erreurs avec des informations contextuelles
- Renvoyez des réponses d'erreur appropriées

\`\`\`typescript
// app/api/languages/[id]/route.ts
import { NextResponse } from 'next/server';
import { getLanguageById } from '@/lib/server/api/languages';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const language = await getLanguageById(params.id);
    
    if (!language) {
      return NextResponse.json(
        { error: 'Language not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(language);
  } catch (error) {
    console.error('Error fetching language:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

### Erreurs côté client

- Utilisez les composants d'erreur de Next.js
- Fournissez des messages d'erreur utiles
- Offrez des options de récupération lorsque c'est possible

\`\`\`typescript
// app/language/[slug]/error.tsx
'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Une erreur s'est produite</h2>
      <p className="text-muted-foreground mb-6">
        Nous n'avons pas pu charger les informations demandées.
      </p>
      <Button onClick={reset}>Réessayer</Button>
    </div>
  );
}
\`\`\`

## Performance

### Optimisation des images

- Utilisez le composant `next/image` pour les images
- Spécifiez les dimensions width et height
- Utilisez des formats d'image modernes (WebP, AVIF)

\`\`\`tsx
import Image from 'next/image';

export function LanguageLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={64}
      height={64}
      className="rounded-md"
      priority={false}
    />
  );
}
\`\`\`

### Chargement différé

- Utilisez `next/dynamic` pour le chargement différé des composants
- Ajoutez des états de chargement pour améliorer l'UX

\`\`\`typescript
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const LanguageChart = dynamic(() => import('@/components/LanguageChart'), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false, // Désactive le SSR pour les composants qui dépendent de window
});
\`\`\`

### Memoization

- Utilisez `useMemo` et `useCallback` pour les calculs coûteux et les fonctions de rappel
- Utilisez `memo` pour les composants qui se re-rendent souvent avec les mêmes props

\`\`\`typescript
import { useMemo, useCallback, memo } from 'react';

function ExpensiveComponent({ data, onAction }: Props) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  // Memoize callback functions
  const handleClick = useCallback(() => {
    onAction(data.id);
  }, [onAction, data.id]);
  
  return (
    <div onClick={handleClick}>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Memoize the component itself
export default memo(ExpensiveComponent);
\`\`\`

## Accessibilité

### Sémantique HTML

- Utilisez des éléments HTML sémantiques appropriés
- Structurez correctement les titres (h1, h2, etc.)
- Utilisez des listes pour les groupes d'éléments

\`\`\`tsx
// Bon
<article>
  <h2>TypeScript</h2>
  <p>Un langage de programmation typé.</p>
  <ul>
    <li>Typé statiquement</li>
    <li>Superset de JavaScript</li>
  </ul>
</article>

// Mauvais
<div>
  <div className="text-xl font-bold">TypeScript</div>
  <div>Un langage de programmation typé.</div>
  <div>
    <div>Typé statiquement</div>
    <div>Superset de JavaScript</div>
  </div>
</div>
\`\`\`

### ARIA et rôles

- Ajoutez des attributs ARIA lorsque nécessaire
- Utilisez les rôles appropriés pour les éléments non standard
- Testez avec des lecteurs d'écran

\`\`\`tsx
<button
  aria-label="Fermer"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  <span className="sr-only">Fermer le menu</span>
  <XIcon />
</button>
\`\`\`

### Focus et navigation au clavier

- Assurez-vous que tous les éléments interactifs sont accessibles au clavier
- Utilisez un style de focus visible
- Maintenez un ordre de tabulation logique

\`\`\`tsx
<button
  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  onClick={handleClick}
>
  Cliquez ici
</button>
\`\`\`

## Outils recommandés

### Éditeur

- Visual Studio Code avec les extensions suivantes :
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)
  - Error Lens

### Linting et formatage

- ESLint avec les plugins recommandés
- Prettier pour le formatage
- Husky pour les hooks de pré-commit
- lint-staged pour n'appliquer le linting qu'aux fichiers modifiés

### Configuration recommandée

#### ESLint (.eslintrc.js)

\`\`\`javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
\`\`\`

#### Prettier (.prettierrc)

\`\`\`json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}
\`\`\`

#### TypeScript (tsconfig.json)

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

---

Ce guide de style est un document vivant qui évoluera avec le projet. N'hésitez pas à proposer des améliorations ou des clarifications.
