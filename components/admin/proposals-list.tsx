'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { withTokenRefresh } from '@/lib/client/auth-helpers';
import { createBrowserClient } from '@/lib/client/supabase';
import { Loader2 } from 'lucide-react';

interface Proposal {
  id: string;
  name: string;
  type: string;
  description: string;
  created_year?: number;
  creator?: string;
  used_for?: string;
  status: string;
  created_at: string;
  user_id: string;
}

interface ProposalsListProps {
  proposals: Proposal[];
}

export function ProposalsList({ proposals }: ProposalsListProps) {
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [localProposals, setLocalProposals] = useState<Proposal[]>(proposals);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createBrowserClient();

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    setIsProcessing(prev => ({ ...prev, [id]: true }));

    try {
      // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token
      await withTokenRefresh(async () => {
        // Convertir l'ID en nombre avant de l'utiliser
        const numericId = Number.parseInt(id, 10);

        // Mettre à jour le statut dans la base de données
        const { error } = await supabase
          .from('language_proposals')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', numericId);

        if (error) {
          throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
        }

        // Mettre à jour l'état local
        setLocalProposals(prevProposals =>
          prevProposals.map(proposal => (proposal.id === id ? { ...proposal, status } : proposal)),
        );

        // Afficher une notification de succès
        toast({
          title: status === 'approved' ? 'Proposition approuvée' : 'Proposition rejetée',
          description:
            status === 'approved'
              ? 'La proposition a été approuvée et le langage sera ajouté.'
              : 'La proposition a été rejetée.',
        });

        // Si la proposition est approuvée, créer le langage correspondant
        if (status === 'approved') {
          // Récupérer les détails de la proposition
          const proposal = localProposals.find(p => p.id === id);

          if (proposal) {
            // Créer un nouveau langage basé sur la proposition
            const { error: createError } = await supabase.from('languages').insert({
              name: proposal.name,
              slug: proposal.name.toLowerCase().replace(/\s+/g, '-'),
              year_created: proposal.created_year,
              creator: proposal.creator,
              description: proposal.description,
              used_for: proposal.used_for,
              type: proposal.type,
              is_open_source: true, // Valeur par défaut
              created_at: new Date().toISOString(),
            });

            if (createError) {
              console.error('Erreur lors de la création du langage:', createError);
              toast({
                title: 'Avertissement',
                description:
                  'La proposition a été approuvée, mais une erreur est survenue lors de la création du langage.',
                variant: 'destructive',
              });
            }
          }
        }

        // Rafraîchir la page pour mettre à jour les données
        router.refresh();
      });
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la mise à jour du statut.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  }

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (localProposals.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-muted-foreground">Aucune proposition en attente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localProposals.map(proposal => (
        <Card key={proposal.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">
                {proposal.name} <span className="text-sm font-normal">({proposal.type})</span>
              </CardTitle>
              <Badge
                className={
                  proposal.status === 'pending'
                    ? 'bg-yellow-500'
                    : proposal.status === 'approved'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                }
              >
                {proposal.status === 'pending'
                  ? 'En attente'
                  : proposal.status === 'approved'
                    ? 'Approuvée'
                    : 'Rejetée'}
              </Badge>
            </div>
            {proposal.created_year && (
              <p className="text-sm text-muted-foreground">
                Créé en {proposal.created_year} {proposal.creator ? `par ${proposal.creator}` : ''}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Description:</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{proposal.description}</p>
              </div>

              {proposal.used_for && (
                <div>
                  <h3 className="font-medium mb-1">Utilisations:</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded-md">{proposal.used_for}</p>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Soumis le {formatDate(proposal.created_at)}
              </div>
            </div>
          </CardContent>
          {proposal.status === 'pending' && (
            <CardFooter className="flex justify-end gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(proposal.id, 'rejected')}
                disabled={isProcessing[proposal.id]}
              >
                {isProcessing[proposal.id] ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  'Rejeter'
                )}
              </Button>
              <Button
                size="sm"
                onClick={() => updateStatus(proposal.id, 'approved')}
                disabled={isProcessing[proposal.id]}
              >
                {isProcessing[proposal.id] ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  'Approuver'
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
