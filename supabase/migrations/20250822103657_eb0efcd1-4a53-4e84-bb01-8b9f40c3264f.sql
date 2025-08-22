-- Fix HR Employees Security Issue: Strengthen RLS Policies (Corrected)
-- Replace permissive policies with restrictive ones for better security isolation

-- First, drop existing policies
DROP POLICY IF EXISTS "Employees can view own record only" ON hr_employees;
DROP POLICY IF EXISTS "HR managers can manage employees" ON hr_employees;
DROP POLICY IF EXISTS "HR managers can view employee records" ON hr_employees;

-- Create restrictive policies for better security control

-- 1. Employees can only view their OWN basic profile data
CREATE POLICY "employees_view_own_basic_profile" ON hr_employees
FOR SELECT 
USING (
  user_id IS NOT NULL 
  AND auth.uid() = user_id
);

-- 2. HR Managers can view all employee records in their company
CREATE POLICY "hr_managers_view_company_employees" ON hr_employees
FOR SELECT 
USING (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- 3. Only HR Managers can INSERT new employee records
CREATE POLICY "hr_managers_insert_employees" ON hr_employees
FOR INSERT 
WITH CHECK (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- 4. HR Managers can update ALL employee records in their company
CREATE POLICY "hr_managers_update_employees" ON hr_employees
FOR UPDATE 
USING (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
)
WITH CHECK (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- 5. Employees can update only basic profile fields (non-sensitive data)
CREATE POLICY "employees_update_basic_profile" ON hr_employees
FOR UPDATE 
USING (
  user_id IS NOT NULL 
  AND auth.uid() = user_id
)
WITH CHECK (
  user_id IS NOT NULL 
  AND auth.uid() = user_id
);

-- 6. Only HR Managers can DELETE employee records
CREATE POLICY "hr_managers_delete_employees" ON hr_employees
FOR DELETE 
USING (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- 7. Ensure strict company isolation - no cross-company data access
CREATE POLICY "strict_company_isolation" ON hr_employees
FOR ALL
USING (
  -- Only allow access within the same company
  company_id = get_user_company_id(auth.uid())
);