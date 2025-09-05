-- Remove insecure public policies that allow unrestricted access

-- Remove public policies from od_leaderboard table
DROP POLICY IF EXISTS "Everyone can view leaderboard" ON public.od_leaderboard;
DROP POLICY IF EXISTS "Authenticated users can manage leaderboard" ON public.od_leaderboard;

-- Remove public policies from company_holidays table  
DROP POLICY IF EXISTS "Users can view company holidays" ON public.company_holidays;
DROP POLICY IF EXISTS "Admins can manage company holidays" ON public.company_holidays;

-- Remove public policies from work_schedules table
DROP POLICY IF EXISTS "Users can view work schedules for their company" ON public.work_schedules;
DROP POLICY IF EXISTS "Admins can manage work schedules" ON public.work_schedules;