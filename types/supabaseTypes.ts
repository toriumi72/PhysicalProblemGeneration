export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_logs: {
        Row: {
          created_at: string | null
          endpoint: string | null
          error_message: string | null
          id: number
          request_data: Json | null
          response_data: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: number
          request_data?: Json | null
          response_data?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: number
          request_data?: Json | null
          response_data?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          subject_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          subject_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          subject_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_metrics: {
        Row: {
          correct_rate: number | null
          created_at: string | null
          difficulty_breakdown: Json | null
          id: number
          metric_date: string
          total_problems: number | null
          trend_data: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          correct_rate?: number | null
          created_at?: string | null
          difficulty_breakdown?: Json | null
          id?: number
          metric_date: string
          total_problems?: number | null
          trend_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          correct_rate?: number | null
          created_at?: string | null
          difficulty_breakdown?: Json | null
          id?: number
          metric_date?: string
          total_problems?: number | null
          trend_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      difficulties: {
        Row: {
          created_at: string | null
          id: number
          level_name: string
          parameters: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          level_name: string
          parameters?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          level_name?: string
          parameters?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      problem_generation_request_units: {
        Row: {
          problem_generation_request_id: number
          unit_id: number
        }
        Insert: {
          problem_generation_request_id: number
          unit_id: number
        }
        Update: {
          problem_generation_request_id?: number
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "problem_generation_request_un_problem_generation_request_i_fkey"
            columns: ["problem_generation_request_id"]
            isOneToOne: false
            referencedRelation: "problem_generation_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_generation_request_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      problem_generation_requests: {
        Row: {
          created_at: string | null
          difficulty_id: number | null
          id: number
          question_count: number
          request_params: Json | null
          response_metadata: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          difficulty_id?: number | null
          id?: number
          question_count: number
          request_params?: Json | null
          response_metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          difficulty_id?: number | null
          id?: number
          question_count?: number
          request_params?: Json | null
          response_metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "problem_generation_requests_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_generation_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      problem_units: {
        Row: {
          problem_id: number
          unit_id: number
        }
        Insert: {
          problem_id: number
          unit_id: number
        }
        Update: {
          problem_id?: number
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "problem_units_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          created_at: string | null
          difficulty_id: number | null
          final_answer_equation: string
          final_answer_text: string
          generation_request_id: number | null
          hints: string[]
          id: number
          question_text: string
          question_title: string
          step_explanations: string[]
          step_titles: string[]
          unit_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          difficulty_id?: number | null
          final_answer_equation: string
          final_answer_text: string
          generation_request_id?: number | null
          hints: string[]
          id?: number
          question_text: string
          question_title: string
          step_explanations: string[]
          step_titles: string[]
          unit_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          difficulty_id?: number | null
          final_answer_equation?: string
          final_answer_text?: string
          generation_request_id?: number | null
          hints?: string[]
          id?: number
          question_text?: string
          question_title?: string
          step_explanations?: string[]
          step_titles?: string[]
          unit_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "problems_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problems_generation_request_id_fkey"
            columns: ["generation_request_id"]
            isOneToOne: false
            referencedRelation: "problem_generation_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problems_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_problem_attempts: {
        Row: {
          attempted_at: string | null
          id: number
          problem_id: number | null
          updated_at: string | null
          user_answer: string | null
          user_evaluation: string | null
          user_id: string | null
        }
        Insert: {
          attempted_at?: string | null
          id?: number
          problem_id?: number | null
          updated_at?: string | null
          user_answer?: string | null
          user_evaluation?: string | null
          user_id?: string | null
        }
        Update: {
          attempted_at?: string | null
          id?: number
          problem_id?: number | null
          updated_at?: string | null
          user_answer?: string | null
          user_evaluation?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_problem_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string | null
          daily_goal_problems: number | null
          default_difficulty_id: number | null
          email_notifications: boolean | null
          id: number
          monthly_problem_limit: number | null
          monthly_problems_generated: number | null
          push_notifications: boolean | null
          updated_at: string | null
          user_id: string | null
          weak_units: number[] | null
        }
        Insert: {
          created_at?: string | null
          daily_goal_problems?: number | null
          default_difficulty_id?: number | null
          email_notifications?: boolean | null
          id?: number
          monthly_problem_limit?: number | null
          monthly_problems_generated?: number | null
          push_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          weak_units?: number[] | null
        }
        Update: {
          created_at?: string | null
          daily_goal_problems?: number | null
          default_difficulty_id?: number | null
          email_notifications?: boolean | null
          id?: number
          monthly_problem_limit?: number | null
          monthly_problems_generated?: number | null
          push_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          weak_units?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_default_difficulty_id_fkey"
            columns: ["default_difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings_preferred_units: {
        Row: {
          unit_id: number
          user_settings_id: number
        }
        Insert: {
          unit_id: number
          user_settings_id: number
        }
        Update: {
          unit_id?: number
          user_settings_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_preferred_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          is_pro: boolean | null
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          is_pro?: boolean | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          is_pro?: boolean | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
