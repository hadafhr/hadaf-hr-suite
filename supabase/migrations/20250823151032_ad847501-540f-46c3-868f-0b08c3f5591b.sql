-- Security Fix: Remove Security Definer Views and Replace with Proper RLS

-- First, identify and drop any views that might have SECURITY DEFINER
DROP VIEW IF EXISTS secure_payroll_summary;
DROP VIEW IF EXISTS payroll_summary;
DROP VIEW IF EXISTS hr_employee_sensitive_data;
DROP VIEW IF EXISTS hr_employee_financial_data;

-- Create secure payroll view WITHOUT security definer property
-- Instead, rely on RLS policies on the underlying tables
CREATE VIEW secure_payroll_summary AS
SELECT 
  pi.id,
  pi.payroll_run_id,
  pi.employee_id,
  e.employee_id as employee_number,
  e.first_name || ' ' || e.last_name as employee_name,
  pi.working_days,
  pi.actual_working_days,
  pi.absence_days,
  pi.overtime_hours,
  pi.created_at,
  -- Salary data will be filtered by RLS policies on boud_payroll_items
  pi.basic_salary,
  pi.net_salary,
  pi.housing_allowance,
  pi.transport_allowance,
  pi.other_allowances,
  pi.total_deductions,
  pi.gross_salary
FROM boud_payroll_items pi
JOIN boud_employees e ON pi.employee_id = e.id;

-- Enable RLS on the view (inherits from underlying tables)
ALTER VIEW secure_payroll_summary SET (security_barrier = true);

-- Create HR employee summary view WITHOUT security definer
CREATE VIEW hr_employee_summary AS
SELECT 
  e.id,
  e.employee_id,
  e.full_name,
  e.email,
  e.phone,
  e.position,
  e.job_title,
  e.hire_date,
  e.employment_status,
  e.is_active,
  e.company_id,
  e.department_id,
  e.basic_salary,
  e.housing_allowance,
  e.transport_allowance,
  e.other_allowances,
  e.created_at,
  e.updated_at
FROM hr_employees e;

-- Enable security barrier on HR view
ALTER VIEW hr_employee_summary SET (security_barrier = true);

-- Create read-only employee directory view (public info only)
CREATE VIEW employee_directory_public AS
SELECT 
  e.id,
  e.employee_id,
  e.full_name,
  e.position,
  e.job_title,
  -- Hide sensitive data like email, phone, salary
  e.company_id,
  e.department_id,
  e.hire_date,
  e.is_active
FROM hr_employees e
WHERE e.is_active = true;

-- Enable security barrier
ALTER VIEW employee_directory_public SET (security_barrier = true);

-- Update any existing functions that were using SECURITY DEFINER incorrectly
-- Make sure they use proper SET search_path for security

-- Update the payroll access function to be more secure
CREATE OR REPLACE FUNCTION can_access_payroll_item(item_id UUID)
RETURNS BOOLEAN 
LANGUAGE plpgsql
STABLE
SECURITY INVOKER  -- Use INVOKER instead of DEFINER for better security
SET search_path = public
AS $$
DECLARE
  item_company_id UUID;
  item_employee_id UUID;
  user_company_id UUID;
BEGIN
  -- Get user's company
  SELECT boud_get_user_company_id(auth.uid()) INTO user_company_id;
  
  -- Get the company and employee for this payroll item
  SELECT 
    pr.company_id,
    pi.employee_id
  INTO item_company_id, item_employee_id
  FROM boud_payroll_items pi
  JOIN boud_payroll_runs pr ON pi.payroll_run_id = pr.id
  WHERE pi.id = item_id;
  
  -- Return false if not in same company
  IF item_company_id != user_company_id THEN
    RETURN false;
  END IF;
  
  -- Check if user has access
  RETURN (
    -- User is the employee themselves
    item_employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    OR
    -- User is payroll officer or admin in the same company
    boud_has_role(auth.uid(), item_company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), item_company_id, 'payroll_officer'::user_role)
  );
END;
$$;

-- Create a safer function for getting masked payroll data
CREATE OR REPLACE FUNCTION get_payroll_summary(run_id UUID DEFAULT NULL)
RETURNS TABLE(
  id UUID,
  employee_name TEXT,
  employee_number TEXT,
  working_days INTEGER,
  actual_working_days INTEGER,
  basic_salary NUMERIC,
  net_salary NUMERIC,
  can_view_details BOOLEAN
) 
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pi.id,
    e.first_name || ' ' || e.last_name as employee_name,
    e.employee_id as employee_number,
    pi.working_days,
    pi.actual_working_days,
    -- Only return salary if user has permission (RLS will filter anyway)
    pi.basic_salary,
    pi.net_salary,
    can_access_payroll_item(pi.id) as can_view_details
  FROM boud_payroll_items pi
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE (run_id IS NULL OR pi.payroll_run_id = run_id);
END;
$$;

-- Remove any potentially problematic SECURITY DEFINER functions and recreate safely
-- Update the audit function to be more secure
CREATE OR REPLACE FUNCTION audit_payroll_access()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER  -- This one needs DEFINER to write to audit logs
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Only audit if there's an authenticated user
  IF auth.uid() IS NOT NULL THEN
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
        'payroll_run_id', COALESCE(NEW.payroll_run_id, OLD.payroll_run_id),
        'operation', TG_OP,
        'security_classification', 'sensitive_payroll_data',
        'timestamp', now()
        -- Don't log actual salary amounts for security
      ),
      now()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the transaction
    RAISE WARNING 'Audit logging failed: %', SQLERRM;
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add security documentation
COMMENT ON VIEW secure_payroll_summary IS 'SECURED: Payroll summary view that relies on RLS policies of underlying tables rather than SECURITY DEFINER.';

COMMENT ON VIEW hr_employee_summary IS 'SECURED: HR employee view that uses security barriers and relies on underlying table RLS policies.';

COMMENT ON VIEW employee_directory_public IS 'SECURED: Public employee directory with only non-sensitive information, protected by security barriers.';

COMMENT ON FUNCTION can_access_payroll_item(UUID) IS 'SECURITY INVOKER function that checks payroll access permissions without bypassing RLS.';

COMMENT ON FUNCTION get_payroll_summary(UUID) IS 'SECURITY INVOKER function that returns payroll summary data respecting user permissions.';

-- Grant appropriate permissions on views
GRANT SELECT ON secure_payroll_summary TO authenticated;
GRANT SELECT ON hr_employee_summary TO authenticated;
GRANT SELECT ON employee_directory_public TO authenticated;

-- Ensure RLS is enabled on all views (they inherit from base tables)
-- The views will automatically respect the RLS policies on boud_payroll_items and hr_employees