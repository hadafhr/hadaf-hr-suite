-- CRITICAL SECURITY FIX - Phase 1: Database Security

-- Step 1: Fix Security Definer View issue by recreating employee_directory view
DROP VIEW IF EXISTS public.employee_directory CASCADE;

-- Create secure employee directory view without SECURITY DEFINER
CREATE VIEW public.employee_directory AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.phone,
  d.name as department_name,
  p.title as position_title,
  e.hire_date,
  e.employment_status,
  e.company_id
FROM public.boud_employees e
LEFT JOIN public.boud_departments d ON e.department_id = d.id
LEFT JOIN public.boud_positions p ON e.position_id = p.id
WHERE e.is_active = true;

-- Enable RLS on the view (inherits from underlying tables)
ALTER VIEW public.employee_directory SET (security_invoker = true);

-- Step 2: Fix all function search paths for security
-- Update all SECURITY DEFINER functions to have proper search_path

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$function$;

-- Fix create_admin_user function
CREATE OR REPLACE FUNCTION public.create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- This function will be called by an edge function to create the admin user
  -- We'll use Supabase Admin API via edge function for this
  RAISE NOTICE 'Admin user creation function ready';
END;
$function$;

-- Fix get_decrypted functions with proper search_path
CREATE OR REPLACE FUNCTION public.get_decrypted_national_id(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_passport_number(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_bank_account(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_iban(employee_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

-- Fix other security definer functions
CREATE OR REPLACE FUNCTION public.encrypt_existing_employee_data()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.encrypt_employee_sensitive_data()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log when someone accesses sensitive employee data
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'hr_employees',
    'SELECT',
    auth.uid(),
    NEW.id,
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'employee_accessed', NEW.id,
      'company_id', NEW.company_id
    ),
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN NEW;
END;
$function$;

-- Fix other functions with search paths
CREATE OR REPLACE FUNCTION public.encrypt_sensitive_data(data text, key_id text DEFAULT 'default'::text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.decrypt_sensitive_data(encrypted_data text, key_id text DEFAULT 'default'::text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;