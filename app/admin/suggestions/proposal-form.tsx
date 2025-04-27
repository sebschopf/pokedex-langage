'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

export function ProposalForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<string>('Backend');
  const [usedFor, setUsedFor] = useState('');
  const [createdYear, setCreatedYear] = useState<string>('');
  const [isOpenSource, setIsOpenSource] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !description || !type || !usedFor || !createdYear) {
      toast({
        title: 'Formulaire incomplet',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          type,
          used_for: usedFor,
          created_year: Number.parseInt(createdYear, 10),
          is_open_source: isOpenSource,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      toast({
        title: 'Proposition soumise',
        description:
          'Votre proposition de langage a été soumise avec succès et sera examinée par notre équipe.',
      });

      // Réinitialiser le formulaire
      setName('');
      setDescription('');
      setType('Backend');
      setUsedFor('');
      setCreatedYear('');
      setIsOpenSource(true);

      // Rafraîchir la page
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la soumission de votre proposition.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du langage</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ex: Rust, Python, JavaScript..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description courte</Label>
        <Textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Décrivez brièvement ce langage..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type de langage</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Fullstack">Fullstack</SelectItem>
            <SelectItem value="Mobile">Mobile</SelectItem>
            <SelectItem value="Data">Data</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="usedFor">Utilisé pour</Label>
        <Textarea
          id="usedFor"
          value={usedFor}
          onChange={e => setUsedFor(e.target.value)}
          placeholder="À quoi sert ce langage ? Quels types d'applications peut-on créer avec ?"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdYear">Année de création</Label>
        <Input
          id="createdYear"
          type="number"
          value={createdYear}
          onChange={e => setCreatedYear(e.target.value)}
          placeholder="Ex: 2009"
          min="1950"
          max={new Date().getFullYear()}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isOpenSource" checked={isOpenSource} onCheckedChange={setIsOpenSource} />
        <Label htmlFor="isOpenSource">Open Source</Label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Soumission en cours...' : 'Soumettre la proposition'}
      </Button>
    </form>
  );
}
