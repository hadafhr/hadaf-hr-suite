-- Phase 2: Fix Remaining Security Issues

-- 1. Add missing RLS policies for tables that have RLS enabled but no policies

-- Add RLS policies for services table (restrict to authenticated users)
CREATE POLICY "Authenticated users can view services" 
ON public.services 
FOR SELECT 
TO authenticated
USING (is_active = true);

-- Add RLS policies for mosques table (restrict to authenticated users)  
CREATE POLICY "Authenticated users can view verified mosques"
ON public.mosques
FOR SELECT
TO authenticated  
USING (is_verified = true);

-- 2. Move extensions from public schema to extensions schema
-- First create the extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move pgcrypto extension to extensions schema
DROP EXTENSION IF EXISTS pgcrypto CASCADE;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Update all function references to use the extensions schema
CREATE OR REPLACE FUNCTION public.encrypt_sensitive_data(data text, key_id text DEFAULT 'default'::text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public', 'extensions'
AS $function$
BEGIN
  IF data IS NULL OR data = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN encode(
    extensions.encrypt_iv(
      data::bytea,
      decode(COALESCE(current_setting('app.encryption_key', true), 'default_key_32_chars_long_12345'), 'escape'),
      extensions.gen_random_bytes(16),
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
 SET search_path = 'public', 'extensions'
AS $function$
BEGIN
  IF encrypted_data IS NULL OR encrypted_data = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN convert_from(
    extensions.decrypt_iv(
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

-- 3. Create audit table for better security logging if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID,
  record_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for audit_logs (admins can view all, users can view their own actions)
CREATE POLICY "Users can view their own audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert audit logs"
ON public.audit_logs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Create necessary role tables and enums if they don't exist
DO $$
BEGIN
    -- Create app_role enum if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'cfo', 'finance_manager', 'ap_clerk', 'user');
    END IF;
    
    -- Create user_role enum if it doesn't exist  
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('super_admin', 'hr_manager', 'payroll_officer', 'employee');
    END IF;
    
    -- Create hr_role enum if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hr_role') THEN
        CREATE TYPE public.hr_role AS ENUM ('owner', 'hr_manager', 'hr_officer', 'employee');
    END IF;
END$$;

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create boud_user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.boud_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_id UUID NOT NULL,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, company_id, role)
);

-- Enable RLS on boud_user_roles
ALTER TABLE public.boud_user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for boud_user_roles
CREATE POLICY "Users can view their company roles"
ON public.boud_user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage company roles"
ON public.boud_user_roles
FOR ALL
TO authenticated
USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role))
WITH CHECK (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role));

-- Create hr_user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.hr_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_id UUID NOT NULL,
    role hr_role NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, company_id, role)
);

-- Enable RLS on hr_user_roles  
ALTER TABLE public.hr_user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hr_user_roles
CREATE POLICY "Users can view their HR roles"
ON public.hr_user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "HR owners can manage HR roles"
ON public.hr_user_roles
FOR ALL
TO authenticated
USING (hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
WITH CHECK (hr_has_role(auth.uid(), company_id, 'owner'::hr_role));

-- 5. Create profiles table if it doesn't exist for user management
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();