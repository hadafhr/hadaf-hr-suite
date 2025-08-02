import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          employee_number: string;
          department_id: string;
          position_id: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          first_name: string;
          last_name: string;
          employee_number: string;
          department_id: string;
          position_id: string;
          status?: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          employee_number?: string;
          department_id?: string;
          position_id?: string;
          status?: string;
        };
      };
      departments: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          name: string;
        };
        Update: {
          name?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          check_in: string;
          check_out: string;
          status: string;
          late_minutes: number;
          created_at: string;
        };
        Insert: {
          employee_id: string;
          date: string;
          check_in: string;
          check_out?: string;
          status: string;
          late_minutes?: number;
        };
        Update: {
          check_out?: string;
          status?: string;
          late_minutes?: number;
        };
      };
      payroll: {
        Row: {
          id: string;
          employee_id: string;
          pay_date: string;
          gross_salary: number;
          net_salary: number;
          total_deductions: number;
          created_at: string;
        };
        Insert: {
          employee_id: string;
          pay_date: string;
          gross_salary: number;
          net_salary: number;
          total_deductions: number;
        };
        Update: {
          gross_salary?: number;
          net_salary?: number;
          total_deductions?: number;
        };
      };
      leave_requests: {
        Row: {
          id: string;
          employee_id: string;
          start_date: string;
          end_date: string;
          days_requested: number;
          status: string;
          created_at: string;
        };
        Insert: {
          employee_id: string;
          start_date: string;
          end_date: string;
          days_requested: number;
          status?: string;
        };
        Update: {
          status?: string;
        };
      };
      performance_reviews: {
        Row: {
          id: string;
          employee_id: string;
          review_date: string;
          overall_score: number;
          created_at: string;
        };
        Insert: {
          employee_id: string;
          review_date: string;
          overall_score: number;
        };
        Update: {
          overall_score?: number;
        };
      };
      reports: {
        Row: {
          id: string;
          type: string;
          title: string;
          data: any;
          summary: any;
          filters: any;
          generated_by: string;
          created_at: string;
        };
        Insert: {
          type: string;
          title: string;
          data: any;
          summary: any;
          filters?: any;
          generated_by: string;
        };
        Update: {
          data?: any;
          summary?: any;
        };
      };
      compliance_metrics: {
        Row: {
          id: string;
          overall_score: number;
          severity: string;
          status: string;
          created_at: string;
        };
        Insert: {
          overall_score: number;
          severity: string;
          status: string;
        };
        Update: {
          overall_score?: number;
          status?: string;
        };
      };
    };
  };
}