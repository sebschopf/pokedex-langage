// Types exacts des tables Supabase
export type DbLanguage = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logo_path: string | null;
    official_website: string | null;
    github_url: string | null;
    created_at: string;
    updated_at: string | null;
    type: string | null;
    popularity: number | null;
    first_appeared: number | null;
    latest_version: string | null;
    is_open_source: boolean | null;
    used_for: string[] | null;
    features: string[] | null;
    paradigms: string[] | null;
    unique_selling_point: string | null;
    best_for: string | null;
    documentation_url: string | null;
    short_description: string | null;
    usage_rate: number | null;
    strengths: string[] | null;
    popular_frameworks: string[] | null;
    tools: any[] | null;
  }
  
  export type DbLibrary = {
    id: string;
    name: string;
    language_id: string;
    description: string | null;
    official_website: string | null;
    github_url: string | null;
    logo_path: string | null;
    popularity: number | null;
    is_open_source: boolean | null;
    created_at: string | null;
    updated_at: string | null;
    features: string[] | null;
    unique_selling_point: string | null;
    best_for: string | null;
    used_for: string[] | null;
    documentation_url: string | null;
    version: string | null;
    technology_type: string | null;
    sub_type: string | null;
  }
  
  export type DbCorrection = {
    id: string;
    language_id: string;
    framework: string | null;
    correction_text: string | null;
    field: string;
    suggestion: string;
    status: string;
    user_id: string | null;
    created_at: string;
    updated_at: string | null;
  }
  
  export type DbLanguageProposal = {
    id: string;
    name: string;
    type: string | null;
    description: string | null;
    created_year: number | null;
    creator: string | null;
    used_for: string | null;
    strengths: string[] | null;
    popular_frameworks: string[] | null;
    user_id: string | null;
    status: string;
    created_at: string;
    updated_at: string | null;
    reason: string | null;
    official_website: string | null;
    github_url: string | null;
  }
  
  export type DbUserRole = {
    id: string;
    user_id: string;
    role: string;
    created_at: string;
    updated_at: string | null;
  }
  
  export type DbLanguageUsage = {
    id: string;
    language_id: string;
    category_id: string;
    created_at: string;
  }
  
  export type DbUsageCategory = {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
  }
  
  export type DbProfile = {
    id: string;
    user_id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    created_at: string;
    updated_at: string | null;
  }
  
  export type DbLibraryLanguage = {
    id: string;
    library_id: string;
    language_id: string;
    primary_language: boolean;
    created_at: string;
  }
  
  export type DbTechnologyCategory = {
    id: string;
    type: string;
    description: string | null;
    icon_name: string | null;
    color: string | null;
    created_at: string;
    updated_at: string | null;
  }
  
  export type DbTechnologySubtype = {
    id: string;
    category_id: string;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string | null;
  }