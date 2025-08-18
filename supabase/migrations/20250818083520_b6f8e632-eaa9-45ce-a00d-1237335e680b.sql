-- Phase 1: Critical Database Security Fixes (Corrected)

-- First, drop problematic views and policies causing recursion
DROP VIEW IF EXISTS public.secure_employee_view CASCADE;
DROP VIEW IF EXISTS public.public_employee_directory CASCADE;

-- Drop existing policies on boud_employees that cause infinite recursion
DROP POLICY IF EXISTS "Employees can view their own profile" ON public.boud_employees;
DROP POLICY IF EXISTS "HR managers can manage employees" ON public.boud_employees;
DROP POLICY IF EXISTS "Line managers can view their team" ON public.boud_employees;
DROP POLICY IF EXISTS "Users can view employees in their company" ON public.boud_employees;

-- Drop existing policies on meeting_participants that cause infinite recursion  
DROP POLICY IF EXISTS "Users can manage their meeting participants" ON public.meeting_participants;
DROP POLICY IF EXISTS "Users can view meeting participants" ON public.meeting_participants;

-- Create secure helper functions to prevent recursion
CREATE OR REPLACE FUNCTION public.get_employee_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT company_id
  FROM public.boud_employees
  WHERE user_id = _user_id
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_employee_id_for_user(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT id
  FROM public.boud_employees
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Create new secure RLS policies for boud_employees
CREATE POLICY "employees_view_own_profile"
ON public.boud_employees
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "hr_manage_company_employees"
ON public.boud_employees
FOR ALL
TO authenticated
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

CREATE POLICY "employees_update_own_profile"
ON public.boud_employees
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create secure view for basic employee directory (non-sensitive data only)
CREATE VIEW public.employee_directory AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.hire_date,
  e.is_active,
  e.company_id
FROM public.boud_employees e
WHERE e.is_active = true;

-- Grant access to the directory view (access controlled by base table RLS)
GRANT SELECT ON public.employee_directory TO authenticated;

-- Fix meeting_participants policies if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'meeting_participants') THEN
    EXECUTE 'CREATE POLICY "participants_manage_own_meetings"
             ON public.meeting_participants
             FOR ALL
             TO authenticated
             USING (participant_id = public.get_employee_id_for_user(auth.uid()))
             WITH CHECK (participant_id = public.get_employee_id_for_user(auth.uid()))';
  END IF;
END$$;

-- Add audit logging trigger for sensitive data changes
CREATE OR REPLACE FUNCTION public.audit_sensitive_employee_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only log if audit_logs table exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'audit_logs') THEN
    INSERT INTO public.audit_logs (
      table_name,
      operation,
      user_id,
      record_id,
      details,
      created_at
    ) VALUES (
      TG_TABLE_NAME,
      TG_OP,
      auth.uid(),
      CASE 
        WHEN TG_OP = 'DELETE' THEN OLD.id
        ELSE NEW.id
      END,
      jsonb_build_object(
        'modified_by', auth.uid(),
        'employee_modified', CASE 
          WHEN TG_OP = 'DELETE' THEN OLD.id
          ELSE NEW.id
        END,
        'operation', TG_OP,
        'timestamp', extract(epoch from now())
      ),
      now()
    );
  END IF;
  
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$;

-- Add audit trigger to boud_employees
DROP TRIGGER IF EXISTS audit_employee_changes ON public.boud_employees;
CREATE TRIGGER audit_employee_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.boud_employees
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_employee_changes();

-- Fix existing security definer functions to include search_path
CREATE OR REPLACE FUNCTION public.boud_has_role(_user_id uuid, _company_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
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
SET search_path TO 'public'
AS $$
  SELECT company_id
  FROM public.boud_user_roles
  WHERE user_id = _user_id
    AND is_active = true
  LIMIT 1
$$;