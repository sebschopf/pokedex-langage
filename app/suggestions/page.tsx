export const dynamic = 'force-dynamic';

import { getLanguages } from '@/lib/server/api/languages';
import { getUserRole } from '@/lib/server/api/users';
import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CorrectionForm from '../admin/suggestions/correction-form';
import type { UserRoleType } from '@/types/models/user-role';
import { handleCreateCorrection } from '../actions/suggestion-actions';

export default async function SuggestionsPage() {
  // Vérifier si l'utilisateur est connecté
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?redirectTo=/suggestions');
  }

  // Récupérer le rôle de l'utilisateur
  const userRole = await getUserRole(session.user.id);

  // Vérifier si l'utilisateur a un rôle valide
  const validRoles: UserRoleType[] = ['admin', 'validator', 'verified', 'registered'];
  if (!userRole || !validRoles.includes(userRole as UserRoleType)) {
    redirect('/');
  }

  // Récupérer la liste des langages
  const { data: languages } = await getLanguages();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Proposer une correction</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-6 text-gray-700">
          Vous avez repéré une erreur ou souhaitez suggérer une amélioration pour un langage de
          programmation ? Utilisez ce formulaire pour nous en faire part.
        </p>

        <CorrectionForm languages={languages} onSubmit={handleCreateCorrection} />
      </div>
    </div>
  );
}
