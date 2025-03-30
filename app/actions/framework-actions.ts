"use server"

import { createFramework, updateFramework, deleteFramework } from "@/lib/data"
import { revalidatePath } from "next/cache"
import type { Framework } from "@/types/framework"

export async function createFrameworkAction(formData: FormData) {
  try {
    const framework: Omit<Framework, "id"> = {
      name: formData.get("name") as string,
      languageId: Number.parseInt(formData.get("languageId") as string),
      description: (formData.get("description") as string) || undefined,
      website: (formData.get("website") as string) || undefined,
      githubUrl: (formData.get("githubUrl") as string) || undefined,
      logoPath: (formData.get("logoPath") as string) || undefined,
      popularity: Number.parseInt(formData.get("popularity") as string) || undefined,
      isOpenSource: formData.get("isOpenSource") === "true",
    }

    const newFramework = await createFramework(framework)

    if (!newFramework) {
      return {
        success: false,
        message: "Erreur lors de la création du framework",
      }
    }

    const languageSlug = formData.get("languageSlug") as string
    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/frameworks")

    return {
      success: true,
      message: "Framework créé avec succès",
      data: newFramework,
    }
  } catch (error) {
    console.error("Erreur lors de la création du framework:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création du framework",
    }
  }
}

export async function updateFrameworkAction(id: number, formData: FormData) {
  try {
    const framework: Partial<Omit<Framework, "id">> = {}

    // Ne mettre à jour que les champs qui sont présents dans le formulaire
    if (formData.has("name")) framework.name = formData.get("name") as string
    if (formData.has("languageId")) framework.languageId = Number.parseInt(formData.get("languageId") as string)
    if (formData.has("description")) framework.description = (formData.get("description") as string) || undefined
    if (formData.has("website")) framework.website = (formData.get("website") as string) || undefined
    if (formData.has("githubUrl")) framework.githubUrl = (formData.get("githubUrl") as string) || undefined
    if (formData.has("logoPath")) framework.logoPath = (formData.get("logoPath") as string) || undefined
    if (formData.has("popularity"))
      framework.popularity = Number.parseInt(formData.get("popularity") as string) || undefined
    if (formData.has("isOpenSource")) framework.isOpenSource = formData.get("isOpenSource") === "true"

    const success = await updateFramework(id, framework)

    if (!success) {
      return {
        success: false,
        message: "Erreur lors de la mise à jour du framework",
      }
    }

    const languageSlug = formData.get("languageSlug") as string
    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/frameworks")

    return {
      success: true,
      message: "Framework mis à jour avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du framework:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour du framework",
    }
  }
}

export async function deleteFrameworkAction(id: number, languageSlug: string) {
  try {
    const success = await deleteFramework(id)

    if (!success) {
      return {
        success: false,
        message: "Erreur lors de la suppression du framework",
      }
    }

    revalidatePath(`/languages/${languageSlug}`)
    revalidatePath("/admin/frameworks")

    return {
      success: true,
      message: "Framework supprimé avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du framework:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression du framework",
    }
  }
}

