# Guide d'utilisation de React Query

## Introduction

[React Query](https://tanstack.com/query/latest) (TanStack Query) est une bibliothèque de gestion d'état asynchrone pour React. Elle simplifie considérablement la récupération, la mise en cache, la synchronisation et la mise à jour des données côté serveur dans vos applications React.

Ce guide explique comment nous utilisons React Query dans notre application Pokedex des Langages de Programmation.

## Configuration

Notre application utilise React Query v5, qui est configurée dans le fichier `lib/providers/query-provider.tsx`. Ce provider est intégré dans notre layout principal pour que React Query soit disponible dans toute l'application.

## Structure des hooks

Nous avons organisé nos hooks React Query en deux catégories principales :

1. **Hooks de requête** (`use-query-hooks.ts`) : Pour récupérer des données
2. **Hooks de mutation** (`use-mutation-hooks.ts`) : Pour modifier des données

### Clés de requête

Nous utilisons un système centralisé de clés de requête pour organiser notre cache :

\`\`\`typescript
export const QUERY_KEYS = {
  languages: "languages",
  languageDetail: (id: string | number) => ["language", id.toString()],
  frameworks: (languageId: string | number) => ["frameworks", languageId.toString()],
  // ...
}
\`\`\`

## Hooks de requête

### Exemple : Récupérer tous les langages

\`\`\`typescript
export function useLanguages() {
  return useQuery<Language[]>({
    queryKey: [QUERY_KEYS.languages],
    queryFn: async () => {
      const response = await fetch("/api/languages")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des langages")
      }
      return response.json()
    },
  })
}
\`\`\`

### Utilisation dans un composant

\`\`\`tsx
function LanguageList() {
  const { data: languages, isLoading, error } = useLanguages()

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error.message}</div>
  
  return (
    <ul>
      {languages?.map(language => (
        <li key={language.id}>{language.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Hooks de mutation

### Exemple : Créer un nouveau langage

\`\`\`typescript
export function useCreateLanguage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newLanguage: Omit<Language, "id">) => {
      const response = await fetch("/api/languages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLanguage),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Erreur lors de la création du langage")
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalider la requête des langages pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] })
    },
  })
}
\`\`\`

### Utilisation dans un formulaire

\`\`\`tsx
function LanguageForm() {
  const createLanguage = useCreateLanguage()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createLanguage.mutateAsync({
        name: "Nouveau langage",
        // ...autres propriétés
      })
      // Succès !
    } catch (error) {
      // Gérer l'erreur
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Champs du formulaire */}
      <button type="submit" disabled={createLanguage.isPending}>
        {createLanguage.isPending ? "Création..." : "Créer"}
      </button>
    </form>
  )
}
\`\`\`

## Bonnes pratiques

### 1. Gestion des erreurs

Toujours gérer les erreurs dans les hooks et les composants :

\`\`\`tsx
const { data, isLoading, error } = useLanguages()

if (error) {
  return <ErrorComponent message={error.message} />
}
\`\`\`

### 2. États de chargement

Toujours afficher un état de chargement pour améliorer l'expérience utilisateur :

\`\`\`tsx
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

## Débogage

En développement, vous pouvez utiliser React Query Devtools pour inspecter l'état du cache et des requêtes. Les devtools sont automatiquement incluses en mode développement.

## Ressources

- [Documentation officielle de TanStack Query](https://tanstack.com/query/latest/docs/react/overview)
- [Exemples de patterns avancés](https://tanstack.com/query/latest/docs/react/guides/advanced-patterns)
