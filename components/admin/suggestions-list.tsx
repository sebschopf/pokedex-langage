"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Check, X, AlertTriangle, RefreshCw } from 'lucide-react'
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Importer les types depuis vos fichiers de modèles existants
import type { Correction } from "@/types/models/correction"
import type { LanguageProposal } from "@/types/models/language-proposal"

// Types étendus pour inclure les informations supplémentaires
interface CorrectionWithDetails extends Correction {
  languageName?: string;
  userEmail?: string;
}

interface LanguageProposalWithDetails extends LanguageProposal {
  userEmail?: string;
}

export default function SuggestionsList() {
  // État pour stocker les données
  const [corrections, setCorrections] = useState<CorrectionWithDetails[]>([])
  const [proposals, setProposals] = useState<LanguageProposalWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("corrections")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // TODO(#4): Utiliser userRole pour contrôler l'accès et les actions disponibles
  const { user, userRole: _userRole } = useAuth()
  
  // TODO(#4): Utiliser toast pour les notifications lors des actions sur les suggestions
  const { toast: _toast } = useToast()
  
  // TODO(#4): Implémenter les opérations CRUD avec supabase
  const _supabase = createClientSupabaseClient()
  
  const router = useRouter()

  // Fonction pour charger les données
  useEffect(() => {
    const loadSuggestions = async () => {
      setIsLoading(true)
      try {
        // Simuler le chargement des données
        // TODO(#4): Remplacer par de vraies requêtes Supabase
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Données de test pour les corrections
        const mockCorrections: CorrectionWithDetails[] = [
          {
            id: 1,
            languageId: 1,
            field: "description",
            suggestion: "JavaScript est un langage de programmation de scripts principalement utilisé dans les pages web interactives.",
            correctionText: "La description actuelle est incomplète et ne mentionne pas l'utilisation côté serveur avec Node.js.",
            status: "pending",
            userId: "user123",
            createdAt: "2023-05-15T10:30:00Z",
            updatedAt: 0, // Note: updatedAt est un number selon votre interface
            framework: null,
            languageName: "JavaScript",
            userEmail: "user@example.com"
          },
          {
            id: 2,
            languageId: 2,
            field: "creator",
            suggestion: "Guido van Rossum",
            correctionText: "Le créateur était incorrectement indiqué comme 'Guido Van Rossum'.",
            status: "approved",
            userId: "user456",
            createdAt: "2023-05-10T14:20:00Z",
            updatedAt: 1652347200000, // Timestamp pour "2023-05-12T09:15:00Z"
            framework: null,
            languageName: "Python",
            userEmail: "another@example.com"
          },
          {
            id: 3,
            languageId: 3,
            field: "year_created",
            suggestion: "1995",
            correctionText: "L'année de création était incorrecte (1994).",
            status: "rejected",
            userId: "user789",
            createdAt: "2023-05-08T16:45:00Z",
            updatedAt: 1652090400000, // Timestamp pour "2023-05-09T11:30:00Z"
            framework: null,
            languageName: "Java",
            userEmail: "third@example.com"
          }
        ]
        
        // Données de test pour les propositions de langages
        const mockProposals: LanguageProposalWithDetails[] = [
          {
            id: 1,
            name: "Rust",
            description: "Rust est un langage de programmation compilé multi-paradigme conçu pour être sûr, concurrent et pratique.",
            type: "compiled",
            createdYear: 2010,
            creator: "Mozilla Research",
            strengths: ["memory safety", "performance", "concurrency"],
            popularFrameworks: ["Rocket", "Actix", "Yew"],
            usedFor: "Systems programming, WebAssembly, CLI tools",
            status: "pending",
            userId: "user123",
            createdAt: "2023-05-14T09:20:00Z",
            updatedAt: null,
            userEmail: "user@example.com"
          },
          {
            id: 2,
            name: "Kotlin",
            description: "Kotlin est un langage de programmation orienté objet et fonctionnel, avec un typage statique.",
            type: "compiled",
            createdYear: 2011,
            creator: "JetBrains",
            strengths: ["interoperability", "safety", "conciseness"],
            popularFrameworks: ["Spring", "Ktor", "KotlinJS"],
            usedFor: "Android development, Server-side applications, Web development",
            status: "approved",
            userId: "user456",
            createdAt: "2023-05-12T11:15:00Z",
            updatedAt: "2023-05-13T14:30:00Z",
            userEmail: "another@example.com"
          }
        ]
        
        setCorrections(mockCorrections)
        setProposals(mockProposals)
      } catch (error) {
        console.error("Erreur lors du chargement des suggestions:", error)
        // TODO(#4): Utiliser toast pour afficher l'erreur
        // toast({
        //   title: "Erreur",
        //   description: "Impossible de charger les suggestions",
        //   variant: "destructive",
        // })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadSuggestions()
  }, [refreshTrigger])

  // TODO(#4): Implémenter les fonctions pour gérer les suggestions
  const handleApprove = async (id: number, type: 'correction' | 'proposal') => {
    // Simuler l'approbation
    console.log(`Approuver ${type} #${id}`)
    
    // TODO(#4): Implémenter avec Supabase
    // try {
    //   await withTokenRefresh(async () => {
    //     await _supabase
    //       .from(type === 'correction' ? 'corrections' : 'language_proposals')
    //       .update({ status: 'approved' })
    //       .eq('id', id)
    //     
    //     _toast({
    //       title: "Suggestion approuvée",
    //       description: `La ${type === 'correction' ? 'correction' : 'proposition'} a été approuvée avec succès`,
    //     })
    //     
    //     // Rafraîchir les données
    //     setRefreshTrigger(prev => prev + 1)
    //   })
    // } catch (error) {
    //   console.error(`Erreur lors de l'approbation:`, error)
    //   _toast({
    //     title: "Erreur",
    //     description: `Impossible d'approuver la ${type === 'correction' ? 'correction' : 'proposition'}`,
    //     variant: "destructive",
    //   })
    // }
  }

  const handleReject = async (id: number, type: 'correction' | 'proposal') => {
    // Simuler le rejet
    console.log(`Rejeter ${type} #${id}`)
    
    // TODO(#4): Implémenter avec Supabase
  }

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  // Rendu du statut avec badge coloré
  const renderStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Approuvé</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejeté</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Rendu des corrections
  const renderCorrections = () => {
    if (corrections.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-bold">Aucune correction en attente</h3>
          <p className="text-gray-500 mt-2">Il n'y a actuellement aucune correction à examiner.</p>
        </div>
      )
    }

    return corrections.map(correction => (
      <Card key={correction.id} className="mb-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">
                Correction pour {correction.languageName || `Langage #${correction.languageId}`}
              </CardTitle>
              <CardDescription>
                Champ: <span className="font-medium">{correction.field || "Non spécifié"}</span>
              </CardDescription>
            </div>
            {renderStatus(correction.status)}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-1">Suggestion:</h4>
              <p className="bg-gray-50 p-3 border border-gray-200 rounded-md">
                {correction.suggestion || "Aucune suggestion fournie"}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-1">Justification:</h4>
              <p className="bg-gray-50 p-3 border border-gray-200 rounded-md">
                {correction.correctionText}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>{correction.userEmail?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span>Soumis par {correction.userEmail || "Utilisateur inconnu"}</span>
            <span className="mx-2">•</span>
            <span>{new Date(correction.createdAt || "").toLocaleDateString()}</span>
          </div>
          
          {correction.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => handleApprove(correction.id, 'correction')}
              >
                <Check className="h-4 w-4 mr-1" /> Approuver
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-red-500 text-red-600 hover:bg-red-50"
                onClick={() => handleReject(correction.id, 'correction')}
              >
                <X className="h-4 w-4 mr-1" /> Rejeter
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    ))
  }

  // Rendu des propositions de langages
  const renderProposals = () => {
    if (proposals.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-bold">Aucune proposition en attente</h3>
          <p className="text-gray-500 mt-2">Il n'y a actuellement aucune proposition de langage à examiner.</p>
        </div>
      )
    }

    return proposals.map(proposal => (
      <Card key={proposal.id} className="mb-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">
                {proposal.name}
              </CardTitle>
              <CardDescription>
                Type: <span className="font-medium">{proposal.type || "Non spécifié"}</span> • 
                Créé en: <span className="font-medium">{proposal.createdYear || "Non spécifié"}</span> • 
                Par: <span className="font-medium">{proposal.creator || "Non spécifié"}</span>
              </CardDescription>
            </div>
            {renderStatus(proposal.status)}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-1">Description:</h4>
              <p className="bg-gray-50 p-3 border border-gray-200 rounded-md">
                {proposal.description || "Aucune description fournie"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-1">Points forts:</h4>
                <div className="bg-gray-50 p-3 border border-gray-200 rounded-md">
                  {proposal.strengths && proposal.strengths.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {proposal.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun point fort spécifié</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-1">Frameworks populaires:</h4>
                <div className="bg-gray-50 p-3 border border-gray-200 rounded-md">
                  {proposal.popularFrameworks && proposal.popularFrameworks.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {proposal.popularFrameworks.map((framework, index) => (
                        <li key={index}>{framework}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun framework spécifié</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-1">Utilisé pour:</h4>
              <p className="bg-gray-50 p-3 border border-gray-200 rounded-md">
                {proposal.usedFor || "Non spécifié"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>{proposal.userEmail?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span>Soumis par {proposal.userEmail || "Utilisateur inconnu"}</span>
            <span className="mx-2">•</span>
            <span>{new Date(proposal.createdAt || "").toLocaleDateString()}</span>
          </div>
          
          {proposal.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => handleApprove(proposal.id, 'proposal')}
              >
                <Check className="h-4 w-4 mr-1" /> Approuver
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-red-500 text-red-600 hover:bg-red-50"
                onClick={() => handleReject(proposal.id, 'proposal')}
              >
                <X className="h-4 w-4 mr-1" /> Rejeter
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    ))
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Gestion des Suggestions</h1>
        <Button variant="outline" onClick={handleRefresh} className="border-4 border-black hover:bg-yellow-300">
          <RefreshCw className="h-4 w-4 mr-2" /> Rafraîchir
        </Button>
      </div>
      
      <Tabs defaultValue="corrections" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 border-4 border-black">
          <TabsTrigger 
            value="corrections" 
            className={`py-3 font-bold ${activeTab === 'corrections' ? 'bg-yellow-300' : ''}`}
          >
            Corrections
          </TabsTrigger>
          <TabsTrigger 
            value="proposals" 
            className={`py-3 font-bold ${activeTab === 'proposals' ? 'bg-yellow-300' : ''}`}
          >
            Propositions de langages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="corrections" className="mt-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-lg">Chargement des corrections...</span>
            </div>
          ) : (
            renderCorrections()
          )}
        </TabsContent>
        
        <TabsContent value="proposals" className="mt-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-lg">Chargement des propositions...</span>
            </div>
          ) : (
            renderProposals()
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}