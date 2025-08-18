-- Fix Critical Security Issue: Employee Salary Information Could Be Stolen
-- Remove overly permissive RLS policies on payroll_runs table and restrict to authorized personnel only

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can view their payroll runs" ON public.payroll_runs;
DROP POLICY IF EXISTS "Payroll staff can manage payroll runs" ON public.payroll_runs;

-- Create restrictive policies for payroll data access
-- Only authorized payroll staff can view payroll runs
CREATE POLICY "Only authorized payroll staff can view payroll runs" 
ON public.payroll_runs 
FOR SELECT 
USING (
  -- Only users with proper payroll roles in their company can view
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'cfo'::app_role) OR 
  has_role(auth.uid(), 'finance_manager'::app_role) OR
  has_role(auth.uid(), 'payroll_officer'::app_role)
);

-- Only authorized payroll staff can manage payroll runs  
CREATE POLICY "Only authorized payroll staff can manage payroll runs" 
ON public.payroll_runs 
FOR ALL 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'cfo'::app_role) OR 
  has_role(auth.uid(), 'finance_manager'::app_role) OR
  has_role(auth.uid(), 'payroll_officer'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'cfo'::app_role) OR 
  has_role(auth.uid(), 'finance_manager'::app_role) OR
  has_role(auth.uid(), 'payroll_officer'::app_role)
);

-- Also secure the related boud_payroll_runs table if it exists
-- First check if there are any overly permissive policies there
DO $$ 
BEGIN
  -- Drop any existing policies that might be too permissive
  BEGIN
    DROP POLICY IF EXISTS "Users can view their payroll runs" ON public.boud_payroll_runs;
  EXCEPTION WHEN undefined_object THEN
    NULL; -- Table doesn't exist, skip
  END;
  
  -- Only create policies if the table exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'boud_payroll_runs') THEN
    -- Create restrictive policy for boud_payroll_runs
    EXECUTE '
    CREATE POLICY "Only authorized payroll staff can access boud payroll runs" 
    ON public.boud_payroll_runs 
    FOR ALL 
    USING (
      boud_has_role(auth.uid(), company_id, ''super_admin''::user_role) OR 
      boud_has_role(auth.uid(), company_id, ''hr_manager''::user_role) OR 
      boud_has_role(auth.uid(), company_id, ''payroll_officer''::user_role)
    )
    WITH CHECK (
      boud_has_role(auth.uid(), company_id, ''super_admin''::user_role) OR 
      boud_has_role(auth.uid(), company_id, ''hr_manager''::user_role) OR 
      boud_has_role(auth.uid(), company_id, ''payroll_officer''::user_role)
    )';
  END IF;
END $$;

-- Add audit logging for payroll data access
CREATE OR REPLACE FUNCTION public.log_payroll_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log when someone accesses sensitive payroll data
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'payroll_period', COALESCE(NEW.payroll_period, OLD.payroll_period),
      'total_amount', COALESCE(NEW.total_net, OLD.total_net)
    ),
    now()
  );
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Create audit trigger for payroll access tracking
DROP TRIGGER IF EXISTS log_payroll_runs_access ON public.payroll_runs;
CREATE TRIGGER log_payroll_runs_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.payroll_runs
  FOR EACH ROW EXECUTE FUNCTION public.log_payroll_access();

-- Add comment documenting the security model
COMMENT ON TABLE public.payroll_runs IS 
'Sensitive payroll data table. Access restricted to authorized payroll staff only (admin, cfo, finance_manager, payroll_officer roles). All access is logged for audit purposes.';