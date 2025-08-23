-- Fix Security Definer Views Issue
-- This migration removes SECURITY DEFINER property from views to prevent privilege escalation

-- First, let's identify and drop any views with SECURITY DEFINER
-- Common views that might have this issue include payroll summaries and employee sensitive data views

-- Drop existing problematic views if they exist
DROP VIEW IF EXISTS public.secure_payroll_summary;
DROP VIEW IF EXISTS public.hr_employee_summary;
DROP VIEW IF EXISTS public.employee_directory_public;

-- Recreate views without SECURITY DEFINER and with proper security barriers
-- Secure Payroll Summary View (without SECURITY DEFINER)
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.payroll_run_id,
  pi.basic_salary,
  pi.net_salary,
  pi.gross_salary,
  pi.total_deductions,
  pr.pay_period_start,
  pr.pay_period_end,
  pr.company_id,
  e.employee_id as employee_number,
  e.first_name,
  e.last_name
FROM public.boud_payroll_items pi
JOIN public.boud_payroll_runs pr ON pi.payroll_run_id = pr.id
JOIN public.boud_employees e ON pi.employee_id = e.id
WHERE 
  -- Access control through RLS policies on underlying tables
  pi.id IS NOT NULL;

-- HR Employee Summary View (without SECURITY DEFINER)
CREATE VIEW public.hr_employee_summary
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.phone,
  e.position_id,
  e.department_id,
  e.company_id,
  e.hire_date,
  e.employment_status,
  e.basic_salary,
  e.is_active,
  e.created_at,
  e.updated_at
FROM public.boud_employees e
WHERE 
  -- Access control through RLS policies on underlying tables
  e.id IS NOT NULL;

-- Employee Directory Public View (without SECURITY DEFINER)
CREATE VIEW public.employee_directory_public
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  d.name as department_name,
  p.title as position_title,
  e.company_id
FROM public.boud_employees e
LEFT JOIN public.boud_departments d ON e.department_id = d.id
LEFT JOIN public.boud_positions p ON e.position_id = p.id
WHERE 
  e.is_active = true
  -- Access control through RLS policies on underlying tables
  AND e.id IS NOT NULL;

-- Grant appropriate SELECT permissions to authenticated users
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Update any functions that might be using SECURITY DEFINER inappropriately
-- Fix the payroll access function to use SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.can_access_payroll_item(item_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  item_company_id UUID;
  item_employee_id UUID;
BEGIN
  -- Get the company and employee for this payroll item
  SELECT 
    pr.company_id,
    pi.employee_id
  INTO item_company_id, item_employee_id
  FROM boud_payroll_items pi
  JOIN boud_payroll_runs pr ON pi.payroll_run_id = pr.id
  WHERE pi.id = item_id;
  
  -- Check if user has access
  RETURN (
    -- User is the employee themselves
    item_employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    OR
    -- User is payroll officer or admin in the same company
    boud_has_role(auth.uid(), item_company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), item_company_id, 'payroll_officer'::user_role)
  );
END;
$$;

-- Fix get_payroll_summary function to use SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.get_payroll_summary(p_employee_id uuid DEFAULT NULL, p_company_id uuid DEFAULT NULL)
RETURNS TABLE(
  employee_id uuid,
  employee_name text,
  total_salary numeric,
  total_deductions numeric,
  net_salary numeric,
  pay_period text
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pi.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) as employee_name,
    pi.gross_salary,
    pi.total_deductions,
    pi.net_salary,
    CONCAT(pr.pay_period_start::text, ' - ', pr.pay_period_end::text) as pay_period
  FROM boud_payroll_items pi
  JOIN boud_payroll_runs pr ON pi.payroll_run_id = pr.id
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE 
    (p_employee_id IS NULL OR pi.employee_id = p_employee_id)
    AND (p_company_id IS NULL OR pr.company_id = p_company_id)
    AND (
      -- Employee can see own data
      e.user_id = auth.uid()
      OR
      -- HR/Admin can see company data
      boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role)
      OR boud_has_role(auth.uid(), pr.company_id, 'hr_manager'::user_role)
      OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role)
    );
END;
$$;

-- Keep audit function as SECURITY DEFINER since it needs elevated privileges for logging
-- But ensure it has proper search path set
CREATE OR REPLACE FUNCTION public.audit_payroll_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log all payroll data modifications
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'boud_payroll_items',
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'user_id', auth.uid(),
      'employee_id', COALESCE(NEW.employee_id, OLD.employee_id),
      'payroll_run_id', COALESCE(NEW.payroll_run_id, OLD.payroll_run_id),
      'operation', TG_OP,
      'net_salary_accessed', COALESCE(NEW.net_salary, OLD.net_salary),
      'basic_salary_accessed', COALESCE(NEW.basic_salary, OLD.basic_salary),
      'security_classification', 'sensitive_payroll_data',
      'timestamp', now()
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the operation if logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$;