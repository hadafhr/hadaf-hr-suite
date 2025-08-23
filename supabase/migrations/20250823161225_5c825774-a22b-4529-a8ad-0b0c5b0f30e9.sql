-- Fix the function conflict and complete Security Definer Views fix
-- Drop existing function first, then recreate

-- Drop the problematic function
DROP FUNCTION IF EXISTS public.get_payroll_summary(uuid);

-- Drop all views with SECURITY DEFINER (comprehensive approach)
DO $$
DECLARE
    view_name TEXT;
BEGIN
    FOR view_name IN
        SELECT schemaname||'.'||viewname as full_name
        FROM pg_views 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || view_name || ' CASCADE';
    END LOOP;
END $$;

-- Recreate essential views without SECURITY DEFINER
-- These views use security_barrier to ensure proper RLS enforcement

-- 1. Secure Payroll Summary
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.basic_salary,
  pi.net_salary,
  pi.gross_salary,
  pi.total_deductions,
  e.employee_id as employee_number,
  e.first_name,
  e.last_name,
  e.company_id
FROM public.boud_payroll_items pi
JOIN public.boud_employees e ON pi.employee_id = e.id;

-- 2. HR Employee Summary  
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
  e.department_id,
  e.company_id,
  e.hire_date,
  e.employment_status,
  e.is_active
FROM public.boud_employees e;

-- 3. Employee Directory Public
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
WHERE e.is_active = true;

-- Grant SELECT permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Recreate the payroll summary function with SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.get_payroll_summary(p_employee_id uuid DEFAULT NULL)
RETURNS TABLE(
  employee_id uuid,
  employee_name text,
  basic_salary numeric,
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
    pi.net_salary
  FROM boud_payroll_items pi
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE 
    (p_employee_id IS NULL OR pi.employee_id = p_employee_id)
    AND (
      e.user_id = auth.uid()
      OR
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
      OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
      OR boud_has_role(auth.uid(), e.company_id, 'payroll_officer'::user_role)
    );
END;
$$;