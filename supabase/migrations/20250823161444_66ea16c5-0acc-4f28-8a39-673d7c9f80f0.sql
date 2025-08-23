-- Final comprehensive fix for Security Definer Views and infinite recursion
-- This addresses remaining security issues

-- First, fix the infinite recursion in meeting_participants RLS policy
-- Drop and recreate the problematic policy

DROP POLICY IF EXISTS "Users can view meetings they participate in" ON public.meeting_participants;
DROP POLICY IF EXISTS "Users can view their meeting participations" ON public.meeting_participants;

-- Create a security definer function to safely check meeting participation
CREATE OR REPLACE FUNCTION public.user_participates_in_meeting(meeting_id_param uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM meeting_participants 
    WHERE meeting_id = meeting_id_param AND user_id = auth.uid()
  );
$$;

-- Create safe RLS policy for meeting_participants without recursion
CREATE POLICY "Users can manage their meeting participations"
ON public.meeting_participants
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Now handle any remaining SECURITY DEFINER views
-- Check for system views that might be causing issues

-- Drop any remaining problematic views in a targeted way
DROP VIEW IF EXISTS public.user_meeting_view CASCADE;
DROP VIEW IF EXISTS public.meeting_summary_view CASCADE;
DROP VIEW IF EXISTS public.participant_summary_view CASCADE;

-- Query to find and drop any views we might have missed
DO $$
DECLARE
    view_record RECORD;
BEGIN
    -- Find views that might have SECURITY DEFINER in their definition
    FOR view_record IN 
        SELECT 
            schemaname, 
            viewname,
            definition
        FROM pg_views 
        WHERE schemaname = 'public'
        AND (definition ILIKE '%security definer%' OR definition ILIKE '%security_definer%')
    LOOP
        BEGIN
            EXECUTE format('DROP VIEW IF EXISTS %I.%I CASCADE', view_record.schemaname, view_record.viewname);
            RAISE NOTICE 'Dropped view: %.%', view_record.schemaname, view_record.viewname;
        EXCEPTION 
            WHEN OTHERS THEN 
                RAISE NOTICE 'Could not drop view: %.% - %', view_record.schemaname, view_record.viewname, SQLERRM;
        END;
    END LOOP;
END $$;

-- Recreate essential views without any SECURITY DEFINER
CREATE VIEW public.secure_payroll_summary
WITH (security_barrier = true)
AS
SELECT 
  pi.id,
  pi.employee_id,
  pi.basic_salary,
  pi.net_salary,
  e.employee_id as employee_number,
  e.first_name,
  e.last_name,
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
  e.company_id,
  e.is_active
FROM public.boud_employees e;

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

-- Grant permissions
GRANT SELECT ON public.secure_payroll_summary TO authenticated;
GRANT SELECT ON public.hr_employee_summary TO authenticated;
GRANT SELECT ON public.employee_directory_public TO authenticated;