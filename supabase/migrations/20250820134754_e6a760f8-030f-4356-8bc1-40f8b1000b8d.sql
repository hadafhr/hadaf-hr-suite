-- Fix attendance_settings table RLS policies to prevent public access
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Admins can manage attendance settings" ON attendance_settings;
DROP POLICY IF EXISTS "Users can view attendance settings for their company" ON attendance_settings;

-- Create secure RLS policies for attendance_settings
-- Only company employees can view their company's attendance settings
CREATE POLICY "Company employees can view attendance settings"
ON attendance_settings
FOR SELECT
TO authenticated
USING (
  company_id = boud_get_user_company_id(auth.uid())
);

-- Only HR managers and super admins can manage attendance settings
CREATE POLICY "HR managers can manage attendance settings"
ON attendance_settings
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