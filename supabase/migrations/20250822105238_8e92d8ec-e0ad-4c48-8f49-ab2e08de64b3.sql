-- Security Fix: Strengthen boud_payroll_items access controls and add audit logging (Corrected)

-- Drop existing policies to recreate with better security
DROP POLICY IF EXISTS "Employees can view their own payroll items" ON boud_payroll_items;
DROP POLICY IF EXISTS "Payroll officers can manage payroll items" ON boud_payroll_items;

-- Create comprehensive RLS policies for boud_payroll_items with strict access control

-- 1. Employees can only view their own payroll items (read-only)
CREATE POLICY "employees_view_own_payroll_items" 
ON boud_payroll_items 
FOR SELECT
USING (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 2. Only payroll officers and super admins can view all payroll items in their company
CREATE POLICY "payroll_officers_view_company_payroll" 
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
CREATE POLICY "payroll_officers_create_payroll_items" 
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
CREATE POLICY "payroll_officers_update_payroll_items" 
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

-- 5. Only super admins can delete payroll items (strict deletion policy)
CREATE POLICY "super_admins_delete_payroll_items" 
ON boud_payroll_items 
FOR DELETE
USING (
  payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE boud_has_role(auth.uid(), pr.company_id, 'super_admin'::user_role)
  )
);

-- Create audit logging trigger for payroll modifications
CREATE OR REPLACE FUNCTION log_payroll_data_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log when someone modifies payroll data
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
      'accessed_by', auth.uid(),
      'employee_id', COALESCE(NEW.employee_id, OLD.employee_id),
      'payroll_run_id', COALESCE(NEW.payroll_run_id, OLD.payroll_run_id),
      'access_type', 'sensitive_salary_data',
      'operation', TG_OP,
      'net_salary', COALESCE(NEW.net_salary, OLD.net_salary),
      'basic_salary', COALESCE(NEW.basic_salary, OLD.basic_salary),
      'timestamp', now()
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

-- Add triggers for payroll modifications (INSERT, UPDATE, DELETE only)
CREATE TRIGGER log_payroll_insert_access
  AFTER INSERT ON boud_payroll_items
  FOR EACH ROW EXECUTE FUNCTION log_payroll_data_access();

CREATE TRIGGER log_payroll_update_access
  AFTER UPDATE ON boud_payroll_items
  FOR EACH ROW EXECUTE FUNCTION log_payroll_data_access();

CREATE TRIGGER log_payroll_delete_access
  AFTER DELETE ON boud_payroll_items
  FOR EACH ROW EXECUTE FUNCTION log_payroll_data_access();

-- Create a secure view for payroll summary (without sensitive details)
CREATE OR REPLACE VIEW payroll_summary AS
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
  -- Only show salary data to authorized users
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
  END as net_salary
FROM boud_payroll_items pi
JOIN boud_employees e ON pi.employee_id = e.id
WHERE 
  -- Ensure users can only see payroll from their company
  pi.payroll_run_id IN (
    SELECT pr.id FROM boud_payroll_runs pr
    WHERE pr.company_id = boud_get_user_company_id(auth.uid())
  );

-- Create function to check if user can access specific payroll item
CREATE OR REPLACE FUNCTION can_access_payroll_item(item_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  item_company_id UUID;
  item_employee_id UUID;
BEGIN
  -- Get the company and employee for this payroll item
  SELECT 
    pr.company_id,
    pi.employee_id
  INTO item_company_id, item_employee_id
  FROM boud_payroll_items pi
  JOIN boud_payroll_runs pr ON pi.payroll_run_id = pr.id
  WHERE pi.id = item_id;
  
  -- Check if user has access
  RETURN (
    -- User is the employee themselves
    item_employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    OR
    -- User is payroll officer or admin in the same company
    boud_has_role(auth.uid(), item_company_id, 'super_admin'::user_role) 
    OR boud_has_role(auth.uid(), item_company_id, 'payroll_officer'::user_role)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get masked salary data for unauthorized users
CREATE OR REPLACE FUNCTION get_masked_payroll_data(item_id UUID)
RETURNS TABLE(
  id UUID,
  employee_name TEXT,
  working_days INTEGER,
  actual_working_days INTEGER,
  salary_visible BOOLEAN,
  basic_salary NUMERIC,
  net_salary NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pi.id,
    e.first_name || ' ' || e.last_name as employee_name,
    pi.working_days,
    pi.actual_working_days,
    can_access_payroll_item(pi.id) as salary_visible,
    CASE 
      WHEN can_access_payroll_item(pi.id) THEN pi.basic_salary
      ELSE NULL
    END as basic_salary,
    CASE 
      WHEN can_access_payroll_item(pi.id) THEN pi.net_salary
      ELSE NULL
    END as net_salary
  FROM boud_payroll_items pi
  JOIN boud_employees e ON pi.employee_id = e.id
  WHERE pi.id = item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add performance indexes for security queries
CREATE INDEX IF NOT EXISTS idx_payroll_items_employee_security 
ON boud_payroll_items(employee_id, payroll_run_id);

CREATE INDEX IF NOT EXISTS idx_payroll_items_run_security 
ON boud_payroll_items(payroll_run_id);

-- Add comments explaining the security measures
COMMENT ON TABLE boud_payroll_items IS 'Secure payroll items table with strict RLS policies: employees can only view their own data, payroll officers and super admins can manage company payroll data, all modifications are logged for audit purposes.';

COMMENT ON VIEW payroll_summary IS 'Secure payroll summary view that conditionally shows salary details only to authorized users (employees for their own data, payroll officers/admins for company data).';

COMMENT ON FUNCTION can_access_payroll_item(UUID) IS 'Security function to check if current user can access specific payroll item data.';

COMMENT ON FUNCTION get_masked_payroll_data(UUID) IS 'Security function that returns payroll data with salary information masked for unauthorized users.';