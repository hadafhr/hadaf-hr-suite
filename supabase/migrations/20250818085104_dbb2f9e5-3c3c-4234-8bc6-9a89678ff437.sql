-- Drop existing overly permissive policies on suppliers table
DROP POLICY IF EXISTS "Users can view their suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "AP staff can manage suppliers" ON public.suppliers;

-- Create restrictive policies for supplier data access
-- Only authorized procurement/finance staff can view supplier data
CREATE POLICY "Authorized staff can view suppliers" 
ON public.suppliers 
FOR SELECT 
USING (
  auth.uid() = user_id AND (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'cfo'::app_role) OR
    has_role(auth.uid(), 'finance_manager'::app_role) OR
    has_role(auth.uid(), 'ap_clerk'::app_role)
  )
);

-- Only authorized staff can create suppliers
CREATE POLICY "Authorized staff can create suppliers" 
ON public.suppliers 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'cfo'::app_role) OR
    has_role(auth.uid(), 'finance_manager'::app_role) OR
    has_role(auth.uid(), 'ap_clerk'::app_role)
  )
);

-- Only authorized staff can update suppliers
CREATE POLICY "Authorized staff can update suppliers" 
ON public.suppliers 
FOR UPDATE 
USING (
  auth.uid() = user_id AND (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'cfo'::app_role) OR
    has_role(auth.uid(), 'finance_manager'::app_role) OR
    has_role(auth.uid(), 'ap_clerk'::app_role)
  )
)
WITH CHECK (
  auth.uid() = user_id AND (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'cfo'::app_role) OR
    has_role(auth.uid(), 'finance_manager'::app_role) OR
    has_role(auth.uid(), 'ap_clerk'::app_role)
  )
);

-- Only authorized staff can delete suppliers (more restrictive)
CREATE POLICY "Authorized staff can delete suppliers" 
ON public.suppliers 
FOR DELETE 
USING (
  auth.uid() = user_id AND (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'cfo'::app_role) OR
    has_role(auth.uid(), 'finance_manager'::app_role)
  )
);

-- Create audit logging trigger for supplier data access
CREATE OR REPLACE FUNCTION public.log_supplier_access()
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
    'suppliers',
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'supplier_code', COALESCE(NEW.supplier_code, OLD.supplier_code),
      'supplier_name', COALESCE(NEW.supplier_name, OLD.supplier_name),
      'user_id', COALESCE(NEW.user_id, OLD.user_id)
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

-- Create audit_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  operation text NOT NULL,
  user_id uuid,
  record_id uuid,
  details jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for supplier access logging
DROP TRIGGER IF EXISTS supplier_access_audit_trigger ON public.suppliers;
CREATE TRIGGER supplier_access_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.log_supplier_access();