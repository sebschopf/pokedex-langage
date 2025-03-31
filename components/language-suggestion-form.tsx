"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { createSupabaseClient } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation"

// Type pour les langages
interface Language {
  id: number
  name: string
}

// Type pour les rôles utilisateur
type UserRole = 'admin' | 'validator' | 'verified' | 'registered' | null;

// Schéma pour la correction d'un langage existant
const correctionSchema = z.object({
  language_id: z.string({
    required_error: "Veuillez sélectionner un langage",
  }),
  field: z.string({
    required_error: "Veuillez sélectionner un champ à corriger",
  }),
  correction_text: z.string()
    .min(10, "La correction doit contenir au moins 10 caractères"),
  framework: z.string().optional(),
});

// Schéma pour l'ajout d'un nouveau langage
const newLanguageSchema = z.object({
  name: z.string()
    .min(1, "Le nom du langage est requis"),
  year_created: z.string()
    .refine(val => !val || !isNaN(parseInt(val)), {
      message: "L'année doit être un nombre",
    })
    .optional(),
  creator: z.string().optional(),
  short_description: z.string()
    .min(10, "La description courte doit contenir au moins 10 caractères"),
  description: z.string()
    .min(20, "La description doit contenir au moins 20 caractères"),
  type: z.string().optional(),
  used_for: z.string().optional(),
  is_open_source: z.boolean().optional(),
  correction_text: z.string()
    .min(20, "Les informations supplémentaires doivent contenir au moins 20 caractères"),
});

type CorrectionFormValues = z.infer<typeof correctionSchema>;
type NewLanguageFormValues = z.infer<typeof newLanguageSchema>;

export function LanguageSuggestionForm() {
  const [activeTab, setActiveTab] = useState<"correction" | "new">("correction");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [similarLanguages, setSimilarLanguages] = useState<Language[]>([]);
  const { toast } = useToast();
  const supabase = createSupabaseClient();
  const { insert } = useSupabaseMutation();
  
  // Formulaire pour les corrections
  const correctionForm = useForm<CorrectionFormValues>({
    resolver: zodResolver(correctionSchema),
    defaultValues: {
      language_id: "",
      field: "",
      correction_text: "",
      framework: "",
    },
  });
  
  // Formulaire pour les nouveaux langages
  const newLanguageForm = useForm<NewLanguageFormValues>({
    resolver: zodResolver(newLanguageSchema),
    defaultValues: {
      name: "",
      year_created: "",
      creator: "",
      short_description: "",
      description: "",
      type: "",
      used_for: "",
      is_open_source: false,
      correction_text: "",
    },
  });
  
  // Charger l'utilisateur et son rôle
  useEffect(() => {
    const fetchUserAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        // Récupérer le rôle de l'utilisateur
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (data) {
          setUserRole(data.role as UserRole);
        } else {
          // Si l'utilisateur est authentifié mais n'a pas de rôle, lui attribuer le rôle 'registered'
          await supabase
            .from('user_roles')
            .insert({ id: session.user.id, role: 'registered' });
          
          setUserRole('registered');
        }
      }
    };
    
    fetchUserAndRole();
    
    // Configurer l'écouteur d'événements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          
          // Récupérer le rôle de l'utilisateur
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (data) {
            setUserRole(data.role as UserRole);
          } else {
            // Si l'utilisateur est authentifié mais n'a pas de rôle, lui attribuer le rôle 'registered'
            await supabase
              .from('user_roles')
              .insert({ id: session.user.id, role: 'registered' });
            
            setUserRole('registered');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserRole(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);
  
  // Charger les langages existants
  useEffect(() => {
    async function fetchLanguages() {
      const { data, error } = await supabase
        .from("languages")
        .select("id, name")
        .order("name");
      
      if (error) {
        console.error("Erreur lors du chargement des langages:", error);
        return;
      }
      
      setLanguages(data || []);
    }
    
    fetchLanguages();
  }, [supabase]);
  
  // Vérifier les langages similaires lors de la saisie d'un nouveau nom de langage
  const checkSimilarLanguages = async (name: string) => {
    if (name.length < 2) {
      setSimilarLanguages([]);
      return;
    }
    
    // Rechercher des langages avec un nom similaire
    const { data, error } = await supabase
      .from("languages")
      .select("id, name")
      .ilike("name", `%${name}%`)
      .limit(5);
    
    if (error) {
      console.error("Erreur lors de la recherche de langages similaires:", error);
      return;
    }
    
    setSimilarLanguages(data || []);
  };
  
  // Soumettre une correction
  async function submitCorrection(data: CorrectionFormValues) {
    setIsSubmitting(true);
    
    try {
      await insert({
        table: "corrections",
        data: {
          language_id: parseInt(data.language_id),
          field: data.field,
          correction_text: data.correction_text,
          framework: data.framework || null,
          status: "pending",
        },
        successMessage: "Correction soumise !",
        errorMessage: "Un problème est survenu lors de l'envoi de votre correction.",
        onSuccess: () => {
          correctionForm.reset();
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la correction:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  // Soumettre un nouveau langage
  async function submitNewLanguage(data: NewLanguageFormValues) {
    setIsSubmitting(true);
    
    try {
      // Vérifier si un langage avec un nom similaire existe déjà
      const { data: existingLanguages, error: searchError } = await supabase
        .from("languages")
        .select("id, name")
        .ilike("name", data.name)
        .limit(1);
      
      if (searchError) throw new Error(searchError.message);
      
      if (existingLanguages && existingLanguages.length > 0) {
        toast({
          title: "Attention",
          description: `Un langage avec un nom similaire existe déjà : ${existingLanguages[0].name}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Créer un objet avec les données du nouveau langage
      const languageData = {
        name: data.name,
        year_created: data.year_created ? parseInt(data.year_created) : null,
        creator: data.creator || null,
        short_description: data.short_description,
        description: data.description,
        type: data.type || null,
        used_for: data.used_for || null,
        is_open_source: data.is_open_source || false,
      };
      
      // Si l'utilisateur est un validateur ou un admin, créer directement le langage
      if (userRole === 'admin' || userRole === 'validator') {
        await insert({
          table: "languages",
          data: {
            name: data.name,
            slug: data.name.toLowerCase().replace(/\s+/g, '-'),
            year_created: data.year_created ? parseInt(data.year_created) : null,
            creator: data.creator || null,
            short_description: data.short_description,
            description: data.description,
            type: data.type || null,
            used_for: data.used_for || null,
            is_open_source: data.is_open_source || false,
          },
          successMessage: "Le nouveau langage a été ajouté avec succès.",
          errorMessage: "Un problème est survenu lors de l'ajout du langage.",
          onSuccess: () => {
            newLanguageForm.reset();
            setSimilarLanguages([]);
          }
        });
      } else {
        // Sinon, insérer dans la table corrections avec language_id NULL pour indiquer un nouveau langage
        await insert({
          table: "corrections",
          data: {
            language_id: null, // NULL indique un nouveau langage
            correction_text: data.correction_text,
            field: "new_language", // Champ spécial pour indiquer un nouveau langage
            suggestion: JSON.stringify(languageData), // Stocker les données du langage en JSON
            status: "pending",
          },
          successMessage: "Votre suggestion de nouveau langage a été soumise pour validation.",
          errorMessage: "Un problème est survenu lors de l'envoi de votre suggestion de langage.",
          onSuccess: () => {
            newLanguageForm.reset();
            setSimilarLanguages([]);
          }
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du nouveau langage:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Déterminer si l'utilisateur peut ajouter un nouveau langage
  const canAddNewLanguage = userRole === 'admin' || userRole === 'validator' || userRole === 'verified' || userRole === 'registered';
  
  // Déterminer si l'utilisateur peut soumettre directement un nouveau langage sans validation
  const canDirectlyAddLanguage = userRole === 'admin' || userRole === 'validator';

  // Ajout du return avec le JSX
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-black">
      <h2 className="text-2xl font-bold mb-6 bg-red-600 text-white p-2 inline-block">
        Proposer une modification
      </h2>
      
      {user ? (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-md">
          <p className="text-sm">
            Connecté en tant que : <span className="font-bold">{user.email}</span>
            {userRole && (
              <span className="ml-2 px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs">
                {userRole === 'admin' ? 'Administrateur' : 
                 userRole === 'validator' ? 'Validateur' : 
                 userRole === 'verified' ? 'Utilisateur vérifié' : 
                 'Utilisateur enregistré'}
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-md">
          <p className="text-sm">
            Vous n'êtes pas connecté. <a href="/login" className="text-blue-600 underline">Se connecter</a> pour accéder à plus de fonctionnalités.
          </p>
        </div>
      )}
      
      <Tabs 
        defaultValue="correction" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "correction" | "new")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="correction">Corriger un langage</TabsTrigger>
          <TabsTrigger value="new" disabled={!canAddNewLanguage}>Ajouter un langage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="correction">
          <Form {...correctionForm}>
            <form onSubmit={correctionForm.handleSubmit(submitCorrection)} className="space-y-6">
              <FormField
                control={correctionForm.control}
                name="language_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Langage à corriger</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un langage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.id} value={language.id.toString()}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={correctionForm.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Champ à corriger</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un champ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="name">Nom</SelectItem>
                        <SelectItem value="year_created">Année de création</SelectItem>
                        <SelectItem value="creator">Créateur</SelectItem>
                        <SelectItem value="short_description">Description courte</SelectItem>
                        <SelectItem value="description">Description</SelectItem>
                        <SelectItem value="type">Type</SelectItem>
                        <SelectItem value="usage_rate">Taux d'utilisation</SelectItem>
                        <SelectItem value="is_open_source">Open Source</SelectItem>
                        <SelectItem value="used_for">Utilisations principales</SelectItem>
                        <SelectItem value="strengths">Forces</SelectItem>
                        <SelectItem value="popular_frameworks">Frameworks populaires</SelectItem>
                        <SelectItem value="logo">Logo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={correctionForm.control}
                name="framework"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Framework (optionnel)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Si la correction concerne un framework spécifique" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Laissez vide si la correction ne concerne pas un framework spécifique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={correctionForm.control}
                name="correction_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correction proposée</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez en détail votre correction..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Soyez précis et incluez des sources si possible pour faciliter la vérification
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Soumettre la correction"}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="new">
          {canAddNewLanguage ? (
            <Form {...newLanguageForm}>
              <form onSubmit={newLanguageForm.handleSubmit(submitNewLanguage)} className="space-y-6">
                <FormField
                  control={newLanguageForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du langage</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ex: Rust, Go, etc." 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            checkSimilarLanguages(e.target.value);
                          }}
                        />
                      </FormControl>
                      {similarLanguages.length > 0 && (
                        <Alert className="mt-2 bg-yellow-50 dark:bg-yellow-900">
                          <AlertTitle>Langages similaires trouvés</AlertTitle>
                          <AlertDescription>
                            <ul className="list-disc pl-5 mt-2">
                              {similarLanguages.map((lang) => (
                                <li key={lang.id}>{lang.name}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={newLanguageForm.control}
                    name="year_created"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année de création</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 2009" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newLanguageForm.control}
                    name="creator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Créateur(s)</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Brendan Eich, Google, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={newLanguageForm.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description courte</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Une brève description du langage" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newLanguageForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description complète</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Une description détaillée du langage" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={newLanguageForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="Fullstack">Fullstack</SelectItem>
                            <SelectItem value="Mobile">Mobile</SelectItem>
                            <SelectItem value="Data">Data</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newLanguageForm.control}
                    name="is_open_source"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Open Source</FormLabel>
                          <FormDescription>
                            Le langage est-il open source ?
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={newLanguageForm.control}
                  name="used_for"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Utilisations principales</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="À quoi sert principalement ce langage ?" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newLanguageForm.control}
                  name="correction_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informations supplémentaires</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Frameworks populaires, forces du langage, etc." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Incluez ici toute information supplémentaire comme les frameworks populaires, 
                        les forces du langage, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : canDirectlyAddLanguage 
                    ? "Ajouter le langage" 
                    : "Soumettre le nouveau langage"}
                </Button>
                
                {!canDirectlyAddLanguage && (
                  <p className="text-sm text-gray-500 mt-2">
                    Votre suggestion sera examinée par un validateur avant d'être ajoutée.
                  </p>
                )}
              </form>
            </Form>
          ) : (
            <div className="p-6 text-center">
              <p className="mb-4">
                Vous devez être connecté pour proposer un nouveau langage.
              </p>
              <Button asChild>
                <a href="/login">Se connecter</a>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}