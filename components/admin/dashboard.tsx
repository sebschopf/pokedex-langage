'use client';

import type { UserRoleType } from '@/lib/client/permissions';
import type { User as SupabaseUser } from '@supabase/supabase-js';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Code,
  FileEdit,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  ImageIcon,
  Settings,
  User,
} from 'lucide-react';

interface Suggestion {
  id: number;
  language_id: number | null;
  field: string;
  correction_text: string;
  framework: string | null;
  status: string;
  created_at: string;
  languages?: {
    name: string;
  };
  type?: string;
  proposal_name?: string;
}

interface AdminDashboardProps {
  pendingSuggestionsCount: number;
  pendingCorrectionsCount: number;
  pendingProposalsCount: number;
  languagesCount: number;
  usersCount: number;
  recentSuggestions: Suggestion[];
  userRole: UserRoleType;
  user: SupabaseUser | null;
}

export function AdminDashboard({
  pendingSuggestionsCount,
  pendingCorrectionsCount,
  pendingProposalsCount,
  languagesCount,
  usersCount,
  recentSuggestions,
  userRole,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Formater la date
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

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Tableau de bord d'administration</h1>
          <p className="text-gray-500 mt-2">
            Gérez les suggestions, les langages et les utilisateurs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="ml-2 text-sm">
            {userRole === 'admin' ? 'Administrateur' : 'Validateur'}
          </Badge>
          <Button asChild variant="outline" size="sm">
            <Link href="/profile">
              <User className="h-4 w-4 mr-2" />
              Mon profil
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="users" disabled={userRole !== 'admin'}>
            Utilisateurs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Suggestions en attente</CardTitle>
                <FileEdit className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingSuggestionsCount}</div>
                <p className="text-xs text-gray-500">
                  {pendingSuggestionsCount === 0
                    ? 'Aucune suggestion en attente'
                    : pendingSuggestionsCount === 1
                      ? '1 suggestion à valider'
                      : `${pendingSuggestionsCount} suggestions à valider`}
                  {pendingSuggestionsCount > 0 && (
                    <span className="block mt-1">
                      {pendingCorrectionsCount} correction(s) et {pendingProposalsCount}{' '}
                      proposition(s)
                    </span>
                  )}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/admin/suggestions">Gérer les suggestions</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Langages</CardTitle>
                <Code className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{languagesCount}</div>
                <p className="text-xs text-gray-500">
                  {languagesCount === 0
                    ? 'Aucun langage'
                    : languagesCount === 1
                      ? '1 langage dans la base'
                      : `${languagesCount} langages dans la base`}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/admin/languages">Gérer les langages</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{usersCount}</div>
                <p className="text-xs text-gray-500">
                  {usersCount === 0
                    ? 'Aucun utilisateur'
                    : usersCount === 1
                      ? '1 utilisateur enregistré'
                      : `${usersCount} utilisateurs enregistrés`}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={userRole !== 'admin'}
                >
                  <Link href={userRole === 'admin' ? '/admin/users' : '#'}>
                    Gérer les utilisateurs
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Gestion du contenu</CardTitle>
                <CardDescription>Gérez les médias et les langages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                  >
                    <Link href="/admin/storage">
                      <ImageIcon className="h-8 w-8 mb-2" />
                      Gérer les médias
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                  >
                    <Link href="/admin/languages">
                      <Database className="h-8 w-8 mb-2" />
                      Gérer les langages
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mon compte</CardTitle>
                <CardDescription>Gérez votre profil et vos paramètres</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                  >
                    <Link href="/profile">
                      <User className="h-8 w-8 mb-2" />
                      Mon profil
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                  >
                    <Link href="/admin/settings">
                      <Settings className="h-8 w-8 mb-2" />
                      Paramètres
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Suggestions récentes</CardTitle>
              <CardDescription>Les 5 dernières suggestions soumises</CardDescription>
            </CardHeader>
            <CardContent>
              {recentSuggestions.length === 0 ? (
                <div className="text-center py-4 text-gray-500">Aucune suggestion récente</div>
              ) : (
                <div className="space-y-4">
                  {recentSuggestions.map(suggestion => (
                    <div key={suggestion.id} className="flex items-start border-b pb-4">
                      <div className="mr-4 mt-1">
                        {suggestion.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : suggestion.status === 'approved' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">
                            {suggestion.type === 'proposal'
                              ? `Nouveau langage: ${suggestion.proposal_name}`
                              : suggestion.field === 'new_language'
                                ? 'Nouveau langage'
                                : `Correction pour ${suggestion.languages?.name || 'un langage'}`}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {formatDate(suggestion.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {suggestion.correction_text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/admin/suggestions">Voir toutes les suggestions</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des suggestions</CardTitle>
              <CardDescription>Validez ou rejetez les suggestions des utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Suggestions en attente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingSuggestionsCount}</div>
                    <p className="text-sm text-gray-500">
                      Suggestions qui nécessitent votre validation
                      {pendingSuggestionsCount > 0 && (
                        <span className="block mt-1">
                          {pendingCorrectionsCount} correction(s) et {pendingProposalsCount}{' '}
                          proposition(s)
                        </span>
                      )}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link href="/admin/suggestions">Traiter les suggestions</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ajouter un langage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Ajouter directement un nouveau langage à la base de données
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/admin/languages/new">Ajouter un langage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Gestion du contenu</CardTitle>
              <CardDescription>Gérez les langages et les médias du site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Langages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Gérez les langages de programmation</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link href="/admin/languages">Gérer les langages</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Médias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Gérez les logos, avatars et autres médias
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link href="/admin/storage">Gérer les médias</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ajouter un langage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Créer un nouveau langage de programmation
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/admin/languages/new">Ajouter un langage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>Gérez les rôles et les permissions des utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Button asChild variant="default" size="lg">
                  <Link href="/admin/users">Accéder à la gestion des utilisateurs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
