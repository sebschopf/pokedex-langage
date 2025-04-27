import type { TABLE_NAMES } from '@/constants/database';

// Type pour les noms de tables valides
export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES];
