/**
 * Constantes pour les noms de tables dans la base de données
 * Utiliser ces constantes au lieu de chaînes littérales pour éviter les erreurs de frappe
 */

export const TABLE_NAMES = {
  LANGUAGES: 'languages',
  LIBRARIES: 'libraries',
  CORRECTIONS: 'corrections',
  LANGUAGE_PROPOSALS: 'language_proposals',
  PROFILES: 'profiles',
  USER_ROLES: 'user_roles',
  TODOS: 'todos',
  TODO_CATEGORIES: 'todo_categories',
  TODO_STATUS: 'todo_status',
  TECHNOLOGY_CATEGORIES: 'technology_categories',
  TECHNOLOGY_SUBTYPES: 'technology_subtypes',
  USAGE_CATEGORIES: 'usage_categories',
  LIBRARY_LANGUAGES: 'library_languages',
  LANGUAGE_USAGE: 'language_usage',
} as const;

// Type pour les noms de tables valides
export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES];
