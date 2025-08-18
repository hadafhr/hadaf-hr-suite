-- CRITICAL SECURITY FIX - Phase 1: Database Security (Fixed)

-- Step 1: Fix Security Definer View issue by recreating employee_directory view
DROP VIEW IF EXISTS public.employee_directory CASCADE;

-- Create secure employee directory view without SECURITY DEFINER (simplified)
CREATE VIEW public.employee_directory AS
SELECT 
  e.id,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  e.phone,
  e.hire_date,
  e.employment_status,
  e.company_id
FROM public.boud_employees e
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
  RAISE NOTICE 'Admin user creation function ready';
END;
$function$;

-- Fix encryption/decryption functions with proper search_path
CREATE OR REPLACE FUNCTION public.encrypt_sensitive_data(data text, key_id text DEFAULT 'default'::text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
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
    RETURN NULL;
END;
$function$;

-- Fix boud role functions
CREATE OR REPLACE FUNCTION public.boud_has_role(_user_id uuid, _company_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.boud_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$function$;

CREATE OR REPLACE FUNCTION public.boud_get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT company_id
  FROM public.boud_user_roles
  WHERE user_id = _user_id
    AND is_active = true
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.get_employee_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT company_id
  FROM public.boud_employees
  WHERE user_id = _user_id
  LIMIT 1
$function$;

-- Fix HR role functions
CREATE OR REPLACE FUNCTION public.hr_has_role(_user_id uuid, _company_id uuid, _role hr_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.hr_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$function$;

CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT e.company_id
  FROM public.hr_employees e
  WHERE e.user_id = _user_id
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;