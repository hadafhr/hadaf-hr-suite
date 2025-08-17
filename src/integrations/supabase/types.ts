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
      attendance_records_new: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attendance_date: string
          break_end_time: string | null
          break_start_time: string | null
          clock_in_time: string | null
          clock_out_time: string | null
          created_at: string
          employee_id: string
          id: string
          is_remote: boolean
          location_check_in: string | null
          location_check_out: string | null
          notes: string | null
          overtime_hours: number | null
          schedule_id: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          total_hours: number | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_date?: string
          break_end_time?: string | null
          break_start_time?: string | null
          clock_in_time?: string | null
          clock_out_time?: string | null
          created_at?: string
          employee_id: string
          id?: string
          is_remote?: boolean
          location_check_in?: string | null
          location_check_out?: string | null
          notes?: string | null
          overtime_hours?: number | null
          schedule_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          total_hours?: number | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_date?: string
          break_end_time?: string | null
          break_start_time?: string | null
          clock_in_time?: string | null
          clock_out_time?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          is_remote?: boolean
          location_check_in?: string | null
          location_check_out?: string | null
          notes?: string | null
          overtime_hours?: number | null
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
          id: string
          is_active: boolean | null
          last_name: string
          major: string | null
          manager_id: string | null
          marital_status: string | null
          middle_name: string | null
          national_id: string | null
          nationality: string | null
          notes: string | null
          other_allowances: number | null
          passport_number: string | null
          phone: string | null
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
          id?: string
          is_active?: boolean | null
          last_name: string
          major?: string | null
          manager_id?: string | null
          marital_status?: string | null
          middle_name?: string | null
          national_id?: string | null
          nationality?: string | null
          notes?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          phone?: string | null
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
          id?: string
          is_active?: boolean | null
          last_name?: string
          major?: string | null
          manager_id?: string | null
          marital_status?: string | null
          middle_name?: string | null
          national_id?: string | null
          nationality?: string | null
          notes?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          phone?: string | null
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
      development_plans: {
        Row: {
          actual_completion_date: string | null
          approval_date: string | null
          approved_by: string | null
          budget_allocated: number | null
          budget_used: number | null
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          development_activities: Json | null
          employee_id: string
          id: string
          mentor_id: string | null
          objective: string | null
          progress_percentage: number | null
          skills_to_develop: string[] | null
          start_date: string
          status: string | null
          target_completion_date: string
          title: string
          updated_at: string
        }
        Insert: {
          actual_completion_date?: string | null
          approval_date?: string | null
          approved_by?: string | null
          budget_allocated?: number | null
          budget_used?: number | null
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          development_activities?: Json | null
          employee_id: string
          id?: string
          mentor_id?: string | null
          objective?: string | null
          progress_percentage?: number | null
          skills_to_develop?: string[] | null
          start_date?: string
          status?: string | null
          target_completion_date: string
          title: string
          updated_at?: string
        }
        Update: {
          actual_completion_date?: string | null
          approval_date?: string | null
          approved_by?: string | null
          budget_allocated?: number | null
          budget_used?: number | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          development_activities?: Json | null
          employee_id?: string
          id?: string
          mentor_id?: string | null
          objective?: string | null
          progress_percentage?: number | null
          skills_to_develop?: string[] | null
          start_date?: string
          status?: string | null
          target_completion_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
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
      hr_approvals: {
        Row: {
          approver_id: string | null
          approver_role: Database["public"]["Enums"]["hr_role"]
          comments: string | null
          created_at: string
          decided_at: string | null
          decision: string | null
          id: string
          is_escalated: boolean | null
          request_id: string
          sla_hours: number | null
          step_number: number
        }
        Insert: {
          approver_id?: string | null
          approver_role: Database["public"]["Enums"]["hr_role"]
          comments?: string | null
          created_at?: string
          decided_at?: string | null
          decision?: string | null
          id?: string
          is_escalated?: boolean | null
          request_id: string
          sla_hours?: number | null
          step_number: number
        }
        Update: {
          approver_id?: string | null
          approver_role?: Database["public"]["Enums"]["hr_role"]
          comments?: string | null
          created_at?: string
          decided_at?: string | null
          decision?: string | null
          id?: string
          is_escalated?: boolean | null
          request_id?: string
          sla_hours?: number | null
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "hr_approvals_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "hr_requests"
            referencedColumns: ["id"]
          },
        ]
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
          employee_id: string
          full_name: string
          grade: string | null
          hire_date: string | null
          housing_allowance: number | null
          iban: string | null
          id: string
          is_active: boolean | null
          job_title: string | null
          leave_balances: Json | null
          manager_id: string | null
          national_id: string | null
          nationality: string | null
          org_unit_id: string | null
          other_allowances: number | null
          passport_number: string | null
          phone: string | null
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
          employee_id: string
          full_name: string
          grade?: string | null
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          leave_balances?: Json | null
          manager_id?: string | null
          national_id?: string | null
          nationality?: string | null
          org_unit_id?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          phone?: string | null
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
          employee_id?: string
          full_name?: string
          grade?: string | null
          hire_date?: string | null
          housing_allowance?: number | null
          iban?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          leave_balances?: Json | null
          manager_id?: string | null
          national_id?: string | null
          nationality?: string | null
          org_unit_id?: string | null
          other_allowances?: number | null
          passport_number?: string | null
          phone?: string | null
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
          payment_date: string | null
          status: string | null
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
          payment_date?: string | null
          status?: string | null
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
          payment_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
          user_id?: string
          zatca_uuid?: string | null
        }
        Relationships: []
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
      create_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_company_id: {
        Args: { _user_id: string }
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
    }
    Enums: {
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
      attendance_status:
        | "present"
        | "absent"
        | "late"
        | "early_leave"
        | "overtime"
      day_of_week:
        | "sunday"
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
      disciplinary_action:
        | "verbal_warning"
        | "written_warning"
        | "final_warning"
        | "suspension"
        | "termination"
      donation_status:
        | "pending"
        | "confirmed"
        | "in_delivery"
        | "delivered"
        | "documented"
      employee_status: "active" | "inactive" | "terminated" | "suspended"
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
      leave_type:
        | "annual"
        | "sick"
        | "emergency"
        | "maternity"
        | "paternity"
        | "unpaid"
      meeting_status: "scheduled" | "ongoing" | "completed" | "cancelled"
      meeting_type: "board" | "executive" | "department" | "team" | "one_on_one"
      participant_role: "organizer" | "required" | "optional" | "presenter"
      request_status: "pending" | "approved" | "rejected" | "cancelled"
      service_category:
        | "water"
        | "quran"
        | "meals"
        | "dates"
        | "incense"
        | "equipment"
        | "chairs"
        | "carpets"
      task_status: "pending" | "in_progress" | "completed" | "cancelled"
      user_access_level: "admin" | "executive" | "manager" | "employee"
      user_role:
        | "super_admin"
        | "hr_manager"
        | "line_manager"
        | "employee"
        | "payroll_officer"
      work_schedule_type: "full_time" | "remote" | "part_time" | "hybrid"
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
      attendance_status: [
        "present",
        "absent",
        "late",
        "early_leave",
        "overtime",
      ],
      day_of_week: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      disciplinary_action: [
        "verbal_warning",
        "written_warning",
        "final_warning",
        "suspension",
        "termination",
      ],
      donation_status: [
        "pending",
        "confirmed",
        "in_delivery",
        "delivered",
        "documented",
      ],
      employee_status: ["active", "inactive", "terminated", "suspended"],
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
      leave_type: [
        "annual",
        "sick",
        "emergency",
        "maternity",
        "paternity",
        "unpaid",
      ],
      meeting_status: ["scheduled", "ongoing", "completed", "cancelled"],
      meeting_type: ["board", "executive", "department", "team", "one_on_one"],
      participant_role: ["organizer", "required", "optional", "presenter"],
      request_status: ["pending", "approved", "rejected", "cancelled"],
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
      task_status: ["pending", "in_progress", "completed", "cancelled"],
      user_access_level: ["admin", "executive", "manager", "employee"],
      user_role: [
        "super_admin",
        "hr_manager",
        "line_manager",
        "employee",
        "payroll_officer",
      ],
      work_schedule_type: ["full_time", "remote", "part_time", "hybrid"],
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
