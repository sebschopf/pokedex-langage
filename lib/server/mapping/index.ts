/**
 * Point d'entrée pour toutes les fonctions de mapping
 * Réexporte les fonctions depuis les fichiers spécifiques
 */

// Mappings liés aux langages
export { dbToLanguage, languageToDb } from "./language-mapping"
export { dbToCorrection, correctionToDb } from "./correction-mapping"

// Mappings liés aux utilisateurs
export { dbToProfile, profileToDb } from "./profile-mapping"
export { dbToUserRole, userRoleToDb } from "./user-role-mapping"

// Mappings liés aux tâches
export {
  dbToTodo,
  todoToDb,
} from "./todo-mapping"

// Mappings liés aux catégories de tâches
export {
  dbToTodoCategory,
  todoCategoryToDb,
} from "./todo-mapping"

// Mappings liés aux statuts de tâches
export {
  dbToTodoStatus,
  todoStatusToDb,
} from "./todo-mapping"

// Mappings liés aux technologies
export { dbToTechnologyCategory, technologyCategoryToDb } from "./technology-category-mapping"
export { dbToTechnologySubtype, technologySubtypeToDb } from "./technology-subtype-mapping"
export { dbToUsageCategory, usageCategoryToDb } from "./usage-category-mapping"

// Mappings liés aux propositions
export { dbToProposal, proposalToDb } from "./proposal-mapping"

// Mappings liés aux bibliothèques (si vous avez ce fichier)
// export { dbToLibrary, libraryToDb } from "./library-mapping"
