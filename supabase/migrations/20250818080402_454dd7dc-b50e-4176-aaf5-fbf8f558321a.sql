-- Field-level encryption for sensitive employee data
-- This migration implements encryption for sensitive fields in boud_employees table

-- Enable pgcrypto extension for encryption functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create secure encryption/decryption functions
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data TEXT, key_id TEXT DEFAULT 'default')
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Use AES encryption with a secure key
  -- In production, the key should be stored securely (env variable or vault)
  IF data IS NULL OR data = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN encode(
    encrypt_iv(
      data::bytea,
      decode(COALESCE(current_setting('app.encryption_key', true), 'default_key_32_chars_long_12345'), 'escape'),
      gen_random_bytes(16),
      'aes'
    ),
    'base64'
  );
END;
$$;

CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_data TEXT, key_id TEXT DEFAULT 'default')
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF encrypted_data IS NULL OR encrypted_data = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN convert_from(
    decrypt_iv(
      decode(encrypted_data, 'base64'),
      decode(COALESCE(current_setting('app.encryption_key', true), 'default_key_32_chars_long_12345'), 'escape'),
      decode(substring(encrypted_data from 1 for 24), 'base64'),
      'aes'
    ),
    'utf8'
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Return NULL if decryption fails (data might not be encrypted yet)
    RETURN NULL;
END;
$$;

-- Create view functions for secure access to encrypted data
CREATE OR REPLACE FUNCTION get_decrypted_national_id(employee_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(national_id_encrypted), national_id)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION get_decrypted_passport_number(employee_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(passport_number_encrypted), passport_number)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION get_decrypted_bank_account(employee_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'payroll_officer'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(bank_account_number_encrypted), bank_account_number)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION get_decrypted_iban(employee_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'payroll_officer'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(iban_encrypted), iban)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

-- Add encrypted columns to boud_employees table
ALTER TABLE boud_employees 
ADD COLUMN IF NOT EXISTS national_id_encrypted TEXT,
ADD COLUMN IF NOT EXISTS passport_number_encrypted TEXT,
ADD COLUMN IF NOT EXISTS bank_account_number_encrypted TEXT,
ADD COLUMN IF NOT EXISTS iban_encrypted TEXT,
ADD COLUMN IF NOT EXISTS phone_encrypted TEXT;

-- Create function to encrypt existing data
CREATE OR REPLACE FUNCTION encrypt_existing_employee_data()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encrypted_count INTEGER := 0;
  emp_record RECORD;
BEGIN
  -- Encrypt existing sensitive data
  FOR emp_record IN 
    SELECT id, national_id, passport_number, bank_account_number, iban, phone
    FROM boud_employees 
    WHERE national_id_encrypted IS NULL AND national_id IS NOT NULL
  LOOP
    UPDATE boud_employees SET
      national_id_encrypted = CASE 
        WHEN emp_record.national_id IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.national_id) 
        ELSE NULL 
      END,
      passport_number_encrypted = CASE 
        WHEN emp_record.passport_number IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.passport_number) 
        ELSE NULL 
      END,
      bank_account_number_encrypted = CASE 
        WHEN emp_record.bank_account_number IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.bank_account_number) 
        ELSE NULL 
      END,
      iban_encrypted = CASE 
        WHEN emp_record.iban IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.iban) 
        ELSE NULL 
      END,
      phone_encrypted = CASE 
        WHEN emp_record.phone IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.phone) 
        ELSE NULL 
      END
    WHERE id = emp_record.id;
    
    encrypted_count := encrypted_count + 1;
  END LOOP;
  
  RETURN encrypted_count;
END;
$$;

-- Trigger function to automatically encrypt sensitive data on insert/update
CREATE OR REPLACE FUNCTION encrypt_employee_sensitive_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Encrypt sensitive fields if they are being set
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.national_id IS DISTINCT FROM OLD.national_id) THEN
    NEW.national_id_encrypted := encrypt_sensitive_data(NEW.national_id);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.passport_number IS DISTINCT FROM OLD.passport_number) THEN
    NEW.passport_number_encrypted := encrypt_sensitive_data(NEW.passport_number);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.bank_account_number IS DISTINCT FROM OLD.bank_account_number) THEN
    NEW.bank_account_number_encrypted := encrypt_sensitive_data(NEW.bank_account_number);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.iban IS DISTINCT FROM OLD.iban) THEN
    NEW.iban_encrypted := encrypt_sensitive_data(NEW.iban);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.phone IS DISTINCT FROM OLD.phone) THEN
    NEW.phone_encrypted := encrypt_sensitive_data(NEW.phone);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to encrypt data automatically
CREATE TRIGGER encrypt_employee_data_trigger
  BEFORE INSERT OR UPDATE ON boud_employees
  FOR EACH ROW
  EXECUTE FUNCTION encrypt_employee_sensitive_data();

-- Encrypt existing data
SELECT encrypt_existing_employee_data();

-- Add indexes on encrypted columns for better performance
CREATE INDEX IF NOT EXISTS idx_boud_employees_national_id_encrypted ON boud_employees(national_id_encrypted);
CREATE INDEX IF NOT EXISTS idx_boud_employees_passport_encrypted ON boud_employees(passport_number_encrypted);

-- Create secure view for employee data access
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

-- Grant appropriate permissions
GRANT SELECT ON secure_employee_view TO authenticated;