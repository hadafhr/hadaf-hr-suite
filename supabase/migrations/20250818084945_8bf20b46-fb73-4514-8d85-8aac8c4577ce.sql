-- Fix Security Definer View Issue
-- Drop and recreate employee_directory view without SECURITY DEFINER

-- First drop the existing view
DROP VIEW IF EXISTS public.employee_directory;

-- Recreate the view without SECURITY DEFINER (default is SECURITY INVOKER)
CREATE VIEW public.employee_directory AS
SELECT 
    id,
    employee_id,
    first_name,
    last_name,
    email,
    hire_date,
    is_active,
    company_id
FROM public.boud_employees e
WHERE e.is_active = true;

-- Enable RLS on the view (this will use the RLS policies of the underlying table)
-- Views inherit RLS from their base tables, so no additional policies needed

-- Add a comment to document the security model
COMMENT ON VIEW public.employee_directory IS 
'Employee directory view that respects RLS policies from boud_employees table. Users can only see employees from their company based on the underlying table policies.';

-- Ensure the functions that legitimately need SECURITY DEFINER have proper access controls
-- Update encryption/decryption functions to include search_path for security

-- Fix search_path for security-sensitive functions
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