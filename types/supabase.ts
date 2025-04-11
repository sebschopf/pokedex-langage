export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

/**
 * Type représentant la structure complète de la base de données Supabase
 * Généré à partir des tables définies dans le projet
 */
export interface Database {
  public: {
    Tables: {
      corrections: {
        Row: {
          correction_text: string
          created_at: string | null
          field: string | null
          framework: string | null
          id: number
          language_id: number
          status: string
          suggestion: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          correction_text: string
          created_at?: string | null
          field?: string | null
          framework?: string | null
          id?: number
          language_id: number
          status?: string
          suggestion?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          correction_text?: string
          created_at?: string | null
          field?: string | null
          framework?: string | null
          id?: number
          language_id?: number
          status?: string
          suggestion?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
      }
      language_proposals: {
        Row: {
          created_at: string | null
          created_year: number | null
          creator: string | null
          description: string | null
          id: number
          name: string
          popular_frameworks: string[] | null
          status: string
          strengths: string[] | null
          type: string | null
          updated_at: string | null
          used_for: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_year?: number | null
          creator?: string | null
          description?: string | null
          id?: number
          name: string
          popular_frameworks?: string[] | null
          status?: string
          strengths?: string[] | null
          type?: string | null
          updated_at?: string | null
          used_for?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_year?: number | null
          creator?: string | null
          description?: string | null
          id?: number
          name?: string
          popular_frameworks?: string[] | null
          status?: string
          strengths?: string[] | null
          type?: string | null
          updated_at?: string | null
          used_for?: string | null
          user_id?: string | null
        }
      }
      language_usage: {
        Row: {
          category_id: number | null
          created_at: string | null
          id: number
          language_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          language_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          language_id?: number | null
        }
      }
      languages: {
        Row: {
          created_at: string | null
          creator: string | null
          description: string | null
          id: number
          is_open_source: boolean | null
          logo_path: string | null
          name: string
          popular_frameworks: string[] | null
          short_description: string | null
          slug: string
          strengths: string[] | null
          tools: Json | null
          type: string | null
          updated_at: string | null
          usage_rate: number | null
          used_for: string | null
          year_created: number | null
        }
        Insert: {
          created_at?: string | null
          creator?: string | null
          description?: string | null
          id?: number
          is_open_source?: boolean | null
          logo_path?: string | null
          name: string
          popular_frameworks?: string[] | null
          short_description?: string | null
          slug: string
          strengths?: string[] | null
          tools?: Json | null
          type?: string | null
          updated_at?: string | null
          usage_rate?: number | null
          used_for?: string | null
          year_created?: number | null
        }
        Update: {
          created_at?: string | null
          creator?: string | null
          description?: string | null
          id?: number
          is_open_source?: boolean | null
          logo_path?: string | null
          name?: string
          popular_frameworks?: string[] | null
          short_description?: string | null
          slug?: string
          strengths?: string[] | null
          tools?: Json | null
          type?: string | null
          updated_at?: string | null
          usage_rate?: number | null
          used_for?: string | null
          year_created?: number | null
        }
      }
      libraries: {
        Row: {
          best_for: string | null
          created_at: string | null
          description: string | null
          documentation_url: string | null
          features: string[] | null
          github_url: string | null
          id: number
          is_open_source: boolean | null
          language_id: number | null
          logo_path: string | null
          name: string
          official_website: string | null
          popularity: number | null
          subtype: string | null
          technology_type: string | null
          unique_selling_point: string | null
          updated_at: string | null
          used_for: string | null
          version: string | null
        }
        Insert: {
          best_for?: string | null
          created_at?: string | null
          description?: string | null
          documentation_url?: string | null
          features?: string[] | null
          github_url?: string | null
          id?: number
          is_open_source?: boolean | null
          language_id?: number | null
          logo_path?: string | null
          name: string
          official_website?: string | null
          popularity?: number | null
          subtype?: string | null
          technology_type?: string | null
          unique_selling_point?: string | null
          updated_at?: string | null
          used_for?: string | null
          version?: string | null
        }
        Update: {
          best_for?: string | null
          created_at?: string | null
          description?: string | null
          documentation_url?: string | null
          features?: string[] | null
          github_url?: string | null
          id?: number
          is_open_source?: boolean | null
          language_id?: number | null
          logo_path?: string | null
          name?: string
          official_website?: string | null
          popularity?: number | null
          subtype?: string | null
          technology_type?: string | null
          unique_selling_point?: string | null
          updated_at?: string | null
          used_for?: string | null
          version?: string | null
        }
      }
      library_languages: {
        Row: {
          created_at: string | null
          id: number
          language_id: number
          library_id: number
          primary_language: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          language_id: number
          library_id: number
          primary_language?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: number
          language_id?: number
          library_id?: number
          primary_language?: boolean | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      technology_categories: {
        Row: {
          color: string
          created_at: string | null
          icon_name: string
          id: number
          type: string
        }
        Insert: {
          color: string
          created_at?: string | null
          icon_name: string
          id?: number
          type: string
        }
        Update: {
          color?: string
          created_at?: string | null
          icon_name?: string
          id?: number
          type?: string
        }
      }
      technology_subtypes: {
        Row: {
          category_id: number | null
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      todo_categories: {
        Row: {
          color: string
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          color: string
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      todo_status: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
      }
      todos: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: number
          is_completed: boolean | null
          status_id: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: number
          is_completed?: boolean | null
          status_id?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: number
          is_completed?: boolean | null
          status_id?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
      }
      usage_categories: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: "admin" | "validator" | "verified" | "registered"
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          role: "admin" | "validator" | "verified" | "registered"
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: "admin" | "validator" | "verified" | "registered"
          updated_at?: string | null
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
