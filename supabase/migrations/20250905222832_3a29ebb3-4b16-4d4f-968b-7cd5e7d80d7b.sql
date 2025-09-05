-- Fix security issue: Restrict access to department performance data and other sensitive tables

-- First, enable RLS on od_leaderboard table
ALTER TABLE public.od_leaderboard ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for od_leaderboard table - link department name to company
CREATE POLICY "Company employees can view their department leaderboard data" 
ON public.od_leaderboard 
FOR SELECT 
TO authenticated
USING (
  -- Allow access if user belongs to a company that has this department
  EXISTS (
    SELECT 1 FROM public.boud_employees e 
    JOIN public.boud_departments d ON e.company_id = d.company_id
    WHERE e.user_id = auth.uid() 
    AND d.department_name = od_leaderboard.department
  )
);

CREATE POLICY "HR managers can manage leaderboard data" 
ON public.od_leaderboard 
FOR ALL 
TO authenticated
USING (
  -- Allow if user is HR manager in a company that has this department
  EXISTS (
    SELECT 1 FROM public.boud_employees e
    JOIN public.boud_departments d ON e.company_id = d.company_id
    WHERE e.user_id = auth.uid()
    AND d.department_name = od_leaderboard.department
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
         boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.boud_employees e
    JOIN public.boud_departments d ON e.company_id = d.company_id
    WHERE e.user_id = auth.uid()
    AND d.department_name = od_leaderboard.department
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
         boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
  )
);

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

-- Fix subscription packages policy - remove public access
DO $$ 
BEGIN
  -- Check if the public policy exists and drop it
  IF EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'boud_subscription_packages' 
    AND policyname = 'Anyone can view active packages'
  ) THEN
    DROP POLICY "Anyone can view active packages" ON public.boud_subscription_packages;
  END IF;
END $$;

CREATE POLICY "Authenticated users can view subscription packages" 
ON public.boud_subscription_packages 
FOR SELECT 
TO authenticated
USING (is_active = true);

-- Enable RLS on subscription_plans table (general plans, restrict to authenticated)
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view subscription plans" 
ON public.subscription_plans 
FOR SELECT 
TO authenticated
USING (is_active = true);