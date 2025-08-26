-- Fix Security Definer View issues by dropping problematic views
-- These views bypass RLS policies and should be replaced with proper table-level RLS

-- Drop the security definer views that are flagged by the linter
DROP VIEW IF EXISTS public.secure_payroll_summary;
DROP VIEW IF EXISTS public.hr_employee_summary;
DROP VIEW IF EXISTS public.employee_directory_public;

-- Note: The underlying tables (boud_payroll_items, boud_employees) already have proper RLS policies
-- Applications should query the tables directly with proper RLS enforcement
-- If specific views are needed for performance, they should be recreated without SECURITY DEFINER

-- Ensure RLS is properly enabled on the underlying tables (they should already be enabled)
-- This is just a safety check
ALTER TABLE public.boud_payroll_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_employees ENABLE ROW LEVEL SECURITY;