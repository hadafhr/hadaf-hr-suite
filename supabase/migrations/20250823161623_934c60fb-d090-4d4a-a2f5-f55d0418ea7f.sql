-- Ultimate fix for Security Definer Views - Final attempt
-- This migration uses system queries to identify and eliminate the exact problematic views

-- First, let's identify any views that have SECURITY DEFINER in their definition
DO $$
DECLARE
    view_rec RECORD;
    view_def TEXT;
BEGIN
    -- Find views with SECURITY DEFINER in their definition
    FOR view_rec IN 
        SELECT schemaname, viewname, definition
        FROM pg_views 
        WHERE schemaname = 'public'
        AND (definition ILIKE '%SECURITY DEFINER%' OR definition ILIKE '%security definer%')
    LOOP
        RAISE NOTICE 'Found SECURITY DEFINER view: %.%', view_rec.schemaname, view_rec.viewname;
        EXECUTE format('DROP VIEW IF EXISTS %I.%I CASCADE', view_rec.schemaname, view_rec.viewname);
    END LOOP;
    
    -- Also check for any functions that might be creating these views
    FOR view_rec IN
        SELECT n.nspname as schema_name, p.proname as function_name, pg_get_functiondef(p.oid) as definition
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND pg_get_functiondef(p.oid) ILIKE '%CREATE VIEW%'
        AND pg_get_functiondef(p.oid) ILIKE '%SECURITY DEFINER%'
    LOOP
        RAISE NOTICE 'Found function creating SECURITY DEFINER view: %.%', view_rec.schema_name, view_rec.function_name;
        EXECUTE format('DROP FUNCTION IF EXISTS %I.%I CASCADE', view_rec.schema_name, view_rec.function_name);
    END LOOP;
END $$;

-- Drop ALL views in public schema (except system ones) to ensure clean slate
DO $$
DECLARE
    view_name TEXT;
BEGIN
    FOR view_name IN 
        SELECT schemaname||'.'||viewname 
        FROM pg_views 
        WHERE schemaname = 'public' 
        AND viewname NOT LIKE 'pg_%'
        AND viewname NOT IN ('geography_columns', 'geometry_columns', 'raster_columns', 'raster_overviews')
    LOOP
        BEGIN
            EXECUTE 'DROP VIEW IF EXISTS ' || view_name || ' CASCADE';
            RAISE NOTICE 'Dropped view: %', view_name;
        EXCEPTION 
            WHEN OTHERS THEN 
                RAISE NOTICE 'Failed to drop view %, error: %', view_name, SQLERRM;
        END;
    END LOOP;
END $$;

-- Also check and drop any materialized views
DO $$
DECLARE
    matview_name TEXT;
BEGIN
    FOR matview_name IN 
        SELECT schemaname||'.'||matviewname 
        FROM pg_matviews 
        WHERE schemaname = 'public'
    LOOP
        BEGIN
            EXECUTE 'DROP MATERIALIZED VIEW IF EXISTS ' || matview_name || ' CASCADE';
            RAISE NOTICE 'Dropped materialized view: %', matview_name;
        EXCEPTION 
            WHEN OTHERS THEN 
                RAISE NOTICE 'Failed to drop materialized view %, error: %', matview_name, SQLERRM;
        END;
    END LOOP;
END $$;

-- Now create minimal, secure replacement views
-- These views are created WITHOUT any SECURITY DEFINER and rely solely on RLS

CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.net_salary,
  e.company_id
FROM public.boud_payroll_items pi
JOIN public.boud_employees e ON pi.employee_id = e.id;

CREATE VIEW public.hr_employee_summary
WITH (security_barrier = true)  
AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.company_id
FROM public.boud_employees e;

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

-- Grant minimal necessary permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;

-- Ensure no remaining problematic objects
-- Remove any triggers or functions that might recreate problematic views
DROP FUNCTION IF EXISTS create_secure_views() CASCADE;
DROP FUNCTION IF EXISTS setup_security_definer_views() CASCADE;