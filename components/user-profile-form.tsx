"use client"

import type React from "react"
import type { UserRoleType } from "@/types/user-role"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createSupabaseClient } from "@/lib/supabase"
import AvatarUpload from "@/components/avatar-upload"
import { UserRoleBadge } from "@/components/user-role-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StorageManager from "@/components/storage-manager"

interface Profile {
  id: string
  username?: string
  full_name?: string
  bio?: string
  website?: string
  avatar_url?: string
  [key: string]: any
}

interface UserProfileFormProps {
  profile: Profile
  userEmail: string
  userRole: UserRoleType
}

export function UserProfileForm({ profile, userEmail, userRole }: UserProfileFormProps) {
  const [formData, setFormData] = useState<Profile>(profile)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const { toast } = useToast()
  const supabase = createSupabaseClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar_url: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: profile.id,
        username: formData.username,
        full_name: formData.full_name,
        bio: formData.bio,
        website: formData.website,
        avatar_url: formData.avatar_url,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès.",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="profile">Informations du profil</TabsTrigger>
        <TabsTrigger value="avatar">Avatar</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Informations du profil</CardTitle>
            <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <AvatarUpload
                  userId={profile.id}
                  avatarUrl={formData.avatar_url || null}
                  onAvatarChange={handleAvatarChange}
                  size="lg"
                />
                <div>
                  <p className="font-medium">{userEmail}</p>
                  <div className="mt-1">
                    <UserRoleBadge role={userRole} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Nom d'utilisateur
                  </label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="full_name" className="text-sm font-medium">
                    Nom complet
                  </label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name || ""}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Biographie
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  placeholder="Parlez-nous de vous"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Site web
                </label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  placeholder="https://votre-site.com"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="avatar">
        <Card>
          <CardHeader>
            <CardTitle>Gérer votre avatar</CardTitle>
            <CardDescription>Téléchargez ou sélectionnez un avatar depuis la bibliothèque</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Avatar actuel</h3>
              <div className="flex items-center space-x-4">
                <AvatarUpload
                  userId={profile.id}
                  avatarUrl={formData.avatar_url || null}
                  onAvatarChange={handleAvatarChange}
                  size="xl"
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Téléchargez une image ou sélectionnez-en une depuis la bibliothèque ci-dessous.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Bibliothèque d'avatars</h3>
              <StorageManager bucket="avatars" path="" onSelect={handleAvatarChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
