-- Fix security issue: Restrict access to department performance data and other sensitive tables

-- First, enable RLS on od_leaderboard table if not already enabled
ALTER TABLE public.od_leaderboard ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for od_leaderboard table to restrict access to company employees only
CREATE POLICY "Company employees can view their department leaderboard data" 
ON public.od_leaderboard 
FOR SELECT 
TO authenticated
USING (
  -- Allow access if user belongs to the same company as the department
  EXISTS (
    SELECT 1 FROM public.boud_employees e 
    JOIN public.boud_departments d ON e.department_id = d.id
    WHERE e.user_id = auth.uid() 
    AND d.company_id = od_leaderboard.company_id
  )
);

CREATE POLICY "HR managers can manage leaderboard data" 
ON public.od_leaderboard 
FOR ALL 
TO authenticated
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Fix other sensitive tables mentioned in security scan

-- Enable RLS on company_holidays table
ALTER TABLE public.company_holidays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company employees can view their company holidays" 
ON public.company_holidays 
FOR SELECT 
TO authenticated
USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage company holidays" 
ON public.company_holidays 
FOR ALL 
TO authenticated
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Enable RLS on work_schedules table  
ALTER TABLE public.work_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company employees can view their company work schedules" 
ON public.work_schedules 
FOR SELECT 
TO authenticated
USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage work schedules" 
ON public.work_schedules 
FOR ALL 
TO authenticated
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Restrict subscription packages to authenticated users only (keep public for legitimate prospects)
ALTER TABLE public.boud_subscription_packages DROP POLICY IF EXISTS "Anyone can view active packages";

CREATE POLICY "Authenticated users can view subscription packages" 
ON public.boud_subscription_packages 
FOR SELECT 
TO authenticated
USING (is_active = true);

-- Enable RLS on subscription_plans table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'subscription_plans') THEN
    EXECUTE 'ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY';
    EXECUTE '
      CREATE POLICY "Authenticated users can view subscription plans" 
      ON public.subscription_plans 
      FOR SELECT 
      TO authenticated
      USING (is_active = true)
    ';
  END IF;
END $$;