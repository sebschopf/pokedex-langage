import { getAllCorrections } from '@/lib/server/api/corrections';
import { requireAdminSC } from '@/lib/server/auth/authorize';
import { CorrectionList } from '@/components/admin/correction-list';

export default async function AdminCorrectionsPage() {
  // Vérifier que l'utilisateur est administrateur
  await requireAdminSC();

  // Récupérer toutes les corrections
  const corrections = await getAllCorrections();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des corrections</h1>

      <CorrectionList corrections={corrections} />
    </div>
  );
}
