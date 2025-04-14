/** Voici comment modifier lib/utils.ts pour résoudre les erreurs
*import { clsx, type ClassValue } from "clsx"
*import { twMerge } from "tailwind-merge"
*/
/**
* Fichier de compatibilité pour maintenir la rétrocompatibilité
* @deprecated Utilisez les imports depuis @/utils/* à la place
*/

import { getTypeBadgeColor } from "@/utils/theme"
import { cn } from "@/utils/theme/cn" // Import direct depuis le fichier source
import { getImageName } from "@/utils/image"
import { generateSlug, generateLanguageSlug } from "@/utils/slug"
import { toNumber, toString, toBoolean } from "@/utils/conversion"
import { formatDate, formatDateFr } from "@/utils/date"

// Réexportation pour la compatibilité
export {
 cn,
 getTypeBadgeColor,
 getImageName,
 generateSlug,
 generateLanguageSlug,
 toNumber,
 toString,
 toBoolean,
 formatDate,
 formatDateFr,
}

// Avertissement de dépréciation
if (process.env.NODE_ENV === "development") {
 console.warn("lib/utils.ts est déprécié. Utilisez les imports depuis @/utils/* à la place.")
}

// Supprimez cette redéclaration de la fonction cn
// export function cn(...inputs: ClassValue[]) {
//  return twMerge(clsx(inputs))
// }