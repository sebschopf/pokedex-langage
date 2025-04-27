'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { customToast } from '@/components/custom-toast';
import { generateSlug } from '@/utils/slugs';
import { isValidSlug } from '@/utils/slugs';
import { createBrowserClient } from '@/lib/client/supabase';
import { libraryToDb } from '@/lib/server/mapping/library-mapping/library-to-db';
import type { Library } from '@/types/models/library';

export default function AddToolPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [officialWebsite, setOfficialWebsite] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isOpenSource, setIsOpenSource] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createBrowserClient();

  // Générer automatiquement un slug à partir du nom
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(generateSlug(newName));
  };

  // Permettre la modification manuelle du slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!name) {
      customToast({
        title: 'Erreur',
        description: 'Le nom est obligatoire',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    if (!slug) {
      customToast({
        title: 'Erreur',
        description: 'Le slug est obligatoire',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    if (!isValidSlug(slug)) {
      customToast({
        title: 'Erreur',
        description:
          "Le slug n'est pas valide. Utilisez uniquement des lettres minuscules, des chiffres et des tirets.",
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Créer un objet Library partiel
      const toolData: Partial<Library> = {
        name,
        slug,
        description: description || null,
        officialWebsite: officialWebsite || null,
        githubUrl: githubUrl || null,
        isOpenSource,
        technologyType: 'testing-tool',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Convertir en format DB
      const dbToolData = libraryToDb(toolData);

      // Créer un objet d'insertion avec les propriétés requises explicitement définies
      const insertData = {
        name: name, // Obligatoire
        slug: slug, // Obligatoire
        description: description || null,
        official_website: officialWebsite || null,
        github_url: githubUrl || null,
        is_open_source: isOpenSource,
        technology_type: 'testing-tool',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Définir des valeurs par défaut pour les autres propriétés requises
        language_id: null,
        logo_path: null,
        popularity: null,
        features: null,
        unique_selling_point: null,
        best_for: null,
        used_for: null,
        documentation_url: null,
        version: null,
        subtype: null,
        license: null,
        website_url: null,
      };

      // Insérer l'outil dans la base de données
      const { data, error } = await supabase.from('libraries').insert(insertData).select().single();

      if (error) throw error;

      customToast({
        title: 'Succès',
        description: "L'outil a été ajouté avec succès",
        type: 'success',
      });

      // Rediriger vers la page de l'outil
      router.push(`/tools/${slug}`);
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'outil:", error);
      customToast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Ajouter un nouvel outil d'analyse</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'outil</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom (obligatoire)</Label>
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="ex: Lighthouse"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (obligatoire)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={handleSlugChange}
                placeholder="ex: lighthouse"
                required
              />
              <p className="text-sm text-gray-500">
                Le slug est utilisé dans l'URL. Utilisez uniquement des lettres minuscules, des
                chiffres et des tirets.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description de l'outil..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officialWebsite">Site officiel</Label>
              <Input
                id="officialWebsite"
                type="url"
                value={officialWebsite}
                onChange={e => setOfficialWebsite(e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">URL GitHub</Label>
              <Input
                id="githubUrl"
                type="url"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                placeholder="https://github.com/example/repo"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isOpenSource" checked={isOpenSource} onCheckedChange={setIsOpenSource} />
              <Label htmlFor="isOpenSource">Open Source</Label>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Ajout en cours...' : "Ajouter l'outil"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
