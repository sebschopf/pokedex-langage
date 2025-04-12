// Déclarations globales pour TypeScript
declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      SUPABASE_SERVICE_ROLE_KEY: string
      SUPABASE_JWT_SECRET: string
      POSTGRES_URL: string
      POSTGRES_PRISMA_URL: string
      POSTGRES_URL_NON_POOLING: string
      POSTGRES_USER: string
      POSTGRES_PASSWORD: string
      POSTGRES_HOST: string
      POSTGRES_DATABASE: string
      REVALIDATE_SECRET: string
      BLOB_READ_WRITE_TOKEN: string
    }
  }
  
  // Étendre les types Window pour les fonctionnalités personnalisées
  type Window = {}
  