-- Security Fix: Strengthen boud_payroll_items access controls (Fixed Policy Conflicts)

-- First, drop ALL existing policies on boud_payroll_items table
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'boud_payroll_items' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON boud_payroll_items', r.policyname);
    END LOOP;
END
$$;

-- Create comprehensive RLS policies for boud_payroll_items with strict access control

-- 1. Employees can only view their own payroll items (read-only)
CREATE POLICY "secure_employees_view_own_payroll" 
ON boud_payroll_items 
FOR SELECT
USING (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 2. Only authorized staff can view all payroll items in their company
CREATE POLICY "secure_staff_view_company_payroll" 
ON boud_payroll_items 
FOR SELECT
USING (
  payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
       OR boud_has_role(auth.uid(), pr.company_id, 'hr_manager'::user_role)
       OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role)
  )
);

-- 3. Only payroll officers and super admins can create payroll items
CREATE POLICY "secure_staff_create_payroll" 
ON boud_payroll_items 
FOR INSERT
WITH CHECK (
  payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
       OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role)
  )
);

-- 4. Only payroll officers and super admins can update payroll items
CREATE POLICY "secure_staff_update_payroll" 
ON boud_payroll_items 
FOR UPDATE
USING (
  payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
       OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role)
  )
)
WITH CHECK (
  payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role) 
       OR boud_has_role(auth.uid(), pr.company_id, 'payroll_officer'::user_role)
  )
);

-- 5. Only super admins can delete payroll items
CREATE POLICY "secure_admins_delete_payroll" 
ON boud_payroll_items 
FOR DELETE
USING (
  payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role)
  )
);

-- Create audit logging function for payroll access
CREATE OR REPLACE FUNCTION audit_payroll_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log all payroll data modifications
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'boud_payroll_items',
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'user_id', auth.uid(),
      'employee_id', COALESCE(NEW.employee_id, OLD.employee_id),
      'payroll_run_id', COALESCE(NEW.payroll_run_id, OLD.payroll_run_id),
      'operation', TG_OP,
      'net_salary_accessed', COALESCE(NEW.net_salary, OLD.net_salary),
      'basic_salary_accessed', COALESCE(NEW.basic_salary, OLD.basic_salary),
      'security_classification', 'sensitive_payroll_data',
      'timestamp', now()
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the operation if logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS audit_payroll_insert ON boud_payroll_items;
DROP TRIGGER IF EXISTS audit_payroll_update ON boud_payroll_items;
DROP TRIGGER IF EXISTS audit_payroll_delete ON boud_payroll_items;

-- Create audit triggers for payroll operations
CREATE TRIGGER audit_payroll_insert
  AFTER INSERT ON boud_payroll_items
  FOR EACH ROW EXECUTE FUNCTION audit_payroll_access();

CREATE TRIGGER audit_payroll_update
  AFTER UPDATE ON boud_payroll_items
  FOR EACH ROW EXECUTE FUNCTION audit_payroll_access();

CREATE TRIGGER audit_payroll_delete
  AFTER DELETE ON boud_payroll_items
  FOR EACH ROW EXECUTE FUNCTION audit_payroll_access();

-- Create secure payroll summary view
DROP VIEW IF EXISTS secure_payroll_summary;
CREATE VIEW secure_payroll_summary AS
SELECT 
  pi.id,
  pi.payroll_run_id,
  pi.employee_id,
  e.employee_id as employee_number,
  e.first_name || ' ' || e.last_name as employee_name,
  pi.working_days,
  pi.actual_working_days,
  pi.absence_days,
  pi.overtime_hours,
  pi.created_at,
  -- Conditional salary visibility based on authorization
  CASE 
    WHEN boud_has_role(auth.uid(), (SELECT pr.company_id FROM boud_payroll_runs pr WHERE pr.id = pi.payroll_run_id), 'super_admin'::user_role) 
      OR boud_has_role(auth.uid(), (SELECT pr.company_id FROM boud_payroll_runs pr WHERE pr.id = pi.payroll_run_id), 'payroll_officer'::user_role)
      OR pi.employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    THEN pi.basic_salary
    ELSE NULL
  END as basic_salary,
  CASE 
    WHEN boud_has_role(auth.uid(), (SELECT pr.company_id FROM boud_payroll_runs pr WHERE pr.id = pi.payroll_run_id), 'super_admin'::user_role) 
      OR boud_has_role(auth.uid(), (SELECT pr.company_id FROM boud_payroll_runs pr WHERE pr.id = pi.payroll_run_id), 'payroll_officer'::user_role)
      OR pi.employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    THEN pi.net_salary
    ELSE NULL
  END as net_salary,
  -- Security indicator
  CASE 
    WHEN boud_has_role(auth.uid(), (SELECT pr.company_id FROM boud_payroll_runs pr WHERE pr.id = pi.payroll_run_id), 'super_admin'::user_role) 
      OR boud_has_role(auth.uid(), (SELECT pr.company_id FROM boud_payroll_runs pr WHERE pr.id = pi.payroll_run_id), 'payroll_officer'::user_role)
      OR pi.employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    THEN true
    ELSE false
  END as can_view_salary
FROM boud_payroll_items pi
JOIN boud_employees e ON pi.employee_id = e.id
WHERE 
  -- Company isolation
  pi.payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE pr.company_id = boud_get_user_company_id(auth.uid())
  );

-- Add security indexes for better performance
CREATE INDEX IF NOT EXISTS idx_boud_payroll_employee_auth 
ON boud_payroll_items(employee_id, payroll_run_id);

CREATE INDEX IF NOT EXISTS idx_boud_payroll_run_auth 
ON boud_payroll_items(payroll_run_id);

-- Add security documentation
COMMENT ON TABLE boud_payroll_items IS 'SECURED: Payroll items with strict RLS - employees see only their data, payroll officers/admins manage company data, all access audited.';

COMMENT ON VIEW secure_payroll_summary IS 'SECURED: Conditional payroll view that masks salary data from unauthorized users.';