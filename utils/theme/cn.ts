import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilitaire pour combiner des classes CSS conditionnellement
 * @param inputs Classes CSS à combiner
 * @returns Classes CSS combinées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
