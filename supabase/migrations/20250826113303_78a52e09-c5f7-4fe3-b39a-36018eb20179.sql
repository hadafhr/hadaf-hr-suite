-- Fix critical security issue with boud_payroll_items table
-- Add more restrictive RLS policies to prevent unauthorized access to salary data

-- First, add a RESTRICTIVE policy that requires authentication
CREATE POLICY "require_authentication_for_payroll_access"
ON public.boud_payroll_items
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Drop and recreate the SELECT policies with more explicit security
DROP POLICY IF EXISTS "secure_employees_view_own_payroll" ON public.boud_payroll_items;
DROP POLICY IF EXISTS "secure_staff_view_company_payroll" ON public.boud_payroll_items;

-- Recreate employee policy with additional security checks
CREATE POLICY "employees_view_own_payroll_only"
ON public.boud_payroll_items
FOR SELECT
TO public
USING (
  auth.uid() IS NOT NULL 
  AND employee_id IN (
    SELECT id 
    FROM public.boud_employees 
    WHERE user_id = auth.uid() 
    AND is_active = true
  )
);

-- Recreate staff policy with stricter role validation
CREATE POLICY "authorized_staff_view_company_payroll"
ON public.boud_payroll_items
FOR SELECT  
TO public
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM public.boud_payroll_runs pr
    JOIN public.boud_user_roles ur ON ur.company_id = pr.company_id
    WHERE pr.id = payroll_run_id
    AND ur.user_id = auth.uid()
    AND ur.is_active = true
    AND ur.role IN ('super_admin', 'hr_manager', 'payroll_officer')
  )
);

-- Add policy for payroll creation with strict role checking
DROP POLICY IF EXISTS "secure_staff_create_payroll" ON public.boud_payroll_items;
CREATE POLICY "authorized_staff_create_payroll"
ON public.boud_payroll_items
FOR INSERT
TO public
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM public.boud_payroll_runs pr
    JOIN public.boud_user_roles ur ON ur.company_id = pr.company_id
    WHERE pr.id = payroll_run_id
    AND ur.user_id = auth.uid()
    AND ur.is_active = true
    AND ur.role IN ('super_admin', 'payroll_officer')
  )
);

-- Add policy for payroll updates with strict role checking
DROP POLICY IF EXISTS "secure_staff_update_payroll" ON public.boud_payroll_items;
CREATE POLICY "authorized_staff_update_payroll"
ON public.boud_payroll_items
FOR UPDATE
TO public
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM public.boud_payroll_runs pr
    JOIN public.boud_user_roles ur ON ur.company_id = pr.company_id
    WHERE pr.id = payroll_run_id
    AND ur.user_id = auth.uid()
    AND ur.is_active = true
    AND ur.role IN ('super_admin', 'payroll_officer')
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM public.boud_payroll_runs pr
    JOIN public.boud_user_roles ur ON ur.company_id = pr.company_id
    WHERE pr.id = payroll_run_id
    AND ur.user_id = auth.uid()
    AND ur.is_active = true
    AND ur.role IN ('super_admin', 'payroll_officer')
  )
);

-- Add policy for payroll deletion with strict role checking (super admins only)
DROP POLICY IF EXISTS "secure_admins_delete_payroll" ON public.boud_payroll_items;
CREATE POLICY "super_admins_delete_payroll_only"
ON public.boud_payroll_items
FOR DELETE
TO public
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM public.boud_payroll_runs pr
    JOIN public.boud_user_roles ur ON ur.company_id = pr.company_id
    WHERE pr.id = payroll_run_id
    AND ur.user_id = auth.uid()
    AND ur.is_active = true
    AND ur.role = 'super_admin'
  )
);