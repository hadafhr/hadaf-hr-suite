-- Fix security definer view issue and improve encryption security
-- Drop the problematic security definer view
DROP VIEW IF EXISTS secure_employee_view;

-- Create a proper view without security definer
CREATE OR REPLACE VIEW secure_employee_view AS
SELECT 
  id,
  user_id,
  company_id,
  department_id,
  position_id,
  manager_id,
  employee_id,
  first_name,
  middle_name,
  last_name,
  full_name_arabic,
  -- Show masked versions by default
  CASE 
    WHEN national_id IS NOT NULL THEN 'XXX-XXXX-' || RIGHT(COALESCE(national_id, ''), 4)
    ELSE NULL 
  END as national_id_masked,
  CASE 
    WHEN passport_number IS NOT NULL THEN 'XXX' || RIGHT(COALESCE(passport_number, ''), 4)
    ELSE NULL 
  END as passport_number_masked,
  nationality,
  gender,
  date_of_birth,
  marital_status,
  email,
  -- Show masked phone
  CASE 
    WHEN phone IS NOT NULL THEN 'XXX-XXX-' || RIGHT(COALESCE(phone, ''), 4)
    ELSE NULL 
  END as phone_masked,
  address,
  hire_date,
  contract_start_date,
  contract_end_date,
  contract_type,
  employment_status,
  work_location,
  basic_salary,
  housing_allowance,
  transport_allowance,
  other_allowances,
  total_salary,
  bank_name,
  -- Show masked bank details
  CASE 
    WHEN bank_account_number IS NOT NULL THEN 'XXXX-' || RIGHT(COALESCE(bank_account_number, ''), 4)
    ELSE NULL 
  END as bank_account_masked,
  CASE 
    WHEN iban IS NOT NULL THEN 'SA' || REPEAT('X', LENGTH(COALESCE(iban, '')) - 6) || RIGHT(COALESCE(iban, ''), 4)
    ELSE NULL 
  END as iban_masked,
  education_level,
  university,
  major,
  graduation_year,
  experience_years,
  annual_leave_balance,
  sick_leave_balance,
  emergency_leave_balance,
  emergency_contact,
  documents,
  profile_picture_url,
  notes,
  is_active,
  created_at,
  updated_at
FROM boud_employees;

-- Enable RLS on the view
ALTER VIEW secure_employee_view SET (security_barrier = true);

-- Create RLS policy for the view
CREATE POLICY "Users can view secure employee data in their company"
ON boud_employees FOR SELECT
USING (
  company_id = boud_get_user_company_id(auth.uid())
  OR user_id = auth.uid()
  OR boud_has_role(auth.uid(), company_id, 'super_admin'::user_role)
  OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Grant permissions properly
GRANT SELECT ON boud_employees TO authenticated;
GRANT SELECT ON secure_employee_view TO authenticated;