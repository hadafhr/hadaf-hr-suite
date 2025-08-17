-- Create comprehensive HR management system for Boud EMS

-- Create enum types
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated', 'resigned', 'retired');
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
CREATE TYPE leave_type AS ENUM ('annual', 'sick', 'emergency', 'maternity', 'paternity', 'unpaid');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'early_leave', 'overtime');
CREATE TYPE disciplinary_action AS ENUM ('verbal_warning', 'written_warning', 'final_warning', 'suspension', 'termination');
CREATE TYPE user_role AS ENUM ('super_admin', 'hr_manager', 'line_manager', 'employee', 'payroll_officer');

-- Companies table
CREATE TABLE public.boud_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    company_code TEXT UNIQUE NOT NULL,
    commercial_register TEXT,
    vat_number TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    logo_url TEXT,
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User roles table
CREATE TABLE public.boud_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, company_id, role)
);

-- Departments table
CREATE TABLE public.boud_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    department_name TEXT NOT NULL,
    department_code TEXT NOT NULL,
    manager_id UUID,
    parent_department_id UUID REFERENCES public.boud_departments(id),
    budget DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(company_id, department_code)
);

-- Job positions table
CREATE TABLE public.boud_job_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.boud_departments(id),
    position_title TEXT NOT NULL,
    position_code TEXT NOT NULL,
    job_description TEXT,
    requirements TEXT,
    salary_range_min DECIMAL(15,2),
    salary_range_max DECIMAL(15,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(company_id, position_code)
);

-- Employees table (comprehensive)
CREATE TABLE public.boud_employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id TEXT NOT NULL,
    user_id UUID,
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.boud_departments(id),
    position_id UUID REFERENCES public.boud_job_positions(id),
    manager_id UUID REFERENCES public.boud_employees(id),
    
    -- Personal Information
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    full_name_arabic TEXT,
    national_id TEXT,
    passport_number TEXT,
    nationality TEXT,
    date_of_birth DATE,
    gender TEXT,
    marital_status TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    emergency_contact JSONB,
    
    -- Employment Information
    hire_date DATE,
    contract_start_date DATE,
    contract_end_date DATE,
    contract_type TEXT DEFAULT 'permanent',
    work_location TEXT,
    employment_status employee_status DEFAULT 'active',
    
    -- Salary Information
    basic_salary DECIMAL(15,2) DEFAULT 0,
    housing_allowance DECIMAL(15,2) DEFAULT 0,
    transport_allowance DECIMAL(15,2) DEFAULT 0,
    other_allowances DECIMAL(15,2) DEFAULT 0,
    total_salary DECIMAL(15,2) GENERATED ALWAYS AS (basic_salary + housing_allowance + transport_allowance + other_allowances) STORED,
    
    -- Bank Information
    bank_name TEXT,
    bank_account_number TEXT,
    iban TEXT,
    
    -- Leave Balances
    annual_leave_balance INTEGER DEFAULT 30,
    sick_leave_balance INTEGER DEFAULT 30,
    emergency_leave_balance INTEGER DEFAULT 5,
    
    -- Additional Information
    education_level TEXT,
    university TEXT,
    major TEXT,
    graduation_year INTEGER,
    experience_years INTEGER,
    
    -- System Fields
    profile_picture_url TEXT,
    documents JSONB DEFAULT '[]',
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    UNIQUE(company_id, employee_id)
);

-- Job applications table
CREATE TABLE public.boud_job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    position_id UUID REFERENCES public.boud_job_positions(id),
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    application_status TEXT DEFAULT 'submitted',
    interview_date TIMESTAMP WITH TIME ZONE,
    interviewer_notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Attendance table
CREATE TABLE public.boud_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE,
    check_out_time TIMESTAMP WITH TIME ZONE,
    break_start_time TIMESTAMP WITH TIME ZONE,
    break_end_time TIMESTAMP WITH TIME ZONE,
    status attendance_status DEFAULT 'present',
    work_hours DECIMAL(5,2),
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    late_minutes INTEGER DEFAULT 0,
    early_leave_minutes INTEGER DEFAULT 0,
    notes TEXT,
    location TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(employee_id, attendance_date)
);

-- Leave requests table
CREATE TABLE public.boud_leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    leave_type leave_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INTEGER NOT NULL,
    reason TEXT,
    status request_status DEFAULT 'pending',
    applied_date DATE DEFAULT CURRENT_DATE,
    manager_approval_date DATE,
    manager_approval_by UUID REFERENCES public.boud_employees(id),
    manager_comments TEXT,
    hr_approval_date DATE,
    hr_approval_by UUID REFERENCES public.boud_employees(id),
    hr_comments TEXT,
    documents JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Performance evaluations table
CREATE TABLE public.boud_performance_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    evaluator_id UUID REFERENCES public.boud_employees(id),
    evaluation_period_start DATE NOT NULL,
    evaluation_period_end DATE NOT NULL,
    evaluation_type TEXT DEFAULT 'annual',
    goals JSONB DEFAULT '[]',
    achievements JSONB DEFAULT '[]',
    competencies JSONB DEFAULT '{}',
    overall_rating DECIMAL(3,2) CHECK (overall_rating >= 1 AND overall_rating <= 5),
    strengths TEXT,
    areas_for_improvement TEXT,
    development_plan TEXT,
    employee_comments TEXT,
    manager_comments TEXT,
    hr_comments TEXT,
    status TEXT DEFAULT 'draft',
    submitted_date DATE,
    approved_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Training programs table
CREATE TABLE public.boud_training_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    program_name TEXT NOT NULL,
    program_code TEXT NOT NULL,
    description TEXT,
    trainer_name TEXT,
    training_type TEXT, -- internal, external, online
    duration_hours INTEGER,
    max_participants INTEGER,
    cost_per_participant DECIMAL(15,2),
    location TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'planned',
    requirements TEXT,
    objectives TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(company_id, program_code)
);

-- Training enrollments table
CREATE TABLE public.boud_training_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    training_program_id UUID REFERENCES public.boud_training_programs(id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    completion_date DATE,
    attendance_percentage DECIMAL(5,2),
    final_score DECIMAL(5,2),
    certificate_issued BOOLEAN DEFAULT false,
    certificate_url TEXT,
    feedback TEXT,
    status TEXT DEFAULT 'enrolled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(employee_id, training_program_id)
);

-- Disciplinary actions table
CREATE TABLE public.boud_disciplinary_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    action_type disciplinary_action NOT NULL,
    violation_type TEXT NOT NULL,
    violation_date DATE NOT NULL,
    description TEXT NOT NULL,
    evidence JSONB DEFAULT '[]',
    issued_by UUID REFERENCES public.boud_employees(id),
    issued_date DATE DEFAULT CURRENT_DATE,
    effective_date DATE,
    expiry_date DATE,
    monetary_penalty DECIMAL(15,2) DEFAULT 0,
    suspension_days INTEGER DEFAULT 0,
    employee_response TEXT,
    witness_statements JSONB DEFAULT '[]',
    status TEXT DEFAULT 'active',
    appeal_submitted BOOLEAN DEFAULT false,
    appeal_result TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Payroll runs table
CREATE TABLE public.boud_payroll_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
    payroll_period_start DATE NOT NULL,
    payroll_period_end DATE NOT NULL,
    payroll_month INTEGER NOT NULL,
    payroll_year INTEGER NOT NULL,
    total_employees INTEGER DEFAULT 0,
    total_gross_salary DECIMAL(15,2) DEFAULT 0,
    total_deductions DECIMAL(15,2) DEFAULT 0,
    total_net_salary DECIMAL(15,2) DEFAULT 0,
    status TEXT DEFAULT 'draft',
    processed_by UUID,
    processed_date DATE,
    approved_by UUID,
    approved_date DATE,
    payment_date DATE,
    wps_file_generated BOOLEAN DEFAULT false,
    bank_file_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(company_id, payroll_month, payroll_year)
);

-- Payroll items table
CREATE TABLE public.boud_payroll_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_run_id UUID REFERENCES public.boud_payroll_runs(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    
    -- Earnings
    basic_salary DECIMAL(15,2) DEFAULT 0,
    housing_allowance DECIMAL(15,2) DEFAULT 0,
    transport_allowance DECIMAL(15,2) DEFAULT 0,
    other_allowances DECIMAL(15,2) DEFAULT 0,
    overtime_pay DECIMAL(15,2) DEFAULT 0,
    bonus DECIMAL(15,2) DEFAULT 0,
    commission DECIMAL(15,2) DEFAULT 0,
    
    -- Deductions
    gosi_employee DECIMAL(15,2) DEFAULT 0,
    income_tax DECIMAL(15,2) DEFAULT 0,
    advance_deduction DECIMAL(15,2) DEFAULT 0,
    loan_deduction DECIMAL(15,2) DEFAULT 0,
    disciplinary_deduction DECIMAL(15,2) DEFAULT 0,
    absence_deduction DECIMAL(15,2) DEFAULT 0,
    other_deductions DECIMAL(15,2) DEFAULT 0,
    
    -- Calculations
    gross_salary DECIMAL(15,2) GENERATED ALWAYS AS (
        basic_salary + housing_allowance + transport_allowance + 
        other_allowances + overtime_pay + bonus + commission
    ) STORED,
    total_deductions DECIMAL(15,2) GENERATED ALWAYS AS (
        gosi_employee + income_tax + advance_deduction + 
        loan_deduction + disciplinary_deduction + absence_deduction + other_deductions
    ) STORED,
    net_salary DECIMAL(15,2) GENERATED ALWAYS AS (
        (basic_salary + housing_allowance + transport_allowance + 
         other_allowances + overtime_pay + bonus + commission) -
        (gosi_employee + income_tax + advance_deduction + 
         loan_deduction + disciplinary_deduction + absence_deduction + other_deductions)
    ) STORED,
    
    -- Additional Information
    working_days INTEGER DEFAULT 30,
    actual_working_days INTEGER DEFAULT 30,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    absence_days INTEGER DEFAULT 0,
    late_hours DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Employee terminations table
CREATE TABLE public.boud_employee_terminations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    termination_type TEXT NOT NULL, -- resignation, termination, retirement, contract_end
    termination_reason TEXT,
    notice_period_days INTEGER DEFAULT 30,
    notice_date DATE,
    last_working_date DATE,
    effective_date DATE,
    end_of_service_benefit DECIMAL(15,2) DEFAULT 0,
    final_settlement DECIMAL(15,2) DEFAULT 0,
    outstanding_dues DECIMAL(15,2) DEFAULT 0,
    clearance_status TEXT DEFAULT 'pending',
    clearance_checklist JSONB DEFAULT '[]',
    processed_by UUID REFERENCES public.boud_employees(id),
    processed_date DATE,
    documents JSONB DEFAULT '[]',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.boud_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_performance_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_disciplinary_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_payroll_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_employee_terminations ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_boud_employees_company_id ON public.boud_employees(company_id);
CREATE INDEX idx_boud_employees_department_id ON public.boud_employees(department_id);
CREATE INDEX idx_boud_employees_manager_id ON public.boud_employees(manager_id);
CREATE INDEX idx_boud_attendance_employee_date ON public.boud_attendance(employee_id, attendance_date);
CREATE INDEX idx_boud_leave_requests_employee ON public.boud_leave_requests(employee_id);
CREATE INDEX idx_boud_payroll_items_payroll_run ON public.boud_payroll_items(payroll_run_id);

-- Create functions for role checking
CREATE OR REPLACE FUNCTION public.boud_has_role(_user_id uuid, _company_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.boud_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$$;

CREATE OR REPLACE FUNCTION public.boud_get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id
  FROM public.boud_user_roles
  WHERE user_id = _user_id
    AND is_active = true
  LIMIT 1
$$;

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.boud_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_boud_companies_updated_at
    BEFORE UPDATE ON public.boud_companies
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_departments_updated_at
    BEFORE UPDATE ON public.boud_departments
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_job_positions_updated_at
    BEFORE UPDATE ON public.boud_job_positions
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_employees_updated_at
    BEFORE UPDATE ON public.boud_employees
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_job_applications_updated_at
    BEFORE UPDATE ON public.boud_job_applications
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_attendance_updated_at
    BEFORE UPDATE ON public.boud_attendance
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_leave_requests_updated_at
    BEFORE UPDATE ON public.boud_leave_requests
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_performance_evaluations_updated_at
    BEFORE UPDATE ON public.boud_performance_evaluations
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_training_programs_updated_at
    BEFORE UPDATE ON public.boud_training_programs
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_training_enrollments_updated_at
    BEFORE UPDATE ON public.boud_training_enrollments
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_disciplinary_actions_updated_at
    BEFORE UPDATE ON public.boud_disciplinary_actions
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_payroll_runs_updated_at
    BEFORE UPDATE ON public.boud_payroll_runs
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();

CREATE TRIGGER update_boud_employee_terminations_updated_at
    BEFORE UPDATE ON public.boud_employee_terminations
    FOR EACH ROW EXECUTE FUNCTION public.boud_update_updated_at_column();