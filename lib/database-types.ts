export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: string
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

