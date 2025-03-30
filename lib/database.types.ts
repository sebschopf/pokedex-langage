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

