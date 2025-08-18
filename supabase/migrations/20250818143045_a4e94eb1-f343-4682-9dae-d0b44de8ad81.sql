-- Phase 3: Final Security Fixes - Create Missing RLS Policies

-- Create missing RLS policies for all tables that have RLS enabled but no policies

DO $$
BEGIN
    -- Create policies for audit_logs if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'audit_logs' 
        AND policyname = 'Users can view their own audit logs'
    ) THEN
        CREATE POLICY "Users can view their own audit logs"
        ON public.audit_logs
        FOR SELECT
        TO authenticated
        USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'audit_logs' 
        AND policyname = 'System can insert audit logs'
    ) THEN
        CREATE POLICY "System can insert audit logs"
        ON public.audit_logs
        FOR INSERT
        TO authenticated
        WITH CHECK (true);
    END IF;

    -- Create policies for user_roles if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_roles' 
        AND policyname = 'Users can view their own roles'
    ) THEN
        CREATE POLICY "Users can view their own roles"
        ON public.user_roles
        FOR SELECT
        TO authenticated
        USING (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_roles' 
        AND policyname = 'Admins can manage user roles'
    ) THEN
        CREATE POLICY "Admins can manage user roles"
        ON public.user_roles
        FOR ALL
        TO authenticated
        USING (has_role(auth.uid(), 'admin'::app_role))
        WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
    END IF;

    -- Create policies for boud_user_roles if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'boud_user_roles' 
        AND policyname = 'Users can view their company roles'
    ) THEN
        CREATE POLICY "Users can view their company roles"
        ON public.boud_user_roles
        FOR SELECT
        TO authenticated
        USING (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'boud_user_roles' 
        AND policyname = 'Super admins can manage company roles'
    ) THEN
        CREATE POLICY "Super admins can manage company roles"
        ON public.boud_user_roles
        FOR ALL
        TO authenticated
        USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role))
        WITH CHECK (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role));
    END IF;

    -- Create policies for hr_user_roles if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'hr_user_roles' 
        AND policyname = 'Users can view their HR roles'
    ) THEN
        CREATE POLICY "Users can view their HR roles"
        ON public.hr_user_roles
        FOR SELECT
        TO authenticated
        USING (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'hr_user_roles' 
        AND policyname = 'HR owners can manage HR roles'
    ) THEN
        CREATE POLICY "HR owners can manage HR roles"
        ON public.hr_user_roles
        FOR ALL
        TO authenticated
        USING (hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
        WITH CHECK (hr_has_role(auth.uid(), company_id, 'owner'::hr_role));
    END IF;

    -- Create policies for profiles if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile"
        ON public.profiles
        FOR SELECT
        TO authenticated
        USING (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile"
        ON public.profiles
        FOR UPDATE
        TO authenticated
        USING (user_id = auth.uid())
        WITH CHECK (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND policyname = 'Users can insert their own profile'
    ) THEN
        CREATE POLICY "Users can insert their own profile"
        ON public.profiles
        FOR INSERT
        TO authenticated
        WITH CHECK (user_id = auth.uid());
    END IF;
END$$;

-- Create trigger for profiles updated_at if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_profiles_updated_at'
    ) THEN
        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE ON public.profiles
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END$$;

-- Ensure new user trigger exists for profiles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW 
            EXECUTE FUNCTION public.handle_new_user();
    END IF;
END$$;