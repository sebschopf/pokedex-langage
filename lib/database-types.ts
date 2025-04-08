export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type UserRoleType = "admin" | "validator" | "verified" | "registered" | "anonymous"

export interface Database {
  public: {
    Tables: {
      languages: {
        Row: {
          id: string
          name: string
          logo: string
          short_description: string
          type: string
          used_for: string
          usage_rate: number
          created_year: number
          popular_frameworks: string[]
          strengths: string[]
          difficulty: number | null
          is_open_source: boolean | null
          tools: Json | null
          current_version: string | null
          last_updated: string | null
          license: string | null
          created_at: string
          updated_at: string
          slug: string
          year_created: number
          creator: string | null
          description: string | null
          logo_path: string | null
        }
        Insert: {
          id?: string
          name: string
          logo: string
          short_description: string
          type: string
          used_for: string
          usage_rate: number
          created_year: number
          popular_frameworks: string[]
          strengths: string[]
          difficulty?: number | null
          is_open_source?: boolean | null
          tools?: Json | null
          current_version?: string | null
          last_updated?: string | null
          license?: string | null
          created_at?: string
          updated_at?: string
          slug?: string
          year_created?: number
          creator?: string | null
          description?: string | null
          logo_path?: string | null
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          short_description?: string
          type?: string
          used_for?: string
          usage_rate?: number
          created_year?: number
          popular_frameworks?: string[]
          strengths?: string[]
          difficulty?: number | null
          is_open_source?: boolean | null
          tools?: Json | null
          current_version?: string | null
          last_updated?: string | null
          license?: string | null
          created_at?: string
          updated_at?: string
          slug?: string
          year_created?: number
          creator?: string | null
          description?: string | null
          logo_path?: string | null
        }
      }
      libraries: {
        Row: {
          id: string
          language_id: string
          technology_type: string | null
          subtype: string | null
          name: string
          description: string
          used_for: string
          features: string[]
          official_website: string
          unique_selling_point: string
          best_for: string
          version: string | null
          created_at: string
          updated_at: string
          github_url: string | null
          logo_path: string | null
          popularity: number | null
          is_open_source: boolean | null
          documentation_url: string | null
        }
        Insert: {
          id?: string
          language_id: string
          technology_type?: string | null
          subtype?: string | null
          name: string
          description: string
          used_for: string
          features: string[]
          official_website: string
          unique_selling_point: string
          best_for: string
          version?: string | null
          created_at?: string
          updated_at?: string
          github_url?: string | null
          logo_path?: string | null
          popularity?: number | null
          is_open_source?: boolean | null
          documentation_url?: string | null
        }
        Update: {
          id?: string
          language_id?: string
          technology_type?: string | null
          subtype?: string | null
          name?: string
          description?: string
          used_for?: string
          features?: string[]
          official_website?: string
          unique_selling_point?: string
          best_for?: string
          version?: string | null
          created_at?: string
          updated_at?: string
          github_url?: string | null
          logo_path?: string | null
          popularity?: number | null
          is_open_source?: boolean | null
          documentation_url?: string | null
        }
      }
      library_languages: {
        Row: {
          id: string
          library_id: string
          language_id: string
          primary_language: boolean
          created_at: string
        }
        Insert: {
          id?: string
          library_id: string
          language_id: string
          primary_language?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          library_id?: string
          language_id?: string
          primary_language?: boolean
          created_at?: string
        }
      }
      technology_categories: {
        Row: {
          id: string
          type: string
          icon_name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          icon_name: string
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          icon_name?: string
          color?: string
          created_at?: string
        }
      }
      technology_subtypes: {
        Row: {
          id: string
          category_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          created_at?: string
        }
      }
      corrections: {
        Row: {
          id: string
          language_id: string
          library_name: string | null
          field: string
          suggestion: string
          type: string
          status: string
          created_at: string
          updated_at: string
          framework: string | null
          correction_text: string
          user_id: string | null
        }
        Insert: {
          id?: string
          language_id: string
          library_name?: string | null
          field: string
          suggestion: string
          type: string
          status?: string
          created_at?: string
          updated_at?: string
          framework?: string | null
          correction_text?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          language_id?: string
          library_name?: string | null
          field?: string
          suggestion?: string
          type?: string
          status?: string
          created_at?: string
          updated_at?: string
          framework?: string | null
          correction_text?: string
          user_id?: string | null
        }
      }
      language_proposals: {
        Row: {
          id: string
          name: string
          type: string | null
          description: string | null
          created_year: number | null
          creator: string | null
          used_for: string | null
          strengths: string[] | null
          popular_frameworks: string[] | null
          user_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          description?: string | null
          created_year?: number | null
          creator?: string | null
          used_for?: string | null
          strengths?: string[] | null
          popular_frameworks?: string[] | null
          user_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          description?: string | null
          created_year?: number | null
          creator?: string | null
          used_for?: string | null
          strengths?: string[] | null
          popular_frameworks?: string[] | null
          user_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          role: UserRoleType
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: UserRoleType
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: UserRoleType
          created_at?: string
          updated_at?: string
        }
      }
      language_usage: {
        Row: {
          id: string
          language_id: number | null
          category_id: number | null
          created_at: string
        }
        Insert: {
          id?: string
          language_id?: number | null
          category_id?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          language_id?: number | null
          category_id?: number | null
          created_at?: string
        }
      }
      usage_categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
  auth: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          last_sign_in_at: string | null
          confirmed_at: string | null
          confirmation_sent_at: string | null
          recovery_sent_at: string | null
          email_change_sent_at: string | null
          aud: string | null
          role: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          last_sign_in_at?: string | null
          confirmed_at?: string | null
          confirmation_sent_at?: string | null
          recovery_sent_at?: string | null
          email_change_sent_at?: string | null
          aud?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          last_sign_in_at?: string | null
          confirmed_at?: string | null
          confirmation_sent_at?: string | null
          recovery_sent_at?: string | null
          email_change_sent_at?: string | null
          aud?: string | null
          role?: string | null
        }
      }
      identities: {
        Row: {
          id: string
          user_id: string
          provider: string
          identity_data: Json
          created_at: string | null
          last_sign_in_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          identity_data: Json
          created_at?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          identity_data?: Json
          created_at?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          created_at: string | null
          updated_at: string | null
          factor_id: string | null
          aal: string | null
          not_after: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string | null
          updated_at?: string | null
          factor_id?: string | null
          aal?: string | null
          not_after?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string | null
          updated_at?: string | null
          factor_id?: string | null
          aal?: string | null
          not_after?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          public: boolean | null
          avif_autodetection: boolean | null
          file_size_limit: number | null
          allowed_mime_types: string[] | null
          owner_id: string | null
        }
        Insert: {
          id: string
          name: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
          avif_autodetection?: boolean | null
          file_size_limit?: number | null
          allowed_mime_types?: string[] | null
          owner_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
          avif_autodetection?: boolean | null
          file_size_limit?: number | null
          allowed_mime_types?: string[] | null
          owner_id?: string | null
        }
      }
      objects: {
        Row: {
          id: string
          bucket_id: string | null
          name: string | null
          owner: string | null
          created_at: string | null
          updated_at: string | null
          last_accessed_at: string | null
          metadata: Json | null
          path_tokens: string[] | null
          version: string | null
          owner_id: string | null
        }
        Insert: {
          id?: string
          bucket_id?: string | null
          name?: string | null
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          last_accessed_at?: string | null
          metadata?: Json | null
          path_tokens?: string[] | null
          version?: string | null
          owner_id?: string | null
        }
        Update: {
          id?: string
          bucket_id?: string | null
          name?: string | null
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          last_accessed_at?: string | null
          metadata?: Json | null
          path_tokens?: string[] | null
          version?: string | null
          owner_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}