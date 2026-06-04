export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          email?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          project_name: string;
          input_text: string;
          generated_brd: Json;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          project_name?: string;
          input_text?: string;
          generated_brd?: Json;
          status?: string;
        };
        Update: {
          project_name?: string;
          input_text?: string;
          generated_brd?: Json;
          status?: string;
          updated_at?: string;
        };
      };
      files: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          file_url: string;
          file_type: string;
          file_name: string;
          file_size: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          file_url: string;
          file_type?: string;
          file_name?: string;
          file_size?: number;
        };
        Update: {
          file_name?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
