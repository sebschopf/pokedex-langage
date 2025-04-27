import { redirect } from 'next/navigation';

export default function LegacyLanguageIdPage({ params }: { params: { id: string } }) {
  // Rediriger vers la nouvelle route
  redirect(`/languages/id/${params.id}`);
}
