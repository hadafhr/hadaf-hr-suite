-- Safe fix for Security Definer Views - Focus on public schema only
-- This migration safely handles only views in the public schema

-- Drop only views in public schema (avoid system tables)
DROP VIEW IF EXISTS public.secure_payroll_summary CASCADE;
DROP VIEW IF EXISTS public.hr_employee_summary CASCADE;
DROP VIEW IF EXISTS public.employee_directory_public CASCADE;
DROP VIEW IF EXISTS public.payroll_summary CASCADE;
DROP VIEW IF EXISTS public.hr_employee_sensitive_data CASCADE;
DROP VIEW IF EXISTS public.hr_employee_financial_data CASCADE;
DROP VIEW IF EXISTS public.employee_payroll_view CASCADE;
DROP VIEW IF EXISTS public.secure_employee_view CASCADE;
DROP VIEW IF EXISTS public.user_permissions CASCADE;
DROP VIEW IF EXISTS public.secure_permissions CASCADE;
DROP VIEW IF EXISTS public.admin_summary CASCADE;
DROP VIEW IF EXISTS public.system_summary CASCADE;
DROP VIEW IF EXISTS public.audit_summary CASCADE;

-- Drop materialized views in public schema only
DROP MATERIALIZED VIEW IF EXISTS public.employee_stats CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.payroll_stats CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.hr_dashboard_stats CASCADE;

-- Create secure replacement views without SECURITY DEFINER
-- These views use security_barrier and rely on RLS of underlying tables

-- 1. Minimal payroll summary
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.net_salary
FROM public.boud_payroll_items pi;

-- 2. Minimal employee summary
CREATE VIEW public.hr_employee_summary
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name
FROM public.boud_employees e;

-- 3. Minimal employee directory
CREATE VIEW public.employee_directory_public
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name
FROM public.boud_employees e
WHERE e.is_active = true;

-- Grant minimal permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Update any functions that might have SECURITY DEFINER issues
-- Fix functions to use SECURITY INVOKER where appropriate
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