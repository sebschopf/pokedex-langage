import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UserProfileForm } from '@/./components/user-profile-form';

export const metadata = {
  title: 'Mon profil | POKEDEX_DEV',
  description: 'Gérez votre profil et vos préférences',
};

export default async function ProfilePage() {
  const supabase = createServerClient();

  // Vérifier si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?redirect=/profile');
  }

  // Récupérer le profil de l'utilisateur
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // Récupérer le rôle de l'utilisateur
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
        <UserProfileForm
          profile={profile || { id: session.user.id }}
          userEmail={session.user.email || ''}
          userRole={userRole?.role || 'registered'}
        />
      </div>
    </div>
  );
}
