export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      action_items: {
        Row: {
          assigned_to: string | null
          completion_date: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          item_type: string | null
          notes: string | null
          priority: string | null
          progress_percentage: number | null
          related_compliance_id: string | null
          related_meeting_id: string | null
          related_policy_id: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          item_type?: string | null
          notes?: string | null
          priority?: string | null
          progress_percentage?: number | null
          related_compliance_id?: string | null
          related_meeting_id?: string | null
          related_policy_id?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          item_type?: string | null
          notes?: string | null
          priority?: string | null
          progress_percentage?: number | null
          related_compliance_id?: string | null
          related_meeting_id?: string | null
          related_policy_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_items_related_compliance_id_fkey"
            columns: ["related_compliance_id"]
            isOneToOne: false
            referencedRelation: "compliance_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_items_related_meeting_id_fkey"
            columns: ["related_meeting_id"]
            isOneToOne: false
            referencedRelation: "governance_meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_items_related_policy_id_fkey"
            columns: ["related_policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_insights: {
        Row: {
          action_required: boolean | null
          created_at: string
          data: Json
          description: string
          id: string
          insight_type: string
          is_read: boolean | null
          severity: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_required?: boolean | null
          created_at?: string
          data?: Json
          description: string
          id?: string
          insight_type: string
          is_read?: boolean | null
          severity?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_required?: boolean | null
          created_at?: string
          data?: Json
          description?: string
          id?: string
          insight_type?: string
          is_read?: boolean | null
          severity?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      application_tracking: {
        Row: {
          application_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          message: string | null
          status: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string | null
          status: string
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_tracking_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_name: string
          asset_type: string
          created_at: string
          current_value: number | null
          depreciation_rate: number | null
          id: string
          location: string | null
          purchase_date: string
          purchase_price: number
          serial_number: string | null
          status: string | null
          updated_at: string
          useful_life_years: number | null
          user_id: string
        }
        Insert: {
          asset_name: string
          asset_type: string
          created_at?: string
          current_value?: number | null
          depreciation_rate?: number | null
          id?: string
          location?: string | null
          purchase_date: string
          purchase_price: number
          serial_number?: string | null
          status?: string | null
          updated_at?: string
          useful_life_years?: number | null
          user_id: string
        }
        Update: {
          asset_name?: string
          asset_type?: string
          created_at?: string
          current_value?: number | null
          depreciation_rate?: number | null
          id?: string
          location?: string | null
          purchase_date?: string
          purchase_price?: number
          serial_number?: string | null
          status?: string | null
          updated_at?: string
          useful_life_years?: number | null
          user_id?: string
        }
        Relationships: []
      }
      attendance_correction_requests: {
        Row: {
          attendance_record_id: string | null
          created_at: string | null
          current_value: string | null
          employee_id: string | null
          hr_approval_at: string | null
          hr_approval_by: string | null
          hr_comments: string | null
          id: string
          manager_approval_at: string | null
          manager_approval_by: string | null
          manager_comments: string | null
          reason: string
          request_type: string
          requested_value: string
          status: Database["public"]["Enums"]["approval_status"] | null
          supporting_documents: Json | null
          updated_at: string | null
        }
        Insert: {
          attendance_record_id?: string | null
          created_at?: string | null
          current_value?: string | null
          employee_id?: string | null
          hr_approval_at?: string | null
          hr_approval_by?: string | null
          hr_comments?: string | null
          id?: string
          manager_approval_at?: string | null
          manager_approval_by?: string | null
          manager_comments?: string | null
          reason: string
          request_type: string
          requested_value: string
          status?: Database["public"]["Enums"]["approval_status"] | null
          supporting_documents?: Json | null
          updated_at?: string | null
        }
        Update: {
          attendance_record_id?: string | null
          created_at?: string | null
          current_value?: string | null
          employee_id?: string | null
          hr_approval_at?: string | null
          hr_approval_by?: string | null
          hr_comments?: string | null
          id?: string
          manager_approval_at?: string | null
          manager_approval_by?: string | null
          manager_comments?: string | null
          reason?: string
          request_type?: string
          requested_value?: string
          status?: Database["public"]["Enums"]["approval_status"] | null
          supporting_documents?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_correction_requests_attendance_record_id_fkey"
            columns: ["attendance_record_id"]
            isOneToOne: false
            referencedRelation: "attendance_records_new"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_correction_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_corrections: {
        Row: {
          attendance_record_id: string
          correction_type: string
          created_at: string
          current_value: string | null
          employee_id: string
          id: string
          reason: string
          requested_value: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          attendance_record_id: string
          correction_type: string
          created_at?: string
          current_value?: string | null
          employee_id: string
          id?: string
          reason: string
          requested_value: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          attendance_record_id?: string
          correction_type?: string
          created_at?: string
          current_value?: string | null
          employee_id?: string
          id?: string
          reason?: string
          requested_value?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_corrections_attendance_record_id_fkey"
            columns: ["attendance_record_id"]
            isOneToOne: false
            referencedRelation: "attendance_records_new"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_devices: {
        Row: {
          company_id: string | null
          created_at: string | null
          device_code: string
          device_name: string
          device_type: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_sync_at: string | null
          latitude: number | null
          location: string
          longitude: number | null
          port: number | null
          settings: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          device_code: string
          device_name: string
          device_type: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_sync_at?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          port?: number | null
          settings?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          device_code?: string
          device_name?: string
          device_type?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_sync_at?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          port?: number | null
          settings?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_devices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_locations: {
        Row: {
          allowed_methods: string[] | null
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          latitude: number
          location_name: string
          longitude: number
          radius_meters: number | null
          updated_at: string | null
          work_type: Database["public"]["Enums"]["work_type"] | null
        }
        Insert: {
          allowed_methods?: string[] | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          latitude: number
          location_name: string
          longitude: number
          radius_meters?: number | null
          updated_at?: string | null
          work_type?: Database["public"]["Enums"]["work_type"] | null
        }
        Update: {
          allowed_methods?: string[] | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number
          location_name?: string
          longitude?: number
          radius_meters?: number | null
          updated_at?: string | null
          work_type?: Database["public"]["Enums"]["work_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_points: {
        Row: {
          accumulated_points: number | null
          attendance_record_id: string | null
          bonus_points: number | null
          created_at: string | null
          employee_id: string | null
          id: string
          month_year: string | null
          points_deducted: number | null
          points_earned: number | null
          reason: string | null
          reward_amount: number | null
          reward_processed: boolean | null
        }
        Insert: {
          accumulated_points?: number | null
          attendance_record_id?: string | null
          bonus_points?: number | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          month_year?: string | null
          points_deducted?: number | null
          points_earned?: number | null
          reason?: string | null
          reward_amount?: number | null
          reward_processed?: boolean | null
        }
        Update: {
          accumulated_points?: number | null
          attendance_record_id?: string | null
          bonus_points?: number | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          month_year?: string | null
          points_deducted?: number | null
          points_earned?: number | null
          reason?: string | null
          reward_amount?: number | null
          reward_processed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_points_attendance_record_id_fkey"
            columns: ["attendance_record_id"]
            isOneToOne: false
            referencedRelation: "attendance_records_new"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_points_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_records_new: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attendance_date: string
          attendance_points: number | null
          break_duration_minutes: number | null
          break_end_time: string | null
          break_start_time: string | null
          clock_in_time: string | null
          clock_out_time: string | null
          created_at: string
          early_leave_minutes: number | null
          employee_id: string
          id: string
          is_remote: boolean
          late_minutes: number | null
          location_check_in: string | null
          location_check_out: string | null
          notes: string | null
          overtime_approved: boolean | null
          overtime_hours: number | null
          penalty_amount: number | null
          schedule_id: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          total_hours: number | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_date?: string
          attendance_points?: number | null
          break_duration_minutes?: number | null
          break_end_time?: string | null
          break_start_time?: string | null
          clock_in_time?: string | null
          clock_out_time?: string | null
          created_at?: string
          early_leave_minutes?: number | null
          employee_id: string
          id?: string
          is_remote?: boolean
          late_minutes?: number | null
          location_check_in?: string | null
          location_check_out?: string | null
          notes?: string | null
          overtime_approved?: boolean | null
          overtime_hours?: number | null
          penalty_amount?: number | null
          schedule_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          total_hours?: number | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_date?: string
          attendance_points?: number | null
          break_duration_minutes?: number | null
          break_end_time?: string | null
          break_start_time?: string | null
          clock_in_time?: string | null
          clock_out_time?: string | null
          created_at?: string
          early_leave_minutes?: number | null
          employee_id?: string
          id?: string
          is_remote?: boolean
          late_minutes?: number | null
          location_check_in?: string | null
          location_check_out?: string | null
          notes?: string | null
          overtime_approved?: boolean | null
          overtime_hours?: number | null
          penalty_amount?: number | null
          schedule_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          total_hours?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_new_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "work_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_settings: {
        Row: {
          allow_remote_work: boolean
          auto_clock_out: boolean
          auto_clock_out_time: string | null
          break_duration: number
          company_id: string | null
          created_at: string
          default_end_time: string
          default_start_time: string
          early_leave_threshold_minutes: number
          id: string
          late_threshold_minutes: number
          overtime_threshold_hours: number | null
          require_location_check: boolean
          updated_at: string
          work_days: Database["public"]["Enums"]["day_of_week"][]
        }
        Insert: {
          allow_remote_work?: boolean
          auto_clock_out?: boolean
          auto_clock_out_time?: string | null
          break_duration?: number
          company_id?: string | null
          created_at?: string
          default_end_time?: string
          default_start_time?: string
          early_leave_threshold_minutes?: number
          id?: string
          late_threshold_minutes?: number
          overtime_threshold_hours?: number | null
          require_location_check?: boolean
          updated_at?: string
          work_days?: Database["public"]["Enums"]["day_of_week"][]
        }
        Update: {
          allow_remote_work?: boolean
          auto_clock_out?: boolean
          auto_clock_out_time?: string | null
          break_duration?: number
          company_id?: string | null
          created_at?: string
          default_end_time?: string
          default_start_time?: string
          early_leave_threshold_minutes?: number
          id?: string
          late_threshold_minutes?: number
          overtime_threshold_hours?: number | null
          require_location_check?: boolean
          updated_at?: string
          work_days?: Database["public"]["Enums"]["day_of_week"][]
        }
        Relationships: []
      }
      attendance_violations: {
        Row: {
          action_taken: string | null
          attendance_record_id: string | null
          auto_generated: boolean | null
          created_at: string | null
          duration_minutes: number | null
          employee_id: string | null
          id: string
          notes: string | null
          penalty_amount: number | null
          reviewed: boolean | null
          reviewed_at: string | null
          reviewed_by: string | null
          severity: string | null
          violation_date: string
          violation_type: string
        }
        Insert: {
          action_taken?: string | null
          attendance_record_id?: string | null
          auto_generated?: boolean | null
          created_at?: string | null
          duration_minutes?: number | null
          employee_id?: string | null
          id?: string
          notes?: string | null
          penalty_amount?: number | null
          reviewed?: boolean | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string | null
          violation_date: string
          violation_type: string
        }
        Update: {
          action_taken?: string | null
          attendance_record_id?: string | null
          auto_generated?: boolean | null
          created_at?: string | null
          duration_minutes?: number | null
          employee_id?: string | null
          id?: string
          notes?: string | null
          penalty_amount?: number | null
          reviewed?: boolean | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string | null
          violation_date?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_violations_attendance_record_id_fkey"
            columns: ["attendance_record_id"]
            isOneToOne: false
            referencedRelation: "employee_attendance_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_violations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          operation: string
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          operation: string
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          operation?: string
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      automated_decisions: {
        Row: {
          automatic_amount: number | null
          created_at: string | null
          decision_details: Json
          decision_type: Database["public"]["Enums"]["decision_type"]
          employee_id: string
          evaluation_id: string | null
          executed_at: string | null
          hr_approved_at: string | null
          hr_approved_by: string | null
          hr_rejection_reason: string | null
          id: string
          payroll_updated: boolean | null
          score_threshold: number | null
          status: Database["public"]["Enums"]["decision_status"] | null
          updated_at: string | null
        }
        Insert: {
          automatic_amount?: number | null
          created_at?: string | null
          decision_details: Json
          decision_type: Database["public"]["Enums"]["decision_type"]
          employee_id: string
          evaluation_id?: string | null
          executed_at?: string | null
          hr_approved_at?: string | null
          hr_approved_by?: string | null
          hr_rejection_reason?: string | null
          id?: string
          payroll_updated?: boolean | null
          score_threshold?: number | null
          status?: Database["public"]["Enums"]["decision_status"] | null
          updated_at?: string | null
        }
        Update: {
          automatic_amount?: number | null
          created_at?: string | null
          decision_details?: Json
          decision_type?: Database["public"]["Enums"]["decision_type"]
          employee_id?: string
          evaluation_id?: string | null
          executed_at?: string | null
          hr_approved_at?: string | null
          hr_approved_by?: string | null
          hr_rejection_reason?: string | null
          id?: string
          payroll_updated?: boolean | null
          score_threshold?: number | null
          status?: Database["public"]["Enums"]["decision_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automated_decisions_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_number: string
          account_type: string
          bank_name: string
          created_at: string
          currency: string | null
          current_balance: number | null
          gl_account_id: string | null
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_number: string
          account_type: string
          bank_name: string
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          gl_account_id?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_number?: string
          account_type?: string
          bank_name?: string
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          gl_account_id?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_gl_account_id_fkey"
            columns: ["gl_account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_transactions: {
        Row: {
          balance: number
          bank_account_id: string
          created_at: string
          credit_amount: number | null
          debit_amount: number | null
          description: string
          id: string
          is_reconciled: boolean | null
          reconciled_at: string | null
          reference_number: string | null
          transaction_date: string
          user_id: string
        }
        Insert: {
          balance: number
          bank_account_id: string
          created_at?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description: string
          id?: string
          is_reconciled?: boolean | null
          reconciled_at?: string | null
          reference_number?: string | null
          transaction_date: string
          user_id: string
        }
        Update: {
          balance?: number
          bank_account_id?: string
          created_at?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string
          id?: string
          is_reconciled?: boolean | null
          reconciled_at?: string | null
          reference_number?: string | null
          transaction_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      boud: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      boud_attendance: {
        Row: {
          attendance_date: string
          break_end_time: string | null
          break_start_time: string | null
          check_in_time: string | null
          check_out_time: string | null
          created_at: string | null
          early_leave_minutes: number | null
          employee_id: string | null
          id: string
          ip_address: string | null
          late_minutes: number | null
          location: string | null
          notes: string | null
          overtime_hours: number | null
          status: Database["public"]["Enums"]["attendance_status"] | null
          updated_at: string | null
          work_hours: number | null
        }
        Insert: {
          attendance_date: string
          break_end_time?: string | null
          break_start_time?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          early_leave_minutes?: number | null
          employee_id?: string | null
          id?: string
          ip_address?: string | null
          late_minutes?: number | null
          location?: string | null
          notes?: string | null
          overtime_hours?: number | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          updated_at?: string | null
          work_hours?: number | null
        }
        Update: {
          attendance_date?: string
          break_end_time?: string | null
          break_start_time?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          early_leave_minutes?: number | null
          employee_id?: string | null
          id?: string
          ip_address?: string | null
          late_minutes?: number | null
          location?: string | null
          notes?: string | null
          overtime_hours?: number | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          updated_at?: string | null
          work_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_companies: {
        Row: {
          address: string | null
          commercial_register: string | null
          company_code: string
          company_name: string
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          phone: string | null
          settings: Json | null
          updated_at: string | null
          vat_number: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          commercial_register?: string | null
          company_code: string
          company_name: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          phone?: string | null
          settings?: Json | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          commercial_register?: string | null
          company_code?: string
          company_name?: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          phone?: string | null
          settings?: Json | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Relationships: []
      }
      boud_departments: {
        Row: {
          budget: number | null
          company_id: string | null
          created_at: string | null
          department_code: string
          department_name: string
          id: string
          is_active: boolean | null
          manager_id: string | null
          parent_department_id: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          company_id?: string | null
          created_at?: string | null
          department_code: string
          department_name: string
          id?: string
          is_active?: boolean | null
          manager_id?: string | null
          parent_department_id?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          company_id?: string | null
          created_at?: string | null
          department_code?: string
          department_name?: string
          id?: string
          is_active?: boolean | null
          manager_id?: string | null
          parent_department_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_departments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_departments_parent_department_id_fkey"
            columns: ["parent_department_id"]
            isOneToOne: false
            referencedRelation: "boud_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_disciplinary_actions: {
        Row: {
          action_type: Database["public"]["Enums"]["disciplinary_action"]
          appeal_result: string | null
          appeal_submitted: boolean | null
          created_at: string | null
          description: string
          effective_date: string | null
          employee_id: string | null
          employee_response: string | null
          evidence: Json | null
          expiry_date: string | null
          id: string
          issued_by: string | null
          issued_date: string | null
          monetary_penalty: number | null
          status: string | null
          suspension_days: number | null
          updated_at: string | null
          violation_date: string
          violation_type: string
          witness_statements: Json | null
        }
        Insert: {
          action_type: Database["public"]["Enums"]["disciplinary_action"]
          appeal_result?: string | null
          appeal_submitted?: boolean | null
          created_at?: string | null
          description: string
          effective_date?: string | null
          employee_id?: string | null
          employee_response?: string | null
          evidence?: Json | null
          expiry_date?: string | null
          id?: string
          issued_by?: string | null
          issued_date?: string | null
          monetary_penalty?: number | null
          status?: string | null
          suspension_days?: number | null
          updated_at?: string | null
          violation_date: string
          violation_type: string
          witness_statements?: Json | null
        }
        Update: {
          action_type?: Database["public"]["Enums"]["disciplinary_action"]
          appeal_result?: string | null
          appeal_submitted?: boolean | null
          created_at?: string | null
          description?: string
          effective_date?: string | null
          employee_id?: string | null
          employee_response?: string | null
          evidence?: Json | null
          expiry_date?: string | null
          id?: string
          issued_by?: string | null
          issued_date?: string | null
          monetary_penalty?: number | null
          status?: string | null
          suspension_days?: number | null
          updated_at?: string | null
          violation_date?: string
          violation_type?: string
          witness_statements?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_disciplinary_actions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_disciplinary_actions_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_employee_terminations: {
        Row: {
          clearance_checklist: Json | null
          clearance_status: string | null
          created_at: string | null
          documents: Json | null
          effective_date: string | null
          employee_id: string | null
          end_of_service_benefit: number | null
          final_settlement: number | null
          id: string
          last_working_date: string | null
          notes: string | null
          notice_date: string | null
          notice_period_days: number | null
          outstanding_dues: number | null
          processed_by: string | null
          processed_date: string | null
          termination_reason: string | null
          termination_type: string
          updated_at: string | null
        }
        Insert: {
          clearance_checklist?: Json | null
          clearance_status?: string | null
          created_at?: string | null
          documents?: Json | null
          effective_date?: string | null
          employee_id?: string | null
          end_of_service_benefit?: number | null
          final_settlement?: number | null
          id?: string
          last_working_date?: string | null
          notes?: string | null
          notice_date?: string | null
          notice_period_days?: number | null
          outstanding_dues?: number | null
          processed_by?: string | null
          processed_date?: string | null
          termination_reason?: string | null
          termination_type: string
          updated_at?: string | null
        }
        Update: {
          clearance_checklist?: Json | null
          clearance_status?: string | null
          created_at?: string | null
          documents?: Json | null
          effective_date?: string | null
          employee_id?: string | null
          end_of_service_benefit?: number | null
          final_settlement?: number | null
          id?: string
          last_working_date?: string | null
          notes?: string | null
          notice_date?: string | null
          notice_period_days?: number | null
          outstanding_dues?: number | null
          processed_by?: string | null
          processed_date?: string | null
          termination_reason?: string | null
          termination_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_employee_terminations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_employee_terminations_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_employees: {
        Row: {
          address: string | null
          annual_leave_balance: number | null
          bank_account_number: string | null
          bank_account_number_encrypted: string | null
          bank_name: string | null
          basic_salary: number | null
          company_id: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          contract_type: string | null
          created_at: string | null
          date_of_birth: string | null
          department_id: string | null
          documents: Json | null
          education_level: string | null
          email: string | null
          emergency_contact: Json | null
          emergency_leave_balance: number | null
          employee_id: string
          employment_status:
            | Database["public"]["Enums"]["employee_status"]
            | null
          experience_years: number | null
          first_name: string
          full_name_arabic: string | null
          gender: string | null
          graduation_year: number | null
          hire_date: string | null
          housing_allowance: number | null
          iban: string | null
          iban_encrypted: string | null
          id: string
          is_active: boolean | null
          last_name: string
          major: string | null
          manager_id: string | null
          marital_status: string | null
          middle_name: string | null
          national_id: string | null
          national_id_encrypted: string | null
          nationality: string | null
          notes: string | null
          other_allowances: number | null
          passport_number: string | null
          passport_number_encrypted: string | null
          phone: string | null
          phone_encrypted: string | null
          position_id: string | null
          profile_picture_url: string | null
          sick_leave_balance: number | null
          total_salary: number | null
          transport_allowance: number | null
          university: string | null
          updated_at: string | null
          user_id: string | null
          work_location: string | null
        }
        Insert: {
          address?: string | null
          annual_leave_balance?: number | null
          bank_account_number?: string | null
          bank_account_number_encrypted?: string | null
          bank_name?: string | null
          basic_salary?: number | null
          company_id?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          contract_type?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department_id?: string | null
          documents?: Json | null
          education_level?: string | null
          email?: string | null
          emergency_contact?: Json | null
          emergency_leave_balance?: number | null
          employee_id: string
          employment_status?:
            | Database["public"]["Enums"]["employee_status"]
            | null
          experience_years?: number | null
          first_name: string
          full_name_arabic?: string | null
          gender?: string | null
          graduation_year?: number | null
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          iban_encrypted?: string | null
          id?: string
          is_active?: boolean | null
          last_name: string
          major?: string | null
          manager_id?: string | null
          marital_status?: string | null
          middle_name?: string | null
          national_id?: string | null
          national_id_encrypted?: string | null
          nationality?: string | null
          notes?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          passport_number_encrypted?: string | null
          phone?: string | null
          phone_encrypted?: string | null
          position_id?: string | null
          profile_picture_url?: string | null
          sick_leave_balance?: number | null
          total_salary?: number | null
          transport_allowance?: number | null
          university?: string | null
          updated_at?: string | null
          user_id?: string | null
          work_location?: string | null
        }
        Update: {
          address?: string | null
          annual_leave_balance?: number | null
          bank_account_number?: string | null
          bank_account_number_encrypted?: string | null
          bank_name?: string | null
          basic_salary?: number | null
          company_id?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          contract_type?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department_id?: string | null
          documents?: Json | null
          education_level?: string | null
          email?: string | null
          emergency_contact?: Json | null
          emergency_leave_balance?: number | null
          employee_id?: string
          employment_status?:
            | Database["public"]["Enums"]["employee_status"]
            | null
          experience_years?: number | null
          first_name?: string
          full_name_arabic?: string | null
          gender?: string | null
          graduation_year?: number | null
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          iban_encrypted?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string
          major?: string | null
          manager_id?: string | null
          marital_status?: string | null
          middle_name?: string | null
          national_id?: string | null
          national_id_encrypted?: string | null
          nationality?: string | null
          notes?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          passport_number_encrypted?: string | null
          phone?: string | null
          phone_encrypted?: string | null
          position_id?: string | null
          profile_picture_url?: string | null
          sick_leave_balance?: number | null
          total_salary?: number | null
          transport_allowance?: number | null
          university?: string | null
          updated_at?: string | null
          user_id?: string | null
          work_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "boud_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_employees_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "boud_job_positions"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          application_status: string | null
          company_id: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          interview_date: string | null
          interviewer_notes: string | null
          position_id: string | null
          rating: number | null
          resume_url: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          application_status?: string | null
          company_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          interview_date?: string | null
          interviewer_notes?: string | null
          position_id?: string | null
          rating?: number | null
          resume_url?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          application_status?: string | null
          company_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          interview_date?: string | null
          interviewer_notes?: string | null
          position_id?: string | null
          rating?: number | null
          resume_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_job_applications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_job_applications_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "boud_job_positions"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_job_positions: {
        Row: {
          company_id: string | null
          created_at: string | null
          department_id: string | null
          id: string
          is_active: boolean | null
          job_description: string | null
          position_code: string
          position_title: string
          requirements: string | null
          salary_range_max: number | null
          salary_range_min: number | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_active?: boolean | null
          job_description?: string | null
          position_code: string
          position_title: string
          requirements?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_active?: boolean | null
          job_description?: string | null
          position_code?: string
          position_title?: string
          requirements?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_job_positions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_job_positions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "boud_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_leave_requests: {
        Row: {
          applied_date: string | null
          created_at: string | null
          documents: Json | null
          employee_id: string | null
          end_date: string
          hr_approval_by: string | null
          hr_approval_date: string | null
          hr_comments: string | null
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          manager_approval_by: string | null
          manager_approval_date: string | null
          manager_comments: string | null
          reason: string | null
          start_date: string
          status: Database["public"]["Enums"]["request_status"] | null
          total_days: number
          updated_at: string | null
        }
        Insert: {
          applied_date?: string | null
          created_at?: string | null
          documents?: Json | null
          employee_id?: string | null
          end_date: string
          hr_approval_by?: string | null
          hr_approval_date?: string | null
          hr_comments?: string | null
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          manager_approval_by?: string | null
          manager_approval_date?: string | null
          manager_comments?: string | null
          reason?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["request_status"] | null
          total_days: number
          updated_at?: string | null
        }
        Update: {
          applied_date?: string | null
          created_at?: string | null
          documents?: Json | null
          employee_id?: string | null
          end_date?: string
          hr_approval_by?: string | null
          hr_approval_date?: string | null
          hr_comments?: string | null
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          manager_approval_by?: string | null
          manager_approval_date?: string | null
          manager_comments?: string | null
          reason?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          total_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_leave_requests_hr_approval_by_fkey"
            columns: ["hr_approval_by"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_leave_requests_manager_approval_by_fkey"
            columns: ["manager_approval_by"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_payroll_items: {
        Row: {
          absence_days: number | null
          absence_deduction: number | null
          actual_working_days: number | null
          advance_deduction: number | null
          basic_salary: number | null
          bonus: number | null
          commission: number | null
          created_at: string | null
          disciplinary_deduction: number | null
          employee_id: string | null
          gosi_employee: number | null
          gross_salary: number | null
          housing_allowance: number | null
          id: string
          income_tax: number | null
          late_hours: number | null
          loan_deduction: number | null
          net_salary: number | null
          other_allowances: number | null
          other_deductions: number | null
          overtime_hours: number | null
          overtime_pay: number | null
          payroll_run_id: string | null
          total_deductions: number | null
          transport_allowance: number | null
          working_days: number | null
        }
        Insert: {
          absence_days?: number | null
          absence_deduction?: number | null
          actual_working_days?: number | null
          advance_deduction?: number | null
          basic_salary?: number | null
          bonus?: number | null
          commission?: number | null
          created_at?: string | null
          disciplinary_deduction?: number | null
          employee_id?: string | null
          gosi_employee?: number | null
          gross_salary?: number | null
          housing_allowance?: number | null
          id?: string
          income_tax?: number | null
          late_hours?: number | null
          loan_deduction?: number | null
          net_salary?: number | null
          other_allowances?: number | null
          other_deductions?: number | null
          overtime_hours?: number | null
          overtime_pay?: number | null
          payroll_run_id?: string | null
          total_deductions?: number | null
          transport_allowance?: number | null
          working_days?: number | null
        }
        Update: {
          absence_days?: number | null
          absence_deduction?: number | null
          actual_working_days?: number | null
          advance_deduction?: number | null
          basic_salary?: number | null
          bonus?: number | null
          commission?: number | null
          created_at?: string | null
          disciplinary_deduction?: number | null
          employee_id?: string | null
          gosi_employee?: number | null
          gross_salary?: number | null
          housing_allowance?: number | null
          id?: string
          income_tax?: number | null
          late_hours?: number | null
          loan_deduction?: number | null
          net_salary?: number | null
          other_allowances?: number | null
          other_deductions?: number | null
          overtime_hours?: number | null
          overtime_pay?: number | null
          payroll_run_id?: string | null
          total_deductions?: number | null
          transport_allowance?: number | null
          working_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_payroll_items_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_payroll_items_payroll_run_id_fkey"
            columns: ["payroll_run_id"]
            isOneToOne: false
            referencedRelation: "boud_payroll_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_payroll_runs: {
        Row: {
          approved_by: string | null
          approved_date: string | null
          bank_file_generated: boolean | null
          company_id: string | null
          created_at: string | null
          id: string
          payment_date: string | null
          payroll_month: number
          payroll_period_end: string
          payroll_period_start: string
          payroll_year: number
          processed_by: string | null
          processed_date: string | null
          status: string | null
          total_deductions: number | null
          total_employees: number | null
          total_gross_salary: number | null
          total_net_salary: number | null
          updated_at: string | null
          wps_file_generated: boolean | null
        }
        Insert: {
          approved_by?: string | null
          approved_date?: string | null
          bank_file_generated?: boolean | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          payment_date?: string | null
          payroll_month: number
          payroll_period_end: string
          payroll_period_start: string
          payroll_year: number
          processed_by?: string | null
          processed_date?: string | null
          status?: string | null
          total_deductions?: number | null
          total_employees?: number | null
          total_gross_salary?: number | null
          total_net_salary?: number | null
          updated_at?: string | null
          wps_file_generated?: boolean | null
        }
        Update: {
          approved_by?: string | null
          approved_date?: string | null
          bank_file_generated?: boolean | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          payment_date?: string | null
          payroll_month?: number
          payroll_period_end?: string
          payroll_period_start?: string
          payroll_year?: number
          processed_by?: string | null
          processed_date?: string | null
          status?: string | null
          total_deductions?: number | null
          total_employees?: number | null
          total_gross_salary?: number | null
          total_net_salary?: number | null
          updated_at?: string | null
          wps_file_generated?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_payroll_runs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_performance_evaluations: {
        Row: {
          achievements: Json | null
          approved_date: string | null
          areas_for_improvement: string | null
          competencies: Json | null
          created_at: string | null
          development_plan: string | null
          employee_comments: string | null
          employee_id: string | null
          evaluation_period_end: string
          evaluation_period_start: string
          evaluation_type: string | null
          evaluator_id: string | null
          goals: Json | null
          hr_comments: string | null
          id: string
          manager_comments: string | null
          overall_rating: number | null
          status: string | null
          strengths: string | null
          submitted_date: string | null
          updated_at: string | null
        }
        Insert: {
          achievements?: Json | null
          approved_date?: string | null
          areas_for_improvement?: string | null
          competencies?: Json | null
          created_at?: string | null
          development_plan?: string | null
          employee_comments?: string | null
          employee_id?: string | null
          evaluation_period_end: string
          evaluation_period_start: string
          evaluation_type?: string | null
          evaluator_id?: string | null
          goals?: Json | null
          hr_comments?: string | null
          id?: string
          manager_comments?: string | null
          overall_rating?: number | null
          status?: string | null
          strengths?: string | null
          submitted_date?: string | null
          updated_at?: string | null
        }
        Update: {
          achievements?: Json | null
          approved_date?: string | null
          areas_for_improvement?: string | null
          competencies?: Json | null
          created_at?: string | null
          development_plan?: string | null
          employee_comments?: string | null
          employee_id?: string | null
          evaluation_period_end?: string
          evaluation_period_start?: string
          evaluation_type?: string | null
          evaluator_id?: string | null
          goals?: Json | null
          hr_comments?: string | null
          id?: string
          manager_comments?: string | null
          overall_rating?: number | null
          status?: string | null
          strengths?: string | null
          submitted_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_performance_evaluations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_performance_evaluations_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_subscription_packages: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_employees: number
          package_name: string
          package_name_en: string | null
          price_monthly: number
          price_yearly: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_employees?: number
          package_name: string
          package_name_en?: string | null
          price_monthly?: number
          price_yearly?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_employees?: number
          package_name?: string
          package_name_en?: string | null
          price_monthly?: number
          price_yearly?: number
          updated_at?: string
        }
        Relationships: []
      }
      boud_training_enrollments: {
        Row: {
          attendance_percentage: number | null
          certificate_issued: boolean | null
          certificate_url: string | null
          completion_date: string | null
          created_at: string | null
          employee_id: string | null
          enrollment_date: string | null
          feedback: string | null
          final_score: number | null
          id: string
          status: string | null
          training_program_id: string | null
          updated_at: string | null
        }
        Insert: {
          attendance_percentage?: number | null
          certificate_issued?: boolean | null
          certificate_url?: string | null
          completion_date?: string | null
          created_at?: string | null
          employee_id?: string | null
          enrollment_date?: string | null
          feedback?: string | null
          final_score?: number | null
          id?: string
          status?: string | null
          training_program_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attendance_percentage?: number | null
          certificate_issued?: boolean | null
          certificate_url?: string | null
          completion_date?: string | null
          created_at?: string | null
          employee_id?: string | null
          enrollment_date?: string | null
          feedback?: string | null
          final_score?: number | null
          id?: string
          status?: string | null
          training_program_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_training_enrollments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boud_training_enrollments_training_program_id_fkey"
            columns: ["training_program_id"]
            isOneToOne: false
            referencedRelation: "boud_training_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_training_programs: {
        Row: {
          company_id: string | null
          cost_per_participant: number | null
          created_at: string | null
          description: string | null
          duration_hours: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          location: string | null
          max_participants: number | null
          objectives: string | null
          program_code: string
          program_name: string
          requirements: string | null
          start_date: string | null
          status: string | null
          trainer_name: string | null
          training_type: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          cost_per_participant?: number | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          max_participants?: number | null
          objectives?: string | null
          program_code: string
          program_name: string
          requirements?: string | null
          start_date?: string | null
          status?: string | null
          trainer_name?: string | null
          training_type?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          cost_per_participant?: number | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          max_participants?: number | null
          objectives?: string | null
          program_code?: string
          program_name?: string
          requirements?: string | null
          start_date?: string | null
          status?: string | null
          trainer_name?: string | null
          training_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_training_programs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_user_roles: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          permissions: Json | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boud_user_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      boud_user_subscriptions: {
        Row: {
          auto_renew: boolean | null
          billing_cycle: string
          company_name: string
          contact_email: string
          created_at: string
          employee_count: number
          id: string
          package_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_end: string
          subscription_start: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          billing_cycle: string
          company_name: string
          contact_email: string
          created_at?: string
          employee_count?: number
          id?: string
          package_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end: string
          subscription_start?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          billing_cycle?: string
          company_name?: string
          contact_email?: string
          created_at?: string
          employee_count?: number
          id?: string
          package_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end?: string
          subscription_start?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boud_user_subscriptions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "boud_subscription_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_allocations: {
        Row: {
          allocated_amount: number
          category_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["allocation_status"] | null
          updated_at: string | null
          year: number
        }
        Insert: {
          allocated_amount?: number
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["allocation_status"] | null
          updated_at?: string | null
          year: number
        }
        Update: {
          allocated_amount?: number
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["allocation_status"] | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "budget_allocations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "budget_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_categories: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          name_ar: string
          name_en: string
          status: Database["public"]["Enums"]["budget_status"] | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name_ar: string
          name_en: string
          status?: Database["public"]["Enums"]["budget_status"] | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          status?: Database["public"]["Enums"]["budget_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      budget_expenses: {
        Row: {
          amount: number
          attachment_url: string | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          description: string
          expense_date: string
          id: string
          status: Database["public"]["Enums"]["expense_status"] | null
          updated_at: string | null
        }
        Insert: {
          amount?: number
          attachment_url?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          expense_date: string
          id?: string
          status?: Database["public"]["Enums"]["expense_status"] | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          attachment_url?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          expense_date?: string
          id?: string
          status?: Database["public"]["Enums"]["expense_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "budget_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_kpis: {
        Row: {
          actual_amount: number
          category_id: string | null
          created_at: string | null
          id: string
          period_type: Database["public"]["Enums"]["period_type"]
          period_value: number
          planned_amount: number
          variance: number | null
          variance_percent: number | null
        }
        Insert: {
          actual_amount?: number
          category_id?: string | null
          created_at?: string | null
          id?: string
          period_type: Database["public"]["Enums"]["period_type"]
          period_value: number
          planned_amount?: number
          variance?: number | null
          variance_percent?: number | null
        }
        Update: {
          actual_amount?: number
          category_id?: string | null
          created_at?: string | null
          id?: string
          period_type?: Database["public"]["Enums"]["period_type"]
          period_value?: number
          planned_amount?: number
          variance?: number | null
          variance_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_kpis_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "budget_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_lines: {
        Row: {
          account_id: string
          actual_amount: number | null
          budget_id: string
          created_at: string
          id: string
          planned_amount: number
          updated_at: string
          variance: number | null
          variance_percentage: number | null
        }
        Insert: {
          account_id: string
          actual_amount?: number | null
          budget_id: string
          created_at?: string
          id?: string
          planned_amount: number
          updated_at?: string
          variance?: number | null
          variance_percentage?: number | null
        }
        Update: {
          account_id?: string
          actual_amount?: number | null
          budget_id?: string
          created_at?: string
          id?: string
          planned_amount?: number
          updated_at?: string
          variance?: number | null
          variance_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budget_lines_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_requests: {
        Row: {
          approved_by: string | null
          budget_period: string
          created_at: string
          department: string
          id: string
          justification: string
          request_number: string
          requested_by: string
          status: string
          total_requested: number
          updated_at: string
          user_id: string
          workflow_id: string | null
        }
        Insert: {
          approved_by?: string | null
          budget_period: string
          created_at?: string
          department: string
          id?: string
          justification: string
          request_number: string
          requested_by: string
          status?: string
          total_requested: number
          updated_at?: string
          user_id: string
          workflow_id?: string | null
        }
        Update: {
          approved_by?: string | null
          budget_period?: string
          created_at?: string
          department?: string
          id?: string
          justification?: string
          request_number?: string
          requested_by?: string
          status?: string
          total_requested?: number
          updated_at?: string
          user_id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_requests_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          actual_amount: number | null
          budget_name: string
          budget_type: string
          created_at: string
          currency: string | null
          id: string
          period_end: string
          period_start: string
          planned_amount: number
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_amount?: number | null
          budget_name: string
          budget_type: string
          created_at?: string
          currency?: string | null
          id?: string
          period_end: string
          period_start: string
          planned_amount: number
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_amount?: number | null
          budget_name?: string
          budget_type?: string
          created_at?: string
          currency?: string | null
          id?: string
          period_end?: string
          period_start?: string
          planned_amount?: number
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      career_departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          name_en: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          name_en?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          name_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chart_of_accounts: {
        Row: {
          account_code: string
          account_name: string
          account_type: string
          created_at: string
          currency: string | null
          current_balance: number | null
          id: string
          is_active: boolean | null
          level: number
          opening_balance: number | null
          parent_account_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_code: string
          account_name: string
          account_type: string
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          id?: string
          is_active?: boolean | null
          level?: number
          opening_balance?: number | null
          parent_account_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_code?: string
          account_name?: string
          account_type?: string
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          id?: string
          is_active?: boolean | null
          level?: number
          opening_balance?: number | null
          parent_account_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chart_of_accounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          contact_person: string
          created_at: string
          created_by: string | null
          email: string
          employees: number | null
          id: string
          industry: string | null
          join_date: string
          last_login: string | null
          monthly_revenue: number | null
          name: string
          phone: string | null
          plan: string
          status: string
          updated_at: string
        }
        Insert: {
          contact_person: string
          created_at?: string
          created_by?: string | null
          email: string
          employees?: number | null
          id?: string
          industry?: string | null
          join_date?: string
          last_login?: string | null
          monthly_revenue?: number | null
          name: string
          phone?: string | null
          plan?: string
          status?: string
          updated_at?: string
        }
        Update: {
          contact_person?: string
          created_at?: string
          created_by?: string | null
          email?: string
          employees?: number | null
          id?: string
          industry?: string | null
          join_date?: string
          last_login?: string | null
          monthly_revenue?: number | null
          name?: string
          phone?: string | null
          plan?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          commercial_register: string | null
          company_code: string
          company_name: string
          created_at: string
          email: string | null
          employee_count: number | null
          id: string
          industry: string | null
          is_active: boolean | null
          owner_id: string | null
          phone: string | null
          settings: Json | null
          updated_at: string
          vat_number: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          commercial_register?: string | null
          company_code: string
          company_name: string
          created_at?: string
          email?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          owner_id?: string | null
          phone?: string | null
          settings?: Json | null
          updated_at?: string
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          commercial_register?: string | null
          company_code?: string
          company_name?: string
          created_at?: string
          email?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          owner_id?: string | null
          phone?: string | null
          settings?: Json | null
          updated_at?: string
          vat_number?: string | null
          website?: string | null
        }
        Relationships: []
      }
      company_holidays: {
        Row: {
          company_id: string | null
          created_at: string
          holiday_date: string
          id: string
          is_active: boolean
          is_recurring: boolean
          name: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          holiday_date: string
          id?: string
          is_active?: boolean
          is_recurring?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          holiday_date?: string
          id?: string
          is_active?: boolean
          is_recurring?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      compliance_items: {
        Row: {
          completion_percentage: number | null
          compliance_type: string | null
          created_at: string
          description: string | null
          due_date: string | null
          evidence_url: string | null
          id: string
          last_assessment_date: string | null
          next_assessment_date: string | null
          notes: string | null
          priority: string | null
          requirement_source: string | null
          responsible_person: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_percentage?: number | null
          compliance_type?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          evidence_url?: string | null
          id?: string
          last_assessment_date?: string | null
          next_assessment_date?: string | null
          notes?: string | null
          priority?: string | null
          requirement_source?: string | null
          responsible_person?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_percentage?: number | null
          compliance_type?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          evidence_url?: string | null
          id?: string
          last_assessment_date?: string | null
          next_assessment_date?: string | null
          notes?: string | null
          priority?: string | null
          requirement_source?: string | null
          responsible_person?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_reports: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          critical_issues_count: number | null
          description: string | null
          generated_by: string
          id: string
          overall_compliance_score: number | null
          published_at: string | null
          recommendations_count: number | null
          report_data: Json | null
          report_type: string | null
          reporting_period_end: string
          reporting_period_start: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          critical_issues_count?: number | null
          description?: string | null
          generated_by: string
          id?: string
          overall_compliance_score?: number | null
          published_at?: string | null
          recommendations_count?: number | null
          report_data?: Json | null
          report_type?: string | null
          reporting_period_end: string
          reporting_period_start: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          critical_issues_count?: number | null
          description?: string | null
          generated_by?: string
          id?: string
          overall_compliance_score?: number | null
          published_at?: string | null
          recommendations_count?: number | null
          report_data?: Json | null
          report_type?: string | null
          reporting_period_end?: string
          reporting_period_start?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      comprehensive_leave_requests: {
        Row: {
          attachments: Json | null
          created_at: string | null
          delegate_employee_id: string | null
          delegate_instructions: string | null
          employee_id: string
          end_date: string
          final_approval_at: string | null
          final_approver_id: string | null
          hr_approval_at: string | null
          hr_approver_id: string | null
          hr_comments: string | null
          id: string
          leave_type_code: string
          manager_approval_at: string | null
          manager_comments: string | null
          manager_id: string | null
          medical_certificate_url: string | null
          priority: string | null
          reason: string
          rejection_reason: string | null
          start_date: string
          status: string | null
          submitted_at: string | null
          submitted_by: string | null
          total_days: number
          updated_at: string | null
          working_days: number
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          delegate_employee_id?: string | null
          delegate_instructions?: string | null
          employee_id: string
          end_date: string
          final_approval_at?: string | null
          final_approver_id?: string | null
          hr_approval_at?: string | null
          hr_approver_id?: string | null
          hr_comments?: string | null
          id?: string
          leave_type_code: string
          manager_approval_at?: string | null
          manager_comments?: string | null
          manager_id?: string | null
          medical_certificate_url?: string | null
          priority?: string | null
          reason: string
          rejection_reason?: string | null
          start_date: string
          status?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          total_days: number
          updated_at?: string | null
          working_days: number
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          delegate_employee_id?: string | null
          delegate_instructions?: string | null
          employee_id?: string
          end_date?: string
          final_approval_at?: string | null
          final_approver_id?: string | null
          hr_approval_at?: string | null
          hr_approver_id?: string | null
          hr_comments?: string | null
          id?: string
          leave_type_code?: string
          manager_approval_at?: string | null
          manager_comments?: string | null
          manager_id?: string | null
          medical_certificate_url?: string | null
          priority?: string | null
          reason?: string
          rejection_reason?: string | null
          start_date?: string
          status?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          total_days?: number
          updated_at?: string | null
          working_days?: number
        }
        Relationships: []
      }
      court_sessions: {
        Row: {
          agenda: string | null
          attachments: Json | null
          attendees: Json | null
          court_name: string
          court_room: string | null
          created_at: string
          created_by: string | null
          decisions: string | null
          duration_minutes: number | null
          evidence_presented: Json | null
          id: string
          judge_name: string | null
          lawyer_notes: string | null
          legal_case_id: string
          minutes: string | null
          next_session_date: string | null
          outcome: string | null
          postponement_reason: string | null
          session_date: string
          session_number: number
          session_time: string | null
          session_type: string
          status: Database["public"]["Enums"]["session_status"]
          updated_at: string
          witness_testimonies: string | null
        }
        Insert: {
          agenda?: string | null
          attachments?: Json | null
          attendees?: Json | null
          court_name: string
          court_room?: string | null
          created_at?: string
          created_by?: string | null
          decisions?: string | null
          duration_minutes?: number | null
          evidence_presented?: Json | null
          id?: string
          judge_name?: string | null
          lawyer_notes?: string | null
          legal_case_id: string
          minutes?: string | null
          next_session_date?: string | null
          outcome?: string | null
          postponement_reason?: string | null
          session_date: string
          session_number: number
          session_time?: string | null
          session_type?: string
          status?: Database["public"]["Enums"]["session_status"]
          updated_at?: string
          witness_testimonies?: string | null
        }
        Update: {
          agenda?: string | null
          attachments?: Json | null
          attendees?: Json | null
          court_name?: string
          court_room?: string | null
          created_at?: string
          created_by?: string | null
          decisions?: string | null
          duration_minutes?: number | null
          evidence_presented?: Json | null
          id?: string
          judge_name?: string | null
          lawyer_notes?: string | null
          legal_case_id?: string
          minutes?: string | null
          next_session_date?: string | null
          outcome?: string | null
          postponement_reason?: string | null
          session_date?: string
          session_number?: number
          session_time?: string | null
          session_type?: string
          status?: Database["public"]["Enums"]["session_status"]
          updated_at?: string
          witness_testimonies?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          commercial_register: string | null
          contact_person: string | null
          created_at: string
          credit_limit: number | null
          currency: string | null
          customer_code: string
          customer_name: string
          email: string | null
          id: string
          is_active: boolean | null
          payment_terms: number | null
          phone: string | null
          updated_at: string
          user_id: string
          vat_number: string | null
        }
        Insert: {
          address?: string | null
          commercial_register?: string | null
          contact_person?: string | null
          created_at?: string
          credit_limit?: number | null
          currency?: string | null
          customer_code: string
          customer_name: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          payment_terms?: number | null
          phone?: string | null
          updated_at?: string
          user_id: string
          vat_number?: string | null
        }
        Update: {
          address?: string | null
          commercial_register?: string | null
          contact_person?: string | null
          created_at?: string
          credit_limit?: number | null
          currency?: string | null
          customer_code?: string
          customer_name?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          payment_terms?: number | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      department_permissions: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          permission_code: string
          permission_name_ar: string
          permission_name_en: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          permission_code: string
          permission_name_ar: string
          permission_name_en?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          permission_code?: string
          permission_name_ar?: string
          permission_name_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      development_plans: {
        Row: {
          created_at: string | null
          created_by: string | null
          development_activities: Json | null
          employee_id: string
          evaluation_id: string | null
          id: string
          status: string | null
          timeline_months: number | null
          training_recommendations: Json | null
          updated_at: string | null
          weak_indicators: string[] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          development_activities?: Json | null
          employee_id: string
          evaluation_id?: string | null
          id?: string
          status?: string | null
          timeline_months?: number | null
          training_recommendations?: Json | null
          updated_at?: string | null
          weak_indicators?: string[] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          development_activities?: Json | null
          employee_id?: string
          evaluation_id?: string | null
          id?: string
          status?: string | null
          timeline_months?: number | null
          training_recommendations?: Json | null
          updated_at?: string | null
          weak_indicators?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "development_plans_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
      device_attendance_logs: {
        Row: {
          action_type: string
          confidence_score: number | null
          created_at: string | null
          device_id: string | null
          employee_code: string | null
          employee_id: string | null
          id: string
          is_successful: boolean | null
          log_time: string
          processed: boolean | null
          raw_data: Json | null
          verification_method: string | null
        }
        Insert: {
          action_type: string
          confidence_score?: number | null
          created_at?: string | null
          device_id?: string | null
          employee_code?: string | null
          employee_id?: string | null
          id?: string
          is_successful?: boolean | null
          log_time: string
          processed?: boolean | null
          raw_data?: Json | null
          verification_method?: string | null
        }
        Update: {
          action_type?: string
          confidence_score?: number | null
          created_at?: string | null
          device_id?: string | null
          employee_code?: string | null
          employee_id?: string | null
          id?: string
          is_successful?: boolean | null
          log_time?: string
          processed?: boolean | null
          raw_data?: Json | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_attendance_logs_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "attendance_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_attendance_logs_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplinary_actions: {
        Row: {
          action_type: Database["public"]["Enums"]["disciplinary_action_type"]
          attendance_record_id: string | null
          case_number: string
          company_id: string | null
          created_at: string | null
          description: string
          employee_id: string
          evidence: Json | null
          id: string
          notes: string | null
          penalty_amount: number | null
          reported_by: string
          resolution_date: string | null
          review_date: string | null
          status: Database["public"]["Enums"]["disciplinary_status"] | null
          suspension_days: number | null
          updated_at: string | null
          violation_date: string
          violation_id: string | null
        }
        Insert: {
          action_type: Database["public"]["Enums"]["disciplinary_action_type"]
          attendance_record_id?: string | null
          case_number: string
          company_id?: string | null
          created_at?: string | null
          description: string
          employee_id: string
          evidence?: Json | null
          id?: string
          notes?: string | null
          penalty_amount?: number | null
          reported_by: string
          resolution_date?: string | null
          review_date?: string | null
          status?: Database["public"]["Enums"]["disciplinary_status"] | null
          suspension_days?: number | null
          updated_at?: string | null
          violation_date: string
          violation_id?: string | null
        }
        Update: {
          action_type?: Database["public"]["Enums"]["disciplinary_action_type"]
          attendance_record_id?: string | null
          case_number?: string
          company_id?: string | null
          created_at?: string | null
          description?: string
          employee_id?: string
          evidence?: Json | null
          id?: string
          notes?: string | null
          penalty_amount?: number | null
          reported_by?: string
          resolution_date?: string | null
          review_date?: string | null
          status?: Database["public"]["Enums"]["disciplinary_status"] | null
          suspension_days?: number | null
          updated_at?: string | null
          violation_date?: string
          violation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disciplinary_actions_violation_id_fkey"
            columns: ["violation_id"]
            isOneToOne: false
            referencedRelation: "saudi_labor_violations"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplinary_approvals: {
        Row: {
          approval_level: number
          approved_at: string | null
          approver_id: string
          comments: string | null
          created_at: string | null
          disciplinary_action_id: string | null
          id: string
          status: string
        }
        Insert: {
          approval_level: number
          approved_at?: string | null
          approver_id: string
          comments?: string | null
          created_at?: string | null
          disciplinary_action_id?: string | null
          id?: string
          status?: string
        }
        Update: {
          approval_level?: number
          approved_at?: string | null
          approver_id?: string
          comments?: string | null
          created_at?: string | null
          disciplinary_action_id?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "disciplinary_approvals_disciplinary_action_id_fkey"
            columns: ["disciplinary_action_id"]
            isOneToOne: false
            referencedRelation: "disciplinary_actions"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          created_at: string
          delivery_date: string | null
          documentation_notes: string | null
          donor_id: string
          id: string
          is_recurring: boolean | null
          mosque_id: string
          quantity: number
          recurring_frequency: string | null
          service_id: string
          special_occasion: string | null
          status: Database["public"]["Enums"]["donation_status"] | null
          total_amount: number
          unit_price: number
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          delivery_date?: string | null
          documentation_notes?: string | null
          donor_id: string
          id?: string
          is_recurring?: boolean | null
          mosque_id: string
          quantity?: number
          recurring_frequency?: string | null
          service_id: string
          special_occasion?: string | null
          status?: Database["public"]["Enums"]["donation_status"] | null
          total_amount: number
          unit_price: number
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          delivery_date?: string | null
          documentation_notes?: string | null
          donor_id?: string
          id?: string
          is_recurring?: boolean | null
          mosque_id?: string
          quantity?: number
          recurring_frequency?: string | null
          service_id?: string
          special_occasion?: string | null
          status?: Database["public"]["Enums"]["donation_status"] | null
          total_amount?: number
          unit_price?: number
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_mosque_id_fkey"
            columns: ["mosque_id"]
            isOneToOne: false
            referencedRelation: "mosques"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      electronic_signatures: {
        Row: {
          created_at: string | null
          device_info: string | null
          evaluation_id: string | null
          id: string
          ip_address: string | null
          signature_data: string | null
          signature_timestamp: string | null
          signer_id: string
          signer_role: string
          status: Database["public"]["Enums"]["signature_status"] | null
        }
        Insert: {
          created_at?: string | null
          device_info?: string | null
          evaluation_id?: string | null
          id?: string
          ip_address?: string | null
          signature_data?: string | null
          signature_timestamp?: string | null
          signer_id: string
          signer_role: string
          status?: Database["public"]["Enums"]["signature_status"] | null
        }
        Update: {
          created_at?: string | null
          device_info?: string | null
          evaluation_id?: string | null
          id?: string
          ip_address?: string | null
          signature_data?: string | null
          signature_timestamp?: string | null
          signer_id?: string
          signer_role?: string
          status?: Database["public"]["Enums"]["signature_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "electronic_signatures_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_attendance_records: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attendance_date: string
          break_end_time: string | null
          break_start_time: string | null
          check_in_location: Json | null
          check_in_time: string | null
          check_out_location: Json | null
          check_out_time: string | null
          created_at: string | null
          employee_id: string
          id: string
          notes: string | null
          overtime_hours: number | null
          status: string | null
          total_hours: number | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_date?: string
          break_end_time?: string | null
          break_start_time?: string | null
          check_in_location?: Json | null
          check_in_time?: string | null
          check_out_location?: Json | null
          check_out_time?: string | null
          created_at?: string | null
          employee_id: string
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_date?: string
          break_end_time?: string | null
          break_start_time?: string | null
          check_in_location?: Json | null
          check_in_time?: string | null
          check_out_location?: Json | null
          check_out_time?: string | null
          created_at?: string | null
          employee_id?: string
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employee_disciplinary_record: {
        Row: {
          clean_record_start_date: string | null
          company_id: string | null
          created_at: string | null
          disciplinary_action_id: string | null
          employee_id: string
          id: string
          is_active: boolean | null
          last_violation_date: string | null
          total_penalties: number | null
          total_warnings: number | null
          updated_at: string | null
          violation_count: number | null
        }
        Insert: {
          clean_record_start_date?: string | null
          company_id?: string | null
          created_at?: string | null
          disciplinary_action_id?: string | null
          employee_id: string
          id?: string
          is_active?: boolean | null
          last_violation_date?: string | null
          total_penalties?: number | null
          total_warnings?: number | null
          updated_at?: string | null
          violation_count?: number | null
        }
        Update: {
          clean_record_start_date?: string | null
          company_id?: string | null
          created_at?: string | null
          disciplinary_action_id?: string | null
          employee_id?: string
          id?: string
          is_active?: boolean | null
          last_violation_date?: string | null
          total_penalties?: number | null
          total_warnings?: number | null
          updated_at?: string | null
          violation_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_disciplinary_record_disciplinary_action_id_fkey"
            columns: ["disciplinary_action_id"]
            isOneToOne: false
            referencedRelation: "disciplinary_actions"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_documents: {
        Row: {
          created_at: string | null
          document_name: string
          document_type: string
          employee_id: string
          expiry_date: string | null
          file_path: string | null
          file_size: number | null
          id: string
          is_verified: boolean | null
          mime_type: string | null
          notes: string | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_name: string
          document_type: string
          employee_id: string
          expiry_date?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_verified?: boolean | null
          mime_type?: string | null
          notes?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string
          document_type?: string
          employee_id?: string
          expiry_date?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_verified?: boolean | null
          mime_type?: string | null
          notes?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      employee_insurance_subscriptions: {
        Row: {
          additional_coverage: Json | null
          beneficiaries: Json | null
          created_at: string | null
          dependents: Json | null
          employee_contribution: number | null
          employee_id: string
          employer_contribution: number | null
          end_date: string | null
          id: string
          last_medical_checkup: string | null
          medical_conditions: Json | null
          notes: string | null
          policy_id: string | null
          salary_percentage: number | null
          start_date: string
          status: Database["public"]["Enums"]["insurance_status"] | null
          subscription_number: string
          total_premium: number
          updated_at: string | null
        }
        Insert: {
          additional_coverage?: Json | null
          beneficiaries?: Json | null
          created_at?: string | null
          dependents?: Json | null
          employee_contribution?: number | null
          employee_id: string
          employer_contribution?: number | null
          end_date?: string | null
          id?: string
          last_medical_checkup?: string | null
          medical_conditions?: Json | null
          notes?: string | null
          policy_id?: string | null
          salary_percentage?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["insurance_status"] | null
          subscription_number: string
          total_premium: number
          updated_at?: string | null
        }
        Update: {
          additional_coverage?: Json | null
          beneficiaries?: Json | null
          created_at?: string | null
          dependents?: Json | null
          employee_contribution?: number | null
          employee_id?: string
          employer_contribution?: number | null
          end_date?: string | null
          id?: string
          last_medical_checkup?: string | null
          medical_conditions?: Json | null
          notes?: string | null
          policy_id?: string | null
          salary_percentage?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["insurance_status"] | null
          subscription_number?: string
          total_premium?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_insurance_subscriptions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "insurance_policies"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_kpi_measurements: {
        Row: {
          actual_value: number
          created_at: string
          employee_id: string
          id: string
          kpi_id: string
          measurement_date: string
          notes: string | null
          recorded_by: string | null
          target_value: number | null
          variance: number | null
          variance_percentage: number | null
        }
        Insert: {
          actual_value: number
          created_at?: string
          employee_id: string
          id?: string
          kpi_id: string
          measurement_date?: string
          notes?: string | null
          recorded_by?: string | null
          target_value?: number | null
          variance?: number | null
          variance_percentage?: number | null
        }
        Update: {
          actual_value?: number
          created_at?: string
          employee_id?: string
          id?: string
          kpi_id?: string
          measurement_date?: string
          notes?: string | null
          recorded_by?: string | null
          target_value?: number | null
          variance?: number | null
          variance_percentage?: number | null
        }
        Relationships: []
      }
      employee_leave_balances: {
        Row: {
          carried_forward: number | null
          employee_id: string
          id: string
          last_updated: string | null
          leave_type_code: string
          pending_days: number | null
          remaining_days: number | null
          total_entitled: number | null
          used_days: number | null
          year: number
        }
        Insert: {
          carried_forward?: number | null
          employee_id: string
          id?: string
          last_updated?: string | null
          leave_type_code: string
          pending_days?: number | null
          remaining_days?: number | null
          total_entitled?: number | null
          used_days?: number | null
          year: number
        }
        Update: {
          carried_forward?: number | null
          employee_id?: string
          id?: string
          last_updated?: string | null
          leave_type_code?: string
          pending_days?: number | null
          remaining_days?: number | null
          total_entitled?: number | null
          used_days?: number | null
          year?: number
        }
        Relationships: []
      }
      employee_live_tracking: {
        Row: {
          accuracy: number | null
          activity_type: string | null
          battery_level: number | null
          employee_id: string | null
          geofence_location_id: string | null
          heading: number | null
          id: string
          is_inside_geofence: boolean | null
          latitude: number
          longitude: number
          speed: number | null
          timestamp: string | null
        }
        Insert: {
          accuracy?: number | null
          activity_type?: string | null
          battery_level?: number | null
          employee_id?: string | null
          geofence_location_id?: string | null
          heading?: number | null
          id?: string
          is_inside_geofence?: boolean | null
          latitude: number
          longitude: number
          speed?: number | null
          timestamp?: string | null
        }
        Update: {
          accuracy?: number | null
          activity_type?: string | null
          battery_level?: number | null
          employee_id?: string | null
          geofence_location_id?: string | null
          heading?: number | null
          id?: string
          is_inside_geofence?: boolean | null
          latitude?: number
          longitude?: number
          speed?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_live_tracking_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_live_tracking_geofence_location_id_fkey"
            columns: ["geofence_location_id"]
            isOneToOne: false
            referencedRelation: "attendance_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_notifications: {
        Row: {
          action_type: string | null
          created_at: string | null
          description: string | null
          employee_id: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          metadata: Json | null
          notification_type: string
          priority: string | null
          read_at: string | null
          related_id: string | null
          title: string
        }
        Insert: {
          action_type?: string | null
          created_at?: string | null
          description?: string | null
          employee_id: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          related_id?: string | null
          title: string
        }
        Update: {
          action_type?: string | null
          created_at?: string | null
          description?: string | null
          employee_id?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          related_id?: string | null
          title?: string
        }
        Relationships: []
      }
      employee_requests: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          documents: Json | null
          due_date: string | null
          employee_id: string
          id: string
          priority: string | null
          request_type: string
          response_notes: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          documents?: Json | null
          due_date?: string | null
          employee_id: string
          id?: string
          priority?: string | null
          request_type: string
          response_notes?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          documents?: Json | null
          due_date?: string | null
          employee_id?: string
          id?: string
          priority?: string | null
          request_type?: string
          response_notes?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employee_rewards: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          attachments: Json | null
          calculation_base: Json | null
          comments: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          eligibility_score: number | null
          employee_id: string | null
          id: string
          net_amount: number | null
          payment_date: string | null
          payment_reference: string | null
          performance_period_end: string | null
          performance_period_start: string | null
          program_id: string | null
          reason: string
          recommended_by: string | null
          rejected_reason: string | null
          reward_number: string
          reward_type: Database["public"]["Enums"]["reward_type"]
          status: Database["public"]["Enums"]["reward_status"] | null
          tax_deducted: number | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          attachments?: Json | null
          calculation_base?: Json | null
          comments?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          eligibility_score?: number | null
          employee_id?: string | null
          id?: string
          net_amount?: number | null
          payment_date?: string | null
          payment_reference?: string | null
          performance_period_end?: string | null
          performance_period_start?: string | null
          program_id?: string | null
          reason: string
          recommended_by?: string | null
          rejected_reason?: string | null
          reward_number?: string
          reward_type: Database["public"]["Enums"]["reward_type"]
          status?: Database["public"]["Enums"]["reward_status"] | null
          tax_deducted?: number | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          attachments?: Json | null
          calculation_base?: Json | null
          comments?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          eligibility_score?: number | null
          employee_id?: string | null
          id?: string
          net_amount?: number | null
          payment_date?: string | null
          payment_reference?: string | null
          performance_period_end?: string | null
          performance_period_start?: string | null
          program_id?: string | null
          reason?: string
          recommended_by?: string | null
          rejected_reason?: string | null
          reward_number?: string
          reward_type?: Database["public"]["Enums"]["reward_type"]
          status?: Database["public"]["Enums"]["reward_status"] | null
          tax_deducted?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_rewards_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_rewards_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "incentive_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_schedules: {
        Row: {
          created_at: string | null
          created_by: string | null
          employee_id: string | null
          id: string
          location_id: string | null
          notes: string | null
          planned_end: string | null
          planned_start: string | null
          shift_id: string | null
          status: Database["public"]["Enums"]["approval_status"] | null
          work_date: string
          work_type: Database["public"]["Enums"]["work_type"] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          employee_id?: string | null
          id?: string
          location_id?: string | null
          notes?: string | null
          planned_end?: string | null
          planned_start?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["approval_status"] | null
          work_date: string
          work_type?: Database["public"]["Enums"]["work_type"] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          employee_id?: string | null
          id?: string
          location_id?: string | null
          notes?: string | null
          planned_end?: string | null
          planned_start?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["approval_status"] | null
          work_date?: string
          work_type?: Database["public"]["Enums"]["work_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_schedules_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_schedules_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "attendance_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_schedules_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "work_shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_temporary_passwords: {
        Row: {
          created_at: string | null
          employee_id: string
          expires_at: string
          id: string
          is_used: boolean | null
          temp_password: string
        }
        Insert: {
          created_at?: string | null
          employee_id: string
          expires_at?: string
          id?: string
          is_used?: boolean | null
          temp_password: string
        }
        Update: {
          created_at?: string | null
          employee_id?: string
          expires_at?: string
          id?: string
          is_used?: boolean | null
          temp_password?: string
        }
        Relationships: []
      }
      employee_work_schedules: {
        Row: {
          created_at: string
          effective_date: string
          employee_id: string
          end_date: string | null
          id: string
          is_active: boolean
          schedule_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          effective_date?: string
          employee_id: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          schedule_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          effective_date?: string
          employee_id?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          schedule_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_work_schedules_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "work_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          bank_account: string | null
          basic_salary: number
          created_at: string
          department: string | null
          employee_id: string
          full_name: string
          hire_date: string | null
          housing_allowance: number | null
          iban: string | null
          id: string
          is_active: boolean | null
          other_allowances: number | null
          position: string | null
          transport_allowance: number | null
          updated_at: string
          user_id: string
          user_ref: string | null
        }
        Insert: {
          bank_account?: string | null
          basic_salary: number
          created_at?: string
          department?: string | null
          employee_id: string
          full_name: string
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          id?: string
          is_active?: boolean | null
          other_allowances?: number | null
          position?: string | null
          transport_allowance?: number | null
          updated_at?: string
          user_id: string
          user_ref?: string | null
        }
        Update: {
          bank_account?: string | null
          basic_salary?: number
          created_at?: string
          department?: string | null
          employee_id?: string
          full_name?: string
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          id?: string
          is_active?: boolean | null
          other_allowances?: number | null
          position?: string | null
          transport_allowance?: number | null
          updated_at?: string
          user_id?: string
          user_ref?: string | null
        }
        Relationships: []
      }
      end_of_service: {
        Row: {
          clearance_status: Json | null
          created_at: string | null
          deductions: number | null
          employee_id: string
          exit_interview_completed: boolean | null
          final_documents_issued: boolean | null
          final_settlement: Json | null
          id: string
          last_working_day: string | null
          net_amount: number | null
          notice_period_days: number | null
          other_dues: number | null
          processed_by: string | null
          reason: string | null
          status: string | null
          termination_date: string
          termination_type: string
          total_eos_amount: number | null
          updated_at: string | null
          vacation_balance_amount: number | null
          vacation_balance_days: number | null
          years_of_service: number | null
        }
        Insert: {
          clearance_status?: Json | null
          created_at?: string | null
          deductions?: number | null
          employee_id: string
          exit_interview_completed?: boolean | null
          final_documents_issued?: boolean | null
          final_settlement?: Json | null
          id?: string
          last_working_day?: string | null
          net_amount?: number | null
          notice_period_days?: number | null
          other_dues?: number | null
          processed_by?: string | null
          reason?: string | null
          status?: string | null
          termination_date: string
          termination_type: string
          total_eos_amount?: number | null
          updated_at?: string | null
          vacation_balance_amount?: number | null
          vacation_balance_days?: number | null
          years_of_service?: number | null
        }
        Update: {
          clearance_status?: Json | null
          created_at?: string | null
          deductions?: number | null
          employee_id?: string
          exit_interview_completed?: boolean | null
          final_documents_issued?: boolean | null
          final_settlement?: Json | null
          id?: string
          last_working_day?: string | null
          net_amount?: number | null
          notice_period_days?: number | null
          other_dues?: number | null
          processed_by?: string | null
          reason?: string | null
          status?: string | null
          termination_date?: string
          termination_type?: string
          total_eos_amount?: number | null
          updated_at?: string | null
          vacation_balance_amount?: number | null
          vacation_balance_days?: number | null
          years_of_service?: number | null
        }
        Relationships: []
      }
      evaluation_criteria: {
        Row: {
          created_at: string
          criteria_code: string
          criteria_name: string
          criteria_name_en: string | null
          description: string | null
          display_order: number | null
          evaluation_levels: Json
          factor_id: string | null
          id: string
          is_active: boolean
          updated_at: string
          weight_percentage: number
        }
        Insert: {
          created_at?: string
          criteria_code: string
          criteria_name: string
          criteria_name_en?: string | null
          description?: string | null
          display_order?: number | null
          evaluation_levels?: Json
          factor_id?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
          weight_percentage?: number
        }
        Update: {
          created_at?: string
          criteria_code?: string
          criteria_name?: string
          criteria_name_en?: string | null
          description?: string | null
          display_order?: number | null
          evaluation_levels?: Json
          factor_id?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
          weight_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_criteria_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "evaluation_factors"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_factors: {
        Row: {
          category: string
          company_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          evaluation_method: string
          factor_code: string
          factor_name: string
          factor_name_en: string | null
          id: string
          is_active: boolean
          is_mandatory: boolean
          max_score: number | null
          min_score: number | null
          updated_at: string
          weight_percentage: number
        }
        Insert: {
          category?: string
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          evaluation_method?: string
          factor_code: string
          factor_name: string
          factor_name_en?: string | null
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          max_score?: number | null
          min_score?: number | null
          updated_at?: string
          weight_percentage?: number
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          evaluation_method?: string
          factor_code?: string
          factor_name?: string
          factor_name_en?: string | null
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          max_score?: number | null
          min_score?: number | null
          updated_at?: string
          weight_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_factors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_forms: {
        Row: {
          created_at: string | null
          evaluation_factors: Json
          form_name: string
          id: string
          indicators: string[] | null
          max_score: number | null
          program_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          evaluation_factors: Json
          form_name: string
          id?: string
          indicators?: string[] | null
          max_score?: number | null
          program_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          evaluation_factors?: Json
          form_name?: string
          id?: string
          indicators?: string[] | null
          max_score?: number | null
          program_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_forms_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "evaluation_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_programs: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          end_date: string
          evaluation_type: Database["public"]["Enums"]["evaluation_type"]
          id: string
          is_active: boolean | null
          notification_settings: Json | null
          program_name: string
          rater_types: Database["public"]["Enums"]["rater_type"][] | null
          start_date: string
          target_departments: string[] | null
          target_positions: string[] | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          end_date: string
          evaluation_type: Database["public"]["Enums"]["evaluation_type"]
          id?: string
          is_active?: boolean | null
          notification_settings?: Json | null
          program_name: string
          rater_types?: Database["public"]["Enums"]["rater_type"][] | null
          start_date: string
          target_departments?: string[] | null
          target_positions?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          end_date?: string
          evaluation_type?: Database["public"]["Enums"]["evaluation_type"]
          id?: string
          is_active?: boolean | null
          notification_settings?: Json | null
          program_name?: string
          rater_types?: Database["public"]["Enums"]["rater_type"][] | null
          start_date?: string
          target_departments?: string[] | null
          target_positions?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      evaluation_template_factors: {
        Row: {
          created_at: string
          display_order: number | null
          factor_id: string | null
          id: string
          is_required: boolean
          template_id: string | null
          weight_percentage: number
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          factor_id?: string | null
          id?: string
          is_required?: boolean
          template_id?: string | null
          weight_percentage?: number
        }
        Update: {
          created_at?: string
          display_order?: number | null
          factor_id?: string | null
          id?: string
          is_required?: boolean
          template_id?: string | null
          weight_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_template_factors_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "evaluation_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_template_factors_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_templates: {
        Row: {
          company_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          is_default: boolean
          passing_score: number
          template_name: string
          template_type: string
          total_weight: number
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          passing_score?: number
          template_name: string
          template_type?: string
          total_weight?: number
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          passing_score?: number
          template_name?: string
          template_type?: string
          total_weight?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluations: {
        Row: {
          achievements: Json | null
          company_id: string
          competencies: Json | null
          created_at: string | null
          created_by: string | null
          employee_comments: string | null
          employee_id: string
          evaluation_duration: string | null
          evaluation_period_end: string
          evaluation_period_start: string
          evaluation_purpose: string | null
          final_score: number | null
          form_id: string | null
          goals: Json | null
          hr_comments: string | null
          hr_evaluation_score: number | null
          id: string
          indicator_scores: Json | null
          manager_comments: string | null
          manager_evaluation_score: number | null
          manager_recommendation: string | null
          overall_score: number | null
          program_id: string | null
          self_evaluation_score: number | null
          status: Database["public"]["Enums"]["evaluation_status"] | null
          updated_at: string | null
        }
        Insert: {
          achievements?: Json | null
          company_id: string
          competencies?: Json | null
          created_at?: string | null
          created_by?: string | null
          employee_comments?: string | null
          employee_id: string
          evaluation_duration?: string | null
          evaluation_period_end: string
          evaluation_period_start: string
          evaluation_purpose?: string | null
          final_score?: number | null
          form_id?: string | null
          goals?: Json | null
          hr_comments?: string | null
          hr_evaluation_score?: number | null
          id?: string
          indicator_scores?: Json | null
          manager_comments?: string | null
          manager_evaluation_score?: number | null
          manager_recommendation?: string | null
          overall_score?: number | null
          program_id?: string | null
          self_evaluation_score?: number | null
          status?: Database["public"]["Enums"]["evaluation_status"] | null
          updated_at?: string | null
        }
        Update: {
          achievements?: Json | null
          company_id?: string
          competencies?: Json | null
          created_at?: string | null
          created_by?: string | null
          employee_comments?: string | null
          employee_id?: string
          evaluation_duration?: string | null
          evaluation_period_end?: string
          evaluation_period_start?: string
          evaluation_purpose?: string | null
          final_score?: number | null
          form_id?: string | null
          goals?: Json | null
          hr_comments?: string | null
          hr_evaluation_score?: number | null
          id?: string
          indicator_scores?: Json | null
          manager_comments?: string | null
          manager_evaluation_score?: number | null
          manager_recommendation?: string | null
          overall_score?: number | null
          program_id?: string | null
          self_evaluation_score?: number | null
          status?: Database["public"]["Enums"]["evaluation_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "evaluation_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "evaluation_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_claim_items: {
        Row: {
          account_id: string | null
          amount: number
          category: string
          claim_id: string
          created_at: string
          description: string
          expense_date: string
          id: string
          receipt_attachment: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          category: string
          claim_id: string
          created_at?: string
          description: string
          expense_date: string
          id?: string
          receipt_attachment?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string
          claim_id?: string
          created_at?: string
          description?: string
          expense_date?: string
          id?: string
          receipt_attachment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_claim_items_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_claim_items_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "expense_claims"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_claims: {
        Row: {
          approved_by: string | null
          attachments: Json | null
          claim_date: string
          claim_number: string
          created_at: string
          employee_id: string
          id: string
          purpose: string
          reimbursed_at: string | null
          reimbursed_by: string | null
          status: string
          submitted_by: string
          total_amount: number
          updated_at: string
          user_id: string
          workflow_id: string | null
        }
        Insert: {
          approved_by?: string | null
          attachments?: Json | null
          claim_date?: string
          claim_number: string
          created_at?: string
          employee_id: string
          id?: string
          purpose: string
          reimbursed_at?: string | null
          reimbursed_by?: string | null
          status?: string
          submitted_by: string
          total_amount: number
          updated_at?: string
          user_id: string
          workflow_id?: string | null
        }
        Update: {
          approved_by?: string | null
          attachments?: Json | null
          claim_date?: string
          claim_number?: string
          created_at?: string
          employee_id?: string
          id?: string
          purpose?: string
          reimbursed_at?: string | null
          reimbursed_by?: string | null
          status?: string
          submitted_by?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_claims_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          account_code: string
          account_name: string
          account_type: string
          balance: number | null
          created_at: string
          currency: string | null
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_code: string
          account_name: string
          account_type?: string
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_code?: string
          account_name?: string
          account_type?: string
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_forecasts: {
        Row: {
          accuracy: number | null
          actual_value: number | null
          confidence_level: number
          created_at: string
          forecast_type: string
          id: string
          model_used: string | null
          parameters: Json | null
          period_end: string
          period_start: string
          predicted_value: number
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          actual_value?: number | null
          confidence_level: number
          created_at?: string
          forecast_type: string
          id?: string
          model_used?: string | null
          parameters?: Json | null
          period_end: string
          period_start: string
          predicted_value: number
          user_id: string
        }
        Update: {
          accuracy?: number | null
          actual_value?: number | null
          confidence_level?: number
          created_at?: string
          forecast_type?: string
          id?: string
          model_used?: string | null
          parameters?: Json | null
          period_end?: string
          period_start?: string
          predicted_value?: number
          user_id?: string
        }
        Relationships: []
      }
      financial_reports: {
        Row: {
          created_at: string | null
          id: string
          period_end: string
          period_start: string
          report_data: Json
          report_name: string
          report_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          period_end: string
          period_start: string
          report_data?: Json
          report_name: string
          report_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          period_end?: string
          period_start?: string
          report_data?: Json
          report_name?: string
          report_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gosi_integration: {
        Row: {
          api_response: Json | null
          api_sync_date: string | null
          company_id: string | null
          created_at: string | null
          employee_id: string
          employee_percentage: number | null
          employer_percentage: number | null
          gosi_number: string
          id: string
          last_contribution_date: string | null
          monthly_employee_contribution: number
          monthly_employer_contribution: number
          penalties: Json | null
          salary_subject_to_gosi: number
          service_periods: Json | null
          status: Database["public"]["Enums"]["insurance_status"] | null
          subscription_date: string
          total_months_contributed: number | null
          updated_at: string | null
          violations: Json | null
        }
        Insert: {
          api_response?: Json | null
          api_sync_date?: string | null
          company_id?: string | null
          created_at?: string | null
          employee_id: string
          employee_percentage?: number | null
          employer_percentage?: number | null
          gosi_number: string
          id?: string
          last_contribution_date?: string | null
          monthly_employee_contribution: number
          monthly_employer_contribution: number
          penalties?: Json | null
          salary_subject_to_gosi: number
          service_periods?: Json | null
          status?: Database["public"]["Enums"]["insurance_status"] | null
          subscription_date: string
          total_months_contributed?: number | null
          updated_at?: string | null
          violations?: Json | null
        }
        Update: {
          api_response?: Json | null
          api_sync_date?: string | null
          company_id?: string | null
          created_at?: string | null
          employee_id?: string
          employee_percentage?: number | null
          employer_percentage?: number | null
          gosi_number?: string
          id?: string
          last_contribution_date?: string | null
          monthly_employee_contribution?: number
          monthly_employer_contribution?: number
          penalties?: Json | null
          salary_subject_to_gosi?: number
          service_periods?: Json | null
          status?: Database["public"]["Enums"]["insurance_status"] | null
          subscription_date?: string
          total_months_contributed?: number | null
          updated_at?: string | null
          violations?: Json | null
        }
        Relationships: []
      }
      governance_meetings: {
        Row: {
          agenda: string | null
          attendees_count: number | null
          created_at: string
          created_by: string
          description: string | null
          duration_minutes: number | null
          id: string
          location: string | null
          meeting_date: string
          meeting_type: string | null
          meeting_url: string | null
          minutes: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agenda?: string | null
          attendees_count?: number | null
          created_at?: string
          created_by: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          meeting_date: string
          meeting_type?: string | null
          meeting_url?: string | null
          minutes?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          agenda?: string | null
          attendees_count?: number | null
          created_at?: string
          created_by?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          meeting_date?: string
          meeting_type?: string | null
          meeting_url?: string | null
          minutes?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hr_employees: {
        Row: {
          bank_name: string | null
          basic_salary: number | null
          company_id: string
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string
          email: string | null
          email_encrypted: string | null
          employee_id: string
          full_name: string
          grade: string | null
          hire_date: string | null
          housing_allowance: number | null
          iban: string | null
          iban_encrypted: string | null
          id: string
          is_active: boolean | null
          job_title: string | null
          leave_balances: Json | null
          manager_id: string | null
          national_id: string | null
          national_id_encrypted: string | null
          nationality: string | null
          org_unit_id: string | null
          other_allowances: number | null
          passport_number: string | null
          passport_number_encrypted: string | null
          phone: string | null
          phone_encrypted: string | null
          position: string | null
          profile_data: Json | null
          status: Database["public"]["Enums"]["employee_status"] | null
          transport_allowance: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          bank_name?: string | null
          basic_salary?: number | null
          company_id: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          email?: string | null
          email_encrypted?: string | null
          employee_id: string
          full_name: string
          grade?: string | null
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          iban_encrypted?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          leave_balances?: Json | null
          manager_id?: string | null
          national_id?: string | null
          national_id_encrypted?: string | null
          nationality?: string | null
          org_unit_id?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          passport_number_encrypted?: string | null
          phone?: string | null
          phone_encrypted?: string | null
          position?: string | null
          profile_data?: Json | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          transport_allowance?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          bank_name?: string | null
          basic_salary?: number | null
          company_id?: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          email?: string | null
          email_encrypted?: string | null
          employee_id?: string
          full_name?: string
          grade?: string | null
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          iban_encrypted?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          leave_balances?: Json | null
          manager_id?: string | null
          national_id?: string | null
          national_id_encrypted?: string | null
          nationality?: string | null
          org_unit_id?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          passport_number_encrypted?: string | null
          phone?: string | null
          phone_encrypted?: string | null
          position?: string | null
          profile_data?: Json | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          transport_allowance?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "hr_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_employees_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_evaluation_approvals: {
        Row: {
          approval_notes: string | null
          approval_status: Database["public"]["Enums"]["decision_status"]
          approved_at: string | null
          created_at: string | null
          decision_id: string | null
          hr_officer_id: string
          id: string
          rejection_reason: string | null
        }
        Insert: {
          approval_notes?: string | null
          approval_status: Database["public"]["Enums"]["decision_status"]
          approved_at?: string | null
          created_at?: string | null
          decision_id?: string | null
          hr_officer_id: string
          id?: string
          rejection_reason?: string | null
        }
        Update: {
          approval_notes?: string | null
          approval_status?: Database["public"]["Enums"]["decision_status"]
          approved_at?: string | null
          created_at?: string | null
          decision_id?: string | null
          hr_officer_id?: string
          id?: string
          rejection_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_evaluation_approvals_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "automated_decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_requests: {
        Row: {
          company_id: string
          completed_at: string | null
          created_at: string
          current_step: number | null
          description: string | null
          employee_id: string
          id: string
          payload: Json
          priority: string | null
          request_number: string
          request_type: string
          status: Database["public"]["Enums"]["request_status"] | null
          submitted_at: string | null
          submitted_by: string | null
          title: string
          updated_at: string
          workflow_template_id: string | null
        }
        Insert: {
          company_id: string
          completed_at?: string | null
          created_at?: string
          current_step?: number | null
          description?: string | null
          employee_id: string
          id?: string
          payload?: Json
          priority?: string | null
          request_number: string
          request_type: string
          status?: Database["public"]["Enums"]["request_status"] | null
          submitted_at?: string | null
          submitted_by?: string | null
          title: string
          updated_at?: string
          workflow_template_id?: string | null
        }
        Update: {
          company_id?: string
          completed_at?: string | null
          created_at?: string
          current_step?: number | null
          description?: string | null
          employee_id?: string
          id?: string
          payload?: Json
          priority?: string | null
          request_number?: string
          request_type?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          submitted_at?: string | null
          submitted_by?: string | null
          title?: string
          updated_at?: string
          workflow_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "hr_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_requests_workflow_template_id_fkey"
            columns: ["workflow_template_id"]
            isOneToOne: false
            referencedRelation: "workflow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_user_roles: {
        Row: {
          company_id: string
          employee_id: string | null
          expires_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["hr_role"]
          user_id: string | null
        }
        Insert: {
          company_id: string
          employee_id?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          role: Database["public"]["Enums"]["hr_role"]
          user_id?: string | null
        }
        Update: {
          company_id?: string
          employee_id?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["hr_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_user_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_user_roles_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "hr_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      incentive_programs: {
        Row: {
          auto_process: boolean | null
          budget_limit: number | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          eligibility_criteria: Json | null
          end_date: string | null
          fixed_amount: number | null
          frequency: Database["public"]["Enums"]["incentive_frequency"] | null
          id: string
          is_active: boolean | null
          max_amount_per_employee: number | null
          program_code: string
          program_name: string
          program_type: Database["public"]["Enums"]["reward_type"]
          requires_executive_approval: boolean | null
          requires_hr_approval: boolean | null
          requires_manager_approval: boolean | null
          reward_percentage: number | null
          start_date: string
          target_metric: string | null
          target_value: number | null
          updated_at: string | null
          used_budget: number | null
        }
        Insert: {
          auto_process?: boolean | null
          budget_limit?: number | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          eligibility_criteria?: Json | null
          end_date?: string | null
          fixed_amount?: number | null
          frequency?: Database["public"]["Enums"]["incentive_frequency"] | null
          id?: string
          is_active?: boolean | null
          max_amount_per_employee?: number | null
          program_code: string
          program_name: string
          program_type: Database["public"]["Enums"]["reward_type"]
          requires_executive_approval?: boolean | null
          requires_hr_approval?: boolean | null
          requires_manager_approval?: boolean | null
          reward_percentage?: number | null
          start_date: string
          target_metric?: string | null
          target_value?: number | null
          updated_at?: string | null
          used_budget?: number | null
        }
        Update: {
          auto_process?: boolean | null
          budget_limit?: number | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          eligibility_criteria?: Json | null
          end_date?: string | null
          fixed_amount?: number | null
          frequency?: Database["public"]["Enums"]["incentive_frequency"] | null
          id?: string
          is_active?: boolean | null
          max_amount_per_employee?: number | null
          program_code?: string
          program_name?: string
          program_type?: Database["public"]["Enums"]["reward_type"]
          requires_executive_approval?: boolean | null
          requires_hr_approval?: boolean | null
          requires_manager_approval?: boolean | null
          reward_percentage?: number | null
          start_date?: string
          target_metric?: string | null
          target_value?: number | null
          updated_at?: string | null
          used_budget?: number | null
        }
        Relationships: []
      }
      indicator_values: {
        Row: {
          actual_value: number | null
          calculated_score: number | null
          created_at: string | null
          evaluation_id: string | null
          id: string
          indicator_id: string | null
          is_auto_calculated: boolean | null
          notes: string | null
          target_value: number | null
          weight_percentage: number | null
        }
        Insert: {
          actual_value?: number | null
          calculated_score?: number | null
          created_at?: string | null
          evaluation_id?: string | null
          id?: string
          indicator_id?: string | null
          is_auto_calculated?: boolean | null
          notes?: string | null
          target_value?: number | null
          weight_percentage?: number | null
        }
        Update: {
          actual_value?: number | null
          calculated_score?: number | null
          created_at?: string | null
          evaluation_id?: string | null
          id?: string
          indicator_id?: string | null
          is_auto_calculated?: boolean | null
          notes?: string | null
          target_value?: number | null
          weight_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "indicator_values_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "indicator_values_indicator_id_fkey"
            columns: ["indicator_id"]
            isOneToOne: false
            referencedRelation: "performance_indicators"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_claims: {
        Row: {
          approval_date: string | null
          approved_amount: number | null
          claim_date: string | null
          claim_number: string
          claim_type: string
          claimed_amount: number
          created_at: string | null
          diagnosis: string | null
          id: string
          incident_date: string
          notes: string | null
          paid_amount: number | null
          payment_date: string | null
          prescription_details: Json | null
          processed_by: string | null
          provider_name: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          subscription_id: string | null
          supporting_documents: Json | null
          treatment_type: string | null
          updated_at: string | null
        }
        Insert: {
          approval_date?: string | null
          approved_amount?: number | null
          claim_date?: string | null
          claim_number: string
          claim_type: string
          claimed_amount: number
          created_at?: string | null
          diagnosis?: string | null
          id?: string
          incident_date: string
          notes?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          prescription_details?: Json | null
          processed_by?: string | null
          provider_name?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          subscription_id?: string | null
          supporting_documents?: Json | null
          treatment_type?: string | null
          updated_at?: string | null
        }
        Update: {
          approval_date?: string | null
          approved_amount?: number | null
          claim_date?: string | null
          claim_number?: string
          claim_type?: string
          claimed_amount?: number
          created_at?: string | null
          diagnosis?: string | null
          id?: string
          incident_date?: string
          notes?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          prescription_details?: Json | null
          processed_by?: string | null
          provider_name?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          subscription_id?: string | null
          supporting_documents?: Json | null
          treatment_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "employee_insurance_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_notifications: {
        Row: {
          company_id: string | null
          created_at: string | null
          email_sent: boolean | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          priority_level: number | null
          push_sent: boolean | null
          read_at: string | null
          recipient_id: string
          related_id: string | null
          related_table: string | null
          scheduled_for: string | null
          sent_at: string | null
          sms_sent: boolean | null
          title: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          priority_level?: number | null
          push_sent?: boolean | null
          read_at?: string | null
          recipient_id: string
          related_id?: string | null
          related_table?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          sms_sent?: boolean | null
          title: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          priority_level?: number | null
          push_sent?: boolean | null
          read_at?: string | null
          recipient_id?: string
          related_id?: string | null
          related_table?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          sms_sent?: boolean | null
          title?: string
        }
        Relationships: []
      }
      insurance_payments: {
        Row: {
          additional_fees: number | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          discount_amount: number | null
          due_date: string
          employee_contributions: number | null
          employer_contributions: number | null
          gosi_contributions: number | null
          id: string
          net_amount: number
          payment_date: string | null
          payment_details: Json | null
          payment_method: string | null
          payment_period: string
          penalty_amount: number | null
          policy_id: string | null
          receipt_number: string | null
          status: string | null
          total_amount: number
          transaction_reference: string | null
          updated_at: string | null
        }
        Insert: {
          additional_fees?: number | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          due_date: string
          employee_contributions?: number | null
          employer_contributions?: number | null
          gosi_contributions?: number | null
          id?: string
          net_amount: number
          payment_date?: string | null
          payment_details?: Json | null
          payment_method?: string | null
          payment_period: string
          penalty_amount?: number | null
          policy_id?: string | null
          receipt_number?: string | null
          status?: string | null
          total_amount: number
          transaction_reference?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_fees?: number | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          due_date?: string
          employee_contributions?: number | null
          employer_contributions?: number | null
          gosi_contributions?: number | null
          id?: string
          net_amount?: number
          payment_date?: string | null
          payment_details?: Json | null
          payment_method?: string | null
          payment_period?: string
          penalty_amount?: number | null
          policy_id?: string | null
          receipt_number?: string | null
          status?: string | null
          total_amount?: number
          transaction_reference?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_payments_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "insurance_policies"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_policies: {
        Row: {
          auto_renewal: boolean | null
          company_id: string | null
          coverage_level: Database["public"]["Enums"]["coverage_level"] | null
          coverage_limit: number | null
          covered_services: Json | null
          created_at: string | null
          created_by: string | null
          deductible_amount: number | null
          documents: Json | null
          end_date: string
          exclusions: Json | null
          id: string
          insurance_type: Database["public"]["Enums"]["insurance_type"]
          policy_name: string
          policy_number: string
          premium_amount: number
          premium_frequency:
            | Database["public"]["Enums"]["premium_frequency"]
            | null
          provider_id: string | null
          renewal_date: string | null
          start_date: string
          status: Database["public"]["Enums"]["insurance_status"] | null
          terms_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          auto_renewal?: boolean | null
          company_id?: string | null
          coverage_level?: Database["public"]["Enums"]["coverage_level"] | null
          coverage_limit?: number | null
          covered_services?: Json | null
          created_at?: string | null
          created_by?: string | null
          deductible_amount?: number | null
          documents?: Json | null
          end_date: string
          exclusions?: Json | null
          id?: string
          insurance_type: Database["public"]["Enums"]["insurance_type"]
          policy_name: string
          policy_number: string
          premium_amount?: number
          premium_frequency?:
            | Database["public"]["Enums"]["premium_frequency"]
            | null
          provider_id?: string | null
          renewal_date?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["insurance_status"] | null
          terms_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_renewal?: boolean | null
          company_id?: string | null
          coverage_level?: Database["public"]["Enums"]["coverage_level"] | null
          coverage_limit?: number | null
          covered_services?: Json | null
          created_at?: string | null
          created_by?: string | null
          deductible_amount?: number | null
          documents?: Json | null
          end_date?: string
          exclusions?: Json | null
          id?: string
          insurance_type?: Database["public"]["Enums"]["insurance_type"]
          policy_name?: string
          policy_number?: string
          premium_amount?: number
          premium_frequency?:
            | Database["public"]["Enums"]["premium_frequency"]
            | null
          provider_id?: string | null
          renewal_date?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["insurance_status"] | null
          terms_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_policies_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "insurance_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_providers: {
        Row: {
          api_endpoint: string | null
          api_key_encrypted: string | null
          company_id: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          license_number: string | null
          provider_code: string
          provider_name: string
          provider_type: Database["public"]["Enums"]["insurance_type"]
          service_areas: string[] | null
          supported_services: Json | null
          updated_at: string | null
        }
        Insert: {
          api_endpoint?: string | null
          api_key_encrypted?: string | null
          company_id?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          provider_code: string
          provider_name: string
          provider_type: Database["public"]["Enums"]["insurance_type"]
          service_areas?: string[] | null
          supported_services?: Json | null
          updated_at?: string | null
        }
        Update: {
          api_endpoint?: string | null
          api_key_encrypted?: string | null
          company_id?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          provider_code?: string
          provider_name?: string
          provider_type?: Database["public"]["Enums"]["insurance_type"]
          service_areas?: string[] | null
          supported_services?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      insurance_reports: {
        Row: {
          company_id: string | null
          created_at: string | null
          file_path: string | null
          generated_at: string | null
          generated_by: string | null
          id: string
          parameters: Json | null
          report_data: Json
          report_name: string
          report_period_end: string | null
          report_period_start: string | null
          report_type: string
          status: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          file_path?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          parameters?: Json | null
          report_data?: Json
          report_name: string
          report_period_end?: string | null
          report_period_start?: string | null
          report_type: string
          status?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          file_path?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          parameters?: Json | null
          report_data?: Json
          report_name?: string
          report_period_end?: string | null
          report_period_start?: string | null
          report_type?: string
          status?: string | null
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          created_at: string
          discount_percentage: number | null
          id: string
          invoice_id: string
          item_description: string
          line_total: number
          quantity: number
          tax_rate: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          discount_percentage?: number | null
          id?: string
          invoice_id: string
          item_description: string
          line_total: number
          quantity: number
          tax_rate?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string
          discount_percentage?: number | null
          id?: string
          invoice_id?: string
          item_description?: string
          line_total?: number
          quantity?: number
          tax_rate?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_email: string | null
          client_name: string
          client_phone: string | null
          created_at: string
          currency: string | null
          description: string | null
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string
          paid_at: string | null
          payment_date: string | null
          payment_method: string | null
          pdf_url: string | null
          status: string | null
          stripe_invoice_id: string | null
          subscription_id: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string
          user_id: string
          zatca_uuid: string | null
        }
        Insert: {
          amount: number
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string
          paid_at?: string | null
          payment_date?: string | null
          payment_method?: string | null
          pdf_url?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
          user_id: string
          zatca_uuid?: string | null
        }
        Update: {
          amount?: number
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          paid_at?: string | null
          payment_date?: string | null
          payment_method?: string | null
          pdf_url?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
          user_id?: string
          zatca_uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "boud_user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          applied_at: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          job_opening_id: string | null
          notes: string | null
          resume_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_opening_id?: string | null
          notes?: string | null
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_opening_id?: string | null
          notes?: string | null
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_opening_id_fkey"
            columns: ["job_opening_id"]
            isOneToOne: false
            referencedRelation: "job_openings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_openings: {
        Row: {
          applications_count: number | null
          benefits: Json | null
          created_at: string | null
          created_by: string | null
          department_id: string | null
          description: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          job_type: string
          location: string
          posted_at: string | null
          requirements: Json | null
          salary_note: string | null
          salary_range_max: number | null
          salary_range_min: number | null
          title: string
          title_en: string | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          applications_count?: number | null
          benefits?: Json | null
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          description: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          job_type: string
          location: string
          posted_at?: string | null
          requirements?: Json | null
          salary_note?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          title: string
          title_en?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          applications_count?: number | null
          benefits?: Json | null
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          description?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string
          location?: string
          posted_at?: string | null
          requirements?: Json | null
          salary_note?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          title?: string
          title_en?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_openings_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "career_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attachments: Json | null
          created_at: string
          created_by: string
          description: string
          entry_date: string
          entry_number: string
          id: string
          reference: string | null
          status: string
          total_credit: number
          total_debit: number
          updated_at: string
          user_id: string
          workflow_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attachments?: Json | null
          created_at?: string
          created_by: string
          description: string
          entry_date?: string
          entry_number: string
          id?: string
          reference?: string | null
          status?: string
          total_credit?: number
          total_debit?: number
          updated_at?: string
          user_id: string
          workflow_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attachments?: Json | null
          created_at?: string
          created_by?: string
          description?: string
          entry_date?: string
          entry_number?: string
          id?: string
          reference?: string | null
          status?: string
          total_credit?: number
          total_debit?: number
          updated_at?: string
          user_id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entry_lines: {
        Row: {
          account_id: string
          created_at: string
          credit_amount: number | null
          debit_amount: number | null
          description: string | null
          id: string
          journal_entry_id: string
          line_number: number
        }
        Insert: {
          account_id: string
          created_at?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          journal_entry_id: string
          line_number: number
        }
        Update: {
          account_id?: string
          created_at?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string
          line_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "journal_entry_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entry_lines_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_ai_insights: {
        Row: {
          created_at: string | null
          data: Json | null
          department_id: string | null
          description: string
          employee_id: string | null
          id: string
          insight_type: string
          is_dismissed: boolean | null
          is_read: boolean | null
          recommendations: Json | null
          severity: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          department_id?: string | null
          description: string
          employee_id?: string | null
          id?: string
          insight_type: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          recommendations?: Json | null
          severity?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          department_id?: string | null
          description?: string
          employee_id?: string | null
          id?: string
          insight_type?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          recommendations?: Json | null
          severity?: string | null
          title?: string
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          emergency_contact: string | null
          employee_id: string
          end_date: string
          id: string
          leave_type_id: string
          reason: string | null
          rejection_reason: string | null
          replacement_employee_id: string | null
          start_date: string
          status: string | null
          total_days: number
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          emergency_contact?: string | null
          employee_id: string
          end_date: string
          id?: string
          leave_type_id: string
          reason?: string | null
          rejection_reason?: string | null
          replacement_employee_id?: string | null
          start_date: string
          status?: string | null
          total_days: number
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          emergency_contact?: string | null
          employee_id?: string
          end_date?: string
          id?: string
          leave_type_id?: string
          reason?: string | null
          rejection_reason?: string | null
          replacement_employee_id?: string | null
          start_date?: string
          status?: string | null
          total_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_types: {
        Row: {
          carry_forward_allowed: boolean | null
          company_id: string | null
          created_at: string | null
          gender_restriction: string | null
          id: string
          is_active: boolean | null
          is_paid: boolean | null
          max_days_per_year: number | null
          name_ar: string
          name_en: string | null
          requires_approval: boolean | null
          updated_at: string | null
        }
        Insert: {
          carry_forward_allowed?: boolean | null
          company_id?: string | null
          created_at?: string | null
          gender_restriction?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          max_days_per_year?: number | null
          name_ar: string
          name_en?: string | null
          requires_approval?: boolean | null
          updated_at?: string | null
        }
        Update: {
          carry_forward_allowed?: boolean | null
          company_id?: string | null
          created_at?: string | null
          gender_restriction?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          max_days_per_year?: number | null
          name_ar?: string
          name_en?: string | null
          requires_approval?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_cases: {
        Row: {
          assigned_lawyer_id: string | null
          attachments: Json | null
          case_number: string
          case_type: Database["public"]["Enums"]["legal_case_type"]
          case_value: number | null
          company_id: string | null
          court_name: string | null
          created_at: string
          created_by: string | null
          defendant_name: string | null
          description: string | null
          employee_id: string | null
          filing_date: string
          hearing_date: string | null
          id: string
          judge_name: string | null
          lawyer_name: string | null
          notes: string | null
          plaintiff_name: string | null
          priority_level: number | null
          resolution_date: string | null
          status: Database["public"]["Enums"]["legal_case_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_lawyer_id?: string | null
          attachments?: Json | null
          case_number: string
          case_type: Database["public"]["Enums"]["legal_case_type"]
          case_value?: number | null
          company_id?: string | null
          court_name?: string | null
          created_at?: string
          created_by?: string | null
          defendant_name?: string | null
          description?: string | null
          employee_id?: string | null
          filing_date: string
          hearing_date?: string | null
          id?: string
          judge_name?: string | null
          lawyer_name?: string | null
          notes?: string | null
          plaintiff_name?: string | null
          priority_level?: number | null
          resolution_date?: string | null
          status?: Database["public"]["Enums"]["legal_case_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_lawyer_id?: string | null
          attachments?: Json | null
          case_number?: string
          case_type?: Database["public"]["Enums"]["legal_case_type"]
          case_value?: number | null
          company_id?: string | null
          court_name?: string | null
          created_at?: string
          created_by?: string | null
          defendant_name?: string | null
          description?: string | null
          employee_id?: string | null
          filing_date?: string
          hearing_date?: string | null
          id?: string
          judge_name?: string | null
          lawyer_name?: string | null
          notes?: string | null
          plaintiff_name?: string | null
          priority_level?: number | null
          resolution_date?: string | null
          status?: Database["public"]["Enums"]["legal_case_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_contracts: {
        Row: {
          attachments: Json | null
          auto_renewal: boolean | null
          company_id: string | null
          contract_file_url: string | null
          contract_number: string
          contract_type: Database["public"]["Enums"]["contract_type"]
          contract_value: number | null
          created_at: string
          created_by: string | null
          currency: string | null
          description: string | null
          digital_signature: boolean | null
          e_signature_id: string | null
          employee_id: string | null
          end_date: string | null
          id: string
          notes: string | null
          party_contact: string | null
          party_name: string
          renewal_date: string | null
          renewal_period: number | null
          signed_by: string | null
          signed_date: string | null
          special_clauses: string | null
          start_date: string
          status: Database["public"]["Enums"]["contract_status"]
          terms_conditions: string | null
          title: string
          updated_at: string
          witness_name: string | null
        }
        Insert: {
          attachments?: Json | null
          auto_renewal?: boolean | null
          company_id?: string | null
          contract_file_url?: string | null
          contract_number: string
          contract_type: Database["public"]["Enums"]["contract_type"]
          contract_value?: number | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          description?: string | null
          digital_signature?: boolean | null
          e_signature_id?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          party_contact?: string | null
          party_name: string
          renewal_date?: string | null
          renewal_period?: number | null
          signed_by?: string | null
          signed_date?: string | null
          special_clauses?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["contract_status"]
          terms_conditions?: string | null
          title: string
          updated_at?: string
          witness_name?: string | null
        }
        Update: {
          attachments?: Json | null
          auto_renewal?: boolean | null
          company_id?: string | null
          contract_file_url?: string | null
          contract_number?: string
          contract_type?: Database["public"]["Enums"]["contract_type"]
          contract_value?: number | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          description?: string | null
          digital_signature?: boolean | null
          e_signature_id?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          party_contact?: string | null
          party_name?: string
          renewal_date?: string | null
          renewal_period?: number | null
          signed_by?: string | null
          signed_date?: string | null
          special_clauses?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"]
          terms_conditions?: string | null
          title?: string
          updated_at?: string
          witness_name?: string | null
        }
        Relationships: []
      }
      legal_correspondence: {
        Row: {
          attachments: Json | null
          company_id: string | null
          content: string
          correspondence_type: Database["public"]["Enums"]["correspondence_type"]
          created_at: string
          created_by: string | null
          delivered_at: string | null
          delivery_method: string | null
          delivery_status: string | null
          due_date: string | null
          id: string
          language_code: string | null
          official_stamp: boolean | null
          priority_level: number | null
          recipient_email: string | null
          recipient_name: string | null
          recipient_organization: string | null
          recipient_phone: string | null
          recipient_title: string | null
          reference_number: string
          related_case_id: string | null
          related_contract_id: string | null
          response_date: string | null
          response_deadline: string | null
          response_received: boolean | null
          response_required: boolean | null
          sender_email: string | null
          sender_name: string | null
          sender_organization: string | null
          sender_phone: string | null
          sender_title: string | null
          status: string
          subject: string
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          company_id?: string | null
          content: string
          correspondence_type: Database["public"]["Enums"]["correspondence_type"]
          created_at?: string
          created_by?: string | null
          delivered_at?: string | null
          delivery_method?: string | null
          delivery_status?: string | null
          due_date?: string | null
          id?: string
          language_code?: string | null
          official_stamp?: boolean | null
          priority_level?: number | null
          recipient_email?: string | null
          recipient_name?: string | null
          recipient_organization?: string | null
          recipient_phone?: string | null
          recipient_title?: string | null
          reference_number: string
          related_case_id?: string | null
          related_contract_id?: string | null
          response_date?: string | null
          response_deadline?: string | null
          response_received?: boolean | null
          response_required?: boolean | null
          sender_email?: string | null
          sender_name?: string | null
          sender_organization?: string | null
          sender_phone?: string | null
          sender_title?: string | null
          status?: string
          subject: string
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          company_id?: string | null
          content?: string
          correspondence_type?: Database["public"]["Enums"]["correspondence_type"]
          created_at?: string
          created_by?: string | null
          delivered_at?: string | null
          delivery_method?: string | null
          delivery_status?: string | null
          due_date?: string | null
          id?: string
          language_code?: string | null
          official_stamp?: boolean | null
          priority_level?: number | null
          recipient_email?: string | null
          recipient_name?: string | null
          recipient_organization?: string | null
          recipient_phone?: string | null
          recipient_title?: string | null
          reference_number?: string
          related_case_id?: string | null
          related_contract_id?: string | null
          response_date?: string | null
          response_deadline?: string | null
          response_received?: boolean | null
          response_required?: boolean | null
          sender_email?: string | null
          sender_name?: string | null
          sender_organization?: string | null
          sender_phone?: string | null
          sender_title?: string | null
          status?: string
          subject?: string
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      legal_document_templates: {
        Row: {
          approval_required: boolean | null
          company_id: string | null
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          is_official: boolean | null
          language_code: string
          notes: string | null
          template_category: string
          template_content: string
          template_name: string
          template_type: string
          template_variables: Json | null
          updated_at: string
          version_number: number | null
        }
        Insert: {
          approval_required?: boolean | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_official?: boolean | null
          language_code?: string
          notes?: string | null
          template_category: string
          template_content: string
          template_name: string
          template_type: string
          template_variables?: Json | null
          updated_at?: string
          version_number?: number | null
        }
        Update: {
          approval_required?: boolean | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_official?: boolean | null
          language_code?: string
          notes?: string | null
          template_category?: string
          template_content?: string
          template_name?: string
          template_type?: string
          template_variables?: Json | null
          updated_at?: string
          version_number?: number | null
        }
        Relationships: []
      }
      legal_notifications: {
        Row: {
          company_id: string | null
          created_at: string
          email_sent: boolean | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          priority_level: number | null
          push_sent: boolean | null
          read_at: string | null
          recipient_id: string
          related_id: string | null
          related_table: string | null
          scheduled_for: string | null
          sent_at: string | null
          sms_sent: boolean | null
          title: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          priority_level?: number | null
          push_sent?: boolean | null
          read_at?: string | null
          recipient_id: string
          related_id?: string | null
          related_table?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          sms_sent?: boolean | null
          title: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          priority_level?: number | null
          push_sent?: boolean | null
          read_at?: string | null
          recipient_id?: string
          related_id?: string | null
          related_table?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          sms_sent?: boolean | null
          title?: string
        }
        Relationships: []
      }
      legal_violations: {
        Row: {
          attachments: Json | null
          category: string
          company_id: string | null
          created_at: string
          created_by: string | null
          description: string
          disciplinary_action_id: string | null
          employee_id: string | null
          id: string
          legal_consequences: string | null
          legal_reference: string | null
          penalty_amount: number | null
          penalty_description: string | null
          previous_violation_count: number | null
          recommended_action: string | null
          repeat_violation: boolean | null
          resolution_date: string | null
          resolution_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          severity: Database["public"]["Enums"]["violation_severity"]
          status: string
          title: string
          updated_at: string
          violation_date: string
          violation_number: string
        }
        Insert: {
          attachments?: Json | null
          category: string
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          disciplinary_action_id?: string | null
          employee_id?: string | null
          id?: string
          legal_consequences?: string | null
          legal_reference?: string | null
          penalty_amount?: number | null
          penalty_description?: string | null
          previous_violation_count?: number | null
          recommended_action?: string | null
          repeat_violation?: boolean | null
          resolution_date?: string | null
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity: Database["public"]["Enums"]["violation_severity"]
          status?: string
          title: string
          updated_at?: string
          violation_date: string
          violation_number: string
        }
        Update: {
          attachments?: Json | null
          category?: string
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          disciplinary_action_id?: string | null
          employee_id?: string | null
          id?: string
          legal_consequences?: string | null
          legal_reference?: string | null
          penalty_amount?: number | null
          penalty_description?: string | null
          previous_violation_count?: number | null
          recommended_action?: string | null
          repeat_violation?: boolean | null
          resolution_date?: string | null
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: Database["public"]["Enums"]["violation_severity"]
          status?: string
          title?: string
          updated_at?: string
          violation_date?: string
          violation_number?: string
        }
        Relationships: []
      }
      meeting_chats: {
        Row: {
          id: string
          is_private: boolean | null
          meeting_id: string
          message: string
          message_type: string | null
          private_to: string | null
          sender_id: string
          sent_at: string
        }
        Insert: {
          id?: string
          is_private?: boolean | null
          meeting_id: string
          message: string
          message_type?: string | null
          private_to?: string | null
          sender_id: string
          sent_at?: string
        }
        Update: {
          id?: string
          is_private?: boolean | null
          meeting_id?: string
          message?: string
          message_type?: string | null
          private_to?: string | null
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_chats_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_decisions: {
        Row: {
          completion_date: string | null
          created_at: string
          decision_number: string | null
          decision_type: string | null
          description: string | null
          due_date: string | null
          id: string
          implementation_status: string | null
          meeting_id: string
          notes: string | null
          responsible_person: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          decision_number?: string | null
          decision_type?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          implementation_status?: string | null
          meeting_id: string
          notes?: string | null
          responsible_person?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          decision_number?: string | null
          decision_type?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          implementation_status?: string | null
          meeting_id?: string
          notes?: string | null
          responsible_person?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_decisions_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "governance_meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_documents: {
        Row: {
          access_level: Database["public"]["Enums"]["user_access_level"]
          description: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          is_active: boolean | null
          meeting_id: string
          tags: string[] | null
          title: string
          uploaded_at: string
          uploaded_by: string
          version: number | null
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["user_access_level"]
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_active?: boolean | null
          meeting_id: string
          tags?: string[] | null
          title: string
          uploaded_at?: string
          uploaded_by: string
          version?: number | null
        }
        Update: {
          access_level?: Database["public"]["Enums"]["user_access_level"]
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_active?: boolean | null
          meeting_id?: string
          tags?: string[] | null
          title?: string
          uploaded_at?: string
          uploaded_by?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_documents_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_participants: {
        Row: {
          attendance_duration: number | null
          created_at: string
          id: string
          invitation_status: string | null
          joined_at: string | null
          left_at: string | null
          meeting_id: string
          participant_role: Database["public"]["Enums"]["participant_role"]
          user_id: string
        }
        Insert: {
          attendance_duration?: number | null
          created_at?: string
          id?: string
          invitation_status?: string | null
          joined_at?: string | null
          left_at?: string | null
          meeting_id: string
          participant_role?: Database["public"]["Enums"]["participant_role"]
          user_id: string
        }
        Update: {
          attendance_duration?: number | null
          created_at?: string
          id?: string
          invitation_status?: string | null
          joined_at?: string | null
          left_at?: string | null
          meeting_id?: string
          participant_role?: Database["public"]["Enums"]["participant_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_participants_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_recordings: {
        Row: {
          access_level: Database["public"]["Enums"]["user_access_level"]
          download_count: number | null
          duration: number | null
          file_name: string
          file_path: string
          file_size: number | null
          format: string | null
          id: string
          is_processed: boolean | null
          meeting_id: string
          quality: string | null
          recorded_at: string
          recorded_by: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["user_access_level"]
          download_count?: number | null
          duration?: number | null
          file_name: string
          file_path: string
          file_size?: number | null
          format?: string | null
          id?: string
          is_processed?: boolean | null
          meeting_id: string
          quality?: string | null
          recorded_at?: string
          recorded_by: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["user_access_level"]
          download_count?: number | null
          duration?: number | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          format?: string | null
          id?: string
          is_processed?: boolean | null
          meeting_id?: string
          quality?: string | null
          recorded_at?: string
          recorded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_recordings_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_tasks: {
        Row: {
          assigned_by: string
          assigned_to: string
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          meeting_id: string
          notes: string | null
          priority: string | null
          progress: number | null
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_by: string
          assigned_to: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          meeting_id: string
          notes?: string | null
          priority?: string | null
          progress?: number | null
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_by?: string
          assigned_to?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          meeting_id?: string
          notes?: string | null
          priority?: string | null
          progress?: number | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_tasks_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          access_level: Database["public"]["Enums"]["user_access_level"]
          agenda: Json | null
          created_at: string
          created_by: string
          description: string | null
          end_time: string
          id: string
          is_recorded: boolean | null
          is_recurring: boolean | null
          location: string | null
          max_participants: number | null
          meeting_notes: string | null
          meeting_type: Database["public"]["Enums"]["meeting_type"]
          meeting_url: string | null
          passcode: string | null
          recording_duration: number | null
          recording_url: string | null
          recurring_pattern: Json | null
          start_time: string
          status: Database["public"]["Enums"]["meeting_status"]
          title: string
          updated_at: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["user_access_level"]
          agenda?: Json | null
          created_at?: string
          created_by: string
          description?: string | null
          end_time: string
          id?: string
          is_recorded?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          max_participants?: number | null
          meeting_notes?: string | null
          meeting_type?: Database["public"]["Enums"]["meeting_type"]
          meeting_url?: string | null
          passcode?: string | null
          recording_duration?: number | null
          recording_url?: string | null
          recurring_pattern?: Json | null
          start_time: string
          status?: Database["public"]["Enums"]["meeting_status"]
          title: string
          updated_at?: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["user_access_level"]
          agenda?: Json | null
          created_at?: string
          created_by?: string
          description?: string | null
          end_time?: string
          id?: string
          is_recorded?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          max_participants?: number | null
          meeting_notes?: string | null
          meeting_type?: Database["public"]["Enums"]["meeting_type"]
          meeting_url?: string | null
          passcode?: string | null
          recording_duration?: number | null
          recording_url?: string | null
          recurring_pattern?: Json | null
          start_time?: string
          status?: Database["public"]["Enums"]["meeting_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mosques: {
        Row: {
          admin_user_id: string | null
          city: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          location: string | null
          name: string
          name_en: string | null
          updated_at: string
        }
        Insert: {
          admin_user_id?: string | null
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          location?: string | null
          name: string
          name_en?: string | null
          updated_at?: string
        }
        Update: {
          admin_user_id?: string | null
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          location?: string | null
          name?: string
          name_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      od_happiness_measurements: {
        Row: {
          comments: string | null
          created_at: string | null
          department: string
          employee_count: number | null
          id: string
          measurement_date: string | null
          score: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          department: string
          employee_count?: number | null
          id?: string
          measurement_date?: string | null
          score: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          department?: string
          employee_count?: number | null
          id?: string
          measurement_date?: string | null
          score?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      od_impact_measurements: {
        Row: {
          after_value: number | null
          before_value: number | null
          created_at: string | null
          id: string
          improvement_percentage: number | null
          initiative_id: string | null
          measurement_date: string | null
          measurement_type: string
          updated_at: string | null
        }
        Insert: {
          after_value?: number | null
          before_value?: number | null
          created_at?: string | null
          id?: string
          improvement_percentage?: number | null
          initiative_id?: string | null
          measurement_date?: string | null
          measurement_type: string
          updated_at?: string | null
        }
        Update: {
          after_value?: number | null
          before_value?: number | null
          created_at?: string | null
          id?: string
          improvement_percentage?: number | null
          initiative_id?: string | null
          measurement_date?: string | null
          measurement_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "od_impact_measurements_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "od_initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      od_initiative_approvals: {
        Row: {
          approved_date: string | null
          comments: string | null
          created_at: string | null
          entity: string
          id: string
          initiative_id: string | null
          role_name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          approved_date?: string | null
          comments?: string | null
          created_at?: string | null
          entity: string
          id?: string
          initiative_id?: string | null
          role_name: string
          status: string
          updated_at?: string | null
        }
        Update: {
          approved_date?: string | null
          comments?: string | null
          created_at?: string | null
          entity?: string
          id?: string
          initiative_id?: string | null
          role_name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "od_initiative_approvals_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "od_initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      od_initiative_steps: {
        Row: {
          completed: boolean | null
          created_at: string | null
          description: string | null
          id: string
          initiative_id: string | null
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          initiative_id?: string | null
          order_index: number
          title: string
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          initiative_id?: string | null
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "od_initiative_steps_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "od_initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      od_initiatives: {
        Row: {
          budget: number | null
          created_at: string | null
          department: string
          description: string
          end_date: string
          id: string
          phase: string
          progress: number | null
          regulations: string[] | null
          start_date: string
          status: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          department: string
          description: string
          end_date: string
          id?: string
          phase: string
          progress?: number | null
          regulations?: string[] | null
          start_date: string
          status: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          department?: string
          description?: string
          end_date?: string
          id?: string
          phase?: string
          progress?: number | null
          regulations?: string[] | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      od_leaderboard: {
        Row: {
          badge: string | null
          created_at: string | null
          department: string
          employee_count: number | null
          id: string
          improvement_percentage: number | null
          period_month: number
          period_year: number
          score: number
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          department: string
          employee_count?: number | null
          id?: string
          improvement_percentage?: number | null
          period_month: number
          period_year: number
          score: number
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          department?: string
          employee_count?: number | null
          id?: string
          improvement_percentage?: number | null
          period_month?: number
          period_year?: number
          score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      od_org_structure: {
        Row: {
          created_at: string | null
          description: string | null
          employee_count: number | null
          id: string
          manager_name: string | null
          name: string
          parent_id: string | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          id?: string
          manager_name?: string | null
          name: string
          parent_id?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          id?: string
          manager_name?: string | null
          name?: string
          parent_id?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "od_org_structure_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "od_org_structure"
            referencedColumns: ["id"]
          },
        ]
      }
      org_units: {
        Row: {
          budget_amount: number | null
          company_id: string
          cost_center: string | null
          created_at: string
          id: string
          is_active: boolean | null
          level: number | null
          manager_id: string | null
          parent_unit_id: string | null
          unit_code: string
          unit_name: string
          updated_at: string
        }
        Insert: {
          budget_amount?: number | null
          company_id: string
          cost_center?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          level?: number | null
          manager_id?: string | null
          parent_unit_id?: string | null
          unit_code: string
          unit_name: string
          updated_at?: string
        }
        Update: {
          budget_amount?: number | null
          company_id?: string
          cost_center?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          level?: number | null
          manager_id?: string | null
          parent_unit_id?: string | null
          unit_code?: string
          unit_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_units_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_units_parent_unit_id_fkey"
            columns: ["parent_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_subscriptions: {
        Row: {
          admin_user_id: string
          created_at: string
          current_users: number | null
          end_date: string
          id: string
          is_active: boolean | null
          organization_name: string
          plan_id: string
          start_date: string
          updated_at: string
          used_meeting_hours: number | null
          used_storage_gb: number | null
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          current_users?: number | null
          end_date: string
          id?: string
          is_active?: boolean | null
          organization_name: string
          plan_id: string
          start_date: string
          updated_at?: string
          used_meeting_hours?: number | null
          used_storage_gb?: number | null
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          current_users?: number | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          organization_name?: string
          plan_id?: string
          start_date?: string
          updated_at?: string
          used_meeting_hours?: number | null
          used_storage_gb?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      overtime_records: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attendance_record_id: string | null
          created_at: string | null
          employee_id: string | null
          hourly_rate: number | null
          id: string
          overtime_end_time: string | null
          overtime_hours: number
          overtime_start_time: string | null
          payroll_processed: boolean | null
          pre_approved: boolean | null
          reason: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_record_id?: string | null
          created_at?: string | null
          employee_id?: string | null
          hourly_rate?: number | null
          id?: string
          overtime_end_time?: string | null
          overtime_hours: number
          overtime_start_time?: string | null
          payroll_processed?: boolean | null
          pre_approved?: boolean | null
          reason?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_record_id?: string | null
          created_at?: string | null
          employee_id?: string | null
          hourly_rate?: number | null
          id?: string
          overtime_end_time?: string | null
          overtime_hours?: number
          overtime_start_time?: string | null
          payroll_processed?: boolean | null
          pre_approved?: boolean | null
          reason?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "overtime_records_attendance_record_id_fkey"
            columns: ["attendance_record_id"]
            isOneToOne: false
            referencedRelation: "attendance_records_new"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtime_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_batches: {
        Row: {
          bank_account_id: string
          batch_number: string
          created_at: string
          id: string
          payment_count: number
          processed_at: string | null
          processed_by: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          bank_account_id: string
          batch_number: string
          created_at?: string
          id?: string
          payment_count: number
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          bank_account_id?: string
          batch_number?: string
          created_at?: string
          id?: string
          payment_count?: number
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_batches_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_items: {
        Row: {
          basic_salary: number
          created_at: string
          employee_id: string
          gosi_employee: number | null
          gross_salary: number
          housing_allowance: number | null
          id: string
          income_tax: number | null
          net_salary: number
          other_allowances: number | null
          other_deductions: number | null
          payroll_run_id: string
          total_deductions: number
          transport_allowance: number | null
        }
        Insert: {
          basic_salary: number
          created_at?: string
          employee_id: string
          gosi_employee?: number | null
          gross_salary: number
          housing_allowance?: number | null
          id?: string
          income_tax?: number | null
          net_salary: number
          other_allowances?: number | null
          other_deductions?: number | null
          payroll_run_id: string
          total_deductions: number
          transport_allowance?: number | null
        }
        Update: {
          basic_salary?: number
          created_at?: string
          employee_id?: string
          gosi_employee?: number | null
          gross_salary?: number
          housing_allowance?: number | null
          id?: string
          income_tax?: number | null
          net_salary?: number
          other_allowances?: number | null
          other_deductions?: number | null
          payroll_run_id?: string
          total_deductions?: number
          transport_allowance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_items_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_items_payroll_run_id_fkey"
            columns: ["payroll_run_id"]
            isOneToOne: false
            referencedRelation: "payroll_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          bank_letter_type: string | null
          created_at: string | null
          documents: Json | null
          employee_id: string
          id: string
          notes: string | null
          processed_at: string | null
          processed_by: string | null
          request_reason: string | null
          request_type: string
          requested_amount: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          bank_letter_type?: string | null
          created_at?: string | null
          documents?: Json | null
          employee_id: string
          id?: string
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          request_reason?: string | null
          request_type: string
          requested_amount?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          bank_letter_type?: string | null
          created_at?: string | null
          documents?: Json | null
          employee_id?: string
          id?: string
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          request_reason?: string | null
          request_type?: string
          requested_amount?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payroll_runs: {
        Row: {
          created_at: string
          id: string
          payroll_period: string
          period_end: string
          period_start: string
          processed_at: string | null
          processed_by: string | null
          status: string
          total_deductions: number
          total_gross: number
          total_net: number
          updated_at: string
          user_id: string
          wps_file_generated: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          payroll_period: string
          period_end: string
          period_start: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          total_deductions?: number
          total_gross?: number
          total_net?: number
          updated_at?: string
          user_id: string
          wps_file_generated?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          payroll_period?: string
          period_end?: string
          period_start?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          total_deductions?: number
          total_gross?: number
          total_net?: number
          updated_at?: string
          user_id?: string
          wps_file_generated?: boolean | null
        }
        Relationships: []
      }
      performance_competencies: {
        Row: {
          category: string
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          proficiency_levels: Json | null
          updated_at: string
        }
        Insert: {
          category: string
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          proficiency_levels?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          proficiency_levels?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      performance_goals: {
        Row: {
          assigned_by: string | null
          category: string | null
          company_id: string
          completion_date: string | null
          created_at: string
          created_by: string | null
          current_value: number | null
          description: string | null
          employee_id: string
          id: string
          priority: string | null
          review_comments: string | null
          review_date: string | null
          reviewed_by: string | null
          start_date: string
          status: string | null
          target_date: string
          target_value: number | null
          title: string
          unit: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          assigned_by?: string | null
          category?: string | null
          company_id: string
          completion_date?: string | null
          created_at?: string
          created_by?: string | null
          current_value?: number | null
          description?: string | null
          employee_id: string
          id?: string
          priority?: string | null
          review_comments?: string | null
          review_date?: string | null
          reviewed_by?: string | null
          start_date?: string
          status?: string | null
          target_date: string
          target_value?: number | null
          title: string
          unit?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          assigned_by?: string | null
          category?: string | null
          company_id?: string
          completion_date?: string | null
          created_at?: string
          created_by?: string | null
          current_value?: number | null
          description?: string | null
          employee_id?: string
          id?: string
          priority?: string | null
          review_comments?: string | null
          review_date?: string | null
          reviewed_by?: string | null
          start_date?: string
          status?: string | null
          target_date?: string
          target_value?: number | null
          title?: string
          unit?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      performance_indicators: {
        Row: {
          auto_calculation: boolean | null
          calculation_formula: string | null
          category: string
          company_id: string
          created_at: string | null
          description: string | null
          id: string
          indicator_code: string
          indicator_name: string
          indicator_type: Database["public"]["Enums"]["indicator_type"]
          is_active: boolean | null
          linked_system: string | null
          target_value: number | null
          updated_at: string | null
          weight_percentage: number | null
        }
        Insert: {
          auto_calculation?: boolean | null
          calculation_formula?: string | null
          category: string
          company_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          indicator_code: string
          indicator_name: string
          indicator_type: Database["public"]["Enums"]["indicator_type"]
          is_active?: boolean | null
          linked_system?: string | null
          target_value?: number | null
          updated_at?: string | null
          weight_percentage?: number | null
        }
        Update: {
          auto_calculation?: boolean | null
          calculation_formula?: string | null
          category?: string
          company_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          indicator_code?: string
          indicator_name?: string
          indicator_type?: Database["public"]["Enums"]["indicator_type"]
          is_active?: boolean | null
          linked_system?: string | null
          target_value?: number | null
          updated_at?: string | null
          weight_percentage?: number | null
        }
        Relationships: []
      }
      performance_kpis: {
        Row: {
          calculation_method: string | null
          category: string
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          frequency: string | null
          id: string
          is_active: boolean | null
          name: string
          target_value: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          calculation_method?: string | null
          category: string
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          target_value?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          calculation_method?: string | null
          category?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          target_value?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      performance_reviews: {
        Row: {
          approved_by: string | null
          approved_date: string | null
          areas_for_improvement: string | null
          company_id: string
          competency_scores: Json | null
          created_at: string
          development_recommendations: string | null
          employee_comments: string | null
          employee_id: string
          goal_achievement_score: number | null
          hr_comments: string | null
          id: string
          manager_comments: string | null
          next_review_date: string | null
          overall_rating: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status: string | null
          strengths: string | null
          submitted_date: string | null
          updated_at: string
        }
        Insert: {
          approved_by?: string | null
          approved_date?: string | null
          areas_for_improvement?: string | null
          company_id: string
          competency_scores?: Json | null
          created_at?: string
          development_recommendations?: string | null
          employee_comments?: string | null
          employee_id: string
          goal_achievement_score?: number | null
          hr_comments?: string | null
          id?: string
          manager_comments?: string | null
          next_review_date?: string | null
          overall_rating?: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status?: string | null
          strengths?: string | null
          submitted_date?: string | null
          updated_at?: string
        }
        Update: {
          approved_by?: string | null
          approved_date?: string | null
          areas_for_improvement?: string | null
          company_id?: string
          competency_scores?: Json | null
          created_at?: string
          development_recommendations?: string | null
          employee_comments?: string | null
          employee_id?: string
          goal_achievement_score?: number | null
          hr_comments?: string | null
          id?: string
          manager_comments?: string | null
          next_review_date?: string | null
          overall_rating?: number | null
          review_period_end?: string
          review_period_start?: string
          reviewer_id?: string
          status?: string | null
          strengths?: string | null
          submitted_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          category_id: string | null
          content: string | null
          created_at: string
          created_by: string
          description: string | null
          document_url: string | null
          effective_date: string | null
          id: string
          last_review_date: string | null
          next_review_date: string | null
          priority: string | null
          review_frequency_months: number | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          version: string | null
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          document_url?: string | null
          effective_date?: string | null
          id?: string
          last_review_date?: string | null
          next_review_date?: string | null
          priority?: string | null
          review_frequency_months?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          version?: string | null
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          document_url?: string | null
          effective_date?: string | null
          id?: string
          last_review_date?: string | null
          next_review_date?: string | null
          priority?: string | null
          review_frequency_months?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "policy_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      policy_reviews: {
        Row: {
          action_required: boolean | null
          assigned_date: string | null
          completed_date: string | null
          created_at: string
          due_date: string | null
          findings: string | null
          id: string
          policy_id: string
          recommendations: string | null
          review_type: string | null
          reviewer_id: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          action_required?: boolean | null
          assigned_date?: string | null
          completed_date?: string | null
          created_at?: string
          due_date?: string | null
          findings?: string | null
          id?: string
          policy_id: string
          recommendations?: string | null
          review_type?: string | null
          reviewer_id?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          action_required?: boolean | null
          assigned_date?: string | null
          completed_date?: string | null
          created_at?: string
          due_date?: string | null
          findings?: string | null
          id?: string
          policy_id?: string
          recommendations?: string | null
          review_type?: string | null
          reviewer_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_reviews_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          employee_id: string | null
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          position: string | null
          preferred_language: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          employee_id?: string | null
          full_name: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          position?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          employee_id?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          position?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          account_id: string | null
          created_at: string
          id: string
          item_description: string
          po_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          id?: string
          item_description: string
          po_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          account_id?: string | null
          created_at?: string
          id?: string
          item_description?: string
          po_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          approved_by: string | null
          created_at: string
          created_by: string
          delivery_date: string | null
          id: string
          notes: string | null
          order_date: string
          po_number: string
          status: string
          supplier_id: string
          total_amount: number
          updated_at: string
          user_id: string
          vat_amount: number | null
          workflow_id: string | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          created_by: string
          delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          po_number: string
          status?: string
          supplier_id: string
          total_amount: number
          updated_at?: string
          user_id: string
          vat_amount?: number | null
          workflow_id?: string | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          created_by?: string
          delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          po_number?: string
          status?: string
          supplier_id?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
          vat_amount?: number | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      renewal_reminders: {
        Row: {
          created_at: string
          email_sent: boolean | null
          id: string
          reminder_type: string
          sent_at: string | null
          subscription_id: string | null
        }
        Insert: {
          created_at?: string
          email_sent?: boolean | null
          id?: string
          reminder_type: string
          sent_at?: string | null
          subscription_id?: string | null
        }
        Update: {
          created_at?: string
          email_sent?: boolean | null
          id?: string
          reminder_type?: string
          sent_at?: string | null
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renewal_reminders_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "boud_user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          admin_notes: string | null
          amount: number | null
          attachments: Json | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          priority: string | null
          requested_date: string | null
          start_date: string | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          attachments?: Json | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string | null
          requested_date?: string | null
          start_date?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          attachments?: Json | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string | null
          requested_date?: string | null
          start_date?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reward_approvals: {
        Row: {
          approval_level: number
          approved_at: string | null
          approver_id: string
          comments: string | null
          created_at: string | null
          id: string
          is_final_approval: boolean | null
          reward_id: string | null
          status: Database["public"]["Enums"]["reward_status"] | null
        }
        Insert: {
          approval_level: number
          approved_at?: string | null
          approver_id: string
          comments?: string | null
          created_at?: string | null
          id?: string
          is_final_approval?: boolean | null
          reward_id?: string | null
          status?: Database["public"]["Enums"]["reward_status"] | null
        }
        Update: {
          approval_level?: number
          approved_at?: string | null
          approver_id?: string
          comments?: string | null
          created_at?: string | null
          id?: string
          is_final_approval?: boolean | null
          reward_id?: string | null
          status?: Database["public"]["Enums"]["reward_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_approvals_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "employee_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_eligibility_checks: {
        Row: {
          calculated_amount: number | null
          check_date: string | null
          created_at: string | null
          eligibility_score: number | null
          employee_id: string | null
          failed_criteria: Json | null
          id: string
          is_eligible: boolean | null
          met_criteria: Json | null
          notes: string | null
          program_id: string | null
        }
        Insert: {
          calculated_amount?: number | null
          check_date?: string | null
          created_at?: string | null
          eligibility_score?: number | null
          employee_id?: string | null
          failed_criteria?: Json | null
          id?: string
          is_eligible?: boolean | null
          met_criteria?: Json | null
          notes?: string | null
          program_id?: string | null
        }
        Update: {
          calculated_amount?: number | null
          check_date?: string | null
          created_at?: string | null
          eligibility_score?: number | null
          employee_id?: string | null
          failed_criteria?: Json | null
          id?: string
          is_eligible?: boolean | null
          met_criteria?: Json | null
          notes?: string | null
          program_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_eligibility_checks_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_eligibility_checks_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "incentive_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_history: {
        Row: {
          average_reward: number | null
          company_id: string | null
          created_at: string | null
          department_id: string | null
          employee_id: string | null
          id: string
          month: number
          number_of_rewards: number | null
          performance_rating: number | null
          position_id: string | null
          top_reward_type: Database["public"]["Enums"]["reward_type"] | null
          total_rewards: number | null
          year: number
        }
        Insert: {
          average_reward?: number | null
          company_id?: string | null
          created_at?: string | null
          department_id?: string | null
          employee_id?: string | null
          id?: string
          month: number
          number_of_rewards?: number | null
          performance_rating?: number | null
          position_id?: string | null
          top_reward_type?: Database["public"]["Enums"]["reward_type"] | null
          total_rewards?: number | null
          year: number
        }
        Update: {
          average_reward?: number | null
          company_id?: string | null
          created_at?: string | null
          department_id?: string | null
          employee_id?: string | null
          id?: string
          month?: number
          number_of_rewards?: number | null
          performance_rating?: number | null
          position_id?: string | null
          top_reward_type?: Database["public"]["Enums"]["reward_type"] | null
          total_rewards?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "reward_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "boud_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_notifications: {
        Row: {
          company_id: string | null
          created_at: string | null
          email_sent: boolean | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          priority_level: number | null
          push_sent: boolean | null
          read_at: string | null
          recipient_id: string
          reward_id: string | null
          sms_sent: boolean | null
          title: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          priority_level?: number | null
          push_sent?: boolean | null
          read_at?: string | null
          recipient_id: string
          reward_id?: string | null
          sms_sent?: boolean | null
          title: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          priority_level?: number | null
          push_sent?: boolean | null
          read_at?: string | null
          recipient_id?: string
          reward_id?: string | null
          sms_sent?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_notifications_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "employee_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_reports: {
        Row: {
          company_id: string | null
          data: Json | null
          file_format: string | null
          file_path: string | null
          filters: Json | null
          generated_at: string | null
          generated_by: string | null
          id: string
          is_scheduled: boolean | null
          next_generation_date: string | null
          recipients: Json | null
          report_name: string
          report_type: string
          schedule_frequency: string | null
        }
        Insert: {
          company_id?: string | null
          data?: Json | null
          file_format?: string | null
          file_path?: string | null
          filters?: Json | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          is_scheduled?: boolean | null
          next_generation_date?: string | null
          recipients?: Json | null
          report_name: string
          report_type: string
          schedule_frequency?: string | null
        }
        Update: {
          company_id?: string | null
          data?: Json | null
          file_format?: string | null
          file_path?: string | null
          filters?: Json | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          is_scheduled?: boolean | null
          next_generation_date?: string | null
          recipients?: Json | null
          report_name?: string
          report_type?: string
          schedule_frequency?: string | null
        }
        Relationships: []
      }
      reward_system_settings: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          setting_key: string
          setting_type: string | null
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          setting_key: string
          setting_type?: string | null
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          setting_key?: string
          setting_type?: string | null
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      saudi_holidays: {
        Row: {
          created_at: string | null
          duration_days: number | null
          gregorian_date: string | null
          hijri_date: string | null
          holiday_type: string | null
          id: string
          is_active: boolean | null
          is_recurring: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          duration_days?: number | null
          gregorian_date?: string | null
          hijri_date?: string | null
          holiday_type?: string | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          duration_days?: number | null
          gregorian_date?: string | null
          hijri_date?: string | null
          holiday_type?: string | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      saudi_labor_violations: {
        Row: {
          article_reference: string
          auto_trigger_rules: Json | null
          category: string
          created_at: string | null
          description: string | null
          final_action: string
          first_action: string
          id: string
          is_active: boolean | null
          second_action: string
          severity: Database["public"]["Enums"]["violation_severity"]
          updated_at: string | null
          violation_code: string
          violation_name: string
          violation_name_en: string | null
        }
        Insert: {
          article_reference: string
          auto_trigger_rules?: Json | null
          category: string
          created_at?: string | null
          description?: string | null
          final_action: string
          first_action: string
          id?: string
          is_active?: boolean | null
          second_action: string
          severity?: Database["public"]["Enums"]["violation_severity"]
          updated_at?: string | null
          violation_code: string
          violation_name: string
          violation_name_en?: string | null
        }
        Update: {
          article_reference?: string
          auto_trigger_rules?: Json | null
          category?: string
          created_at?: string | null
          description?: string | null
          final_action?: string
          first_action?: string
          id?: string
          is_active?: boolean | null
          second_action?: string
          severity?: Database["public"]["Enums"]["violation_severity"]
          updated_at?: string | null
          violation_code?: string
          violation_name?: string
          violation_name_en?: string | null
        }
        Relationships: []
      }
      saudi_leave_types: {
        Row: {
          code: string
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          gender_restriction: string | null
          id: string
          is_active: boolean | null
          is_paid: boolean | null
          max_consecutive_days: number | null
          max_days_per_year: number | null
          minimum_service_years: number | null
          name_ar: string
          name_en: string
          requires_medical_certificate: boolean | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          gender_restriction?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          max_consecutive_days?: number | null
          max_days_per_year?: number | null
          minimum_service_years?: number | null
          name_ar: string
          name_en: string
          requires_medical_certificate?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          gender_restriction?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          max_consecutive_days?: number | null
          max_days_per_year?: number | null
          minimum_service_years?: number | null
          name_ar?: string
          name_en?: string
          requires_medical_certificate?: boolean | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: Database["public"]["Enums"]["service_category"]
          created_at: string
          default_price: number
          default_quantities: number[] | null
          description: string | null
          description_en: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          name_en: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["service_category"]
          created_at?: string
          default_price: number
          default_quantities?: number[] | null
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          name_en?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["service_category"]
          created_at?: string
          default_price?: number
          default_quantities?: number[] | null
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          name_en?: string | null
        }
        Relationships: []
      }
      shifts: {
        Row: {
          break_duration: number | null
          company_id: string | null
          created_at: string | null
          early_leave_threshold_minutes: number | null
          end_time: string
          id: string
          is_active: boolean | null
          is_flexible: boolean | null
          late_threshold_minutes: number | null
          overtime_threshold_minutes: number | null
          shift_name: string
          shift_name_ar: string
          start_time: string
          updated_at: string | null
          work_days: number[] | null
        }
        Insert: {
          break_duration?: number | null
          company_id?: string | null
          created_at?: string | null
          early_leave_threshold_minutes?: number | null
          end_time: string
          id?: string
          is_active?: boolean | null
          is_flexible?: boolean | null
          late_threshold_minutes?: number | null
          overtime_threshold_minutes?: number | null
          shift_name: string
          shift_name_ar: string
          start_time: string
          updated_at?: string | null
          work_days?: number[] | null
        }
        Update: {
          break_duration?: number | null
          company_id?: string | null
          created_at?: string | null
          early_leave_threshold_minutes?: number | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          is_flexible?: boolean | null
          late_threshold_minutes?: number | null
          overtime_threshold_minutes?: number | null
          shift_name?: string
          shift_name_ar?: string
          start_time?: string
          updated_at?: string | null
          work_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          features: Json | null
          id: string
          is_active: boolean | null
          max_users: number | null
          monthly_meeting_hours: number | null
          name: string
          price_annual: number | null
          price_monthly: number | null
          recording_hours: number | null
          storage_gb: number | null
        }
        Insert: {
          created_at?: string
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_users?: number | null
          monthly_meeting_hours?: number | null
          name: string
          price_annual?: number | null
          price_monthly?: number | null
          recording_hours?: number | null
          storage_gb?: number | null
        }
        Update: {
          created_at?: string
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_users?: number | null
          monthly_meeting_hours?: number | null
          name?: string
          price_annual?: number | null
          price_monthly?: number | null
          recording_hours?: number | null
          storage_gb?: number | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          commercial_register: string | null
          contact_person: string | null
          created_at: string
          credit_limit: number | null
          currency: string | null
          email: string | null
          id: string
          is_active: boolean | null
          payment_terms: number | null
          phone: string | null
          supplier_code: string
          supplier_name: string
          updated_at: string
          user_id: string
          vat_number: string | null
        }
        Insert: {
          address?: string | null
          commercial_register?: string | null
          contact_person?: string | null
          created_at?: string
          credit_limit?: number | null
          currency?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          payment_terms?: number | null
          phone?: string | null
          supplier_code: string
          supplier_name: string
          updated_at?: string
          user_id: string
          vat_number?: string | null
        }
        Update: {
          address?: string | null
          commercial_register?: string | null
          contact_person?: string | null
          created_at?: string
          credit_limit?: number | null
          currency?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          payment_terms?: number | null
          phone?: string | null
          supplier_code?: string
          supplier_name?: string
          updated_at?: string
          user_id?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_type: string | null
          setting_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_type?: string | null
          setting_value: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_type?: string | null
          setting_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_by: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          progress: number | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          progress?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          progress?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          account_id: string
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_number: string | null
          status: string | null
          transaction_date: string
          transaction_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id: string
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_number?: string | null
          status?: string | null
          transaction_date?: string
          transaction_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_number?: string | null
          status?: string | null
          transaction_date?: string
          transaction_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_company_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          company_id: string
          created_at: string | null
          department_id: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["company_role"]
          updated_at: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          company_id: string
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_active?: boolean | null
          role: Database["public"]["Enums"]["company_role"]
          updated_at?: string | null
          user_id: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          company_id?: string
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["company_role"]
          updated_at?: string | null
          user_id?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      user_department_permissions: {
        Row: {
          company_id: string
          created_at: string | null
          department_id: string | null
          expires_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          is_active: boolean | null
          permission_code: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          department_id?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          permission_code: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          department_id?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          permission_code?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          department: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      work_locations: {
        Row: {
          address: string
          allowed_departments: string[] | null
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          latitude: number
          location_name: string
          longitude: number
          radius_meters: number | null
          updated_at: string | null
          work_hours: Json | null
        }
        Insert: {
          address: string
          allowed_departments?: string[] | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          latitude: number
          location_name: string
          longitude: number
          radius_meters?: number | null
          updated_at?: string | null
          work_hours?: Json | null
        }
        Update: {
          address?: string
          allowed_departments?: string[] | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number
          location_name?: string
          longitude?: number
          radius_meters?: number | null
          updated_at?: string | null
          work_hours?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "work_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      work_schedules: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          company_id: string | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          is_active: boolean
          name: string
          schedule_type: Database["public"]["Enums"]["work_schedule_type"]
          start_time: string
          total_hours_per_day: number
          total_hours_per_week: number
          updated_at: string
          work_days: Database["public"]["Enums"]["day_of_week"][]
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          company_id?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          is_active?: boolean
          name: string
          schedule_type?: Database["public"]["Enums"]["work_schedule_type"]
          start_time: string
          total_hours_per_day: number
          total_hours_per_week: number
          updated_at?: string
          work_days: Database["public"]["Enums"]["day_of_week"][]
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          company_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          is_active?: boolean
          name?: string
          schedule_type?: Database["public"]["Enums"]["work_schedule_type"]
          start_time?: string
          total_hours_per_day?: number
          total_hours_per_week?: number
          updated_at?: string
          work_days?: Database["public"]["Enums"]["day_of_week"][]
        }
        Relationships: []
      }
      work_shifts: {
        Row: {
          break_duration: number | null
          company_id: string | null
          created_at: string | null
          end_time: string
          id: string
          is_active: boolean | null
          is_flexible: boolean | null
          max_late_minutes: number | null
          overtime_threshold_minutes: number | null
          shift_name: string
          start_time: string
          updated_at: string | null
          work_days: number[] | null
        }
        Insert: {
          break_duration?: number | null
          company_id?: string | null
          created_at?: string | null
          end_time: string
          id?: string
          is_active?: boolean | null
          is_flexible?: boolean | null
          max_late_minutes?: number | null
          overtime_threshold_minutes?: number | null
          shift_name: string
          start_time: string
          updated_at?: string | null
          work_days?: number[] | null
        }
        Update: {
          break_duration?: number | null
          company_id?: string | null
          created_at?: string | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          is_flexible?: boolean | null
          max_late_minutes?: number | null
          overtime_threshold_minutes?: number | null
          shift_name?: string
          start_time?: string
          updated_at?: string | null
          work_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "work_shifts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "boud_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_approvals: {
        Row: {
          action: Database["public"]["Enums"]["approval_action"] | null
          approved_at: string | null
          approver_id: string
          comments: string | null
          created_at: string
          id: string
          step_number: number
          workflow_id: string
        }
        Insert: {
          action?: Database["public"]["Enums"]["approval_action"] | null
          approved_at?: string | null
          approver_id: string
          comments?: string | null
          created_at?: string
          id?: string
          step_number: number
          workflow_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["approval_action"] | null
          approved_at?: string | null
          approver_id?: string
          comments?: string | null
          created_at?: string
          id?: string
          step_number?: number
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_approvals_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          entity_type: string
          id: string
          status: Database["public"]["Enums"]["hr_workflow_status"] | null
          updated_at: string
          version: number | null
          workflow_config: Json
          workflow_key: string
          workflow_name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          entity_type: string
          id?: string
          status?: Database["public"]["Enums"]["hr_workflow_status"] | null
          updated_at?: string
          version?: number | null
          workflow_config: Json
          workflow_key: string
          workflow_name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          entity_type?: string
          id?: string
          status?: Database["public"]["Enums"]["hr_workflow_status"] | null
          updated_at?: string
          version?: number | null
          workflow_config?: Json
          workflow_key?: string
          workflow_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          current_approver: string | null
          current_step: number
          data: Json
          id: string
          initiated_by: string
          priority: string | null
          status: Database["public"]["Enums"]["workflow_status"]
          total_steps: number
          updated_at: string
          workflow_name: string
          workflow_type: string
        }
        Insert: {
          created_at?: string
          current_approver?: string | null
          current_step?: number
          data?: Json
          id?: string
          initiated_by: string
          priority?: string | null
          status?: Database["public"]["Enums"]["workflow_status"]
          total_steps: number
          updated_at?: string
          workflow_name: string
          workflow_type: string
        }
        Update: {
          created_at?: string
          current_approver?: string | null
          current_step?: number
          data?: Json
          id?: string
          initiated_by?: string
          priority?: string | null
          status?: Database["public"]["Enums"]["workflow_status"]
          total_steps?: number
          updated_at?: string
          workflow_name?: string
          workflow_type?: string
        }
        Relationships: []
      }
      zatca_integration: {
        Row: {
          api_key: string | null
          certificate_data: string | null
          commercial_register: string
          company_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          sandbox_mode: boolean | null
          secret_key: string | null
          updated_at: string | null
          user_id: string
          vat_number: string
          zatca_password: string | null
          zatca_username: string | null
        }
        Insert: {
          api_key?: string | null
          certificate_data?: string | null
          commercial_register: string
          company_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          sandbox_mode?: boolean | null
          secret_key?: string | null
          updated_at?: string | null
          user_id: string
          vat_number: string
          zatca_password?: string | null
          zatca_username?: string | null
        }
        Update: {
          api_key?: string | null
          certificate_data?: string | null
          commercial_register?: string
          company_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          sandbox_mode?: boolean | null
          secret_key?: string | null
          updated_at?: string | null
          user_id?: string
          vat_number?: string
          zatca_password?: string | null
          zatca_username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      boud_get_user_company_id: {
        Args: { _user_id: string }
        Returns: string
      }
      boud_has_role: {
        Args: {
          _company_id: string
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
      calculate_reward_eligibility: {
        Args: { p_employee_id: string; p_program_id: string }
        Returns: {
          calculated_amount: number
          eligibility_score: number
          failed_criteria: Json
          is_eligible: boolean
          met_criteria: Json
        }[]
      }
      can_access_payroll_item: {
        Args: { item_id: string }
        Returns: boolean
      }
      check_and_create_attendance_violations: {
        Args: { p_company_id: string; p_employee_id: string }
        Returns: {
          action_created: boolean
          count: number
          suggested_action: string
          violation_type: string
        }[]
      }
      create_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_employee_notification: {
        Args: {
          p_action_type?: string
          p_description: string
          p_employee_id: string
          p_notification_type?: string
          p_priority?: string
          p_related_id?: string
          p_title: string
        }
        Returns: string
      }
      decrypt_sensitive_data: {
        Args: { encrypted_data: string; key_id?: string }
        Returns: string
      }
      encrypt_existing_employee_data: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      encrypt_sensitive_data: {
        Args: { data: string; key_id?: string }
        Returns: string
      }
      generate_boud_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_claim_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_disciplinary_case_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_reward_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_subscription_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_temp_password: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_decrypted_bank_account: {
        Args: { employee_id: string }
        Returns: string
      }
      get_decrypted_iban: {
        Args: { employee_id: string }
        Returns: string
      }
      get_decrypted_national_id: {
        Args: { employee_id: string }
        Returns: string
      }
      get_decrypted_passport_number: {
        Args: { employee_id: string }
        Returns: string
      }
      get_employee_company_id: {
        Args: { _user_id: string }
        Returns: string
      }
      get_payroll_summary: {
        Args: { p_employee_id?: string }
        Returns: {
          basic_salary: number
          employee_id: string
          employee_name: string
          net_salary: number
        }[]
      }
      get_user_company_id: {
        Args: { _user_id: string }
        Returns: string
      }
      grant_department_permission: {
        Args: {
          _company_id: string
          _department_id: string
          _expires_at?: string
          _permission_code: string
          _user_id: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hr_has_role: {
        Args: {
          _company_id: string
          _role: Database["public"]["Enums"]["hr_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_job_view: {
        Args: { job_id: string }
        Returns: undefined
      }
      revoke_department_permission: {
        Args: {
          _company_id: string
          _department_id: string
          _permission_code: string
          _user_id: string
        }
        Returns: boolean
      }
      secure_employee_access_check: {
        Args: { _employee_id: string; _user_id: string }
        Returns: boolean
      }
      update_attendance_location: {
        Args: {
          p_attendance_id: string
          p_is_check_out?: boolean
          p_location: Json
        }
        Returns: boolean
      }
      user_has_department_permission: {
        Args: {
          _company_id: string
          _department_id: string
          _permission_code: string
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      allocation_status: "draft" | "pending" | "approved" | "rejected"
      app_role:
        | "admin"
        | "cfo"
        | "finance_manager"
        | "accountant"
        | "ap_clerk"
        | "ar_clerk"
        | "budget_officer"
        | "treasurer"
        | "auditor"
        | "viewer"
      approval_action: "approve" | "reject" | "return_for_revision"
      approval_status: "pending" | "approved" | "rejected"
      attendance_status:
        | "present"
        | "absent"
        | "late"
        | "early_leave"
        | "overtime"
      auth_type: "api_key" | "oauth2"
      budget_status: "active" | "inactive"
      check_method:
        | "device"
        | "gps"
        | "qr_code"
        | "manual"
        | "face_id"
        | "remote"
      claim_status: "pending" | "approved" | "rejected" | "processing" | "paid"
      company_role:
        | "super_admin"
        | "hr_manager"
        | "hr_admin"
        | "department_manager"
        | "team_leader"
        | "senior_employee"
        | "employee"
        | "trainee"
      contract_status:
        | "draft"
        | "active"
        | "expired"
        | "terminated"
        | "pending_renewal"
      contract_type:
        | "employment"
        | "commercial"
        | "service"
        | "confidentiality"
        | "partnership"
        | "consulting"
      correspondence_type: "outgoing" | "incoming" | "internal"
      coverage_level: "basic" | "standard" | "premium" | "comprehensive"
      day_of_week:
        | "sunday"
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
      decision_status: "pending" | "approved" | "rejected" | "executed"
      decision_type:
        | "promotion"
        | "bonus"
        | "warning"
        | "salary_freeze"
        | "development_plan"
      device_type:
        | "fingerprint"
        | "face_recognition"
        | "rfid"
        | "mobile_gps"
        | "qr_code"
        | "camera_wall"
      disciplinary_action:
        | "verbal_warning"
        | "written_warning"
        | "final_warning"
        | "suspension"
        | "termination"
      disciplinary_action_type:
        | "verbal_warning"
        | "written_warning"
        | "salary_deduction"
        | "suspension"
        | "final_warning"
        | "termination"
      disciplinary_status: "pending" | "under_review" | "resolved" | "escalated"
      donation_status:
        | "pending"
        | "confirmed"
        | "in_delivery"
        | "delivered"
        | "documented"
      employee_status: "active" | "inactive" | "terminated" | "suspended"
      evaluation_status:
        | "draft"
        | "in_progress"
        | "completed"
        | "approved"
        | "archived"
      evaluation_type:
        | "annual"
        | "semi_annual"
        | "quarterly"
        | "monthly"
        | "custom"
      expense_status: "pending" | "approved" | "rejected"
      forecast_method: "ai" | "linear" | "manual"
      hr_role:
        | "employee"
        | "line_manager"
        | "hr_officer"
        | "hr_manager"
        | "payroll_officer"
        | "finance"
        | "compliance_officer"
        | "er_officer"
        | "hse_officer"
        | "training_officer"
        | "exec"
        | "auditor"
        | "owner"
        | "npcs_manager"
        | "donor_reader"
      hr_workflow_status: "active" | "inactive" | "draft"
      incentive_frequency:
        | "monthly"
        | "quarterly"
        | "semi_annual"
        | "annual"
        | "one_time"
      indicator_type: "KPI" | "KRI" | "KSI" | "KQI" | "KVI" | "KCI"
      insurance_status: "active" | "inactive" | "suspended" | "expired"
      insurance_type:
        | "health"
        | "social"
        | "life"
        | "disability"
        | "dental"
        | "vision"
      integration_status: "active" | "inactive"
      leave_type:
        | "annual"
        | "sick"
        | "emergency"
        | "maternity"
        | "paternity"
        | "unpaid"
      legal_case_status:
        | "pending"
        | "in_progress"
        | "resolved"
        | "appealed"
        | "closed"
      legal_case_type:
        | "labor_dispute"
        | "commercial_contract"
        | "administrative_dispute"
        | "disciplinary_action"
        | "compensation_claim"
        | "regulatory_violation"
      meeting_status: "scheduled" | "ongoing" | "completed" | "cancelled"
      meeting_type: "board" | "executive" | "department" | "team" | "one_on_one"
      notification_channel: "inapp" | "email" | "push"
      notification_status: "unread" | "read"
      participant_role: "organizer" | "required" | "optional" | "presenter"
      penalty_type:
        | "warning"
        | "salary_deduction"
        | "suspension"
        | "termination"
      period_type: "month" | "quarter" | "year"
      premium_frequency: "monthly" | "quarterly" | "semi_annual" | "annual"
      rater_type: "self" | "manager" | "hr" | "360"
      request_status: "pending" | "approved" | "rejected" | "cancelled"
      request_type: "allocation" | "expense" | "deletion" | "update"
      reward_status: "pending" | "approved" | "paid" | "rejected" | "processing"
      reward_type:
        | "annual_bonus"
        | "performance_based"
        | "team_achievement"
        | "manager_recommendation"
        | "special_occasion"
        | "semi_annual"
        | "project_completion"
        | "kpi_achievement"
        | "attendance_excellence"
        | "innovation"
      service_category:
        | "water"
        | "quran"
        | "meals"
        | "dates"
        | "incense"
        | "equipment"
        | "chairs"
        | "carpets"
      session_status: "scheduled" | "completed" | "postponed" | "cancelled"
      signature_status: "pending" | "signed" | "rejected"
      task_status: "pending" | "in_progress" | "completed" | "cancelled"
      user_access_level: "admin" | "executive" | "manager" | "employee"
      user_role:
        | "super_admin"
        | "hr_manager"
        | "line_manager"
        | "employee"
        | "payroll_officer"
      violation_severity: "low" | "medium" | "high" | "critical"
      work_schedule_type: "full_time" | "remote" | "part_time" | "hybrid"
      work_type: "office" | "remote" | "hybrid" | "flexible"
      workflow_status:
        | "pending"
        | "in_review"
        | "approved"
        | "rejected"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      allocation_status: ["draft", "pending", "approved", "rejected"],
      app_role: [
        "admin",
        "cfo",
        "finance_manager",
        "accountant",
        "ap_clerk",
        "ar_clerk",
        "budget_officer",
        "treasurer",
        "auditor",
        "viewer",
      ],
      approval_action: ["approve", "reject", "return_for_revision"],
      approval_status: ["pending", "approved", "rejected"],
      attendance_status: [
        "present",
        "absent",
        "late",
        "early_leave",
        "overtime",
      ],
      auth_type: ["api_key", "oauth2"],
      budget_status: ["active", "inactive"],
      check_method: ["device", "gps", "qr_code", "manual", "face_id", "remote"],
      claim_status: ["pending", "approved", "rejected", "processing", "paid"],
      company_role: [
        "super_admin",
        "hr_manager",
        "hr_admin",
        "department_manager",
        "team_leader",
        "senior_employee",
        "employee",
        "trainee",
      ],
      contract_status: [
        "draft",
        "active",
        "expired",
        "terminated",
        "pending_renewal",
      ],
      contract_type: [
        "employment",
        "commercial",
        "service",
        "confidentiality",
        "partnership",
        "consulting",
      ],
      correspondence_type: ["outgoing", "incoming", "internal"],
      coverage_level: ["basic", "standard", "premium", "comprehensive"],
      day_of_week: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      decision_status: ["pending", "approved", "rejected", "executed"],
      decision_type: [
        "promotion",
        "bonus",
        "warning",
        "salary_freeze",
        "development_plan",
      ],
      device_type: [
        "fingerprint",
        "face_recognition",
        "rfid",
        "mobile_gps",
        "qr_code",
        "camera_wall",
      ],
      disciplinary_action: [
        "verbal_warning",
        "written_warning",
        "final_warning",
        "suspension",
        "termination",
      ],
      disciplinary_action_type: [
        "verbal_warning",
        "written_warning",
        "salary_deduction",
        "suspension",
        "final_warning",
        "termination",
      ],
      disciplinary_status: ["pending", "under_review", "resolved", "escalated"],
      donation_status: [
        "pending",
        "confirmed",
        "in_delivery",
        "delivered",
        "documented",
      ],
      employee_status: ["active", "inactive", "terminated", "suspended"],
      evaluation_status: [
        "draft",
        "in_progress",
        "completed",
        "approved",
        "archived",
      ],
      evaluation_type: [
        "annual",
        "semi_annual",
        "quarterly",
        "monthly",
        "custom",
      ],
      expense_status: ["pending", "approved", "rejected"],
      forecast_method: ["ai", "linear", "manual"],
      hr_role: [
        "employee",
        "line_manager",
        "hr_officer",
        "hr_manager",
        "payroll_officer",
        "finance",
        "compliance_officer",
        "er_officer",
        "hse_officer",
        "training_officer",
        "exec",
        "auditor",
        "owner",
        "npcs_manager",
        "donor_reader",
      ],
      hr_workflow_status: ["active", "inactive", "draft"],
      incentive_frequency: [
        "monthly",
        "quarterly",
        "semi_annual",
        "annual",
        "one_time",
      ],
      indicator_type: ["KPI", "KRI", "KSI", "KQI", "KVI", "KCI"],
      insurance_status: ["active", "inactive", "suspended", "expired"],
      insurance_type: [
        "health",
        "social",
        "life",
        "disability",
        "dental",
        "vision",
      ],
      integration_status: ["active", "inactive"],
      leave_type: [
        "annual",
        "sick",
        "emergency",
        "maternity",
        "paternity",
        "unpaid",
      ],
      legal_case_status: [
        "pending",
        "in_progress",
        "resolved",
        "appealed",
        "closed",
      ],
      legal_case_type: [
        "labor_dispute",
        "commercial_contract",
        "administrative_dispute",
        "disciplinary_action",
        "compensation_claim",
        "regulatory_violation",
      ],
      meeting_status: ["scheduled", "ongoing", "completed", "cancelled"],
      meeting_type: ["board", "executive", "department", "team", "one_on_one"],
      notification_channel: ["inapp", "email", "push"],
      notification_status: ["unread", "read"],
      participant_role: ["organizer", "required", "optional", "presenter"],
      penalty_type: [
        "warning",
        "salary_deduction",
        "suspension",
        "termination",
      ],
      period_type: ["month", "quarter", "year"],
      premium_frequency: ["monthly", "quarterly", "semi_annual", "annual"],
      rater_type: ["self", "manager", "hr", "360"],
      request_status: ["pending", "approved", "rejected", "cancelled"],
      request_type: ["allocation", "expense", "deletion", "update"],
      reward_status: ["pending", "approved", "paid", "rejected", "processing"],
      reward_type: [
        "annual_bonus",
        "performance_based",
        "team_achievement",
        "manager_recommendation",
        "special_occasion",
        "semi_annual",
        "project_completion",
        "kpi_achievement",
        "attendance_excellence",
        "innovation",
      ],
      service_category: [
        "water",
        "quran",
        "meals",
        "dates",
        "incense",
        "equipment",
        "chairs",
        "carpets",
      ],
      session_status: ["scheduled", "completed", "postponed", "cancelled"],
      signature_status: ["pending", "signed", "rejected"],
      task_status: ["pending", "in_progress", "completed", "cancelled"],
      user_access_level: ["admin", "executive", "manager", "employee"],
      user_role: [
        "super_admin",
        "hr_manager",
        "line_manager",
        "employee",
        "payroll_officer",
      ],
      violation_severity: ["low", "medium", "high", "critical"],
      work_schedule_type: ["full_time", "remote", "part_time", "hybrid"],
      work_type: ["office", "remote", "hybrid", "flexible"],
      workflow_status: [
        "pending",
        "in_review",
        "approved",
        "rejected",
        "cancelled",
      ],
    },
  },
} as const
