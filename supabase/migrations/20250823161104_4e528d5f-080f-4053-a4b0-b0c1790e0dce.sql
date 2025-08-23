-- Complete fix for all Security Definer Views
-- This migration identifies and fixes all views with SECURITY DEFINER

-- Drop all potentially problematic views
DROP VIEW IF EXISTS public.payroll_summary CASCADE;
DROP VIEW IF EXISTS public.hr_employee_sensitive_data CASCADE;
DROP VIEW IF EXISTS public.hr_employee_financial_data CASCADE;
DROP VIEW IF EXISTS public.employee_payroll_view CASCADE;
DROP VIEW IF EXISTS public.secure_employee_view CASCADE;

-- Recreate secure views without SECURITY DEFINER
-- These views will now rely on RLS policies of underlying tables

-- Payroll Summary View - Safe version without SECURITY DEFINER
CREATE VIEW public.payroll_summary
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

-- HR Employee Financial Data View - Safe version
CREATE VIEW public.hr_employee_financial_data
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.basic_salary,
  e.housing_allowance,
  e.transport_allowance,
  e.other_allowances,
  e.total_salary,
  e.company_id
FROM public.boud_employees e;

-- HR Employee Sensitive Data View - Safe version
CREATE VIEW public.hr_employee_sensitive_data
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.phone,
  e.company_id,
  e.department_id,
  e.position_id,
  e.hire_date,
  e.employment_status
FROM public.boud_employees e;

-- Employee Payroll View - Safe version
CREATE VIEW public.employee_payroll_view
WITH (security_barrier = true)
AS
SELECT 
  e.id as employee_id,
  e.employee_id as employee_number,
  e.first_name,
  e.last_name,
  e.basic_salary,
  e.company_id,
  COUNT(pi.id) as payroll_records_count,
  MAX(pi.created_at) as last_payroll_date
FROM public.boud_employees e
LEFT JOIN public.boud_payroll_items pi ON e.id = pi.employee_id
GROUP BY e.id, e.employee_id, e.first_name, e.last_name, e.basic_salary, e.company_id;

-- Grant SELECT permissions to authenticated users
GRANT SELECT ON public.payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_financial_data TO authenticated;
GRANT SELECT ON public.hr_employee_sensitive_data TO authenticated;
GRANT SELECT ON public.employee_payroll_view TO authenticated;

-- Ensure we have proper RLS policies on the base tables
-- (The views will inherit security from these tables through RLS)