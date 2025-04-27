## Updated react-query.md

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
