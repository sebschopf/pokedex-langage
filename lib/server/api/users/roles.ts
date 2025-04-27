import { createServerClient } from '@/lib/supabase/server';
import type { UserRoleType } from '@/types/models/user-role';

/**
 * Récupère le rôle d'un utilisateur à partir de son ID
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @returns Une promesse qui résout vers le rôle de l'utilisateur
 * @throws {Error} Si une erreur survient lors de la récupération du rôle
 */
export async function getUserRole(userId: string): Promise<UserRoleType> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Aucun rôle trouvé, retourner le rôle par défaut
      return 'anonymous';
    }
    console.error(`Erreur lors de la récupération du rôle de l'utilisateur ${userId}:`, error);
    throw error;
  }

  // Vérifier que le rôle est bien une valeur valide de UserRoleType
  const role = data.role as string;
  const validRoles: UserRoleType[] = ['admin', 'validator', 'verified', 'registered', 'anonymous'];

  if (validRoles.includes(role as UserRoleType)) {
    return role as UserRoleType;
  }

  return 'anonymous';
}

/**
 * Met à jour le rôle d'un utilisateur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @param role - Le nouveau rôle à attribuer
 * @returns Une promesse qui résout vers true si la mise à jour a réussi
 * @throws {Error} Si une erreur survient lors de la mise à jour du rôle
 */
export async function updateUserRole(userId: string, role: UserRoleType): Promise<boolean> {
  // Ne pas permettre de définir le rôle "anonymous" explicitement
  if (role === 'anonymous') {
    throw new Error("Le rôle 'anonymous' ne peut pas être attribué explicitement");
  }

  const supabase = createServerClient();

  // Vérifier si l'utilisateur a déjà un rôle
  const { data: existingRole } = await supabase
    .from('user_roles')
    .select('*')
    .eq('id', userId)
    .single();

  let error;

  if (existingRole) {
    // Mettre à jour le rôle existant
    const result = await supabase.from('user_roles').update({ role }).eq('id', userId);
    error = result.error;
  } else {
    // Créer un nouveau rôle
    const result = await supabase.from('user_roles').insert({ id: userId, role });
    error = result.error;
  }

  if (error) {
    console.error(`Erreur lors de la mise à jour du rôle de l'utilisateur ${userId}:`, error);
    throw error;
  }

  return true;
}

/**
 * Vérifie si un utilisateur a un rôle spécifique ou supérieur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @param requiredRole - Le rôle requis
 * @returns Une promesse qui résout vers true si l'utilisateur a le rôle requis ou supérieur
 */
export async function hasRole(userId: string, requiredRole: UserRoleType): Promise<boolean> {
  // Si le rôle requis est "anonymous", tout utilisateur y a accès
  if (requiredRole === 'anonymous') {
    return true;
  }

  const userRole = await getUserRole(userId);

  // Définir la hiérarchie des rôles
  const roleHierarchy: Record<UserRoleType, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
    anonymous: 0,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
