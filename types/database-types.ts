export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      corrections: {
        Row: {
          correction_text: string;
          created_at: string | null;
          field: string | null;
          framework: string | null;
          id: number;
          language_id: number;
          status: string;
          suggestion: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          correction_text: string;
          created_at?: string | null;
          field?: string | null;
          framework?: string | null;
          id?: number;
          language_id: number;
          status?: string;
          suggestion?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          correction_text?: string;
          created_at?: string | null;
          field?: string | null;
          framework?: string | null;
          id?: number;
          language_id?: number;
          status?: string;
          suggestion?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'corrections_language_id_fkey';
            columns: ['language_id'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['id'];
          },
        ];
      };
      language_proposals: {
        Row: {
          created_at: string | null;
          created_year: number | null;
          creator: string | null;
          description: string | null;
          id: number;
          name: string;
          popular_frameworks: string[] | null;
          status: string;
          strengths: string[] | null;
          type: string | null;
          updated_at: string | null;
          used_for: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_year?: number | null;
          creator?: string | null;
          description?: string | null;
          id?: number;
          name: string;
          popular_frameworks?: string[] | null;
          status?: string;
          strengths?: string[] | null;
          type?: string | null;
          updated_at?: string | null;
          used_for?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_year?: number | null;
          creator?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
          popular_frameworks?: string[] | null;
          status?: string;
          strengths?: string[] | null;
          type?: string | null;
          updated_at?: string | null;
          used_for?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      language_usage: {
        Row: {
          category_id: number | null;
          created_at: string | null;
          id: number;
          language_id: number | null;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string | null;
          id?: number;
          language_id?: number | null;
        };
        Update: {
          category_id?: number | null;
          created_at?: string | null;
          id?: number;
          language_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'language_usage_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'usage_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'language_usage_language_id_fkey';
            columns: ['language_id'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['id'];
          },
        ];
      };
      languages: {
        Row: {
          created_at: string | null;
          creator: string | null;
          description: string | null;
          id: number;
          is_open_source: boolean | null;
          logo_path: string | null;
          name: string;
          popular_frameworks: string[] | null;
          short_description: string | null;
          slug: string;
          strengths: string[] | null;
          tools: Json | null;
          type: string | null;
          updated_at: string | null;
          usage_rate: number | null;
          used_for: string | null;
          year_created: number | null;
        };
        Insert: {
          created_at?: string | null;
          creator?: string | null;
          description?: string | null;
          id?: number;
          is_open_source?: boolean | null;
          logo_path?: string | null;
          name: string;
          popular_frameworks?: string[] | null;
          short_description?: string | null;
          slug: string;
          strengths?: string[] | null;
          tools?: Json | null;
          type?: string | null;
          updated_at?: string | null;
          usage_rate?: number | null;
          used_for?: string | null;
          year_created?: number | null;
        };
        Update: {
          created_at?: string | null;
          creator?: string | null;
          description?: string | null;
          id?: number;
          is_open_source?: boolean | null;
          logo_path?: string | null;
          name?: string;
          popular_frameworks?: string[] | null;
          short_description?: string | null;
          slug?: string;
          strengths?: string[] | null;
          tools?: Json | null;
          type?: string | null;
          updated_at?: string | null;
          usage_rate?: number | null;
          used_for?: string | null;
          year_created?: number | null;
        };
        Relationships: [];
      };
      libraries: {
        Row: {
          best_for: string | null;
          created_at: string | null;
          description: string | null;
          documentation_url: string | null;
          features: string[] | null;
          github_url: string | null;
          id: number;
          is_open_source: boolean | null;
          language_id: number | null;
          logo_path: string | null;
          name: string;
          official_website: string | null;
          popularity: number | null;
          slug: string | null;
          subtype: string | null;
          technology_type: string | null;
          unique_selling_point: string | null;
          updated_at: string | null;
          used_for: string | null;
          version: string | null;
        };
        Insert: {
          best_for?: string | null;
          created_at?: string | null;
          description?: string | null;
          documentation_url?: string | null;
          features?: string[] | null;
          github_url?: string | null;
          id?: number;
          is_open_source?: boolean | null;
          language_id?: number | null;
          logo_path?: string | null;
          name: string;
          official_website?: string | null;
          popularity?: number | null;
          slug?: string | null;
          subtype?: string | null;
          technology_type?: string | null;
          unique_selling_point?: string | null;
          updated_at?: string | null;
          used_for?: string | null;
          version?: string | null;
        };
        Update: {
          best_for?: string | null;
          created_at?: string | null;
          description?: string | null;
          documentation_url?: string | null;
          features?: string[] | null;
          github_url?: string | null;
          id?: number;
          is_open_source?: boolean | null;
          language_id?: number | null;
          logo_path?: string | null;
          name?: string;
          official_website?: string | null;
          popularity?: number | null;
          slug?: string | null;
          subtype?: string | null;
          technology_type?: string | null;
          unique_selling_point?: string | null;
          updated_at?: string | null;
          used_for?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'frameworks_language_id_fkey';
            columns: ['language_id'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['id'];
          },
        ];
      };
      library_languages: {
        Row: {
          created_at: string | null;
          id: number;
          language_id: number;
          library_id: number;
          primary_language: boolean | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          language_id: number;
          library_id: number;
          primary_language?: boolean | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          language_id?: number;
          library_id?: number;
          primary_language?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'library_languages_language_id_fkey';
            columns: ['language_id'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'library_languages_library_id_fkey';
            columns: ['library_id'];
            isOneToOne: false;
            referencedRelation: 'libraries';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      technology_categories: {
        Row: {
          color: string;
          created_at: string | null;
          icon_name: string;
          id: number;
          type: string;
        };
        Insert: {
          color: string;
          created_at?: string | null;
          icon_name: string;
          id?: number;
          type: string;
        };
        Update: {
          color?: string;
          created_at?: string | null;
          icon_name?: string;
          id?: number;
          type?: string;
        };
        Relationships: [];
      };
      technology_subtypes: {
        Row: {
          category_id: number | null;
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          category_id?: number | null;
          created_at?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'technology_subtypes_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'technology_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      todo_categories: {
        Row: {
          color: string;
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          color: string;
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          color?: string;
          created_at?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      todo_status: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      todos: {
        Row: {
          category_id: number | null;
          created_at: string | null;
          description: string | null;
          due_date: string | null;
          id: number;
          is_completed: boolean | null;
          status_id: number | null;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          is_completed?: boolean | null;
          status_id?: number | null;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          category_id?: number | null;
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          is_completed?: boolean | null;
          status_id?: number | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'todos_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'todo_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'todos_status_id_fkey';
            columns: ['status_id'];
            isOneToOne: false;
            referencedRelation: 'todo_status';
            referencedColumns: ['id'];
          },
        ];
      };
      usage_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string | null;
          id: string;
          role: Database['public']['Enums']['user_role'];
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_security_logs_table: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      create_user_todos: {
        Args: { user_uuid: string };
        Returns: {
          category_id: number | null;
          created_at: string | null;
          description: string | null;
          due_date: string | null;
          id: number;
          is_completed: boolean | null;
          status_id: number | null;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        }[];
      };
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: Database['public']['Enums']['user_role'];
      };
      get_user_sessions: {
        Args: { user_id: string };
        Returns: unknown[];
      };
      get_user_with_relations: {
        Args: { user_id: string };
        Returns: Json;
      };
      has_role: {
        Args: { required_role: Database['public']['Enums']['user_role'] };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: 'admin' | 'validator' | 'verified' | 'registered';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      user_role: ['admin', 'validator', 'verified', 'registered'],
    },
  },
} as const;
