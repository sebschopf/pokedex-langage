# Authentification et Autorisation - Pokedex des Langages de Programmation

Ce document détaille le système d'authentification et d'autorisation utilisé dans le projet "Pokedex des Langages de Programmation".

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Système d'authentification](#système-dauthentification)
3. [Système de rôles](#système-de-rôles)
4. [Implémentation côté serveur](#implémentation-côté-serveur)
5. [Implémentation côté client](#implémentation-côté-client)
6. [Sécurité](#sécurité)
7. [Flux d'authentification](#flux-dauthentification)
8. [Gestion des sessions](#gestion-des-sessions)

## Vue d'ensemble

Le projet utilise Supabase Auth pour l'authentification des utilisateurs, combiné à un système de rôles personnalisé pour l'autorisation. Cette approche permet une gestion fine des permissions tout en bénéficiant des fonctionnalités robustes de Supabase pour l'authentification.

## Système d'authentification

### Méthodes d'authentification

Le projet prend en charge plusieurs méthodes d'authentification :

1. **Email/Mot de passe** : Méthode principale avec vérification d'email
2. **OAuth** : Connexion via des fournisseurs tiers (Google, GitHub, etc.)
3. **Magic Link** : Connexion sans mot de passe via un lien envoyé par email

### Flux d'inscription

1. L'utilisateur s'inscrit via le formulaire d'inscription
2. Un email de confirmation est envoyé
3. Après confirmation, un profil utilisateur est créé automatiquement
4. Le rôle "registered" est attribué par défaut

### Stockage des informations d'authentification

Supabase gère le stockage sécurisé des informations d'authentification :

- Les mots de passe sont hachés avec bcrypt
- Les tokens JWT sont utilisés pour les sessions
- Les tokens de rafraîchissement permettent de maintenir la session

## Système de rôles

### Hiérarchie des rôles

Le projet implémente une hiérarchie de rôles claire :

1. **admin** (100) : Accès complet à toutes les fonctionnalités
2. **validator** (50) : Peut valider les contributions des utilisateurs
3. **verified** (20) : Utilisateur vérifié pouvant contribuer du contenu
4. **registered** (10) : Utilisateur enregistré avec accès limité
5. **anonymous** (0) : Visiteur non connecté

\`\`\`typescript
// Définition de la hiérarchie des rôles
export const ROLE_HIERARCHY: RoleHierarchy = {
admin: 100,
validator: 50,
verified: 20,
registered: 10,
anonymous: 0,
};
\`\`\`

### Permissions par rôle

#### Admin

- Accès au panneau d'administration
- Gestion des utilisateurs et des rôles
- Validation des contributions
- Création et modification de tout contenu
- Suppression de contenu

#### Validator

- Accès au panneau de validation
- Validation des contributions
- Création et modification de contenu
- Gestion des tâches

#### Verified

- Soumission de nouveaux langages, bibliothèques et frameworks
- Proposition de corrections
- Commentaires et évaluations

#### Registered

- Proposition de corrections
- Profil personnalisé
- Favoris et listes personnalisées

#### Anonymous

- Consultation du contenu public
- Recherche et filtrage
- Inscription et connexion

## Implémentation côté serveur

### Vérification d'authentification

\`\`\`typescript
// Vérification d'authentification dans un Server Component
export async function requireAuthSC(redirectTo?: string): Promise<string> {
const supabase = createServerClient();
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
const redirectUrl = redirectTo ? `/login?redirectTo=${encodeURIComponent(redirectTo)}` : "/login";
redirect(redirectUrl);
}

return session.user.id;
}
\`\`\`

### Vérification de rôle

\`\`\`typescript
// Vérification de rôle dans un Server Component
export async function requireRoleSC(requiredRole: UserRoleType, redirectTo = "/unauthorized"): Promise<string> {
const userId = await requireAuthSC();
const userRole = await getUserRole(userId);

if (!checkUserRole(userRole, requiredRole)) {
redirect(redirectTo);
}

return userId;
}

// Fonctions spécifiques pour les rôles courants
export async function requireAdminSC(redirectTo = "/unauthorized"): Promise<string> {
return requireRoleSC("admin", redirectTo);
}

export async function requireValidatorSC(redirectTo = "/unauthorized"): Promise<string> {
return requireRoleSC("validator", redirectTo);
}
\`\`\`

### Récupération du rôle utilisateur

\`\`\`typescript
// Récupération du rôle utilisateur
export async function getUserRole(userId: string): Promise<UserRoleType> {
const supabase = createServerClient();

const { data, error } = await supabase
.from("user_roles")
.select("role")
.eq("id", userId)
.single();

if (error || !data) {
return "anonymous";
}

return dbRoleToAppRole(data.role as UserRoleTypeDB);
}
\`\`\`

## Implémentation côté client

### Context Provider pour l'authentification

\`\`\`typescript
// Contexte d'authentification
export const AuthContext = createContext<AuthContextType>({
user: null,
userRole: "anonymous",
isLoading: true,
signIn: async () => ({ success: false }),
signOut: async () => {},
signUp: async () => ({ success: false }),
refreshUserData: async () => {},
});

// Provider d'authentification
export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [userRole, setUserRole] = useState<UserRoleType>("anonymous");
const [isLoading, setIsLoading] = useState(true);
const supabase = createBrowserClient();

// Logique d'initialisation, de connexion, etc.

return (
<AuthContext.Provider value={{ user, userRole, isLoading, signIn, signOut, signUp, refreshUserData }}>
{children}
</AuthContext.Provider>
);
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
return useContext(AuthContext);
}
\`\`\`

### Vérification de rôle côté client

\`\`\`typescript
// Hook pour vérifier si l'utilisateur a un rôle spécifique
export function useHasRole(requiredRole: UserRoleType) {
const { userRole, isLoading } = useAuth();
return {
hasRole: checkUserRole(userRole, requiredRole),
isLoading,
};
}

// Composant pour afficher du contenu en fonction du rôle
export function RoleGuard({
requiredRole,
children,
fallback = null
}: {
requiredRole: UserRoleType;
children: React.ReactNode;
fallback?: React.ReactNode;
}) {
const { hasRole, isLoading } = useHasRole(requiredRole);

if (isLoading) {
return <div>Chargement...</div>;
}

return hasRole ? <>{children}</> : <>{fallback}</>;
}
\`\`\`

## Sécurité

### Rafraîchissement des tokens

\`\`\`typescript
// Fonction pour gérer le rafraîchissement automatique des tokens
export async function withTokenRefresh<T>(callback: () => Promise<T>): Promise<T> {
try {
return await callback();
} catch (error: any) {
// Vérifier si l'erreur est due à un token expiré
if (error.status === 401) {
const supabase = createBrowserClient();

      // Tenter de rafraîchir le token
      const { error: refreshError } = await supabase.auth.refreshSession();

      if (refreshError) {
        throw refreshError;
      }

      // Réessayer l'opération avec le nouveau token
      return await callback();
    }

    throw error;

}
}
\`\`\`

### Protection des routes

\`\`\`typescript
// Middleware pour protéger les routes (exemple simplifié)
export function middleware(request: NextRequest) {
const pathname = request.nextUrl.pathname;

// Routes protégées
if (pathname.startsWith('/admin')) {
// Vérifier l'authentification et le rôle
// Rediriger si nécessaire
}

return NextResponse.next();
}
\`\`\`

### Politiques de sécurité au niveau de la base de données (RLS)

\`\`\`sql
-- Exemple de politique RLS pour la table des profils
CREATE POLICY "Les utilisateurs peuvent voir tous les profils"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Les utilisateurs peuvent modifier uniquement leur propre profil"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Exemple de politique RLS pour la table des corrections
CREATE POLICY "Les utilisateurs peuvent voir toutes les corrections approuvées"
ON corrections FOR SELECT
USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Seuls les validateurs et admins peuvent approuver les corrections"
ON corrections FOR UPDATE
USING (
EXISTS (
SELECT 1 FROM user_roles
WHERE id = auth.uid() AND role IN ('validator', 'admin')
)
);
\`\`\`

## Flux d'authentification

### Inscription

1. L'utilisateur remplit le formulaire d'inscription
2. Les données sont validées côté client et côté serveur
3. Supabase crée un nouvel utilisateur dans `auth.users`
4. Un trigger PostgreSQL crée automatiquement :
   - Une entrée dans la table `profiles`
   - Une entrée dans la table `user_roles` avec le rôle "registered"
5. Un email de confirmation est envoyé
6. L'utilisateur est redirigé vers une page de confirmation

### Connexion

1. L'utilisateur remplit le formulaire de connexion
2. Supabase vérifie les identifiants
3. En cas de succès :
   - Un token JWT est généré
   - Un token de rafraîchissement est stocké dans un cookie sécurisé
   - Les informations utilisateur sont chargées (profil, rôle)
4. L'utilisateur est redirigé vers la page demandée ou la page d'accueil

### Déconnexion

1. L'utilisateur clique sur le bouton de déconnexion
2. Supabase invalide la session
3. Les tokens sont supprimés
4. L'état d'authentification est réinitialisé
5. L'utilisateur est redirigé vers la page d'accueil

## Gestion des sessions

### Persistance de session

La session utilisateur est persistée via :

- Un token JWT stocké en mémoire
- Un token de rafraîchissement stocké dans un cookie HTTP-only
- La vérification automatique de la session au chargement de l'application

### Expiration et rafraîchissement

- Les tokens JWT expirent après une courte période (par défaut 1 heure)
- Les tokens de rafraîchissement ont une durée de vie plus longue (par défaut 2 semaines)
- Le rafraîchissement est géré automatiquement par Supabase et la fonction `withTokenRefresh`

### Sécurité des sessions

- Les tokens JWT contiennent des informations minimales
- Les cookies de session utilisent les attributs de sécurité appropriés (HTTP-only, Secure, SameSite)
- La validation des sessions se fait à la fois côté client et côté serveur
