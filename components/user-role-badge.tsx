'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import type { UserRoleType } from '@/lib/client/permissions';

// Modifier pour utiliser UserRoleType au lieu de UserRoleTypeDB
interface UserRoleBadgeProps {
  role: UserRoleType;
  className?: string;
  editable?: boolean;
  onRoleChange?: (newRole: UserRoleType) => void;
}

export function UserRoleBadge({
  role: initialRole,
  className,
  editable = false,
  onRoleChange,
}: UserRoleBadgeProps) {
  const [role, setRole] = useState<UserRoleType>(initialRole);

  // Définir les classes Tailwind pour chaque rôle, y compris anonymous
  const roleClasses: Record<UserRoleType, string> = {
    admin: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    validator: 'bg-amber-500 text-white hover:bg-amber-600',
    verified: 'bg-green-500 text-white hover:bg-green-600',
    registered: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    anonymous: 'bg-gray-300 text-gray-700 hover:bg-gray-400', // Ajout du style pour anonymous
  };

  // Déterminer la variante de base à utiliser
  const baseVariant = role === 'admin' ? 'destructive' : 'default';

  const handleRoleChange = (newRole: UserRoleType) => {
    setRole(newRole);
    if (onRoleChange) {
      onRoleChange(newRole);
    }
  };

  if (!editable) {
    return (
      <Badge
        variant={baseVariant}
        className={cn(
          role !== 'admin' && role !== 'registered' ? roleClasses[role] : '',
          className,
        )}
      >
        {role}
      </Badge>
    );
  }

  // Pour le menu déroulant, filtrer les rôles pour exclure "anonymous" si nécessaire
  // car on ne peut pas attribuer ce rôle à un utilisateur existant
  const editableRoles = Object.keys(roleClasses).filter(r => r !== 'anonymous') as Exclude<
    UserRoleType,
    'anonymous'
  >[];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant={baseVariant}
          className={cn(
            role !== 'admin' && role !== 'registered' ? roleClasses[role] : '',
            'cursor-pointer flex items-center gap-1',
            className,
          )}
        >
          {role} <ChevronDown className="h-3 w-3" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {editableRoles.map(roleKey => (
          <DropdownMenuItem
            key={roleKey}
            onClick={() => handleRoleChange(roleKey)}
            className={cn('font-bold', role === roleKey && 'bg-gray-100')}
          >
            {roleKey}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
