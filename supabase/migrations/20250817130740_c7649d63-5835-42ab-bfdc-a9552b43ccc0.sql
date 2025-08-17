-- Fix critical security vulnerability in attendance_records_new table
-- Drop existing insecure policies
DROP POLICY IF EXISTS "Admins can manage all attendance records" ON attendance_records_new;
DROP POLICY IF EXISTS "Users can insert their own attendance records" ON attendance_records_new;
DROP POLICY IF EXISTS "Users can view attendance records" ON attendance_records_new;

-- Create secure RLS policies for attendance_records_new

-- 1. Employees can only view their own attendance records
CREATE POLICY "Employees can view their own attendance records" 
ON attendance_records_new 
FOR SELECT 
USING (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 2. HR managers and super admins can view all attendance records in their company
CREATE POLICY "HR managers can view company attendance records" 
ON attendance_records_new 
FOR SELECT 
USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- 3. Employees can only insert their own attendance records
CREATE POLICY "Employees can insert their own attendance records" 
ON attendance_records_new 
FOR INSERT 
WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 4. HR managers can insert attendance records for employees in their company
CREATE POLICY "HR managers can insert company attendance records" 
ON attendance_records_new 
FOR INSERT 
WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- 5. Employees can only update their own attendance records
CREATE POLICY "Employees can update their own attendance records" 
ON attendance_records_new 
FOR UPDATE 
USING (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 6. HR managers can update attendance records for employees in their company
CREATE POLICY "HR managers can update company attendance records" 
ON attendance_records_new 
FOR UPDATE 
USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- 7. Only HR managers and super admins can delete attendance records
CREATE POLICY "HR managers can delete company attendance records" 
ON attendance_records_new 
FOR DELETE 
USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- Create indexes to improve performance of the new RLS policies
CREATE INDEX IF NOT EXISTS idx_attendance_records_employee_id ON attendance_records_new(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_date ON attendance_records_new(attendance_date);

-- Add a comment explaining the security model
COMMENT ON TABLE attendance_records_new IS 'Employee attendance records with strict RLS: employees see only their own data, HR managers see company data only';