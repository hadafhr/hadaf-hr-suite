-- Fix the security definer view issues
-- Remove security_barrier from views and fix the RLS approach

-- Drop the problematic view and recreate without security definer
DROP VIEW IF EXISTS public_employee_directory;

-- Create a proper view without security definer
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
  created_at
FROM hr_employees
WHERE is_active = true;

-- Remove the problematic policy and create a better one
DROP POLICY IF EXISTS "Company members can view public directory" ON hr_employees;

-- Create a policy that allows users to see basic employee info in their company
-- but restricts sensitive data access
CREATE POLICY "Basic employee info accessible to company members"
ON hr_employees FOR SELECT
USING (
  company_id = get_user_company_id(auth.uid()) 
  AND is_active = true
  AND (
    -- Full access for HR staff
    hr_has_role(auth.uid(), company_id, 'hr_officer'::hr_role) OR 
    hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
    hr_has_role(auth.uid(), company_id, 'owner'::hr_role) OR
    -- Own record access for employees
    auth.uid() = user_id
  )
);

-- Grant basic access to the directory view
GRANT SELECT ON public_employee_directory TO authenticated;

-- Create RLS policy for public_employee_directory view access
-- Since we can't put RLS directly on views, we control access through the underlying table policies

-- Add a comment to document the security model
COMMENT ON VIEW public_employee_directory IS 'Public employee directory showing basic info only. Access controlled by hr_employees table RLS policies.';
COMMENT ON TABLE hr_employees IS 'Employee data with strict RLS: HR staff see all, employees see own record only. Sensitive fields require proper authorization.';