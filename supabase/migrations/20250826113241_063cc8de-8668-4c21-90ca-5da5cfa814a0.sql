-- Fix critical security vulnerability: Payroll and employee data accessible to public role
-- Update RLS policies to restrict access to authenticated users only

-- Fix boud_payroll_items table policies
DROP POLICY IF EXISTS "secure_admins_delete_payroll" ON public.boud_payroll_items;
DROP POLICY IF EXISTS "secure_employees_view_own_payroll" ON public.boud_payroll_items;
DROP POLICY IF EXISTS "secure_staff_create_payroll" ON public.boud_payroll_items;
DROP POLICY IF EXISTS "secure_staff_update_payroll" ON public.boud_payroll_items;
DROP POLICY IF EXISTS "secure_staff_view_company_payroll" ON public.boud_payroll_items;

-- Recreate policies for authenticated users only
CREATE POLICY "secure_admins_delete_payroll" 
ON public.boud_payroll_items 
FOR DELETE 
TO authenticated
USING (payroll_run_id IN ( 
  SELECT pr.id FROM boud_payroll_runs pr 
  WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role)
));

CREATE POLICY "secure_employees_view_own_payroll" 
ON public.boud_payroll_items 
FOR SELECT 
TO authenticated
USING (employee_id IN ( 
  SELECT boud_employees.id FROM boud_employees 
  WHERE (boud_employees.user_id = auth.uid())
));

CREATE POLICY "secure_staff_create_payroll" 
ON public.boud_payroll_items 
FOR INSERT 
TO authenticated
WITH CHECK (payroll_run_id IN ( 
  SELECT pr.id FROM boud_payroll_runs pr 
  WHERE (boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role))
));

CREATE POLICY "secure_staff_update_payroll" 
ON public.boud_payroll_items 
FOR UPDATE 
TO authenticated
USING (payroll_run_id IN ( 
  SELECT pr.id FROM boud_payroll_runs pr 
  WHERE (boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role))
))
WITH CHECK (payroll_run_id IN ( 
  SELECT pr.id FROM boud_payroll_runs pr 
  WHERE (boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role))
));

CREATE POLICY "secure_staff_view_company_payroll" 
ON public.boud_payroll_items 
FOR SELECT 
TO authenticated
USING (payroll_run_id IN ( 
  SELECT pr.id FROM boud_payroll_runs pr 
  WHERE (boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), pr.company_id, 'hr_manager'::user_role) 
    OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role))
));

-- Fix hr_employees table policies
DROP POLICY IF EXISTS "employees_update_basic_profile" ON public.hr_employees;
DROP POLICY IF EXISTS "employees_view_own_basic_profile" ON public.hr_employees;
DROP POLICY IF EXISTS "hr_managers_delete_employees" ON public.hr_employees;
DROP POLICY IF EXISTS "hr_managers_insert_employees" ON public.hr_employees;
DROP POLICY IF EXISTS "hr_managers_update_employees" ON public.hr_employees;
DROP POLICY IF EXISTS "hr_managers_view_company_employees" ON public.hr_employees;
DROP POLICY IF EXISTS "strict_company_isolation" ON public.hr_employees;

-- Recreate hr_employees policies for authenticated users only
CREATE POLICY "employees_update_basic_profile" 
ON public.hr_employees 
FOR UPDATE 
TO authenticated
USING ((user_id IS NOT NULL) AND (auth.uid() = user_id))
WITH CHECK ((user_id IS NOT NULL) AND (auth.uid() = user_id));

CREATE POLICY "employees_view_own_basic_profile" 
ON public.hr_employees 
FOR SELECT 
TO authenticated
USING ((user_id IS NOT NULL) AND (auth.uid() = user_id));

CREATE POLICY "hr_managers_delete_employees" 
ON public.hr_employees 
FOR DELETE 
TO authenticated
USING (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role));

CREATE POLICY "hr_managers_insert_employees" 
ON public.hr_employees 
FOR INSERT 
TO authenticated
WITH CHECK (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role));

CREATE POLICY "hr_managers_update_employees" 
ON public.hr_employees 
FOR UPDATE 
TO authenticated
USING (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
WITH CHECK (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role));

CREATE POLICY "hr_managers_view_company_employees" 
ON public.hr_employees 
FOR SELECT 
TO authenticated
USING (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) 
  OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role));

CREATE POLICY "strict_company_isolation" 
ON public.hr_employees 
FOR ALL 
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Ensure tables have proper RLS enforcement
ALTER TABLE public.boud_payroll_items FORCE ROW LEVEL SECURITY;
ALTER TABLE public.hr_employees FORCE ROW LEVEL SECURITY;
ALTER TABLE public.boud_employees FORCE ROW LEVEL SECURITY;