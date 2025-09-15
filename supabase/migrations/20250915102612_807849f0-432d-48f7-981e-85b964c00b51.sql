-- Fix critical security vulnerability: Department permissions table exposed
-- Remove the overly permissive policy that allows public access
DROP POLICY IF EXISTS "company_users_view_permissions" ON public.department_permissions;

-- Create secure RLS policies that restrict access to authorized users only
-- Only HR managers and super admins should be able to view permission structures
CREATE POLICY "hr_managers_view_permissions" 
ON public.department_permissions 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.boud_user_roles ur
    WHERE ur.user_id = auth.uid() 
      AND ur.is_active = true
      AND ur.role IN ('super_admin', 'hr_manager')
  )
);

-- Only super admins should be able to modify permission structures
CREATE POLICY "super_admins_manage_permissions" 
ON public.department_permissions 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.boud_user_roles ur
    WHERE ur.user_id = auth.uid() 
      AND ur.is_active = true
      AND ur.role = 'super_admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.boud_user_roles ur
    WHERE ur.user_id = auth.uid() 
      AND ur.is_active = true
      AND ur.role = 'super_admin'
  )
);

-- Add audit logging for permission structure access
CREATE OR REPLACE FUNCTION public.log_permission_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'department_permissions',
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'permission_code', COALESCE(NEW.permission_code, OLD.permission_code),
      'accessed_by', auth.uid(),
      'access_type', 'permission_structure_access'
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;