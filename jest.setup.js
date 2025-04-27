// Ajouter les extensions de Jest pour tester React
import '@testing-library/jest-dom';

// Mock pour next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock pour Supabase
jest.mock('@/lib/client/supabase', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({ data: null }),
          order: jest.fn(() => ({
            range: jest.fn().mockResolvedValue({ data: [] }),
          })),
        })),
      })),
      insert: jest.fn().mockResolvedValue({ data: null }),
      update: jest.fn().mockResolvedValue({ data: null }),
      delete: jest.fn().mockResolvedValue({ data: null }),
    })),
  })),
}));

// Mock pour React Query
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null,
  }),
  useMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

// Supprimer les avertissements de console pendant les tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
