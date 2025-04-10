import { render, screen, waitFor } from "@testing-library/react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import LoginPage from "@/app/login/page"
import { useToast } from "@/components/ui/use-toast"

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => (param === "redirectedFrom" ? "/profile" : null)),
    entries: jest.fn(() => [["redirectedFrom", "/profile"]]),
  })),
}))

jest.mock("@supabase/auth-helpers-nextjs", () => ({
  createClientComponentClient: jest.fn(),
}))

jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn(),
}))

describe("Authentication Flow", () => {
  // Configuration des mocks avant chaque test
  beforeEach(() => {
    // Router mock
    const mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    // Supabase mock
    const mockSupabase = {
      auth: {
        signInWithPassword: jest.fn(),
        signUp: jest.fn(),
        signInWithOAuth: jest.fn(),
        getSession: jest.fn(),
      },
    }
    ;(createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase)

    // Toast mock
    ;(useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    })
  })

  test("Affiche le formulaire de connexion", () => {
    render(<LoginPage />)

    expect(screen.getByText(/Connectez-vous ou créez un compte/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Se connecter/i })).toBeInTheDocument()
  })

  test("Gère la connexion réussie et redirige vers la page demandée", async () => {
    // Configuration des mocks pour ce test spécifique
    const mockSignIn = jest.fn().mockResolvedValue({ error: null })
    const mockGetSession = jest.fn().mockResolvedValue({
      data: { session: { user: { id: "user-123" } } },
    })
    const mockUserRole = jest.fn().mockResolvedValue({
      data: { role: "registered" },
    })

    const mockSupabase = {
      auth: {
        signInWithPassword: mockSignIn,
        getSession: mockGetSession,
      },
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: mockUserRole,
          }),
        }),
      }),
    }
    ;(createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase)

    const mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<LoginPage />)

    // Simuler la soumission du formulaire
    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Mot de passe/i)
    const submitButton = screen.getByRole("button", { name: /Se connecter/i })

    // Remplir le formulaire
    await waitFor(() => {
      emailInput.setAttribute("value", "test@example.com")
      passwordInput.setAttribute("value", "password123")
      submitButton.click()
    })

    // Vérifier que la fonction de connexion a été appelée
    expect(mockSignIn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    })

    // Vérifier la redirection
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/profile")
    })
  })

  // Autres tests à ajouter :
  // - Test de connexion échouée
  // - Test d'inscription
  // - Test de connexion avec GitHub
  // - Test de redirection après connexion
})
