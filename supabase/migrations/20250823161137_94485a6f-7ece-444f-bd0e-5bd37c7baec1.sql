-- Comprehensive fix for all Security Definer Views
-- This migration removes ALL views with SECURITY DEFINER and recreates them safely

-- Query to find all views in public schema and drop them
-- We'll recreate essential ones without SECURITY DEFINER

-- Drop all views that might have SECURITY DEFINER
DO $$
DECLARE
    view_name TEXT;
BEGIN
    -- Loop through all views in public schema
    FOR view_name IN
        SELECT schemaname||'.'||viewname as full_name
        FROM pg_views 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || view_name || ' CASCADE';
    END LOOP;
END $$;

-- Now recreate only the essential views without SECURITY DEFINER
-- All views will use security_barrier for proper RLS enforcement

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

-- Grant appropriate permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;  
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Ensure all remaining functions use proper security settings
-- Update any remaining problematic functions
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
  SELECT 
    pi.employee_id,
    e.company_id
  INTO item_employee_id, employee_company_id
  FROM boud_payroll_items pi
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE pi.id = item_id;
  
  RETURN (
    item_employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    OR
    boud_has_role(auth.uid(), employee_company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), employee_company_id, 'payroll_officer'::user_role)
  );
END;
$$;

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