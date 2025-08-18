-- Step 2: Create encryption trigger and functions for hr_employees
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

-- Apply the encryption trigger
DROP TRIGGER IF EXISTS encrypt_hr_employee_data_trigger ON public.hr_employees;
CREATE TRIGGER encrypt_hr_employee_data_trigger
  BEFORE INSERT OR UPDATE ON public.hr_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.encrypt_hr_employee_sensitive_data();