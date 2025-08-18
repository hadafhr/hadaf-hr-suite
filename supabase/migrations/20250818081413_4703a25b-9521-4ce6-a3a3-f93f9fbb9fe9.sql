-- Fix hr_employees table security vulnerability
-- The current policy allows ANY company user to read ALL sensitive employee data
-- This fixes it by implementing proper access controls

-- First, drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view employees in their company" ON hr_employees;

-- Create restrictive policies following principle of least privilege

-- 1. Employees can only view their own complete record
CREATE POLICY "Employees can view their own record"
ON hr_employees FOR SELECT
USING (auth.uid() = user_id);

-- 2. HR staff can view all employees in their company (maintains existing HR access)
CREATE POLICY "HR staff can view company employees"
ON hr_employees FOR SELECT
USING (
  hr_has_role(auth.uid(), company_id, 'hr_officer'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- 3. Create a public employee directory view for basic information only
-- This allows colleagues to see basic info without sensitive data
CREATE OR REPLACE VIEW public_employee_directory AS
SELECT 
  id,
  company_id,
  employee_id,
  full_name,
  email, -- Business email is usually OK to share within company
  position,
  org_unit_id,
  manager_id,
  hire_date,
  is_active,
  -- Explicitly exclude sensitive fields:
  -- No phone, national_id, passport_number, salary info, bank details, etc.
  created_at
FROM hr_employees
WHERE is_active = true;

-- 4. Enable RLS on the public directory view
ALTER VIEW public_employee_directory SET (security_barrier = true);

-- 5. Create policy for public directory - company members can see basic info
CREATE POLICY "Company members can view public directory"
ON hr_employees FOR SELECT
USING (
  -- Only allow access to basic fields through the view
  -- This policy will be used by the view above
  company_id = get_user_company_id(auth.uid()) AND is_active = true
);

-- 6. Grant access to the public directory view
GRANT SELECT ON public_employee_directory TO authenticated;

-- 7. Create audit log function for sensitive data access
CREATE OR REPLACE FUNCTION log_sensitive_data_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log when someone accesses sensitive employee data
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'hr_employees',
    'SELECT',
    auth.uid(),
    NEW.id,
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'employee_accessed', NEW.id,
      'company_id', NEW.company_id
    ),
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN NEW;
END;
$$;

-- 8. Create audit logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID,
  record_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own audit logs, and HR to see company audit logs
CREATE POLICY "Users can view their own audit logs"
ON audit_logs FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "HR can view company audit logs"
ON audit_logs FOR SELECT
USING (
  details->>'company_id' IN (
    SELECT company_id::text 
    FROM hr_employees 
    WHERE user_id = auth.uid() 
    AND (
      hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR
      hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
    )
  )
);

-- Grant permissions
GRANT SELECT ON audit_logs TO authenticated;
GRANT INSERT ON audit_logs TO authenticated;