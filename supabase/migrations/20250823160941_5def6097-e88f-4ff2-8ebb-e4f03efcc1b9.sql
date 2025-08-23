-- Fix Security Definer Views Issue
-- This migration removes SECURITY DEFINER property from views to prevent privilege escalation

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
  e.employee_id as employee_number,
  e.first_name,
  e.last_name,
  e.company_id
FROM public.boud_payroll_items pi
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
  e.company_id
FROM public.boud_employees e
WHERE 
  e.is_active = true
  -- Access control through RLS policies on underlying tables
  AND e.id IS NOT NULL;

-- Grant appropriate SELECT permissions to authenticated users
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Update functions to use SECURITY INVOKER instead of SECURITY DEFINER where appropriate
-- Fix the payroll access function to use SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.can_access_payroll_item(item_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  item_employee_id UUID;
  employee_company_id UUID;
BEGIN
  -- Get the employee for this payroll item and their company
  SELECT 
    pi.employee_id,
    e.company_id
  INTO item_employee_id, employee_company_id
  FROM boud_payroll_items pi
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE pi.id = item_id;
  
  -- Check if user has access
  RETURN (
    -- User is the employee themselves
    item_employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    OR
    -- User is payroll officer or admin in the same company
    boud_has_role(auth.uid(), employee_company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), employee_company_id, 'payroll_officer'::user_role)
  );
END;
$$;

-- Create a simple payroll summary function with SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.get_payroll_summary(p_employee_id uuid DEFAULT NULL)
RETURNS TABLE(
  employee_id uuid,
  employee_name text,
  basic_salary numeric,
  total_deductions numeric,
  net_salary numeric
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
    pi.basic_salary,
    pi.total_deductions,
    pi.net_salary
  FROM boud_payroll_items pi
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE 
    (p_employee_id IS NULL OR pi.employee_id = p_employee_id)
    AND (
      -- Employee can see own data
      e.user_id = auth.uid()
      OR
      -- HR/Admin can see company data
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
      OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
      OR boud_has_role(auth.uid(), e.company_id, 'payroll_officer'::user_role)
    );
END;
$$;