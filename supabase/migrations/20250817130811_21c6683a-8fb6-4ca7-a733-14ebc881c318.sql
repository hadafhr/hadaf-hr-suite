-- Check and fix attendance_records_new security vulnerability
-- First, let's check what policies exist and drop them all systematically

-- Drop all existing policies for attendance_records_new table
DO $$ 
DECLARE 
    policy_record RECORD;
BEGIN 
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'attendance_records_new' 
        AND schemaname = 'public'
    LOOP 
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON attendance_records_new';
    END LOOP; 
END $$;

-- Now create secure RLS policies for attendance_records_new

-- 1. Employees can only view their own attendance records
CREATE POLICY "employees_view_own_attendance" 
ON attendance_records_new 
FOR SELECT 
USING (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 2. HR managers and super admins can view all attendance records in their company
CREATE POLICY "hr_view_company_attendance" 
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
CREATE POLICY "employees_insert_own_attendance" 
ON attendance_records_new 
FOR INSERT 
WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees 
    WHERE user_id = auth.uid()
  )
);

-- 4. HR managers can insert attendance records for employees in their company
CREATE POLICY "hr_insert_company_attendance" 
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
CREATE POLICY "employees_update_own_attendance" 
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
CREATE POLICY "hr_update_company_attendance" 
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
CREATE POLICY "hr_delete_company_attendance" 
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

-- Performance indexes for the new RLS policies
CREATE INDEX IF NOT EXISTS idx_attendance_records_employee_id ON attendance_records_new(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_date ON attendance_records_new(attendance_date);

-- Add security comment
COMMENT ON TABLE attendance_records_new IS 'SECURE: Employee attendance records with strict RLS - employees see only their own data, HR managers see company data only';