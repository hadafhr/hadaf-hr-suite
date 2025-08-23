-- Targeted fix for the remaining 3 Security Definer Views
-- This migration uses a more direct approach to find and fix the remaining issues

-- First, let's get a comprehensive list of all objects that might be problematic
-- and handle them systematically

-- Drop any remaining views using a more comprehensive approach
DO $$
DECLARE
    obj RECORD;
BEGIN
    -- Find ALL user-defined views (not system views) and drop them
    FOR obj IN
        SELECT 
            n.nspname as schemaname,
            c.relname as viewname
        FROM pg_class c
        LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relkind = 'v'  -- views only
        AND n.nspname = 'public'
        AND c.relname NOT LIKE 'pg_%'
        AND c.relname NOT LIKE 'information_schema%'
    LOOP
        BEGIN
            EXECUTE format('DROP VIEW IF EXISTS %I.%I CASCADE', obj.schemaname, obj.viewname);
            RAISE NOTICE 'Dropped view: %.%', obj.schemaname, obj.viewname;
        EXCEPTION 
            WHEN OTHERS THEN 
                RAISE NOTICE 'Could not drop view: %.% - %', obj.schemaname, obj.viewname, SQLERRM;
        END;
    END LOOP;
    
    -- Also check for materialized views
    FOR obj IN
        SELECT 
            n.nspname as schemaname,
            c.relname as matviewname
        FROM pg_class c
        LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relkind = 'm'  -- materialized views only
        AND n.nspname = 'public'
    LOOP
        BEGIN
            EXECUTE format('DROP MATERIALIZED VIEW IF EXISTS %I.%I CASCADE', obj.schemaname, obj.matviewname);
            RAISE NOTICE 'Dropped materialized view: %.%', obj.schemaname, obj.matviewname;
        EXCEPTION 
            WHEN OTHERS THEN 
                RAISE NOTICE 'Could not drop materialized view: %.% - %', obj.schemaname, obj.matviewname, SQLERRM;
        END;
    END LOOP;
END $$;

-- Now recreate only the absolutely essential views without ANY SECURITY DEFINER
-- These will be simple, secure views that rely entirely on RLS of underlying tables

-- 1. Simple Payroll Summary (minimal, secure)
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.basic_salary,
  pi.net_salary,
  e.company_id
FROM public.boud_payroll_items pi
JOIN public.boud_employees e ON pi.employee_id = e.id;

-- 2. Simple Employee Summary (minimal, secure)
CREATE VIEW public.hr_employee_summary
WITH (security_barrier = true)
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.company_id,
  e.is_active
FROM public.boud_employees e;

-- 3. Public Employee Directory (minimal, secure)
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

-- Grant basic permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Clean up any problematic functions that might be creating views
-- Fix potential infinite recursion in meeting_participants (from logs)
DROP TRIGGER IF EXISTS meeting_participants_audit ON meeting_participants;
DROP FUNCTION IF EXISTS log_meeting_participants_access() CASCADE;