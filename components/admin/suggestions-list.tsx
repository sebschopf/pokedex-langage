"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Check, X, RefreshCw } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { createBrowserClient } from "@/lib/supabase/client" // Modifié ici
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Importer les types depuis vos fichiers de modèles existants
import type { Correction } from "@/types/models/correction"
import type { LanguageProposal } from "@/types/models/language-proposal"

// Types étendus pour inclure les informations supplémentaires
interface CorrectionWithDetails extends Correction {
  languageName?: string
  userEmail?: string
}

interface LanguageProposalWithDetails extends LanguageProposal {
  userEmail?: string
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
  const _supabase = createBrowserClient() // Modifié ici

  const router = useRouter()

  // Fonction pour charger les données
  useEffect(() => {
    const loadSuggestions = async () => {
      setIsLoading(true)
      try {
        // Simuler le chargement des données
        // TODO(#4): Remplacer par de vraies requêtes Supabase
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Données de test pour les corrections
        const mockCorrections: CorrectionWithDetails[] = [
          {
            id: 1,
            languageId: 1,
            field: "description",
            suggestion:
              "JavaScript est un langage de programmation de scripts principalement utilisé dans les pages web interactives.",
            correctionText:
              "La description actuelle est incomplète et ne mentionne pas l'utilisation côté serveur avec Node.js.",
            status: "pending",
            userId: "user123",
            createdAt: "2023-05-15T10:30:00Z",
            updatedAt: "2023-05-15T10:30:00Z", // Modifié ici pour être une string
            framework: null,
            languageName: "JavaScript",
            userEmail: "user@example.com",
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
            updatedAt: "2023-05-12T09:15:00Z", // Modifié ici pour être une string
            framework: null,
            languageName: "Python",
            userEmail: "another@example.com",
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
            updatedAt: "2023-05-09T11:30:00Z", // Modifié ici pour être une string
            framework: null,
            languageName: "Java",
            userEmail: "third@example.com",
          },
        ]

        // Données de test pour les propositions de langages
        const mockProposals: LanguageProposalWithDetails[] = [
          {
            id: 1,
            name: "Rust",
            description:
              "Rust est un langage de programmation compilé multi-paradigme conçu pour être sûr, concurrent et pratique.",
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
            userEmail: "user@example.com",
          },
          {
            id: 2,
            name: "Kotlin",
            description:
              "Kotlin est un langage de programmation orienté objet et fonctionnel, avec un typage statique.",
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
            userEmail: "another@example.com",
          },
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

  const handleApproveCorrection = async (id: number) => {
    // TODO(#4): Implémenter la logique d'approbation avec Supabase
    console.log(`Correction approuvée avec l'ID: ${id}`)
    // Mettre à jour l'état local après l'approbation réussie
    setCorrections(
      corrections.map((correction) => (correction.id === id ? { ...correction, status: "approved" } : correction)),
    )
  }

  const handleRejectCorrection = async (id: number) => {
    // TODO(#4): Implémenter la logique de rejet avec Supabase
    console.log(`Correction rejetée avec l'ID: ${id}`)
    // Mettre à jour l'état local après le rejet réussi
    setCorrections(
      corrections.map((correction) => (correction.id === id ? { ...correction, status: "rejected" } : correction)),
    )
  }

  const handleApproveProposal = async (id: number) => {
    // TODO(#4): Implémenter la logique d'approbation avec Supabase
    console.log(`Proposition approuvée avec l'ID: ${id}`)
    // Mettre à jour l'état local après l'approbation réussie
    setProposals(proposals.map((proposal) => (proposal.id === id ? { ...proposal, status: "approved" } : proposal)))
  }

  const handleRejectProposal = async (id: number) => {
    // TODO(#4): Implémenter la logique de rejet avec Supabase
    console.log(`Proposition rejetée avec l'ID: ${id}`)
    // Mettre à jour l'état local après le rejet réussi
    setProposals(proposals.map((proposal) => (proposal.id === id ? { ...proposal, status: "rejected" } : proposal)))
  }

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const renderCorrections = () => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {corrections.map((correction) => (
        <Card key={correction.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {correction.languageName} - {correction.field}
            </CardTitle>
            <CardDescription>Proposé par: {correction.userEmail}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Badge variant="secondary">Suggestion</Badge>
              <p className="text-gray-700">{correction.suggestion}</p>
            </div>
            <div>
              <Badge variant="secondary">Correction</Badge>
              <p className="text-gray-700">{correction.correctionText}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              {correction.status === "pending" && <Badge variant="outline">En attente</Badge>}
              {correction.status === "approved" && (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Approuvé
                </Badge>
              )}
              {correction.status === "rejected" && <Badge variant="destructive">Rejeté</Badge>}
            </div>
            <div className="space-x-2">
              {correction.status === "pending" && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleApproveCorrection(correction.id)}
                    className="text-green-500 hover:bg-green-100"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approuver
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleRejectCorrection(correction.id)}
                    className="text-red-500 hover:bg-red-100"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeter
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const renderProposals = () => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{proposal.name}</CardTitle>
            <CardDescription>Proposé par: {proposal.userEmail}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Badge variant="secondary">Description</Badge>
              <p className="text-gray-700">{proposal.description}</p>
            </div>
            <div>
              <Badge variant="secondary">Type</Badge>
              <p className="text-gray-700">{proposal.type}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              {proposal.status === "pending" && <Badge variant="outline">En attente</Badge>}
              {proposal.status === "approved" && (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Approuvé
                </Badge>
              )}
              {proposal.status === "rejected" && <Badge variant="destructive">Rejeté</Badge>}
            </div>
            <div className="space-x-2">
              {proposal.status === "pending" && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleApproveProposal(proposal.id)}
                    className="text-green-500 hover:bg-green-100"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approuver
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleRejectProposal(proposal.id)}
                    className="text-red-500 hover:bg-red-100"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeter
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

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
            className={`py-3 font-bold ${activeTab === "corrections" ? "bg-yellow-300" : ""}`}
          >
            Corrections
          </TabsTrigger>
          <TabsTrigger
            value="proposals"
            className={`py-3 font-bold ${activeTab === "proposals" ? "bg-yellow-300" : ""}`}
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
