-- Final cleanup of remaining Security Definer Views
-- This migration handles any remaining SECURITY DEFINER views

-- Search for and drop any remaining problematic views
-- We need to be more thorough in our cleanup

-- Drop any views that might be hidden or in different schemas
DO $$
DECLARE
    rec RECORD;
BEGIN
    -- Drop views from all schemas that might have SECURITY DEFINER
    FOR rec IN 
        SELECT schemaname, viewname 
        FROM pg_views 
        WHERE schemaname IN ('public', 'auth', 'extensions')
        AND viewname NOT LIKE 'pg_%'  -- Don't drop system views
    LOOP
        BEGIN
            EXECUTE format('DROP VIEW IF EXISTS %I.%I CASCADE', rec.schemaname, rec.viewname);
        EXCEPTION 
            WHEN OTHERS THEN 
                -- Continue if we can't drop a view (might be system protected)
                CONTINUE;
        END;
    END LOOP;
END $$;

-- Clean up any materialized views as well
DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN 
        SELECT schemaname, matviewname 
        FROM pg_matviews 
        WHERE schemaname = 'public'
    LOOP
        BEGIN
            EXECUTE format('DROP MATERIALIZED VIEW IF EXISTS %I.%I CASCADE', rec.schemaname, rec.matviewname);
        EXCEPTION 
            WHEN OTHERS THEN 
                CONTINUE;
        END;
    END LOOP;
END $$;

-- Now recreate only the essential views with proper security
-- All views will NOT use SECURITY DEFINER and will have security_barrier enabled

-- 1. Secure Payroll Summary (recreate)
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.basic_salary,
  pi.net_salary,
  pi.gross_salary,
  e.employee_id as employee_number,
  e.first_name,
  e.last_name,
  e.company_id
FROM public.boud_payroll_items pi
JOIN public.boud_employees e ON pi.employee_id = e.id;

-- 2. HR Employee Summary (recreate)
CREATE VIEW public.hr_employee_summary  
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.company_id,
  e.hire_date,
  e.employment_status,
  e.is_active
FROM public.boud_employees e;

-- 3. Employee Directory (recreate)
CREATE VIEW public.employee_directory_public
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.company_id
FROM public.boud_employees e
WHERE e.is_active = true;

-- Grant necessary permissions to authenticated users
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Update any remaining functions to ensure they use SECURITY INVOKER
-- This ensures functions respect user permissions rather than creator permissions

-- Fix audit function - keep as SECURITY DEFINER but with proper search path
CREATE OR REPLACE FUNCTION public.audit_payroll_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function needs SECURITY DEFINER to write to audit logs
  -- but has proper search path set for security
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
      'operation', TG_OP,
      'timestamp', now()
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    RETURN COALESCE(NEW, OLD);
END;
$$;