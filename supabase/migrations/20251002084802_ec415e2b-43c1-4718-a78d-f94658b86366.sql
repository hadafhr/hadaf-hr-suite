-- Create enum for manpower request reasons (skip if exists)
DO $$ BEGIN
  CREATE TYPE manpower_request_reason AS ENUM (
    'workload_increase',
    'new_project',
    'replacement',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for contract types (skip if exists)
DO $$ BEGIN
  CREATE TYPE contract_type AS ENUM (
    'permanent',
    'temporary',
    'fixed_term'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for manpower request status
DO $$ BEGIN
  CREATE TYPE manpower_request_status AS ENUM (
    'draft',
    'pending_manager',
    'pending_finance',
    'pending_hr',
    'approved',
    'rejected',
    'converted_to_job'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create manpower_requests table
CREATE TABLE IF NOT EXISTS public.manpower_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.boud_companies(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.boud_departments(id) ON DELETE SET NULL,
  requested_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Request details
  job_title TEXT NOT NULL,
  number_of_positions INTEGER NOT NULL CHECK (number_of_positions > 0),
  reason manpower_request_reason NOT NULL,
  reason_details TEXT,
  required_skills TEXT NOT NULL,
  required_experience TEXT NOT NULL,
  contract_type contract_type NOT NULL,
  employment_duration TEXT,
  proposed_salary DECIMAL(12,2),
  budget_approved BOOLEAN DEFAULT false,
  required_start_date DATE NOT NULL,
  
  -- Workflow status
  status manpower_request_status DEFAULT 'draft',
  current_approver_role TEXT,
  
  -- Manager approval
  manager_approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  manager_approved_at TIMESTAMP WITH TIME ZONE,
  manager_comments TEXT,
  
  -- Finance approval (conditional)
  finance_required BOOLEAN DEFAULT false,
  finance_approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  finance_approved_at TIMESTAMP WITH TIME ZONE,
  finance_comments TEXT,
  
  -- HR approval
  hr_approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  hr_approved_at TIMESTAMP WITH TIME ZONE,
  hr_comments TEXT,
  
  -- Final status
  rejection_reason TEXT,
  converted_to_job_id UUID,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create manpower_request_timeline table for tracking
CREATE TABLE IF NOT EXISTS public.manpower_request_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES public.manpower_requests(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.manpower_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manpower_request_timeline ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "employees_view_own_requests" ON public.manpower_requests;
DROP POLICY IF EXISTS "employees_create_requests" ON public.manpower_requests;
DROP POLICY IF EXISTS "managers_update_requests" ON public.manpower_requests;
DROP POLICY IF EXISTS "hr_manage_requests" ON public.manpower_requests;
DROP POLICY IF EXISTS "users_view_request_timeline" ON public.manpower_request_timeline;
DROP POLICY IF EXISTS "system_insert_timeline" ON public.manpower_request_timeline;

-- RLS Policies for manpower_requests
-- Employees can view their own requests
CREATE POLICY "employees_view_own_requests" ON public.manpower_requests
  FOR SELECT
  USING (
    requested_by = auth.uid()
    OR
    department_id IN (
      SELECT id FROM boud_departments 
      WHERE manager_id IN (
        SELECT id FROM boud_employees WHERE user_id = auth.uid()
      )
    )
  );

-- Employees can create requests
CREATE POLICY "employees_create_requests" ON public.manpower_requests
  FOR INSERT
  WITH CHECK (
    requested_by = auth.uid()
    AND company_id = boud_get_user_company_id(auth.uid())
  );

-- Department managers can update requests pending their approval
CREATE POLICY "managers_update_requests" ON public.manpower_requests
  FOR UPDATE
  USING (
    department_id IN (
      SELECT id FROM boud_departments 
      WHERE manager_id IN (
        SELECT id FROM boud_employees WHERE user_id = auth.uid()
      )
    )
    AND status IN ('pending_manager', 'pending_finance', 'pending_hr')
  );

-- HR managers can view and manage all company requests
CREATE POLICY "hr_manage_requests" ON public.manpower_requests
  FOR ALL
  USING (
    company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), company_id, 'super_admin'::user_role)
      OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    )
  );

-- Timeline policies
CREATE POLICY "users_view_request_timeline" ON public.manpower_request_timeline
  FOR SELECT
  USING (
    request_id IN (
      SELECT id FROM manpower_requests 
      WHERE requested_by = auth.uid()
      OR company_id = boud_get_user_company_id(auth.uid())
    )
  );

CREATE POLICY "system_insert_timeline" ON public.manpower_request_timeline
  FOR INSERT
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_manpower_request_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_manpower_request_updated_at ON public.manpower_requests;
CREATE TRIGGER update_manpower_request_updated_at
  BEFORE UPDATE ON public.manpower_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_manpower_request_timestamp();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_manpower_requests_company ON public.manpower_requests(company_id);
CREATE INDEX IF NOT EXISTS idx_manpower_requests_department ON public.manpower_requests(department_id);
CREATE INDEX IF NOT EXISTS idx_manpower_requests_status ON public.manpower_requests(status);
CREATE INDEX IF NOT EXISTS idx_manpower_requests_requested_by ON public.manpower_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_manpower_request_timeline_request ON public.manpower_request_timeline(request_id);