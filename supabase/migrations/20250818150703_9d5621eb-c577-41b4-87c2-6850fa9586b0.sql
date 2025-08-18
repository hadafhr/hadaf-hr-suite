-- Fix Security Issue: Add field-level encryption to hr_employees table
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

-- 4. Create secure functions to decrypt HR employee data (similar to boud_employees)
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
  -- Check if user has permission to view this employee's data
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
  -- Check if user has permission to view this employee's data
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

CREATE OR REPLACE FUNCTION public.get_hr_decrypted_email(employee_id uuid)
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
  
  SELECT COALESCE(decrypt_sensitive_data(email_encrypted), email)
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
  -- Check if user has permission to view this employee's data
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

-- 5. Encrypt existing sensitive data in hr_employees
CREATE OR REPLACE FUNCTION public.encrypt_existing_hr_employee_data()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  encrypted_count INTEGER := 0;
  emp_record RECORD;
BEGIN
  -- Encrypt existing sensitive data
  FOR emp_record IN 
    SELECT id, national_id, passport_number, phone, email, iban
    FROM hr_employees 
    WHERE national_id_encrypted IS NULL AND (national_id IS NOT NULL OR passport_number IS NOT NULL OR phone IS NOT NULL OR email IS NOT NULL OR iban IS NOT NULL)
  LOOP
    UPDATE hr_employees SET
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
      phone_encrypted = CASE 
        WHEN emp_record.phone IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.phone) 
        ELSE NULL 
      END,
      email_encrypted = CASE 
        WHEN emp_record.email IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.email) 
        ELSE NULL 
      END,
      iban_encrypted = CASE 
        WHEN emp_record.iban IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.iban) 
        ELSE NULL 
      END
    WHERE id = emp_record.id;
    
    encrypted_count := encrypted_count + 1;
  END LOOP;
  
  RETURN encrypted_count;
END;
$$;

-- Execute the encryption of existing data
SELECT encrypt_existing_hr_employee_data();

-- 6. Update RLS policies to be more restrictive
DROP POLICY IF EXISTS "Basic employee info accessible to company members" ON public.hr_employees;
DROP POLICY IF EXISTS "Employees can view their own record" ON public.hr_employees;
DROP POLICY IF EXISTS "HR staff can manage employees" ON public.hr_employees;
DROP POLICY IF EXISTS "HR staff can view company employees" ON public.hr_employees;

-- Create more secure RLS policies
CREATE POLICY "HR managers can view basic employee info" 
ON public.hr_employees 
FOR SELECT 
USING (
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR
  (hr_has_role(auth.uid(), company_id, 'hr_officer'::hr_role) AND is_active = true)
);

CREATE POLICY "Employees can view their own basic info" 
ON public.hr_employees 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "HR managers can manage employees" 
ON public.hr_employees 
FOR ALL 
USING (
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role)
)
WITH CHECK (
  hr_has_role(auth.uid(), company_id, 'owner'::hr_role) OR 
  hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role)
);

CREATE POLICY "Employees can update limited fields" 
ON public.hr_employees 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND
  -- Only allow updating non-sensitive fields
  OLD.company_id = NEW.company_id AND
  OLD.employee_id = NEW.employee_id AND
  OLD.national_id = NEW.national_id AND
  OLD.passport_number = NEW.passport_number AND
  OLD.iban = NEW.iban
);

-- 7. Add audit logging for sensitive data access
CREATE OR REPLACE FUNCTION public.log_hr_sensitive_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Log when someone accesses sensitive HR employee data
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'hr_employees',
    'SENSITIVE_DATA_ACCESS',
    auth.uid(),
    NEW.id,
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'employee_accessed', NEW.id,
      'company_id', NEW.company_id,
      'access_time', now()
    ),
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN NEW;
END;
$$;