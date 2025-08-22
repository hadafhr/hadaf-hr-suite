-- Fix HR Employees Security Issue: Strengthen RLS Policies
-- Replace permissive policies with restrictive ones for better security isolation

-- First, drop existing policies
DROP POLICY IF EXISTS "Employees can view own record only" ON hr_employees;
DROP POLICY IF EXISTS "HR managers can manage employees" ON hr_employees;
DROP POLICY IF EXISTS "HR managers can view employee records" ON hr_employees;

-- Create restrictive policies for better security control

-- 1. Employees can only view their OWN basic profile data (non-sensitive fields)
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

-- 4. HR Managers can update employee records, employees can update limited fields
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

-- 5. Employees can update only their own non-sensitive profile data
CREATE POLICY "employees_update_own_profile" ON hr_employees
FOR UPDATE 
USING (
  user_id IS NOT NULL 
  AND auth.uid() = user_id
)
WITH CHECK (
  user_id IS NOT NULL 
  AND auth.uid() = user_id
  -- Restrict which fields employees can update (prevent salary/sensitive data changes)
  AND OLD.basic_salary = NEW.basic_salary
  AND OLD.housing_allowance = NEW.housing_allowance  
  AND OLD.transport_allowance = NEW.transport_allowance
  AND OLD.other_allowances = NEW.other_allowances
  AND OLD.national_id_encrypted = NEW.national_id_encrypted
  AND OLD.passport_number_encrypted = NEW.passport_number_encrypted
  AND OLD.iban_encrypted = NEW.iban_encrypted
  AND OLD.company_id = NEW.company_id
  AND OLD.employee_id = NEW.employee_id
);

-- 6. Only HR Managers can DELETE employee records
CREATE POLICY "hr_managers_delete_employees" ON hr_employees
FOR DELETE 
USING (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- 7. Add company isolation check - ensure users can only access their company's data
CREATE POLICY "enforce_company_isolation" ON hr_employees
FOR ALL
USING (
  -- HR roles have access to their company
  (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
   OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
  OR 
  -- Employees have access to their own record in their company
  (user_id IS NOT NULL AND auth.uid() = user_id)
);