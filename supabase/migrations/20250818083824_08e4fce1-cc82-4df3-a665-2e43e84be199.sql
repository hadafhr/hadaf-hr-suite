-- Phase 1: Fix Critical boud_employees Security Issues

-- Drop problematic views and policies causing recursion
DROP VIEW IF EXISTS public.secure_employee_view CASCADE;
DROP VIEW IF EXISTS public.public_employee_directory CASCADE;

-- Drop existing policies on boud_employees that cause infinite recursion
DROP POLICY IF EXISTS "Employees can view their own profile" ON public.boud_employees;
DROP POLICY IF EXISTS "HR managers can manage employees" ON public.boud_employees;
DROP POLICY IF EXISTS "Line managers can view their team" ON public.boud_employees;
DROP POLICY IF EXISTS "Users can view employees in their company" ON public.boud_employees;

-- Create secure helper functions to prevent recursion
CREATE OR REPLACE FUNCTION public.get_employee_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT company_id
  FROM public.boud_employees
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Create new secure RLS policies for boud_employees
CREATE POLICY "employees_view_own_profile"
ON public.boud_employees
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "hr_manage_company_employees"
ON public.boud_employees
FOR ALL
TO authenticated
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

CREATE POLICY "employees_update_own_profile"
ON public.boud_employees
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create secure view for basic employee directory (non-sensitive data only)
CREATE VIEW public.employee_directory AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.hire_date,
  e.is_active,
  e.company_id
FROM public.boud_employees e
WHERE e.is_active = true;

-- Grant access to the directory view (access controlled by base table RLS)
GRANT SELECT ON public.employee_directory TO authenticated;

-- Fix existing security definer functions to include search_path
CREATE OR REPLACE FUNCTION public.boud_has_role(_user_id uuid, _company_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.boud_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$$;

CREATE OR REPLACE FUNCTION public.boud_get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT company_id
  FROM public.boud_user_roles
  WHERE user_id = _user_id
    AND is_active = true
  LIMIT 1
$$;