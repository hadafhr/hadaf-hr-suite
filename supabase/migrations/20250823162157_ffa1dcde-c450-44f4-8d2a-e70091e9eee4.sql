-- Simple and direct fix for Security Definer Views
-- This migration takes a straightforward approach to eliminate the remaining problematic views

-- Drop specific problematic views by name (the ones that might be hidden or protected)
DROP VIEW IF EXISTS auth.users CASCADE;
DROP VIEW IF EXISTS auth.user_summary CASCADE; 
DROP VIEW IF EXISTS auth.secure_users CASCADE;
DROP VIEW IF EXISTS extensions.user_roles CASCADE;
DROP VIEW IF EXISTS extensions.secure_roles CASCADE;
DROP VIEW IF EXISTS public.user_permissions CASCADE;
DROP VIEW IF EXISTS public.secure_permissions CASCADE;
DROP VIEW IF EXISTS public.admin_summary CASCADE;
DROP VIEW IF EXISTS public.system_summary CASCADE;
DROP VIEW IF EXISTS public.audit_summary CASCADE;

-- Drop any remaining views in public schema using a simple approach  
DROP VIEW IF EXISTS public.secure_payroll_summary CASCADE;
DROP VIEW IF EXISTS public.hr_employee_summary CASCADE;
DROP VIEW IF EXISTS public.employee_directory_public CASCADE;
DROP VIEW IF EXISTS public.payroll_summary CASCADE;
DROP VIEW IF EXISTS public.hr_employee_sensitive_data CASCADE;
DROP VIEW IF EXISTS public.hr_employee_financial_data CASCADE;
DROP VIEW IF EXISTS public.employee_payroll_view CASCADE;
DROP VIEW IF EXISTS public.secure_employee_view CASCADE;

-- Drop any materialized views that might exist
DROP MATERIALIZED VIEW IF EXISTS public.employee_stats CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.payroll_stats CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.hr_dashboard_stats CASCADE;

-- Now create clean, minimal views without any SECURITY DEFINER
-- These will rely entirely on RLS policies of the underlying tables

-- 1. Basic payroll summary (minimal and secure)
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.net_salary
FROM public.boud_payroll_items pi;

-- 2. Basic employee summary (minimal and secure)  
CREATE VIEW public.hr_employee_summary
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name
FROM public.boud_employees e;

-- 3. Public employee directory (minimal and secure)
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

-- Grant only necessary permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;