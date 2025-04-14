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
 ┣ date                # Manipulation et formatage des dates
 ┃ ┣ format-date.ts    # Fonctions de formatage de date
 ┃ ┗ index.ts          # Point d'entrée du module
 ┣ pagination          # Utilitaires pour la pagination
 ┃ ┗ index.ts          # Calcul de pagination, offset, etc.
 ┣ security            # Fonctionnalités liées à la sécurité
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ security-logger.ts # Journalisation des événements de sécurité
 ┣ slug                # Génération et manipulation de slugs pour les URLs
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ slug-generator.ts # Génération de slugs à partir de chaînes
 ┣ storage             # Gestion du stockage de fichiers
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ storage-helpers.ts # Helpers pour le stockage Supabase
 ┣ string              # Manipulation de chaînes de caractères
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ string-utils.ts   # Fonctions de manipulation de chaînes
 ┣ supabase            # Utilitaires spécifiques à Supabase
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ supabase-helpers.ts # Helpers pour les opérations Supabase
 ┣ theme               # Utilitaires liés au thème et à l'apparence
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ theme-utils.ts    # Fonctions liées au thème
 ┣ type-check          # Vérification de types à l'exécution
 ┃ ┗ index.ts          # Fonctions de vérification de type
 ┣ validation          # Validation de données
 ┃ ┣ index.ts          # Point d'entrée du module
 ┃ ┗ type-conversion.ts # Validation et conversion de types
 ┣ index.ts            # Point d'entrée principal qui exporte tous les modules
 ┗ type-check.ts       # Fichier de compatibilité (déprécié)
\`\`\`

## Modules

### 1. Conversion

Le module `conversion` fournit des fonctions pour convertir entre différents types de données.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `null-undefined.ts` : Gestion des valeurs null et undefined
- `type-conversion.ts` : Conversion entre types (string, number, boolean, etc.)

#### Fonctions principales
\`\`\`typescript
// Conversion de types
toNumber(value: any): number
toString(value: any): string
toBoolean(value: any): boolean
toDate(value: any): Date

// Gestion des valeurs null/undefined
isNullOrUndefined(value: any): boolean
defaultIfNull<T>(value: T | null | undefined, defaultValue: T): T
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { toNumber, defaultIfNull } from '@/utils/conversion';

const num = toNumber('123'); // 123
const value = defaultIfNull(null, 'default'); // 'default'
\`\`\`

### 2. Date

Le module `date` fournit des fonctions pour manipuler et formater des dates.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `format-date.ts` : Fonctions de formatage de date

#### Fonctions principales
\`\`\`typescript
formatDate(date: Date | string | number, format?: string): string
formatRelative(date: Date | string | number): string
isValidDate(date: any): boolean
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { formatDate, formatRelative } from '@/utils/date';

const formatted = formatDate(new Date(), 'DD/MM/YYYY'); // '01/01/2023'
const relative = formatRelative(new Date(Date.now() - 3600000)); // 'il y a 1 heure'
\`\`\`

### 3. Pagination

Le module `pagination` fournit des fonctions pour gérer la pagination des listes.

#### Fichiers
- `index.ts` : Fonctions de pagination

#### Fonctions principales
\`\`\`typescript
calculatePagination(page: number, pageSize: number, totalItems: number): PaginationResult
calculateOffset(page: number, pageSize: number): number
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { calculatePagination } from '@/utils/pagination';

const pagination = calculatePagination(2, 10, 95);
// { page: 2, pageSize: 10, totalPages: 10, hasNextPage: true, hasPrevPage: true }
\`\`\`

### 4. Security

Le module `security` fournit des fonctions liées à la sécurité.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `security-logger.ts` : Journalisation des événements de sécurité

#### Fonctions principales
\`\`\`typescript
logSecurityEvent(event: string, details: any): void
sanitizeInput(input: string): string
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { logSecurityEvent, sanitizeInput } from '@/utils/security';

logSecurityEvent('LOGIN_ATTEMPT', { userId: 123, success: true });
const safeInput = sanitizeInput('<script>alert("XSS")</script>');
\`\`\`

### 5. Slug

Le module `slug` fournit des fonctions pour générer et manipuler des slugs pour les URLs.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `slug-generator.ts` : Génération de slugs à partir de chaînes

#### Fonctions principales
\`\`\`typescript
generateSlug(text: string): string
isValidSlug(slug: string): boolean
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { generateSlug } from '@/utils/slug';

const slug = generateSlug('Hello World!'); // 'hello-world'
\`\`\`

### 6. Storage

Le module `storage` fournit des fonctions pour gérer le stockage de fichiers.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `storage-helpers.ts` : Helpers pour le stockage Supabase

#### Fonctions principales
\`\`\`typescript
getPublicUrl(bucket: string, path: string): string
getFileExtension(filename: string): string
isImageFile(filename: string): boolean
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { getPublicUrl, isImageFile } from '@/utils/storage';

const url = getPublicUrl('logos', 'javascript.png');
const isImage = isImageFile('document.pdf'); // false
\`\`\`

### 7. String

Le module `string` fournit des fonctions pour manipuler des chaînes de caractères.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `string-utils.ts` : Fonctions de manipulation de chaînes

#### Fonctions principales
\`\`\`typescript
capitalize(str: string): string
truncate(str: string, maxLength: number): string
removeSpecialChars(str: string): string
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { capitalize, truncate } from '@/utils/string';

const capitalized = capitalize('hello'); // 'Hello'
const truncated = truncate('This is a long text', 10); // 'This is a...'
\`\`\`

### 8. Supabase

Le module `supabase` fournit des fonctions utilitaires spécifiques à Supabase.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `supabase-helpers.ts` : Helpers pour les opérations Supabase

#### Fonctions principales
\`\`\`typescript
handleSupabaseError(error: any): void
formatSupabaseResponse(data: any): any
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { handleSupabaseError } from '@/utils/supabase';

try {
  // Opération Supabase
} catch (error) {
  handleSupabaseError(error);
}
\`\`\`

### 9. Theme

Le module `theme` fournit des fonctions liées au thème et à l'apparence.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `theme-utils.ts` : Fonctions liées au thème

#### Fonctions principales
\`\`\`typescript
getTypeBadgeColor(type: string): string
getCategoryColor(category: string): string
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { getTypeBadgeColor } from '@/utils/theme';

const color = getTypeBadgeColor('Frontend'); // 'bg-blue-500'
\`\`\`

### 10. Type-Check

Le module `type-check` fournit des fonctions pour vérifier les types à l'exécution.

#### Fichiers
- `index.ts` : Fonctions de vérification de type

#### Fonctions principales
\`\`\`typescript
isString(value: any): boolean
isNumber(value: any): boolean
isBoolean(value: any): boolean
isObject(value: any): boolean
isArray(value: any): boolean
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { isString, isNumber } from '@/utils/type-check';

const isStr = isString('hello'); // true
const isNum = isNumber('123'); // false
\`\`\`

### 11. Validation

Le module `validation` fournit des fonctions pour valider les données.

#### Fichiers
- `index.ts` : Exporte toutes les fonctions du module
- `type-conversion.ts` : Validation et conversion de types

#### Fonctions principales
\`\`\`typescript
validateEmail(email: string): boolean
validateUrl(url: string): boolean
validateRequired(value: any): boolean
\`\`\`

#### Exemple d'utilisation
\`\`\`typescript
import { validateEmail, validateRequired } from '@/utils/validation';

const isValidEmail = validateEmail('user@example.com'); // true
const isRequired = validateRequired(''); // false
\`\`\`

## Fichier Principal (index.ts)

Le fichier `utils/index.ts` est le point d'entrée principal qui exporte tous les modules sous forme d'espaces de noms pour éviter les conflits de noms.

\`\`\`typescript
// utils/index.ts
import * as Conversion from './conversion';
import * as Date from './date';
import * as Pagination from './pagination';
import * as Security from './security';
import * as Slug from './slug';
import * as Storage from './storage';
import * as String from './string';
import * as Supabase from './supabase';
import * as Theme from './theme';
import * as TypeCheck from './type-check';
import * as Validation from './validation';

// Exportation des espaces de noms
export {
  Conversion,
  Date,
  Pagination,
  Security,
  Slug,
  Storage,
  String,
  Supabase,
  Theme,
  TypeCheck,
  Validation
};

// Exportation des fonctions couramment utilisées
export { toNumber, toString, toBoolean } from './conversion';
export { formatDate, formatRelative } from './date';
export { generateSlug } from './slug';
export { capitalize, truncate } from './string';
\`\`\`

## Bonnes Pratiques

### 1. Importation

Pour importer des fonctions utilitaires, utilisez l'une des approches suivantes :

#### Importation directe d'une fonction spécifique
\`\`\`typescript
import { toNumber } from '@/utils/conversion';
// ou
import { toNumber } from '@/utils';
\`\`\`

#### Importation d'un module entier
\`\`\`typescript
import * as ConversionUtils from '@/utils/conversion';
// ou
import { Conversion } from '@/utils';
\`\`\`

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

\`\`\`typescript
/**
 * Convertit une valeur en nombre.
 * @param value - La valeur à convertir
 * @param defaultValue - Valeur par défaut si la conversion échoue
 * @returns Le nombre converti ou la valeur par défaut
 */
export function toNumber(value: any, defaultValue: number = 0): number {
  // Implémentation
}
\`\`\`

## Migration depuis l'ancienne structure

Si vous utilisez encore l'ancienne structure d'utilitaires, voici comment migrer :

### Anciens imports
\`\`\`typescript
import { toNumber } from '@/lib/utils/type-conversion';
\`\`\`

### Nouveaux imports
\`\`\`typescript
import { toNumber } from '@/utils/conversion';
// ou
import { Conversion } from '@/utils';
const { toNumber } = Conversion;
\`\`\`

## Conclusion

Le dossier `utils/` fournit un ensemble complet de fonctions utilitaires organisées de manière modulaire. Cette organisation facilite la maintenance, la réutilisation et l'extension des fonctionnalités. Utilisez ces utilitaires pour éviter de réinventer la roue et maintenir la cohérence dans toute l'application.

Pour toute question ou suggestion d'amélioration, n'hésitez pas à contacter l'équipe de développement.
