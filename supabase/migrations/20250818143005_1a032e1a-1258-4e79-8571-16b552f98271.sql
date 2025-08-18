-- Phase 2: Fix Remaining Security Issues (Careful Implementation)

-- 1. Add missing RLS policies for tables that have RLS enabled but no policies
-- Check if policies exist before creating them

DO $$
BEGIN
    -- Add RLS policy for services table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'services' 
        AND policyname = 'Authenticated users can view services'
    ) THEN
        CREATE POLICY "Authenticated users can view services" 
        ON public.services 
        FOR SELECT 
        TO authenticated
        USING (is_active = true);
    END IF;

    -- Add RLS policy for mosques table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'mosques' 
        AND policyname = 'Authenticated users can view verified mosques'
    ) THEN
        CREATE POLICY "Authenticated users can view verified mosques"
        ON public.mosques
        FOR SELECT
        TO authenticated  
        USING (is_verified = true);
    END IF;
END$$;

-- 2. Move extensions from public schema to extensions schema
-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Recreate pgcrypto in extensions schema if not already there
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_extension e 
        JOIN pg_namespace n ON e.extnamespace = n.oid 
        WHERE e.extname = 'pgcrypto' AND n.nspname = 'extensions'
    ) THEN
        -- Drop from public if it exists there
        DROP EXTENSION IF EXISTS pgcrypto CASCADE;
        -- Create in extensions schema
        CREATE EXTENSION pgcrypto WITH SCHEMA extensions;
    END IF;
END$$;

-- 3. Update encryption functions to use extensions schema
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

-- 4. Create necessary enums if they don't exist
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

-- 5. Create audit_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID,
  record_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit_logs if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        WHERE t.schemaname = 'public' 
        AND t.tablename = 'audit_logs' 
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
    END IF;
END$$;

-- 6. Create missing role tables if they don't exist
-- user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        WHERE t.schemaname = 'public' 
        AND t.tablename = 'user_roles' 
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    END IF;
END$$;

-- boud_user_roles table
CREATE TABLE IF NOT EXISTS public.boud_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_id UUID NOT NULL,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, company_id, role)
);

-- Enable RLS on boud_user_roles if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        WHERE t.schemaname = 'public' 
        AND t.tablename = 'boud_user_roles' 
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.boud_user_roles ENABLE ROW LEVEL SECURITY;
    END IF;
END$$;

-- hr_user_roles table
CREATE TABLE IF NOT EXISTS public.hr_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_id UUID NOT NULL,
    role hr_role NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, company_id, role)
);

-- Enable RLS on hr_user_roles if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        WHERE t.schemaname = 'public' 
        AND t.tablename = 'hr_user_roles' 
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.hr_user_roles ENABLE ROW LEVEL SECURITY;
    END IF;
END$$;

-- profiles table  
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        WHERE t.schemaname = 'public' 
        AND t.tablename = 'profiles' 
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END$$;