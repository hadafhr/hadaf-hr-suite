-- Fix Security Issue: Add field-level encryption to hr_employees table (Fixed Version)
-- Similar to the existing boud_employees encryption infrastructure

-- 1. Add encrypted columns to hr_employees table
ALTER TABLE public.hr_employees 
ADD COLUMN IF NOT EXISTS national_id_encrypted TEXT,
ADD COLUMN IF NOT EXISTS passport_number_encrypted TEXT,
ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
ADD COLUMN IF NOT EXISTS iban_encrypted TEXT;

-- 2. Create trigger to automatically encrypt sensitive data when inserted/updated
CREATE OR REPLACE FUNCTION public.encrypt_hr_employee_sensitive_data()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Encrypt sensitive fields if they are being set
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.national_id IS DISTINCT FROM OLD.national_id) THEN
    NEW.national_id_encrypted := encrypt_sensitive_data(NEW.national_id);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.passport_number IS DISTINCT FROM OLD.passport_number) THEN
    NEW.passport_number_encrypted := encrypt_sensitive_data(NEW.passport_number);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.phone IS DISTINCT FROM OLD.phone) THEN
    NEW.phone_encrypted := encrypt_sensitive_data(NEW.phone);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.email IS DISTINCT FROM OLD.email) THEN
    NEW.email_encrypted := encrypt_sensitive_data(NEW.email);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.iban IS DISTINCT FROM OLD.iban) THEN
    NEW.iban_encrypted := encrypt_sensitive_data(NEW.iban);
  END IF;
  
  RETURN NEW;
END;
$$;

-- 3. Apply the encryption trigger to hr_employees table
DROP TRIGGER IF EXISTS encrypt_hr_employee_data_trigger ON public.hr_employees;
CREATE TRIGGER encrypt_hr_employee_data_trigger
  BEFORE INSERT OR UPDATE ON public.hr_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.encrypt_hr_employee_sensitive_data();

-- 4. Create secure functions to decrypt HR employee data
CREATE OR REPLACE FUNCTION public.get_hr_decrypted_national_id(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'owner'::hr_role) OR
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'hr_manager'::hr_role) OR
    auth.uid() = (SELECT user_id FROM hr_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(national_id_encrypted), national_id)
  INTO result
  FROM hr_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_hr_decrypted_passport_number(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result TEXT;
BEGIN
  IF NOT (
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'owner'::hr_role) OR
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'hr_manager'::hr_role) OR
    auth.uid() = (SELECT user_id FROM hr_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(passport_number_encrypted), passport_number)
  INTO result
  FROM hr_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_hr_decrypted_phone(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result TEXT;
BEGIN
  IF NOT (
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'owner'::hr_role) OR
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'hr_manager'::hr_role) OR
    auth.uid() = (SELECT user_id FROM hr_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(phone_encrypted), phone)
  INTO result
  FROM hr_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_hr_decrypted_iban(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result TEXT;
BEGIN
  IF NOT (
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'owner'::hr_role) OR
    hr_has_role(auth.uid(), (SELECT company_id FROM hr_employees WHERE id = employee_id), 'hr_manager'::hr_role) OR
    auth.uid() = (SELECT user_id FROM hr_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(iban_encrypted), iban)
  INTO result
  FROM hr_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$$;