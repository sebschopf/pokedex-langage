'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from '@/hooks';
import { createBrowserClient } from '@/lib/client/supabase';

interface Language {
  id: number;
  name: string;
  slug: string;
  logo_path?: string | null;
}

interface AssociatedLanguage extends Language {
  isPrimary: boolean;
}

interface LanguageAssociationManagerProps {
  toolId: number;
  toolSlug: string;
  initialAssociations: AssociatedLanguage[];
}

export function LanguageAssociationManager({
  toolId,
  toolSlug,
  initialAssociations = [],
}: LanguageAssociationManagerProps) {
  const [associations, setAssociations] = useState<AssociatedLanguage[]>(initialAssociations);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createBrowserClient();

  // Charger les langages disponibles
  useEffect(() => {
    async function loadLanguages() {
      try {
        const { data, error } = await supabase
          .from('languages')
          .select('id, name, slug, logo_path')
          .order('name');

        if (error) throw error;

        // Filtrer les langages déjà associés
        const associatedIds = associations.map(a => a.id);
        const filtered = data.filter(lang => !associatedIds.includes(lang.id));

        setAvailableLanguages(filtered);
      } catch (error) {
        console.error('Erreur lors du chargement des langages:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les langages disponibles',
          variant: 'destructive',
        });
      }
    }

    loadLanguages();
  }, [supabase, associations]);

  // Ajouter une association
  const addAssociation = async () => {
    if (!selectedLanguageId) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un langage',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const languageId = Number.parseInt(selectedLanguageId);

      // Vérifier si on définit un langage comme principal alors qu'un autre l'est déjà
      if (isPrimary && associations.some(a => a.isPrimary)) {
        // Demander confirmation
        if (
          !confirm(
            'Un autre langage est déjà défini comme principal. Voulez-vous remplacer ce langage principal?',
          )
        ) {
          setIsLoading(false);
          return;
        }
      }

      // Appeler l'API pour ajouter l'association
      const response = await fetch(`/api/tools/${toolId}/languages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageId,
          isPrimary,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'ajout de l'association");
      }

      // Si on définit ce langage comme principal, mettre à jour les autres langages
      if (isPrimary) {
        setAssociations(
          associations.map(lang => ({
            ...lang,
            isPrimary: false,
          })),
        );
      }

      // Trouver le langage sélectionné dans la liste des disponibles
      const selectedLanguage = availableLanguages.find(lang => lang.id === languageId);

      if (selectedLanguage) {
        // Ajouter à la liste des associations
        setAssociations([...associations, { ...selectedLanguage, isPrimary }]);

        // Retirer de la liste des disponibles
        setAvailableLanguages(availableLanguages.filter(lang => lang.id !== languageId));

        // Réinitialiser la sélection
        setSelectedLanguageId('');
        setIsPrimary(false);

        toast({
          title: 'Succès',
          description: 'Association ajoutée avec succès',
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'association:", error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Supprimer une association
  const removeAssociation = async (languageId: number) => {
    setIsLoading(true);

    try {
      // Vérifier si c'est un langage principal
      const isRemovingPrimary =
        associations.find(lang => lang.id === languageId)?.isPrimary || false;

      // Appeler l'API pour supprimer l'association
      const response = await fetch(`/api/tools/${toolId}/languages?languageId=${languageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la suppression de l'association");
      }

      // Trouver le langage dans la liste des associations
      const removedLanguage = associations.find(lang => lang.id === languageId);

      if (removedLanguage) {
        // Retirer de la liste des associations
        setAssociations(associations.filter(lang => lang.id !== languageId));

        // Ajouter à la liste des disponibles
        setAvailableLanguages(
          [
            ...availableLanguages,
            {
              id: removedLanguage.id,
              name: removedLanguage.name,
              slug: removedLanguage.slug,
              logo_path: removedLanguage.logo_path,
            },
          ].sort((a, b) => a.name.localeCompare(b.name)),
        );

        toast({
          title: 'Succès',
          description: 'Association supprimée avec succès',
        });

        // Si c'était un langage principal, informer l'utilisateur
        if (isRemovingPrimary) {
          toast({
            title: 'Information',
            description:
              'Vous avez supprimé le langage principal. Vous pouvez en définir un nouveau si nécessaire.',
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'association:", error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Définir un langage comme principal
  const setLanguageAsPrimary = async (languageId: number) => {
    setIsLoading(true);

    try {
      // Appeler l'API pour mettre à jour l'association
      const response = await fetch(`/api/tools/${toolId}/languages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageId,
          isPrimary: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la mise à jour de l'association");
      }

      // Mettre à jour l'état local
      setAssociations(
        associations.map(lang => ({
          ...lang,
          isPrimary: lang.id === languageId,
        })),
      );

      toast({
        title: 'Succès',
        description: 'Langage principal défini avec succès',
      });
    } catch (error) {
      console.error('Erreur lors de la définition du langage principal:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Gérer les langages associés</h3>

      {/* Liste des associations existantes */}
      <div className="space-y-2">
        <h4 className="font-medium">Langages associés:</h4>
        {associations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {associations.map(lang => (
              <div key={lang.id} className="flex items-center">
                <Badge
                  variant={lang.isPrimary ? 'success' : 'outline'}
                  className="flex items-center gap-1 py-1 px-3"
                >
                  {lang.name} {lang.isPrimary && '(principal)'}
                  <button
                    onClick={() => removeAssociation(lang.id)}
                    className="ml-1 hover:bg-gray-200 rounded-full p-1"
                    disabled={isLoading}
                    aria-label="Supprimer"
                  >
                    <X size={14} />
                  </button>
                </Badge>
                {!lang.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguageAsPrimary(lang.id)}
                    disabled={isLoading}
                    className="ml-1 text-xs"
                  >
                    Définir comme principal
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun langage associé</p>
        )}
      </div>

      {/* Formulaire d'ajout */}
      <div className="border p-4 rounded-md space-y-4">
        <h4 className="font-medium">Ajouter un langage:</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language-select">Langage</Label>
            <Select
              value={selectedLanguageId}
              onValueChange={setSelectedLanguageId}
              disabled={isLoading || availableLanguages.length === 0}
            >
              <SelectTrigger id="language-select">
                <SelectValue placeholder="Sélectionner un langage" />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map(lang => (
                  <SelectItem key={lang.id} value={lang.id.toString()}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is-primary"
              checked={isPrimary}
              onCheckedChange={setIsPrimary}
              disabled={isLoading}
            />
            <Label htmlFor="is-primary">Définir comme langage principal</Label>
          </div>

          <div className="flex items-end">
            <Button onClick={addAssociation} disabled={isLoading || !selectedLanguageId}>
              {isLoading ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Note: Un outil peut être associé à plusieurs langages, mais un seul peut être défini comme
          principal.
        </p>
      </div>
    </div>
  );
}
