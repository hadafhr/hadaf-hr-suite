-- Drop overly permissive policy that allows company members to access employee data
DROP POLICY IF EXISTS "Basic employee info accessible to company members" ON hr_employees;

-- Create strict RLS policies for hr_employees table
-- Policy 1: Only HR managers and owners can view all employee records
CREATE POLICY "HR managers can view employee records"
ON hr_employees
FOR SELECT 
USING (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- Policy 2: Employees can only view their own record (already exists but ensuring it's correct)
DROP POLICY IF EXISTS "Employees can view their own record" ON hr_employees;
CREATE POLICY "Employees can view own record only"
ON hr_employees
FOR SELECT
USING (auth.uid() = user_id);

-- Policy 3: Only HR managers and owners can insert/update/delete employee records
DROP POLICY IF EXISTS "HR staff can manage employees" ON hr_employees;
CREATE POLICY "HR managers can manage employees"
ON hr_employees
FOR ALL
USING (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
)
WITH CHECK (
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role)
);

-- Remove the duplicate policy that was too permissive
DROP POLICY IF EXISTS "HR staff can view company employees" ON hr_employees;

-- Create audit function for sensitive data access logging
CREATE OR REPLACE FUNCTION log_hr_employee_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log when someone modifies HR employee data
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'hr_employees',
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'employee_accessed', COALESCE(NEW.id, OLD.id),
      'company_id', COALESCE(NEW.company_id, OLD.company_id),
      'access_type', 'sensitive_pii'
    ),
    now()
  );
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add triggers for INSERT, UPDATE, DELETE operations only
CREATE TRIGGER hr_employee_modification_audit
  AFTER INSERT OR UPDATE OR DELETE ON hr_employees
  FOR EACH ROW
  EXECUTE FUNCTION log_hr_employee_access();